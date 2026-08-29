# Contributing

Thanks for your interest in improving the Legal Contract Review plugin.

## Ways to contribute
- **New skills** — e.g. a specific contract type (SaaS order form, DPA, employment agreement) or a new workflow (obligation tracking export, risk scoring rubric).
- **Better templates** — improvements to `reference/default-playbook.md` and `reference/clause-library.md` (kept generic; do not submit any real client or proprietary language).
- **Bug fixes** — routing mistakes, output-format issues, unclear instructions in a `SKILL.md`.

## Adding a skill
1. Create `skills/<skill-name>/SKILL.md`.
2. Give it YAML frontmatter with a `name` (must match the folder) and a `description` that clearly states **when** to trigger it — the description is what Claude uses to route.
3. Follow the house pattern: role → trigger → numbered steps → output template → guidelines → reference the shared disclaimer.
4. Update the tables in `README.md`.
5. If it adds a command, put it in `commands/` and document it.

## Guidelines
- Every skill that produces a report must append the standard disclaimer from `reference/disclaimer.md`.
- Skills must quote exact contract text when flagging issues — never paraphrase in a diff or risk finding.
- Skills must **never** send messages, emails, or drafts on a user's behalf. Output drafts for a human to review and send.
- Keep templates generic and jurisdiction-neutral; flag jurisdiction-specific assumptions.

## Testing your change
Run your skill against the fictional samples in `examples/` and confirm the output file is well-formed and the disclaimer is present. For a routing change, verify `/contract-review` sends representative requests to the right skill.

## Legal note
This project is a productivity tool for legal professionals, not a source of legal advice. Do not contribute real client contracts, privileged material, or proprietary clause language.
