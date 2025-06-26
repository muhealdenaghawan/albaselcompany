<?php

namespace App\Rules;

use App\Enums\UserType;
use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\Rule;


class IsEmployee implements Rule
{
    public function passes($attribute, $value): bool
    {
        $user = User::find($value);

        return $user && $user->role == UserType::EMPLOYEE();
    }

    public function message(): string
    {
        return 'The selected user must be an Employee.';
    }
}
