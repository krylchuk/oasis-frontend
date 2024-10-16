
'use client'; 

import { useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    
    const storedAdmin = localStorage.getItem('admin');
    if (!storedAdmin) {
      router.push('/login'); 
    } else {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin'); 
    router.push('/login'); 
  };

  if (!admin) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Bienvenido, {admin.admins_name}!</h2>
      
      <div className="admin-actions">
      <button onClick={() => router.push('/admin-profile')} className="admin-button">
          Perfil de Administrador
        </button>
        <button onClick={() => router.push('/blog-create')} className="admin-button">
          Crear Blog
        </button>
        <button onClick={() => router.push('/service-create')} className="admin-button">
          Crear Servicios
        </button>
        <button onClick={() => router.push('/get-budgets')} className="admin-button">
          Ver Presupuestos
        </button>
        <button onClick={() => router.push('/create-admin')} className="admin-button">
          Crear Administrador
        </button>
        <button onClick={handleLogout} className="admin-button">
          Salir
        </button>
      </div>
    </div>
  );
}

