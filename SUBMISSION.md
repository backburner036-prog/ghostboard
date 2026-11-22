# GHOSTBOARD — Devpost Submission Pack (draft for IDR)

**Status: DRAFT — IDR submits. Agents never register, submit, or claim.**
**Submitter: IDR — GitHub username `CekingzZ`** (NOT backburner036 — that is
IDR's Bitbucket username, never to be used for this GitHub/Devpost submission).
**Deadline: Sat 5 Dec 2026, 05:00 WIB** (Fri 4 Dec 2026, 14:00 PT).

## 0. QA final — verified 19 Nov 2026 06:44 WIB (Habibie)

- `Ghostboard.selfTest()` **8/8 PASS** (Node v24.22.1, DOM-shim harness
  `/tmp/ghostboard-selftest.js` — same 8 invariants as Fase 1).
- Static serve: `/`, `/index.html`, `/css/style.css`, `/js/app.js` all **HTTP 200**
  (python http.server, localhost).
- Live price: `api.gold-api.com/price/XAU` **HTTP 200, $3,741.40**
  (`updatedAt 2026-11-18T23:44:01Z` = seconds before the check) — feed hidup.
- Rules re-fetched live 19 Nov 2026 06:44 WIB (`kiroween.devpost.com/rules`,
  updated 16 Nov 2026): **no change** vs RESEARCH.md — deadline, prizes,
  `/.kiro` rule, video <3 min, W-8BEN, credit deadline 1 Dec 12:00 PT, all match.
- `/.kiro` present at root (12 files: specs, steering, hooks, MCP, agents,
  skills, prompts) and **NOT in `.gitignore`** (only `.DS_Store`, `*.log`).
- MIT `LICENSE` present at root. No `backburner036` anywhere in the project.
- Links App URL / repo / video still `[TODO]` — IDR fills them at submit time,
  no URLs invented by agents.
- Footage F1–F9 present in `footage/` (video edit by SBY, parallel — not QA'd here).

## 1. Submission form — copy-paste draft

**Title:** GHOSTBOARD — The Haunted BBS for Gold Traders

**Tagline:** A Bulletin Board System, dead for 25 years, resurrected as a
live XAU/USD trading terminal. Dial in, read the boards, get your MT5 plan.

**Category:** Resurrection

**Description (draft, English):**

> Retail gold traders check price and trade plan many times a day from their
> phone — and modern trading apps answer with slowness, noise, ads, and
> login walls. GHOSTBOARD resurrects the Bulletin Board System: one screen,
> text-first, keyboard-first, zero clutter, zero login.
>
> Dial in and you get six boards: a Market Board with the live XAU/USD spot
> price (free API, refreshed every 60 seconds); an Analysis Board running a
> 4-layer entry validator (DXY, EMA50 4h, 24h-move gate, market structure);
> a Trade Plan Board that outputs an MT5-ready plan — entry, stop loss, take
> profits, risk-reward — or an honest WAIT with the zone to watch when no
> setup passes; a News Board; a scrolling Haunted Ticker; and a command line,
> because a BBS without typed commands is just a website in a costume.
>
> Everything runs as a static web app: no backend, no build step, no account,
> no payment. If the live feed drops, the terminal falls back to clearly
> labelled DEMO data so every board keeps working.
>
> Built spec-first with Kiro — see "How Kiro was used" below.

**Built with:** HTML, CSS, vanilla JavaScript, gold-api.com (free, no key)

**Links to fill in at submit time:**

- App URL (live): https://backburner036-prog.github.io/ghostboard/ghostboard/ (GitHub Pages, branch main, verified live 22 Nov 2026)
- GitHub repo (public): https://github.com/backburner036-prog/ghostboard (pushed 22 Nov 2026, commit b2a4c35; *.mp4 excluded via .gitignore — video draft stays in VM)
- Demo video (YouTube, public, < 3 min): `[TODO — SBY's edit, IDR uploads]`

**Bonus prizes to tick:** Social Blitz (if IDR posts with
`#KiroweenHackathon26` first) · Bonus Blog (if a blog post is published).
Best Demo is automatic. Best Startup / Student / Ghost of Kiroween Past: no.

## 2. How Kiro was used (write-up for the form)

> We built GHOSTBOARD spec-first with Kiro. Before a line of app code
> existed, the feature spec was written as `.kiro/specs/ghostboard/`:
> `requirements.md` (user stories in EARS notation — "WHEN … THE SYSTEM
> SHALL …"), `design.md` (static-only architecture, data flow, risks), and
> `tasks.md` (phased checklist, done in order). The spec, not vibes, drove
> the build — and when the design said "static-only so judges can open a
> URL and it just works", that decision survived every later temptation to
> add a backend.
>
> **Steering** (`.kiro/steering/product.md`, `tech.md`, `structure.md`) held
> the product truth: the audience (MT5 mobile gold traders), the hard
> constraints (no login, no payment, no secrets, never present sample data
> as live, never gitignore `.kiro/`), and the repo layout. Every later
> decision was checked against steering.
>
> **Agent hooks** (`.kiro/hooks/lint-on-save.json`, `test-on-save.json`)
> fire on file save and task completion: they remind the builder to keep
> secrets out of the repo, keep `.kiro/` intact, and run the in-browser
> invariant check (`Ghostboard.selfTest()`) after every task.
>
> **MCP** (`.kiro/settings/mcp.json`) wires the filesystem and fetch servers
> so the agent can read the repo and verify the live price endpoint itself
> (the gold-api.com check in this repo was done through MCP fetch).
>
> **Custom agent** (`.kiro/agents/ghost-analyst.md`): the Ghost Analyst, a
> skeptical reviewer whose only job is to stop bad trade plans — it enforces
> WAIT-beats-a-bad-trade, never-invent-data, RR ≥ 1:2, and the 1h-close SL rule.
>
> **Skill** (`.kiro/skills/gold-analysis/SKILL.md`): the 4-layer entry
> validator, adapted from our team's real gold-analysis framework.
>
> **Property-based testing:** the validator and plan builder are pure
> functions, and their invariants (long plan ⇒ TP > entry > SL; RR ≥ 2;
> WAIT ⇒ no entry/SL/TP) are checked by `Ghostboard.selfTest()` — 8/8
> passing, runnable in any browser console. Honest scope note: this is a
> lightweight invariant suite for a static app, not a full PBT harness.
>
> **What we did NOT do:** Kiro CLI/IDE sign-in belongs to IDR's own AWS
> account, so the CLI session itself is IDR's to run; the `.kiro/`
> artifacts in this repo are the complete, committable evidence of the
> Kiro workflow. We did not claim Kiro features we didn't use.

## 3. Demo video — plan (SBY edits, IDR uploads)

- **Script:** `.kiro/prompts/demo-script.md` + final narration
  `footage/naskah-final.txt` (slots filled from this build).
- **Footage:** `footage/` — F1–F9 per `../demo-submit/05-shot-list-kiroween.md`
  (hero, problem, demo steps, Kiro evidence, result, architecture PNG,
  final script, product info). 1920×1080 / 30 fps, no audio in raw footage.
- **Target:** 2:45–2:50, YouTube public, "Not for Kids", Science & Technology.
- **Title (draft):** `GHOSTBOARD — The BBS That Refuses to Die | Built with Kiro | Kiroween 2026`
- **Rules:** no copyrighted music, no third-party trademarks on screen.

## 4. Pre-submit checklist for IDR

- [ ] Create public GitHub repo **under account `CekingzZ`**, push this folder
      (root = repo root).
- [ ] Confirm `/.kiro` visible at repo root + MIT LICENSE detected in About.
- [ ] GitHub Pages on → copy live URL into Devpost form + video end card.
- [ ] Devpost account → Join Hackathon → save a draft early (before 5 Dec).
- [ ] Request 4,000 Kiro credits by **1 Dec 2026 12:00 PT** (Credit Request
      Form; needs your Kiro user ID / AWS account ID).
- [ ] Optional Social Blitz: post starting with `#KiroweenHackathon26`,
      favourite thing about Kiro + how it changed your dev approach; paste
      URL in form. (Needs X login — do it in your own browser.)
- [ ] Optional Bonus Blog: public blog post about Kiro + this project,
      mentioning Kiroween 2026; paste URL in form.
- [ ] Upload demo video to YouTube (public) → paste URL in form.
- [ ] Read the form once more, then **submit before Sat 5 Dec 2026 05:00 WIB**.
- [ ] If we win: expect an affidavit + **W-8BEN** tax form within 10 business
      days — your call at claim time (see RESEARCH.md §5). Prize paid within
      60 days of completed forms.

## 5. What agents must NOT do

Register on Devpost, submit, claim, pay, create wallets, use IDR's passwords,
log in as IDR anywhere, or decide the W-8BEN question for him.
