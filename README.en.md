# SOHO Agent

[Русский](README.md) · [Қазақша](README.kk.md) · English

## Install in Codex Desktop — no terminal

1. Open **Plugins → Personal → Add → Add a marketplace**.
2. In **Add plugin marketplace**, enter:
   - **Source:** `https://github.com/procraft/soho-agent-marketplace.git`
   - **Git ref:** `master`
   - **Sparse paths:** leave empty.
3. Select **Add marketplace**, choose the **SOHO Agent** marketplace and install **soho-agent**.
4. Complete the offered SOHO sign-in and start a new chat.

No terminal, ZIP download or manual MCP setup is needed. These fields are confirmed in the current Desktop UI; package installation and live SOHO login remain untested. School connection requirements are below.

## Install in Claude Desktop — no terminal

### Chat and Cowork

1. Open **Customize → Plugins** in Claude Desktop. For Cowork, select the **Cowork** tab first. Some versions place the catalog in **Settings → Plugins**.
2. Choose **Add → Add marketplace → Add from a repository**.
3. Enter `https://github.com/procraft/soho-agent-marketplace` — **without `.git`**. Select **Sync** if the interface offers it.
4. Find **soho-agent**, select **Add** or **Install**, then start a new chat or Cowork task. Plugins require a paid Claude plan.

This route adds PDF analysis skills. **The package's current OAuth settings do not support SOHO connection in Chat/Cowork:** they target local Claude Code. Installing in Desktop alone does not grant school access.

### Code — local session

For SOHO connection, use the **Code** tab in a local session. Account-installed plugins sync when Claude Code 2.1.273 or later starts; sign in with the same Claude account and start a new Code session.

Open **+** beside the prompt → **Plugins → Add plugin**, select **soho-agent** and install for your user account if it is not installed yet. If the marketplace is missing, enter `/plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git` in the Code prompt, then reopen the browser. This is an in-app command; no external terminal is needed.

Run `/mcp` inside the Code session, select the bundled `plugin:soho-agent:soho` server and complete browser sign-in. The package contains settings for this local mode; live login remains untested and requires school Agent Access enablement. This route does not cover a cloud Code session.

<details>
<summary>CLI installation — if you prefer a terminal</summary>

If you prefer a terminal, register the Git marketplace for Codex:

```sh
codex plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
```

Then choose **Plugins → SOHO Agent** in the app, install **soho-agent** and start a new session.

For **Claude Code** with plugin support:

```sh
claude plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
claude plugin install soho-agent@soho-agent
```

Start a new Claude Code session or run `/reload-plugins`. These settings target Claude Code; ordinary Claude Desktop chat compatibility is not established.

</details>

## Shared GraphQL workflow

Use **soho-graphql** in Codex or `/soho-agent:soho-graphql` in local Claude Code. It discovers the dedicated Agent schema, validates documents and executes bounded Query/Mutation through remote MCP; no local scripts or copied browser tokens are required. New consent requests read+write access; existing read grants remain read-only until native reconnect and explicit consent. The first writes create a teaching template or empty draft lesson only, with a stable idempotency key. On an unknown outcome, stop and preserve the key; never automatically create again. Content/settings/file writes, publication, deletion and full PDF transfer remain unavailable. Requires compatible backend/evolution/consent and service 0.1.2 rollout; live login/write acceptance remains unverified.

## Your SOHO connections

Select **soho-connection** in the Codex skill picker, or `/soho-agent:soho-connection` in local Claude Code. It shows one page of your own connections: current marker, client, school, employee/support administrator, expiry/revocation and last registered request. Support mode lists only the initiator’s support connections; direct mode lists only the effective employee’s direct connections. The modes are not combined. Ask for more to load the next page. These are OAuth connections, not chats or online status; request history is approximate to a minute, and missing history is unknown. Requires backend `connections.v1` rollout; otherwise use Master/Admin connections. Listing does not disconnect anything.

## Disconnect or reconnect SOHO

In Codex, select **soho-connection** in the `/`/`$` skill picker; in local Claude Code use `/soho-agent:soho-connection`. Ask to list connections, disconnect the current connection, or reconnect.

**Disconnect** calls `soho_disconnect` for the current connection only: every chat sharing its grant loses access. Other connections, LMS data and chat history are unchanged. An error means the outcome is unconfirmed, with no automatic retry; inspect [your Master connections](https://master.soholms.com/profile/agent-connections) or Admin → `/settings/agent-connections`. On an older server without the tool, the helper gives UI guidance and explicitly reports that it has not disconnected anything.

**Reconnect** guides the available native SOHO sign-in controls, then checks the school with `soho_context`. It preserves the old grant while starting a new OAuth flow and cannot launch host login automatically. To switch support schools, select Admin Intrude first, then confirm the new school in SOHO. After successful login, start a new Codex Desktop chat; local Claude Code also supports native `/clear`. The skill cannot clear the chat itself; a new chat does not revoke OAuth. The Chat/Cowork limitation above remains. The new tool requires a package update and remote service 0.1.1 rollout; live acceptance remains unverified.


## Support employee access

For support, first select the school and employee in the existing **Admin Intrude** interface, then reconnect the installed SOHO Agent in Codex or local Claude Code and confirm the school, employee and administrator on the SOHO consent page. Before connected work, the agent reads `soho_context` and displays these identities. Changing schools requires an explicit choice; a new chat is recommended.

The agent displays the connection expiry separately from the original Intrude deadline. If an older backend does not supply the connection expiry, no exact date is claimed.

Access lasts at most 30 days and never outlives the original Intrude session. Disconnect one or all of your connections in Admin → `/settings/agent-connections` or [Master → Agent connections](https://master.soholms.com/profile/agent-connections). Browser logout alone does not disconnect MCP. This scenario does not add SOHO OAuth for Chat/Cowork; deployment and live login verification remain separate steps.

## Current availability

This project is a work in progress (WIP). Installation adds PDF analysis skills and the MCP configuration for `https://api.soholms.com/mcp`. File upload, full import and other LMS changes beyond the two Agent creates are unavailable.

After installation, open the bundled SOHO connection in the installed Codex plugin and choose sign in. In Claude Code, open `/mcp`, select `plugin:soho-agent:soho` and authenticate. The browser opens SOHO: sign in and approve the intended school. Do not add a duplicate manual MCP server to test the plugin.

The package includes separate pre-registered OAuth client settings for Codex and Claude Code. **Live login remains unverified:** a SOHO operator must deploy the compatible service and enable Agent Access for your school. If connection fails, send the error text without tokens to the operator. Cursor is currently unsupported.

GitHub distributes the package. SOHO login and school consent are a separate browser OAuth process. A GitHub account grants no SOHO access. Never paste passwords, cookies or tokens into the agent.

## Updates

**In Codex Desktop:** refresh the **SOHO Agent** marketplace in Plugins, then update the installed plugin and start a new chat. To add it again, use Source `https://github.com/procraft/soho-agent-marketplace.git`, Git ref `master` and leave Sparse paths empty.

<details>
<summary>CLI updates</summary>

```sh
codex plugin marketplace upgrade soho-agent
```

Then update the installed plugin in the Codex UI and start a new session.

```sh
claude plugin marketplace update soho-agent
claude plugin update soho-agent@soho-agent
```

Restart Claude Code. To add the marketplace again, use `https://github.com/procraft/soho-agent-marketplace.git`.

</details>

Read the [changelog](plugins/soho-agent/CHANGELOG.md) and [version metadata](plugins/soho-agent/release-metadata.json). Package and service releases are independent; no background self-update is implemented.

## Maintenance

This generated repository contains Codex and Claude client catalogs, manifests, preregistered public OAuth configuration, one skills tree, version metadata and an integrity verifier. It excludes service source, dependencies, deployment configuration, private plans, credentials and tenant data. The source repository owns workflow behavior.

With Node24, run `node scripts/verify-marketplace.mjs`. Inventory hashes check consistency, not publisher authenticity. Trust the Git source/ref. `.soho-marketplace.json` records the source commit when available and an export fingerprint without developer machine paths.

From the source repository, preview with `node scripts/refresh-marketplace.mjs --out ../soho-agent-marketplace`, then repeat with `--apply`. The updater preserves Git metadata and refuses edited, unmanaged or symlinked targets, including a checkout with `.idea`. Preserve local work; generate and verify a pristine staging tree and apply only reviewed generated changes rather than deleting local files or weakening the verifier. An interrupted refresh leaves detectable inventory mismatches. Restore only reviewed generated files after preserving local work.

The included GitLab CI verifier is available to GitLab mirrors; it needs no private source fetch. No publication, commit, push, deployment or live client acceptance is performed by generation. Resolve distribution rights/license before public release; no license is assumed. Actual installation, discovery, OAuth login/refresh/revoke and updates remain acceptance checks.

Codex uses the supported compatibility layout (`.codex-plugin/plugin.json`, `.mcp.json`) because portable Agent Plugins 1.0.0 does not support OAuth fields. Claude's manifest loads `mcp-claude.json` after `.mcp.json`, replacing the same `soho` server entry rather than adding another server. Both share one skills tree. Codex uses `soho-agent-codex` and `http://127.0.0.1/callback` with a dynamic port; this requires issuer-bound callbacks in the AS metadata. Claude uses `soho-agent-claude-code` and `http://localhost:8766/callback`; that local port must be available. Current native packages request only `soho.connections.manage`, without a client secret; legacy school-bound packages use learning scopes. Portable source releases remain available for generic skills/configuration and do not establish this login flow.

Compatibility inspection: Codex CLI 0.159.2 and Claude Code 2.1.278; this is not live acceptance. Pinned [Codex plugin parser](https://github.com/openai/codex/blob/rust-v0.159.2/codex-rs/codex-mcp/src/plugin_config.rs) and [portable loader](https://github.com/openai/codex/blob/rust-v0.159.2/codex-rs/core-plugins/src/agent_plugin_manifest.rs).

Client documentation: [OpenAI packaging](https://developers.openai.com/plugins/build/plugins), [Claude Code installation](https://code.claude.com/docs/en/discover-plugins). [Codex MCP OAuth](https://learn.chatgpt.com/docs/extend/mcp), [Claude MCP OAuth](https://code.claude.com/docs/en/mcp), [Claude manifest loading](https://code.claude.com/docs/en/plugins-reference). Cursor catalogs are omitted until preregistration compatibility is established.

Claude Desktop references: [account plugins in Chat/Cowork and repository marketplaces](https://support.claude.com/en/articles/13837440-use-plugins-in-claude), [local Code tab installation](https://code.claude.com/docs/en/discover-plugins), [Desktop/CLI shared configuration](https://code.claude.com/docs/en/desktop), [remote account connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp). Chat/Cowork remote connectors use Anthropic's cloud; the local `localhost:8766/callback` client registration is not their approved OAuth configuration. Supporting that connection requires a separate registration/compatibility decision, not a README change.

## Conversation school connections (package 0.1.7)

The native resource is /mcp with soho.connections.manage. Use **soho-connect** (local Claude Code: /soho-agent:soho-connect) to show the current school; showing status never selects one. An explicit school ID reuses uniquely eligible existing authorization without a browser step when backend session-direct.v1 is available. Explicit conversation disconnect also applies directly. Both use the current expectedRevision; a conflict requires status refresh and a new user choice, never automatic replay. New or ambiguous authorization and older backends retain browser controls; repeat status after browser approval and verify the exact school before working.

Conversation disconnect preserves other sessions and school authorization. Legacy grant revocation is separate. Session/revision/context selectors stay only in the conversation; forks are not automatically detected. Requires backend session.v1/context-exchange.v1 and session-direct.v1 for direct actions, frontend consent controls and service 0.1.4. Installed 0.1.5, owner-mode rollout and live client acceptance remain separate steps.
