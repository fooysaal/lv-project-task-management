<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Inertia\Inertia;
use App\Models\TeamType;
use App\Models\TeamsUser;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::with(['teamType', 'users:id,name,email'])->get();

        return Inertia::render('teams/index', [
            'teams' => $teams,
        ]);
    }

    public function create()
    {
        return Inertia::render('teams/create', [
            'teamTypes' => TeamType::where('is_active', 1)->where('company_id', auth()->user()->company_id)->get(),
            'users' => User::where('company_id', auth()->user()->company_id)
            ->whereNotIn('user_type_id', [1, 2])
            ->whereNot('id', auth()->user()->id)
            ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'team_type_id' => 'required|exists:teams_users_types,id',
            'user_ids' => 'array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $team = new Team();
        $team->name = $validated['name'];
        $team->description = $validated['description'] ?? null;
        $team->teams_users_types_id = $validated['team_type_id'];
        $team->company_id = auth()->user()->company_id;
        $team->logo = null;
        $team->save();

        // Ensure unique user IDs
        $userIds = array_unique($validated['user_ids']);

        // Attach users (pivot table)
        $team->users()->attach($userIds);

        return redirect()->route('teams.index');
    }


    public function edit(Team $team)
    {
        return Inertia::render('teams/edit', [
            'team' => $team->load(['teamType', 'users']),
            'teamTypes' => TeamType::where('is_active', 1)->where('company_id', auth()->user()->company_id)->get(),
            'users' => User::where('company_id', auth()->user()->company_id)
            ->whereNotIn('user_type_id', [1, 2])
            ->whereNot('id', auth()->user()->id)
            ->get(),
        ]);
    }

    public function update(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'teams_users_types_id' => 'required|exists:teams_users_types,id',
            'user_ids' => 'array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $team->update($validated);

        if (isset($validated['user_ids'])) {
            $team->users()->sync($validated['user_ids']);
        }

        return redirect()->route('teams.index');
    }

    public function destroy(Team $team)
    {
        $team->users()->detach();
        $team->delete();

        return redirect()->route('teams.index');
    }
}
