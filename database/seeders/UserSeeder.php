<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'Think',
            'last_name' => 'Learning',
            'email' => 'admin@think-learning.com',
        ]);

        User::factory(2)->create();
    }
}
