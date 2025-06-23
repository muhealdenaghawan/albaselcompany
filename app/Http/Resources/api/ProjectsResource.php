<?php

namespace App\Http\Resources\api;

use Helper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => UserResource::make($this->whenLoaded('user')),
            'title' => $this->title,
            'description' => $this->description,
            'client_role' => optional($this->client)->role,
            'location' => $this->location,
            'quote_price' => $this->quote_price ?? 0,
            'status' => $this->status,
            'slug' => $this->slug,
            'file' => $this->getFirstMediaUrl(Helper::PROJECTS_COLLECTION) ?? null,

        ];
    }
}
