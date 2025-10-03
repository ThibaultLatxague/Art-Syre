<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(10)->create();
        
        // Creation of a admin user
        User::factory()->create([
            'name' => 'Admin',
            'prenom' => 'Admin',
            'email' => env('ADMIN_1_EMAIL', ''),
            'estAdmin' => true,
            'password' => Hash::make(env('ADMIN_1_PWD', 'password')),
        ]);
    }
}
