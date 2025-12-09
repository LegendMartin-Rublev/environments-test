# Browser Extension

## Setup

The browser extension is automatically built from the same source code as the website.

## Build

```bash
# Build extension
npm run build:extension
```

This creates an `extension` folder with all necessary files.

## Install

### Chrome / Edge
1. Go to `chrome://extensions/` (or `edge://extensions/`)
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension` folder

### Firefox (requires minor adjustments)
Firefox uses Manifest V2. For Firefox support, we'd need to create a separate manifest.

## Development Workflow

1. Make changes to the Vue app
2. Run `npm run build:extension`
3. Click "Reload" button in browser extension page

The extension uses the same code as the website, so you maintain one codebase for both!

## Icons

Add these icon files to the `public` folder:
- `icon-16.png` (16x16px)
- `icon-48.png` (48x48px)  
- `icon-128.png` (128x128px)

You can create simple icons or use a tool like https://favicon.io/
