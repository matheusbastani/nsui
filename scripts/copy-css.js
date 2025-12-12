import fs from 'fs'
import path from 'path'
import { globSync } from 'glob'

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
  console.log(`copied ${src} → ${dest}`)
}

const srcDir = path.resolve(process.cwd(), 'src')
const distDir = path.resolve(process.cwd(), 'dist')

const files = globSync('**/*.css', { cwd: srcDir })

for (const file of files) {
  const srcPath = path.join(srcDir, file)
  const destPath = path.join(distDir, file)
  copyFile(srcPath, destPath)
}
