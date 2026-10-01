# SOHO.LMS GraphQL introduction

Read before LMS access. This is a bounded integration guide, **not** a complete schema or a working connection. Bootstrap has no MCP tools. Schema facts were checked against local product sources on 2026-10-01; deployed schema/version must still be verified. Supplied workflow observations are labeled separately.

## Domain and ID distinctions

- `AcademicDiscipline`: shared teaching template; typical PDF-transfer target.
- `Course`: commercial offering linked to teaching content. Creating a curriculum does not create/authorize sales or publishing.
- `Academic*`: templates; `Learning*`: a learner's instance/progress/access. Do not change a learner instance instead of the teaching template.
- Current legacy lesson input may distinguish `AcademicLesson` and `InteractiveLesson`. This workflow targets supported self-paced academic lessons; do not infer future unified types.
- Relay `id`, numeric entity `uid`, and content-item string `uid` are different. Mutations may require numeric IDs even when reads expose global Relay IDs. Convert only with a verified schema/tool mapping.

## Connection and authorization

Prefer the configured high-level SOHO connection. Tokens, refresh and organization authorization belong to its runtime, not this skill. Never copy browser cookies, a full authenticated cURL or a token into chat/plugin files/reports.

Existing Master path is `/master/graphql` on the configured API origin; do not guess `/graphql` or production host. Current frontend sends POST JSON `query`/`variables`, `Authorization: Bearer <idToken>`, `x-procraft-query` for operation name and `x-procraft-org` for attribution. Org is enforced by authenticated identity; the header does **not** grant tenant selection.

An internal `/master/api/ai-import/access` issues time-limited access metadata, but is not a scoped OAuth/refresh flow. Corporate REST `Authorization: TOKEN` is a different API. The planned remote MCP/gateway credentials are separate audiences; do not pass one bearer to another endpoint.

Discover actual capabilities and catalog first. For a new write shape, use supported operation documentation/schema excerpt or a verified current native example. No guessed enum labels/required fields; no full schema dump by default. If direct GraphQL is independently authorized for a pilot, use only the approved endpoint/operation/runtime, not improvised credential extraction.

## Transport and operation outcomes

Set operation name/variables explicitly. Check HTTP status **and** GraphQL `errors` plus payload-level result; HTTP 200/partial data is not proof of success. Error reports contain request/job ID and safe summary, not raw headers/secrets.

Reads may require pagination and union/interface fragments. A partial read is insufficient for a replacing write. On timeout/transport failure, reconcile saved objects or job state before retrying. A title match, clientMutationId or post-execution log alone is not idempotency. Existing API also lacks a general revision guarantee: without server-side atomic protection, flag concurrent-write limits rather than claiming safety.

## Learning operations and exact update scope

| Current operation | Meaning / warning |
|---|---|
| `academicDisciplineCreate` | Creates a teaching template, not a commercial Course |
| `academicLessonCreate` | Creates a lesson under its template/tree; usual new lesson is Draft without content |
| `academicLessonUpdateContent` | Behavior depends on `request.extra`; see below |
| `academicLessonUpdateSettings` | Whole settings write, **not** a sparse patch |
| `academicLessonImportQuiz` | Existing sourceText import pipeline; returns counts/warnings/issues, not a generic binary-PDF import |

### Content: prefer a focused merge

Current content mutation accepts lesson ID and `request: {content: {items: [...]}, extra: ...}`. This is a shape guide, not a complete executable mutation.

- **No extra:** replaces whole saved content. Read the complete current array and map output → supported input, preserving order/UIDs/visibility/obligation/type-specific fields. Omitted owned homeworks can be marked deleted as a side effect. Do not do this from a truncated/partial response.
- **`extra.contentItemId`:** server merges that string block UID into current content. Include the complete target record; include complete neighboring records if required to establish its intended position. If target is missing from submitted items, the operation removes it. Do not use that omission for an unauthorized delete.
- **`extra.academicHomework`:** complete homework patch; numeric `id` updates existing homework, `id: null` creates another. Server then links it to the target content item. Do not recreate on resume or assume an omitted field preserves data.
- Use the correct existing homework reference (`academicHomeworkId` where the current input supports it) to reuse an object. Confirm ownership and linkage after read-back.

Focused merge reduces blast radius, but it is not automatic concurrency or idempotency. Do not copy response JSON wholesale into GraphQL input: output-only fields, computed values, union names and IDs need explicit mapping. Preserve fields the approved change does not own; stop if they cannot be mapped safely.

### Settings: avoid unnecessary saves

Current settings operation writes a complete settings object; missing nullable values may clear settings. Read every input-relevant field and preserve its meaning; do not assume generic PATCH semantics. Conversation/completion/access changes may affect chat inheritance and learning tracks. Use a controlled server-side patch when available; otherwise stop if completeness cannot be established. Notifications/access changes are not implicit in content import.

## Files: row existence is not upload completion

Current native flow signs an upload through `/master/api/s3/sign`, creates a StoredFile row before byte upload, and expects PUT to the returned URL with exact signed MIME/required headers. Current implementation also signs `x-amz-acl: public-read`; do not change headers, security policy or invent a completion endpoint. Signing again can allocate a new object rather than retry the same file.

Use the supported upload tool/session instead of synthesizing sign requests. A remote server cannot read a local client path. Never pass PDF/base64 through chat as a substitute for proper upload transport. Verify bytes, file metadata and processing before lesson linkage; signature/StoredFile response alone is not completion.

Presentation uses `presentation.attachData`; Attachment uses `attachment.attachDatas`. `AttachData` is metadata (URL/name/size/lastModified/uid and optional numeric `fileId`), not simply a scalar file ID. For the agreed dual-PDF format, reference one verified StoredFile in both records and read back both. Do not expose signed URLs in routine reports.

## Quiz and reviewed homework

Quiz patch uses `detailsQuiz`, `slides.questions`, optional opening/closing slides and type-specific answer parts. Teacher-reviewed homework uses the supported simple-homework details, `isGradable` and agreed scoring; exact enums/required fields come from the current operation catalog.

Observed one-point **question** scoring (not its first answer part):

```json
{"kind":"PerQuestion","maxScoresAmount":1,"perQuestion":{"scoresAmount":1}}
```

For quiz total-score input, preserve `maxScoresExplicit` as `maxScores` or null according to native mapping. Output `maxScores` is computed; copying it can silently change grading. Preserve all answer/part variants, correct answers, comments, media and scores, not just question text/count.

`isInline` and `isDoNotDisplayFirstSlide` are actual settings. Native UI allows hiding the first slide for inline, non-time-limited quizzes; do not force an unsupported combination. Existing text importer defaults do not guarantee the draft transfer convention. Settings follow the approved manifest, not this memo's preference.

For prose creation/repair, read [rich-text compatibility](rich-text.md). Current native prose is an envelope with serialized editor state, not an arbitrary raw ProseMirror doc. API validation does not establish renderer compatibility.

## Verification boundary

Before write: target org/type/IDs, full needed projection, current state/revision, approved change. After write: ordered blocks/UIDs, both PDF refs, homework IDs, complete question/answer variants and keys, counts, scores and display settings; keep a non-sensitive checkpoint.

With authorized browser access, inspect PDF and each new/repaired quiz in relevant editor/preview. Without it report API read-back separately and UI verification pending. Do not publish, delete, change access or launch a runtime to satisfy a verification step without authorization.
