'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('admin'); 
    if (!user) {
      router.push('/login'); 
    } else {
      setIsAuthenticated(true); 
    }
  }, [router]);

  if (!isAuthenticated) {
    return <p>Cargando...</p>;
  }

  return children;
};

export default ProtectedRoute;
