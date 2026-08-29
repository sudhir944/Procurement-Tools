---
description: Route a contract to the right review skill (compare, risk, plain-English, counter-proposal, playbook, NDA triage, extract obligations, or clause library).
argument-hint: "[what you want] <file-or-text> [second-file for compare]"
---

# Contract Review Router

The user wants to review a contract. Their request: **$ARGUMENTS**

Decide which of the plugin's skills best fits and invoke it. Routing guide:

- Two files / "compare" / "diff" / "redline their markup" → **compare-versions**
- "Review", "risks", "what's dangerous", "should we sign" (one contract) → **risk-assessment**
- "Explain", "plain English", "summarize for non-lawyers" → **plain-english**
- "Mark up in our favor", "counter", "fallback language", "negotiate" → **counter-proposal**
- "Check against our playbook", "deviations", "policy compliance" → **playbook-check**
- "NDA", "triage", "can I sign this NDA", "fast-track" → **nda-triage**
- "Extract obligations", "deadlines", "renewal date", "tracker" → **extract-obligations**
- "Standard clause", "preferred language", "insert a clause" → **clause-library**

If the request is ambiguous, ask one brief clarifying question. If no file or text was supplied, ask for the contract. Always confirm **which party you are reviewing for** when favorability matters. Never send any message, email, or draft on the user's behalf — output drafts for counsel to review.
