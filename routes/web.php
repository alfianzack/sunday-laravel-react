<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'courses' => [], // Will be populated by controller
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login')->middleware('guest');

Route::post('/login', function () {
    // Login logic will be handled by controller
})->name('login.post');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register')->middleware('guest');

Route::post('/register', function () {
    // Register logic will be handled by controller
})->name('register.post');

Route::post('/logout', function () {
    auth()->logout();
    return redirect('/');
})->name('logout');

Route::get('/courses', function () {
    return Inertia::render('Courses', [
        'courses' => [], // Will be populated by controller
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('courses');

Route::get('/courses/{id}', function ($id) {
    return Inertia::render('Courses/Show', [
        'course' => [], // Will be populated by controller
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('courses.show');

Route::get('/cart', function () {
    return Inertia::render('Cart', [
        'cart' => [], // Will be populated by controller
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('cart')->middleware('auth');

Route::post('/cart/{courseId}', function ($courseId) {
    // Add to cart logic will be handled by controller
})->name('cart.add')->middleware('auth');

Route::delete('/cart/{courseId}', function ($courseId) {
    // Remove from cart logic will be handled by controller
})->name('cart.remove')->middleware('auth');

Route::get('/checkout', function () {
    return Inertia::render('Checkout', [
        'cart' => [], // Will be populated by controller
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('checkout')->middleware('auth');

Route::post('/orders', function () {
    // Create order logic will be handled by controller
})->name('orders.create')->middleware('auth');

Route::get('/orders', function () {
    return Inertia::render('Orders', [
        'orders' => [], // Will be populated by controller
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('orders')->middleware('auth');

Route::get('/enrollments', function () {
    return Inertia::render('Enrollments', [
        'enrollments' => [], // Will be populated by controller
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('enrollments')->middleware('auth');

Route::get('/enrollments/{courseId}', function ($courseId) {
    return Inertia::render('Enrollments/Show', [
        'enrollment' => [], // Will be populated by controller
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('enrollments.show')->middleware('auth');

// Admin routes
Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Index', [
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    })->name('admin.index');

    Route::get('/courses', function () {
        return Inertia::render('Admin/Courses', [
            'courses' => [],
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    })->name('admin.courses');

    Route::get('/courses/create', function () {
        return Inertia::render('Admin/Courses/Create', [
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    })->name('admin.courses.create');

    Route::get('/courses/{id}', function ($id) {
        return Inertia::render('Admin/Courses/Show', [
            'course' => [],
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    })->name('admin.courses.show');

    Route::get('/orders', function () {
        return Inertia::render('Admin/Orders', [
            'orders' => [],
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    })->name('admin.orders');
});

