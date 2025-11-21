# Quick Start Guide

Panduan cepat untuk menjalankan proyek Laravel + InertiaJS + React.

## Langkah-langkah Cepat

### 1. Masuk ke folder proyek
```bash
cd laravel-react
```

### 2. Install Dependencies

**Install dependencies PHP (Laravel):**
```bash
composer install
```

**Install dependencies Node.js (React + InertiaJS):**
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Konfigurasi Database

Edit file `.env` dan sesuaikan konfigurasi database:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=username
DB_PASSWORD=password

VITE_API_URL=http://localhost:5000
```

### 5. Setup Database
```bash
php artisan migrate
```

### 6. Link Storage (untuk file upload)
```bash
php artisan storage:link
```

### 7. Jalankan Development Server

**Terminal 1 - Laravel Server:**
```bash
php artisan serve
```

**Terminal 2 - Vite Dev Server (untuk hot reload):**
```bash
npm run dev
```

### 8. Akses Aplikasi

Buka browser dan akses: `http://localhost:8000`

## Catatan Penting

- **Composer install** diperlukan untuk menginstall semua package PHP/Laravel (termasuk InertiaJS Laravel adapter)
- **npm install** diperlukan untuk menginstall semua package Node.js (React, InertiaJS React, Vite, Tailwind, dll)
- Pastikan backend API sudah berjalan di `http://localhost:5000` atau sesuaikan `VITE_API_URL` di `.env`
- Untuk production, jalankan `npm run build` sebelum deploy

## Troubleshooting

### Error saat composer install
- Pastikan PHP >= 8.1 sudah terinstall
- Pastikan Composer sudah terinstall dan up-to-date
- Cek koneksi internet untuk download packages

### Error saat npm install
- Pastikan Node.js >= 18 sudah terinstall
- Pastikan npm sudah terinstall
- Coba hapus `node_modules` dan `package-lock.json` lalu jalankan `npm install` lagi

### Error saat php artisan serve
- Pastikan port 8000 tidak digunakan aplikasi lain
- Pastikan semua dependencies sudah terinstall dengan benar

### Error saat npm run dev
- Pastikan port 5173 tidak digunakan aplikasi lain
- Pastikan semua npm dependencies sudah terinstall
- Cek file `vite.config.ts` sudah benar

