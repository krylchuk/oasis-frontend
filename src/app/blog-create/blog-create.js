'use client'; 

import React, { useState } from 'react';
import axios from 'axios'; 
import { useRouter } from 'next/navigation'; 

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const router = useRouter(); 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author || !image) {
      setError('Todos los campos deben ser llenados');
      return;
    }

    const formData = new FormData();
    formData.append('blogs_title', title);
    formData.append('blogs_content', content);
    formData.append('blogs_author', author);
    formData.append('blogs_image', image);

    try {
      const response = await axios.post('https://oasis-backend-nfuv.onrender.com/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Blog publicado exitosamente!'); 
        setError(''); 
        setTimeout(() => {
          router.push('/blog'); 
        }, 2000); 
      }
    } catch (err) {
      setError('No se pudo crear el blog');
      setSuccessMessage('');
      console.error(err);
    }
  };

  return (
    <div className='create-blog'>
      <h1>Crear Nuevo Blog</h1>
      
      
      {error && <p className='error-message'>{error}</p>}
      
      {successMessage && <p className='success-message'>{successMessage}</p>}
      
      <form onSubmit={handleSubmit} className='blog-form'>
        <div className='form-group'>
          <label className='form-label'>Título</label>
          <input
            type="text"
            className='form-input'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Contenido</label>
          <textarea
            className='form-textarea'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Autor</label>
          <input
            type="text"
            className='form-input'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Imagen</label>
          <input
            type="file"
            className='form-input'
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className='submit-button'>Publicar</button>
      </form>
    </div>
  );
};

export default CreateBlog;
