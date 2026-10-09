# SOHO Agent 0.1.7

Prepared Git-distributed skills and bounded remote MCP package. Publication and live client acceptance are separate release steps.

MCP resource: https://api.soholms.com/mcp. Codex and Claude Code have separate public pre-registered OAuth client settings. Install the plugin, then authenticate its bundled SOHO connection in the client UI. School access requires operator enablement; live login acceptance remains unverified. Never paste browser credentials. The service 0.1.4 implementation supports dedicated Agent Query/Mutation: teaching-template and empty-draft-lesson creation only, with new write consent and stable idempotency keys. Backend/evolution/service rollout is separate; live write acceptance remains unverified. Old read grants remain read-only. The soho-connect skill uses explicit conversation sessions and contextId; explicit revision-checked selection reuses eligible consent and disconnect clears only that session with session-direct.v1. New or ambiguous consent keeps browser controls. Legacy grant revocation affects all chats sharing the grant. The connection skill lists grants and guides disconnect/reconnect; they cannot clear host chat state or launch OAuth. Upload/import/apply are unavailable. The PDF skill can analyze sources offline.

See [changes](CHANGELOG.md), [version metadata](release-metadata.json), and skills: [soho-connect](skills/soho-connect/SKILL.md), [soho-connection](skills/soho-connection/SKILL.md), [soho-course-pdf-transfer](skills/soho-course-pdf-transfer/SKILL.md), [soho-graphql](skills/soho-graphql/SKILL.md).

The remote service and installed skills have separate release lifecycles. For Git package updates, refresh the marketplace and update/reload the installed plugin using your client.
