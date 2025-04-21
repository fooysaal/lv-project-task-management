<?php

namespace App\Rules\Custom;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class EmailOrUsername implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Check if the value is a valid email address
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return;
        }

        // Check if the value is a valid username (assuming usernames are alphanumeric)
        if (! preg_match('/^[a-zA-Z0-9_]+$/', $value)) {
            $fail('The :attribute must be a valid email address or username.');
        }
    }
}
