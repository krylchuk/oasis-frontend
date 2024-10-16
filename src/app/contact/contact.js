import React from 'react';

const Contacto = () => {
  return (
    <div>
      
      <div className="contact-container">
        <div className="contact-title">Contáctanos</div>

        <div className="contact-info">
          <h2>Nuestros contactos</h2>
          
          <h3>Teléfono: +34 123 456 789</h3>
          <h3>Email: contacto@jardineria.com</h3>
          <h3>Dirección: Calle Pio Baroja 4, Irun, España</h3>
          
        </div>

        

        <div className="ubicacion-mapa">
          <h2>Nuestra ubicación</h2>
          <iframe
            title="Mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.8316602226213!2d-1.796544084516621!3d43.33627407913382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51a4748a3db07f%3A0x608ff6092a00715d!2sCalle%20Pio%20Baroja%2C%204%2C%2020304%20Ir%C3%BAn%2C%20Gipuzkoa%2C%20Spain!5e0!3m2!1sen!2ses!4v1696695271607!5m2!1sen!2ses"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy">

          </iframe>
        </div>

        <div className="mensaje-clientes">
          <h2>Hemos realizado trabajos para muchos clientes satisfechos por todo Gipuzkoa, y nos encantaría mejorar tu járdin tambien.</h2>
        </div>

      </div>
    </div>
  );
};

export default Contacto;
