import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Create({ auth, tenants }) {

    const { data, setData, errors, post } = useForm({
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        tenant: 'landlord',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('users.store'));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("users.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="editForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2"
                                            label="email"
                                            name="email"
                                            errors={errors.email}
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.email}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="first_name"
                                            name="first_name"
                                            value={data.first_name}
                                            onChange={(e) =>
                                                setData("first_name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.first_name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="last_name"
                                            name="last_name"
                                            value={data.last_name}
                                            onChange={(e) =>
                                                setData("last_name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.last_name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Phone number</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="phone_number"
                                            name="phone_number"
                                            value={data.phone_number}
                                            onChange={(e) =>
                                                setData("phone_number", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.phone_number}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Tenant</label>
                                        <select className="w-full px-4 py-2"
                                            value={data.tenant}
                                            onChange={e => setData("tenant", e.target.value)} >
                                            <option value="landlord">landlord</option>
                                            {tenants.map((tenant) => (
                                                <option value={tenant.id}>{tenant.id}</option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">
                                            {errors.tenant}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-primary rounded"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
