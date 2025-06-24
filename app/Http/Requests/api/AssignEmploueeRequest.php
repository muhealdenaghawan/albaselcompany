<?php

namespace App\Http\Requests\api;

use App\Rules\IsEmployee;
use Illuminate\Foundation\Http\FormRequest;

class AssignEmploueeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_id' => ['required', 'exists:users,id', new IsEmployee()],
        ];
    }
}
