# Vue 3 + Vite + Tailwind CSS

This template provides a modern development setup with Vue 3, Vite, and Tailwind CSS. The template uses Vue 3 `<script setup>` SFCs and includes Tailwind CSS for utility-first styling.

## Features

- ⚡️ Vue 3 with `<script setup>` syntax
- 🏗️ Vite for fast development and building
- 🎨 Tailwind CSS for utility-first styling
- 🔧 PostCSS with Autoprefixer
- 📦 Modern JavaScript (ES modules)

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (recommended: 22.13.1+)
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/     # Vue components
│   ├── assets/         # Static assets
│   ├── App.vue         # Main application component
│   ├── main.js         # Application entry point
│   └── style.css       # Global styles with Tailwind directives
├── public/             # Public static files
├── index.html          # HTML template
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── vite.config.js      # Vite configuration
```

## Tailwind CSS

This project includes Tailwind CSS configured with:
- PostCSS processing
- Autoprefixer for vendor prefixes
- Configured to scan Vue files for utility classes

You can customize Tailwind by editing `tailwind.config.js`.

## Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vue 3 Script Setup Guide](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)
- [Vue IDE Support Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support)
