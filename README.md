# Generator & Editor Modul Ajar — Kurikulum Merdeka

Aplikasi web full-stack untuk menyusun, mengedit, dan mencetak **Modul Ajar Kurikulum Merdeka**
secara terstruktur (Bab I–III), dengan auto-save lokal, integrasi Google Sheets, serta ekspor
JSON/PDF. Dibangun dengan **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Shadcn UI +
Zustand**.

## ✨ Fitur Utama

- **Navigasi Bab & Sub-bab** — sidebar interaktif untuk Bab I (Informasi Umum), Bab II
  (Komponen Inti), Bab III (Lampiran).
- **Tabel CRUD dinamis** — Profil Pelajar Pancasila, Tujuan Pembelajaran & KKTP, Langkah
  Pembelajaran per pertemuan.
- **Auto-save lokal** — seluruh draf tersimpan otomatis di `localStorage` browser (Zustand
  `persist`), aman dari kehilangan data saat refresh.
- **Integrasi Google Sheets** — simpan & muat seluruh data form (JSON) ke/dari Google Sheets
  melalui Google Apps Script Web App.
- **Export / Import JSON** — unduh draf sebagai file `.json` dan impor kembali kapan saja.
- **Cetak / Simpan PDF** — mode "Tampilan Dokumen Resmi" dengan styling cetak rapi (tanpa
  sidebar/toolbar) menggunakan `@media print`.
- **Contoh Data siap pakai** — tombol "Muat Contoh Data" mengisi seluruh form dengan dokumen
  lengkap Modul Ajar "Persamaan Dasar Akuntansi" (Fase E).
- **Live Preview** — beralih instan antara mode "Form Input" dan "Tampilan Dokumen Resmi".

## 🗂️ Struktur Direktori

```
modul-ajar-app/
├─ app/
│  ├─ page.tsx                  # Dashboard utama (split layout)
│  ├─ layout.tsx
│  ├─ globals.css               # Tema + styling cetak (@media print)
│  └─ api/
│     └─ sheets/
│        ├─ route.ts            # POST → simpan ke Google Sheets
│        └─ load/route.ts       # GET  → muat dari Google Sheets
├─ components/
│  ├─ layout/
│  │  ├─ sidebar.tsx            # Navigasi Bab & Sub-bab
│  │  └─ toolbar.tsx            # Tombol aksi (save/load/export/print)
│  ├─ forms/                    # Komponen form tiap Bab/sub-bab
│  │  ├─ bab1-*.tsx
│  │  ├─ bab2-*.tsx
│  │  ├─ bab3-*.tsx
│  │  └─ form-renderer.tsx
│  ├─ preview/
│  │  └─ document-preview.tsx   # Template pratinjau & cetak dokumen resmi
│  └─ ui/                       # Komponen dasar ala Shadcn UI
├─ lib/
│  ├─ store.ts                  # Zustand state store + auto-save
│  ├─ types.ts                  # Tipe data ModulAjarData
│  ├─ dummy-data.ts             # Contoh data Akuntansi Fase E
│  ├─ empty-data.ts             # Struktur data kosong (default)
│  ├─ google-sheets.ts          # Helper client → API route
│  └─ utils.ts
├─ google-apps-script/
│  └─ Code.gs                   # Kode backend Apps Script (siap pakai)
├─ netlify.toml
├─ .env.example
└─ package.json
```

## 🚀 Menjalankan Secara Lokal

```bash
npm install
cp .env.example .env.local   # lalu isi GOOGLE_SHEETS_WEBAPP_URL (lihat langkah di bawah)
npm run dev
```

Buka `http://localhost:3000`.

> Aplikasi tetap dapat digunakan sepenuhnya (form, auto-save lokal, export/import JSON, cetak
> PDF) **tanpa** mengonfigurasi Google Sheets. Integrasi Sheets hanya diperlukan untuk fitur
> "Simpan ke Sheets" / "Muat dari Sheets".

## 🔗 Integrasi Google Sheets (via Google Apps Script)

Next.js **tidak** menyimpan kredensial Google API langsung di frontend — sebagai gantinya,
aplikasi memanggil sebuah **Google Apps Script Web App** yang bertindak sebagai jembatan aman ke
Google Sheets. Skema alurnya:

```
Browser  →  /api/sheets (Next.js API Route)  →  Google Apps Script Web App  →  Google Sheets
```

### Langkah setup:

1. Buat **Google Spreadsheet** baru, mis. bernama "Database Modul Ajar".
2. Di spreadsheet tersebut, buka **Extensions → Apps Script**.
3. Hapus kode contoh bawaan, lalu salin-tempel seluruh isi file
   [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) dari repo ini.
4. Ganti nilai konstanta `SECRET` di baris atas file dengan token rahasia pilihan Anda.
5. Klik **Deploy → New deployment**:
   - Pilih tipe **Web app**.
   - **Execute as**: Me (akun Anda).
   - **Who has access**: Anyone.
6. Salin URL Web App yang dihasilkan (`https://script.google.com/macros/s/XXXX/exec`).
7. Di project Next.js, isi file `.env.local`:
   ```
   GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/XXXX/exec
   GOOGLE_SHEETS_SECRET=token-rahasia-yang-sama-dengan-Code.gs
   ```
8. Restart `npm run dev`. Tombol **"Simpan ke Sheets"** dan **"Muat dari Sheets"** di toolbar
   kini akan berfungsi.

Setiap penyimpanan akan menulis satu baris ke sheet `ModulAjar` berisi `rowId`, `timestamp`,
`topikMateri`, `namaPenyusun`, dan seluruh data JSON modul ajar. Fitur "Muat dari Sheets" secara
default mengambil baris **terakhir** yang tersimpan.

### Integrasi Google Drive

Untuk kebutuhan penyimpanan berkas (mis. PDF hasil cetak) ke Google Drive, cara termudah dan
paling andal adalah: gunakan fitur **"Cetak / Simpan PDF"** pada aplikasi ini (memakai dialog
cetak browser → "Simpan sebagai PDF"), lalu unggah manual ke Google Drive, atau seret file hasil
unduhan ke folder Google Drive yang tersinkronisasi di perangkat Anda. Jika dibutuhkan otomatisasi
penuh (upload langsung dari aplikasi ke Drive), `Code.gs` dapat diperluas dengan `DriveApp` sesuai
kebutuhan lanjutan — silakan sesuaikan dengan struktur folder Drive Anda.

## ☁️ Deployment

### Vercel (direkomendasikan)

1. Push project ini ke repository GitHub/GitLab/Bitbucket.
2. Import project di [vercel.com/new](https://vercel.com/new).
3. Tambahkan Environment Variables di pengaturan project Vercel:
   - `GOOGLE_SHEETS_WEBAPP_URL`
   - `GOOGLE_SHEETS_SECRET`
4. Deploy — Vercel otomatis mendeteksi Next.js, tidak perlu konfigurasi tambahan.

### Netlify

Project ini sudah menyertakan `netlify.toml` dengan plugin `@netlify/plugin-nextjs` sehingga App
Router & API Routes berjalan sebagai Netlify Functions secara otomatis.

1. Push ke repository Git.
2. Di Netlify, pilih **Add new site → Import an existing project**.
3. Build command: `npm run build` (sudah diatur di `netlify.toml`).
4. Tambahkan Environment Variables yang sama seperti di atas melalui **Site settings →
   Environment variables**.
5. Deploy.

## 🖨️ Cetak / Ekspor PDF

Klik **"Cetak / PDF"** di toolbar. Aplikasi otomatis berpindah ke mode "Tampilan Dokumen Resmi"
dan membuka dialog cetak browser dengan layout rapi (sidebar & toolbar disembunyikan via
`@media print`, ukuran halaman A4). Pilih **"Save as PDF"** / **"Simpan sebagai PDF"** pada dialog
cetak untuk mengekspor sebagai file PDF.

## 🧩 Tech Stack

| Layer            | Teknologi                                   |
| ----------------- | -------------------------------------------- |
| Framework         | Next.js 14 (App Router), TypeScript          |
| Styling           | Tailwind CSS, komponen ala Shadcn UI          |
| State Management  | Zustand (+ middleware `persist`)             |
| Ikon              | lucide-react                                  |
| Backend penyimpanan | Google Apps Script (Google Sheets sebagai DB) |
| Deployment target | Vercel / Netlify                              |

## 📄 Lisensi

Bebas digunakan dan dimodifikasi untuk keperluan pendidikan.
