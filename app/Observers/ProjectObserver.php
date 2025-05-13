<?php

namespace App\Observers;

use App\Models\Project;
use Illuminate\Support\Facades\Cache;

class ProjectObserver
{

    public function saved(Project $project)
    {
        $this->clearDashboardCache($project->company_id);
    }

    public function deleted(Project $project)
    {
        $this->clearDashboardCache($project->company_id);
    }

    protected function clearDashboardCache($companyId)
    {
        Cache::forget('dashboard-stats:org:' . $companyId);
    }
}
