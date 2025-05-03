<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectsTask;
use App\Models\User;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $organizationId = auth()->user()->company_id;

        // Cache key specific to this organization
        $cacheKey = 'dashboard-stats:org:' . $organizationId;

        $stats = cache()->remember($cacheKey, now()->addMinutes(30), function() use ($organizationId) {
            $now = now();
            $lastMonthStart = $now->copy()->subDays(30);
            $twoMonthsAgoStart = $now->copy()->subDays(60);

            return [
                // User statistics
                'totalUsers' => User::where('company_id', $organizationId)->count(),
                'userTrend' => $this->calculateUserTrend($organizationId),

                // Project statistics
                'newProjects' => Project::where('company_id', $organizationId)
                    ->where('status', 'in_progress')->count(),
                'completedProjects' => Project::where('company_id', $organizationId)
                    ->where('status', 'completed')->count(),
                'projectTrend' => $this->calculateProjectTrend($organizationId),

                // Task statistics
                'pendingTasks' => ProjectsTask::whereHas('project', function($q) use ($organizationId) {
                        $q->where('company_id', $organizationId);
                    })
                    ->where('status', 'pending')->count(),
                'completedTasks' => ProjectsTask::whereHas('project', function($q) use ($organizationId) {
                        $q->where('company_id', $organizationId);
                    })
                    ->where('status', 'completed')->count(),
                'overdueTasks' => ProjectsTask::whereHas('project', function($q) use ($organizationId) {
                        $q->where('company_id', $organizationId);
                    })
                    ->where('due_date', '<', $now)
                    ->where('status', '!=', 'completed')
                    ->count(),
                'taskTrend' => $this->calculateTaskTrend($organizationId),

                // Timestamp for freshness indicator
                'lastUpdated' => $now->toDateTimeString(),
                'taskTrends' => $this->getTaskTrends($organizationId),
            ];
        });

        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    }

    protected function calculateUserTrend($organizationId)
    {
        $currentPeriodCount = User::where('company_id', $organizationId)
            ->where('created_at', '>=', now()->subDays(30))
            ->count();

        $previousPeriodCount = User::where('company_id', $organizationId)
            ->whereBetween('created_at', [now()->subDays(60), now()->subDays(30)])
            ->count();

        return $this->calculateTrend($currentPeriodCount, $previousPeriodCount);
    }

    protected function calculateProjectTrend($organizationId)
    {
        $currentPeriodCount = Project::where('company_id', $organizationId)
            ->where('status', 'in_progress')
            ->where('created_at', '>=', now()->subDays(30))
            ->count();

        $previousPeriodCount = Project::where('company_id', $organizationId)
            ->where('status', 'in_progress')
            ->whereBetween('created_at', [now()->subDays(60), now()->subDays(30)])
            ->count();

        return $this->calculateTrend($currentPeriodCount, $previousPeriodCount);
    }

    protected function calculateTaskTrend($organizationId)
    {
        $currentPeriodCount = ProjectsTask::whereHas('project', function($q) use ($organizationId) {
                $q->where('company_id', $organizationId);
            })
            ->where('status', 'completed')
            ->where('updated_at', '>=', now()->subDays(30))
            ->count();

        $previousPeriodCount = ProjectsTask::whereHas('project', function($q) use ($organizationId) {
                $q->where('company_id', $organizationId);
            })
            ->where('status', 'completed')
            ->whereBetween('updated_at', [now()->subDays(60), now()->subDays(30)])
            ->count();

        return $this->calculateTrend($currentPeriodCount, $previousPeriodCount);
    }

    private function calculateTrend($current, $previous)
    {
        if ($previous === 0) {
            return $current > 0 ? 100.0 : 0.0;
        }
        return round((($current - $previous) / $previous) * 100, 2);
    }

    protected function getTaskTrends($organizationId)
    {
        $endDate = now();
        $startDate = $endDate->copy()->subDays(90);

        // Group tasks by day and status
        $tasks = ProjectsTask::whereHas('project', function($q) use ($organizationId) {
                $q->where('company_id', $organizationId);
            })
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE(created_at) as date,
                    SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed,
                    SUM(CASE WHEN status != "completed" THEN 1 ELSE 0 END) as pending')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Format for chart
        return $tasks->map(function($item) {
            return [
                'date' => $item->date,
                'completed' => $item->completed,
                'pending' => $item->pending,
            ];
        });
    }
}
