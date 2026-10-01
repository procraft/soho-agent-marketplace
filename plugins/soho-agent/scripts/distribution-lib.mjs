import { readdir, readFile, lstat, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
export const readJson = async (file) => {
  const content = await readFile(file, 'utf8');
  try { return JSON.parse(content); } catch { throw new Error(`Invalid JSON in ${path.basename(file)}; content suppressed`); }
};
export const isMain = (url) => process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(url);

export function args(argv, allowed, booleans = []) {
  const result = {};
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i].replace(/^--/, '');
    if (!argv[i].startsWith('--') || !allowed.includes(key) || key in result) throw new Error(`Unknown or repeated option: ${argv[i]}`);
    if (booleans.includes(key)) result[key] = true;
    else {
      const value = argv[++i];
      if (!value || value.startsWith('--')) throw new Error(`--${key} requires a value`);
      result[key] = value;
    }
  }
  return result;
}

export async function files(root, excluded = new Set()) {
  const result = [];
  let entries = 0;
  async function visit(directory, prefix = '') {
    for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      if (excluded.has(entry.name)) continue;
      if (++entries > 10_000 || prefix.split('/').length > 32) throw new Error('Package traversal limit exceeded');
      const relative = path.posix.join(prefix, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Symlinks are not distributable: ${relative}`);
      if (entry.isDirectory()) await visit(path.join(directory, entry.name), relative);
      else if (entry.isFile()) result.push(relative);
      else throw new Error(`Unsupported file type: ${relative}`);
    }
  }
  await visit(root);
  return result;
}

export async function contained(root, relative, { directory = false } = {}) {
  if (typeof relative !== 'string' || path.isAbsolute(relative) || relative.split(/[\\/]/).includes('..')) throw new Error(`Invalid package path: ${relative}`);
  const canonicalRoot = await realpath(root);
  const target = path.resolve(root, relative);
  const actual = await realpath(target);
  if (actual !== canonicalRoot && !actual.startsWith(`${canonicalRoot}${path.sep}`)) throw new Error(`Path escapes package: ${relative}`);
  const stat = await lstat(target);
  if (stat.isSymbolicLink() || (directory ? !stat.isDirectory() : !stat.isFile())) throw new Error(`Invalid package component: ${relative}`);
  return target;
}

// Endpoint provenance is supplied by the operator. Reject embedded credentials and
// query/fragment data so generating config cannot persist tokens or signed URLs.
export function trustedUrl(value, { allowLoopback = false } = {}) {
  let parsed;
  try { parsed = new URL(value); } catch { throw new Error('Supply an absolute trusted endpoint URL'); }
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname);
  if (parsed.username || parsed.password || parsed.search || parsed.hash) throw new Error('URLs must not contain credentials, query parameters or fragments');
  if (parsed.protocol !== 'https:' && !(allowLoopback && loopback && parsed.protocol === 'http:')) throw new Error('HTTPS required; --allow-loopback permits only loopback HTTP for development');
  if (!loopback && (/^(?:0\.|10\.|127\.|169\.254\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)/.test(parsed.hostname) || parsed.hostname === '[::]' || parsed.hostname.endsWith('.localhost'))) throw new Error('Private IP addresses are not remote release endpoints');
  return parsed.href;
}

export function semver(value) {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/.exec(value ?? '');
  if (!match) throw new Error('Invalid SemVer; value suppressed');
  const numbers = match.slice(1, 4).map(Number);
  if (!numbers.every(Number.isSafeInteger)) throw new Error('SemVer component too large; value suppressed');
  return { numbers, pre: match[4]?.split('.') ?? [] };
}

export function compareVersions(a, b) {
  const left = semver(a), right = semver(b);
  for (let i = 0; i < 3; i++) if (left.numbers[i] !== right.numbers[i]) return Math.sign(left.numbers[i] - right.numbers[i]);
  if (!left.pre.length || !right.pre.length) return left.pre.length === right.pre.length ? 0 : left.pre.length ? -1 : 1;
  for (let i = 0; i < Math.max(left.pre.length, right.pre.length); i++) {
    if (left.pre[i] === undefined || right.pre[i] === undefined) return left.pre[i] === undefined ? -1 : 1;
    if (left.pre[i] === right.pre[i]) continue;
    const ln = /^\d+$/.test(left.pre[i]), rn = /^\d+$/.test(right.pre[i]);
    if (ln && rn) return Math.sign(Number(left.pre[i]) - Number(right.pre[i]));
    if (ln !== rn) return ln ? -1 : 1;
    return left.pre[i] < right.pre[i] ? -1 : 1;
  }
  return 0;
}

// Deliberately small grammar: metadata uses an explicit lower/upper interval.
// Unsupported npm-style ranges are rejected, never interpreted approximately.
export function contractRange(value) {
  const match = /^>=(\d+\.\d+\.\d+) <(\d+\.\d+\.\d+)$/.exec(value ?? '');
  if (!match || compareVersions(match[1], match[2]) >= 0) throw new Error('Expected bounded range ">=x.y.z <x.y.z"; value suppressed');
  return match.slice(1);
}
export function satisfies(version, range) {
  const [minimum, maximum] = contractRange(range);
  return compareVersions(version, minimum) >= 0 && compareVersions(version, maximum) < 0;
}

export function validateMetadata(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || value.schemaVersion !== 1 || value.package?.name !== 'soho-agent' || !['local', 'published'].includes(value.package?.status)) throw new Error('Invalid SOHO release metadata identity/status');
  semver(value.package.version);
  semver(value.server?.version);
  semver(value.toolContract?.version);
  contractRange(value.package.serverRange);
  contractRange(value.package.toolContractRange);
  contractRange(value.server.toolContractRange);
  if (!satisfies(value.server.version, value.package.serverRange) || !satisfies(value.toolContract.version, value.package.toolContractRange) || !satisfies(value.toolContract.version, value.server.toolContractRange)) throw new Error('Release metadata contains incompatible versions');
  for (const key of ['releaseUrl', 'changelogUrl']) {
    if (value.package[key] !== null) trustedUrl(value.package[key]);
    if (value.package.status === 'published' && !value.package[key]) throw new Error(`Published metadata needs ${key}`);
  }
  return value;
}

// Exact constraints from the portable 1.0.0 manifest schema. This package
// additionally requires release identity/version/description/author.
export function validatePortableManifest(manifest) {
  const strings = ['$schema', 'name', 'version', 'description', 'homepage', 'repository', 'license'];
  const keys = [...strings, 'author', 'keywords', 'extensions'];
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest) || Object.keys(manifest).some((key) => !keys.includes(key))) throw new Error('Invalid or unsupported portable manifest object');
  for (const key of strings) if (key in manifest && typeof manifest[key] !== 'string') throw new Error(`Portable manifest ${key} must be a string`);
  if (manifest.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json' || manifest.name !== 'soho-agent' || !manifest.description?.trim()) throw new Error('Invalid portable manifest identity/metadata');
  semver(manifest.version);
  if (!manifest.author || typeof manifest.author !== 'object' || Array.isArray(manifest.author) || typeof manifest.author.name !== 'string' || !manifest.author.name.trim()) throw new Error('Portable manifest needs an author');
  for (const [key, value] of Object.entries(manifest.author)) if (!['name', 'email', 'url'].includes(key) || typeof value !== 'string') throw new Error('Invalid portable manifest author field');
  if ('keywords' in manifest && (!Array.isArray(manifest.keywords) || manifest.keywords.some((value) => typeof value !== 'string'))) throw new Error('Portable keywords must be strings');
  if ('extensions' in manifest && (!manifest.extensions || typeof manifest.extensions !== 'object' || Array.isArray(manifest.extensions) || Object.values(manifest.extensions).some((value) => !value || typeof value !== 'object' || Array.isArray(value)))) throw new Error('Portable extensions must contain namespace objects');
  return manifest;
}

export async function cli(fn) {
  try { await fn(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
