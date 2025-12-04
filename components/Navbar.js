//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2025
//*** Navbar component with navigation and auth

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  // Don't show navbar on login/register pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  const isActive = (path) => {
    return pathname === path;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Internship Tracker
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className={`py-4 px-1 ${isActive('/') ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/applications" 
              className={`py-4 px-1 ${isActive('/applications') ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Applications
            </Link>
            <Link 
              href="/interviews" 
              className={`py-4 px-1 ${isActive('/interviews') ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Interviews
            </Link>
            <Link 
              href="/analytics" 
              className={`py-4 px-1 ${isActive('/analytics') ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Analytics
            </Link>
            <Link 
              href="/email" 
              className={`py-4 px-1 ${isActive('/email') ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Import from Gmail
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}