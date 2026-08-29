---
description: Run a complete in-house review of one contract — risk assessment, playbook check, obligation extraction, plain-English summary, and a counter-proposal — producing a bundled review package.
argument-hint: "<contract-file-or-text> [--for our-party-name]"
---

# Full Contract Review Package

The user wants a complete review of a single contract: **$ARGUMENTS**

Produce a full in-house review package by running these skills in order and writing each output file:

1. **risk-assessment** → `CONTRACT-RISK-ASSESSMENT.md`
2. **playbook-check** → `PLAYBOOK-CHECK.md` (ask for a playbook, or use the bundled default and say so)
3. **extract-obligations** → `OBLIGATIONS-TRACKER.md`
4. **plain-english** → `PLAIN-ENGLISH-SUMMARY.md`
5. **counter-proposal** → `COUNTER-PROPOSAL.md`

Then write a short `REVIEW-PACKAGE.md` index that links the five files and gives a one-paragraph executive recommendation (sign / negotiate / escalate).

Before starting, confirm **which party you are reviewing for**. Do not send anything externally; all drafts are for counsel to review. Append the standard disclaimer (`reference/disclaimer.md`) to every generated file.
