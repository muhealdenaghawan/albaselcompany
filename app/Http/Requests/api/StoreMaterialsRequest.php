<?php

namespace App\Http\Requests\api;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaterialsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
             'name' => 'required|string|unique:materials,name|max:255',
            'is_available' => 'required|boolean',
            'quantity' => 'required|numeric|min:1',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
