'use client';
import React from 'react';
import Link from 'next/link'; 

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-address">
          <h2>Contacta con Nosotros</h2>
          <h3>Teléfono: +34 123 456 789</h3>
          <h3>Email: contacto@jardineria.com</h3>
          <h3>Dirección: Calle Pio Baroja 4, Irun, España</h3>
        </div>
        <Link href="/budget" className="budget-link">Pedir Presupuesto</Link>
      </div>
    </div>
  );
};

export default Footer;
