import path from 'node:path';
import { args, cli, compareVersions, isMain, readJson, repositoryRoot, satisfies, trustedUrl, validateMetadata } from './distribution-lib.mjs';

export function compareRelease(local, remote) {
  validateMetadata(local);
  validateMetadata(remote);
  const comparison = compareVersions(remote.package.version, local.package.version);
  return {
    installedVersion: local.package.version,
    availableVersion: remote.package.version,
    status: comparison > 0 ? 'update_available' : comparison === 0 ? 'current' : 'installed_newer',
    releaseStatus: remote.package.status,
    releaseUrl: remote.package.releaseUrl,
    changelogUrl: remote.package.changelogUrl,
    compatibleWithInstalledServer: satisfies(local.server.version, remote.package.serverRange),
    compatibleWithInstalledToolContract: satisfies(local.toolContract.version, remote.package.toolContractRange),
    remoteServerVersion: remote.server.version,
    remoteToolContractVersion: remote.toolContract.version,
    action: 'Explicit client/user update required; no files or server processes changed.',
  };
}

export async function fetchMetadata(endpoint, allowLoopback = false, request = fetch) {
  const url = trustedUrl(endpoint, { allowLoopback });
  const response = await request(url, { redirect: 'error', signal: AbortSignal.timeout(10_000), headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Metadata request failed with HTTP ${response.status}`);
  if (!/^application\/(?:[a-z0-9.+-]*\+)?json(?:;|$)/i.test(response.headers.get('content-type') ?? '')) throw new Error('Metadata endpoint must return JSON');
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 65_536) throw new Error('Metadata response exceeds 64 KiB');
      chunks.push(value);
    }
  } finally { await reader.cancel(); }
  let metadata;
  try { metadata = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new Error('Metadata response is invalid JSON; content suppressed'); }
  return validateMetadata(metadata);
}

if (isMain(import.meta.url)) await cli(async () => {
  const options = args(process.argv.slice(2), ['metadata-url', 'file', 'local', 'allow-loopback'], ['allow-loopback']);
  if (Boolean(options.file) === Boolean(options['metadata-url'])) throw new Error('Choose exactly one: --metadata-url TRUSTED_HTTPS_URL or --file METADATA_JSON');
  const local = await readJson(path.resolve(options.local ?? path.join(repositoryRoot, 'release-metadata.json')));
  const remote = options.file ? await readJson(path.resolve(options.file)) : await fetchMetadata(options['metadata-url'], options['allow-loopback']);
  console.log(JSON.stringify(compareRelease(local, remote), null, 2));
});
