import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.legacy.html'), 'utf8');

const bodyStart = html.indexOf('<body>');
const scriptStart = html.indexOf('\n    <script>');
if (bodyStart < 0 || scriptStart < 0) throw new Error('Could not find body/script bounds');

let chunk = html.slice(bodyStart + '<body>'.length, scriptStart).trim();

chunk = chunk.replace(/<!--[\s\S]*?-->/g, '');

chunk = chunk.replace(/\sclass=/g, ' className=');

chunk = chunk.replace(/\sstroke-width=/g, ' strokeWidth=');
chunk = chunk.replace(/\sstroke-linecap=/g, ' strokeLinecap=');
chunk = chunk.replace(/\sstroke-linejoin=/g, ' strokeLinejoin=');
chunk = chunk.replace(/\sfill-rule=/g, ' fillRule=');
chunk = chunk.replace(/\sclip-rule=/g, ' clipRule=');
chunk = chunk.replace(/\sstroke-miterlimit=/g, ' strokeMiterlimit=');

chunk = chunk.replace(/style="([^"]*)"/g, (_, raw) => {
  const parts = raw.split(';').map((p) => p.trim()).filter(Boolean);
  const obj = {};
  for (const p of parts) {
    const ci = p.indexOf(':');
    if (ci === -1) continue;
    const k = p.slice(0, ci).trim();
    const v = p.slice(ci + 1).trim();
    const key = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (key && v) obj[key] = v;
  }
  return `style={${JSON.stringify(obj)}}`;
});

chunk = chunk.replace(/\btabindex="-1"/g, 'tabIndex={-1}');
chunk = chunk.replace(/\btabindex=/g, 'tabIndex=');

const out = `/* eslint-disable react/no-unknown-property */
import {
  Menu,
  Cpu,
  Heart,
  Smartphone,
  Code2,
  BarChart3,
  Compass,
  Palette,
  Monitor,
  FileText,
  Github,
  Linkedin,
  Video,
  MessageCircle,
  Mail,
} from 'lucide-react';

const iconProps = { className: 'icon-lucide', strokeWidth: 1.85, absoluteStrokeWidth: true };

export function AppMarkup() {
  return (
    <>
${chunk
  .replace(
    /<button type="button" className="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu" aria-controls="primaryNavLinks" aria-expanded="false">\s*<svg className="icon-lucide"[\s\S]*?<\/svg>\s*<\/button>/,
    `<button type="button" className="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu" aria-controls="primaryNavLinks" aria-expanded="false">
                    <Menu {...iconProps} size={22} aria-hidden="true" />
                </button>`
  )
  .replace(
    /<h3><svg className="icon-lucide"[\s\S]*?<\/svg> Hard Skills<\/h3>/,
    `<h3><Cpu {...iconProps} size={20} aria-hidden="true" /> Hard Skills</h3>`
  )
  .replace(
    /<h3><svg className="icon-lucide"[\s\S]*?<\/svg> Soft Skills<\/h3>/,
    `<h3><Heart {...iconProps} size={20} aria-hidden="true" /> Soft Skills</h3>`
  )
  .replace(
    /<div className="service-icon"><svg className="icon-lucide"[\s\S]*?<\/svg><\/div>\s*<h3>App Development<\/h3>/,
    `<div className="service-icon"><Smartphone {...iconProps} size={48} aria-hidden="true" /></div>
                <h3>App Development</h3>`
  )
  .replace(
    /<div className="service-icon"><svg className="icon-lucide"[\s\S]*?<\/svg><\/div>\s*<h3>Website Development<\/h3>/,
    `<div className="service-icon"><Code2 {...iconProps} size={48} aria-hidden="true" /></div>
                <h3>Website Development</h3>`
  )
  .replace(
    /<div className="service-icon"><svg className="icon-lucide"[\s\S]*?<\/svg><\/div>\s*<h3>Data Analytics & Dashboards<\/h3>/,
    `<div className="service-icon"><BarChart3 {...iconProps} size={48} aria-hidden="true" /></div>
                <h3>Data Analytics & Dashboards</h3>`
  )
  .replace(
    /<div className="service-icon"><svg className="icon-lucide"[\s\S]*?<\/svg><\/div>\s*<h3>CAD\/CAM Engineering<\/h3>/,
    `<div className="service-icon"><Compass {...iconProps} size={48} aria-hidden="true" /></div>
                <h3>CAD/CAM Engineering</h3>`
  )
  .replace(
    /<div className="service-icon"><svg className="icon-lucide"[\s\S]*?<\/svg><\/div>\s*<h3>Graphics & Photo Editing<\/h3>/,
    `<div className="service-icon"><Palette {...iconProps} size={48} aria-hidden="true" /></div>
                <h3>Graphics & Photo Editing</h3>`
  )
  .replace(
    /<div className="service-icon"><svg className="icon-lucide"[\s\S]*?<\/svg><\/div>\s*<h3>IT Support & Computer Services<\/h3>/,
    `<div className="service-icon"><Monitor {...iconProps} size={48} aria-hidden="true" /></div>
                <h3>IT Support & Computer Services</h3>`
  )
  .replace(
    /<div className="service-icon"><svg className="icon-lucide"[\s\S]*?<\/svg><\/div>\s*<h3>Document & Thesis Editing<\/h3>/,
    `<div className="service-icon"><FileText {...iconProps} size={48} aria-hidden="true" /></div>
                <h3>Document & Thesis Editing</h3>`
  )
  .replace(
    /<a href="https:\/\/github.com\/Benchog" className="social-link" title="GitHub" target="_blank" rel="noopener noreferrer">\s*<svg className="icon-lucide"[\s\S]*?<\/svg>\s*<\/a>/,
    `<a href="https://github.com/Benchog" className="social-link" title="GitHub" target="_blank" rel="noopener noreferrer">
                        <Github {...iconProps} size={22} aria-hidden="true" />
                    </a>`
  )
  .replace(
    /<a href="https:\/\/www.linkedin.com\/in\/patrick-benchog" className="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">\s*<svg className="icon-lucide"[\s\S]*?<\/svg>\s*<\/a>/,
    `<a href="https://www.linkedin.com/in/patrick-benchog" className="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <Linkedin {...iconProps} size={22} aria-hidden="true" />
                    </a>`
  )
  .replace(
    /<a href="https:\/\/www.tiktok.com\/@king_optimistic_" className="social-link" title="TikTok" target="_blank" rel="noopener noreferrer">\s*<svg className="icon-lucide"[\s\S]*?<\/svg>\s*<\/a>/,
    `<a href="https://www.tiktok.com/@king_optimistic_" className="social-link" title="TikTok" target="_blank" rel="noopener noreferrer">
                        <Video {...iconProps} size={22} aria-hidden="true" />
                    </a>`
  )
  .replace(
    /<a href="https:\/\/wa.me\/233240025563" className="social-link" title="WhatsApp" target="_blank" rel="noopener noreferrer">\s*<svg className="icon-lucide"[\s\S]*?<\/svg>\s*<\/a>/,
    `<a href="https://wa.me/233240025563" className="social-link" title="WhatsApp" target="_blank" rel="noopener noreferrer">
                        <MessageCircle {...iconProps} size={22} aria-hidden="true" />
                    </a>`
  )
  .replace(
    /<a href="mailto:pat.benchog@gmail.com" className="social-link" title="Email pat.benchog@gmail.com" rel="noopener noreferrer">\s*<svg className="icon-lucide"[\s\S]*?<\/svg>\s*<\/a>/,
    `<a href="mailto:pat.benchog@gmail.com" className="social-link" title="Email pat.benchog@gmail.com" rel="noopener noreferrer">
                        <Mail {...iconProps} size={22} aria-hidden="true" />
                    </a>`
  )
  .split('\n')
  .map((line) => '      ' + line)
  .join('\n')}
    </>
  );
}
`;

fs.writeFileSync(path.join(root, 'src', 'AppMarkup.jsx'), out);
console.log('Wrote src/AppMarkup.jsx');
