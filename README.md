# Laravel + InertiaJS + React

Proyek ini menggunakan Laravel sebagai backend dan InertiaJS + React sebagai frontend.

## Setup

1. Install dependencies PHP (Laravel):
```bash
composer install
```

2. Install dependencies Node.js (React + InertiaJS):
```bash
npm install
```

3. Copy file `.env.example` ke `.env`:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Setup database di file `.env`

6. Run migrations:
```bash
php artisan migrate
```

7. Build assets untuk development:
```bash
npm run dev
```

8. Build assets untuk production:
```bash
npm run build
```

9. Jalankan Laravel server:
```bash
php artisan serve
```

## Struktur Folder

- `resources/js/Pages/` - Halaman-halaman InertiaJS
- `resources/js/Components/` - Komponen React yang dapat digunakan kembali
- `resources/js/lib/` - Utility functions
- `resources/css/` - File CSS

## Routes

Routes didefinisikan di `routes/web.php` menggunakan InertiaJS.

## Catatan

- Pastikan backend API berjalan di `http://localhost:5000` atau sesuaikan di `.env` dengan `VITE_API_URL`
- Semua komponen React sudah dikonversi dari `frontend-react` ke format InertiaJS
- Menggunakan Tailwind CSS untuk styling

