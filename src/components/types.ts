export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface ExpenseInput {
  description: string;
  amount: number;
  category: string;
}
