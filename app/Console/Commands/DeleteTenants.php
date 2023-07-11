<?php

namespace App\Console\Commands;

use App\Models\Tenant;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Console\Output\ConsoleOutput;

class DeleteTenants extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tenants:delete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deletes all Tenants, migrates and seed the database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $console = new ConsoleOutput;
        $console->writeln('Starting Tenants delete...');

        $tenants = Tenant::all();

        $console->writeln('Found ' . count($tenants) . ' tenants.');

        foreach ($tenants as $tenant) {
            $tenant->delete();
            $console->writeln('Tenant ' . $tenant->id . ' deleted.');
        }

        return 1;
    }
}
