# GHOSTBOARD — QA Final Report

**Proyek:** GHOSTBOARD — Kiroween 2026, kategori Resurrection
**QA oleh:** Habibie (coder, Mission Control)
**Tanggal:** Kam 19 Nov 2026, 06:44–06:47 WIB
**Deadline submit:** Sab 5 Des 2026, 05:00 WIB (Jum 4 Des 2026, 14:00 PT)
**Status keseluruhan: ✅ SIAP — semua yang bisa dikerjakan agent-side sudah lolos.
Sisa langkah adalah IDR (repo, Pages, video upload, join, submit).**

---

## 1. Hasil QA

### 1.1 Self-test — ✅ 8/8 PASS

Dijalankan di Node v24.22.1 dengan DOM-shim harness (`/tmp/ghostboard-selftest.js`,
ephemeral — bukan bagian repo). `Ghostboard.selfTest()` dari
`ghostboard/js/app.js` persis seperti Fase 1:

| # | Invariant | Hasil |
|---|-----------|-------|
| 1 | validator passes a clean setup | ✅ PASS |
| 2 | validator WAITs when DXY disagrees | ✅ PASS |
| 3 | validator rejects 24h move > 2% | ✅ PASS |
| 4 | validator WAITs on all-UNKNOWN input | ✅ PASS |
| 5 | long plan: TP > entry > SL | ✅ PASS |
| 6 | long plan: RR1 >= 2 | ✅ PASS |
| 7 | WAIT plan has no entry/SL/TP | ✅ PASS |
| 8 | WAIT plan has a watch zone | ✅ PASS |

**8/8 — tidak ada perubahan kode sejak Fase 1, tidak ada regresi.**

### 1.2 Serve statis — ✅ semua 200

`python3 -m http.server` di `ghostboard/` (localhost, tes sementara, server dimatikan
lagi setelah tes):

| Path | HTTP | Ukuran |
|------|------|--------|
| `/` | 200 | 2.979 B |
| `/index.html` | 200 | 2.979 B |
| `/css/style.css` | 200 | 5.548 B |
| `/js/app.js` | 200 | 27.101 B |

### 1.3 Harga live — ✅ jalan

`GET https://api.gold-api.com/price/XAU` → **HTTP 200**, respons:

```json
{"currency":"USD","name":"Gold","price":3741.399902,"symbol":"XAU",
 "updatedAt":"2026-11-18T23:44:01Z","updatedAtReadable":"a few seconds ago"}
```

Harga **$3,741.40**, `updatedAt` detik sebelum pengecekan — feed live, gratis,
tanpa key. DEMO fallback ($3,734.35, 19 Nov 2026) tetap ada di kode kalau feed
jatuh, dan selalu berlabel DEMO/SAMPLE.

---

## 2. Cocokkan rules (fetch ulang live 19 Nov 2026 06:44 WIB)

Sumber: `https://kiroween.devpost.com/rules` (Official Rules, updated 16 Nov 2026 —
sudah termasuk penambahan residen Australia; tidak ada perubahan lain yang
berdampak ke kita). **Semua cocok dengan SUBMISSION.md / RESEARCH.md — tidak ada
perbedaan ditemukan.**

| Syarat rules | Status di SUBMISSION.md | Cocok? |
|---|---|---|
| Repo publik **GitHub** (BUKAN GitLab/Bitbucket), semua source + aset + instruksi | Checklist §4: repo publik GitHub, root = repo root | ✅ |
| File lisensi open-source, terdeteksi di About | `LICENSE` MIT ada di root proyek | ✅ |
| **`/.kiro` di root repo** — specs, hooks, steering | 12 file di `.kiro/` (specs, steering, hooks, MCP, agents, skills, prompts) | ✅ |
| **Jangan masukkan `/.kiro` ke `.gitignore`** (bisa diskualifikasi) | `.gitignore` hanya `.DS_Store` + `*.log`, plus komentar peringatan | ✅ |
| URL app yang berfungsi, gratis diuji juri sampai judging selesai | `[TODO]` — GitHub Pages, IDR yang nyalakan | ⏳ IDR |
| Deskripsi teks fitur/fungsi | Draft deskripsi §1 (Inggris) | ✅ |
| Video demo **< 3 menit**, YouTube publik, tunjukkan app jalan di device target, tanpa merek pihak ketiga / musik berhak cipta | Target 2:45–2:50, YouTube publik; footage F1–F9 ada di `footage/` (15 MB); edit oleh SBY, upload oleh IDR | ⏳ SBY + IDR |
| Write-up cara Kiro dipakai (IDE/CLI/Web/Crew, custom agent, hooks, specs, steering, MCP, property-based testing) | §2 lengkap | ✅ |
| Kategori + bonus prize dipilih di form | Resurrection; Social Blitz + Bonus Blog opsional; Best Demo otomatis; Startup/Student/Ghost-of-Past: tidak | ✅ |
| Semua materi Bahasa Inggris (atau terjemahan Inggris) | Draft dalam Inggris | ✅ |
| Proyek baru — dibuat selama Submission Period (30 Okt – 4 Des 2026) | Dibangun 18–19 Nov 2026, dalam periode | ✅ |
| Tim maks. 3 orang, satu Representative submit | IDR solo (submitter: CekingzZ) | ✅ |
| Hadiah: total $100.000+, 1st **$30.000**, 2nd $20.000, 3rd $10.000, Best Resurrection $5.000, Best Demo $1.000 | Sesuai RESEARCH.md §1 / rules §8 | ✅ |
| **Kredit Kiro 4.000**: request via Credit Request Form **sebelum Sel 1 Des 2026 12:00 PT**, redeem sebelum 4 Des, kedaluwarsa 31 Des 2026 | Checklist §4 (butuh Kiro user ID / AWS account ID IDR) | ⏳ IDR |
| **W-8BEN**: non-US resident *may be required* — affidavit + form pajak maks. **10 hari kerja** setelah diterima; hadiah dibayar maks. **60 hari** setelah form lengkap; sponsor boleh withholding | §4 + RESEARCH.md §5 — keputusan IDR saat klaim, bukan sekarang | ⏳ IDR (nanti) |
| Indonesia **TIDAK** di daftar negara yang dikecualikan (Quebec, Argentina, Brazil, Italy, Philippines, Russia, Cuba, Iran, North Korea, Syria, Belarus, Crimea, DNR, LNR, UAE + negara tersanksi AS) | RESEARCH.md §5 | ✅ |
| Social Blitz: post **dimulai dengan** `#KiroweenHackathon26`, isi: hal favorit tentang Kiro + bagaimana mengubah cara dev; link di form | Checklist §4 | ⏳ IDR (opsional) |
| Bonus Blog: blog publik tentang Kiro + proyek, sebut Kiroween 2026; link di form | Checklist §4 | ⏳ IDR (opsional) |
| Judging 16 Des 2026 – 29 Jan 2027; pemenang ~3 Feb 2027 | RESEARCH.md §1 | ✅ |

**Tidak ada rule baru, tidak ada perubahan deadline/hadiah/syarat sejak riset
19 Nov 2026 06:18–06:30 WIB.**

---

## 3. Status SUBMISSION.md — ✅ FINAL (draft untuk IDR)

File `SUBMISSION.md` sudah difinalkan:

- **Identitas submitter ditambahkan: IDR — GitHub `CekingzZ`.** Dicatat eksplisit
  bahwa `backburner036` adalah username Bitbucket IDR dan **tidak boleh** dipakai
  untuk submission GitHub/Devpost ini. `grep` seluruh proyek: `backburner036`
  tidak muncul di mana pun; `CekingzZ` kini tercantum di header + checklist repo.
- **Bagian baru §0 "QA final"** — hasil tes 19 Nov 2026 06:44 WIB (selfTest 8/8,
  serve 200, harga live $3,741.40, rules cocok, `/.kiro` aman).
- **Placeholder URL tetap `[TODO]`, tidak dikarang:** App URL (GitHub Pages),
  URL repo GitHub, URL video YouTube — ketiganya baru ada setelah IDR bertindak.
  Tidak ada URL hasil karangan di file ini maupun di repo.
- Checklist IDR (§4) tetap lengkap: repo → Pages → join Devpost + simpan draft
  lebih awal → kredit Kiro sebelum 1 Des 12:00 PT → video YouTube → submit
  sebelum 5 Des 05:00 WIB → W-8BEN/affidavit hanya kalau menang.

---

## 4. Verifikasi `/.kiro` — ✅

- Ada di root proyek: `.kiro/` berisi 12 file —
  `specs/ghostboard/{requirements,design,tasks}.md`,
  `steering/{product,tech,structure}.md`,
  `hooks/{lint-on-save,test-on-save}.json`,
  `settings/mcp.json`, `agents/ghost-analyst.md`,
  `skills/gold-analysis/SKILL.md`, `prompts/demo-script.md`.
- `.gitignore` proyek: hanya `.DS_Store` dan `*.log`, dengan komentar peringatan
  "never ignore .kiro/ — Devpost requires it at the repo root".
- `LICENSE` MIT ada di root (Copyright (c) 2026 GHOSTBOARD contributors).

---

## 5. Daftar tunggu IDR (agent tidak boleh kerjakan)

1. **Buat repo GitHub publik di akun `CekingzZ`** (bukan backburner036),
   push folder ini dengan root = root repo; pastikan `/.kiro` terlihat + MIT
   terdeteksi di About.
2. **Nyalakan GitHub Pages** → salin URL live ke form Devpost + end card video.
3. **Devpost:** buat akun → Join Hackathon → simpan draft lebih awal (sebelum 5 Des).
4. **Minta 4.000 kredit Kiro** via Credit Request Form **sebelum Sel 1 Des 2026
   12:00 PT** (butuh Kiro user ID / AWS account ID IDR; review ±48 jam kerja).
5. **Video demo** (edit SBY, paralel): upload ke YouTube (publik, <3 menit,
   "Not for Kids", Science & Technology) → tempel URL di form.
6. **Opsional:** Social Blitz (post X diawali `#KiroweenHackathon26`) dan/atau
   Bonus Blog (blog publik sebut Kiroween 2026).
7. **Submit sebelum Sab 5 Des 2026 05:00 WIB** — tanpa perpanjangan.
8. **Kalau menang:** affidavit + W-8BEN maks. 10 hari kerja — keputusan IDR
   saat itu; hadiah dibayar maks. 60 hari setelah form lengkap.

## 6. Yang TIDAK dilakukan agent (sesuai perintah)

Tidak membuat repo GitHub, tidak menyalakan GitHub Pages, tidak join hackathon,
tidak menyimpan draft Devpost, tidak upload YouTube, tidak submit, tidak klaim
apa pun, tidak menyentuh akun IDR, tidak ada bayar/gas/wallet/KYC. Video draft
dikerjakan SBY secara paralel — bukan bagian QA ini.

---

*QA-FINAL-REPORT.md — Habibie, 19 Nov 2026 06:47 WIB.*
