<?php

use App\Http\Controllers\LeverancierController;
use App\Http\Controllers\MagazijnController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'role:Magazijnmedewerker'])->group(function () {
    // Opdracht 1: Overzicht Magazijn Jamin
    Route::get('/magazijn', [MagazijnController::class, 'index'])->name('magazijn.index');
    Route::get('/magazijn/levering/{productId}', [MagazijnController::class, 'levering'])->name('magazijn.levering');
    Route::get('/magazijn/allergenen/{productId}', [MagazijnController::class, 'allergenen'])->name('magazijn.allergenen');

    // Opdracht 2: User Story 1 (Overzicht Leveranciers) & User Story 2 (Toevoegen Producten)
    Route::get('/leveranciers', [LeverancierController::class, 'index'])->name('leverancier.index');
    Route::get('/leveranciers/{leverancierId}/producten', [LeverancierController::class, 'producten'])->name('leverancier.producten');
    Route::get('/leveranciers/{leverancierId}/producten/{productId}/levering', [LeverancierController::class, 'createLevering'])->name('leverancier.levering.create');
    Route::post('/leveranciers/{leverancierId}/producten/{productId}/levering', [LeverancierController::class, 'storeLevering'])->name('leverancier.levering.store');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
