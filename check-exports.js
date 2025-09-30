#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const indexFile = path.join(srcDir, 'index.ts');
const indexContent = fs.readFileSync(indexFile, 'utf8');

const files = fs.readdirSync(srcDir)
  .filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))
  .filter(f => f !== 'index.ts');

const missingExports = files.filter(f => {
  const base = f.replace(/\.(ts|tsx)$/, '');
  const re = new RegExp(`export \{.*${base}.*\} from ['\"]\./${base}['\"];?`);
  return !re.test(indexContent);
});

if (missingExports.length) {
  console.error('Missing exports in index.ts:', missingExports);
  process.exit(1);
} else {
  console.log('All src/*.ts(x) files are exported via index.ts');
}
