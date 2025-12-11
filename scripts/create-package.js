#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import readline from 'readline'

function questionAsync(rl, question) {
  return new Promise((resolve) => rl.question(question, (answer) => resolve(answer)))
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const inputPath = await questionAsync(rl, 'Enter the path from the root/packages: ')
  rl.close()

  const packagesRoot = path.join(process.cwd(), 'packages')
  const fullPath = path.join(packagesRoot, inputPath)
  const folderName = path.basename(fullPath)

  createFolders(fullPath)
  createSrcIndex(fullPath)
  createTsConfig(fullPath, inputPath)
  createPackageJson(fullPath, folderName)
  createReadme(fullPath, folderName)

  console.log(`Package "${folderName}" created at: ${fullPath}`)
}

function createFolders(fullPath) {
  fs.mkdirSync(fullPath, { recursive: true })
}

function createSrcIndex(fullPath) {
  const srcPath = path.join(fullPath, 'src')
  fs.mkdirSync(srcPath, { recursive: true })
  fs.writeFileSync(path.join(srcPath, 'index.ts'), '', 'utf-8')
}

function createTsConfig(fullPath, inputPath) {
  const depth = inputPath.split(path.sep).length
  const tsconfigContent = {
    extends: `${'../'.repeat(depth)}../tsconfig.json`,
    compilerOptions: {
      outDir: 'dist',
      declaration: true,
      declarationMap: true,
      sourceMap: true,
      noEmit: false,
      incremental: false
    },
    include: ['src']
  }
  fs.writeFileSync(
    path.join(fullPath, 'tsconfig.json'),
    JSON.stringify(tsconfigContent, null, 2),
    'utf-8'
  )
}

function createPackageJson(fullPath, folderName) {
  const packageContent = {
    name: `@nsui/${folderName}`,
    version: '0.0.0',
    description: '',
    keywords: [],
    author: 'Matheus Bastani',
    license: 'MIT',
    main: 'dist/index.js',
    types: 'dist/index.d.ts',
    scripts: {
      build: 'tsc',
      dev: 'tsc --watch',
      clean: 'rimraf dist'
    }
  }
  fs.writeFileSync(
    path.join(fullPath, 'package.json'),
    JSON.stringify(packageContent, null, 2),
    'utf-8'
  )
}

function createReadme(fullPath, folderName) {
  const readmeContent = `# @nsui/${folderName}

DESCRIPTION

## Installation

\`\`\`sh
yarn add @nsui/${folderName}
# or
npm i @nsui/${folderName}
\`\`\`

## License

This project is licensed under the terms of the
[MIT license](https://github.com/nsui-inc/nsui/blob/master/LICENSE).
`
  fs.writeFileSync(path.join(fullPath, 'README.md'), readmeContent, 'utf-8')
}

main()
