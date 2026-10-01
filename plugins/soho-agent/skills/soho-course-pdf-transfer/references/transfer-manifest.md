# Transfer manifest and content rules

Read for source analysis, planning or resume. This is an import convention, not a universal LMS curriculum model.

## Minimal manifest

Keep this in a user-approved local artifact or future import job, not in the installed plugin. Do not retain original learner/personal data unless required and authorized.

```yaml
mode: analyze
target:
  environment: unresolved
  organization_id: unresolved
  academic_discipline_id: unresolved
sources:
  - key: module-01
    filename: module-01.pdf
    fingerprint: unresolved
lessons:
  - source_key: module-01
    title: unresolved
    source_pages: []             # 1-based source page numbers
    theory_removed_pages: []
    theory_output: unresolved
    lesson_id: null
    blocks: []                  # ordered types and stable source keys
    assessments: []             # type, source pages, question count, key provenance
    requested_settings: {}
    verification:
      api: pending
      ui: pending
exceptions: []
```

Record file ID, homework IDs and job/request IDs as they become known. A fingerprint is computed from the source, not invented. Track ambiguous outcomes and every completed stage, so resuming can reconcile before creating duplicates. Future server-side job IDs provide stronger guarantees than this offline record.

## Proposed PDF-transfer format

Unless the user supplies another map, propose one source module → one lesson. Do not equate one PDF with one module without inspecting it.

The supplied workflow's preferred lesson order is video (when supplied), learning materials, assessment. In that format:

- Make an edited theory PDF, e.g. `module-01_без_заданий.pdf`, retaining original non-task material and layout.
- Reuse **one uploaded file** for both Presentation and Attachment items. This duplication is intentional only when agreed.
- Recreate tests as native quizzes. Inline display and hiding the first slide are optional agreed settings, not assumptions derived from question type.
- Recreate open questions/cases as teacher-reviewed work, preserving wording, media, required response and agreed scoring.
- Create separate literature, curriculum, checklist, memo or final-test lessons only if in the agreed map.

## Extraction checks

Inspect all pages for content inventory; visually inspect first/last pages and every task, answer key, diagram, table or unusual layout. Text extraction alone does not prove that formulas, columns or diagrams survived.

Delete whole task pages from a copy where possible. For mixed theory/task pages, record the removed regions and visually inspect every modified page; preserve all non-task text and graphics. Recheck pagination/cross-references after page removal. If this cannot be done reliably with available tools, return the proposed edit and limitation instead of fabricating a cleaned PDF.

Classify each assessment's answer provenance: `source-key`, `user-provided`, `generated-with-approval`, or `unresolved`. Unresolved answers must not become auto-graded questions. Check question/options wording, multiple correct choices, explanations, attachments and score rules, not only counts.

## Resume and reporting

Reconcile checkpoints with server state; checkpoint IDs can be stale or point at another organization. Distinguish `planned`, `created`, `linked`, `api-verified`, `ui-verified`, `ambiguous`, and `blocked`.

Completion report: target environment/organization/template, lesson IDs, ordered block types, PDF file IDs, assessment IDs/counts, settings actually changed, verification levels and unresolved items. Elapsed time/token estimates are optional and must be labeled estimates if not measured. Do not embed source answer keys in routine reports.
