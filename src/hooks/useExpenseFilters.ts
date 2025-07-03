import { CATEGORY_LIST, type Category, type CategoryId } from '../constants/categories';
import { useState, useMemo, useCallback } from 'react';
import type { Expense } from '../components/types';

export interface ExpenseFilters {
  selectedCategories: CategoryId[];
  setSelectedCategories: (cats: CategoryId[]) => void;
  selectedDates: string[];
  setSelectedDates: (dates: string[]) => void;
  clearFilters: () => void;
  filteredExpenses: Expense[];
  categories: Category[];
}

export function useExpenseFilters(expenses: Expense[]): ExpenseFilters {
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const categories = useMemo(() => {
    const used = Array.from(new Set(expenses.map(e => e.category as CategoryId)));
    const all = Array.from(new Set([...used, 'income'] as CategoryId[]));
    return CATEGORY_LIST.filter(cat => all.includes(cat.id));
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      const catMatch = selectedCategories.length === 0 || selectedCategories.includes(e.category as CategoryId);
      const dateMatch =
        selectedDates.length === 0 ||
        selectedDates.some(date => {
          const d = new Date(e.date).toISOString().slice(0, 10);
          return d === date;
        });
      return catMatch && dateMatch;
    });
  }, [expenses, selectedCategories, selectedDates]);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedDates([]);
  }, []);

  return {
    selectedCategories,
    setSelectedCategories,
    selectedDates,
    setSelectedDates,
    clearFilters,
    filteredExpenses,
    categories,
  };
}
