# Legal Contract Review — Claude Code Plugin

An AI-assisted **contract review toolkit for in-house counsel**, packaged as a [Claude Code](https://docs.claude.com/en/docs/claude-code) plugin. It bundles eight focused skills — from version comparison to risk flagging to counter-proposal drafting — plus a clause library and negotiation playbook, so a legal team can review contracts faster and more consistently.

> ⚖️ **Not legal advice.** Every output is AI-generated, for informational purposes only, and must be reviewed by a licensed attorney before you rely on it. See [Disclaimer](#disclaimer).

---

## What it does

| Skill | Command / trigger | Output |
|---|---|---|
| **compare-versions** | "compare v1 and v2", "redline their markup" | `CONTRACT-COMPARISON.md` |
| **risk-assessment** | "review this MSA for risk", "what's dangerous here" | `CONTRACT-RISK-ASSESSMENT.md` |
| **plain-english** | "explain this in plain English" | `PLAIN-ENGLISH-SUMMARY.md` |
| **counter-proposal** | "mark this up in our favor", "draft fallback language" | `COUNTER-PROPOSAL.md` |
| **playbook-check** | "check against our playbook", "flag deviations" | `PLAYBOOK-CHECK.md` |
| **nda-triage** | "can I sign this NDA", "triage this MNDA" | `NDA-TRIAGE.md` |
| **extract-obligations** | "extract deadlines", "when does this renew" | `OBLIGATIONS-TRACKER.md` |
| **clause-library** | "give me our standard liability clause" | inline / `SUGGESTED-CLAUSES.md` |

Two slash commands tie them together:

- **`/contract-review <what you want> <file>`** — routes your request to the right skill.
- **`/contract-full-review <file> --for <your party>`** — runs the whole suite and produces a bundled review package.

Skills also trigger automatically from natural language once the plugin is installed — you don't have to name them.

---

## Installation

This repo is both a plugin **and** a single-plugin marketplace, so installation is two commands inside Claude Code:

```bash
/plugin marketplace add your-org/legal-contract-review
```

```bash
/plugin install legal-contract-review@legal-contract-review-marketplace
```

> Replace `your-org` with the GitHub owner you publish under. You can also add it from a local path during development:
> `/plugin marketplace add /path/to/legal-contract-review`

Restart Claude Code (or reload plugins) and the skills and `/contract-*` commands are available.

### Requirements
- [Claude Code](https://docs.claude.com/en/docs/claude-code) installed and authenticated.
- No API keys, servers, or external services — the plugin is pure skills, commands, and reference files, so nothing leaves your machine except your normal Claude Code requests.

---

## Quick start

Try it against the bundled fictional samples:

```bash
/contract-review compare examples/sample-msa-v1.md examples/sample-msa-v2.md
```

That surfaces the vendor's quietly self-favoring edits in v2 (liability cap cut from 12→3 months, added Customer-to-Vendor indemnity, removed termination-for-convenience, added fee escalator and residuals clause, venue flipped to New York with fee-shifting).

Other examples:

```bash
/contract-full-review examples/sample-msa-v1.md --for Acme Corp.
```
```bash
/contract-review "extract every deadline and the renewal notice date" examples/sample-msa-v1.md
```

---

## Customize it for your organization

The plugin ships with **generic templates** you should replace with your own counsel-approved standards:

- **`reference/default-playbook.md`** — your standard positions, fallbacks, and red lines. The `playbook-check` skill uses this when you don't supply your own.
- **`reference/clause-library.md`** — your preferred and fallback clause language. The `clause-library` skill draws from this.
- **`reference/disclaimer.md`** — the disclaimer appended to every report. Adjust to your firm's approved wording.

You can also point the skills at a per-matter playbook or clause file by supplying it in your request.

---

## Repository layout

```
legal-contract-review/
├── .claude-plugin/
│   ├── plugin.json          # plugin manifest
│   └── marketplace.json     # makes this repo installable as a marketplace
├── commands/
│   ├── contract-review.md       # /contract-review router
│   └── contract-full-review.md  # /contract-full-review full suite
├── skills/
│   ├── compare-versions/SKILL.md
│   ├── risk-assessment/SKILL.md
│   ├── plain-english/SKILL.md
│   ├── counter-proposal/SKILL.md
│   ├── playbook-check/SKILL.md
│   ├── nda-triage/SKILL.md
│   ├── extract-obligations/SKILL.md
│   └── clause-library/SKILL.md
├── reference/
│   ├── disclaimer.md
│   ├── default-playbook.md
│   └── clause-library.md
├── examples/
│   ├── sample-msa-v1.md
│   └── sample-msa-v2.md
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

## Design notes / defaults chosen
- **Pure Claude Code plugin** — no runtime, server, or API keys, so it is safe to run against confidential contracts locally.
- **In-house-counsel framing** — skills always ask which party they are reviewing for and weigh favorability accordingly.
- **Human-in-the-loop by design** — the plugin never sends emails or messages; counter-proposals and cover notes are produced as drafts for an attorney to review and send.
- **Every report is self-contained Markdown** you can drop into a matter file or DMS.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md). Issues and PRs for new skills, better playbook/clause templates, or additional contract types are welcome.

## License
[MIT](LICENSE)

## Disclaimer
This software and all output it generates are provided for informational and educational purposes only and **do not constitute legal advice**. No attorney-client relationship is created by using this plugin. AI analysis can contain errors and omissions. Always have a qualified attorney licensed in your jurisdiction review any contract and any AI-generated output before relying on it, negotiating from it, or signing.
