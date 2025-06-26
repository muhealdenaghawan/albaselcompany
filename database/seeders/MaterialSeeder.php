<?php

namespace Database\Seeders;

use App\Models\Material;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        Material::factory()->count(15)->create()->each(function ($material) {
            $material->addMedia(public_path('default-images/test.jpg'))
                ->preservingOriginal()
                ->toMediaCollection('materials');
        });
    }
}
