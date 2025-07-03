import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import type { Expense } from './ExpenseList';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const summary = expenses.reduce<Record<string, number>>((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  if (expenses.length === 0) {
    return <Typography variant="body1">No expenses to summarize.</Typography>;
  }

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Expense Summary
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(summary).map(([cat, total]) => (
            <Grid key={cat} sx={{ flex: 1, minWidth: 120, mb: 1 }}>
              <Typography>
                {cat}: INR {total.toFixed(2)}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
