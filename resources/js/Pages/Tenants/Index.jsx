import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Index({ auth, tenants }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tenants</h2>}
        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-end mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-primary focus:outline-none"
                                    href={route("tenants.create")}
                                >
                                    Add new tenant
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-center text-sm">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border whitespace-nowrap px-6 py-4">Name</th>
                                            <th className="border whitespace-nowrap px-6 py-4">Lead contact name</th>
                                            <th className="border whitespace-nowrap px-6 py-4">Lead contact email</th>
                                            <th className="border whitespace-nowrap px-6 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tenants.map(({ id, lead_contact_name, lead_contact_email }) => (
                                            <tr>
                                                <td className="border whitespace-nowrap px-6 py-4">{id}</td>
                                                <td className="border whitespace-nowrap px-6 py-4">{lead_contact_name}</td>
                                                <td className="border whitespace-nowrap px-6 py-4">{lead_contact_email}</td>
                                                <td className="border whitespace-nowrap px-6 py-4 flex justify-center items-center">
                                                    <Link
                                                        tabIndex="1"
                                                        href={route("tenants.edit", id)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
