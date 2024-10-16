'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-dropdown-select';




const Budget = () => {
  
  const [formData, setFormData] = useState({
    customers_name: '',
    customers_city: '',
    customers_phone: '',
    customers_comment: '',
    services_ids: [] 
  });

   
  const services = [
    { id: 34, name: 'Corte de césped' },
    { id: 35, name: 'Poda de árboles' },
    { id: 36, name: 'Riego automático' },
    { id: 37, name: 'Fertilización de plantas' },
    { id: 38, name: 'Control de plagas' },
    { id: 39, name: 'Diseño de jardines' },
    { id: 40, name: 'Limpieza de jardines' },
    { id: 41, name: 'Mantenimiento de césped' }
  ];

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  
  const handleServiceChange = (selectedServices) => {
    const selectedIds = selectedServices.map((service) => service.id);
    setFormData((prevData) => ({
      ...prevData,
      services_ids: selectedIds
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    axios.post('http://localhost:5000/create_budget', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        alert('Forma enviada correctamente: ' + response.data.message);
        setFormData({
          customers_name: '',
          customers_city: '',
          customers_phone: '',
          customers_comment: '',
          services_ids: []
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    
      <div className="budget-container">
        <h1 className="budget-title">Forma para pedir presupuesto</h1>
        <form className="budget-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tu Nombre:</label>
            <input
              type="text"
              name="customers_name"
              value={formData.customers_name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Ciudad:</label>
            <input
              type="text"
              name="customers_city"
              value={formData.customers_city}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              name="customers_phone"
              value={formData.customers_phone}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Comentario:</label>
            <textarea
              name="customers_comment"
              value={formData.customers_comment}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Elige Servicio:</label>
            <Select
              options={services}
              labelField="name"
              valueField="id"
              multi
              onChange={handleServiceChange}
              className="form-select"
            />
          </div>
          <button type="submit" className="btn-submit">Enviar</button>
        </form>
      </div>
    
);
};

export default Budget;
