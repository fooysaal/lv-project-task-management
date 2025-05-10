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
        // Get the authenticated user's company ID
        $companyId = auth()->user()->company_id;

        // Fetch tasks where the related project's company_id matches the user's company
        $tasks = ProjectsTask::with(['project', 'assignedTo'])
            ->whereHas('project', function ($query) use ($companyId) {
                $query->where('company_id', $companyId);
            })
            ->get();

        // Return the tasks to the view
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
        //dd($request->all());
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
