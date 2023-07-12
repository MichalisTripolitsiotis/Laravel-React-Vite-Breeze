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
            'first_name' => 'user',
            'last_name' => 'tenant',
            'email' => 'user@example.com',
            'password' => 'password'
        ]);

        \App\Models\User::factory(10)->create();
    }
}
