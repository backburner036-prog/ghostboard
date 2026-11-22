---
name: gold-analysis
description: 4-layer entry validator for XAU/USD adapted from the team's gold-analysis framework. Use when writing or reviewing any analysis or trade plan in GHOSTBOARD.
---

# Gold Analysis Skill

## The 4-layer validator

### Layer 1 — ENTRY GATE (all must pass, else WAIT)

- DXY direction must agree with the trade direction.
- Price relative to EMA50 on the 4h chart must agree.
- 24h move > 2% → REJECT (overextended, do not chase).
- Structure must show HH/LL + BOS/CHoCH, or FVG / W-M / H&S pattern.

### Layer 2 — Confluence score 0–30

+5 per agreeing factor (trend, structure, DXY, session, level touch).
Score < 15 → no trade.

### Layer 3 — Required pattern

A named pattern must be present (W, M, H&S, FVG tap, BOS retest).
No pattern → no trade.

### Layer 4 — SL rule

SL is only "hit" on a 1h candle close. Wick pokes through SL do not
invalidate the setup. State this in every plan.

## Output rules

- If Layer 1 fails → output WAIT + the entry zone being watched. No
  entry/SL/TP.
- Minimum RR 1:2 on every plan.
- Every claim about the chart carries a price or a percentage.
- S/R levels = the two prices with the most touches + touch count.
- Never invent a level. If unknown, say UNKNOWN.
- Every plan ends with: timestamp + "Not financial advice."
