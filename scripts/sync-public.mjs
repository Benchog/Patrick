import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pub = path.join(root, 'public');

const exts = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.pdf', '.json', '.ico',
]);

fs.mkdirSync(pub, { recursive: true });

for (const name of fs.readdirSync(root)) {
  if (name === 'public' || name === 'node_modules' || name === 'src' || name === 'dist' || name === 'scripts') continue;
  const p = path.join(root, name);
  if (!fs.statSync(p).isFile()) continue;
  const ext = path.extname(name).toLowerCase();
  if (exts.has(ext) || name === 'gallery.manifest.js' || name === 'gallery.manifest.json' || name === 'gallery.overrides.json') {
    fs.copyFileSync(p, path.join(pub, name));
  }
}

console.log('Synced static assets to public/');
