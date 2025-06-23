<?php

namespace App\Http\Resources\api;

use Helper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServicesResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'is_active' => $this->is_active,
            'slug' => $this->slug,
            'image' => $this->getFirstMediaUrl(Helper::SERVICES_COLLECTION) ?? null,
        ];
    }
}
