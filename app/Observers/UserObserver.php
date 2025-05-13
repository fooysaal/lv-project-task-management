<?php

namespace App\Observers;

use App\Models\User;
use Illuminate\Support\Facades\Cache;

class UserObserver
{
    public function saved(User $user)
    {
        $this->clearDashboardCache($user->company_id);
    }

    public function deleted(User $user)
    {
        $this->clearDashboardCache($user->company_id);
    }

    protected function clearDashboardCache($companyId)
    {
        Cache::forget('dashboard-stats:org:' . $companyId);
    }
}
