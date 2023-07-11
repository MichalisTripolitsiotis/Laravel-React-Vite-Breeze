<?php

namespace Database\Seeders\Tenant;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'user',
            'email' => 'user@example.com',
            'password' => 'password'
        ]);

        \App\Models\User::factory(10)->create();
    }
}
