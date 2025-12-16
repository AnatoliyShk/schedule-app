<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('task', function () {
    return Inertia::render('task/Index');
})->middleware(['auth', 'verified'])->name('task');

Route::post('task', function () {
    Log::info(request()->all());
    return redirect()->route('task');
})->middleware(['auth', 'verified'])->name('task-create');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
