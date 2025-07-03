import type { Expense } from '../../components/types';
import type { ExpenseInput } from '../types';
import { createContext } from 'react';

export interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (input: ExpenseInput) => void;
  deleteExpense: (id: string) => void;
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);
