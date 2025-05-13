<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeamTypeController;
use App\Http\Controllers\UserTypeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectTaskController;
use App\Http\Controllers\ProjectsCategoryController;
use App\Http\Controllers\CompanyProjectRepositoryController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/support', function () {
    return Inertia::render('settings/support');
})->name('support');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])
        ->middleware('role:admin,superadmin')
        ->name('dashboard');

    Route::get('manager-dashboard', [DashboardController::class, 'manager'])
        ->middleware('role:project manager')
        ->name('manager.dashboard');

    Route::get('user-dashboard', [DashboardController::class, 'user'])
        ->middleware('role:user,developer')
        ->name('user.dashboard');

    Route::resource('users/user-type', UserTypeController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    Route::put('users/user-type/{id}/toggle-status', [UserTypeController::class, 'toggleStatus']);
    Route::resource('teams/team-type', TeamTypeController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    Route::put('teams/team-type/{id}/toggle-status', [TeamTypeController::class, 'toggleStatus']);

    Route::resource('project-categories', ProjectsCategoryController::class);
    Route::put('project-categories/{id}/toggle-status', [ProjectsCategoryController::class, 'toggleStatus']);

    Route::resource('users', UserController::class);
    Route::put('users/{id}/toggle-status', [UserController::class, 'toggleStatus']);
    Route::get('update-company-info', [UserController::class, 'companyInfo']);
    Route::post('update-company', [UserController::class, 'updateCompany']);
    Route::resource('teams', TeamController::class);

    // repostories
    Route::prefix('projects')->group(function () {
        Route::resource('repositories', CompanyProjectRepositoryController::class)
        ->except(['show'])
        ->names([
            'index' => 'projects.repositories.index',
            'create' => 'projects.repositories.create',
            'store' => 'projects.repositories.store',
            'edit' => 'projects.repositories.edit',
            'update' => 'projects.repositories.update',
            'destroy' => 'projects.repositories.destroy',
        ]);
        // projects tasks
        Route::resource('tasks', ProjectTaskController::class)
            ->except(['show'])
            ->names([
            'index' => 'projects.tasks.index',
            'create' => 'projects.tasks.create',
            'store' => 'projects.tasks.store',
            'edit' => 'projects.tasks.edit',
            'update' => 'projects.tasks.update',
            'destroy' => 'projects.tasks.destroy',
        ]);

        Route::put('tasks/{id}/update-status', [ProjectTaskController::class, 'updateStatus'])->name('projects.tasks.updateStatus');
    });
    Route::resource('projects', ProjectController::class);
    Route::put('projects/{id}/update-status', [ProjectController::class, 'updateStatus'])->name('projects.updateStatus');
    Route::post('/projects/{project}/restore', [ProjectController::class, 'restore'])->name('projects.restore');
    Route::delete('/projects/{project}/force-delete', [ProjectController::class, 'forceDelete'])->name('projects.forceDelete');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
