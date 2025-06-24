<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Helper;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'admin@admin.com',
            'role' => UserType::ADMIN,
            'password' => Hash::make('123456789'),
        ]);

        $user->addMedia(public_path('default-images/avatar-1.jpg'))
            ->preservingOriginal()
            ->toMediaCollection(Helper::PROFILE_COLLECTION);

        // $this->call(UserSeeder::class);
        // $this->call(ServiceSeeder::class);
        // $this->call(MaterialSeeder::class);
    }
}
