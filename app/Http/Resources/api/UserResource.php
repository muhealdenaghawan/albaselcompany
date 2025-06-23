<?php

namespace App\Http\Resources\api;

use Helper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'avatar' => $this->getFirstMediaUrl(Helper::PROFILE_COLLECTION) ?? null,
            'role' => $this->role,
            'created_at' => Carbon::parse($this->created_at)->format(Helper::DATE_TIME_FORMAT),
        ];
    }
}
