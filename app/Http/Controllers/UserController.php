<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $users = User::all()->map(function ($user) {
            $user['tenant'] = 'landlord';
            return $user;
        })->toArray();

        Tenant::all()->each(function ($tenant) use (&$users) {
            $tenant->run(function () use ($tenant, &$users) {
                $users = array_merge(
                    $users,
                    User::all()->map(function ($user) use ($tenant) {
                        $user['tenant'] = $tenant->id;
                        return $user;
                    })->toArray()
                );
            });
        });

        return Inertia::render('Users/Index', ['users' => collect($users)]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $tenants = Tenant::all();
        return Inertia::render('Users/Create', ['tenants' => $tenants]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateUserRequest $request
     * @return \Illuminate\Routing\Redirector|\Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // We need the validation rules here instead of making a request, in order to check tenants as well.
        $validationRules = [
            'email' => ['required', 'string', 'email', Rule::unique('users')],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:11', Rule::unique('users')],
        ];

        if ($request->tenant != Tenant::CENTRAL_DATABASE) {
            $validationRules['tenant'] = ['required', 'string', 'max:255', 'exists:tenants,id'];
        }

        if ($request->tenant == Tenant::CENTRAL_DATABASE) {
            $request->validate($validationRules);
            User::create([
                'email' => $request->email,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone_number' => $request->phone_number
            ]);
        } else {
            $tenant = Tenant::find($request->tenant);
            tenancy()->initialize($tenant);
            $tenant->run(function () use ($request, $validationRules) {
                unset($validationRules['tenant']);
                $request->validate($validationRules);
                User::create([
                    'email' => $request->email,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'phone_number' => $request->phone_number
                ]);
            });
        }

        return redirect()->route('users.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Inertia\Response
     */
    public function edit(string $tenant, int $id)
    {
        $user = $this->identifyUser($tenant, $id);
        return Inertia::render(
            'Users/Edit',
            [
                'user' => $user,
                'tenant' => $tenant
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserRequest $request
     * @param string $tenant
     * @param int $id
     *
     * @return \Illuminate\Routing\Redirector|\Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, string $tenant, int $id)
    {
        if ($tenant == Tenant::CENTRAL_DATABASE) {
            $user = User::find($id);
            $validationRules = [
                'email' => ['required', 'string', 'email', Rule::unique('users')->ignore($user->id)],
                'first_name' => ['required', 'string', 'max:255'],
                'last_name' => ['required', 'string', 'max:255'],
                'phone_number' => ['required', 'string', 'max:11', Rule::unique('users')->ignore($user->phone_number)],
            ];
            $request->validate($validationRules);
            $user->update([
                'email' => $request->email,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone_number' => $request->phone_number
            ]);
        } else {
            $tenant = Tenant::find($tenant);
            tenancy()->initialize($tenant);
            $tenant->run(function () use ($request, $id) {
                $user = User::find($id);
                $validationRules = [
                    'email' => ['required', 'string', 'email', Rule::unique('users')->ignore($user->id)],
                    'first_name' => ['required', 'string', 'max:255'],
                    'last_name' => ['required', 'string', 'max:255'],
                    'phone_number' => ['required', 'string', 'max:11', Rule::unique('users')->ignore($user->id)],
                ];
                $request->validate($validationRules);
                $user->update([
                    'email' => $request->email,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'phone_number' => $request->phone_number
                ]);
            });
        }

        return redirect()->route('users.index');
    }


    /**
     * @param string $tenant
     * @param int $id
     *
     * @return User
     */
    private function identifyUser(string $tenant, int $id): User
    {
        $user = null;
        if ($tenant == Tenant::CENTRAL_DATABASE) {
            $user = User::where('id', $id)->first();
        } else {
            $tenant = Tenant::find($tenant);
            tenancy()->initialize($tenant);
            $tenant->run(function () use (&$user, $id) {
                $user = User::where('id', $id)->first();
            });
        }

        return $user;
    }
}
