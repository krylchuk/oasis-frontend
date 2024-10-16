'use client'; 

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import axios from 'axios'; 

const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null); 
  const { id } = useParams(); 

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) { 
        try {
          const response = await axios.get(`https://oasis-backend-nfuv.onrender.com/blogs/${id}`); 
          setBlog(response.data);
        } catch (err) {
          setError('No se pudo cargar el articulo'); 
          console.error(err);
        }
      }
    };

    fetchBlog(); 
  }, [id]); 

  if (error) {
    return <div>{error}</div>;
  }

  if (!blog) {
    return <p>Loading...</p>; 
  }

  return (
    <div className='blog-id'>
      <div className='blog-post'>
        <h1>{blog.blogs_title}</h1>
        <img src={blog.blogs_image_url} alt={blog.blogs_title} /> 
        <p>{blog.blogs_content}</p> 
        <p>
          <strong>Autor:</strong> {blog.blogs_author} <br />
          <strong>Fecha de publicacion:</strong> {new Date(blog.blogs_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
