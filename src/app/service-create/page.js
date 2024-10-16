import React from 'react';
import CreateNewService from './service-create';
import ProtectedRoute from '../../components/protected-route'; 



const Page = () => {
  return (
    <ProtectedRoute>
      <CreateNewService />
    </ProtectedRoute>
  
  );
};

export default Page;