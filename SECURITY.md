# Security Policy — FreeNameConvention

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 3.2.x   | ✅ Current release |
| < 3.2   | ❌ Upgrade recommended |

## Security Model

FreeNameConvention is built around the **STRIDE** threat model:

- **Spoofing**: Admin password protected with PBKDF2 (100,000 iterations + salt)
- **Tampering**: Configuration file protected via Windows `icacls` ACL (Administrators + SYSTEM only)
- **Repudiation**: Full violation logging with timestamps, file paths, and CSV export
- **Information Disclosure**: `contextIsolation: true`, `nodeIntegration: false`, IPC whitelist (38 channels)
- **Denial of Service**: Rate limiting — 5 failed login attempts trigger 60-second lockout
- **Elevation of Privilege**: `isAdmin()` check before password reset; quarantine folders locked via `icacls`

## Reporting a Vulnerability

If you discover a security vulnerability in FreeNameConvention, please report it responsibly:

1. **Email**: [rafael.franca@live.com](mailto:rafael.franca@live.com)
2. **GitHub**: Open a [security advisory](https://github.com/rfranca777/FreeNameConvention/security/advisories/new)

**Do NOT open a public issue for security vulnerabilities.**

We will acknowledge your report within 48 hours and work on a fix immediately.

## Responsible Disclosure

We appreciate the security research community and will credit all responsible disclosures in our release notes (unless you prefer to remain anonymous).
