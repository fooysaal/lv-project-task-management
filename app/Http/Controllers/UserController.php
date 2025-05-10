<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Storage;
use App\Models\User;
use Inertia\Inertia;
use App\Models\UserType;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('user/index', [
            'users' => User::where('company_id', auth()->user()->company_id)
                ->whereNot('id', auth()->user()->id)
                ->orderBy('name')
                ->with('userType')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('user/create', [
            'userTypes' => UserType::where(function ($query) {
                    $query->where('company_id', auth()->user()->company_id)
                          ->orWhereNull('company_id');
                })
                ->where('is_active', 1)
                ->select('id', 'name')
                ->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|min:11|unique:users,phone',
            'password' => 'required|string|min:8|confirmed',
            'user_type_id' => 'required|exists:user_types,id',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone ?? null,
            'user_type_id' => $request->user_type_id,
            'company_id' => auth()->user()->company_id,
        ]);
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
    public function edit(User $user)
    {
        return inertia('user/edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'user_type' => (string) $user->user_type_id,
            ],
            'userTypes' => UserType::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|min:11|unique:users,phone,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'user_type' => 'required|exists:user_types,id',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->user_type_id = $request->user_type;

        // password (if provided)
        if ($request->filled('password')) {
            $user->password = bcrypt($request->password);
        }

        // Save the updated user
        $user->save();

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Show the form for updating company information.
     */
    public function companyInfo()
    {
        return inertia('company/edit', [
            'company' => [Company::find(auth()->user()->company_id)],
        ]);
    }

    public function updateCompany(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'company_email' => 'required|string|email|max:255',
            'company_phone' => 'nullable|min:11',
            'company_address' => 'nullable|string|max:255',
            'company_logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $user = auth()->user();

        if ($request->hasFile('company_logo')) {
            // Delete the old logo if it exists
            if ($user->company_logo) {
                Storage::delete($user->company_logo);
            }

            // Store the new logo
            $path = $request->file('company_logo')->store('logos', 'public');
            $user->company_logo = $path;
        }

        $user->update([
            'company_name' => $request->company_name,
            'company_email' => $request->company_email,
            'company_phone' => $request->company_phone,
            'company_address' => $request->company_address,
        ]);

        return redirect()->back()->with('success', 'Company information updated successfully.');
    }
}
