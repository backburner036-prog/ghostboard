# GHOSTBOARD — Research Notes (Kiroween 2026)

**Checked live:** Thu 19 Nov 2026, 06:18–06:30 WIB · **Sources:** kiroween.devpost.com
(main page + Official Rules) + kiro.dev docs (via search) + live API test.
**Cross-check:** main page vs Official Rules agree on prizes, deadline,
eligibility, judging. (Second researcher cross-check in
`~/workspace/cari-cuan/makefun-like-bounties.md` §1 — same numbers.)

## 1. Event

- **Kiroween 2026** — Kiro's annual Halloween-themed hackathon (sponsor: AWS).
  Devpost: https://kiroween.devpost.com/
- **Prizes: $100,000+ cash.** 1st $30,000 · 2nd $20,000 · 3rd $10,000 ·
  Best Resurrection / Frankenstein / Skeleton Crew / Costume Contest $5,000
  each · Best Startup $10,000 · Best Ghost of Kiroween Past $2,000 ·
  Best Kiro Crew App $1,000 · Best Student (per category) $1,500 + 1-year
  Kiro Pro Max · Best Demo $1,000 · Bonus Blog: 2,000 Kiro credits × 100
  winners · Social Blitz: 3-month Kiro Pro+ × 5 winners.
- **Deadline: Fri 4 Dec 2026, 14:00 PT = Sat 5 Dec 2026, 05:00 WIB**
  (verified with `date`: PT→WIB conversion). No extensions.
- **Submission period:** 30 Oct – 4 Dec 2026. **New projects only** —
  built during the period; pre-30-Oct work (incl. Kiroween 2025) ineligible.
- **Judging:** 16 Dec 2026 – 29 Jan 2027. **Winners announced ~3 Feb 2027.**
- **Team:** max 3 members. One Representative submits for the team.
- **Participants:** ~16,285 registered (per research file, 19 Nov 2026).
  Most crowded Devpost event in the set — but 20+ prize slots.

## 2. What to build

A working software application that **uses Kiro (IDE, CLI, Web, and/or
Kiro Crew)** in one category:

| Category | Brief | Our pick |
|---|---|---|
| **Resurrection** | Bring dead tech back to life | ✅ **GHOSTBOARD — the BBS, resurrected as a gold-trading terminal** |
| Frankenstein | Stitch incompatible tech into one app | — |
| Skeleton Crew | Lean code template + 2 distinct apps from it | — |
| Costume Contest | Any app, haunting polished UI | — (our spooky UI serves Resurrection instead) |

Why Resurrection fits: the BBS is unambiguously dead tech (dial-up, 1980s–90s);
the resurrection is real (same soul — fast, keyboard-first, zero clutter —
new body: static web app + live gold API). It also matches IDR's real life:
he trades XAU/USD on MT5 from his phone, and the team already runs a
4-hour gold analysis pipeline for him.

## 3. Submission requirements (from Official Rules)

- [ ] Public **GitHub** repo (NOT GitLab/Bitbucket) with all source + assets
      + instructions, open-source **license** file (detectable, top of repo).
- [ ] **`/.kiro` directory at repo root** — specs, hooks, steering.
      Do NOT add it to `.gitignore` (can disqualify).
- [ ] **Working app URL** (free for judges to test until judging ends).
      Login credentials, if any, go in the Devpost form (judges only).
- [ ] **Text description** of features/functionality.
- [ ] **Demo video < 3 min**, YouTube public, shows the project working on
      its target device, no third-party trademarks / copyrighted music.
- [ ] **Write-up: how Kiro was used** (IDE/CLI/Web/Crew? custom agents?
      hooks? specs? steering? MCP? property-based testing? Kiro powers?).
- [ ] Category + bonus prizes selected in the form.
- [ ] All materials in **English** (or with English translation).
- [ ] Bonus: Best Startup (founder + LinkedIn + startup site) — not us.
      Best Student — not us. Social Blitz — post starting with
      `#KiroweenHackathon26` during the period + link in form. Bonus Blog —
      public blog post mentioning Kiroween 2026 + link in form.
      Best Kiro Crew App — separate Crew repo (optional spin-off).
- [ ] Multiple submissions allowed if substantially different.

## 4. Judging criteria (Stage 2, equally weighted, 20% each)

1. **Potential Impact** — real problem, real audience, would someone use it?
2. **Technological Implementation** — how thoroughly/skillfully Kiro was used;
   variety of Kiro tools, deep understanding, experimentation.
3. **Design** — complete, coherent, polished product experience.
4. **Innovation/Idea** — creative/novel concept, unusual tech/resources combined.
5. **Presentation** — video shows it working end-to-end; pitch clear.

Stage 1 is pass/fail: fits the theme + reasonably applies Kiro.
Best Demo = highest Presentation score among top 10% overall.

## 5. Eligibility, tax, and the IDR decision (read before claiming)

- **Indonesia is NOT on the excluded list.** Excluded: Quebec, Argentina,
  Brazil, Italy, Philippines, Russia, Cuba, Iran, North Korea, Syria,
  Belarus, Crimea, DNR, LNR, UAE + US-sanctioned countries. IDR (Indonesia)
  is eligible. (Rules §3, checked live 19 Nov 2026.)
- **No purchase necessary. Entry is free.**
- **Kiro credits:** registered entrants can request a one-time **4,000 Kiro
  credits** via the Credit Request Form — request by **Tue 1 Dec 2026,
  12:00 PT**, redeem by 4 Dec 2026, credits expire 31 Dec 2026. Needs
  IDR's Kiro user ID / AWS account ID. (Rules §4.)
- **If we win:** prize is subject to verification of identity + a winner
  affidavit + tax forms, due **within 10 business days** of receipt.
  Non-US residents **may be required to complete IRS form W-8BEN**; the
  sponsor may withhold part of the prize for US tax compliance. Prizes are
  paid within 60 days of completed forms. Winners also handle taxes in
  their own jurisdiction (Indonesia) + transfer fees. Failure to return
  forms = forfeiture. (Rules §8.)
  → **This is a decision for IDR at claim time, not now.** Not KYC
  (no KTP/selfie in the rules); it is a tax form + affidavit to AWS/Devpost.
- **Regional restrictions on Kiro:** features/models may vary by region;
  entrants are responsible for complying (Rules §4). Our project does not
  depend on region-locked Kiro features — the app itself runs anywhere.

## 6. What is Kiro? (skill/tooling needed)

Kiro is AWS's agentic coding service: one agent harness behind the Kiro IDE
(VS Code-based), Kiro CLI, Web, and Kiro Crew. Core concepts:

- **Specs** — `requirements.md` → `design.md` → `tasks.md` per feature in
  `.kiro/specs/<feature>/`. EARS notation ("WHEN … THE SYSTEM SHALL …").
- **Steering** — persistent rules in `.kiro/steering/*.md`
  (`product.md`, `tech.md`, `structure.md`); AGENTS.md also read.
- **Agent hooks** — JSON in `.kiro/hooks/`; triggers include file save,
  pre/post tool use, prompt submit, task execution.
- **MCP** — `.kiro/settings/mcp.json` (`mcpServers`); workspace wins.
- **Skills** — `.kiro/skills/<name>/SKILL.md` (Agent Skills standard).
- **Custom agents** — `.kiro/agents/*.md` (persona, tools, permissions).
- **Powers** — installable bundles of MCP + skills + steering.
- Kiro CLI install: `cli.kiro.dev` (installer returned 403 from this VM on
  19 Nov 2026 — install path needs checking on IDR's machine; sign-in uses
  IDR's own AWS Builder ID, never by agents).

## 7. Live verification done this session

- `api.gold-api.com/price/XAU` (free, no key): returned
  `{"price": 3734.35, "symbol": "XAU", ...}` on 19 Nov 2026 06:19 WIB.
  `api.metals.live` unreachable from this VM; `goldprice.org` = 403.
  → gold-api.com is the app's live source; DEMO fallback seeded at $3,734.35.
- Devpost main page + Rules page fetched live 19 Nov 2026 ~06:20 WIB;
  all numbers above copied from those pages, not from memory.

## 8. Sources

- https://kiroween.devpost.com/ (main page)
- https://kiroween.devpost.com/rules (Official Rules, updated 16 Nov 2026)
- https://kiro.dev/docs (Kiro docs — via web search, kiro.dev/docs/*)
- https://api.gold-api.com/price/XAU (live price test)
- `~/workspace/cari-cuan/makefun-like-bounties.md` (team cross-check)
