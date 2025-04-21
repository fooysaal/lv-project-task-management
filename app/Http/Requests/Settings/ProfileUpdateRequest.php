<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],

            'username' => [
                'required',
                'string',
                'lowercase',
                'alpha_dash',
                'max:30',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'phone' => [
                'nullable',
                'numeric',
                'digits_between:11,15',
                'regex:/^\+?[0-9]{1,4}?[0-9]{7,14}$/', // E.164 format
            ],
            'avatar' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,gif,webp,svg',
                'max:2048', // 2MB
            ],
        ];
    }
}
