# THUMBNAIL PICK — GHOSTBOARD | Kiroween 2026
**Oleh Gusdur (graphic designer) — 19 Nov 2026 ~11:48 WIB.**
**Scope: desain prep saja. Tidak ada upload, publish repo, bayar, atau KYC.**
**Keputusan ada di IDR — file ini hanya perbandingan + rekomendasi desainer.**

Deadline submit: Sab 5 Des 2026 05:00 WIB. Klaim kredit Kiroween: **SKIP PERMANEN**
(KYC Didit — keputusan IDR 11:23 WIB).

---

## 1. Perbandingan berdampingan — v1 vs v2

| | **v1 — hero frame asli** | **v2 — layout bold (kandidat)** |
|---|---|---|
| File | `produksi-v1/thumbnail-1280x720.png` | `assets/thumbnail-v2-1280x720.png` |
| Ukuran | 1280×720 | 1280×720 |
| Ukuran file | 268.879 byte | 133.441 byte |
| MD5 | `7a643b3c62520cbbf94d623f2f` | `17337bcb578856d1db3c2ed1cd503292` |
| Isi | Screenshot utuh app GHOSTBOARD: logo ASCII, menu [1]–[6], Market Board dengan harga besar **$3,741.25 / oz**, footer "GHOSTBOARD · Kiroween 2026 · Resurrection · Built with Kiro" | Judul raksasa **GHOSTBOARD** (hijau #33ff66) + eyebrow amber "KIROWEEN 2026 · RESURRECTION" + tagline "The BBS That Refuses to Die" + sub "Live XAU/USD trading terminal / Dial in. Get your MT5 plan." + 3 badge (LIVE PRICE / MT5-READY PLAN / NO LOGIN) + inset crop screenshot asli di kanan bawah + footer "BUILT WITH KIRO · spec-first · .kiro/ in repo" |
| Palet | Palet app asli (bg hitam, hijau, amber, purple) | Sama, disalin 1:1 dari `ghostboard/css/style.css` |
| Yang terbaca di ukuran kecil (feed YouTube) | Hanya harga besar **$3,741.25**; menu + label Kiroween/Built with Kiro tidak terbaca | Judul GHOSTBOARD + tagline + 3 badge terbaca jelas |
| Margin hitam | Besar di kiri/kanan/bawah — konten app terpusat ~900px | Tidak ada ruang terbuang; border hijau penuh, layout mengisi frame |
| Angka harga | Besar dan dominan: $3,741.25 (footage asli 19 Nov, bukan klaim harga berjalan) | Sangat kecil, hanya di statusline inset crop (footage asli 19 Nov yang sama) |
| Kejujuran | 100% screenshot asli, tidak ada yang digambar | Inset = crop asli screenshot v1 (logo + menu); semua teks tambahan adalah klaim produk yang sudah ada di app/README, bukan angka/URL karangan |
| QC | LULUS (SBY, draft v1) | LULUS ronde 2 (ronde 1 GAGAL: inset menabrak judul + caption menabrak footer — sudah diperbaiki) |
| Status | Siap, disimpan utuh, tidak diubah | Siap, kandidat |

**Perbedaan kunci, singkat:**
1. **Keterbacaan kecil:** v2 menang telak — judul + badge terbaca di feed; v1 hanya harga yang terbaca.
2. **Angka harga:** v1 memajang $3,741.25 besar-besar (tanggal 19 Nov, cepat basi); v2 menyembunyikannya jadi setitik di inset.
3. **Kejujuran vs desain:** v1 murni screenshot (paling jujur, paling polos); v2 desain poster (tetap jujur — tidak ada yang dikarang — tapi sudah diolah).
4. **Konteks lomba:** v2 menyebut "KIROWEEN 2026 · RESURRECTION" dan "BUILT WITH KIRO" besar-besar; v1 menyembunyikannya di footer kecil yang tidak terbaca.

## 2. Rekomendasi Gusdur (desainer — keputusan tetap di IDR)

**Pilih v2 untuk thumbnail YouTube.**

Alasan: thumbnail hidup-mati di ukuran kecil. Di feed YouTube, v1 terlihat seperti
kotak hitam dengan satu angka hijau — orang tidak tahu ini apa. v2 langsung bilang:
GHOSTBOARD, BBS yang menolak mati, terminal XAU/USD live, plan MT5, tanpa login.
Itu yang bikin orang klik, dan semua klaimnya benar.

Catatan jujur soal v2: inset-nya masih membawa harga $3,741.25 yang sangat kecil
di statusline. Praktis tidak terbaca dan tidak menyesatkan, tapi kalau IDR mau
**100% evergreen** (tanpa angka harga tanggal 19 Nov sama sekali), ada dua jalan:
pakai **v1**, atau minta SBY crop ulang inset v2 dari footage tanpa statusline.
Saya tidak mengubah v2 sendiri tanpa arahan — v2 sudah lulus QC ronde 2.

**Dipakai untuk:** thumbnail video YouTube (public) + boleh juga jadi gambar galeri Devpost.

---

## 3. Kesiapan og:image — ⛔ BLOKIR (menunggu IDR)

| Item | Status |
|---|---|
| File kartu | ✅ `assets/og-card-1200x630.png` — 1200×630, 92.735 byte, MD5 `29098cc2b127eee14edaadde817351c3`, QC LULUS ronde 2, terverifikasi tampil benar (judul GHOSTBOARD + tagline + badge LIVE PRICE / NO LOGIN + inset screenshot + "BUILT WITH KIRO · RESURRECTION" + "> dial in at the link below") |
| Meta di app | ✅ `ghostboard/index.html` sudah punya `og:title`, `og:description`, `og:type`, `twitter:card=summary`, favicon; **belum ada tag `og:image`** — hanya komentar TODO |
| URL Pages | ⛔ **BELUM ADA — repo belum publik, GitHub Pages belum nyala.** Folder ini bukan git repo (tidak ada remote); tidak ada URL yang bisa dipakai. **Jangan karang URL.** |
| Yang harus dilakukan IDR | 1) Push repo ke publik → 2) nyalakan GitHub Pages → 3) beri URL live ke Gusdur/SBY → 4) isi `og:image` dengan URL absolut `.../assets/og-card-1200x630.png` + ubah `twitter:card` jadi `summary_large_image` (sudah ditulis di komentar TODO `index.html` baris 12–13) |
| Setelah aktif | Social preview (X / GitHub / chat) akan menampilkan kartu OG saat link app dibagikan |

**Blokir ini bukan blokir desain** — kartu sudah siap; yang kurang hanya URL live dari IDR.

---

## 4. Integritas aset — tidak ada yang hilang/rusak ✅

Dicek 19 Nov 2026 ~11:48 WIB (buka file + verifikasi dimensi + baca visual):

| Aset | Ukuran | Hasil |
|---|---|---|
| `assets/thumbnail-v2-1280x720.png` | 1280×720, 133.441 byte | ✅ OK — tampil benar |
| `assets/poster-devpost-1600x900.png` | 1600×900, 190.117 byte, MD5 `f0ff409fe0d4f70cda14ac2e5a81880f` | ✅ OK — tampil benar (KIROWEEN 2026 · CATEGORY: RESURRECTION, daftar board [1]–[3], inset screenshot) |
| `assets/og-card-1200x630.png` | 1200×630, 92.735 byte | ✅ OK — tampil benar |
| `produksi-v1/thumbnail-1280x720.png` (v1) | 1280×720, 268.879 byte | ✅ OK — tampil benar |
| `footage/07-arsitektur.png` (diagram F7) | 160.847 byte | ✅ OK — cacat kosmetik lama tetap ada (panah hijau di bawah kotak GHOSTBOARD menunjuk ruang kosong); sengaja tidak diperbaiki karena sudah terpotong di draft v1 |
| `ghostboard/favicon.svg` | 557 byte | ✅ OK — XML valid |
| `produksi-v1/title-cards/awal.png` + `akhir.png` | 61.524 + 61.681 byte | ✅ OK — ada, tidak diubah |
| `assets/make_assets.py` (script pembuat aset) | 6.767 byte | ✅ OK — ada |

**Tidak ada aset hilang, tidak ada file corrupt.** Semua PNG lolos `PIL.verify()` +
dibuka dan dibaca visual satu per satu.

---

## 5. Yang TIDAK dilakukan (sesuai perintah)

Tidak upload YouTube, tidak publish repo, tidak push, tidak submit Devpost, tidak
klaim kredit, tidak bayar, tidak KYC, tidak sentuh Trade #01. Hanya file ini yang
ditulis + 1 baris log ke `tasks.jsonl`.

## 6. Yang masih menunggu IDR (ringkas)

- [ ] **Pilih thumbnail: v1 atau v2** (rekomendasi Gusdur: v2)
- [ ] Upload video YouTube (draft v1 2:48 siap di VM)
- [ ] Push repo + GitHub Pages → URL live → isi `og:image` + ganti end card "link below" → URL live
- [ ] Submit Devpost (IDR klik "Enter a Submission")
- [ ] Klaim kredit: SKIP PERMANEN
