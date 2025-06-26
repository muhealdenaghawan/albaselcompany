<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            UserType::EMPLOYEE,
            UserType::CLIENT,
        ];

        User::factory()->count(15)->create()->each(function ($user) use ($roles) {
            $user->role = $roles[array_rand($roles)];
            $user->save();

            $user->addMedia(public_path('default-images/avatar-1.jpg'))
                ->preservingOriginal()
                ->toMediaCollection('profile');
        });
    }
}
