# GHOSTBOARD — Spec: design

> Feature: `ghostboard` · Status: approved for build · Stack: static web, zero backend

## Overview

A single-page static web app that behaves like a 1980s BBS. No framework,
no build step, no backend, no secrets. Three files do the work
(`index.html`, `css/style.css`, `js/app.js`); the page is a terminal that
renders "boards" into one screen and accepts typed commands.

Why static-only:

- Judges open a URL and it works — no server to keep alive during the
  judging period (16 Dec 2026 – 29 Jan 2027).
- GitHub Pages deployment is two clicks after the repo goes public.
- Zero attack surface, zero cost, zero secrets to leak.

## Architecture

```
browser
  └─ index.html        (shell: boot screen, menu, board viewport, command line)
       ├─ css/style.css (CRT theme: phosphor green, pumpkin orange, scanlines)
       └─ js/app.js
            ├─ Boot sequence (skippable)
            ├─ Router: menu number / command → board renderer
            ├─ Boards: market, analysis, plan, news, ticker, about
            ├─ PriceService: fetch api.gold-api.com/price/XAU, 60 s refresh,
            │   fallback to labelled DEMO data on failure
            ├─ Validator: 4-layer entry gate (pure functions over price data)
            └─ PlanBuilder: entry/SL/TP/RR from live price, or WAIT
```

## Components

### Boot sequence
Timed lines (`DIALING…`, `CONNECT 2400`, ANSI ghost art, welcome banner).
Any keypress or click skips to the menu. Total duration ≤ 4 s.

### Board viewport
One `<main>` region. Each board is a render function returning HTML.
Navigation updates the viewport + the breadcrumb line, no reload.

### PriceService
- `GET https://api.gold-api.com/price/XAU` → `{ price, updatedAt }`.
- Timeout 8 s. On error: `DEMO MODE` banner + last-known or seeded demo
  price, clearly labelled. Retry every 60 s regardless.
- No API key. CORS-friendly endpoint (verified 19 Nov 2026 from this VM:
  returned live price $3,734.35).

### Validator (4 layers, adapted from the team's gold-analysis framework)
- **L1 ENTRY GATE:** DXY direction, EMA50 4h trend, 24h move > 2% → REJECT,
  structure HH/LL + BOS/CHoCH/FVG. Any fail → WAIT.
- **L2 Confluence score 0–30:** +points per agreeing factor; < 15 → no trade.
- **L3 Required pattern:** a named pattern must be present (e.g. W/M,
  H&S, FVG tap) or no trade.
- **L4 SL rule:** SL is only "hit" on a 1h candle close; wick pokes don't count.
- Data honesty rule: any layer without data renders UNKNOWN, never invented.

### PlanBuilder
From live price + validator output: entry zone, SL, TP1/TP2, RR (≥ 1:2),
risk note ("not financial advice", timestamp). If validator says WAIT,
output is the watch zone only.

## Data flow

```
gold-api.com ──fetch──▶ PriceService ──▶ state.price
                                        ├─▶ Market Board (render)
                                        ├─▶ Validator ──▶ Analysis Board
                                        └─▶ PlanBuilder ──▶ Trade Plan Board
sample news (dated, labelled) ─────────▶ News Board
```

## Visual design

- Palette: black `#0a0f0a`, phosphor green `#33ff66`, pumpkin `#ff7a1a`,
  ghost purple `#b388ff`, dim grey for secondary text.
- Typography: monospace stack (`"Courier New", ui-monospace, monospace`).
- CRT: subtle scanline overlay + text glow; respects
  `prefers-reduced-motion` (scanlines off, boot instant).
- Layout: max-width 900 px terminal, responsive down to 360 px phones.

## Testing

- Manual checklist in `tasks.md` (boot, each board, offline fallback,
  mobile width, command parser).
- Property-based testing note for the Kiro write-up: price/plan invariants
  (TP > entry > SL for longs; RR ≥ 2; WAIT implies no entry/SL/TP) are
  expressed as pure-function checks runnable in the browser console
  (`Ghostboard.selfTest()`), because a static app has no test runner to
  install. Honest scope: this is a lightweight invariant check, not a
  full PBT suite — the write-up says so.

## Deployment

1. Push repo to public GitHub (IDR).
2. GitHub Pages → deploy from `/` (or `/ghostboard`) — live URL in minutes.
3. That URL goes in the Devpost submission form.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Price API down during judging | Labelled DEMO fallback; every board still renders |
| API CORS change | Fallback path identical; note in README |
| "Insufficient Kiro use" DQ | Full `.kiro/` (specs, steering, hooks, MCP, agent, skill) + honest write-up |
| Video/demo quality | Script + shot list in `SUBMISSION.md`; SBY lane for edit |
