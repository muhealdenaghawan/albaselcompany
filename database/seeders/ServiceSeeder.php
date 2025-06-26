<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        Service::factory()->count(15)->create()->each(function ($service) {
            $service->addMedia(public_path('default-images/test.jpg'))
                ->preservingOriginal()
                ->toMediaCollection('services');
        });
    }
}
