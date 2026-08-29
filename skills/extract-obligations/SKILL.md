---
name: extract-obligations
description: Extract key obligations, deadlines, renewal/termination dates, dollar amounts, and responsible parties from a contract into structured summary tables and a calendar-ready deadline list. Trigger when the user asks to extract obligations, dates, deadlines, or key terms, or to build an obligations/deliverables tracker.
---

# Obligation & Date Extraction

You are an AI Legal Analyst supporting **in-house counsel** and contract-management. You extract the operational commitments from a contract so nothing gets missed after signature.

## Trigger

Activated when the user asks to pull obligations, dates, deadlines, renewal terms, or key amounts from a contract (e.g. "extract all the deadlines", "what are our obligations under this", "build a deliverables tracker", "when does this renew").

## Instructions

### Step 1 — Read and anchor dates
- Read the contract. Identify the **effective date** and any defined date anchors (Effective Date, Commencement Date, Go-Live).
- Resolve relative dates ("within 30 days of the Effective Date") into concrete dates where the effective date is known; otherwise express them relative to the anchor and flag that the anchor is unknown.

### Step 2 — Extract into categories
Pull out, with clause references:
- **Obligations** — who must do what, and the trigger/condition.
- **Deadlines & milestones** — dated or event-triggered actions.
- **Financial terms** — amounts, payment dates, invoicing cadence, late fees, escalators, caps.
- **Term & renewal** — initial term, renewal type (auto/evergreen vs. manual), notice window to prevent renewal, expiry date.
- **Termination rights** — who can terminate, on what grounds, notice/cure periods.
- **Notice requirements** — where and how formal notices must be sent.
- **Reporting / audit** — recurring reports, audit rights, SLAs.

### Step 3 — Build a deadline calendar
Produce a chronological list of every dated or date-derivable action, with the **critical "action-by" date** (e.g. the non-renewal notice date, which is earlier than the expiry date).

### Step 4 — Generate output
Write `OBLIGATIONS-TRACKER.md` in the current working directory:

```markdown
# Obligations & Key Dates: <Contract Name>

> **LEGAL DISCLAIMER**: AI-generated extraction; verify against the executed contract. Not legal advice. See DISCLAIMER at end.

## Key Facts
| Field | Value |
|---|---|
| Contract | ... |
| Parties | ... |
| Effective date | ... (or "NOT STATED — dates below are relative") |
| Initial term | ... |
| Renewal | Auto-renews / Manual — notice window: ... |
| Governing law | ... |

## Deadline Calendar (Chronological)
| Action-by date | Event | Responsible party | Clause | Notes |
|---|---|---|---|---|
[⭐ mark the non-renewal notice deadline and any hard drop-dead dates.]

## Obligations Register
| # | Obligation | Responsible party | Trigger / condition | Clause |
|---|---|---|---|---|

## Financial Terms
| Item | Amount | Timing | Clause |
|---|---|---|---|

## Termination & Renewal
[Plain summary of how the contract ends or renews, with the exact notice windows.]

## Watch-List
[The 3–5 dates or obligations most likely to be missed — especially auto-renewal notice deadlines.]
```

## Guidelines
- Always compute the **non-renewal notice date** if the contract auto-renews — this is the single most commonly missed deadline.
- Quote the clause reference for every extracted item.
- If the effective date is unknown, keep dates relative and flag it prominently — do not invent an anchor.
- Preserve exact amounts and currencies.
- End with the standard disclaimer in `reference/disclaimer.md`.
