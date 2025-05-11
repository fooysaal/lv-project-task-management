<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use App\Models\ProjectsTask;
use Illuminate\Http\Request;
use Illuminate\Console\View\Components\Task;

class ProjectTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $companyId = $user->company_id;

        $query = ProjectsTask::with(['project', 'assignedTo'])
            ->whereHas('project', function ($q) use ($companyId) {
                $q->where('company_id', $companyId);
            });

        // If the user is not an admin or manager (type_id 1 or 2), show only their assigned tasks
        if (!in_array($user->user_type_id, [1, 2])) {
            $query->where('assigned_to', $user->id);
        }

        $tasks = $query->latest()->get();

        return inertia('Projects/Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get the authenticated user's company ID
        $companyId = auth()->user()->company_id;

        // Fetch projects where the company_id matches the user's company
        $projects = Project::where('company_id', $companyId)
            ->where('deleted_at', null)
            ->with(['team.users'])
            ->get();

        return Inertia::render('Projects/Tasks/Create', [
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'required|exists:users,id',
            'due_date' => 'nullable|date',
        ]);

        $task = new ProjectsTask();
        $task->name = $request->name;
        $task->description = $request->description;
        $task->status = $request->status;
        $task->project_id = $request->project_id;
        $task->assigned_to = $request->assigned_to;
        $task->due_date = $request->due_date;
        $task->priority = $request->priority;
        $task->estimated_time = $request->estimated_time;
        $task->created_by = auth()->user()->id;
        $task->updated_by = auth()->user()->id;
        $task->attachments = $request->attachments ?? null; // Assuming attachments is a JSON field
        $task->save();

        return redirect()->route('projects.tasks.index')->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function updateStatus(Request $request, $taskId)
    {
        $request->validate([
            'status' => 'required|string',
            'progress' => 'required',
            'spent_time' => 'required',
        ]);

        $task = ProjectsTask::findOrFail($taskId);
        $task->status = $request->status ?? $task->status;
        $task->progress = $request->progress ?? $task->progress;
        $task->spent_time = $request->spent_time ?? $task->spent_time;
        $task->save();

        return redirect()->route('projects.tasks.index')->with('success', 'Task status updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($taskId)
    {
        $task = ProjectsTask::findOrFail($taskId);
        $task->delete();

        return redirect()->route('projects.tasks.index')->with('success', 'Task deleted successfully.');
    }
}
