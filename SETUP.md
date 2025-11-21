# Setup Laravel + InertiaJS + React

## Prerequisites

- PHP >= 8.1
- Composer
- Node.js >= 18
- npm atau yarn
- MySQL atau database lainnya

## Langkah-langkah Setup

### 1. Install Dependencies PHP

```bash
composer install
```

### 2. Install Dependencies Node.js

```bash
npm install
```

### 3. Setup Environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit file `.env` dan sesuaikan:
- Database configuration
- `VITE_API_URL` untuk URL backend API (default: http://localhost:5000)

### 4. Setup Database

```bash
php artisan migrate
```

### 5. Register Middleware

Pastikan middleware `HandleInertiaRequests` sudah terdaftar di `bootstrap/app.php` atau `app/Http/Kernel.php`:

```php
// Di bootstrap/app.php atau app/Http/Kernel.php
protected $middlewareGroups = [
    'web' => [
        // ... middleware lainnya
        \App\Http\Middleware\HandleInertiaRequests::class,
    ],
];
```

Dan register `AdminMiddleware`:

```php
protected $routeMiddleware = [
    // ... middleware lainnya
    'admin' => \App\Http\Middleware\AdminMiddleware::class,
];
```

### 6. Build Assets

Untuk development:
```bash
npm run dev
```

Untuk production:
```bash
npm run build
```

### 7. Jalankan Server

```bash
php artisan serve
```

Akses aplikasi di `http://localhost:8000`

## Struktur Folder

```
laravel-react/
├── app/
│   └── Http/
│       └── Middleware/
│           ├── HandleInertiaRequests.php
│           └── AdminMiddleware.php
├── resources/
│   ├── js/
│   │   ├── Pages/          # Halaman InertiaJS
│   │   ├── Components/     # Komponen React reusable
│   │   ├── lib/            # Utility functions
│   │   └── app.tsx         # Entry point
│   ├── css/
│   │   └── app.css         # Global CSS
│   └── views/
│       └── app.blade.php   # Root template
├── routes/
│   └── web.php             # Routes Laravel
└── package.json            # Dependencies Node.js
```

## Catatan Penting

1. **Backend API**: Pastikan backend API berjalan di URL yang sesuai dengan `VITE_API_URL` di `.env`
2. **Authentication**: Implementasi authentication harus dilakukan di Laravel backend
3. **File Upload**: Pastikan folder `storage` dan `public/storage` sudah di-link:
   ```bash
   php artisan storage:link
   ```
4. **Admin Routes**: Semua route admin memerlukan middleware `auth` dan `admin`

## Troubleshooting

### Error: Page not found
- Pastikan nama file di `resources/js/Pages/` sesuai dengan yang dipanggil di routes
- Pastikan export default sudah benar di setiap page

### Error: Cannot find module
- Jalankan `npm install` ulang
- Pastikan path alias `@` sudah dikonfigurasi di `vite.config.ts` dan `tsconfig.json`

### Error: Inertia not working
- Pastikan middleware `HandleInertiaRequests` sudah terdaftar
- Pastikan `@inertiajs/react` sudah terinstall
- Cek console browser untuk error JavaScript

