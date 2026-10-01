# Changelog

Local authoring versions only. No public release or marketplace has been published.

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
