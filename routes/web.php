<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\TaskController;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('admin')->group(function () {
    Route::get('task', [TaskController::class, 'index'])->middleware(['auth', 'verified'])->name('task');
    Route::post('task', [TaskController::class, 'store'])->middleware(['auth', 'verified'])->name('task-create');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
