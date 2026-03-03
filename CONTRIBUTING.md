# Contributing to FreeNameConvention

Thank you for your interest in contributing! 🎉

## How to Contribute

### 🐛 Report a Bug
1. Search [existing issues](https://github.com/rfranca777/FreeNameConvention/issues) first
2. Open a new issue using the **Bug Report** template
3. Include: OS version, steps to reproduce, expected vs actual behavior

### 💡 Suggest a Feature
1. Open a [Discussion](https://github.com/rfranca777/FreeNameConvention/discussions) first to validate the idea
2. If approved, open a Feature Request issue

### 🌍 Add a New Normative
Each normative entry in `src/core/normatives.js` requires:
- `id` — unique identifier (e.g. `gdpr_eu`)
- `name` — short name (e.g. `GDPR`)
- `fullName` — full name
- `area` — e.g. `Data Protection`
- `region` — `global` | `americas` | `europe` | `asia_pacific` | `middle_east` | `africa`
- `countries` — array of country codes
- `obligation` — `mandatory` | `recommended`
- `requirement` — one-line description
- `patterns` — array with `{ template, example, extensions[] }`

### 🔧 Submit a Pull Request
1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature`
3. Make your changes
4. Test: `node -e "require('./src/core/normatives').getAll()"`
5. Commit with a clear message following [Conventional Commits](https://www.conventionalcommits.org/)
6. Open a PR targeting `main`

### 📝 Commit Message Format
```
type: short description

- detail 1
- detail 2
```
Types: `feat` · `fix` · `docs` · `refactor` · `security` · `chore`

## Development Setup
```bash
git clone https://github.com/rfranca777/FreeNameConvention.git
cd FreeNameConvention
npm install
npm start
```

## Code Style
- Plain JavaScript (no TypeScript, no bundler)
- No external dependencies beyond `chokidar` and `nodemailer`
- All IPC channels must be declared in `preload.js`
- Security-sensitive code must follow the STRIDE model documented in `SECURITY.md`
