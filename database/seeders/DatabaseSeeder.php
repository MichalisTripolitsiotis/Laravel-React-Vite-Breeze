<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $tenant = Tenant::create([
            'id' => 'hfma',
        ]);

        $tenant->domains()->create([
            'domain' => 'hfma.localhost'
        ]);

        $this->call(UserSeeder::class);
    }
}
