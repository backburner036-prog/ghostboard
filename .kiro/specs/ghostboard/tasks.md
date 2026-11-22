# GHOSTBOARD — Spec: tasks

> Implementation plan. Check off as done. Status 19 Nov 2026 ~06:30 WIB.

## Phase 1 — Scaffold (done this session)

- [x] 1. Create repo layout: `ghostboard/`, `.kiro/`, docs
- [x] 2. Write spec: `requirements.md`, `design.md`, `tasks.md` (this file)
- [x] 3. Write steering: `product.md`, `tech.md`, `structure.md`
- [x] 4. Write hooks: `lint-on-save.json`, `test-on-save.json`
- [x] 5. Write MCP config: `settings/mcp.json` (filesystem + fetch)
- [x] 6. Write custom agent: `agents/ghost-analyst.md`
- [x] 7. Write skill: `skills/gold-analysis/SKILL.md`
- [x] 8. Add MIT LICENSE + `.gitignore` (must NOT ignore `.kiro/`)

## Phase 2 — App MVP (done this session)

- [x] 9. `ghostboard/index.html` — shell, boot screen, menu, viewport, CLI
- [x] 10. `ghostboard/css/style.css` — CRT haunted-terminal theme, responsive
- [x] 11. `ghostboard/js/app.js` — boot, router, boards, PriceService,
         Validator (4 layers), PlanBuilder, command parser, selfTest()
- [x] 12. Live price verified against `api.gold-api.com/price/XAU`
         (returned $3,734.35 on 19 Nov 2026); DEMO fallback labelled
- [x] 13. Manual test checklist run in headless check (see § Testing)

## Phase 3 — Submission pack (done this session)

- [x] 14. `README.md` — run instructions + submission status checklist
- [x] 15. `RESEARCH.md` — rules, prizes, deadlines, cross-check, tax note
- [x] 16. `SUBMISSION.md` — Devpost draft text, Kiro write-up, video script,
         Social Blitz + blog bonus drafts
- [x] 17. Ledger entry `done` in `mission-control/data/tasks.jsonl`

## Phase 3b — Footage demo untuk SBY (done 19 Nov 2026 ~06:55 WIB)

- [x] 17b. Footage F1–F9 di `footage/` (1920×1080, 30 fps, tanpa audio):
      01-hero (18 dtk, harga LIVE $3,741.25), 02-masalah (15 dtk, ilustrasi
      staged berlabel), 03-langkah1 (20 dtk), 04-langkah2 (25 dtk),
      05-kiro-bukti (25,6 dtk, rekaman terminal Xvfb asli),
      06-hasil (16 dtk, plan ditahan ≥8 dtk), 07-arsitektur.png,
      naskah-final.txt (392 kata, semua slot terisi),
      info-produk.txt + README-footage.md + takes-alt/ (16 frame mentah)
- [x] 17c. Verifikasi: semua mp4 1920×1080 30fps; frame F3 dicek visual;
      naskah dihitung ulang per segmen (31/59/185/63/54 = 392 kata);
      tidak ada key/password/data pribadi di frame mana pun.
- [ ] 17d. SBY: edit video final 2:45–2:50 dari footage ini (draft v1
      malam yang sama, final ke IDR 4 Des). End-card URL diisi setelah
      GitHub Pages hidup — JANGAN pakai localhost:8931 di video.

## Phase 4 — Needs IDR / human (NOT done by agents)

- [ ] 18. IDR: create public GitHub repo, push this folder
- [ ] 19. IDR: enable GitHub Pages → live URL for Devpost form
- [ ] 20. IDR: request 4,000 Kiro credits by 1 Dec 2026 12:00 PT
         (Credit Request Form; needs Kiro user ID / AWS account ID)
- [ ] 21. IDR: Devpost account → Join Hackathon → draft submission early
- [ ] 22. SBY lane: record + edit demo video < 3 min → YouTube public
- [ ] 23. IDR: submit on Devpost before Sat 5 Dec 2026 05:00 WIB
- [ ] 24. Optional: Social Blitz post + blog post (bonus prizes)
- [ ] 25. Optional: Kiro Crew app spin-off (Best Kiro Crew App $1,000)

## Testing (manual checklist — run before submit)

- [ ] Boot sequence plays and skips on keypress
- [ ] Menu numbers 1–6 open the right boards; `menu` returns
- [ ] Live price loads; shows updated time; refreshes ~60 s
- [ ] Offline (block API): DEMO MODE banner appears, boards still render
- [ ] Analysis Board: WAIT state shows watch zone and NO entry/SL/TP
- [ ] Plan Board: long plan has TP > entry > SL and RR ≥ 2
- [ ] Commands: `help`, `price`, `plan`, `boards`, `news`, `clear`, `boo`
- [ ] `Ghostboard.selfTest()` in console: all invariants pass
- [ ] Mobile 360 px: menu tappable, no horizontal overflow
- [ ] `prefers-reduced-motion`: boot instant, no scanline animation
