<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\CompanyProjectRepository;

class CompanyProjectRepositoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('repositories')
            ->where('company_id', auth()->user()->company_id)
            ->get();

        return inertia('Projects/Repositories/Index', [
            'project' => $projects,
            'repositoryTypes' => [
                'github' => 'GitHub',
                'gitlab' => 'GitLab',
                'bitbucket' => 'Bitbucket',
                'azure' => 'Azure DevOps',
                'other' => 'Other'
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::where('company_id', auth()->user()->company_id)
            ->whereDoesntHave('repositories') // assumes a `repository` relation
            ->get(['id', 'name']);

        return inertia('Projects/Repositories/Create', [
            'projects' => $projects,
            'types' => [
                'github' => 'GitHub',
                'gitlab' => 'GitLab',
                'bitbucket' => 'Bitbucket',
                'azure' => 'Azure DevOps',
                'other' => 'Other'
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Project $project)
    {
        $validated = $request->validate([
            'type' => ['required', Rule::in(['github', 'gitlab', 'bitbucket', 'azure', 'other'])],
            'url' => ['required', 'url', 'max:255'],
            'display_name' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:255']
        ]);

        $project->repositories()->create([
            ...$validated,
            'company_id' => $project->company_id
        ]);

        return redirect()->route('projects.repositories.index', $project)
            ->with('success', 'Repository added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CompanyProjectRepository $companyProjectRepository)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project, CompanyProjectRepository $companyProjectRepository)
    {
        return inertia('Projects/Repositories/Edit', [
            'project' => $project,
            'repository' => $companyProjectRepository,
            'types' => [
                'github' => 'GitHub',
                'gitlab' => 'GitLab',
                'bitbucket' => 'Bitbucket',
                'azure' => 'Azure DevOps',
                'other' => 'Other',
            ],
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CompanyProjectRepository $companyProjectRepository)
    {
        $validated = $request->validate([
            'type' => ['required', Rule::in(['github', 'gitlab', 'bitbucket', 'azure', 'other'])],
            'url' => ['required', 'url', 'max:255'],
            'display_name' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:255']
        ]);

        $project = Project::where('company_id', auth()->user()->company_id)->get();
        $repository = $companyProjectRepository;

        $repository->update($validated);

        return redirect()->route('projects.repositories.index', $project)
            ->with('success', 'Repository updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, CompanyProjectRepository $companyProjectRepository)
    {
        $companyProjectRepository->delete();

        return redirect()->route('projects.repositories.index', $project)
            ->with('success', 'Repository removed successfully.');
    }
}
