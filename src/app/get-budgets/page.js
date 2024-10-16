import React from 'react';
import Budgets from './get-budgets';
import ProtectedRoute from '../../components/protected-route'; 



const Page = () => {
  return (
    <ProtectedRoute>
      <Budgets />
    </ProtectedRoute>
  
  );
};

export default Page;