<?php

namespace App\Observers;

use App\Models\ProjectsTask;
use Illuminate\Support\Facades\Cache;

class ProjectsTaskObserver
{
    public function saved(ProjectsTask $task)
    {
        $this->clearDashboardCache($task);
    }

    public function deleted(ProjectsTask $task)
    {
        $this->clearDashboardCache($task);
    }

    protected function clearDashboardCache(ProjectsTask $task)
    {
        $companyId = $task->project->company_id ?? null;

        if ($companyId) {
            Cache::forget('dashboard-stats:org:' . $companyId);
        }
    }
}
