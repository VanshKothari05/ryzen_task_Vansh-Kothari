import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Welcome to RyzenInsure
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A comprehensive solution for managing your customer base and their insurance policies efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/customers" className="group">
          <div className="card p-8 h-full hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Customers</h2>
            <p className="text-slate-600 mb-6">
              View, add, and manage customer profiles. Track contact information and policy history.
            </p>
            <span className="text-indigo-600 font-medium group-hover:underline flex items-center">
              Manage Customers &rarr;
            </span>
          </div>
        </Link>

        <Link href="/policies" className="group">
          <div className="card p-8 h-full hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Policies</h2>
            <p className="text-slate-600 mb-6">
              Create and track insurance policies. Monitor premiums, expiration dates, and status.
            </p>
            <span className="text-indigo-600 font-medium group-hover:underline flex items-center">
              Manage Policies &rarr;
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
