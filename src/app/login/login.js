'use client'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 

  
  useEffect(() => {
    const checkAdminLoggedIn = async () => {
      try {
        const response = await axios.get('https://oasis-backend-nfuv.onrender.com/check-admin', {
          withCredentials: true,
        });

        if (response.data.success) {
          router.push('/admin'); 
        }
      } catch (error) {
        console.error('Error checking admin login status:', error);
      }
    };

    checkAdminLoggedIn();
  }, [router]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://oasis-backend-nfuv.onrender.com/login', {
        email,
        password,
      }, {
        withCredentials: true, 
      });

      if (response.data.success) {
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        router.push('/admin'); 
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Acceso al Perfil</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
}
