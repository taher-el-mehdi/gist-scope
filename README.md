# 🔍 Gist Scope

Browse, search, and preview your GitHub gists with a clean, fast interface. Built with React + Vite.

## ✨ Features

- 🔐 **Secure** - GitHub token stored locally, 100% client-side
- 🏷️ **Smart Categorization** - Auto-organize by language/extension
- 🔍 **Instant Search** - Filter by description or filename
- 📄 **Pagination** - Navigate large gist collections easily
- 👁️ **Syntax Highlighting** - 50+ languages with Prism.js
- 📝 **Markdown Rendering** - Native `.md` file preview
- 📋 **One-Click Copy** - Copy gist content to clipboard
- 🔗 **GitHub Link** - Open any gist on GitHub directly

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:3000` and enter your GitHub token.

## 🔑 GitHub Token Setup

You need a Personal Access Token with `gist` scope.

**Quick create:** [Generate Token →](https://github.com/settings/tokens/new?scopes=gist&description=Gist%20Previewer)

Or manually:
1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Generate new token (classic)
3. Check the `gist` scope
4. Copy the token

Your token is stored in localStorage and never leaves your browser.

## 📁 Project Structure

```
src/
├── api/github.js          # GitHub API wrapper
├── components/            # React components
├── utils/helpers.js       # Utility functions
└── styles/App.css         # Styles
```

## 🛠️ Tech Stack

- **React 18** + **Vite 5** - Fast, modern tooling
- **Prism.js** - Syntax highlighting
- **Marked** - Markdown rendering
- **GitHub REST API v3**

## 📦 Build

```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

Deploy the `dist/` folder to Vercel, Netlify, GitHub Pages, or any static host.

## 📄 License

MIT