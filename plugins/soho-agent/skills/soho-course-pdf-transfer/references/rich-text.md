# Rich-text compatibility and targeted repair

Read before producing quiz/assignment prose or repairing a renderer failure. Native shapes below were checked against local code; the supplied memo's white-screen observations have not been browser-tested by this bootstrap. Neither is a complete deployed renderer schema.

## Construction rules

- Rich text must fit the **current SOHO renderer schema**, not merely be valid JSON.
- Never emit an empty text node: `{ "type": "text", "text": "" }`. The supplied workflow encountered white-screen editors with this shape.
- Current native prose is `{json: "<serialized editor state>", html, extra}`. The serialized state contains `{doc: {type: "doc", content: [...]}, selection: {type: "text", anchor: 1, head: 1}}`; do not send a raw doc where the operation expects that envelope/string. Obtain the complete current input shape and use native serialization, not manual escaping.
- `{ "type": "paragraph" }` is a supported native blank paragraph in the checked code, not a whole document. Copy/validate the surrounding editable blank state too.
- Preserve `extra` file/video references and the expected HTML/editor-state relationship. Do not strip unknown fields or flatten media into text.
- Separate ordinary paragraphs. Checked backend code serializes internal line breaks as newline text; its internal HardBreakNode name does not establish support for a native `hardBreak` JSON node.
- Checked native tables use `table → tr → th/td → paragraph+`, with cell attributes such as `colspan`, `rowspan` and `alignment`. Reuse the full native constructor/sample, not generic ProseMirror assumptions. An image fallback is only for a genuinely unsupported source representation after the user accepts the accessibility/editability tradeoff.
- Hide the first quiz slide with the dedicated supported setting, not malformed prose. Preserve final-slide content/settings too.

## Repair procedure

1. Stop bulk writes; establish that the editor failure belongs to this object. A white screen alone does not prove an empty-node defect.
2. Read complete quiz details with every answer/part variant, all prose/media, correct answers, comments, scores and display settings. If completeness cannot be established, stop.
3. Preserve a user-authorized snapshot outside the plugin. Identify a specific invalid node/field and compare against a known editable example.
4. Prepare the smallest change: for an identified empty-text-node defect, remove only those nodes, retaining sibling nodes and required document wrappers. Do not run a blanket cleanup of unknown attributes or all quizzes.
5. Recheck current state/concurrency, update in place, and reconcile ambiguous failures before retrying.
6. Read back and compare question IDs, answer/part variants, keys, media, scores, display settings and counts. With authorized browser access, reopen the editor and render representative questions.

Without UI verification, report a repaired stored representation with **UI verification pending**, not a proven white-screen fix. A frontend validator is a future implementation requirement; this Markdown file does not enforce server-side safety.
