<?php

use App\Http\Controllers\PhoneVerificationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Base Routes
|--------------------------------------------------------------------------
|
| These routes are used from both the web.php & tenant.php files.
|
*/

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    } else {
        return redirect()->route('login');
    }
});

Route::prefix('/verify')->group(function () {
    Route::get('/phone', [PhoneVerificationController::class, 'index'])->name('verify.phone');
    Route::post('/phone', [PhoneVerificationController::class, 'verify'])->name('verify.phone.verify');
});


Route::middleware(['auth', 'verified', 'phone_verify'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
