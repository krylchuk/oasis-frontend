import React from 'react';
import AdminProfile from './admin-profile';
import ProtectedRoute from '../../components/protected-route';


const Page = () => {
  return (
    <ProtectedRoute>
      <AdminProfile />
    </ProtectedRoute>
  
  ); 
};

export default Page;