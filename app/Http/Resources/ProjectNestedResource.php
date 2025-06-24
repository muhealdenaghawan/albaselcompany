<?php

namespace App\Http\Resources;

use App\Http\Resources\api\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectNestedResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'user' => UserResource::make($this->user),
            'client' => UserResource::make($this->client),
            'description' => $this->description,
            'location' => $this->location,
            'status' => $this->status,
            'quote_price' => $this->quote_price,
            'slug' => $this->slug,
            'services' => ServiceWithMaterialsNestedResource::collection($this->projectServices),
        ];
    }
}
