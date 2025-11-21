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
    $user = session('user');
    $api = new \App\Services\ApiService();
    
    // Get courses from Node.js backend
    $courses = $api->get('courses') ?? [];
    
    return Inertia::render('Home', [
        'courses' => $courses,
        'auth' => [
            'user' => $user,
        ],
    ]);
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login')->middleware('guest');

Route::post('/login', function (\Illuminate\Http\Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $api = new \App\Services\ApiService();
    
    // Call Node.js backend to authenticate
    $response = $api->post('auth/login', [
        'email' => $request->email,
        'password' => $request->password,
    ]);

    if ($response && isset($response['user']) && isset($response['token'])) {
        // Store user and token in session
        session([
            'user' => $response['user'],
            'token' => $response['token'],
        ]);
        
        // Redirect admin to admin dashboard, others to home or intended page
        if (($response['user']['role'] ?? null) === 'admin') {
            return redirect()->intended('/admin');
        }
        
        return redirect()->intended('/');
    }

    // If login fails, return back with error
    return back()->withErrors([
        'email' => $response['error'] ?? 'Email atau password salah.',
    ])->onlyInput('email');
})->name('login.post');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register')->middleware('guest');

Route::post('/register', function (\Illuminate\Http\Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'password' => 'required|string|min:6',
    ]);

    $api = new \App\Services\ApiService();
    
    // Call Node.js backend to register
    $response = $api->post('auth/register', [
        'name' => $request->name,
        'email' => $request->email,
        'password' => $request->password,
    ]);

    if ($response && isset($response['user']) && isset($response['token'])) {
        // Store user and token in session
        session([
            'user' => $response['user'],
            'token' => $response['token'],
        ]);
        
        // Redirect to home
        return redirect('/');
    }

    // If registration fails, return back with error
    return back()->withErrors([
        'email' => $response['error'] ?? 'Registration failed. Please try again.',
    ])->onlyInput('email', 'name');
})->name('register.post');

Route::match(['get', 'post'], '/logout', function () {
    // Logout di-handle oleh Node.js backend
    // Hapus session di Laravel
    session()->forget('user');
    session()->forget('token');
    session()->flush();
    return redirect('/');
})->name('logout');

Route::get('/courses', function () {
    $api = new \App\Services\ApiService();
    
    // Get courses from Node.js backend
    $courses = $api->get('courses') ?? [];
    
    return Inertia::render('Courses', [
        'courses' => $courses,
        'auth' => [
            'user' => session('user'),
        ],
    ]);
})->name('courses');

Route::get('/courses/{id}', function ($id) {
    $api = new \App\Services\ApiService();
    
    // Get course detail from Node.js backend
    $course = $api->get("courses/{$id}");
    
    if (!$course) {
        abort(404, 'Course not found');
    }
    
    return Inertia::render('Courses/Show', [
        'course' => $course,
        'auth' => [
            'user' => session('user'),
        ],
    ]);
})->name('courses.show');

Route::get('/cart', function () {
    $api = new \App\Services\ApiService();
    
    // Get cart from Node.js backend
    $cart = $api->get('cart') ?? [];
    
    return Inertia::render('Cart', [
        'cart' => $cart,
        'auth' => [
            'user' => session('user'),
        ],
    ]);
})->name('cart')->middleware('auth');

Route::post('/cart/{courseId}', function ($courseId) {
    $api = new \App\Services\ApiService();
    
    // Add course to cart via Node.js backend
    $response = $api->post("cart/{$courseId}");
    
    if ($response) {
        return redirect()->route('cart')->with('success', 'Course added to cart');
    }
    
    return back()->withErrors(['error' => 'Failed to add course to cart']);
})->name('cart.add')->middleware('auth');

Route::delete('/cart/{courseId}', function ($courseId) {
    $api = new \App\Services\ApiService();
    
    // Remove course from cart via Node.js backend
    $response = $api->delete("cart/{$courseId}");
    
    if ($response) {
        return redirect()->route('cart')->with('success', 'Course removed from cart');
    }
    
    return back()->withErrors(['error' => 'Failed to remove course from cart']);
})->name('cart.remove')->middleware('auth');

Route::get('/checkout', function () {
    $api = new \App\Services\ApiService();
    
    // Get cart from Node.js backend
    $cart = $api->get('cart') ?? [];
    
    if (empty($cart)) {
        return redirect()->route('cart')->withErrors(['error' => 'Cart is empty']);
    }
    
    return Inertia::render('Checkout', [
        'cart' => $cart,
        'auth' => [
            'user' => session('user'),
        ],
    ]);
})->name('checkout')->middleware('auth');

Route::post('/orders', function (\Illuminate\Http\Request $request) {
    $api = new \App\Services\ApiService();
    
    // Create order via Node.js backend
    // Note: File upload for payment proof should be handled separately
    $data = $request->except(['_token', 'payment_proof']);
    
    if ($request->hasFile('payment_proof')) {
        // For file upload, we need to send as multipart
        $file = $request->file('payment_proof');
        $response = \Illuminate\Support\Facades\Http::withHeaders([
            'Authorization' => 'Bearer ' . session('token'),
        ])->attach('payment_proof', file_get_contents($file->getRealPath()), $file->getClientOriginalName())
          ->post(config('services.api.url') . '/orders', $data);
        
        if ($response->successful()) {
            return redirect()->route('orders')->with('success', 'Order created successfully');
        }
    } else {
        $response = $api->post('orders', $data);
        
        if ($response) {
            return redirect()->route('orders')->with('success', 'Order created successfully');
        }
    }
    
    return back()->withErrors(['error' => 'Failed to create order']);
})->name('orders.create')->middleware('auth');

Route::get('/orders', function () {
    $api = new \App\Services\ApiService();
    
    // Get orders from Node.js backend
    $orders = $api->get('orders') ?? [];
    
    return Inertia::render('Orders', [
        'orders' => $orders,
        'auth' => [
            'user' => session('user'),
        ],
    ]);
})->name('orders')->middleware('auth');

Route::get('/enrollments', function () {
    $api = new \App\Services\ApiService();
    
    // Get enrollments from Node.js backend
    $enrollments = $api->get('enrollments') ?? [];
    
    return Inertia::render('Enrollments', [
        'enrollments' => $enrollments,
        'auth' => [
            'user' => session('user'),
        ],
    ]);
})->name('enrollments')->middleware('auth');

Route::get('/enrollments/{courseId}', function ($courseId) {
    $api = new \App\Services\ApiService();
    
    // Get enrollment detail with course videos from Node.js backend
    $enrollment = $api->get("enrollments/{$courseId}");
    
    if (!$enrollment) {
        abort(403, 'You are not enrolled in this course');
    }
    
    return Inertia::render('Enrollments/Show', [
        'enrollment' => $enrollment,
        'auth' => [
            'user' => session('user'),
        ],
    ]);
})->name('enrollments.show')->middleware('auth');

// Admin routes
Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', function () {
        $api = new \App\Services\ApiService();
        
        // Get admin dashboard data from Node.js backend
        $courses = $api->get('courses') ?? [];
        $orders = $api->get('admin/orders') ?? [];
        
        return Inertia::render('Admin/Index', [
            'courses' => $courses,
            'orders' => $orders,
            'auth' => [
                'user' => session('user'),
            ],
        ]);
    })->name('admin.index');

    Route::get('/courses', function () {
        $api = new \App\Services\ApiService();
        
        // Get all courses from Node.js backend
        $courses = $api->get('courses') ?? [];
        
        return Inertia::render('Admin/Courses', [
            'courses' => $courses,
            'auth' => [
                'user' => session('user'),
            ],
        ]);
    })->name('admin.courses');

    Route::get('/courses/create', function () {
        return Inertia::render('Admin/Courses/Create', [
            'auth' => [
                'user' => session('user'),
            ],
        ]);
    })->name('admin.courses.create');

    Route::get('/courses/{id}', function ($id) {
        $api = new \App\Services\ApiService();
        
        // Get course detail from Node.js backend
        $course = $api->get("courses/{$id}");
        
        if (!$course) {
            abort(404, 'Course not found');
        }
        
        return Inertia::render('Admin/Courses/Show', [
            'course' => $course,
            'auth' => [
                'user' => session('user'),
            ],
        ]);
    })->name('admin.courses.show');

    Route::get('/orders', function () {
        $api = new \App\Services\ApiService();
        
        // Get all orders from Node.js backend (admin view)
        $orders = $api->get('admin/orders') ?? [];
        
        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
            'auth' => [
                'user' => session('user'),
            ],
        ]);
    })->name('admin.orders');

    Route::patch('/orders/{orderId}/confirm', function ($orderId) {
        // Use Http directly for PATCH request
        $response = \Illuminate\Support\Facades\Http::withHeaders([
            'Authorization' => 'Bearer ' . session('token'),
        ])->patch(config('services.api.url') . "/admin/orders/{$orderId}/confirm");
        
        if ($response->successful()) {
            return redirect()->route('admin.orders')->with('success', 'Payment confirmed successfully');
        }
        
        return back()->withErrors(['error' => $response->json()['error'] ?? 'Failed to confirm payment']);
    })->name('admin.orders.confirm');

    // Create course
    Route::post('/courses', function (\Illuminate\Http\Request $request) {
        $api = new \App\Services\ApiService();
        
        // Prepare form data for file upload
        $data = $request->except(['_token', 'thumbnail', 'preview_video']);
        
        // For file upload, we need to use Http directly
        $http = \Illuminate\Support\Facades\Http::withHeaders([
            'Authorization' => 'Bearer ' . session('token'),
        ]);
        
        // Add files if present
        if ($request->hasFile('thumbnail')) {
            $http = $http->attach('thumbnail', file_get_contents($request->file('thumbnail')->getRealPath()), $request->file('thumbnail')->getClientOriginalName());
        }
        if ($request->hasFile('preview_video')) {
            $http = $http->attach('preview_video', file_get_contents($request->file('preview_video')->getRealPath()), $request->file('preview_video')->getClientOriginalName());
        }
        
        $response = $http->post(config('services.api.url') . '/admin/courses', $data);
        
        if ($response->successful()) {
            $courseData = $response->json();
            return redirect()->route('admin.courses.show', $courseData['course']['id'])->with('success', 'Course created successfully');
        }
        
        return back()->withErrors(['error' => $response->json()['error'] ?? 'Failed to create course']);
    })->name('admin.courses.store');

    // Edit course page
    Route::get('/courses/{id}/edit', function ($id) {
        $api = new \App\Services\ApiService();
        
        // Get course detail from Node.js backend
        $course = $api->get("courses/{$id}");
        
        if (!$course) {
            abort(404, 'Course not found');
        }
        
        return Inertia::render('Admin/Courses/Edit', [
            'course' => $course,
            'auth' => [
                'user' => session('user'),
            ],
        ]);
    })->name('admin.courses.edit');

    // Update course
    Route::put('/courses/{id}', function (\Illuminate\Http\Request $request, $id) {
        $api = new \App\Services\ApiService();
        
        // Prepare form data for file upload
        $data = $request->except(['_token', '_method', 'thumbnail', 'preview_video']);
        
        // For file upload, we need to use Http directly
        $http = \Illuminate\Support\Facades\Http::withHeaders([
            'Authorization' => 'Bearer ' . session('token'),
        ]);
        
        // Add files if present
        if ($request->hasFile('thumbnail')) {
            $http = $http->attach('thumbnail', file_get_contents($request->file('thumbnail')->getRealPath()), $request->file('thumbnail')->getClientOriginalName());
        }
        if ($request->hasFile('preview_video')) {
            $http = $http->attach('preview_video', file_get_contents($request->file('preview_video')->getRealPath()), $request->file('preview_video')->getClientOriginalName());
        }
        
        $response = $http->put(config('services.api.url') . "/admin/courses/{$id}", $data);
        
        if ($response->successful()) {
            return redirect()->route('admin.courses.show', $id)->with('success', 'Course updated successfully');
        }
        
        return back()->withErrors(['error' => $response->json()['error'] ?? 'Failed to update course']);
    })->name('admin.courses.update');

    // Add video to course
    Route::post('/courses/{id}/videos', function (\Illuminate\Http\Request $request, $id) {
        $api = new \App\Services\ApiService();
        
        // Prepare form data for file upload
        $data = $request->except(['_token', 'video']);
        
        // For file upload, we need to use Http directly
        $http = \Illuminate\Support\Facades\Http::withHeaders([
            'Authorization' => 'Bearer ' . session('token'),
        ]);
        
        // Add video file if present
        if ($request->hasFile('video')) {
            $http = $http->attach('video', file_get_contents($request->file('video')->getRealPath()), $request->file('video')->getClientOriginalName());
        }
        
        $response = $http->post(config('services.api.url') . "/admin/courses/{$id}/videos", $data);
        
        if ($response->successful()) {
            return redirect()->route('admin.courses.show', $id)->with('success', 'Video added successfully');
        }
        
        return back()->withErrors(['error' => $response->json()['error'] ?? 'Failed to add video']);
    })->name('admin.courses.videos.store');

    // Update video
    Route::put('/courses/{courseId}/videos/{videoId}', function (\Illuminate\Http\Request $request, $courseId, $videoId) {
        $api = new \App\Services\ApiService();
        
        // Prepare form data for file upload
        $data = $request->except(['_token', '_method', 'video']);
        
        // For file upload, we need to use Http directly
        $http = \Illuminate\Support\Facades\Http::withHeaders([
            'Authorization' => 'Bearer ' . session('token'),
        ]);
        
        // Add video file if present
        if ($request->hasFile('video')) {
            $http = $http->attach('video', file_get_contents($request->file('video')->getRealPath()), $request->file('video')->getClientOriginalName());
        }
        
        $response = $http->put(config('services.api.url') . "/admin/courses/{$courseId}/videos/{$videoId}", $data);
        
        if ($response->successful()) {
            return redirect()->route('admin.courses.show', $courseId)->with('success', 'Video updated successfully');
        }
        
        return back()->withErrors(['error' => $response->json()['error'] ?? 'Failed to update video']);
    })->name('admin.courses.videos.update');

    // Delete video
    Route::delete('/courses/{courseId}/videos/{videoId}', function ($courseId, $videoId) {
        $api = new \App\Services\ApiService();
        
        // Delete video via Node.js backend
        $response = $api->delete("admin/courses/{$courseId}/videos/{$videoId}");
        
        if ($response) {
            return redirect()->route('admin.courses.show', $courseId)->with('success', 'Video deleted successfully');
        }
        
        return back()->withErrors(['error' => 'Failed to delete video']);
    })->name('admin.courses.videos.destroy');
});

