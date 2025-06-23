<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialSummaryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->material->id,
            'name' => $this->material->name,
            'quantity_used' => $this->quantity_used,
            'price' => $this->price,
        ];
    }
}
