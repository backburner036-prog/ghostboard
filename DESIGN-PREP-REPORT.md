# DESIGN PREP — GHOSTBOARD | Kiroween 2026
**Oleh Gusdur (graphic designer) — 19 Nov 2026 ~11:20–11:35 WIB. Status: PREP SELESAI.**
**Scope: desain SAJA. TIDAK ada submit, klaim kredit, push repo, upload, atau
langkah IDR yang disentuh. Semua file hanya di VM, menunggu IDR.**

## 1. Audit aset yang sudah ada

| Aset | Putusan |
|---|---|
| `produksi-v1/thumbnail-1280x720.png` (v1, hero screenshot) | LAYAK sebagai hero frame — jujur, on-theme. LEMAH sebagai thumbnail YouTube: konten app terpusat ~900px, margin hitam besar di kiri/kanan/bawah; di ukuran kecil hanya harga besar yang terbaca; label "Kiroween 2026 / Built with Kiro" tidak terbaca. **Disimpan utuh, tidak diubah.** |
| `produksi-v1/title-cards/awal.png` + `akhir.png` | BAGUS — bersih, palet konsisten (hijau #33ff66, hitam, amber). Tidak diubah. |
| `footage/07-arsitektur.png` (diagram F7) | BAGUS, semua teks terbaca. Satu cacat kosmetik: panah hijau di bawah kotak GHOSTBOARD menunjuk ke ruang kosong. **SENGAJA TIDAK diperbaiki** — diagram ini sudah terpotong di video draft v1 (F7); regenerasi akan membuat video tidak sinkron. Perbaiki hanya kalau SBY re-cut final. |
| Favicon / OG meta / poster Devpost | **BELUM ADA** — dibuat di prep ini (lihat §2). |
| `ghostboard/index.html` | Tidak ada favicon, tidak ada OG meta. Sudah ditambah (lihat §3). |

## 2. Aset baru (folder `assets/`, script pembuat `assets/make_assets.py`)

Palet disalin 1:1 dari `ghostboard/css/style.css` (bg #070a07, hijau #33ff66,
pumpkin #ff7a1a, purple #b388ff, grey #8a9a8a, amber #ffcc00). Inset terminal
adalah **crop asli screenshot v1** (logo + menu, tanpa angka harga) — tidak ada
yang dikarang. Tidak ada URL/username/angka harga yang digambar di aset baru.

| File | Ukuran | Pakai untuk | QC |
|---|---|---|---|
| `assets/thumbnail-v2-1280x720.png` | 1280×720 | Thumbnail YouTube (kandidat — IDR/SBY pilih v1 atau v2) | LULUS ronde 2 (ronde 1 GAGAL: inset menabrak judul + caption menabrak footer — diperbaiki) |
| `assets/poster-devpost-1600x900.png` | 1600×900 | Cover galeri Devpost + header README | LULUS ronde 1 |
| `assets/og-card-1200x630.png` | 1200×630 | Social preview (GitHub Pages / X) — aktif setelah URL Pages ada | LULUS ronde 2 (ronde 1 GAGAL: judul menabrak inset — diperbaiki) |

## 3. Perubahan kecil di app + README (desain saja, tidak sentuh logika)

- `ghostboard/favicon.svg` (baru): mark hantu hijau + mulut pumpkin, palet app.
- `ghostboard/index.html` (head saja): `<link rel="icon" href="favicon.svg">`,
  `og:title`, `og:description`, `og:type`, `twitter:card=summary`, + komentar
  TODO `og:image` — diisi URL Pages setelah IDR push (tidak ada URL dikarang).
- `README.md`: poster 1600×900 di atas + seksi "How it works" dengan diagram
  `footage/07-arsitektur.png`. Tidak ada teks lain yang diubah.

## 4. Verifikasi (19 Nov 2026 ~11:30 WIB)

- Serve lokal `ghostboard/`: `/`, `/index.html`, `/css/style.css`, `/js/app.js`,
  `/favicon.svg` semua **HTTP 200**. Server dimatikan lagi setelah cek.
- `node --check js/app.js` OK (JS tidak disentuh). `index.html` parse OK,
  tidak ada tag tak tertutup. `favicon.svg` XML valid.
- `.gitignore` hanya `.DS_Store` + `*.log` — `assets/` dan `favicon.svg` tidak
  ter-ignore, ikut ke-push saat IDR push repo.

## 5. Checklist visual submission (untuk IDR / koordinator)

- [x] Thumbnail YouTube 1280×720 — v1 (hero frame) + v2 (bold) siap, pilih satu
- [x] Poster/cover Devpost 1600×900 siap (`assets/`)
- [x] OG/social card 1200×630 siap (`assets/`)
- [x] Favicon + OG meta di app
- [x] README berp Poster + diagram arsitektur
- [x] Title card + end card video (SBY) konsisten palet
- [x] Diagram arsitektur F7 terbaca penuh
- [ ] `og:image` diisi URL Pages absolut (setelah IDR push + Pages nyala)
- [ ] End card video diganti "link below" → URL live (SBY, setelah URL dari IDR)
- [ ] Pilihan IDR: thumbnail v1 atau v2 untuk YouTube

## 6. Catatan / temuan untuk koordinator (bukan blokir)

1. **README checklist keliru (bukan lane saya, tidak saya ubah):** baris "Demo
   video < 3 min on YouTube (public)" tercentang, padahal draft v1 baru ada di
   VM dan belum di-upload. Sebaiknya dikoreksi jadi "draft v1 siap, upload
   menunggu IDR" supaya juri/IDR tidak salah baca.
2. **Panah yatim di diagram F7** (lihat §1) — kosmetik, biarkan sampai ada
   re-cut video.
3. **Thumbnail v2 menampilkan crop screenshot berisi harga $3,741.25**
   (sangat kecil, di statusline crop) — sama seperti v1, itu footage asli
   19 Nov, bukan klaim harga berjalan. Kalau mau 100% evergreen, pakai v1
   saja atau minta SBY crop ulang dari footage tanpa statusline.
4. Musik video tetap tidak ada (tidak ada sumber license-free terverifikasi)
   — di luar lane desain, dicatat di VIDEO-DRAFT-V1-REPORT.md.

## 7. Yang TIDAK dilakukan (sesuai perintah)

Tidak submit Devpost, tidak klaim kredit Kiro, tidak push repo, tidak upload
YouTube, tidak bayar, tidak KYC/ID, tidak pakai password/identitas IDR.
Langkah IDR di SUBMISSION.md §4 tetap milik IDR.
