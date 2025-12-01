'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import Link from 'next/link';

export default function AddCustomer() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', phone: '', city: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.createCustomer(form);
            router.push('/customers');
        } catch (error) {
            alert('Failed to create customer');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/customers" className="text-slate-500 hover:text-slate-700 text-sm mb-2 inline-block">
                    &larr; Back to Customers
                </Link>
                <h1 className="page-title">Add New Customer</h1>
                <p className="text-slate-500">Enter the details of the new customer.</p>
            </div>

            <div className="card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Full Name</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Phone Number</label>
                            <input
                                type="tel"
                                className="input-field"
                                placeholder="+1 (555) 000-0000"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">City</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="New York"
                                value={form.city}
                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <Link href="/customers" className="btn-secondary">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={submitting}
                        >
                            {submitting ? 'Saving...' : 'Save Customer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
