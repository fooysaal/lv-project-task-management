<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'company_name' => 'required|string|max:255|unique:companies,name',
            'company_email' => 'required|email|unique:companies,email',
            'phone' => 'nullable|string|max:20|unique:companies,phone',
            'address' => 'nullable|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        DB::beginTransaction();

        try {
            // Create the company
            $company = Company::create([
                'name' => $request->company_name,
                'email' => $request->company_email,
                'phone' => $request->phone,
                'address' => $request->address,
            ]);

            // Create the user as SuperAdmin (user_type_id = 1)
            $user = User::create([
                'name' => $request->company_name, // You could add a separate field for user name if needed
                'email' => $request->company_email,
                'password' => Hash::make($request->password),
                'company_id' => $company->id,
                'user_type_id' => 1,
            ]);

            event(new Registered($user));

            DB::commit();

            Auth::login($user);

            return to_route('dashboard');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Something went wrong. Please try again.']);
        }
    }
}
