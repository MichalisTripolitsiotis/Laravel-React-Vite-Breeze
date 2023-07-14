<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

    const CENTRAL_DATABASE = 'landlord';

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'lead_contact_name',
            'lead_contact_email'
        ];
    }
}
