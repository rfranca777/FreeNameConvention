<p align="center">
  <img src="assets/icon.ico" alt="FreeNameConvention" width="96" />
</p>

<h1 align="center">FreeNameConvention</h1>

<p align="center">
  <strong>Open-source file naming compliance guardian</strong><br>
  Enforce international normative naming standards on your folders — free forever.
</p>

<p align="center">
  <a href="#-features">Features</a> ·
  <a href="#-normatives">62 Normatives</a> ·
  <a href="#-languages">4 Languages</a> ·
  <a href="#-installation">Installation</a> ·
  <a href="#-security">Security</a> ·
  <a href="#-donations">Donations</a>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🛡️ **Real-time Guardian** | Monitors folders via `chokidar` and enforces naming rules as files are created |
| 📋 **62 built-in normatives** | ISO, GDPR, HIPAA, LGPD, NF-e, SOX, APPI, POPIA, PIPL, and many more |
| 🌍 **6 regions covered** | Global, Americas, Europe, Asia-Pacific, Middle East, Africa |
| 🌐 **4 languages** | Português 🇧🇷 · English 🇺🇸 · עברית 🇮🇱 · Español 🇪🇸 (with RTL support) |
| 🧙 **Pattern wizard** | Step-by-step builder with live preview and drag-and-drop token blocks |
| 🔒 **Admin password** | PBKDF2-protected password required to start/stop the Guardian |
| 📂 **Per-folder rules** | Each folder gets its own patterns, enforcement mode, color, priority, and owner |
| 🚫 **Quarantine** | Non-compliant files are moved to an ACL-restricted subfolder |
| 📧 **Email alerts** | SMTP notifications when violations occur (Nodemailer) |
| 📤 **PowerShell export** | Standalone `.ps1` script for environments without Electron |
| 📊 **Violation log** | Searchable, filterable, with CSV export |
| ⚡ **Config import/export** | Back up and share your folder configurations as JSON |
| 🖥️ **Windows service mode** | `--service` flag for background operation |
| 🔐 **Config file protection** | Windows `icacls` ACL restrictions on the configuration file |

---

## 📜 Normatives

FreeNameConvention ships with **62 ready-to-use normatives** organized by region:

### 🌐 Global (8)
| Normative | Area |
|-----------|------|
| ISO 9001:2015 | Quality Management |
| ISO 13485:2016 | Medical Devices QMS |
| ISO 15489-1:2016 | Records Management |
| ISO 27001:2022 | Information Security |
| ISO 14001:2015 | Environmental Management |
| ISO 45001:2018 | Occupational Health & Safety |
| ISO 19650 | BIM / Construction |
| PCI DSS v4.0 | Payment Card Security |

### 🌎 Americas (24)
| Country | Normatives |
|---------|-----------|
| 🇧🇷 Brazil | NF-e, NFS-e, CT-e, SPED, eSocial, BACEN 4.893, CVM, CFM 1.821, ANVISA RDC 204, LGPD, CNJ 065, CLT/eSocial/CAGED, CONARQ/e-ARQ, Decree 10.278, ABNT NBR 13531, MAPA/SISLEGIS |
| 🇺🇸 USA | SOX, HIPAA, FDA 21 CFR Part 11, FINRA 4511, DoD 5015.02, NIST SP 800-53, FERPA |
| 🇲🇽 Mexico | CFDI (SAT), LFPDPPP |
| 🇦🇷 Argentina | AFIP Factura Electrónica |
| 🇨🇴 Colombia | DIAN Facturación Electrónica |
| 🇨🇱 Chile | SII DTE |
| 🇨🇦 Canada | PIPEDA |

### 🇪🇺 Europe (10)
| Country | Normatives |
|---------|-----------|
| European Union | GDPR, eIDAS, NIS2 Directive, DORA |
| 🇬🇧 United Kingdom | UK GDPR + DPA 2018 |
| 🇩🇪 Germany | GoBD |
| 🇪🇸 Spain | Factura-e |
| 🇮🇹 Italy | FatturaPA |
| 🇫🇷 France | CNIL Guidelines |

### 🌏 Asia-Pacific (9)
| Country | Normatives |
|---------|-----------|
| 🇯🇵 Japan | APPI |
| 🇦🇺 Australia | Privacy Act 1988, APRA CPS 234 |
| 🇮🇳 India | DPDP Act 2023 |
| 🇰🇷 South Korea | PIPA |
| 🇨🇳 China | PIPL |
| 🇸🇬 Singapore | PDPA |
| 🇹🇭 Thailand | PDPA |

### 🕌 Middle East (4)
| Country | Normatives |
|---------|-----------|
| 🇮🇱 Israel | Archives Law (תשט"ו-1955), Privacy Protection Law (5741-1981) |
| 🇸🇦 Saudi Arabia | PDPL |
| 🇦🇪 UAE | DIFC Data Protection Law |

### 🌍 Africa (3)
| Country | Normatives |
|---------|-----------|
| 🇿🇦 South Africa | POPIA |
| 🇳🇬 Nigeria | NDPR / NDPA |
| 🇰🇪 Kenya | Data Protection Act 2019 |

### 📁 Generic (1)
| Template | Purpose |
|----------|---------|
| Internal Corporate Policy | 4 generic templates for documents, spreadsheets, images, backups |

Each normative includes **ready-to-use patterns** with tokens, examples, and recommended file extensions.

---

## 🌐 Languages

| Language | Direction | Status |
|----------|-----------|--------|
| 🇧🇷 Português | LTR | ✅ Complete |
| 🇺🇸 English | LTR | ✅ Complete |
| 🇮🇱 עברית (Hebrew) | RTL | ✅ Complete |
| 🇪🇸 Español | LTR | ✅ Complete |

Switch languages dynamically from **Settings** — the tray menu and system labels update instantly.

---

## 🛠️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- Windows 10/11 (x64)

### From Source

```bash
# Clone the repository
git clone https://github.com/odefender/FreeNameConvention.git
cd FreeNameConvention

# Install dependencies
npm install

# Run the application
npm start
```

### Build Installer

```bash
npm run build
```

This creates a Windows NSIS installer in the `dist/` folder.

---

## 📖 How It Works

### 1. Add a Folder
Click **"Add Folder"** and select a directory to monitor.

### 2. Choose Patterns
Select from **62 normatives** or create custom patterns using the wizard with tokens:

| Token | Description | Example |
|-------|-------------|---------|
| `{TEXT}` | Alphanumeric text | `Document` |
| `{TEXT:N}` | Text limited to N chars | `Report` |
| `{NUM:N}` | N-digit number | `00123` |
| `{DATE}` | Date (YYYY-MM-DD) | `2026-03-15` |
| `{DATE:YYYY}` | Year only | `2026` |
| `{DATE:YYYY-MM}` | Year-month | `2026-03` |
| `{DATE:YYYYMMDD}` | Compact date | `20260315` |
| `{VERSION}` | Version string | `v2.1` |
| `{HASH:N}` | N hex characters | `a3f2b1` |
| `{UUID}` | UUID v4 format | `550e8400-e29b-...` |
| `{CPF}` | Brazilian CPF | `123.456.789-01` |
| `{CNPJ}` | Brazilian CNPJ | `12.345.678/0001-90` |
| `{ENUM:A\|B\|C}` | Fixed options | `CONT`, `REP`, `MIN` |
| `{ANY}` | Any characters | `anything` |

### 3. Set Enforcement Mode
- **Log** — Records violations without moving files
- **Quarantine** — Moves files to a configurable, ACL-restricted subfolder
- **Block** — Immediately moves non-compliant files on creation

### 4. Start Monitoring
Enter the **admin password** and click **Start** — the Guardian watches your folders in real-time.

---

## 🔐 Security

FreeNameConvention follows the **STRIDE** threat model:

| Feature | STRIDE Category | Description |
|---------|----------------|-------------|
| Admin password (PBKDF2 100K iter.) | Spoofing, Elevation | Required to start/stop Guardian |
| Config ACL (`icacls`) | Tampering | Config file locked to Administrators + SYSTEM |
| IPC channel whitelist | Elevation | 38 allowed channels, all others rejected |
| `contextIsolation: true` | Tampering, Elevation | Electron best practice |
| `nodeIntegration: false` | Elevation | No Node.js in renderer |
| Rate limiting (5 failures / 60s) | Denial of Service | Brute-force protection on password |
| Admin Windows reset | Elevation | Only Windows admin users can reset password |

---

## 📤 Standalone PowerShell Script

For environments where you can't install the full application, **export a standalone PowerShell script** that:

1. Scans a folder for non-compliant files
2. Monitors in real-time using `FileSystemWatcher`
3. Blocks or quarantines non-compliant files
4. Runs independently — no Node.js or Electron required

```powershell
# Export from the app or use the template
.\scripts\protect-folder.ps1 -Mode scan
.\scripts\protect-folder.ps1 -Mode monitor
```

---

## 💚 Donations

FreeNameConvention is **100% free** and will always be. If this tool has helped you or your organization, please consider donating to one of these extraordinary institutions:

- 🇧🇷 [CUFA — Central Única das Favelas](https://www.cufa.org.br) — Social transformation in Brazil's communities
- 🇮🇱 [Rabi Meir Baal Haness](https://www.rabimeir.co.il) — Charity in Israel

> *All institutions are selected in compliance with international charity standards.*

---

## 🏗️ Architecture

```
src/
├── main.js                 Electron main process (37+ IPC handlers, ConfigStore)
├── preload.js              Context bridge (38 channels, 5 events)
├── core/
│   ├── i18n.js             Internationalization engine (RTL-aware, 4 languages)
│   ├── validator.js        Pattern validation engine v2 (bilingual tokens)
│   └── normatives.js       62 normatives database (6 regions, 20+ countries)
├── service/
│   ├── guardian.js          File monitoring service (chokidar + ACL quarantine)
│   └── admin-guard.js       Security module (PBKDF2 password, ACL, rate limiting)
├── locales/
│   ├── pt.json             Portuguese translations
│   ├── en.json             English translations
│   ├── he.json             Hebrew translations
│   └── es.json             Spanish translations
└── renderer/
    ├── index.html          9-page UI (wizard, dashboard, settings, help, FAQ, about)
    ├── styles.css           Dark design system with RTL support
    └── app.js               Complete renderer logic (1800+ lines)
```

---

## 🐛 Feedback & Contributions

Found a bug? Have a suggestion? Want to add a normative?

1. Use the **Feedback** page inside the app
2. Or open an [Issue on GitHub](https://github.com/odefender/FreeNameConvention/issues)

Pull requests are welcome!

---

## 📋 Roadmap

- [ ] Email/Teams notifications for violation thresholds
- [ ] Scheduled compliance reports (daily/weekly)
- [ ] File rename wizard for non-compliant files
- [ ] Bulk compliance checker for network shares
- [ ] REST API for integration with other tools
- [ ] Active Directory integration (per-group rules)
- [ ] Azure Blob / SharePoint monitoring
- [ ] Linux and macOS support
- [ ] Custom normative editor
- [ ] Full i18n for renderer UI

---

## 👨‍💻 Creator

**Rafael França**
- ✉️ rafael.franca@live.com
- 📞 +55 11 91580-0911
- 🛡️ [odefender Community](https://github.com/odefender)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

Copyright © 2026 FreeNameConvention Contributors.

---

<div align="center">

**Made with ❤️ for everyone who believes in organized digital files.**

*"Our mission is to help every company and person achieve their maximum."*

*v3.1.0 · Electron 32 · 62 Normatives · 4 Languages · 6 Regions · 20+ Countries*

</div>
