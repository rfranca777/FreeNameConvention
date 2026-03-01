#!/usr/bin/env node
'use strict';

/**
 * Generates assets/icon.ico — multi-size ICO with PNG-embedded images.
 * Blue shield + white checkmark (matches assets/shield.svg).
 *
 * Run: node scripts/gen-icon.js
 */

const fs   = require('fs');
const path = require('path');
const zlib = require('zlib');

// ── PNG Encoder (proper zlib compression) ───────────────────────────────────
let _crc32Table;
function crc32(buf) {
  if (!_crc32Table) {
    _crc32Table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      _crc32Table[n] = c;
    }
  }
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = _crc32Table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td  = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const c   = Buffer.alloc(4); c.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, c]);
}

function createPNG(width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA

  const rowLen = 1 + width * 4;
  const raw    = Buffer.alloc(height * rowLen);
  for (let y = 0; y < height; y++) {
    raw[y * rowLen] = 0; // filter: None
    rgba.copy(raw, y * rowLen + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0))
  ]);
}

// ── Draw shield with checkmark ──────────────────────────────────────────────
function drawShield(size) {
  const rgba = Buffer.alloc(size * size * 4, 0);

  function setPixel(x, y, r, g, b, a) {
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const i = (y * size + x) * 4;
    const aa = a / 255, ea = rgba[i + 3] / 255, oa = aa + ea * (1 - aa);
    if (oa === 0) return;
    rgba[i]     = Math.round((r * aa + rgba[i]     * ea * (1 - aa)) / oa);
    rgba[i + 1] = Math.round((g * aa + rgba[i + 1] * ea * (1 - aa)) / oa);
    rgba[i + 2] = Math.round((b * aa + rgba[i + 2] * ea * (1 - aa)) / oa);
    rgba[i + 3] = Math.round(oa * 255);
  }

  function insideShield(px, py) {
    const nx = (px / size) * 64, ny = (py / size) * 64;
    if (ny < 4 || ny > 62) return false;
    let lx, rx;
    if (ny <= 14) {
      const t = (ny - 4) / 10;
      lx = 32 - t * 26; rx = 32 + t * 26;
    } else if (ny <= 34) {
      lx = 6; rx = 58;
    } else {
      const t = (ny - 34) / 28;
      const bulge = Math.sin(t * Math.PI) * 4;
      lx = 6  + t * 26 - bulge;
      rx = 58 - t * 26 + bulge;
    }
    return nx >= lx && nx <= rx;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!insideShield(x, y)) continue;
      const t = (x + y) / (size * 2);
      setPixel(x, y,
        Math.round(26  + t * (13  - 26)),
        Math.round(115 + t * (71  - 115)),
        Math.round(232 + t * (161 - 232)),
        255
      );
    }
  }

  function drawLine(x0, y0, x1, y1, thickness, r, g, b) {
    const steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 3);
    for (let i = 0; i <= steps; i++) {
      const t  = i / steps;
      const px = x0 + (x1 - x0) * t, py = y0 + (y1 - y0) * t;
      const rad = Math.ceil(thickness) + 1;
      for (let dy = -rad; dy <= rad; dy++) for (let dx = -rad; dx <= rad; dx++) {
        const d = Math.hypot(dx, dy);
        if (d <= thickness) {
          const a = d > thickness - 1 ? Math.max(0, (thickness - d) * 255) : 255;
          setPixel(px + dx, py + dy, r, g, b, Math.round(a));
        }
      }
    }
  }

  const s = size / 64;
  drawLine(20 * s, 32 * s, 28 * s, 41 * s, 2.5 * s, 255, 255, 255);
  drawLine(28 * s, 41 * s, 46 * s, 24 * s, 2.5 * s, 255, 255, 255);

  return rgba;
}

// ── Build ICO (PNG-embedded, Vista+) ────────────────────────────────────────
function buildICO(entries) {
  const hdr = Buffer.alloc(6);
  hdr.writeUInt16LE(0, 0); hdr.writeUInt16LE(1, 2); hdr.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const dirs = entries.map(({ size, png }) => {
    const d = Buffer.alloc(16);
    d[0] = size < 256 ? size : 0;
    d[1] = size < 256 ? size : 0;
    d.writeUInt16LE(1, 4);
    d.writeUInt16LE(32, 6);
    d.writeUInt32LE(png.length, 8);
    d.writeUInt32LE(offset, 12);
    offset += png.length;
    return d;
  });

  return Buffer.concat([hdr, ...dirs, ...entries.map(e => e.png)]);
}

// ── Main ────────────────────────────────────────────────────────────────────
const sizes   = [16, 24, 32, 48, 64, 128, 256];
const entries = sizes.map(size => {
  const rgba = drawShield(size);
  const png  = createPNG(size, size, rgba);
  console.log(`  ✔ ${size}×${size} (${png.length} bytes)`);
  return { size, png };
});

const ico     = buildICO(entries);
const outPath = path.join(__dirname, '..', 'assets', 'icon.ico');
fs.writeFileSync(outPath, ico);
console.log(`\n  ✔ icon.ico saved (${(ico.length / 1024).toFixed(1)} KB) → ${outPath}`);
