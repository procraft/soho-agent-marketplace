# Dedicated Agent API

Read this when constructing an Agent document. The runtime schema is authoritative; contract 1.1.0 is additive to the registered 1.0.0 read catalog. The four MCP tools share remote execution/validation functions and authenticated credential exchange, not a downloadable client bearer script.

## Domain and IDs

`AcademicDiscipline` is a teaching template; commercial `Course` sales and learner `Learning*` instances are different. Numeric GraphQL `Int` entity UIDs, Relay global IDs and string content-item UIDs are not interchangeable. The Agent summaries use positive Scala/GraphQL Int IDs. Resolve the intended school/type/UID through the authorized connection, never a caller-supplied organization or endpoint.

Queries expose bounded context, own connections, discipline and lesson summaries. They do not expose full lesson content, assessment keys or a generic object selector. `first` defaults to20, maximum50. Follow each field's actual cursor (`afterUid` for learning summaries, `afterGrantId` for own connections); do not treat a page as the complete collection.

## Documents and variables

One operation per request; named operations and variables separate business input from documents. The backend parses the AST, validates fields/types, coerces actual variables and enforces bounds: document8KiB/request16KiB, depth8, expanded selections100, weighted page budget500. Subscriptions and generic introspection queries are rejected; `__typename` is allowed. Request schema via `soho_graphql_schema`, not `__schema` in an execution document. Fragments/aliases do not bypass the one expanded root Mutation-field limit.

`soho_graphql_validate` accepts document, variables and optional operationName, plus required top-level contextId in owner mode, without a mutation key; it does not execute the mutation or record activity. `soho_graphql_query` accepts the same fields. `soho_graphql_mutate` additionally requires `idempotencyKey`, a non-secret base64url identifier of1..128 characters. No token, host URL or actor/client/grant override is accepted. Owner-mode contextId selects only the current live-authorized conversation binding and belongs outside GraphQL variables; legacy calls do not use it. Variables must follow the actual selected field's input types.

## Implemented create surface

- `academicDisciplineCreate(input: AgentAcademicDisciplineCreateInput!)`: name required; shortName optional. Creates a teaching Discipline with fixed kind. No folder, school, ACL, sales or publication inputs.
- `academicLessonCreate(input: AgentAcademicLessonCreateInput!)`: academicDisciplineId Int and name required. Creates an empty Simple draft lesson appended at the discipline root, after checking the discipline belongs to this school and is writable. No module/status/content/upload selectors.

For a named bounded Query and both separate create Mutations, read [offline examples](examples.md). Use the actual schema and verified IDs before execution. A PDF workflow can create a template/draft skeleton; it cannot complete content or file transfer with these primitives.

## Write outcomes

A read grant stays read-only. School consent (browser control in owner mode, native reconnect in legacy mode) can grant `soho.learning.read soho.learning.write`; the backend still checks grant validity, support identity/WIP, school and domain ACL on every call and replay. MCP context `grantedScopes` comes from live legacy introspection or owner context exchange; nested `context.scopes` can be read-only after downscoping even when the grant includes write. OAuth write permission does not guarantee domain ACL. Query/schema execution downscopes to read. Validation checks the current grant's operation scope, not future consent.

HTTP200 alone is insufficient. The MCP rejects partial/error responses as incomplete and never exposes raw exception/input text. Mutation extensions distinguish `committed`, `not_started` and `unknown`. Only committed, complete data establishes creation. Preserve the key on timeout/cancellation/unknown and stop automatic retries. An identical keyed retry, if explicitly requested, recovers the original create result after fresh authorization; a changed target mutation field or normalized/coerced create input with the same key conflicts. Result selections and operationName are not the create receipt identity; preserve the original document and variables for controlled recovery. Read the returned object before reporting success. This is create idempotency, not general revision protection, transaction batches or a job platform.

Learning catalog `mode: read-only` remains a legacy field; it does not claim the separate document Mutation API is read-only. Connection disconnect is a separate current-grant control and is not a GraphQL mutation. Never infer online chats from connection activity.
