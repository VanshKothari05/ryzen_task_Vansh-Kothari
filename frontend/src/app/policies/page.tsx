'use client';

import { useEffect, useState, Suspense } from 'react';
import { api } from '@/services/api';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function PolicyListContent() {
    const searchParams = useSearchParams();
    const customerId = searchParams.get('customerId');

    const [policies, setPolicies] = useState([]);
    const [filters, setFilters] = useState({ policy_type: '', status: '', city: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (customerId) {
            api.getPolicies(customerId)
                .then(setPolicies)
                .catch(console.error)
                .finally(() => setLoading(false));
        } else {
            loadPolicies();
        }
    }, [customerId]);

    const loadPolicies = () => {
        setLoading(true);
        api.searchPolicies(filters)
            .then(setPolicies)
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        loadPolicies();
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this policy?')) {
            try {
                await api.deletePolicy(id);
                setPolicies(policies.filter((p: any) => p.id !== id));
            } catch (error) {
                console.error('Failed to delete policy', error);
                alert('Failed to delete policy');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="page-title">
                        {customerId ? `Policies for Customer #${customerId}` : 'All Policies'}
                    </h1>
                    <p className="text-slate-500 mt-1">Manage insurance policies and coverage</p>
                </div>
                <Link href="/policies/add" className="btn-primary flex items-center space-x-2">
                    <span>+ Add Policy</span>
                </Link>
            </div>

            {!customerId && (
                <div className="card p-6">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Policy Type</label>
                            <input
                                type="text"
                                className="input-field"
                                value={filters.policy_type}
                                onChange={(e) => setFilters({ ...filters, policy_type: e.target.value })}
                                placeholder="e.g. Health"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
                            <select
                                className="input-field"
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            >
                                <option value="">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="expired">Expired</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">City</label>
                            <input
                                type="text"
                                className="input-field"
                                value={filters.city}
                                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                                placeholder="e.g. New York"
                            />
                        </div>
                        <button type="submit" className="btn-secondary h-[42px] w-full md:w-auto">
                            Apply Filters
                        </button>
                    </form>
                </div>
            )}

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="py-3 px-6 font-semibold text-slate-700">Policy ID</th>
                                <th className="py-3 px-6 font-semibold text-slate-700">Customer</th>
                                <th className="py-3 px-6 font-semibold text-slate-700">Type</th>
                                <th className="py-3 px-6 font-semibold text-slate-700">Premium</th>
                                <th className="py-3 px-6 font-semibold text-slate-700">Status</th>
                                <th className="py-3 px-6 font-semibold text-slate-700">Duration</th>
                                <th className="py-3 px-6 font-semibold text-slate-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-slate-500">Loading policies...</td>
                                </tr>
                            ) : policies.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-slate-500">No policies found.</td>
                                </tr>
                            ) : (
                                policies.map((policy: any) => (
                                    <tr key={policy.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3 px-6 font-mono text-slate-500">#{policy.id}</td>
                                        <td className="py-3 px-6 font-medium text-slate-900">
                                            {policy.customer ? policy.customer.name : `Customer #${policy.customerId}`}
                                        </td>
                                        <td className="py-3 px-6 text-slate-700">{policy.policyType}</td>
                                        <td className="py-3 px-6 font-medium text-slate-900">${policy.premiumAmount.toLocaleString()}</td>
                                        <td className="py-3 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${policy.status === 'active'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-rose-100 text-rose-800'
                                                }`}>
                                                {policy.status === 'active' ? 'Active' : 'Expired'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-xs text-slate-500">
                                            <div>{new Date(policy.startDate).toLocaleDateString()}</div>
                                            <div>to {new Date(policy.endDate).toLocaleDateString()}</div>
                                        </td>
                                        <td className="py-3 px-6 text-right">
                                            <button
                                                onClick={() => handleDelete(policy.id)}
                                                className="text-rose-600 hover:text-rose-800 font-medium text-sm hover:underline"
                                            >
                                                Delete
                                            </button>
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

export default function PolicyList() {
    return (
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
            <PolicyListContent />
        </Suspense>
    );
}
