---
inclusion: always
---

# Structure — GHOSTBOARD

```
kiroween/                          ← project root (this becomes the GitHub repo root)
├── README.md                      ← run guide + submission status
├── RESEARCH.md                    ← rules / prizes / deadlines / cross-check
├── SUBMISSION.md                  ← Devpost pack: draft text, Kiro write-up, video script
├── LICENSE                        ← MIT
├── .gitignore                     ← MUST NOT ignore .kiro/
├── ghostboard/                    ← the app (static)
│   ├── index.html                 ← shell: boot, menu, viewport, command line
│   ├── css/style.css              ← CRT haunted-terminal theme
│   └── js/app.js                  ← boot, router, boards, price, validator, plan, CLI
└── .kiro/                         ← Kiro usage evidence (judges read this)
    ├── steering/                  ← product.md, tech.md, structure.md
    ├── specs/ghostboard/          ← requirements.md, design.md, tasks.md
    ├── hooks/                     ← lint-on-save.json, test-on-save.json
    ├── settings/mcp.json          ← MCP servers
    ├── agents/ghost-analyst.md    ← custom agent
    ├── skills/gold-analysis/      ← SKILL.md
    └── prompts/demo-script.md     ← reusable prompt for the demo video
```

## Naming

- Files kebab-case; JS functions camelCase; board ids `market`, `analysis`,
  `plan`, `news`, `ticker`, `about`.
- No framework directories, no `node_modules`, no build output — the repo
  is the deliverable.
