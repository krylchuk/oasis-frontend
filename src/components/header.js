'use client';  
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios'; 
import Image from 'next/image';

import logo from "../../public/logo.jpg";

const Header = () => {
  const [services, setServices] = useState([]); 
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem('services', JSON.stringify(services)); 
    router.push('/services');
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://oasis-backend-nfuv.onrender.com/services');
        setServices(response.data.services); 
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="header">
      <div className="logo">
        <Image
          src={logo}
          alt="Logo"
          fill
          objectFit='cover'
          priority 
        />
      </div>

      <div className="navbar">
        <div className="nav-links">
          <Link href="/" className="header-link">Inicio</Link>
          <Link href="/about"className="header-link">Sobre nosotros</Link>
          <div 
            onMouseEnter={() => setIsServicesOpen(true)} 
            onMouseLeave={() => setIsServicesOpen(false)}
            className="services-dropdown" >

            <button className='header-button' onClick={handleClick}>Servicios</button>
            {isServicesOpen && (
              <div className="dropdown">
                {Array.isArray(services) && services.length > 0 ? (
                  services.map((service) => (
                    <div key={service.services_id} className='dropdown-list'>
                      <Link href={`/services/${service.services_id}`}>
                        {service.services_name}
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>No services available</div>
                )}
              </div>
            )}
          </div>
          <Link href="/budget" className="header-link">Pedir presupuesto</Link>
          <Link href="/blog" className="header-link">Blog</Link>
          <Link href="/contact" className="header-link">Contacto</Link>
        </div>
      </div> 
    </div> 
  );
};

export default Header;


