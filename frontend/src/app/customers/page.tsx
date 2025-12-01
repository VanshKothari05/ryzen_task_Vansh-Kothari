'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import Link from 'next/link';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getCustomers()
            .then(setCustomers)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="page-title">Customers</h1>
                    <p className="text-slate-500 mt-1">Manage your customer base</p>
                </div>
                <Link href="/customers/add" className="btn-primary flex items-center space-x-2">
                    <span>+ Add Customer</span>
                </Link>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="py-3 px-6 font-semibold text-slate-700">Name</th>
                                <th className="py-3 px-6 font-semibold text-slate-700">Contact</th>
                                <th className="py-3 px-6 font-semibold text-slate-700">City</th>
                                <th className="py-3 px-6 font-semibold text-slate-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-slate-500">Loading customers...</td>
                                </tr>
                            ) : customers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-slate-500">No customers found. Start by adding one.</td>
                                </tr>
                            ) : (
                                customers.map((customer: any) => (
                                    <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3 px-6">
                                            <div className="font-medium text-slate-900">{customer.name}</div>
                                            <div className="text-xs text-slate-500">ID: #{customer.id}</div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="text-slate-900">{customer.email}</div>
                                            <div className="text-slate-500">{customer.phone}</div>
                                        </td>
                                        <td className="py-3 px-6 text-slate-700">{customer.city}</td>
                                        <td className="py-3 px-6 text-right">
                                            <Link
                                                href={`/policies?customerId=${customer.id}`}
                                                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm hover:underline"
                                            >
                                                View Policies
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
