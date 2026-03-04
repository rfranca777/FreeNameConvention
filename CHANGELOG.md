# Changelog

All notable changes to FreeNameConvention are documented here.  
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) · Versioning: [SemVer](https://semver.org/).

---

## [3.3.0] — 2026-03-04

### Added
- **Active Directory principals per folder** — assign AD users/groups with full access when locking folders
- **AD principal validation** — `testWindowsPrincipal()` validates users and groups (local + domain, 4-step lookup)
- **`config:setAdPrincipals`** IPC channel + preload whitelist entry
- **`settings:testAdPrincipal`** IPC channel + preload whitelist entry
- AD principals included in `protectConfigFile()` and `folder:lockAccess` icacls commands

### Changed
- **Full Portuguese translation** of all 62 normative descriptions in NORM_FRIENDLY (app.js)
- **Category labels translated to PT** — EUA, América Latina, União Europeia, Ásia-Pacífico, Oriente Médio, África
- UI improvements in index.html and styles.css
- `protectConfigFile()` now accepts optional `additionalPrincipals` array

### Security
- AD principal names sanitized via `sanitize(name, 128)` before icacls commands
- Input validation on all AD-related IPC handlers

---

## [3.2.0] — 2026-03-03

### Security
- **STRIDE audit** — path-traversal guard in `file:renameNonCompliant`
- **Import sanitization** — language field validated on `config:importConfig`
- **PBKDF2-SHA512** with 100,000 iterations + salt for admin passwords
- IPC whitelist enforced (38 channels — all others rejected)

### Fixed
- `smtpPass` no longer silently cleared on settings re-save
- Missing `alertEmailEnabled` guard in `sendViolationEmail`
- Added `requireTLS: true` for SMTP port 587 (STARTTLS)
- Added `transporter.verify()` in `testEmail` — errors now surfaced to UI
- Direct donation links (CUFA, Rabi Meir) point to payment pages

### Changed
- Platform badge updated: Windows Server 2016/2019/2022 + Windows 10/11
- GitHub release notes rewritten with direct download link at top

---

## [3.1.0] — 2026-03-03

### Added
- 62 normatives across 6 regions and 28+ countries
- 4 languages: Português, English, עברית (RTL), Español
- Standalone PowerShell export (`scripts/protect-folder.ps1`)
- Email alert system via Nodemailer (SMTP)
- Config import/export (JSON)
- Windows service mode (`--service` flag)

### Security
- Admin password reset requires `isAdmin()` check
- Quarantine folder locked via `icacls` ACL
- Rate limiting: 5 failures / 60s lockout

---

## [3.0.0] — 2026-03-03

### Added
- Global normatives (ISO, PCI-DSS)
- Spanish language support
- Creator credits and ODefender Community branding
- STRIDE security model documentation

---

## [1.0.0] — Initial Release

- Core file naming guardian
- Basic normatives (LGPD, NF-e, GDPR, HIPAA)
- Admin password with PBKDF2
- Quarantine mode
