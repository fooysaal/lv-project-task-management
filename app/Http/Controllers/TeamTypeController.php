<?php

namespace App\Http\Controllers;

use App\Models\TeamType;
use Illuminate\Http\Request;

class TeamTypeController extends Controller
{
    public function index()
    {
        // Fetch all user types for the authenticated user's company
        $teamTypes = TeamType::where('company_id', auth()->user()->company_id)
            ->orWhere('company_id', null)
            ->orderBy('name')
            ->get();
        // Return the user types to the view
        return inertia('team-type/index', [
            'teamTypes' => $teamTypes,
        ]);
    }

    public function create()
    {
        return inertia('team-type/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $validated['company_id'] = auth()->user()->company_id;

        TeamType::create($validated);

        return redirect()->route('team-type.index')->with('success', 'Team type created.');
    }

    public function edit(TeamType $teamType)
    {
        return inertia('team-type/edit', [
            'teamType' => $teamType,
        ]);
    }

    public function update(Request $request, TeamType $teamType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $teamType->update($validated);

        return redirect()->route('team-type.index')->with('success', 'Team type updated.');
    }

    public function toggleStatus($id)
    {
        $teamType = TeamType::findOrFail($id);

        $teamType->is_active = !$teamType->is_active;
        $teamType->save();

        return redirect()->back()->with('success', 'Status updated.');
    }

    public function destroy(TeamType $teamType)
    {
        $teamType->delete();

        return redirect()->route('team-type.index')->with('success', 'Team type deleted.');
    }

}
