import { args, cli, compareVersions, isMain, json, trustedUrl } from './distribution-lib.mjs';

export const legacySohoEndpoint = 'https://api.soholms.com/mcp';
export const sohoEndpoint = legacySohoEndpoint;
export const principalScope = 'soho.connections.manage';
export const sohoScope = 'soho.learning.read soho.learning.write';
export const sohoScopes = sohoScope.split(' ');
// Public identifiers, not secrets. They must match the companion AS registry.
export const codexOAuth = { clientId: 'soho-agent-codex', callbackUrl: 'http://127.0.0.1/callback' };
export const claudeOAuth = { clientId: 'soho-agent-claude-code', callbackPort: 8766, scopes: sohoScope };

export function generateConfig(client, endpoint, allowLoopback = false, packageVersion = '0.1.7') {
  const url = trustedUrl(endpoint, { allowLoopback });
  const isSoho = url === sohoEndpoint || url === legacySohoEndpoint;
  const remote = { url };
  const scopes = url === sohoEndpoint && compareVersions(packageVersion, '0.1.7') >= 0 ? [principalScope] : compareVersions(packageVersion, '0.1.5') >= 0 ? sohoScopes : ['soho.learning.read'];
  const claude = { ...claudeOAuth, scopes: scopes.join(' ') };
  switch (client) {
    // Portable 1.0.0 has no OAuth extension. Never add vendor-only fields here.
    case 'portable': return { filename: 'mcp.json', content: json({ $schema: 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json', mcpServers: { soho: { type: 'streamable-http', ...remote } } }) };
    case 'claude': return { filename: '.mcp.json', content: json({ mcpServers: { soho: { type: 'http', ...remote, ...(isSoho ? { oauth: claude } : {}) } } }) };
    case 'codex-plugin': return { filename: '.mcp.json', content: json({ mcpServers: { soho: { type: 'http', ...remote, ...(isSoho ? { scopes, oauth_resource: url, oauth: codexOAuth } : {}) } } }) };
    case 'codex': return { filename: 'config.toml', content: `[mcp_servers.soho]\nurl = ${JSON.stringify(url)}\n${isSoho ? `scopes = [${scopes.map(scope => JSON.stringify(scope)).join(', ')}]\noauth_resource = ${JSON.stringify(url)}\n\n[mcp_servers.soho.oauth]\nclient_id = ${JSON.stringify(codexOAuth.clientId)}\ncallback_url = ${JSON.stringify(codexOAuth.callbackUrl)}\n` : ''}` };
    case 'cursor': return { filename: '.cursor/mcp.json', content: json({ mcpServers: { soho: remote } }) };
    default: throw new Error('Client must be portable, claude, codex-plugin, codex or cursor');
  }
}

if (isMain(import.meta.url)) await cli(async () => {
  const options = args(process.argv.slice(2), ['client', 'endpoint', 'allow-loopback'], ['allow-loopback']);
  if (!options.endpoint) throw new Error('Required: --client CLIENT --endpoint TRUSTED_HTTPS_URL [--allow-loopback]');
  process.stdout.write(generateConfig(options.client, options.endpoint, options['allow-loopback']).content);
});
