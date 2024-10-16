'use client'; 

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios'; 
import striptags from 'striptags';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://oasis-backend-nfuv.onrender.com/blogs'); 
        const sortedBlogs = response.data.sort((a, b) => new Date(b.blogs_date) - new Date(a.blogs_date)); 
        setBlogs(sortedBlogs);
      } catch (err) {
        setError('No se pudo cargar los blogs'); 
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  const truncateContent = (content, numLines = 5) => {
    const cleanContent = striptags(content); 
    const lines = cleanContent.split('\n').map(line => line.trim()); 

    
    if (lines.length <= numLines) {
      return cleanContent;
    }

    
    const truncatedLines = lines.slice(0, numLines).join(' ') + '...'; 
    return truncatedLines;
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className='blogs-container'>
        <h1>Lista de blogs</h1>
        <div className='blogs-all'>
          {blogs.map(blog => (
            <li key={blog.blogs_id}>
              <h2>{blog.blogs_title}</h2>
              <p>{truncateContent(blog.blogs_content, 5)}{' '}</p>
              <Link href={`/blog/${blog.blogs_id}`}>
                <button>Ver artículo</button>
              </Link>
              <p>
                <strong>Autor:</strong> {blog.blogs_author} <br />
                <strong>Fecha de Publicación:</strong> {new Date(blog.blogs_date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
