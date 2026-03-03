# Changelog

All notable changes to FreeNameConvention are documented here.  
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) · Versioning: [SemVer](https://semver.org/).

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
