# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

_Nothing yet._

## [1.0.0] — 2026-08-29

First public release — an AI-assisted contract review toolkit for in-house counsel, packaged as a Claude Code plugin.

### Added
- **8 skills**, each producing a self-contained Markdown report:
  - `compare-versions` — side-by-side redline of two contract versions; flags who each change favors and dangerous patterns.
  - `risk-assessment` — single-contract risk sweep across 13 categories, scored High/Medium/Low.
  - `plain-english` — plain-language translation of legalese for non-lawyer stakeholders.
  - `counter-proposal` — ideal/fallback/walk-away redlines plus a draft cover note.
  - `playbook-check` — scores a contract against standard positions and flags deviations.
  - `nda-triage` — fast-track / quick-fix / escalate routing on the NDA "big eight".
  - `extract-obligations` — extracts deadlines, renewal-notice dates, and amounts into a tracker.
  - `clause-library` — serves preferred/fallback clause language.
- **2 slash commands**: `/contract-review` (router) and `/contract-full-review` (full suite).
- **Reference templates**: `default-playbook.md`, `clause-library.md`, and a shared `disclaimer.md`.
- **Examples**: two sample Master Services Agreements (`sample-msa-v1`, `sample-msa-v2`) for demos.
- **Packaging**: `.claude-plugin/plugin.json` and `marketplace.json` so the repo installs as a single-plugin marketplace.
- **CI**: `scripts/validate-plugin.mjs` and a GitHub Actions workflow validating manifests, skill frontmatter, and commands on every push and pull request.
- **Docs**: README, CONTRIBUTING, and MIT LICENSE.

[Unreleased]: https://github.com/sudhir944/Procurement-Tools/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/sudhir944/Procurement-Tools/releases/tag/v1.0.0
