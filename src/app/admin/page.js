import React from 'react';
import AdminDashboard from './admin';
import ProtectedRoute from '../../components/protected-route'; 


const Page = () => {
  return (
    <ProtectedRoute >
      <AdminDashboard />
    </ProtectedRoute>
  
  );
};

export default Page;