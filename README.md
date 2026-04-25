# ShopAPI Docs

A production-grade API documentation website for the ShopAPI e-commerce backend.

Built with **React 18 + CSS Modules**.

## Project Structure

```
src/
├── App.jsx                    # Root component — renders all sections
├── App.module.css             # App-level styles (hero, layout, etc.)
├── index.js                   # React entry point
├── index.css                  # Global styles + CSS variables
│
├── components/
│   ├── Sidebar.jsx            # Left nav with active section highlighting
│   ├── Sidebar.module.css
│   ├── Topbar.jsx             # Sticky top bar with version badges
│   ├── Topbar.module.css
│   ├── SectionBlock.jsx       # Reusable section wrapper (icon + title + desc)
│   ├── SectionBlock.module.css
│   ├── EndpointCard.jsx       # Collapsible endpoint card (method, path, body)
│   ├── EndpointCard.module.css
│   ├── CodeBlock.jsx          # Syntax-highlighted code with Copy button
│   └── CodeBlock.module.css
│
├── data/
│   └── endpoints.js           # All endpoint data — nav, endpoints, error codes
│
└── hooks/
    └── useActiveSection.js    # IntersectionObserver hook for sidebar highlight
```

## Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Features

- Dark theme with CSS variables
- Sidebar navigation with active section auto-highlight
- Collapsible endpoint cards (GET / POST / PATCH / DELETE color-coded)
- Auth 🔒 and Admin 👑 badges
- Query params + request body tables
- Code blocks with Copy button
- Scroll-based active nav highlighting (IntersectionObserver)

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| CSS Modules | Scoped styles |
| IntersectionObserver | Active section tracking |
| JetBrains Mono | Code font |
| Syne | Display font |
