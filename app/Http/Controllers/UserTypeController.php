<?php

namespace App\Http\Controllers;

use App\Models\UserType;
use Illuminate\Http\Request;

class UserTypeController extends Controller
{
    public function index()
    {
        // Fetch all user types for the authenticated user's company
        $userTypes = UserType::where('company_id', auth()->user()->company_id)
            ->orderBy('name')
            ->get();
        // Return the user types to the view
        return inertia('user-type/index', [
            'userTypes' => $userTypes,
        ]);
    }

    public function create()
    {
        return inertia('user-type/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $validated['company_id'] = auth()->user()->company_id;

        UserType::create($validated);

        return redirect()->route('user-type.index')->with('success', 'User type created.');
    }

    public function edit(UserType $userType)
    {
        return inertia('user-type/edit', [
            'userType' => $userType,
        ]);
    }

    public function update(Request $request, UserType $userType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $userType->update($validated);

        return redirect()->route('user-type.index')->with('success', 'User type updated.');
    }

    public function toggleStatus($id)
    {
        $userType = UserType::findOrFail($id);

        $userType->is_active = !$userType->is_active;
        $userType->save();

        return redirect()->back()->with('success', 'Status updated.');
    }

    public function destroy(UserType $userType)
    {
        $userType->delete();

        return redirect()->route('user-type.index')->with('success', 'User type deleted.');
    }

}
