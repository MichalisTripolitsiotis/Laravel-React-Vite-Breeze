<?php

namespace App\Http\Controllers;

use App\Http\Requests\TenantRequest;
use App\Models\Tenant;
use Inertia\Inertia;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $tenants = Tenant::all();
        return Inertia::render('Tenants/Index', ['tenants' => $tenants]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Tenants/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param TenantRequest $request
     * @return \Illuminate\Routing\Redirector|\Illuminate\Http\RedirectResponse
     */
    public function store(TenantRequest $request)
    {
        $tenant = Tenant::create($request->all());
        $url = str_replace('http://', '.', env('APP_URL'));

        $tenant->domains()->create([
            'domain' => $request->id . $url
        ]);

        return redirect()->route('tenants.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Inertia\Response
     */
    public function edit(Tenant $tenant)
    {
        return Inertia::render('Tenants/Edit', [
            'tenant' => $tenant
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param TenantRequest $request
     * @param Tenant $tenant
     *
     * @return \Illuminate\Routing\Redirector|\Illuminate\Http\RedirectResponse
     */
    public function update(TenantRequest $request, Tenant $tenant)
    {
        $tenant->update([
            'lead_contact_name' => $request->lead_contact_name,
            'lead_contact_email' => $request->lead_contact_email
        ]);

        $url = str_replace('http://', '.', env('APP_URL'));
        $tenant->domains()->update([
            'domain' => $request->id . $url
        ]);
        return redirect()->route('tenants.index');
    }
}
