# FOOTAGE — GHOSTBOARD (Kiroween 2026)
**Disusun lane build (Habibie), 19 Nov 2026 · untuk SBY (edit video final).**
**Deadline video final ke IDR: 4 Des 2026. Batas footage ini: 3 Des 12:00 WIB — SELESAI LEBIH AWAL (19 Nov).**

## Isi (nama persis sesuai shot list SBY)

| File | Durasi / ukuran | Isi |
|---|---|---|
| `01-hero-app.mp4` | 18 dtk | Hero app, harga LIVE $3,741.25 |
| `02-masalah.mp4` | 15 dtk | Workflow lama (ilustrasi staged — lihat catatan) |
| `03-demo-langkah1-input.mp4` | 20 dtk | Ketik perintah `sample` → Analysis Board |
| `04-demo-langkah2-proses.mp4` | 25 dtk | Boot → validator → plan (proses → hasil antara) |
| `05-kiro-bukti.mp4` | 25,6 dtk | Terminal asli: `find .kiro`, spec, steering, hooks, MCP |
| `06-demo-hasil.mp4` | 16 dtk | Plan akhir ditahan ≥8 dtk + Market Board |
| `07-arsitektur.png` | 1920×1080 | Diagram arsitektur (6 kotak + panah) |
| `naskah-final.txt` | — | Naskah 03, SEMUA slot terisi, 392 kata (±2:47) |
| `info-produk.txt` | — | Nama, tim, stack, fitur Kiro, angka verified |

Semua video: **1920×1080, 30 fps, H.264, tanpa audio** (SBY yang isi suara).
Total footage mentah: ~120 dtk (target shot list ±4–6 menit — SBY bisa
loop/extend dari `takes-alt/` bila perlu; lihat di bawah).

## Cara tiap file dibuat (jujur — supaya SBY tahu apa yang nyata)

- **F1, F3, F4, F6:** frame diambil dari **app asli yang jalan** di Chromium
  headless (Playwright, viewport 1920×1080), lalu dirakit jadi video dengan
  ffmpeg (zoom halus). Klik dan ketikan adalah aksi nyata di app
  (klik menu, ketik `sample`/`price` + Enter). Bukan mockup.
- **Harga live:** browser sandbox VM ini tidak punya egress langsung, jadi
  harga live diambil lewat **relay lokal** (`?priceUrl=` → relay yang
  meneruskan respons ASLI `api.gold-api.com/price/XAU`). Harga di footage
  ($3,741.25, 19 Nov 2026 06:24 WIB) adalah harga pasar asli saat rekam,
  bukan angka karangan. App di repo punya dukungan `?priceUrl=` yang sama
  untuk pengujian; default-nya tetap endpoint publik langsung.
- **F5:** rekaman layar **terminal sungguhan** di Xvfb (1920×1080, 30 fps):
  perintah `find .kiro`, `head` spec/steering, `cat` hooks + `mcp.json`
  dijalankan beneran; output di layar adalah output asli. Terminalnya
  emulator tkinter (bukan xterm — tidak tersedia di VM), tapi shell +
  output-nya nyata. Tidak ada Kiro IDE di footage ini karena Kiro IDE/CLI
  butuh sign-in akun AWS IDR — sign-in itu milik IDR, bukan agent.
  Kalau IDR sempat membuka Kiro IDE dan merekam 10 detik `.kiro/` di
  editor, itu bisa menggantikan/menambah F5 — kabari SBY.
- **F2:** **ilustrasi staged** (slide HTML yang saya buat) — BUKAN rekaman
  kompetitor asli. Slide-nya berlabel "ILLUSTRATION" di layar. Jangan
  diklaim sebagai rekaman app lain.
- **F7:** diagram digambar dengan PIL dari arsitektur nyata app.
- **Take alternatif:** folder `takes-alt/` berisi 15 frame PNG mentah
  (hero take 1+2, analysis/plan take 1+2, boot, typing, news, ticker,
  about, help, old-way) — SBY bisa merakit ulang segmen bila perlu.

## Yang TIDAK ada di footage (cek sebelum kirim)

- ✅ Tidak ada API key / seed / password / token / data pribadi di frame
  mana pun (dicek: layar hanya berisi app + terminal repo publik).
- ✅ Tidak ada notifikasi / tab / email / chat pribadi (headless + Xvfb kosong).
- ⚠️ **URL live BELUM ADA** — GitHub Pages baru hidup setelah IDR push repo.
  Naskah penutup memakai "link below" + deskripsi YouTube memakai placeholder
  `[URL APP — TODO]`. **SBY/IDR: ganti dengan URL asli di end card +
  deskripsi sebelum upload.** Jangan tayangkan `localhost:8931`.
- ⚠️ Video final tetap butuh: narasi (SBY), musik bebas lisensi, thumbnail
  1280×720, upload YouTube oleh IDR (akun IDR).

## Perintah verifikasi (untuk SBY)

```bash
for f in footage/*.mp4; do ffprobe -v error -show_entries stream=width,height,r_frame_rate,codec_name -show_entries format=duration -of default=nw=1 "$f"; done
```
