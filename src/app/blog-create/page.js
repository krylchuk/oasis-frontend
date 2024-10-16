import React from 'react';
import CreateNewBlog from './blog-create';
import ProtectedRoute from '../../components/protected-route';


const Page = () => {
  return (
    <ProtectedRoute>
      <CreateNewBlog />
    </ProtectedRoute>
  
  );
};

export default Page;