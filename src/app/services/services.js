'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const servicesFromLocalStorage = localStorage.getItem('services');
    if (servicesFromLocalStorage) {
      setServices(JSON.parse(servicesFromLocalStorage)); 
    }
  }, []);

  return (
    <div className="services-container">
      <h1 className="services-title">SERVICIOS</h1>
      <div className="services-list">
        {Array.isArray(services) && services.length > 0 ? (
          services.map((service) => (
            <div key={service.services_id} className="service-card">
              <img
                src={service.services_image_url}
                alt={service.services_name}
                className="service-image"
              />
              <h2>{service.services_name}</h2>
              <Link href={`/services/${service.services_id}`}>
                Leer más
              </Link>
            </div>
          ))
        ) : (
          <p>No services available.</p> 
        )}
      </div>
    </div>
  );
};

export default Services;
