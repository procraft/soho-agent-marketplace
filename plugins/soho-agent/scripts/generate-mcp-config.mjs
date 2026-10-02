import { args, cli, isMain, json, trustedUrl } from './distribution-lib.mjs';

export const sohoEndpoint = 'https://api.soholms.com/mcp';
export const sohoScope = 'soho.learning.read';
// Public identifiers, not secrets. They must match the companion AS registry.
export const codexOAuth = { clientId: 'soho-agent-codex', callbackUrl: 'http://127.0.0.1/callback' };
export const claudeOAuth = { clientId: 'soho-agent-claude-code', callbackPort: 8766, scopes: sohoScope };

export function generateConfig(client, endpoint, allowLoopback = false) {
  const url = trustedUrl(endpoint, { allowLoopback });
  const isSoho = url === sohoEndpoint;
  const remote = { url };
  switch (client) {
    // Portable 1.0.0 has no OAuth extension. Never add vendor-only fields here.
    case 'portable': return { filename: 'mcp.json', content: json({ $schema: 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json', mcpServers: { soho: { type: 'streamable-http', ...remote } } }) };
    case 'claude': return { filename: '.mcp.json', content: json({ mcpServers: { soho: { type: 'http', ...remote, ...(isSoho ? { oauth: claudeOAuth } : {}) } } }) };
    case 'codex-plugin': return { filename: '.mcp.json', content: json({ mcpServers: { soho: { type: 'http', ...remote, ...(isSoho ? { scopes: [sohoScope], oauth_resource: url, oauth: codexOAuth } : {}) } } }) };
    case 'codex': return { filename: 'config.toml', content: `[mcp_servers.soho]\nurl = ${JSON.stringify(url)}\n${isSoho ? `scopes = [${JSON.stringify(sohoScope)}]\noauth_resource = ${JSON.stringify(url)}\n\n[mcp_servers.soho.oauth]\nclient_id = ${JSON.stringify(codexOAuth.clientId)}\ncallback_url = ${JSON.stringify(codexOAuth.callbackUrl)}\n` : ''}` };
    case 'cursor': return { filename: '.cursor/mcp.json', content: json({ mcpServers: { soho: remote } }) };
    default: throw new Error('Client must be portable, claude, codex-plugin, codex or cursor');
  }
}

if (isMain(import.meta.url)) await cli(async () => {
  const options = args(process.argv.slice(2), ['client', 'endpoint', 'allow-loopback'], ['allow-loopback']);
  if (!options.endpoint) throw new Error('Required: --client CLIENT --endpoint TRUSTED_HTTPS_URL [--allow-loopback]');
  process.stdout.write(generateConfig(options.client, options.endpoint, options['allow-loopback']).content);
});
