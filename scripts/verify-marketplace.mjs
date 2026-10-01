import { createHash } from 'node:crypto';
import { lstat, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const markerName = '.soho-marketplace.json';
export const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
async function readJson(root, file) {
  const bytes = await readFile(path.join(root, file), 'utf8');
  try { return JSON.parse(bytes); } catch { throw new Error(`Invalid marketplace JSON: ${file}; content suppressed`); }
}
const catalogs = ['.agents/plugins/marketplace.json', '.claude-plugin/marketplace.json', '.cursor-plugin/marketplace.json'];
const rootFiles = [...catalogs, 'README.md', 'AGENTS.md', '.gitignore', '.gitlab-ci.yml', 'scripts/verify-marketplace.mjs'];
const pluginFiles = ['plugin.json', '.claude-plugin/plugin.json', '.cursor-plugin/plugin.json', 'mcp.json', '.mcp.json', 'README.md', 'CHANGELOG.md', 'release-metadata.json', 'scripts/distribution-lib.mjs', 'scripts/generate-mcp-config.mjs', 'scripts/version-check.mjs'];
export function allowedPublicPath(file) {
  if (typeof file !== 'string' || file.includes('\\') || file.split('/').some((part) => !part || part === '.' || part === '..')) return false;
  return rootFiles.includes(file) || pluginFiles.some((name) => file === `plugins/soho-agent/${name}`) || /^plugins\/soho-agent\/skills\/[a-z0-9-]+\/(?:[a-zA-Z0-9_.-]+\/)*[a-zA-Z0-9_.-]+\.md$/.test(file);
}

export async function publicFiles(root, { ignoreRefreshLock = false } = {}) {
  const result = [];
  let entries = 0;
  async function visit(relative = '') {
    for (const item of await readdir(path.join(root, relative), { withFileTypes: true })) {
      if (!relative && ignoreRefreshLock && item.name === '.soho-refresh-lock') {
        if (!item.isDirectory()) throw new Error('Invalid marketplace refresh lock');
        continue;
      }
      if (!relative && item.name === '.git') {
        if (!item.isDirectory()) throw new Error('Marketplace .git must be a directory, not a symlink/worktree file');
        continue;
      }
      if (++entries > 2_000 || relative.split('/').length > 32) throw new Error('Marketplace traversal limit exceeded');
      const file = path.posix.join(relative, item.name);
      if (item.isSymbolicLink()) throw new Error(`Marketplace symlink is forbidden: ${file}`);
      if (item.isDirectory()) await visit(file);
      else if (item.isFile()) result.push(file);
      else throw new Error(`Unsupported marketplace component: ${file}`);
    }
  }
  await visit();
  return result.sort();
}

export async function verifyMarketplace(root, { ignoreRefreshLock = false } = {}) {
  const actual = await publicFiles(root, { ignoreRefreshLock });
  const markerStat = await lstat(path.join(root, markerName));
  if (!markerStat.isFile() || markerStat.size > 256_000) throw new Error('Invalid marketplace generation marker');
  const marker = await readJson(root, markerName);
  if (marker.schemaVersion !== 1 || marker.generator !== 'soho-agent-marketplace' || marker.name !== 'soho-agent' || !Array.isArray(marker.files) || marker.files.length > 1_000) throw new Error('Not a managed SOHO marketplace');
  const expected = new Set();
  let size = 0;
  for (const entry of marker.files) {
    if (!entry || !allowedPublicPath(entry.path) || expected.has(entry.path) || !/^[a-f0-9]{64}$/.test(entry.sha256) || !Number.isSafeInteger(entry.bytes) || entry.bytes < 0 || entry.bytes > 2_000_000) throw new Error('Invalid marketplace file inventory');
    expected.add(entry.path);
    const stat = await lstat(path.join(root, entry.path));
    if (!stat.isFile() || stat.size !== entry.bytes || (size += stat.size) > 20_000_000) throw new Error(`Marketplace file changed: ${entry.path}`);
    if (digest(await readFile(path.join(root, entry.path))) !== entry.sha256) throw new Error(`Marketplace file changed: ${entry.path}; preserve local changes before refresh`);
  }
  expected.add(markerName);
  if (actual.length !== expected.size || actual.some((file) => !expected.has(file))) throw new Error('Marketplace contains unmanaged/missing files; preserve them before refresh');
  for (const required of rootFiles.concat(pluginFiles.map((file) => `plugins/soho-agent/${file}`))) if (!expected.has(required)) throw new Error(`Marketplace missing required file: ${required}`);
  const pluginRoot = path.join(root, 'plugins/soho-agent');
  const manifest = await readJson(pluginRoot, 'plugin.json');
  if (manifest.name !== marker.name || manifest.version !== marker.packageVersion) throw new Error('Marketplace package identity/version mismatch');
  for (const adapter of ['.claude-plugin/plugin.json', '.cursor-plugin/plugin.json', 'release-metadata.json']) {
    const value = await readJson(pluginRoot, adapter);
    const identity = adapter === 'release-metadata.json' ? value.package : value;
    if (identity.name !== marker.name || identity.version !== marker.packageVersion) throw new Error('Marketplace adapter version mismatch');
  }
  for (const file of catalogs) {
    const value = await readJson(root, file);
    const entry = value.plugins?.[0];
    if (value.name !== marker.name || value.plugins.length !== 1 || entry.name !== marker.name || (typeof entry.source === 'string' ? entry.source : entry.source?.path) !== './plugins/soho-agent') throw new Error(`Invalid marketplace catalog: ${file}`);
  }
  for (const file of ['mcp.json', '.mcp.json']) {
    const value = await readJson(pluginRoot, file);
    const entry = value.mcpServers?.soho;
    if (Object.keys(value.mcpServers ?? {}).length !== 1 || entry?.url !== marker.endpoint || Object.keys(entry).some((key) => !['type', 'url'].includes(key))) throw new Error('Marketplace MCP endpoint/credential mismatch');
  }
  if (marker.endpoint !== 'https://api.soholms.com/mcp' || marker.source?.exportSha256 !== digest(JSON.stringify(marker.files))) throw new Error('Invalid marketplace endpoint/provenance');
  return marker;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
    const result = await verifyMarketplace(root);
    console.log(JSON.stringify({ name: result.name, version: result.packageVersion, files: result.files.length, valid: true }));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
