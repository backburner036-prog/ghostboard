# GALLERY CHECKLIST — GHOSTBOARD | Kiroween 2026 (Devpost)
**Oleh Gusdur (graphic designer) — 19 Nov 2026 ~11:45 WIB.**
**Scope: desain + dokumen saja. Tidak ada submit/push/upload/klaim kredit.**
Semua aset hanya di VM, menunggu IDR. Status: **aset siap, pengiriman menunggu IDR.**

## 1. Thumbnail YouTube — v1 vs v2

| | v1 | v2 |
|---|---|---|
| File | `produksi-v1/thumbnail-1280x720.png` | `assets/thumbnail-v2-1280x720.png` |
| Ukuran | 1280×720 | 1280×720 |
| Isi | Hero frame asli app (screenshot v1, jujur, on-theme) | Layout bold: judul besar + inset crop screenshot asli (logo + menu, tanpa angka harga) |
| Kekuatan | Jujur, tidak ada yang dikarang | Terbaca di ukuran kecil |
| Kelemahan | Konten app terpusat ~900px, margin hitam besar kiri/kanan/bawah; di ukuran kecil hanya harga besar yang terbaca; label "Kiroween 2026 / Built with Kiro" tidak terbaca | Inset crop berisi harga $3.741,25 sangat kecil di statusline (footage asli 19 Nov, bukan klaim harga berjalan) |
| QC | LULUS (SBY, draft v1) | LULUS ronde 2 (ronde 1 GAGAL: inset menabrak judul + caption menabrak footer — diperbaiki) |
| Status | **Siap, disimpan utuh, tidak diubah** | **Siap, kandidat** |

**Siapa yang memilih: IDR.** SBY/Gusdur tidak memilih — IDR (atau SBY atas arahan IDR)
pilih v1 atau v2 saat upload YouTube.
- Kalau mau 100% evergreen (tanpa angka harga tanggal 19 Nov): pakai **v1**, atau minta
  SBY crop ulang v2 dari footage tanpa statusline.
- Dipakai untuk: thumbnail video YouTube (public) + bisa juga jadi gambar galeri Devpost.

## 2. Poster / cover Devpost

| | |
|---|---|
| File | `assets/poster-devpost-1600x900.png` |
| Ukuran | 1600×900 |
| Untuk apa | Cover galeri Devpost + header README |
| Palet | Disalin 1:1 dari app (bg #070a07, hijau #33ff66, pumpkin #ff7a1a, purple #b388ff, grey #8a9a8a, amber #ffcc00); inset terminal = crop asli screenshot v1 — tidak ada URL/username/angka harga yang digambar |
| QC | LULUS ronde 1 |
| Status | **Siap** — sudah dipakai di README (header) |
| Masih kurang | Tidak ada — tinggal diunggah ke galeri Devpost saat IDR submit (IDR yang klik "Enter a Submission") |

## 3. OG / social card

| | |
|---|---|
| File | `assets/og-card-1200x630.png` |
| Ukuran | 1200×630 |
| Untuk apa | Social preview saat link app dibagikan (GitHub Pages / X) |
| QC | LULUS ronde 2 (ronde 1 GAGAL: judul menabrak inset — diperbaiki) |
| Status | **Siap, belum aktif** |
| Masih kurang | **URL Pages live untuk `og:image`** — `ghostboard/index.html` sudah punya OG meta + komentar TODO `og:image`; diisi URL Pages absolut setelah IDR push repo + Pages nyala. Jangan karang URL. |

## 4. Aset pendukung (sudah ada, bukan lane ini)

| Aset | Status |
|---|---|
| Title card + end card video (`produksi-v1/title-cards/`) | Siap (SBY) — end card masih "link below", diganti URL live setelah URL dari IDR |
| Diagram arsitektur F7 (`footage/07-arsitektur.png`) | Siap, dipakai di README "How it works" — satu cacat kosmetik: panah hijau di bawah kotak GHOSTBOARD menunjuk ruang kosong; sengaja tidak diperbaiki (sudah terpotong di draft v1; perbaiki hanya kalau SBY re-cut final) |
| Favicon + OG meta (`ghostboard/favicon.svg`, head `index.html`) | Siap, terverifikasi serve lokal 200 |
| Footage F1–F9 (`footage/`) | Siap (SBY, 19 Nov, 1920×1080/30fps, narasi 392 kata) |

## 5. Yang masih BLOCKED (butuh IDR — bukan blokir desain)

- [ ] **Pilihan thumbnail IDR: v1 atau v2** (YouTube)
- [ ] **Upload video YouTube** — draft v1 (2:48, `kiroween-video-draft-v1.mp4`) siap di VM, belum di-upload; IDR yang upload (akun IDR). README sudah dikoreksi: baris "Demo video < 3 min on YouTube (public)" tidak lagi tercentang.
- [ ] **Push repo + GitHub Pages** — setelah itu: URL live → `og:image` diisi, end card video diganti "link below" → URL live, deskripsi YouTube diisi URL repo + URL app.
- [ ] **Submit Devpost** — IDR klik "Enter a Submission" (deadline Sab 5 Des 2026 05:00 WIB); poster + thumbnail siap diunggah ke galeri.
- [ ] **Klaim kredit Kiroween: SKIP PERMANEN** — butuh KYC Didit; tidak dikerjakan siapa pun.

## 6. Catatan koreksi README (lane ini)

- Baris checklist "Demo video < 3 min on YouTube (public)" di `README.md` (baris 88)
  **dulu tercentang `[x]` padahal draft v1 baru ada di VM** — sudah dikoreksi jadi
  `[ ]` + catatan "draft v1 (2:48) siap di VM, belum di-upload; upload + URL menunggu IDR".
- Hanya baris itu yang disentuh. Bagian lain README dan logika app
  (`index.html`/`app.js`/`style.css`) tidak diubah.
