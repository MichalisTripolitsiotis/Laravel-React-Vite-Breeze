import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, tenants }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tenants</h2>}
        >
            <Head title="Tenants" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table className="min-w-full text-center text-sm">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border whitespace-nowrap px-6 py-4">Name</th>
                                        <th className="border whitespace-nowrap px-6 py-4">Lead contact name</th>
                                        <th className="border whitespace-nowrap px-6 py-4">Lead contact email</th>
                                        <th className="border whitespace-nowrap px-6 py-4">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tenants.map(({ id, lead_contact_name, lead_contact_email }) => (
                                        <tr>
                                            <td className="border whitespace-nowrap px-6 py-4">{id}</td>
                                            <td className="border whitespace-nowrap px-6 py-4">{lead_contact_name}</td>
                                            <td className="border whitespace-nowrap px-6 py-4">{lead_contact_email}</td>
                                            <td className="border whitespace-nowrap px-6 py-4">
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("tenants.edit", id)}
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            className="px-6 py-2 text-white bg-primary focus:outline-none"
                            href={route("tenants.create")}
                        >
                            Add new tenant
                        </Link>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
