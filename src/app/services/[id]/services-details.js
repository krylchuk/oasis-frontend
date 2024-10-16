'use client'; 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation'; 
import { remark } from 'remark';
import html from 'remark-html';


export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

const ServicesDetails = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceDescriptionHtml, setServiceDescriptionHtml] = useState(''); 

  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      
      const fetchService = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/services/${id}`);
          const serviceData = response.data;

          
          const htmlDescription = await markdownToHtml(serviceData.services_large_description);

          setService(serviceData);
          setServiceDescriptionHtml(htmlDescription);
          setLoading(false);
        } catch (error) {
          setError('Error fetching service details');
          setLoading(false);
        }
      };

      fetchService();
    }
  }, [id]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="service-details-container">
      <div className="service-details-image">
        <img
          src={service.services_image_url}
          alt={service.services_name} 
          className="service-image"
        />
      </div>
      <div className="service-details-content">
        <h1>{service.services_name}</h1>
        <div dangerouslySetInnerHTML={{ __html: serviceDescriptionHtml }} />
      </div>

      
    </div>
  );
};

export default ServicesDetails;
