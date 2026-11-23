// Runs axe-core on every Storybook story in light and dark.
// Prereq: npm run build-storybook && npx playwright install chromium
// Usage:  npm run a11y            (serves storybook-static on :6007 itself)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const root = 'storybook-static';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2', '.woff': 'font/woff', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  const path = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/\/$/, '/index.html'));
  let body;
  try { body = await readFile(path); } catch { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' }); res.end(body);
}).listen(6007);

const axe = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
const index = JSON.parse(await readFile(join(root, 'index.json'), 'utf8'));
const ids = Object.keys(index.entries).filter((k) => index.entries[k].type === 'story');
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
let failures = 0;
for (const id of ids) for (const theme of ['light', 'dark']) {
  await page.goto(`http://localhost:6007/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`);
  await page.waitForTimeout(250);
  await page.addScriptTag({ content: axe });
  const v = await page.evaluate(async () => (await window.axe.run('#storybook-root')).violations.map((x) => `${x.id} (${x.nodes.length})`));
  if (v.length) { failures++; console.log(`✗ ${id} [${theme}]`, v.join(', ')); }
}
console.log(`${ids.length} stories × 2 themes: ${failures ? failures + ' with violations' : 'no axe violations'}`);
await browser.close(); server.close();
process.exit(failures ? 1 : 0);
