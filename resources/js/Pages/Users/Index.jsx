import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Index({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-14">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-end mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-primary focus:outline-none mb-4 sm:mb-0"
                                    href={route("users.create")}
                                >
                                    Add new User
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-center text-sm">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border whitespace-nowrap px-6 py-4">Firstname</th>
                                            <th className="border whitespace-nowrap px-6 py-4">Lastname</th>
                                            <th className="border whitespace-nowrap px-6 py-4">Email</th>
                                            <th className="border whitespace-nowrap px-6 py-4">Phone number</th>
                                            <th className="border whitespace-nowrap px-6 py-4">Tenant</th>
                                            <th className="border whitespace-nowrap px-6 py-4">Created</th>
                                            <th className="border whitespace-nowrap px-6 py-4">Login enable</th>
                                            <th className="border whitespace-nowrap px-6 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr>
                                                <td className="border whitespace-nowrap px-6 py-4">{user.first_name}</td>
                                                <td className="border whitespace-nowrap px-6 py-4">{user.last_name}</td>
                                                <td className="border whitespace-nowrap px-6 py-4">{user.email}</td>
                                                <td className="border whitespace-nowrap px-6 py-4">{user.phone_number}</td>
                                                <td className="border whitespace-nowrap px-6 py-4">{user.tenant}</td>
                                                <td className="border whitespace-nowrap px-6 py-4">{user.created_at}</td>
                                                <td className="border whitespace-nowrap px-6 py-4">1</td>
                                                <td className="border whitespace-nowrap px-6 py-4 flex justify-center items-center">
                                                    <Link
                                                        tabIndex="1"
                                                        href={route("users.edit", [user.tenant, user])}
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
