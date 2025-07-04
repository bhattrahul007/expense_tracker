import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { formatCurrency } from '../../utils/currency';
import React from 'react';
import ExpenseRow from './ExpenseRow';

import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit?: (expense: Expense) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete, onEdit }) => {
  return (
    <TableContainer component={Paper} sx={{ mb: 4 }} className="expense_table_container rounded-xl shadow bg-white">
      <Table size="small" className="expense_table">
        <TableHead className="expense_table_head">
          <TableRow className="expense_table_head_row bg-gray-100">
            <TableCell className="expense_table_cell">
              <Typography className="expense_table_cell_title">Description</Typography>
            </TableCell>
            <TableCell align="center" className="expense_table_cell font-bold">
              <Typography className="expense_table_cell_title">{formatCurrency('INR')} Amount</Typography>
            </TableCell>
            <TableCell width={150} align="center" className="expense_table_cell font-bold">
              <Typography className="expense_table_cell_title">Category</Typography>
            </TableCell>
            <TableCell width={200} align="center" className="expense_table_cell font-bold">
              <Typography className="expense_table_cell_title">Date</Typography>
            </TableCell>
            <TableCell align="center" className="expense_table_cell font-bold" width={100}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.length === 0 && (
            <TableRow className="expense_table_row">
              <TableCell align="center" colSpan={5} className="expense_table_cell not-found">
                No expenses found.
              </TableCell>
            </TableRow>
          )}
          {expenses.map(exp => (
            <ExpenseRow key={exp.id} expense={exp} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
