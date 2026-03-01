# FreeNameConvention

> **Our mission is to help every company and person achieve the maximum in organization and compliance for digital file management — free, open, and accessible to all.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows-0078D4.svg)]()
[![Open Source](https://img.shields.io/badge/Open%20Source-❤-red.svg)]()

---

## 🎯 What is FreeNameConvention?

**FreeNameConvention** is a free, open-source desktop application that monitors folders and enforces file naming conventions based on **27+ international normatives** including ISO 9001, ISO 27001, LGPD, GDPR, HIPAA, SOX, and many more.

It acts as a **File Naming Guardian** — a background service that watches your folders in real-time, detects non-compliant files, and can automatically block or quarantine them.

### ✨ Key Features

- 🔍 **Real-time monitoring** — Watches folders with configurable patterns
- 🚫 **Block or Quarantine** — Non-compliant files are moved immediately
- 📋 **27+ international normatives** — Ready-to-use naming patterns
- 🌐 **Multilingual** — Portuguese, English, and Hebrew (with RTL support)
- 🛡️ **Admin protection** — Password-protected settings, ACL-secured config
- ⚙️ **Windows auto-start** — Runs as a background service on boot
- 📦 **Standalone script export** — Download a PowerShell script for any folder
- 💚 **100% Free** — MIT License, no ads, no tracking

---

## 📸 Screenshots

> *Coming soon*

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or later
- **Windows** 10/11 (64-bit)

### Installation

```bash
# Clone the repository
git clone https://github.com/freenameconvention/guardian.git
cd guardian

# Install dependencies
npm install

# Run the application
npm start
```

### Build Installer

```bash
npm run build:installer
```

This creates a Windows NSIS installer in the `dist/` folder.

---

## 📖 How It Works

### 1. Add a Folder
Click **"Add Folder"** and select a directory to monitor.

### 2. Choose Patterns
Select from **27+ normatives** or create custom patterns using tokens:

| Token | Description | Example |
|-------|-------------|---------|
| `{TEXT}` | Alphanumeric text | `Document` |
| `{NUM:N}` | N-digit number | `00123` |
| `{DATE}` | Date (YYYY-MM-DD) | `2026-03-15` |
| `{DATE:YYYY}` | Year only | `2026` |
| `{DATE:YYYY-MM}` | Year-month | `2026-03` |
| `{VERSION}` | Version string | `v2.1` |
| `{HASH:N}` | N hex characters | `a3f2b1` |
| `{UUID}` | UUID v4 format | `550e8400-e29b-...` |
| `{ANY}` | Any characters | `anything` |

### 3. Set Enforcement Mode
- **Log** — Records violations without moving files
- **Quarantine** — Moves files to a configurable subfolder
- **Block** — Immediately moves non-compliant files on creation

### 4. Start Monitoring
Click **Start** and the guardian watches your folder in real-time.

---

## 🌐 Supported Languages

| Language | Direction | Status |
|----------|-----------|--------|
| 🇧🇷 Português | LTR | ✅ Complete |
| 🇺🇸 English | LTR | ✅ Complete |
| 🇮🇱 עברית (Hebrew) | RTL | ✅ Complete |

Switch languages dynamically from **Settings** — the entire interface updates instantly.

---

## 📜 Normatives Included

FreeNameConvention ships with **27+ ready-to-use normatives**:

| Area | Normatives |
|------|-----------|
| Quality | ISO 9001, ISO 13485, ISO 15489 |
| Security | ISO 27001, SOX, PCI DSS v4.0, DoD 5015.02 |
| Privacy | LGPD, GDPR, HIPAA, Israel Privacy Protection |
| Tax/Financial | NF-e, NFS-e, CT-e, SPED, BACEN 4893, CVM, FINRA |
| Government | CNJ 065, Decreto 10.278, CONARQ, Israel Archives Law |
| Health | CFM 1821, ANVISA RDC 204, FDA 21 CFR Part 11 |
| Environment | ISO 14001 |
| Construction | ISO 19650, ABNT NBR 13531 |
| Labor | CLT/eSocial |
| Agribusiness | MAPA |

Each normative comes with multiple **ready-to-use patterns** and neutral examples.

---

## 🔐 Security Features

- **Admin password** — Protect settings from unauthorized changes
- **Config file protection** — ACL restrictions via `icacls`
- **Auto-start protection** — Service registered in Windows Registry
- **Context isolation** — Electron security best practices

---

## 📤 Standalone PowerShell Script

For environments where you can't install the full application, you can **export a standalone PowerShell script** that:

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

### 🇧🇷 Brazil
- [AACD](https://aacd.org.br/doar/) — Disabled persons assistance
- [GRAACC](https://graacc.org.br/doacoes/) — Childhood cancer support
- [Fundação Abrinq](https://www.fadc.org.br/como-ajudar) — Children's rights
- [MSF Brasil](https://www.msf.org.br/doe/) — Doctors Without Borders
- [Pastoral da Criança](https://www.pastoraldacrianca.org.br/como-ajudar) — Child nutrition and health
- [Instituto Ayrton Senna](https://www.institutoayrtonsenna.org.br/doe) — Education
- [APAE Brasil](https://apaebrasil.org.br/como-ajudar) — Intellectual disability support

### 🇮🇱 Israel
- [Leket Israel](https://www.leket.org/en/donate/) — Food rescue and humanitarian aid

> All institutions are selected in compliance with international charity standards, including the Microsoft Give program guidelines.

---

## 🐛 Feedback & Contributions

Found a bug? Have a suggestion? Want to add a normative?

1. Use the **Feedback** page inside the app
2. Or open an [Issue on GitHub](https://github.com/freenameconvention/guardian/issues)

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

---

## 🏗️ Architecture

```
src/
├── main.js                 Electron main process (22 IPC handlers)
├── preload.js              Context bridge (secure API exposure)
├── core/
│   ├── i18n.js             Internationalization engine (RTL-aware)
│   ├── validator.js        Pattern validation engine v2 (bilingual tokens)
│   └── normatives.js       27+ normatives database
├── service/
│   ├── guardian.js          File monitoring service (chokidar)
│   └── admin-guard.js      Security module (password, ACL, registry)
├── locales/
│   ├── pt.json             Portuguese translations
│   ├── en.json             English translations
│   └── he.json             Hebrew translations
└── renderer/
    ├── index.html          9-page UI structure
    ├── styles.css          Design system with RTL support
    └── app.js              Complete renderer logic
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

Copyright (c) 2026 FreeNameConvention Contributors.

---

<div align="center">

**Made with ❤️ for everyone who believes in organized digital files.**

*"Our mission is to help every company and person achieve their maximum."*

</div>
