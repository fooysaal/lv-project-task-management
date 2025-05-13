<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Project;
use App\Models\ProjectsTask;
use App\Observers\UserObserver;
use App\Observers\ProjectObserver;
use App\Observers\ProjectsTaskObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Project::observe(ProjectObserver::class);
        ProjectsTask::observe(ProjectsTaskObserver::class);
        User::observe(UserObserver::class);
    }
}
