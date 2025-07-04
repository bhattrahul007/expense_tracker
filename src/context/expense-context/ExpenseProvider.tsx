import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { CategoryId } from './../../constants/categories';
import { ExpenseContext } from './ExpenseContext';
import type { ExpenseInput } from '../types';
import type { Expense } from '../../components/types';

const LOCAL_STORAGE_KEY = 'expenses';

type Props = { children: React.ReactNode };
export const ExpenseProvider: React.FC<Props> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = useCallback((input: ExpenseInput) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description: String(input.description).trim(),
      amount: Number(input.amount),
      category: input.category as CategoryId,
      date: new Date().toISOString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  }, []);

  const editExpense = useCallback((updated: Expense) => {
    setExpenses(prev => prev.map(exp => (exp.id === updated.id ? { ...exp, ...updated } : exp)));
  }, []);

  const value = useMemo(
    () => ({ expenses, addExpense, deleteExpense, editExpense }),
    [expenses, addExpense, deleteExpense, editExpense]
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};
