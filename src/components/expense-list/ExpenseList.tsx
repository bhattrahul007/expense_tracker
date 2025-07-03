import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { CATEGORY_LIST } from '../../constants/categories';
import { formatCurrency } from '../../utils/currency';
import formatDate from '../../utils/formatDate';
import { ActionMenu } from '../action-menu';
import type { Expense } from '../types';
import React from 'react';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
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
            <TableRow key={exp.id} className="expense_table_row hover:bg-gray-50 transition">
              <TableCell className="expense_table_cell">
                <Typography variant="body2" className="table_description_text">
                  {exp.description}
                </Typography>
              </TableCell>
              <TableCell align="center" className="expense_table_cell">
                <Typography variant="body2" className="table_amount_text">
                  {formatCurrency('INR', exp.amount)}
                </Typography>
              </TableCell>
              <TableCell align="center" className="expense_table_cell">
                <div className="table_category_container">
                  {(() => {
                    const cat = CATEGORY_LIST.find(c => c.id === exp.category.toLowerCase());
                    return (
                      <Typography
                        variant="body2"
                        className="table_category_text"
                        style={{ color: cat?.color ?? '#333' }}
                      >
                        {cat?.label ?? exp.category}
                      </Typography>
                    );
                  })()}
                </div>
              </TableCell>
              <TableCell align="center" className="expense_table_cell ">
                <Typography className="table_date_text">{formatDate(exp.date)}</Typography>
              </TableCell>
              <TableCell align="center" className="expense_table_cell">
                <ActionMenu onDelete={() => onDelete(exp.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
