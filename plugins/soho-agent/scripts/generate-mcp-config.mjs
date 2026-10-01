import { args, cli, isMain, json, trustedUrl } from './distribution-lib.mjs';

export function generateConfig(client, endpoint, allowLoopback = false) {
  const url = trustedUrl(endpoint, { allowLoopback });
  const remote = { url };
  switch (client) {
    case 'portable': return { filename: 'mcp.json', content: json({ $schema: 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json', mcpServers: { soho: { type: 'streamable-http', ...remote } } }) };
    case 'claude': return { filename: '.mcp.json', content: json({ mcpServers: { soho: { type: 'http', ...remote } } }) };
    case 'codex-plugin': return { filename: '.mcp.json', content: json({ mcpServers: { soho: { type: 'http', ...remote } } }) };
    case 'codex': return { filename: 'config.toml', content: `[mcp_servers.soho]\nurl = ${JSON.stringify(url)}\n` };
    case 'cursor': return { filename: '.cursor/mcp.json', content: json({ mcpServers: { soho: remote } }) };
    default: throw new Error('Client must be portable, claude, codex-plugin, codex or cursor');
  }
}

if (isMain(import.meta.url)) await cli(async () => {
  const options = args(process.argv.slice(2), ['client', 'endpoint', 'allow-loopback'], ['allow-loopback']);
  if (!options.endpoint) throw new Error('Required: --client CLIENT --endpoint TRUSTED_HTTPS_URL [--allow-loopback]');
  process.stdout.write(generateConfig(options.client, options.endpoint, options['allow-loopback']).content);
});
