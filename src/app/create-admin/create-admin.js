'use client';
import React, { useState } from 'react';
import axios from 'axios';

const AddAdmin = () => {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const adminData = {
      name: adminName,
      email: adminEmail,
      password: adminPassword,
    }; 

    try {
      const response = await axios.post('http://localhost:5000/add_admin', adminData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setResponseMessage('Administrador añadido exitosamente!');
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.response ? error.response.data : 'Error del servidor'}`);
    }
  };

  return (
    <div className="add-admin-container">
      <h2 className="add-admin-title">Crear administrador</h2>
      <form className="add-admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-input"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-input"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-input"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Admin</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default AddAdmin;
