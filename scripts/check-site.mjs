import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Check the generated multi-page site before deployment: route preservation,
// local asset integrity, fragment targets and basic document accessibility.
const files = ['index.html', 'about/index.html', 'projects/index.html',
  ...readdirSync('projects', { withFileTypes: true }).filter(d => d.isDirectory()).map(d => `projects/${d.name}/index.html`)];
const pages = new Map(files.map(file => [resolve(file), readFileSync(file, 'utf8')]));
const errors = [];
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
for (const [file, html] of pages) {
  const fail = message => errors.push(`${file}: ${message}`);
  if ((html.match(/<h1\b/g) || []).length !== 1) fail('Expected exactly one h1');
  if ((html.match(/<main\b/g) || []).length !== 1) fail('Expected one main landmark');
  if (!/<meta name="description" content="[^"]+"/.test(html)) fail('Missing description');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) fail('Duplicate element IDs');
  for (const [tag] of html.matchAll(/<(?:img|a|script|source|link)\b[^>]*>/g)) {
    if (tag.startsWith('<img') && !attr(tag, 'alt')) fail('Image needs meaningful alternative text');
    const reference = attr(tag, 'src') || attr(tag, 'href');
    if (!reference || /^(?:https?:|mailto:|tel:)/.test(reference)) continue;
    const base = `http://local/${file.slice(resolve('.').length + 1)}`;
    const target = new URL(reference.replaceAll('&amp;', '&'), base);
    let path = decodeURIComponent(target.pathname).slice(1);
    if (path.endsWith('/') || !path) path += 'index.html';
    if (!existsSync(path) && !existsSync(`public/${path}`)) fail(`Missing local target: ${reference}`);
    const linkedPage = pages.get(resolve(path));
    if (target.hash && linkedPage && !linkedPage.includes(`id="${target.hash.slice(1)}"`)) fail(`Missing fragment: ${reference}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Passed: ${files.length} routes; headings, landmarks, descriptions, IDs, image alternatives, local links and media.`);
