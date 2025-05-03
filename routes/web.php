<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TeamTypeController;
use App\Http\Controllers\UserTypeController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

    Route::resource('users/user-type', UserTypeController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    Route::put('users/user-type/{id}/toggle-status', [UserTypeController::class, 'toggleStatus']);
    Route::resource('teams/team-type', TeamTypeController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    Route::put('teams/team-type/{id}/toggle-status', [TeamTypeController::class, 'toggleStatus']);

    Route::resource('users', UserController::class);
    Route::get('update-company-info', [UserController::class, 'companyInfo']);
    Route::post('update-company', [UserController::class, 'updateCompany']);
    Route::resource('teams', TeamController::class);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
