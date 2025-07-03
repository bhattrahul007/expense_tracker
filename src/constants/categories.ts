export type CategoryId = 'bills' | 'car' | 'food' | 'income' | 'others' | 'streaming' | 'travel';

export interface Category {
  id: CategoryId;
  label: string;
  color: string;
}

export const CATEGORY_LIST: Category[] = [
  { id: 'bills', label: 'Bills', color: '#f59e42' },
  { id: 'car', label: 'Car', color: '#6366f1' },
  { id: 'food', label: 'Food', color: '#22c55e' },
  { id: 'income', label: 'Income', color: '#16a34a' },
  { id: 'others', label: 'Others', color: '#a855f7' },
  { id: 'streaming', label: 'Streaming', color: '#ef4444' },
  { id: 'travel', label: 'Travel', color: '#3b82f6' },
];

export const INCOME_CATEGORY = 'income';
