<?php

namespace App\Http\Requests\api;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|unique:projects,title|max:255',
            'description' => 'required|string',
            'file' => 'required|file|mimes:pdf|max:2048',
            'location' => 'required|string',
        ];
    }
}
