---
name: LLM Agent Workflow Patterns
description: Plug-and-play patterns for managing AI coding agents and application LLM prompts — covers session handoff protocols, codebase context snapshots, task spec templates, and ironclad JSON prompt patterns.
---

# Reusable LLM Patterns and Prompts

This is a plug-and-play guide for managing Agent Workflows (how AI writes code for you) and Application Prompts (how your apps use AI internally). You can drop these patterns into **any software project** to drastically reduce AI hallucinations, context amnesia, and conflicting edits.

## How to Setup a New Repository
To prepare a new or existing project for LLM coding agents (Cursor, Copilot, Claude Code, etc.), create these files at the root of your project:
1. `HANDOFF.md` (or `.agent-handoff/HANDOFF.md`) — A continuous shift log for the AI.
2. `CODEBASE_CONTEXT.md` — A static map of your project architecture.
3. `.cursorrules` or `CLAUDE.md` — Your agent's system prompt. (Paste the "Session Protocol" below into this file).

## Part 1: Agent Workflow Patterns (Managing AI Coders)

Solve "AI context amnesia" by forcing coding agents to follow strict reading and writing protocols.

### 1. The "Handoff Memo" Pattern (The Shift Log)
When multiple agents (or different chat sessions) work on a project, they forget previous context and can overwrite each other. The solution is a persistent shift log.

**Drop this into your `.cursorrules` or `CLAUDE.md`:**
> **Session Start Protocol:**
> Before making ANY code changes, you must:
> 1. Read `CODEBASE_CONTEXT.md` to understand project architecture.
> 2. Read `HANDOFF.md` (top/recent entries) to see what the last agent changed.
> 3. Check git state (`git stash list`, `git status -u`) to avoid duplicating uncommitted work.
> 4. Run the baseline test suite.
>
> **Session End Protocol:**
> Before finishing, you MUST prepend a new entry to `HANDOFF.md` using the exact format below. Do it in the same commit as your code changes.

**The Handoff Template (Paste this into `HANDOFF.md` as the first entry):**
```markdown
## [YYYY-MM-DD] — [Agent Name / Chat Session]

**Summary:** One-line description of what was accomplished.

### Changed Files
| File | Action | What Changed |
|------|--------|-------------|
| `path/to/file` | modified | Brief description of changes |

### Breaking Changes / New Dependencies / Architectural Shifts
List anything that would cause the next agent's work to fail or anything they need to adopt going forward. (If none, write: None).

### Pending / In Progress
Work that is started but not finished, or known issues to be picked up next. (If none, write: None).

### Git State & Verification
- "All changes committed and pushed" OR "WARNING: X files left uncommitted."
- Tests run: `[test command]` -> `[result]`
```

### 2. The "Codebase Context" Snapshot
LLMs waste tokens and make bad assumptions when exploring a repo file-by-file. Maintain a static context markdown file acting as an architecture map.

**What to include in `CODEBASE_CONTEXT.md`:**
- **Directory Map:** What lives where (e.g., "Frontend is in `/client`, backend is in `/api`").
- **Architecture Rules:** (e.g., "All data access goes through `persistence.py`").
- **Gotchas / AI Traps:** Document things AI usually gets wrong.
- **API / Data Models:** A quick cheat sheet of your core data structures.

### 3. The "Implementation-Ready" Task Spec
When asking the AI to build a new feature, structure your prompts with explicit constraints and read-targets.

**Reusable Task Prompt:**
```markdown
# Task: [Task Name]

## Pre-read
Before implementing, read these exact files to understand the current state:
- `path/to/file.ext` lines X–Y

## Current Problem
[Briefly explain what is wrong]

## Implementation Steps
### 1. [Category, e.g., Styling / State]
[Provide exact class names or logical steps required]

## Verification Checklist
- [ ] Requirement met
- [ ] Automated tests pass
- [ ] HANDOFF.md updated
```

---

## Part 2: Application LLM Prompts (Inside the Code)

### The "Ironclad JSON" Prompt Template
Use this in your backend code when you need an LLM to act as a structured data generator or API backend.

**Reusable Application Prompt Template:**
```markdown
You are a strict, JSON-only data generator for a [Insert Domain/System].

RULES — follow these exactly:
1. Return ONLY valid JSON. No markdown, no explanations, no code fences (```json).
2. You may only output one of the following schemas: [List allowed schemas/types].
3. You may only reference entities from the PROVIDED_CONTEXT list below. Normalize them to [UPPERCASE/lowercase].
4. Do NOT invent new rule types, plugins, or schema fields.
5. If the user's request cannot be safely represented using the allowed schemas, you MUST return this exact fallback object:
   {"error": true, "error_code": "unsupported", "message": "<reason>"}

OUTPUT FORMAT:
{
  "draft_type": "<schema_name>",
  "draft_json": { ... },
  "human_summary": "<one-line summary of what you built>",
  "warnings": ["<any assumptions you had to make>"]
}

---
PROVIDED_CONTEXT: [{context_list}]
USER_PROMPT: {user_prompt}
```

---

## Summary of Best Practices
1. **Never let an AI start coding blindly:** Force it to read a `CODEBASE_CONTEXT.md` and `HANDOFF.md` first.
2. **Never let an AI leave quietly:** Force it to log what it did and what is currently broken before ending the chat.
3. **Control Application JSON tightly:** Give the LLM an exact JSON escape hatch for errors (`{"error": true}`), and explicitly ban conversational text and markdown blocks.
