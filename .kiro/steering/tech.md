---
inclusion: always
---

# Tech — GHOSTBOARD

## Stack

- **Static web only:** HTML + CSS + vanilla JS. No framework, no build step,
  no backend, no secrets, no API key.
- **Live data:** `GET https://api.gold-api.com/price/XAU` (free, no key,
  CORS-friendly — verified 19 Nov 2026, returned $3,734.35).
- **Deploy:** any static host; GitHub Pages is the intended target.

## Constraints

- The app MUST work by opening `ghostboard/index.html` or from GitHub Pages.
- The app MUST NOT require login, payment, or any credential.
- The app MUST label demo/sample data as DEMO — never present sample news
  or seeded prices as live.
- The repo MUST contain `.kiro/` at root and MUST NOT list it in `.gitignore`
  (Devpost rule — ignoring it can disqualify the submission).
- All submission materials MUST be in English (Devpost language rule);
  internal working notes may be in Indonesian.

## Conventions

- Monospace UI, semantic HTML, one `<main>` viewport for boards.
- Pure functions for Validator and PlanBuilder so invariants are testable
  (`Ghostboard.selfTest()` in the console).
- Prices in USD, 2 decimals; timestamps in WIB in docs, UTC in the app's
  "last updated" line (source timestamp).

## Kiro tooling used

- Specs (`.kiro/specs/ghostboard/`): requirements → design → tasks.
- Steering (`.kiro/steering/`): this file + product.md + structure.md.
- Hooks (`.kiro/hooks/`): lint-on-save, test-on-save.
- MCP (`.kiro/settings/mcp.json`): filesystem + fetch servers.
- Custom agent (`.kiro/agents/ghost-analyst.md`): gold-analysis reviewer.
- Skill (`.kiro/skills/gold-analysis/SKILL.md`): 4-layer validator rules.
