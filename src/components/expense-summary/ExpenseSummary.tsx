import { CATEGORY_LIST, INCOME_CATEGORY } from '../../constants/categories';
import { Card, CardContent, Typography } from '@mui/material';
import { formatCurrency } from '../../utils/currency';
import React, { useMemo } from 'react';
import type { Expense } from '../types';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const incomeCategorie = CATEGORY_LIST.find(cat => cat.id === INCOME_CATEGORY)?.id || INCOME_CATEGORY;

  const { totalIncome, totalExpense, expenseByCategory } = useMemo(() => {
    const expenseByCategory: { [key: string]: number } = {};
    let totalIncome = 0;
    let totalExpense = 0;
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].category === incomeCategorie) totalIncome += expenses[i].amount;
      else totalExpense += expenses[i].amount;
      expenseByCategory[expenses[i].category] = (expenseByCategory[expenses[i].category] || 0) + expenses[i].amount;
    }
    return { totalIncome, totalExpense, expenseByCategory };
  }, [expenses, incomeCategorie]);

  const profit = totalIncome - totalExpense;

  return (
    <Card elevation={0} className="expense_summary ">
      <CardContent className="expense_summary_content">
        <div className="expense_summary_content_layout">
          <div className="expense_summary_header">
            <Typography variant="h6" className="expense_summary_title">
              Overview
            </Typography>
          </div>
          <div className="expense_summary_balance w-full">
            <div className="expense_summary_balance_item">
              <Typography variant="body1" className="expense_summary_balance_label">
                Income
              </Typography>
              <Typography variant="body1" className="expense_summary_balance_amount balance_pos">
                {formatCurrency('INR', totalIncome)}
              </Typography>
            </div>
            <div className="expense_summary_balance_item">
              <Typography variant="body1" className="expense_summary_balance_label">
                Expenses
              </Typography>
              <Typography variant="body1" className="expense_summary_balance_amount balance_neg">
                {formatCurrency('INR', totalExpense)}
              </Typography>
            </div>
            <div className="expense_summary_balance_item">
              <Typography variant="body1" className="expense_summary_balance_label">
                Net {profit >= 0 ? 'Profit' : 'Loss'}
              </Typography>
              <Typography
                variant="body1"
                className={
                  profit >= 0
                    ? 'expense_summary_balance_amount balance_pos'
                    : 'expense_summary_balance_amount balance_neg'
                }
              >
                {formatCurrency('INR', profit)}
              </Typography>
            </div>
          </div>
          <div className="expense_summary_details w-full">
            <Typography variant="body1" className="expense_summary_details_title">
              Details
            </Typography>
            {Object.entries(expenseByCategory).length === 0 ? (
              <div className="w-full h-full flex flex-row items-center justify-center">
                <Typography className="subtitle">No Data Available</Typography>
              </div>
            ) : (
              <ul className="expense_summary_details_list">
                {Object.entries(expenseByCategory).map(([cat, total]) => (
                  <li key={cat} className="expense_summary_details_item">
                    <Typography variant="body1" className="expense_summary_details_item_label">
                      {cat}
                    </Typography>
                    <Typography variant="body2" className="expense_summary_details_item_amount">
                      {formatCurrency('INR', total)}
                    </Typography>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
