'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);

  
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/budgets');
        setBudgets(response.data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  
  const markAsCompleted = async (budgets_id) => {
    try {
      await axios.put(`http://localhost:5000/budgets/${budgets_id}`, { budgets_status: 1 });
      setBudgets((prevBudgets) =>
        prevBudgets.map((budget) =>
          budget.budgets_id === budgets_id ? { ...budget, budgets_status: 1 } : budget
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado del presupuesto:', error);
    }
  };

  return (
    <div className='budgets-container'>
      <h1 className='budgets-title'>Presupuestos</h1>
      <ul className='budgets-list'>
        {budgets.map((budget) => (
            <li key={budget.budgets_id} className='budget-item'>
            <p className='budget-detail'><strong>Número de Presupuesto:</strong> {budget.budgets_number}</p>
            <p className='budget-detail'><strong>Nombre del Cliente:</strong> {budget.customers_name}</p>
            <p className='budget-detail'><strong>Ciudad:</strong> {budget.customers_city}</p>
            <p className='budget-detail'><strong>Teléfono:</strong> {budget.customers_phone}</p>
            <p className='budget-detail'><strong>Comentario:</strong> {budget.customers_comment}</p>
            <p className='budget-detail'><strong>Estado:</strong> {budget.budgets_status === 1 ? 'Hecho' : 'Pendiente'}</p>
        
            {budget.budgets_status === 0 && (
              <button className='mark-completed-button' onClick={() => markAsCompleted(budget.budgets_id)}>
                Presupuesto Hecho
              </button>
            )}
          </li>
        
        ))}
      </ul>
    </div>
  );
};

export default Budgets;
