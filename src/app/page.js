'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 

export default function Home() {
  return (
    <div className="home-container">
      
      <div className="hero">
        <div className="hero-content">
          <div className='hero-image'>
            <Image 
              src='/home-image.jpg' 
              alt='Home Image'
              width={800}
              height={500}
            />
          </div>
          
          <h1>Servicios de jardineria para tu jardin</h1>
          <p>Ofrecemos servicios de alta calidad.</p>
          <Link href="/about">
            <button className="cta-button">Sobre Nosotros</button>
          </Link>
        </div> 
      </div>
    </div>
  );
}

    
