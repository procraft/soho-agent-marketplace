# Changelog

## 0.1.7

- Keep the native URL /mcp for owner-only access. Old school credentials require a one-time OAuth migration; reusable school grants are preserved. No additional principal ingress routes are required.

- Reuse uniquely eligible existing school consent directly from an explicit chat request; conversation disconnect is direct and revision-checked. Requires backend session-direct.v1 and service 0.1.4. Old backends retain browser controls; new authorization still requires consent.
- Diagnose legacy installed packages without assuming a Codex Desktop /mcp command. Publication, installation and live acceptance remain separate rollout steps.

## 0.1.6

- Add owner OAuth and explicit conversation school contexts, browser connect/switch/disconnect controls, and the soho-connect skill. Legacy school grants remain supported. Requires backend session.v1/context-exchange.v1 and service 0.1.3; live host/consent acceptance is unverified.

Client package authoring history. Package publication and remote service deployment have separate lifecycles.

## 0.1.5

- Consolidate connection inventory, current disconnect and native reconnect into the single soho-connection skill.

- Add shared soho-graphql skill and remote schema/validation/Query/Mutation tools for the dedicated Agent schema.
- Support scoped teaching-template and empty-draft-lesson creation with stable idempotency keys and explicit unknown outcomes.
- Request read+write consent for new client grants; old read grants remain compatible. Package0.1.5/server0.1.2; legacy registered contract1.0.0, document/schema1.1.0. Backend/evolution/consent rollout and live acceptance remain separate.

## 0.1.4

- Add bounded own-connection metadata and the soho-connections skill, including current grant and approximate last request history; requires companion backend connections.v1 rollout.

- Current-grant-only `soho_disconnect` control in remote service0.1.1, with live identity checks, explicit cross-chat effect and non-retryable unconfirmed outcomes.
- Portable disconnect/reconnect skills guide supported client OAuth and new-chat controls without claiming host automation or changing client credentials.
- Reconnect preserves the current connection until a new OAuth flow succeeds; learning operations remain read-only and tool contract1.0.0 is unchanged.

## 0.1.3

- Context preserves and validates the actual connection expiry separately from the access-token lifetime and original Intrude ceiling.
- Skill labels the connection deadline correctly for direct/support access; older backends without that field never receive an invented expiry date.
- Backend context rollout, MCP rollout and installed plugin refresh are separate steps; grant lifetime policies remain unchanged.

## 0.1.2

- Skill checks the live SOHO school/employee context before connected work and shows the initiating administrator and Intrude expiry for support access.
- MCP validates additive support identity against live introspection on every tool call; legacy direct connections remain compatible.
- Support school selection/reconnection and one/all connection management are documented. Runtime rollout and live client acceptance remain separate steps.

## 0.1.1

- Separate preregistered public OAuth settings for Codex and Claude Code marketplace installs; no client secrets.
- Public Git package uses the supported Codex compatibility layout and a Claude MCP override sharing one skills tree.
- Russian installation README plus Kazakh and English translations with concrete GitHub commands.
- Cursor marketplace removed until its preregistration and callback compatibility are established.
- Live client login, deployment and school enablement remain separate acceptance steps.

## 0.1.0

- Companion read-only backend OAuth/grants and Master consent/connections UI implemented in isolated product worktrees; not deployed, migrated or real-client accepted.

### Added

- Read-only Streamable HTTP MCP service using the official TypeScript SDK.
- Registered summary-read catalog, bounded requests/results, live grant verification and separate backend delegation boundary.
- Package validation, client config previews and deterministic local marketplace staging.
- Independent package/server/contract metadata, explicit version checks and clean-checkout update/pin fallback.
- Focused mock/unit/protocol and distribution tests; authoring CI workflow.
- Portable PDF transfer skill and conditional GraphQL/source/rich-text references.
- Cross-repository implementation contract and backend/frontend plans.

### Changed from the supplied draft

- Separated format preferences from API safety; offline analysis needs no LMS connection.
- Removed credential-copying guidance as the primary authentication workflow.
- Corrected block-merge/settings semantics, ID distinctions, upload lifecycle and quiz score/input mapping from code evidence.
- Distinguished native shapes, supplied renderer observations and unverified runtime behavior.

### Limitations

- Service requires configured companion backend Agent Access, not a built-in OAuth provider.
- Summary reads do not include full lesson content; import/apply/upload/repair tools are not enabled.
- No deployment/public release/background notification service or real-client/browser acceptance.
- AiAssistant is not replaced. Guarded writes require concurrency/idempotency/approval/upload gates.
