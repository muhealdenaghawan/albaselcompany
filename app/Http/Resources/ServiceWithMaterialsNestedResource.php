<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceWithMaterialsNestedResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->service->id,
            'name' => $this->service->name,
            'description' => $this->service->description,
            'price' => $this->service->price,
            'slug' => $this->service->slug,
            'materials' => MaterialSummaryResource::collection($this->materials),
        ];
    }
}
