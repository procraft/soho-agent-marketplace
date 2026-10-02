# SOHO Agent

[Русский](README.md) · [Қазақша](README.kk.md) · English

## Installation

Install Codex or Claude Code with plugin support first.

**Codex:** add the marketplace in a terminal:

```sh
codex plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
```

In the Codex app plugin directory, find the `soho-agent` marketplace and install `soho-agent`. Start a new session.

**Claude Code:** run:

```sh
claude plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
claude plugin install soho-agent@soho-agent
```

Start a new Claude Code session or run `/reload-plugins`.

## Current availability

This project is a work in progress (WIP). Installation adds PDF analysis skills and the MCP configuration for `https://api.soholms.com/mcp`. File upload, import and LMS changes are unavailable.

After installation, open the bundled SOHO connection in the installed Codex plugin and choose sign in. In Claude Code, open `/mcp`, select `plugin:soho-agent:soho` and authenticate. The browser opens SOHO: sign in and approve the intended school. Do not add a duplicate manual MCP server to test the plugin.

The package includes separate pre-registered OAuth client settings for Codex and Claude Code. **Live login remains unverified:** a SOHO operator must deploy the compatible service and enable Agent Access for your school. If connection fails, send the error text without tokens to the operator. Cursor is currently unsupported.

GitHub distributes the package. SOHO login and school consent are a separate browser OAuth process. A GitHub account grants no SOHO access. Never paste passwords, cookies or tokens into the agent.

## Updates

```sh
codex plugin marketplace upgrade soho-agent
```

Then update the installed plugin in the Codex UI and start a new session.

```sh
claude plugin marketplace update soho-agent
claude plugin update soho-agent@soho-agent
```

Restart Claude Code. To add the marketplace again, use `https://github.com/procraft/soho-agent-marketplace.git`.

Read the [changelog](plugins/soho-agent/CHANGELOG.md) and [version metadata](plugins/soho-agent/release-metadata.json). Package and service releases are independent; no background self-update is implemented.

## Maintenance

This generated repository contains Codex and Claude client catalogs, manifests, preregistered public OAuth configuration, one skills tree, version metadata and an integrity verifier. It excludes service source, dependencies, deployment configuration, private plans, credentials and tenant data. The source repository owns workflow behavior.

With Node24, run `node scripts/verify-marketplace.mjs`. Inventory hashes check consistency, not publisher authenticity. Trust the Git source/ref. `.soho-marketplace.json` records the source commit when available and an export fingerprint without developer machine paths.

From the source repository, preview with `node scripts/refresh-marketplace.mjs --out ../soho-agent-marketplace`, then repeat with `--apply`. The updater preserves Git metadata and refuses edited, unmanaged or symlinked targets, including a checkout with `.idea`. Preserve local work; generate and verify a pristine staging tree and apply only reviewed generated changes rather than deleting local files or weakening the verifier. An interrupted refresh leaves detectable inventory mismatches. Restore only reviewed generated files after preserving local work.

The included GitLab CI verifier is available to GitLab mirrors; it needs no private source fetch. No publication, commit, push, deployment or live client acceptance is performed by generation. Resolve distribution rights/license before public release; no license is assumed. Actual installation, discovery, OAuth login/refresh/revoke and updates remain acceptance checks.

Codex uses the supported compatibility layout (`.codex-plugin/plugin.json`, `.mcp.json`) because portable Agent Plugins 1.0.0 does not support OAuth fields. Claude's manifest loads `mcp-claude.json` after `.mcp.json`, replacing the same `soho` server entry rather than adding another server. Both share one skills tree. Codex uses `soho-agent-codex` and `http://127.0.0.1/callback` with a dynamic port; this requires issuer-bound callbacks in the AS metadata. Claude uses `soho-agent-claude-code` and `http://localhost:8766/callback`; that local port must be available. Both request `soho.learning.read`, without a client secret. Portable source releases remain available for generic skills/configuration and do not establish this login flow.

Compatibility inspection: Codex CLI 0.159.2 and Claude Code 2.1.278; this is not live acceptance. Pinned [Codex plugin parser](https://github.com/openai/codex/blob/rust-v0.159.2/codex-rs/codex-mcp/src/plugin_config.rs) and [portable loader](https://github.com/openai/codex/blob/rust-v0.159.2/codex-rs/core-plugins/src/agent_plugin_manifest.rs).

Client documentation: [OpenAI packaging](https://developers.openai.com/plugins/build/plugins), [Claude Code installation](https://code.claude.com/docs/en/discover-plugins). [Codex MCP OAuth](https://learn.chatgpt.com/docs/extend/mcp), [Claude MCP OAuth](https://code.claude.com/docs/en/mcp), [Claude manifest loading](https://code.claude.com/docs/en/plugins-reference). Cursor catalogs are omitted until preregistration compatibility is established.
