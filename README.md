# 🔍 GitHub Gist Previewer (Gist Scope)

A modern, fast, and elegant web application for browsing, searching, and previewing your GitHub gists. Built with React and Vite for blazing-fast performance.

![GitHub Gist Previewer](./screenshots/preview.png)

## ✨ Features

### Core Functionality
- 🔐 **Secure Authentication** - Uses GitHub Personal Access Token (stored locally, never sent to servers)
- 📚 **Complete Gist Library** - Fetches all your gists with pagination support
- 🏷️ **Smart Categorization** - Automatically categorizes gists by file extension/language
- 🔍 **Instant Search** - Fast client-side search by description or filename with debouncing
- 👁️ **Syntax Highlighting** - Beautiful code preview with Prism.js supporting 50+ languages
- 📝 **Markdown Rendering** - Native Markdown preview for `.md` files
- 📋 **One-Click Copy** - Copy any gist content to clipboard instantly
- 🔗 **GitHub Integration** - Open any gist in GitHub with one click

### Technical Highlights
- ⚡ Built with **Vite + React** for optimal performance
- 🎨 Clean, minimal, developer-friendly UI
- 📱 Responsive design (desktop-first)
- 🚀 100% client-side - no backend required
- 🎯 Smart error handling (rate limits, invalid tokens)
- ⏱️ Loading states and empty states
- 💾 Local token persistence

## 🖼️ Screenshots

### Authentication Screen
![Auth Screen](./screenshots/auth.png)

### Main Dashboard
![Dashboard](./screenshots/dashboard.png)

### Gist Preview
![Preview Panel](./screenshots/preview-panel.png)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- A GitHub account
- GitHub Personal Access Token with `gist` scope

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gist-scope
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Enter your GitHub Personal Access Token
   - Start browsing your gists!

## 🔑 GitHub Personal Access Token Setup

To use this application, you need a GitHub Personal Access Token with `gist` scope.

### Creating a Token

1. Go to [GitHub Settings → Personal Access Tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give your token a descriptive name (e.g., "Gist Previewer")
4. Select the **`gist`** scope (required for reading gists)
5. Set an expiration date (or select "No expiration" if preferred)
6. Click **"Generate token"**
7. **Copy the token immediately** (you won't be able to see it again!)

### Quick Link
[Create Token with Gist Scope →](https://github.com/settings/tokens/new?scopes=gist&description=Gist%20Previewer)

### Security Note
Your token is stored in your browser's localStorage and is **never** sent to any server other than GitHub's API. The application is 100% client-side.

## 📁 Project Structure

```
gist-scope/
├── src/
│   ├── api/
│   │   └── github.js           # GitHub API wrapper
│   ├── components/
│   │   ├── App.jsx              # Main application component
│   │   ├── AuthForm.jsx         # Authentication form
│   │   ├── Sidebar.jsx          # Language filter sidebar
│   │   ├── SearchBar.jsx        # Debounced search input
│   │   ├── GistList.jsx         # Gist list display
│   │   └── GistPreview.jsx      # Gist preview panel
│   ├── utils/
│   │   └── helpers.js           # Utility functions
│   ├── styles/
│   │   └── App.css              # Application styles
│   └── main.jsx                 # Application entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technology Stack

### Core
- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language

### Libraries
- **Prism.js** - Syntax highlighting (50+ languages)
- **Marked** - Markdown parsing and rendering

### API
- **GitHub REST API v3** - Gist data fetching

## 🎯 Why Vite + React?

I chose **Vite + React** over Vanilla JS because:

1. **Complex State Management** - The app manages authentication, gists, filters, search, and preview states across multiple interconnected components
2. **Component Reusability** - React's component model makes code modular and maintainable
3. **Developer Experience** - Vite provides instant HMR and React DevTools simplify debugging
4. **Maintainability** - Hooks and component lifecycle make it easier to extend features
5. **Minimal Overhead** - With Vite, the bundle size remains small and performance is excellent

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist/` directory, ready to deploy to any static hosting service.

## 🚀 Deployment

This application can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Push the `dist` folder to a `gh-pages` branch
- **Cloudflare Pages**: Connect your repository

## 🔥 Features Breakdown

### 1. Authentication
- Secure token input with password masking
- Token validation before storing
- Persistent authentication (localStorage)
- Easy logout functionality

### 2. Language Categorization
- Automatic file extension detection
- Multi-category support (gists with multiple files appear in multiple categories)
- Category count badges
- "All Gists" view

### 3. Search & Filter
- Real-time search with 300ms debounce
- Search by description or filename
- Combine search with category filters
- Clear search button

### 4. Gist List
- Display filename, description, and last updated date
- File count indicator for multi-file gists
- Language tags for each file
- Visual selection state
- Empty state handling

### 5. Preview Panel
- Syntax-highlighted code for 50+ languages
- Markdown rendering for `.md` files
- Multi-file tab navigation
- Copy to clipboard
- Open in GitHub
- Public/Secret badge

### 6. Error Handling
- Invalid token detection
- API rate limit warnings with reset time
- Network error handling
- Loading states throughout

## 🎨 Customization

### Changing the Theme
Edit the CSS variables in [src/styles/App.css](src/styles/App.css):

```css
:root {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --accent-primary: #58a6ff;
  /* ... more variables */
}
```

### Adding More Languages
Add Prism language components in [src/components/GistPreview.jsx](src/components/GistPreview.jsx):

```javascript
import 'prismjs/components/prism-your-language';
```

## 🐛 Known Limitations

- GitHub API rate limit: 5,000 requests/hour for authenticated users
- Large gists (>1MB) may take time to load
- Very long file lists in a gist are truncated in the list view

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👤 Author

Built with ❤️ by a senior frontend engineer

## 🙏 Acknowledgments

- GitHub for the excellent REST API
- Prism.js for syntax highlighting
- Marked for Markdown parsing
- The React and Vite teams for amazing tools

---

**Happy Gist Browsing! 🎉**