/* GHOSTBOARD — haunted BBS for gold traders.
 * Static, no backend, no key, no login.
 * Live price: api.gold-api.com/price/XAU (free, no key).
 * Sample/demo data is ALWAYS labelled SAMPLE/DEMO — never passed off as live.
 */
(function () {
  "use strict";

  // Dev/test override: ?priceUrl=http://localhost:PORT/price lets a local
  // relay serve the real API response when the browser has no direct egress.
  // Default is the live public endpoint. Never points at fake data.
  var PRICE_URL = (function () {
    try {
      var u = new URLSearchParams(window.location.search).get("priceUrl");
      if (u && /^https?:\/\//.test(u)) return u;
    } catch (e) { /* ignore */ }
    return "https://api.gold-api.com/price/XAU";
  })();
  var REFRESH_MS = 60000;
  var FETCH_TIMEOUT_MS = 8000;

  /* ------------------------------------------------------------------ */
  /* State                                                               */
  /* ------------------------------------------------------------------ */
  var state = {
    price: null,            // { value, updatedAt, source: 'LIVE' | 'DEMO' }
    sessionOpen: null,      // first live price seen this session
    mode: "live",           // 'live' | 'sample'
    board: "market",
    boos: 0
  };

  /* Dated SAMPLE dataset — demonstrates the full validator + plan.
   * Anchored to the real price fetched on 19 Nov 2026 (~$3,734).
   * Clearly labelled SAMPLE everywhere it appears. */
  var SAMPLE = {
    label: "SAMPLE session · 19 Nov 2026 06:30 WIB",
    price: 3734.35,
    prevClose: 3705.10,
    dxy: { value: 99.82, direction: "falling", agrees: true },
    ema50_4h: { value: 3710.00, position: "above", agrees: true },
    move24hPct: 0.79,
    structure: "HH + BOS up, FVG tap at 3722",
    pattern: "W bottom + FVG tap",
    score: 24
  };

  /* Sample news — illustrative examples, dated, labelled SAMPLE. */
  var SAMPLE_NEWS = [
    { date: "18 Nov 2026", src: "SAMPLE", text: "Fed officials signal patience on rates — traders reprice December odds; gold holds above $3,700." },
    { date: "18 Nov 2026", src: "SAMPLE", text: "DXY slips below 100 as US yields ease; USD-weakness tailwind for XAU/USD." },
    { date: "17 Nov 2026", src: "SAMPLE", text: "Central-bank buying stays firm into year-end, physical demand floor near $3,650." },
    { date: "17 Nov 2026", src: "SAMPLE", text: "US CPI week ahead: high-impact print could swing gold ±1.5% in a session — size accordingly." }
  ];

  /* ------------------------------------------------------------------ */
  /* DOM helpers                                                         */
  /* ------------------------------------------------------------------ */
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmt(n) {
    return Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function wibNow() {
    try {
      return new Date().toLocaleString("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    } catch (e) { return new Date().toLocaleTimeString(); }
  }

  /* ------------------------------------------------------------------ */
  /* Boot sequence                                                       */
  /* ------------------------------------------------------------------ */
  var BOOT_LINES = [
    "GHOSTBOARD BBS  ·  node 13  ·  est. 1989, resurrected 2026",
    "",
    "ATZ",
    "OK",
    "ATDT 555-0134",
    "RING... RING...",
    "CONNECT 2400",
    "",
    "   .-.",
    "  (o o)   BOO!  A wild BBS appears.",
    "   | O \\",
    "    \\   \\",
    "     `~~~'",
    "",
    "Welcome, traveller. The gold never sleeps, and neither do the ghosts.",
    "Type HELP at any time. Press a menu number to read a board.",
    ""
  ];
  var bootDone = false;
  function finishBoot() {
    if (bootDone) return;
    bootDone = true;
    $("boot").classList.add("hidden");
    $("terminal").classList.remove("hidden");
    renderBoard(state.board);
    $("cmd").focus();
  }
  function runBoot() {
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var el = $("boot-text");
    if (reduced) { el.textContent = BOOT_LINES.join("\n"); finishBoot(); return; }
    var i = 0;
    var timer = setInterval(function () {
      if (i >= BOOT_LINES.length) { clearInterval(timer); setTimeout(finishBoot, 400); return; }
      el.textContent += BOOT_LINES[i] + "\n";
      i++;
    }, 130);
    var skip = function () { clearInterval(timer); finishBoot(); };
    document.addEventListener("keydown", skip, { once: true });
    $("boot").addEventListener("click", skip, { once: true });
  }

  /* ------------------------------------------------------------------ */
  /* PriceService                                                        */
  /* ------------------------------------------------------------------ */
  function fetchPrice() {
    var ctrl = ("AbortController" in window) ? new AbortController() : null;
    var timer = null;
    if (ctrl) timer = setTimeout(function () { ctrl.abort(); }, FETCH_TIMEOUT_MS);
    var p = fetch(PRICE_URL, ctrl ? { signal: ctrl.signal } : {})
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (d) {
        if (typeof d.price !== "number") throw new Error("bad payload");
        return { value: d.price, updatedAt: d.updatedAt || new Date().toISOString(), source: "LIVE" };
      });
    return p.then(function (res) { if (timer) clearTimeout(timer); return res; },
      function (err) { if (timer) clearTimeout(timer); throw err; });
  }
  function demoPrice() {
    return { value: 3734.35, updatedAt: "DEMO — 19 Nov 2026 06:30 WIB", source: "DEMO" };
  }
  function refreshPrice() {
    fetchPrice().then(function (res) {
      state.price = res;
      if (state.sessionOpen === null) state.sessionOpen = res.value;
      updateChrome();
      if (state.board === "market" || state.board === "ticker") renderBoard(state.board);
    }).catch(function () {
      if (!state.price) state.price = demoPrice();
      updateChrome();
      if (state.board === "market") renderBoard(state.board);
    });
  }
  function updateChrome() {
    var chip = $("price-chip");
    if (!state.price) { chip.textContent = "XAU/USD — — —"; return; }
    chip.textContent = "XAU/USD $" + fmt(state.price.value) +
      (state.price.source === "LIVE" ? " · LIVE" : " · DEMO");
    var conn = $("conn-status");
    conn.textContent = state.price.source === "LIVE" ? "● CONNECT 2400 · LIVE" : "● CONNECT 2400 · DEMO MODE";
  }

  /* ------------------------------------------------------------------ */
  /* Validator — 4 layers (pure functions, testable)                     */
  /* ------------------------------------------------------------------ */
  /* Input: { dxyAgrees, emaAgrees, move24hPct, structureOk, pattern, score }
   * Missing fields = UNKNOWN. Never invent. */
  function validate(input) {
    var layers = [];
    var gateFail = [];
    if (input.dxyAgrees === true) layers.push({ n: 1, name: "DXY agrees", ok: true });
    else if (input.dxyAgrees === false) { layers.push({ n: 1, name: "DXY agrees", ok: false }); gateFail.push("DXY disagrees"); }
    else layers.push({ n: 1, name: "DXY agrees", ok: null });

    if (input.emaAgrees === true) layers.push({ n: 1, name: "EMA50 4h agrees", ok: true });
    else if (input.emaAgrees === false) { layers.push({ n: 1, name: "EMA50 4h agrees", ok: false }); gateFail.push("EMA50 4h disagrees"); }
    else layers.push({ n: 1, name: "EMA50 4h agrees", ok: null });

    if (typeof input.move24hPct === "number") {
      var ok = Math.abs(input.move24hPct) <= 2;
      layers.push({ n: 1, name: "24h move " + input.move24hPct.toFixed(2) + "% (reject if > 2%)", ok: ok });
      if (!ok) gateFail.push("24h move overextended (" + input.move24hPct.toFixed(2) + "%)");
    } else layers.push({ n: 1, name: "24h move (reject if > 2%)", ok: null });

    if (input.structureOk === true) layers.push({ n: 1, name: "Structure HH/LL + BOS/CHoCH", ok: true });
    else if (input.structureOk === false) { layers.push({ n: 1, name: "Structure HH/LL + BOS/CHoCH", ok: false }); gateFail.push("no confirmed structure"); }
    else layers.push({ n: 1, name: "Structure HH/LL + BOS/CHoCH", ok: null });

    var verdict;
    if (gateFail.length > 0) verdict = "WAIT";
    else if (layers.some(function (l) { return l.ok === null; })) verdict = "WAIT";
    else if (typeof input.score === "number" && input.score < 15) verdict = "WAIT";
    else if (!input.pattern) verdict = "WAIT";
    else verdict = "TRADE";

    return { layers: layers, gateFail: gateFail, score: input.score, pattern: input.pattern, verdict: verdict };
  }

  /* PlanBuilder — pure function. WAIT ⇒ no entry/SL/TP, only a watch zone. */
  function buildPlan(price, validation) {
    if (!validation || validation.verdict !== "TRADE") {
      var zoneTop = price ? price * 1.002 : null;
      var zoneBot = price ? price * 0.998 : null;
      return {
        verdict: "WAIT",
        watchZone: (zoneTop && zoneBot) ? ("$" + fmt(zoneBot) + " – $" + fmt(zoneTop)) : "UNKNOWN (no live price)",
        reason: validation ? validation.gateFail.join("; ") || "incomplete data — layers UNKNOWN" : "no validation run"
      };
    }
    var entry = price;
    var sl = entry - 17;            // sample-derived risk distance, ~0.45%
    var tp1 = entry + 34;           // RR 1:2
    var tp2 = entry + 68;           // RR 1:4
    return {
      verdict: "BUY",
      entry: entry, sl: sl, tp1: tp1, tp2: tp2,
      rr1: ((tp1 - entry) / (entry - sl)).toFixed(1),
      rr2: ((tp2 - entry) / (entry - sl)).toFixed(1),
      note: "SL counts only on a 1h candle CLOSE. Wick pokes through SL do not invalidate the setup."
    };
  }

  /* Inputs for each mode */
  function liveInput() {
    var move = null;
    if (state.price && state.price.source === "LIVE" && state.sessionOpen) {
      move = ((state.price.value - state.sessionOpen) / state.sessionOpen) * 100;
    }
    return { dxyAgrees: null, emaAgrees: null, move24hPct: null, structureOk: null, pattern: null, score: null, sessionMovePct: move };
  }
  function sampleInput() {
    return {
      dxyAgrees: SAMPLE.dxy.agrees, emaAgrees: SAMPLE.ema50_4h.agrees,
      move24hPct: SAMPLE.move24hPct, structureOk: true,
      pattern: SAMPLE.pattern, score: SAMPLE.score
    };
  }

  /* ------------------------------------------------------------------ */
  /* Boards                                                              */
  /* ------------------------------------------------------------------ */
  function badge(source) {
    if (source === "LIVE") return '<span class="badge live">● LIVE</span>';
    if (source === "DEMO") return '<span class="badge demo">● DEMO</span>';
    return '<span class="badge sample">● SAMPLE</span>';
  }
  function modeToggle() {
    return '<div class="mode-toggle" role="group" aria-label="Data mode">' +
      '<button data-mode="live" aria-pressed="' + (state.mode === "live") + '">LIVE price</button>' +
      '<button data-mode="sample" aria-pressed="' + (state.mode === "sample") + '">SAMPLE session 19 Nov 2026</button>' +
      '</div>';
  }
  function boardMarket() {
    var p = state.price;
    if (!p) return "<h2>MARKET BOARD</h2><p>Dialing for the live price…</p>";
    var changeHtml = "";
    if (p.source === "LIVE" && state.sessionOpen && state.sessionOpen !== p.value) {
      var chg = ((p.value - state.sessionOpen) / state.sessionOpen) * 100;
      changeHtml = '<p>Session change: <span class="' + (chg >= 0 ? "up" : "down") + '">' +
        (chg >= 0 ? "▲ +" : "▼ ") + chg.toFixed(2) + '%</span> <span class="dim">(since you dialed in)</span></p>';
    }
    var demoNote = p.source === "DEMO"
      ? '<p class="warn">⚠ DEMO MODE — live feed unreachable. Price below is the last known sample ($3,734.35, 19 Nov 2026). Boards still work; retry happens automatically.</p>'
      : "";
    return "<h2>MARKET BOARD — XAU/USD" + badge(p.source) + "</h2>" + demoNote +
      '<p class="big-price">$' + fmt(p.value) + " <span style=\"font-size:16px\">/ oz</span></p>" +
      changeHtml +
      "<p>Last updated: " + esc(p.updatedAt) + "</p>" +
      "<p class=\"dim\">Source: api.gold-api.com/price/XAU — free, no key. Refreshes every 60 s.</p>" +
      "<h3>Quick read</h3><ul>" +
      "<li>Gold is the fear trade: when DXY falls or real yields ease, XAU usually rises.</li>" +
      "<li>Rule of the house: 24h move &gt; 2% = overextended. Do not chase — see Analysis Board.</li>" +
      "<li>Need a plan? Board [3] — or type <code>plan</code>.</li></ul>";
  }
  function layerRow(l) {
    var mark = l.ok === true ? '<span class="up">✓ PASS</span>'
      : l.ok === false ? '<span class="down">✗ FAIL</span>'
      : '<span class="warn">? UNKNOWN</span>';
    return "<tr><td>Layer 1 — " + esc(l.name) + "</td><td>" + mark + "</td></tr>";
  }
  function boardAnalysis() {
    var input = state.mode === "sample" ? sampleInput() : liveInput();
    var v = validate(input);
    var src = state.mode === "sample" ? "SAMPLE" : (state.price ? state.price.source : "LIVE");
    var rows = v.layers.map(layerRow).join("");
    var extra = "";
    if (state.mode === "sample") {
      extra = "<tr><td>Layer 2 — Confluence score</td><td><span class=\"up\">" + SAMPLE.score + " / 30</span> (min 15 to trade)</td></tr>" +
        "<tr><td>Layer 3 — Required pattern</td><td>" + esc(SAMPLE.pattern) + "</td></tr>" +
        "<tr><td>Layer 4 — SL rule</td><td>SL counts only on 1h candle CLOSE</td></tr>" +
        "<tr><td>DXY</td><td>" + SAMPLE.dxy.value + ", falling — agrees with long</td></tr>" +
        "<tr><td>EMA50 4h</td><td>$" + fmt(SAMPLE.ema50_4h.value) + " — price above</td></tr>" +
        "<tr><td>Structure</td><td>" + esc(SAMPLE.structure) + "</td></tr>";
    } else {
      extra = "<tr><td>Layer 2 — Confluence score</td><td><span class=\"warn\">? UNKNOWN</span> (needs full session data)</td></tr>" +
        "<tr><td>Layer 3 — Required pattern</td><td><span class=\"warn\">? UNKNOWN</span></td></tr>" +
        "<tr><td>Layer 4 — SL rule</td><td>SL counts only on 1h candle CLOSE</td></tr>";
      if (typeof input.sessionMovePct === "number") {
        extra += "<tr><td>Session move (since dial-in)</td><td>" + input.sessionMovePct.toFixed(2) + "%</td></tr>";
      }
    }
    var verdictHtml = v.verdict === "TRADE"
      ? '<div class="plan-box"><b class="up">✓ VERDICT: TRADE — setup valid.</b><br>See the Trade Plan Board for entry / SL / TP.</div>'
      : '<div class="wait-box"><b class="warn">⏸ VERDICT: WAIT.</b><br>' +
        (v.gateFail.length ? "Gate failed: " + esc(v.gateFail.join("; ")) + ".<br>" : "Not enough confirmed data to trade — layers UNKNOWN are not guesses.<br>") +
        "Watch zone on the Trade Plan Board. No entry, no SL, no TP until the gate passes.</div>";
    return "<h2>ANALYSIS BOARD — 4-LAYER ENTRY VALIDATOR" + badge(src) + "</h2>" +
      modeToggle() +
      (state.mode === "sample"
        ? "<p class=\"dim\">" + esc(SAMPLE.label) + " — full worked example so judges can see every layer pass.</p>"
        : "<p class=\"dim\">LIVE mode runs the validator on the real price only. Anything it cannot verify is UNKNOWN — never invented.</p>") +
      "<table>" + rows + extra + "</table>" + verdictHtml;
  }
  function boardPlan() {
    var price = state.mode === "sample" ? SAMPLE.price : (state.price ? state.price.value : null);
    var input = state.mode === "sample" ? sampleInput() : liveInput();
    var v = validate(input);
    var plan = buildPlan(price, v);
    var src = state.mode === "sample" ? "SAMPLE" : (state.price ? state.price.source : "LIVE");
    var head = "<h2>TRADE PLAN BOARD — MT5-READY" + badge(src) + "</h2>" + modeToggle();
    if (plan.verdict === "WAIT") {
      return head +
        '<div class="wait-box"><b class="warn">⏸ WAIT — no valid setup right now.</b><br>' +
        "Reason: " + esc(plan.reason) + ".<br>" +
        "Watch zone: <b>" + esc(plan.watchZone) + "</b><br>" +
        "No entry. No SL. No TP. Waiting is a position.</div>" +
        "<p class=\"dim\">A plan appears here only when all 4 validator layers pass. " +
        "To see a complete worked plan, switch to SAMPLE session 19 Nov 2026 above.</p>" +
        "<p class=\"dim\">Generated " + esc(wibNow()) + " WIB · Not financial advice.</p>";
    }
    return head +
      '<div class="plan-box">' +
      "<b class=\"up\">▲ BUY XAU/USD — " + esc(SAMPLE.label) + "</b><br>" +
      "<table>" +
      "<tr><th>Entry</th><td>$" + fmt(plan.entry) + "</td></tr>" +
      "<tr><th>Stop loss</th><td>$" + fmt(plan.sl) + " <span class=\"dim\">(1h close rule)</span></td></tr>" +
      "<tr><th>Take profit 1</th><td>$" + fmt(plan.tp1) + " — RR 1:" + plan.rr1 + "</td></tr>" +
      "<tr><th>Take profit 2</th><td>$" + fmt(plan.tp2) + " — RR 1:" + plan.rr2 + "</td></tr>" +
      "<tr><th>Risk</th><td>$" + fmt(plan.entry - plan.sl) + " / oz · move SL to breakeven at TP1</td></tr>" +
      "</table>" +
      "<p>" + esc(plan.note) + "</p></div>" +
      "<p class=\"dim\">Type this into MT5 as a limit order. Generated " + esc(wibNow()) + " WIB · Not financial advice.</p>";
  }
  function boardNews() {
    var items = SAMPLE_NEWS.map(function (n) {
      return "<li><b>" + esc(n.date) + "</b> — " + esc(n.text) + " <span class=\"badge sample\">SAMPLE</span></li>";
    }).join("");
    return "<h2>NEWS BOARD — WHAT MOVES GOLD" + badge("SAMPLE") + "</h2>" +
      "<p class=\"dim\">Headlines below are SAMPLE items (dated 17–18 Nov 2026) showing the format. " +
      "Live news wiring is a post-MVP step — this board never presents samples as live news.</p>" +
      "<ul>" + items + "</ul>" +
      "<h3>Read live, for free</h3><ul>" +
      "<li><a href=\"https://www.kitco.com/\" target=\"_blank\" rel=\"noopener\">Kitco — gold news &amp; prices</a></li>" +
      "<li><a href=\"https://www.reuters.com/markets/commodities/\" target=\"_blank\" rel=\"noopener\">Reuters — commodities</a></li>" +
      "<li><a href=\"https://www.forexfactory.com/calendar\" target=\"_blank\" rel=\"noopener\">ForexFactory — economic calendar (CPI, Fed, NFP)</a></li>" +
      "</ul>";
  }
  function boardTicker() {
    var p = state.price;
    var priceTxt = p ? "$" + fmt(p.value) : "$—.——";
    var tape = "☠ XAU/USD " + priceTxt + " " +
      "☠ DXY 99.82 ▼ (SAMPLE) " +
      "☠ BTC $91,240 (SAMPLE) " +
      "☠ FEAR &amp; GREED: 41 FEAR (SAMPLE) " +
      "☠ GOLD: the dead rise again — BBS lives! " +
      "☠ 24H MOVE &gt; 2% = DO NOT CHASE " +
      "☠ SL ONLY ON 1H CLOSE ";
    return "<h2>HAUNTED TICKER" + badge(p ? p.source : "LIVE") + "</h2>" +
      '<p class="ticker-tape"><span>' + tape + "</span></p>" +
      "<p class=\"dim\">Live price is real; DXY / BTC / sentiment figures are SAMPLE placeholders until wired to free feeds.</p>";
  }
  function boardAbout() {
    return "<h2>ABOUT — WHAT IS THIS HAUNTED THING?</h2>" +
      "<p><b>GHOSTBOARD</b> resurrects the Bulletin Board System — the dial-up " +
      "community terminal of the 1980s–90s, dead for 25 years — as a live " +
      "gold-trading terminal for XAU/USD traders.</p>" +
      "<h3>How to use it</h3><ul>" +
      "<li>Press <b>1–6</b> or click a menu item to open a board.</li>" +
      "<li>Type commands below: <code>price</code>, <code>plan</code>, <code>news</code>, <code>boards</code>, <code>help</code>.</li>" +
      "<li>Market Board = live price. Analysis Board = should I trade? Plan Board = the MT5 order.</li>" +
      "</ul>" +
      "<h3>Why a BBS?</h3>" +
      "<p>Modern trading apps are slow, noisy, ad-filled and login-walled. A BBS is " +
      "the opposite: one screen, text-first, keyboard-first, zero clutter — and it " +
      "works on any phone. The dead tech was right; it was just early.</p>" +
      "<h3>Built with Kiro</h3>" +
      "<p>Spec-first: requirements → design → tasks in <code>.kiro/specs/ghostboard/</code>. " +
      "Steering docs, agent hooks, MCP servers, a custom agent (Ghost Analyst) and a " +
      "gold-analysis skill live in <code>.kiro/</code> at the repo root. " +
      "Kiroween 2026 · Resurrection category · MIT license.</p>" +
      "<p class=\"dim\">No account. No payment. No data collected. Not financial advice.</p>";
  }

  var BOARDS = {
    market: boardMarket, analysis: boardAnalysis, plan: boardPlan,
    news: boardNews, ticker: boardTicker, about: boardAbout
  };
  var BOARD_NAMES = { market: "MARKET", analysis: "ANALYSIS", plan: "TRADE PLAN", news: "NEWS", ticker: "TICKER", about: "ABOUT" };

  function renderBoard(name) {
    state.board = name;
    $("board").innerHTML = BOARDS[name]();
    document.querySelectorAll(".menu-list button").forEach(function (b) {
      b.style.outline = (b.dataset.board === name) ? "1px solid var(--pumpkin)" : "none";
    });
    document.querySelectorAll("[data-mode]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.mode = b.dataset.mode;
        renderBoard(state.board);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Command line                                                        */
  /* ------------------------------------------------------------------ */
  function printToBoard(html) { $("board").innerHTML = html; }
  function handleCommand(raw) {
    var cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    var go = function (name) { renderBoard(name); };
    switch (cmd) {
      case "help": case "?":
        printToBoard("<h2>HELP — COMMANDS</h2><table>" +
          "<tr><td><code>1–6</code></td><td>open a board (or click the menu)</td></tr>" +
          "<tr><td><code>price</code> / <code>market</code></td><td>Market Board — live XAU/USD</td></tr>" +
          "<tr><td><code>analysis</code></td><td>Analysis Board — 4-layer validator</td></tr>" +
          "<tr><td><code>plan</code></td><td>Trade Plan Board — MT5-ready plan or WAIT</td></tr>" +
          "<tr><td><code>news</code></td><td>News Board</td></tr>" +
          "<tr><td><code>boards</code> / <code>menu</code></td><td>list all boards</td></tr>" +
          "<tr><td><code>live</code> / <code>sample</code></td><td>switch data mode</td></tr>" +
          "<tr><td><code>clear</code></td><td>back to the Market Board</td></tr>" +
          "<tr><td><code>boo</code></td><td>👻</td></tr>" +
          "</table>");
        break;
      case "1": go("market"); break;
      case "2": go("analysis"); break;
      case "3": go("plan"); break;
      case "4": go("news"); break;
      case "5": go("ticker"); break;
      case "6": go("about"); break;
      case "price": case "market": go("market"); break;
      case "analysis": go("analysis"); break;
      case "plan": go("plan"); break;
      case "news": go("news"); break;
      case "ticker": go("ticker"); break;
      case "about": case "boards": case "menu": go("about"); break;
      case "live": state.mode = "live"; renderBoard(state.board); break;
      case "sample": state.mode = "sample"; renderBoard(state.board); break;
      case "clear": go("market"); break;
      case "boo":
        state.boos++;
        printToBoard("<h2>👻 BOO!</h2><p>The ghost appreciates your courage. " +
          "You have been boo'd " + state.boos + " time" + (state.boos > 1 ? "s" : "") + ".</p>" +
          "<pre class=\"ascii\">   .-.\n  (o o)\n   | O \\\n    \\   \\\n     `~~~'</pre>");
        break;
      default:
        printToBoard("<h2>UNKNOWN COMMAND</h2><p>The BBS spirits do not know <code>" +
          esc(raw.trim()) + "</code>. Type <code>help</code> for the command list.</p>");
    }
  }

  /* ------------------------------------------------------------------ */
  /* Self-test — invariants, runnable in the browser console             */
  /* ------------------------------------------------------------------ */
  function selfTest() {
    var results = [];
    function check(name, cond) { results.push({ name: name, pass: !!cond }); }
    var vPass = validate({ dxyAgrees: true, emaAgrees: true, move24hPct: 0.8, structureOk: true, pattern: "W", score: 24 });
    check("validator passes a clean setup", vPass.verdict === "TRADE");
    var vFail = validate({ dxyAgrees: false, emaAgrees: true, move24hPct: 0.8, structureOk: true, pattern: "W", score: 24 });
    check("validator WAITs when DXY disagrees", vFail.verdict === "WAIT");
    var vBig = validate({ dxyAgrees: true, emaAgrees: true, move24hPct: 2.5, structureOk: true, pattern: "W", score: 24 });
    check("validator rejects 24h move > 2%", vBig.verdict === "WAIT");
    var vUnknown = validate({ dxyAgrees: null, emaAgrees: null, move24hPct: null, structureOk: null, pattern: null, score: null });
    check("validator WAITs on all-UNKNOWN input", vUnknown.verdict === "WAIT");
    var p = buildPlan(3734.35, vPass);
    check("long plan: TP > entry > SL", p.tp1 > p.entry && p.entry > p.sl);
    check("long plan: RR1 >= 2", parseFloat(p.rr1) >= 2);
    var w = buildPlan(3734.35, vFail);
    check("WAIT plan has no entry/SL/TP", w.verdict === "WAIT" && !("entry" in w) && !("sl" in w) && !("tp1" in w));
    check("WAIT plan has a watch zone", typeof w.watchZone === "string" && w.watchZone.length > 0);
    var passed = results.filter(function (r) { return r.pass; }).length;
    // eslint-disable-next-line no-console
    console.log("GHOSTBOARD selfTest: " + passed + "/" + results.length + " passed", results);
    return { passed: passed, total: results.length, results: results };
  }

  /* ------------------------------------------------------------------ */
  /* Wire up + go                                                        */
  /* ------------------------------------------------------------------ */
  window.Ghostboard = { selfTest: selfTest, validate: validate, buildPlan: buildPlan };

  document.querySelectorAll(".menu-list button").forEach(function (b) {
    b.addEventListener("click", function () { renderBoard(b.dataset.board); $("cmd").focus(); });
  });
  $("cmd").addEventListener("keydown", function (e) {
    if (e.key === "Enter") { handleCommand(e.target.value); e.target.value = ""; }
  });
  document.addEventListener("keydown", function (e) {
    if (document.activeElement === $("cmd")) return;
    if (/^[1-6]$/.test(e.key)) {
      renderBoard(["market", "analysis", "plan", "news", "ticker", "about"][Number(e.key) - 1]);
    }
  });
  setInterval(function () { $("clock").textContent = wibNow() + " WIB"; }, 1000);
  $("clock").textContent = wibNow() + " WIB";

  refreshPrice();
  setInterval(refreshPrice, REFRESH_MS);
  runBoot();
})();
