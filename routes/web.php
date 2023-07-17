<?php

use App\Http\Controllers\TenantController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware(['auth', 'verified', 'phone_verify'])->group(function () {
    Route::resource('tenants', TenantController::class);
    Route::resource('users', UserController::class);
    Route::get('users/{tenant}/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('users/{tenant}/{id}', [UserController::class, 'update'])->name('users.update');
});

require __DIR__ . '/base_routes.php';
