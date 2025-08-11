 # <picture style="float:left; margin-right: 8px;"><source media="(prefers-color-scheme: dark)" srcset="./src/assets/libra2-logo.jpg"><img src="./src/assets/libra2-logo.jpg" alt="libra2 logo" width="40" height="40"></picture> libra2 Docs

This repository contains the source code for the official libra2 Developer Documentation, built using [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

## Quick Start

```bash
# Clone the repository
git clone https://github.com/libra2org/libra2-docs.git
cd libra2-docs

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Start the development server
pnpm dev
```

Visit `http://localhost:4321` to see the documentation running locally.

## Editing Documentation

The main documentation content is located in the `src/content/docs/` directory:

- Content is organized in directories that match the URL structure
- Files are written in Markdown MDX (`.mdx`) format
- Each file begins with frontmatter (metadata between `---` delimiters)

Example frontmatter:

```yaml
---
title: Your Page Title
description: A brief description of the page content
---
```

For more resources on authoring content within this environment, see:

- [Authoring Content in Markdown](https://starlight.astro.build/guides/authoring-content/)
- [Using Components](https://starlight.astro.build/components/using-components/)

With the development server running (`pnpm dev`), your changes will be reflected immediately.

## Prerequisites

- **Node.js:** Version 22.x (specified in `.nvmrc`, use [nvm](https://github.com/nvm-sh/nvm))
- **pnpm:** Version 10.2.0 or higher (`npm install -g pnpm`)
- **Git:** For cloning the repository

## Key Features

- Multi-language support
- Interactive components (GraphiQL editor, Testnet Faucet)
- API Reference via OpenAPI specifications
- Move Reference documentation
- Search functionality (Algolia DocSearch)
- Dynamic OG Images

## Common Commands

| Command        | Description                   |
| -------------- | ----------------------------- |
| `pnpm dev`     | Start the development server  |
| `pnpm build`   | Build the site for production |
| `pnpm preview` | Preview the production build  |
| `pnpm lint`    | Check for linting issues      |
| `pnpm format`  | Fix formatting issues         |

## Environment Variables

Key environment variables:

| Variable                | Type   | Purpose                        | Required?                            |
| ----------------------- | ------ | ------------------------------ | ------------------------------------ |
| `GITHUB_TOKEN`          | Secret | Fetching Move Reference docs   | Only if `ENABLE_MOVE_REFERENCE=true` |
| `ENABLE_API_REFERENCE`  | Public | Build REST API reference pages | Optional (default: `false`)          |
| `ENABLE_MOVE_REFERENCE` | Public | Build Move Reference docs      | Optional (default: `false`)          |
| Firebase Credentials    | Public | Authentication features        | Required for Faucet/Auth             |
| Algolia Credentials     | Public | Documentation search           | Optional                             |
| `GTAG_ID`               | Public | Google Analytics tracking      | Optional                             |
| `OG_IMAGES_SECRET`      | Secret | Dynamic OG image generation    | Recommended for Vercel               |

## Project Structure

```
.
├── config/                 # Global sidebar configuration helper
├── patches/                # Patched npm dependencies
├── public/                 # Static assets
├── scripts/                # Utility scripts (Migration & Middleware generation)
├── src/
│   ├── assets/             # Site assets
│   ├── components/         # Reusable components
│   ├── config/             # Configuration helpers (i18n, docSearch, sidebar)
│   ├── content/            # Content Collections
│   │   ├── docs/           # Main documentation content
│   │   ├── i18n/           # UI translations
│   │   └── nav/            # Sidebar translations
│   ├── integrations/       # Custom integrations
│   ├── lib/                # Utility functions
│   ├── loaders/            # Content Collection loaders
│   ├── middlewares/        # Edge Middleware
│   ├── pages/              # Astro pages
│   ├── plugins/            # Remark/Rehype plugins
│   ├── starlight-overrides/ # Overridden components
│   ├── stores/             # State management
│   ├── styles/             # CSS styles
│   └── utils/              # General utilities
└── Various config files    # Configuration files
```

## Configuration Files

| File               | Purpose                          |
| ------------------ | -------------------------------- |
| `.env.example`     | Example environment variables    |
| `astro.config.mjs` | Main configuration               |
| `astro.sidebar.ts` | Documentation sidebar structure  |
| `package.json`     | Project dependencies and scripts |

## Technologies Used

| Category            | Technology                                          | Description                                |
| ------------------- | --------------------------------------------------- | ------------------------------------------ |
| **Framework**       | [Astro](https://astro.build/)                       | Web framework for content-driven sites     |
| **Docs Framework**  | [Starlight](https://starlight.astro.build/)         | Documentation toolkit for Astro            |
| **Styling**         | [Tailwind CSS](https://tailwindcss.com/)            | Utility-first CSS framework                |
| **UI Components**   | [React](https://react.dev/)                         | UI library (via Astro Islands)             |
| **Package Manager** | [pnpm](https://pnpm.io/)                            | Fast, disk space efficient package manager |
| **Search**          | [Algolia DocSearch](https://docsearch.algolia.com/) | Documentation search                       |
| **Authentication**  | [Firebase](https://firebase.google.com/)            | Auth and backend services                  |
| **Deployment**      | [Vercel](https://vercel.com/)                       | Hosting platform                           |

## Contributing

- Ensure code adheres to ESLint rules (`pnpm lint`)
- Format code using Prettier (`pnpm format`)
