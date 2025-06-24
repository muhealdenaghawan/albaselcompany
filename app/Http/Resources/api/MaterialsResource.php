<?php

namespace App\Http\Resources\api;

use Helper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'is_available' => $this->is_available,
            'quantity' => $this->quantity,
            'slug' => $this->slug,
            'image' => $this->getFirstMediaUrl(Helper::MATERIALS_COLLECTION) ?? null,
        ];
    }
}
