import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const distDir = resolve(__dirname, '../dist')
const extensionDir = resolve(__dirname, '../extension')

// Create extension directory if it doesn't exist
if (!existsSync(extensionDir)) {
  mkdirSync(extensionDir, { recursive: true })
}

console.log('📦 Preparing browser extension...')

// Copy manifest.json to extension folder
const manifestSrc = resolve(__dirname, '../public/manifest.json')
const manifestDest = resolve(extensionDir, 'manifest.json')
copyFileSync(manifestSrc, manifestDest)
console.log('✓ Copied manifest.json')

// Copy icons if they exist
const iconSizes = ['16', '48', '128']
iconSizes.forEach(size => {
  const iconSrc = resolve(__dirname, `../public/icon-${size}.png`)
  if (existsSync(iconSrc)) {
    const iconDest = resolve(extensionDir, `icon-${size}.png`)
    copyFileSync(iconSrc, iconDest)
    console.log(`✓ Copied icon-${size}.png`)
  }
})

console.log('\n✅ Extension ready! Load it from the "extension" folder:')
console.log('   Chrome: chrome://extensions/ → "Load unpacked"')
console.log('   Edge: edge://extensions/ → "Load unpacked"')
console.log(`   Select: ${extensionDir}\n`)
