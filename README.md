# SOHO Agent marketplace

Git-distributed SOHO.LMS skills and a read-only MCP connection. Package version and compatible service/tool-contract ranges live in `plugins/soho-agent/release-metadata.json`. This tree is prepared for publication; creating it does not publish a GitLab project, deploy the service or establish live client compatibility.

The configured MCP resource is `https://api.soholms.com/mcp`. Sign in through the client OAuth flow when the companion service is available. Never copy browser cookies or bearer tokens. Current tools read teaching-template and lesson summaries. Upload, import and apply are unavailable; the PDF skill supports offline analysis.

## Install after publication

Use the actual credential-free HTTPS clone URL supplied by the publisher. `MARKETPLACE_GIT_URL` below means that selected URL; no GitLab host/project is assumed. Git access credentials belong in your normal Git credential manager, never in the URL or this repository.

Codex supports a Git marketplace URL:

```sh
codex plugin marketplace add "$MARKETPLACE_GIT_URL"
codex plugin marketplace list
```

Open the client plugin directory and install `soho-agent` from the `soho-agent` marketplace. To pin an immutable publisher tag, add the URL with `--ref v0.1.0`. Reload/restart the client and authenticate the SOHO connection. See [OpenAI packaging](https://developers.openai.com/plugins/build/plugins). CLI registration, desktop installation and OAuth remain separate acceptance checks.

Claude Code:

```sh
claude plugin marketplace add "$MARKETPLACE_GIT_URL"
claude plugin install soho-agent@soho-agent
```

Start a new session or use `/reload-plugins`. For a pinned marketplace, append `#v0.1.0` to the clone URL. See [Claude installation](https://code.claude.com/docs/en/discover-plugins).

Cursor: on a plan with team marketplaces, open Dashboard → Plugins & MCPs → Add Marketplace → Import from Repo and supply the actual GitLab URL. Install the plugin from Customize. GitLab imports remain served from their source repository; refresh the marketplace explicitly in the dashboard. See [Cursor plugins](https://prod.cursor.com/docs/plugins). Availability of individual/personal import differs by client surface and is not claimed here.

## Update and versions

```sh
codex plugin marketplace upgrade soho-agent
claude plugin marketplace update soho-agent
claude plugin update soho-agent@soho-agent
```

Review changes, update/reload the installed plugin in the client and authenticate again if requested. Cursor GitLab marketplaces use manual dashboard refresh; do not assume GitHub-only push auto-refresh applies. A pinned tag stays pinned. Updating the server does not update installed skills, and a marketplace refresh does not prove a running session uses the new package. See the client sources above for current policies.

Use `plugins/soho-agent/CHANGELOG.md` for human-readable changes. Local metadata has no fabricated release/changelog URLs. No background notification or self-update is implemented. Finish an approved operation before changing package versions.

## Public boundary and maintenance

This repository contains generated client files: three catalogs, portable and compatibility manifests, fixed URL-only MCP configuration, one skills tree, version/changelog metadata and a dependency-free integrity check. It excludes service source, npm dependencies, deployment configuration, internal plans, credentials and tenant data. Source workflows are maintained in the separate SOHO Agent authoring repository.

Run `node scripts/verify-marketplace.mjs` with Node24 to verify inventory hashes, public paths, catalogs, versions and endpoint parity. Hashes establish internal integrity, not publisher authenticity; trust the chosen Git source/ref. `.soho-marketplace.json` records source commit when available and an export fingerprint without author machine paths.

Maintainers: from the source repository run `node scripts/refresh-marketplace.mjs --out ../soho-agent-marketplace` to preview; repeat with `--apply` to generate/update this tree. The updater refuses edited, unmanaged or symlinked targets, preserves Git metadata, and never commits or pushes. All generated public files must be reviewed together in the Git diff. A changed skills release needs a package version/changelog bump and an immutable release tag.

GitLab CI runs the same integrity check without reading the private source repository. Source CI can prepare a allowlisted artifact for review; copying it to the selected public project, creating immutable tags and publishing require a separate authorized release step. Choose repository visibility and distribution rights/license before public publication; no license is assumed.

If a refresh is interrupted, preserve the checkout and inspect its diff. Inventory mismatches stop later refreshes. Recover the generated files from a known reviewed Git commit only after preserving local work, then rerun the source command. Never remove files or reset a checkout blindly to force an update.

Real installation, discovery/reload, login/refresh/revoke and update acceptance on Codex, Claude Code and Cursor remain release checks. These documented client paths are not a claim that the intended endpoint has been deployed or tested.
