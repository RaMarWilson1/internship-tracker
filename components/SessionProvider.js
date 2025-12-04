//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2025
//*** Session Provider - Authentication wrapper

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function SessionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Public routes that don't require authentication
    const publicRoutes = ['/login', '/register'];
    
    // Check if current route requires authentication
    if (!publicRoutes.includes(pathname)) {
      const user = sessionStorage.getItem('user');
      
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/login');
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}