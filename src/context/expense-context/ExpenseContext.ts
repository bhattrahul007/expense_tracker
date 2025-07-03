import { createContext } from 'react';
import type { Expense } from '../../components/expense-list/ExpenseList';
import type { ExpenseInput } from '../types';

export interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (input: ExpenseInput) => void;
  deleteExpense: (id: string) => void;
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);
