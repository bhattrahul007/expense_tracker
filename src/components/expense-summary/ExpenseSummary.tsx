import { CATEGORY_LIST, INCOME_CATEGORY } from '../../constants/categories';
import { Card, CardContent, Typography } from '@mui/material';
import type { Expense } from '../expense-list/ExpenseList';
import { formatCurrency } from '../../utils/currency';
import React, { useMemo } from 'react';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const [expanded, setExpanded] = React.useState(false);

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

  // const expenseByCategory = expenses.reduce<Record<string, number>>((acc, exp) => {
  //   acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
  //   return acc;
  // }, {});

  return (
    <Card elevation={0} sx={{ mb: 4 }} className="expense_summary ">
      <CardContent className="expense_summary_content">
        <div className="expense_summary_content_layout">
          <div className="expense_summary_header">
            <Typography variant="h6" className="expense_summary_title">
              Overview
            </Typography>
            <button className="expense_summary_toggle" onClick={() => setExpanded(e => !e)}>
              {expanded ? 'Hide details' : 'Show details'}
            </button>
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
          {expanded && (
            <div className="expense_summary_details w-full">
              <Typography variant="body1" className="expense_summary_details_title">
                Details
              </Typography>
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
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
