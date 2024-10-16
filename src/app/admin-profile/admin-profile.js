'use client'; 

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    
    const storedAdmin = localStorage.getItem('admin');
    if (!storedAdmin) {
      router.push('/login');
    } else {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdmin(parsedAdmin);
      setName(parsedAdmin.admins_name);
      setEmail(parsedAdmin.admins_email);
    }
  }, [router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedAdmin = {
        admins_name: name,
        admins_email: email,
        admins_password: password, 
      };

      await axios.put(`https://oasis-backend-nfuv.onrender.com/admins/${admin.admins_id}`, updatedAdmin);
      
      
      localStorage.setItem('admin', JSON.stringify({ ...admin, ...updatedAdmin }));
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete your profile?')) {
      try {
        await axios.delete(`https://oasis-backend-nfuv.onrender.com/admins/${admin.admins_id}`);
        localStorage.removeItem('admin'); 
        router.push('/login'); 
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('Error deleting profile');
      }
    }
  };

  if (!admin) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-profile">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Nueva Contraseña</label>
          <input type="password" id="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Dejar vacía para mantener la contraseña actual"
          />
        </div>
        <button type="submit" className="admin-button">Actualizar Perfil</button>
        <button onClick={handleDelete} className="admin-button-delete-button">Eliminar Perfil</button>
      </form>
      
    </div>
  );
}
