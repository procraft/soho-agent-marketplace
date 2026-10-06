# Agent document examples

Read when building the corresponding operation. These are offline schema fixtures, not authorization or completed LMS changes. Discover the actual Agent schema first. Replace the approved names and synthetic discipline UID42 with verified user-authorized values. Mutation keys shown here are examples: allocate and preserve a fresh stable key for each distinct create intent, never reuse an example key for a different payload.

## ListTeachingTemplates

```graphql
query ListTeachingTemplates($first: Int!) { academicDisciplines(first: $first) { nodes { uid name kind orgId } pageInfo { hasNextPage endUid } } }
```

```json
{
  "operationName": "ListTeachingTemplates",
  "variables": {
    "first": 20
  }
}
```

## CreateTeachingTemplate

```graphql
mutation CreateTeachingTemplate($input: AgentAcademicDisciplineCreateInput!) { academicDisciplineCreate(input: $input) { uid name kind orgId } }
```

```json
{
  "operationName": "CreateTeachingTemplate",
  "variables": {
    "input": {
      "name": "Approved teaching template"
    }
  },
  "idempotencyKey": "example-teaching-create-1"
}
```

## CreateDraftLesson

```graphql
mutation CreateDraftLesson($input: AgentAcademicLessonCreateInput!) { academicLessonCreate(input: $input) { uid name kind status purpose orgId academicDisciplineId } }
```

```json
{
  "operationName": "CreateDraftLesson",
  "variables": {
    "input": {
      "academicDisciplineId": 42,
      "name": "Approved draft lesson"
    }
  },
  "idempotencyKey": "example-lesson-create-1"
}
```
