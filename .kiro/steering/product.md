---
inclusion: always
---

# Product — GHOSTBOARD

## What it is

GHOSTBOARD is a haunted BBS (Bulletin Board System) resurrected as a live
gold-trading terminal. Category: **Resurrection** (Kiroween 2026).

## Problem

Retail gold traders check price + trade plan many times a day from their
phone. Modern trading apps are slow, noisy, ad-filled, and login-walled.
A BBS is the opposite: one screen, text-first, keyboard-first, zero clutter.

## Users

- Primary: retail XAU/USD traders on MT5 mobile (Indonesia and worldwide).
- Secondary: Kiroween judges (need a working app + clear Kiro-usage story
  in under 3 minutes of video).

## Goals

1. Trader opens the URL and sees live XAU/USD + a plan in under 10 seconds.
2. No login, no install, no payment, no backend to keep alive.
3. Every Kiro feature used in the build is visible in `.kiro/` and honestly
   described in the submission write-up.

## Non-goals

- Not a broker, not a signal seller, not financial advice. Plans are
  rule-based outputs from the live price with a WAIT state when no setup.
- No accounts, no user data stored, no tracking.
- No real-time news feed (curated, dated, labelled samples instead).

## Success criteria

- All 6 boards render; live price loads; DEMO fallback works offline.
- `Ghostboard.selfTest()` invariants pass in the browser console.
- Submission pack complete: README, RESEARCH, SUBMISSION, video script.
