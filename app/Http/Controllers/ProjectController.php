<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\ProjectsCategory;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->user()->user_type_id == 1 || auth()->user()->user_type_id == 2) {
        $projects = Project::with(['team', 'category'])
                    ->withTrashed()
                    ->where('company_id', auth()->user()->company_id)
                    ->get();
        } else {
            $projects = Project::with(['team', 'category'])
                ->where('company_id', auth()->user()->company_id)
                ->where('team_id', auth()->user()->team_id)
                ->get();
        }

        return inertia('Projects/Index', [
            'projects' => $projects
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Projects/Create', [
            'teams' => Team::where('company_id', auth()->user()->company_id)->get(['id', 'name']),
            'categories' => ProjectsCategory::where('company_id', auth()->user()->company_id)->get(['id', 'name']),
            'currencies' => ['BDT', 'USD', 'EUR', 'INR'],
            'statuses' => ['pending', 'in progress', 'completed'],
            'priorities' => ['low', 'medium', 'high'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'priority' => 'required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'progress' => 'nullable|integer|min:0|max:100',
            'budget' => 'nullable|numeric',
            'currency' => 'required|string|max:10',
            'team_id' => 'required|exists:teams,id',
            'project_category_id' => 'required|exists:projects_categories,id',
            'attachments' => 'nullable|array',
        ]);

        $data['company_id'] = auth()->user()->company_id;

        Project::create($data);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
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
        $project = Project::with(['team', 'category'])
            ->where('company_id', auth()->user()->company_id)
            ->findOrFail($id);

        return inertia('Projects/Edit', [
            'project' => $project,
            'teams' => Team::where('company_id', auth()->user()->company_id)->get(['id', 'name']),
            'categories' => ProjectsCategory::where('company_id', auth()->user()->company_id)->get(['id', 'name']),
            'currencies' => ['USD', 'EUR', 'GBP', 'INR'], // customize as needed
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'priority' => 'required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'progress' => 'nullable|integer|min:0|max:100',
            'budget' => 'nullable|numeric',
            'currency' => 'required|string|max:10',
            'team_id' => 'required|exists:teams,id',
            'project_category_id' => 'required|exists:projects_categories,id',
            'attachments' => 'nullable|array',
        ]);

        $project->update($data);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function updateStatus(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $project->status = $request->input('status', $project->status);
        $project->progress = $request->input('progress', $project->progress);
        $project->save();

        return redirect()->route('projects.index')->with('success', 'Project status updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }

    public function restore($id)
    {
        $project = Project::withTrashed()->findOrFail($id);
        $project->restore();

        return redirect()->route('projects.index')->with('success', 'Project restored successfully.');
    }

    public function forceDelete($id)
    {
        $project = Project::withTrashed()->findOrFail($id);
        $project->forceDelete();

        return redirect()->route('projects.index')->with('success', 'Project permanently deleted successfully.');
    }
}
