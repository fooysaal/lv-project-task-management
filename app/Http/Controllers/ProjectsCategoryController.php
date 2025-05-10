<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ProjectsCategory;

class ProjectsCategoryController extends Controller
{
    public function index()
    {
        $categories = ProjectsCategory::latest()->get();
        return Inertia::render('project-categories/index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('project-categories/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        ProjectsCategory::create([
            ...$validated,
            'company_id' => auth()->user()->company_id, // if applicable
        ]);

        return redirect()->route('project-categories.index')->with('success', 'Category created successfully');
    }

    public function edit(ProjectsCategory $projectCategory)
    {
        return Inertia::render('project-categories/edit', [
            'category' => $projectCategory
        ]);
    }

    public function update(Request $request, ProjectsCategory $projectCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $projectCategory->update($validated);

        return redirect()->route('project-categories.index')->with('success', 'Category updated');
    }

    public function toggleStatus($id)
    {
        $projectCategory = ProjectsCategory::findOrFail($id);

        $projectCategory->is_active = !$projectCategory->is_active;
        $projectCategory->save();

        return redirect()->back()->with('success', 'Status updated.');
    }

    public function destroy(ProjectsCategory $projectCategory)
    {
        $projectCategory->delete();
        return redirect()->route('project-categories.index')->with('success', 'Category deleted');
    }
}
