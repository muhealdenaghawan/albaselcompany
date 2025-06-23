<?php

namespace App\Http\Requests\api;

use App\Enums\ProjectsStatus;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'file' => 'sometimes|file|mimes:pdf|max:2048',
            'location' => 'sometimes|string',
        ];
    }
}
