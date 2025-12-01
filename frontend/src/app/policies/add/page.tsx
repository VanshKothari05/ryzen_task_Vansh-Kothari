'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import Link from 'next/link';

export default function AddPolicy() {
    const router = useRouter();
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({
        customerId: '',
        policyType: '',
        premiumAmount: '',
        startDate: '',
        endDate: '',
        status: 'active',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        api.getCustomers().then(setCustomers).catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.createPolicy(form);
            router.push('/policies');
        } catch (error) {
            alert('Failed to create policy');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <Link href="/policies" className="text-slate-500 hover:text-slate-700 text-sm mb-2 inline-block">
                    &larr; Back to Policies
                </Link>
                <h1 className="page-title">Create New Policy</h1>
                <p className="text-slate-500">Assign a new insurance policy to a customer.</p>
            </div>

            <div className="card p-8">
                <form onSubmit={handleSubmit} className="space-y-8">

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Policy Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Customer</label>
                                <select
                                    className="input-field"
                                    value={form.customerId}
                                    onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Customer</option>
                                    {customers.map((c: any) => (
                                        <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Policy Type</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={form.policyType}
                                    onChange={(e) => setForm({ ...form, policyType: e.target.value })}
                                    required
                                    placeholder="e.g. Comprehensive Health"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Premium Amount ($)</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    value={form.premiumAmount}
                                    onChange={(e) => setForm({ ...form, premiumAmount: e.target.value })}
                                    required
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Status</label>
                                <select
                                    className="input-field"
                                    value={form.status}
                                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                                >
                                    <option value="active">Active</option>
                                    <option value="expired">Expired</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Duration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Start Date</label>
                                <input
                                    type="date"
                                    className="input-field"
                                    value={form.startDate}
                                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">End Date</label>
                                <input
                                    type="date"
                                    className="input-field"
                                    value={form.endDate}
                                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <Link href="/policies" className="btn-secondary">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={submitting}
                        >
                            {submitting ? 'Creating Policy...' : 'Create Policy'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
