import React from 'react';
import AddAdmin from './create-admin';
import ProtectedRoute from '../../components/protected-route'; 


const Page = () => {
  return (
    <ProtectedRoute>
      <AddAdmin />
    </ProtectedRoute>
  
  );
};

export default Page;