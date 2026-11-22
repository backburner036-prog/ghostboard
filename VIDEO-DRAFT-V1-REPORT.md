# VIDEO DRAFT v1 — GHOSTBOARD | Kiroween 2026
**Oleh SBY (video editor) — 19 Nov 2026 ~00:00 WIB. Status: DRAFT v1 SELESAI, siap ditonton IDR.**

## File hasil
| File | Isi |
|---|---|
| `kiroween-video-draft-v1.mp4` | Video draft v1 (file utama) |
| `kiroween-video-draft-v1.srt` | Subtitle Inggris, 24 cue, sinkron ke narasi |
| `produksi-v1/thumbnail-1280x720.png` | Thumbnail YouTube 1280×720 (frame hero) |
| `produksi-v1/` | Bahan kerja: narasi TTS per segmen, title card, potongan edit, frame QC |

## Spesifikasi final (terverifikasi)
- **Durasi: 2:48,44 (168,44 dtk)** — di bawah 3 menit (syarat Devpost) dan pas di target template 2:45–2:50.
- **Resolusi: 1920×1080, 30 fps, H.264 (libx264 CRF 18), 25,6 MB** — jauh di bawah batas 500 MB.
- **Audio: AAC 192 kbps, 48 kHz, narasi TTS Inggris** (voice default Shortwave, speed 90), dinormalisasi loudnorm (mean −17,4 dB, max −1,6 dB — tidak senyap, tidak pecah).
- **Decode penuh tanpa error** (`ffmpeg -f null -`, exit 0). Frame dicek visual di 11 titik (title, hero, masalah, demo, bukti Kiro, diagram, end card) — semua tampil benar.

## Yang sudah terpasang
- **Narasi penuh 392 kata** dari `footage/naskah-final.txt`, dibacakan persis per segmen: Hook 13,0 dtk · Masalah 25,8 dtk · Demo 79,3 dtk · Dibangun 25,9 dtk · Penutup 22,4 dtk (+ jeda 0,5 dtk antar segmen).
- **Semua footage F1–F7 dipakai:** title card 3 dtk + hero F1 (harga live $3.741,25) · F2 masalah + freeze frame angka kunci · F3 input `sample` → F4 proses → F5 bukti `.kiro` (spec/steering/hooks/MCP) → F6 hasil plan · F7 diagram arsitektur statis penuh · end card "link below".
- **Title card + end card** dibuat baru (Pillow, tema terminal hijau-hitam, sesuai BBS): "GHOSTBOARD — The BBS That Refuses to Die", "Try GHOSTBOARD live at the link below", kredit Mission Control (Habibie · SBY · Soekarno · IDR).
- **Tanpa musik** (sesuai pipeline: tidak ada sumber musik bebas-lisensi terverifikasi di VM; narasi bersih lebih aman dari risiko hak cipta).
- **Tanpa upload / submit / klaim apa pun** — file hanya di VM, menunggu IDR.

## Catatan QC (diperbaiki saat rakit)
1. Overlay teks "6 MINUTES · 4 APPS…" sempat ganda dengan teks yang sudah ada di slide F2 — overlay dihapus, frame ditahan polos.
2. Diagram F7 sempat di-zoom (zoompan) sampai teks tepi terpotong — diganti tampil statis penuh, semua kotak terbaca.
3. `blackdetect` sempat menandai 2 ruas "hitam" (F4 0–4 dtk, F5 0–6,4 dtk) — dicek visual: **bukan frame kosong**, itu terminal BBS dial-in (`ATZ / OK / ATDT 555-0134`) dan terminal bukti Kiro yang memang berlatar hitam. Dibiarkan apa adanya.

## Placeholder yang tersisa (JANGAN dikarang — butuh IDR)
- **URL live app di end card + deskripsi YouTube: MASIH "link below" / `[URL APP — TODO]`.** Isi setelah IDR push repo + nyalakan GitHub Pages. Jangan tayangkan `localhost:8931`.
- **URL repo GitHub di deskripsi: TODO** (sama, setelah push).
- **Deskripsi + judul YouTube** sudah ada drafnya di `footage/naskah-final.txt` — IDR yang upload (akun IDR).
- **Rekaman Kiro IDE 10 detik (opsional):** F5 saat ini terminal asli (bukan Kiro IDE, karena sign-in AWS milik IDR). Kalau IDR sempat merekam `.kiro/` di Kiro IDE, bisa ganti/tambah F5 di final.

## Yang masih butuh IDR
1. **Tonton draft v1** dan beri catatan (paling penting: suara TTS oke / terlalu robotik? Kalau mau suara manusia, IDR rekam sendiri ikut naskah — SBY yang potong/mix).
2. **Push repo + GitHub Pages**, lalu kirim URL live + URL repo → SBY ganti end card + deskripsi di final (tanpa itu video final tetap "link below").
3. **Upload YouTube + submit Devpost** (deadline Sab 5 Des 2026 05:00 WIB; video final ke IDR 4 Des 2026).

## Batasan draft v1 (wajar untuk draft)
- Narasi TTS, bukan suara manusia; musik belum ada; F5 Kiro ±22 dtk (lebih panjang dari target sisipan ±10 dtk di naskah — bisa dipangkas di final kalau IDR mau).
- Identitas di video: CekingzZ (sesuai perintah — bukan backburner036). Tidak ada username tampil di frame video ini.
