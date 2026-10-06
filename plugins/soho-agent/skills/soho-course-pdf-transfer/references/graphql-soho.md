# SOHO.LMS GraphQL introduction

Read before LMS access. This is a bounded integration guide, **not** a complete schema or a working connection. The shared Agent API is available through MCP after compatible backend/service rollout. Native content facts below do not enable those writes in the Agent schema. Deployed schema/version and live client acceptance remain separate checks.

## Shared API layer

For context, domain/ID distinctions, schema discovery, document/variable construction, supported Query/Mutation, OAuth scope and outcome/recovery rules, read the canonical [SOHO GraphQL skill](../../soho-graphql/SKILL.md) and its [Agent API semantics](../../soho-graphql/references/agent-api.md). These facts are maintained once there.

The current Agent API only creates teaching templates and empty draft lessons. The native content/settings/file facts below are scenario-specific references, not callable Agent capabilities. Do not bypass missing Agent writes with Master/browser credentials. These observations were checked against local product sources on2026-10-01; recheck actual supported schema before any separately authorized pilot.

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
