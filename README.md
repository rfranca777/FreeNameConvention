<div align="center">

<img src="assets/icon.ico" alt="FreeNameConvention — Open-source file naming compliance guardian for Windows" width="120"/>

<h1>FreeNameConvention</h1>

<p><strong>Open-source file naming compliance guardian for Windows Server &amp; Windows</strong><br/>
Enforce 62 international normative naming standards on your folders — real-time monitoring, quarantine, and audit logging.<br/>
ISO 27001 · GDPR · LGPD · HIPAA · SOX · NF-e · PCI-DSS · NIST · POPIA · PIPL · APPI · FERPA · eIDAS · DORA<br/>
<em>Designed for corporate file servers. Free forever. No subscription. No telemetry. 100% open-source.</em></p>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/Version-3.2.0-blue?style=for-the-badge)](https://github.com/rfranca777/FreeNameConvention/releases/tag/v3.2.0)
[![Electron](https://img.shields.io/badge/Electron-32-47848F?style=for-the-badge&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![Platform](https://img.shields.io/badge/Platform-Windows_Server_%7C_10%2F11-0078D4?style=for-the-badge&logo=windows&logoColor=white)](#-installation)
[![Normatives](https://img.shields.io/badge/Normatives-62-FF6F00?style=for-the-badge)](#-normatives)
[![Languages](https://img.shields.io/badge/Languages-4-success?style=for-the-badge)](#-languages)
[![Downloads](https://img.shields.io/github/downloads/rfranca777/FreeNameConvention/total?style=for-the-badge&color=brightgreen&label=Downloads)](https://github.com/rfranca777/FreeNameConvention/releases)
[![Stars](https://img.shields.io/github/stars/rfranca777/FreeNameConvention?style=for-the-badge&color=yellow)](https://github.com/rfranca777/FreeNameConvention)
[![ODefender](https://img.shields.io/badge/ODefender-Community-FF6F00?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/rfranca777/odefender-community)

<br/>

### *"Because compliance starts with a file name."*

<br/>

[📖 How It Works](#-how-it-works) · [📋 62 Normatives](#-normatives) · [🌐 4 Languages](#-languages) · [🔐 Security](#-security) · [❓ FAQ](#-frequently-asked-questions-faq)

<br/>

### ⬇️ [Download FreeNameConvention-Setup-3.2.0.exe (~76 MB)](https://github.com/rfranca777/FreeNameConvention/releases/download/v3.2.0/FreeNameConvention-Setup-3.2.0.exe)

*Windows Server 2016 / 2019 / 2022 · Windows 10 / 11 · x64*

</div>

---

## 🎯 The Problem We're Solving

Every organization that deals with regulatory compliance faces the same headache:

> *Thousands of files. Dozens of regulatory frameworks. And a team spending hours manually checking if file names follow the right pattern — only to find violations weeks later.*

Non-compliant file names cause **audit failures**, **document retrieval delays**, **legal exposure**, and **operational chaos** — especially for organizations operating under ISO, LGPD, GDPR, HIPAA, NF-e, and dozens of other frameworks.

**What if a guardian watched your folders 24/7 and enforced naming rules automatically?**

That's why **FreeNameConvention** exists.

---

## 🏢 Who Is This For?

FreeNameConvention is designed for **IT administrators and compliance teams** running **Windows Server file shares**, network drives, and any environment that needs automated naming policy enforcement:

| Industry | Use Case | Key Normatives |
|----------|----------|----------------|
| 🏥 **Healthcare** | Patient records, medical device documentation, HIPAA-compliant file naming | HIPAA · FDA 21 CFR Part 11 · CFM 1.821 · ANVISA RDC 204 |
| 🏦 **Finance & Banking** | Financial reports, audit trails, regulatory filings, SOX compliance | SOX · PCI-DSS · BACEN 4.893 · CVM · FINRA 4511 · DORA |
| 📋 **Tax & Accounting** | Electronic invoices, fiscal documents, tax filing compliance | NF-e · NFS-e · CT-e · SPED · eSocial · CFDI · Factura-e · FatturaPA |
| ⚖️ **Legal & Government** | Court documents, public records, LGPD/GDPR data protection | LGPD · GDPR · UK GDPR · PIPEDA · POPIA · PIPL · APPI · PDPA |
| 🏗️ **Engineering & Construction** | BIM files, project documentation, environmental reports | ISO 19650 · ABNT NBR 13531 · ISO 14001 |
| 🎓 **Education** | Student records, FERPA compliance, institutional documents | FERPA · CONARQ/e-ARQ · Decree 10.278 |
| 🛡️ **Cybersecurity & IT** | Information security documentation, audit evidence, incident reports | ISO 27001 · NIST SP 800-53 · NIS2 · APRA CPS 234 · DoD 5015.02 |
| 🏭 **Manufacturing & Quality** | Quality management records, inspection reports, certifications | ISO 9001 · ISO 13485 · ISO 45001 · ISO 15489 |

---

## ✨ Features

<table>
<tr>
<td width="50%">

**⏱️ Without FreeNameConvention**
- Files named `final_v2_USE_THIS_REALLY.pdf` 😩
- Manual audits before every inspection
- Non-compliant documents discovered during external audit
- No traceability — who saved what, when, why?
- Different teams, different naming styles

</td>
<td width="50%">

**⚡ With FreeNameConvention**
- Real-time enforcement: non-compliant files go to quarantine instantly
- 62 ready-to-use normative patterns from ISO, GDPR, LGPD, HIPAA...
- Violation log with CSV export, searchable and filterable
- Admin password + ACL config protection (STRIDE security model)
- One tool, all your folders, zero daily effort

</td>
</tr>
</table>

| Feature | Description |
|---------|-------------|
| 🛡️ **Real-time Guardian** | Monitors folders via `chokidar` and enforces naming rules as files are created |
| 📋 **62 built-in normatives** | ISO, GDPR, HIPAA, LGPD, NF-e, SOX, APPI, POPIA, PIPL, and many more |
| 🌍 **6 regions covered** | Global, Americas, Europe, Asia-Pacific, Middle East, Africa |
| 🌐 **4 languages** | Português 🇧🇷 · English 🇺🇸 · עברית 🇮🇱 · Español 🇪🇸 (RTL support included) |
| 🧙 **Pattern wizard** | Step-by-step builder with live preview and drag-and-drop token blocks |
| 🔒 **Admin password** | PBKDF2 (100K iterations) — required to start/stop the Guardian |
| 📂 **Per-folder rules** | Each folder: own patterns, enforcement mode, color, priority, owner |
| 🚫 **Quarantine mode** | Non-compliant files moved to ACL-restricted subfolder automatically |
| 📧 **Email alerts** | SMTP notifications on violations (Nodemailer) |
| 📤 **PowerShell export** | Standalone `.ps1` — runs without Node.js or Electron |
| 📊 **Violation log** | Searchable, filterable, CSV export |
| ⚡ **Config import/export** | Backup and share folder configurations as JSON |
| 🖥️ **Windows service mode** | `--service` flag for background/silent operation |
| 🔐 **Config file protection** | Windows `icacls` ACL restrictions on configuration file |

---

## 📜 Normatives

FreeNameConvention ships with **62 ready-to-use normatives** across 6 regions and 28+ countries. Each comes with multiple patterns, token templates, and recommended file extensions.

### 🌐 Global (8)

| Normative | Area | Scope |
|-----------|------|-------|
| ISO 9001:2015 | Quality Management | All industries |
| ISO 13485:2016 | Medical Devices QMS | Healthcare |
| ISO 15489-1:2016 | Records Management | All industries |
| ISO 27001:2022 | Information Security | All industries |
| ISO 14001:2015 | Environmental Management | All industries |
| ISO 45001:2018 | Occupational Health & Safety | All industries |
| ISO 19650 | BIM / Construction | Architecture, Engineering |
| PCI DSS v4.0 | Payment Card Security | Financial, Retail |

### 🌎 Americas (24)

| Country | Normatives |
|---------|-----------|
| 🇧🇷 Brazil (16) | NF-e · NFS-e · CT-e · SPED · eSocial · BACEN 4.893 · CVM · CFM 1.821 · ANVISA RDC 204 · LGPD · CNJ 065 · CLT/eSocial/CAGED · CONARQ/e-ARQ · Decree 10.278 · ABNT NBR 13531 · MAPA/SISLEGIS |
| 🇺🇸 USA (7) | SOX · HIPAA · FDA 21 CFR Part 11 · FINRA 4511 · DoD 5015.02 · NIST SP 800-53 · FERPA |
| 🇲🇽 Mexico (2) | CFDI (SAT) · LFPDPPP |
| 🇦🇷 Argentina (1) | AFIP Factura Electrónica |
| 🇨🇴 Colombia (1) | DIAN Facturación Electrónica |
| 🇨🇱 Chile (1) | SII DTE |
| 🇨🇦 Canada (1) | PIPEDA |

### 🇪🇺 Europe (10)

| Country | Normatives |
|---------|-----------|
| 🇪🇺 European Union (4) | GDPR · eIDAS · NIS2 Directive · DORA |
| 🇬🇧 United Kingdom (1) | UK GDPR + DPA 2018 |
| 🇩🇪 Germany (1) | GoBD |
| 🇪🇸 Spain (1) | Factura-e |
| 🇮🇹 Italy (1) | FatturaPA |
| 🇫🇷 France (1) | CNIL Guidelines |

### 🌏 Asia-Pacific (9)

| Country | Normatives |
|---------|-----------|
| 🇯🇵 Japan (1) | APPI |
| 🇦🇺 Australia (2) | Privacy Act 1988 · APRA CPS 234 |
| 🇮🇳 India (1) | DPDP Act 2023 |
| 🇰🇷 South Korea (1) | PIPA |
| 🇨🇳 China (1) | PIPL |
| 🇸🇬 Singapore (1) | PDPA |
| 🇹🇭 Thailand (1) | PDPA |

### 🕌 Middle East (4)

| Country | Normatives |
|---------|-----------|
| 🇮🇱 Israel (2) | Archives Law (תשט"ו-1955) · Privacy Protection Law (5741-1981) |
| 🇸🇦 Saudi Arabia (1) | PDPL |
| 🇦🇪 UAE (1) | DIFC Data Protection Law |

### 🌍 Africa (3)

| Country | Normatives |
|---------|-----------|
| 🇿🇦 South Africa (1) | POPIA |
| 🇳🇬 Nigeria (1) | NDPR / NDPA 2023 |
| 🇰🇪 Kenya (1) | Data Protection Act 2019 |

### 📁 Generic (1)

| Template | Patterns |
|----------|---------|
| Internal Corporate Policy | Documents · Spreadsheets · Images/Photos · System Backups |

---

## 🌐 Languages

| Language | Direction | Code | Status |
|----------|-----------|------|--------|
| 🇧🇷 Português | LTR | `pt` | ✅ Complete |
| 🇺🇸 English | LTR | `en` | ✅ Complete |
| 🇮🇱 עברית (Hebrew) | **RTL** | `he` | ✅ Complete — UI adapts direction |
| 🇪🇸 Español | LTR | `es` | ✅ Complete |

Switch languages dynamically from **Settings** — the tray menu and system labels update instantly without restart.

---

## 🛠️ Installation

### ⬇️ Option 1 — Windows Installer (Recommended)

**[⬇️ FreeNameConvention-Setup-3.2.0.exe (~76 MB)](https://github.com/rfranca777/FreeNameConvention/releases/download/v3.2.0/FreeNameConvention-Setup-3.2.0.exe)**

> Tested on: **Windows Server 2016 · Windows Server 2019 · Windows Server 2022 · Windows 10 · Windows 11** (x64)

- One-click NSIS installer
- Optional install directory
- Desktop shortcut + Start Menu entry (on server: Start Menu only)
- Uninstaller included
- **No internet connection required after download**
- **No admin rights required** to run (only to start the Guardian)

### 🔧 Option 2 — From Source

**Prerequisites:** [Node.js](https://nodejs.org/) v18+ · Windows Server 2016/2019/2022 or Windows 10/11 x64

```bash
git clone https://github.com/rfranca777/FreeNameConvention.git
cd FreeNameConvention
npm install
npm start
```

### 🏗️ Build Your Own Installer

```bash
npm run build
# Output: dist/FreeNameConvention-Setup-3.2.0.exe
```

---

## 📖 How It Works

### Step 1 — Add a Folder
Click **"Add Folder"** and select a directory to monitor. Set a name, owner, priority, and color for each folder.

### Step 2 — Choose Patterns
Select from **62 normatives** or build custom patterns using the wizard:

| Token | Description | Example Output |
|-------|-------------|----------------|
| `{TEXT}` | Alphanumeric text | `Document` |
| `{TEXT:N}` | Text limited to N characters | `Report` |
| `{NUM:N}` | Zero-padded N-digit number | `00123` |
| `{DATE}` | ISO date (YYYY-MM-DD) | `2026-03-15` |
| `{DATE:YYYY}` | Year only | `2026` |
| `{DATE:YYYY-MM}` | Year-month | `2026-03` |
| `{DATE:YYYYMMDD}` | Compact date | `20260315` |
| `{VERSION}` | Version string | `v2.1` |
| `{HASH:N}` | N hex characters | `a3f2b1` |
| `{UUID}` | UUID v4 | `550e8400-e29b-41d4-a716-446655440000` |
| `{CPF}` | Brazilian CPF | `123.456.789-01` |
| `{CNPJ}` | Brazilian CNPJ | `12.345.678/0001-90` |
| `{ENUM:A\|B\|C}` | Fixed list of options | `CONT`, `REP`, `MIN` |
| `{ANY}` | Any character sequence | `anything` |

**Example patterns:**
```
NF-e:    NF-{CNPJ}-{NUM:9}-{DATE:YYYYMMDD}.xml
GDPR:    DPIA-{TEXT}-{DATE:YYYY-MM-DD}.pdf
SOX:     SOX-{ENUM:CTRL|TEST|REPORT}-{NUM:5}-{DATE:YYYY-MM-DD}.xlsx
Generic: {ENUM:CONT|REP|MIN|PROP}-{NUM:5}-{TEXT}-{DATE:YYYY-MM-DD}.pdf
```

### Step 3 — Set Enforcement Mode

| Mode | Behavior |
|------|----------|
| 📝 **Log** | Records violations in the log — no file is moved |
| 📦 **Quarantine** | Moves non-compliant files to an ACL-restricted subfolder |
| 🚫 **Block** | Immediately moves files on creation — real-time enforcement |

### Step 4 — Start the Guardian
Enter your **admin password** → click **Start** → the Guardian runs silently in the background.

---

## 🔐 Security

FreeNameConvention is built around the **STRIDE** threat model:

| Feature | STRIDE Category | Implementation |
|---------|----------------|----------------|
| Admin password | Spoofing · Elevation | PBKDF2 with 100,000 iterations + salt |
| Rate limiting | Denial of Service | 5 failures / 60s lockout |
| Config ACL | Tampering | `icacls` → Administrators + SYSTEM only |
| IPC whitelist | Elevation | 38 allowed channels — all others rejected |
| `contextIsolation: true` | Tampering · Elevation | Electron security best practice |
| `nodeIntegration: false` | Elevation | No Node.js API in renderer process |
| Windows admin reset | Elevation | `isAdmin()` check before password reset |
| Quarantine ACL | Tampering | Quarantine folder locked via `icacls` |

---

## 📤 Standalone PowerShell Script

Can't install Electron in your environment? **Export a standalone PowerShell script** directly from the app:

```powershell
# Scan existing files for violations
.\scripts\protect-folder.ps1 -Mode scan -Path "C:\Documents\NF-e"

# Real-time monitoring with FileSystemWatcher
.\scripts\protect-folder.ps1 -Mode monitor -Path "C:\Documents\NF-e"
```

Runs independently — **no Node.js, no Electron, no installation required.**

---

## 💚 Donations

FreeNameConvention is **100% free** and will always be. If this tool has helped you or your organization, please consider donating to one of these extraordinary institutions:

- 🇧🇷 [CUFA — Central Única das Favelas](https://www.cufa.org.br) — Social transformation in Brazil's communities
- 🇮🇱 [Rabi Meir Baal Haness](https://www.rabimeir.co.il) — Charity and humanitarian aid in Israel

> *All institutions are selected in compliance with international charity standards.*

---

## 🏗️ Architecture

```
FreeNameConvention/
├── src/
│   ├── main.js                 ← Electron main process (37+ IPC handlers)
│   ├── preload.js              ← Context bridge (38 channels, 5 events)
│   ├── core/
│   │   ├── i18n.js             ← i18n engine (RTL-aware, 4 languages)
│   │   ├── validator.js        ← Pattern validation engine (14 token types)
│   │   └── normatives.js       ← 62 normatives (6 regions, 28+ countries)
│   ├── service/
│   │   ├── guardian.js         ← File watcher (chokidar + ACL quarantine)
│   │   └── admin-guard.js      ← Security (PBKDF2, ACL, rate limiting)
│   ├── locales/
│   │   ├── pt.json             ← Portuguese
│   │   ├── en.json             ← English
│   │   ├── he.json             ← Hebrew
│   │   └── es.json             ← Spanish
│   └── renderer/
│       ├── index.html          ← 9-page UI
│       ├── styles.css          ← Dark design system + RTL support
│       └── app.js              ← Complete renderer logic (1800+ lines)
├── assets/
│   └── icon.ico
├── scripts/
│   └── protect-folder.ps1      ← Standalone PowerShell guardian
└── package.json
```

**Tech stack:** Electron 32 · Node.js 18+ · chokidar · nodemailer · NSIS installer

---

## 📋 Roadmap

| Priority | Feature | Status |
|----------|---------|--------|
| 🔥 High | Email/Teams notifications for violation thresholds | Planned |
| 🔥 High | File rename wizard for non-compliant files | Planned |
| 🟡 Medium | Scheduled compliance reports (daily/weekly PDF) | Planned |
| 🟡 Medium | Bulk compliance checker for network shares | Planned |
| 🟢 Low | REST API for integration with other tools | Planned |
| 🟢 Low | Active Directory integration (per-group rules) | Planned |
| 🟢 Low | Azure Blob / SharePoint monitoring | Planned |
| 🟢 Low | Linux and macOS support | Planned |
| 🟢 Low | Custom normative editor | Planned |
| 🟢 Low | Full i18n for renderer UI (200+ strings) | Planned |

---

## ❓ Frequently Asked Questions (FAQ)

<details>
<summary><strong>What is file naming compliance?</strong></summary>

File naming compliance means ensuring that every document in your organization follows a standardized naming pattern required by regulatory frameworks (ISO, GDPR, LGPD, HIPAA, SOX, NF-e, etc.). Non-compliant file names can cause audit failures, retrieval delays, legal exposure, and operational chaos.

</details>

<details>
<summary><strong>How is FreeNameConvention different from a simple file renamer?</strong></summary>

FreeNameConvention is NOT a file renamer — it's a **real-time compliance guardian**. It monitors your folders 24/7, validates every new file against normative patterns, and can quarantine non-compliant files instantly. It covers 62 international normatives, provides audit logging with CSV export, and enforces ACL-based security. No other free tool offers this combination.

</details>

<details>
<summary><strong>Which regulations does it support?</strong></summary>

62 normatives across 28+ countries: ISO 9001, ISO 13485, ISO 15489, ISO 27001, ISO 14001, ISO 45001, ISO 19650, PCI-DSS, GDPR, UK GDPR, eIDAS, NIS2, DORA, GoBD, Factura-e, FatturaPA, CNIL, LGPD, NF-e, NFS-e, CT-e, SPED, eSocial, BACEN 4.893, CVM, CFM 1.821, ANVISA RDC 204, CNJ 065, CONARQ/e-ARQ, ABNT NBR 13531, Decree 10.278, MAPA/SISLEGIS, SOX, HIPAA, FDA 21 CFR Part 11, FINRA 4511, DoD 5015.02, NIST SP 800-53, FERPA, CFDI, LFPDPPP, PIPEDA, AFIP, DIAN, SII DTE, APPI, Privacy Act 1988, APRA CPS 234, DPDP Act, PIPA, PIPL, PDPA (Singapore), PDPA (Thailand), Archives Law Israel, Privacy Protection Law Israel, PDPL, DIFC, POPIA, NDPR/NDPA, Kenya DPA.

</details>

<details>
<summary><strong>Is it really free? What's the catch?</strong></summary>

Yes — 100% free, open-source (MIT License), no subscription, no telemetry, no data collection, no ads. The project is maintained by the ODefender Community and donations go directly to charity institutions (CUFA and Rabi Meir Baal Haness).

</details>

<details>
<summary><strong>Does it work on network shares / mapped drives?</strong></summary>

Yes — FreeNameConvention monitors any folder you add, including network shares (UNC paths) and mapped drives. The Guardian uses chokidar for cross-compatible file watching.

</details>

<details>
<summary><strong>Can I create custom naming patterns?</strong></summary>

Absolutely. The built-in Pattern Wizard lets you build custom patterns using 14 token types: `{TEXT}`, `{NUM:N}`, `{DATE}`, `{VERSION}`, `{HASH:N}`, `{UUID}`, `{CPF}`, `{CNPJ}`, `{ENUM:A|B|C}`, `{ANY}`, and more. You can combine tokens to match any naming convention your organization requires.

</details>

<details>
<summary><strong>Can I run it without installing Electron?</strong></summary>

Yes — export a standalone PowerShell script directly from the app. It runs independently using `FileSystemWatcher`, requiring no Node.js or Electron installation.

</details>

<details>
<summary><strong>What enforcement modes are available?</strong></summary>

Three modes: **Log** (records violations only), **Quarantine** (moves non-compliant files to an ACL-restricted subfolder), and **Block** (immediately quarantines files on creation for real-time enforcement).

</details>

---

## 🔄 Alternatives Comparison

| Feature | FreeNameConvention | Manual Audit | FileBot | Bulk Rename Utility |
|---------|-------------------|--------------|---------|---------------------|
| **Real-time monitoring** | ✅ 24/7 Guardian | ❌ Manual | ❌ On-demand | ❌ On-demand |
| **Regulatory normatives** | ✅ 62 built-in | ❌ None | ❌ None | ❌ None |
| **Quarantine enforcement** | ✅ ACL-protected | ❌ N/A | ❌ N/A | ❌ N/A |
| **Audit logging** | ✅ CSV export | 📝 Manual | ❌ None | ❌ None |
| **Email alerts** | ✅ SMTP | ❌ None | ❌ None | ❌ None |
| **Admin security** | ✅ PBKDF2 + ACL | ❌ None | ❌ None | ❌ None |
| **Custom patterns** | ✅ 14 token types | N/A | ✅ Regex | ✅ Regex |
| **Multi-language** | ✅ 4 + RTL | ❌ N/A | ✅ Multi | ❌ English |
| **Cost** | ✅ **Free forever** | ✅ Free | 💰 Paid | ✅ Free |
| **Open-source** | ✅ MIT | N/A | ❌ Proprietary | ❌ Proprietary |

---

## 🐛 Feedback & Contributions

Found a bug? Have a suggestion? Want to add a new normative for your country?

1. 🐛 Open an [Issue](https://github.com/rfranca777/FreeNameConvention/issues)
2. 💬 Join the [Discussions](https://github.com/rfranca777/FreeNameConvention/discussions)
3. 🔧 Submit a [Pull Request](https://github.com/rfranca777/FreeNameConvention/pulls)
4. 📢 Use the **Feedback** page inside the app

**Adding a normative?** Each entry needs: `id`, `name`, `fullName`, `area`, `region`, `countries`, `obligation`, `requirement`, and at least one `pattern` with `template` + `example`.

---

## 👤 About the Author & Community

<table>
<tr>
<td>

**Rafael França**
**Customer Success Architect — Cyber Security @ Microsoft**

I work at Microsoft helping enterprises unlock the full potential of the security ecosystem. FreeNameConvention was born from a real need I observed: organizations spending enormous effort on document compliance — manually checking names, getting caught in audits, losing traceability.

> *"Our mission is to help every company and person achieve their maximum."*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-rfranca777-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rfranca777/)
[![Email](https://img.shields.io/badge/Email-rafael.franca@live.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:rafael.franca@live.com)
[![ODefender](https://img.shields.io/badge/🛡️_ODefender-Community-FF6F00?style=flat-square)](https://github.com/rfranca777/odefender-community)

</td>
</tr>
</table>

FreeNameConvention is part of the **[ODefender Community](https://github.com/rfranca777/odefender-community)** — open-source, enterprise-grade automation tools for security and compliance, built for the real world.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

Copyright © 2026 Rafael França / ODefender Community Contributors.

---

<div align="center">

**Made with ❤️ for everyone who believes in organized, compliant digital files.**

*v3.2.0 · Electron 32 · 62 Normatives · 4 Languages · 6 Regions · 28+ Countries*

[![ODefender Community](https://img.shields.io/badge/Part_of-ODefender_Community-FF6F00?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/rfranca777/odefender-community)

---

<sub>

**Keywords:** file naming convention, file naming compliance, Windows Server file naming, Windows Server compliance, file server naming policy, network share naming enforcement, naming standard enforcement, document naming policy, regulatory file naming, ISO 27001 file naming, GDPR document naming, LGPD naming compliance, HIPAA file naming, SOX audit file naming, NF-e naming validation, PCI-DSS file naming, NIST document naming, FERPA records naming, POPIA file compliance, PIPL document naming, APPI data naming, eIDAS file naming, DORA compliance, folder monitoring, real-time file watcher, quarantine non-compliant files, file audit logging, document management, data governance, regulatory compliance tool, compliance automation, file naming guardian, open-source compliance, Windows Server compliance tool, electron compliance app, naming convention enforcer, document compliance checker, file naming validator, naming pattern wizard, corporate naming policy, enterprise file naming, IT administrator compliance, file server governance, automated compliance, 24/7 folder guardian, ACL quarantine, PBKDF2 security, STRIDE threat model, normative naming patterns, free compliance tool

</sub>

</div>
