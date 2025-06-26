<?php

namespace App\Http\Requests\api;

use App\Enums\ProjectsStatus;
use Illuminate\Foundation\Http\FormRequest;

class UpdatestatusPriceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => 'required|in:' . implode(',', ProjectsStatus::getValues()),
            'quote_price' => 'required|numeric',
        ];
    }
}
