# GHOSTBOARD — Spec: requirements

> Spec-driven development, Kiro style. Written first, approved, then built.
> Feature: `ghostboard` · Category: Resurrection · Hackathon: Kiroween 2026

## Introduction

GHOSTBOARD resurrects the Bulletin Board System (BBS) as a live gold-trading
terminal. A BBS is dead technology: dial-up, text menus, one screen at a
time. The resurrection: keep the soul (fast, keyboard-first, zero clutter,
works on any phone) and replace the corpse (phone lines, ANSI modems) with a
modern static web app fed by a free live gold-price API.

Audience: retail XAU/USD traders who check price + trade plan many times a
day from their phone (e.g. MT5 mobile traders in Indonesia).

## Requirements

### Requirement 1 — Dial-in experience

**User Story:** As a trader, I want to feel like I am dialing into a BBS,
so that the resurrection theme is real, not a skin.

#### Acceptance Criteria

1. WHEN the app loads THEN the system SHALL show a short boot/dial sequence
   (CONNECT, ANSI art, welcome banner) that can be skipped with any key.
2. WHEN the boot finishes THEN the system SHALL show the main BBS menu.
3. WHEN the user presses a menu number or types a command THEN the system
   SHALL navigate without a page reload.

### Requirement 2 — Live gold price (no key, no login)

**User Story:** As a trader, I want the real XAU/USD spot price, so that the
terminal is actually useful, not a mockup.

#### Acceptance Criteria

1. WHEN the Market Board opens THEN the system SHALL fetch the live spot
   price from `https://api.gold-api.com/price/XAU` (free, no API key).
2. WHEN the fetch succeeds THEN the system SHALL display price, 24h change
   (if provided), and last-updated time.
3. WHEN the fetch fails THEN the system SHALL fall back to clearly-labelled
   DEMO data and SHALL retry on the next refresh.
4. WHEN 60 seconds pass THEN the system SHALL refresh the price automatically.

### Requirement 3 — Analysis Board (4-layer validator)

**User Story:** As a trader, I want a structured read on whether today is a
day to trade, so that I do not chase noise.

#### Acceptance Criteria

1. WHEN the Analysis Board opens THEN the system SHALL show four layers:
   Layer 1 ENTRY GATE (DXY direction, EMA50 4h, 24h move > 2% = reject,
   market structure HH/LL + BOS/CHoCH), Layer 2 confluence score 0–30,
   Layer 3 required pattern, Layer 4 SL rule (SL only hit on 1h candle close).
2. WHEN Layer 1 fails THEN the system SHALL show WAIT plus the entry zone
   being watched, and SHALL NOT show an entry, SL, or TP.
3. WHEN data for a layer is unavailable THEN the system SHALL label that
   layer UNKNOWN instead of inventing a value.

### Requirement 4 — Trade Plan Board (MT5-ready)

**User Story:** As an MT5 mobile trader, I want a plan I can type into MT5
in 30 seconds, so that analysis turns into action.

#### Acceptance Criteria

1. WHEN a valid setup exists THEN the system SHALL show entry, SL, TP,
   risk-reward (minimum 1:2), and position-size guidance.
2. WHEN no valid setup exists THEN the system SHALL show WAIT and the zone
   to watch, with no entry/SL/TP.
3. WHEN the plan is shown THEN the system SHALL state the plan timestamp
   and that it is not financial advice.

### Requirement 5 — News Board

**User Story:** As a trader, I want the headlines that can move gold, so
that I am not blindsided by news.

#### Acceptance Criteria

1. WHEN the News Board opens THEN the system SHALL list dated headlines
   with source names.
2. WHEN a headline is a sample/curated item THEN the system SHALL label it
   as such with its date; the system SHALL NOT present sample news as live.

### Requirement 6 — Command line + keyboard-first navigation

**User Story:** As a BBS user, I want to type commands, so that the terminal
feels like a terminal.

#### Acceptance Criteria

1. WHEN the user types `help` THEN the system SHALL list all commands.
2. WHEN the user types a board command (`price`, `plan`, `boards`, `news`)
   THEN the system SHALL open that board.
3. WHEN the user types an unknown command THEN the system SHALL show a
   friendly error and suggest `help`.

### Requirement 7 — Spooky design (Costume Contest spirit, Resurrection body)

**User Story:** As a judge, I want the Halloween theme to enhance the app,
not decorate it.

#### Acceptance Criteria

1. WHEN the app renders THEN the system SHALL use a coherent haunted-terminal
   visual language (phosphor green, pumpkin orange, CRT scanlines, ASCII art).
2. WHEN viewed on a phone THEN the system SHALL remain fully usable
   (responsive layout, tappable menu).

### Requirement 8 — Zero-backend deployability

**User Story:** As the submitter, I want judges to open a URL and see the
app working, so that testing never depends on my machine.

#### Acceptance Criteria

1. WHEN deployed to any static host (e.g. GitHub Pages) THEN the system
   SHALL work with no server, no build step, and no secrets.
2. WHEN the repo is cloned THEN the system SHALL run by opening
   `ghostboard/index.html` or serving the folder statically.
