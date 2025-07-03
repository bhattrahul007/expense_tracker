import React, { useState, useEffect } from 'react';
import type { Expense } from '../components/ExpenseList';
import type { ExpenseInput } from './types';
import { ExpenseContext } from './ExpenseContextInstance';

const LOCAL_STORAGE_KEY = 'expenses';

type Props = { children: React.ReactNode };
export const ExpenseProvider: React.FC<Props> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      setExpenses(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (input: ExpenseInput) => {
    console.log(input, 'input in addExpense');
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description: String(input.description).trim(),
      amount: Number(input.amount),
      category: input.category,
      date: new Date().toISOString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  return <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>{children}</ExpenseContext.Provider>;
};

// useExpenses hook moved to a separate file to avoid Fast Refresh issues
