import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {  Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, errors, post } = useForm({
        id: "",
        lead_contact_name: "",
        lead_contact_email: ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("tenants.store"));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tenants</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("tenants.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">ID</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="id"
                                            name="id"
                                            errors={errors.id}
                                            value={data.id}
                                            onChange={(e) =>
                                                setData("id", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.id}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Lead Contact Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="lead_contact_name"
                                            name="lead_contact_name"
                                            errors={errors.lead_contact_name}
                                            value={data.lead_contact_name}
                                            onChange={(e) =>
                                                setData("lead_contact_name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.lead_contact_name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Lead Contact Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2"
                                            label="lead_contact_email"
                                            name="lead_contact_email"
                                            errors={errors.lead_contact_email}
                                            value={data.lead_contact_email}
                                            onChange={(e) =>
                                                setData("lead_contact_email", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.lead_contact_email}
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
