'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">R</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">RyzenInsure</span>
                    </Link>

                    <div className="flex space-x-1">
                        <NavLink href="/customers" active={isActive('/customers') || pathname.startsWith('/customers')}>
                            Customers
                        </NavLink>
                        <NavLink href="/policies" active={isActive('/policies') || pathname.startsWith('/policies')}>
                            Policies
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
    return (
        <Link
            href={href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
        >
            {children}
        </Link>
    );
}
