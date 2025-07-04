import React from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';
import { CATEGORY_LIST } from '../../constants/categories';
import { formatCurrency } from '../../utils/currency';
import formatDate from '../../utils/formatDate';
import { ActionMenu } from '../action-menu';
import type { Expense } from '../types';

interface ExpenseRowProps {
  expense: Expense;
  onDelete: (id: string) => void;
  onEdit?: (expense: Expense) => void;
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense, onDelete, onEdit }) => {
  const cat = CATEGORY_LIST.find(c => c.id === expense.category.toLowerCase());
  return (
    <TableRow className="expense_table_row hover:bg-gray-50 transition">
      <TableCell className="expense_table_cell">
        <Typography variant="body2" className="table_description_text">
          {expense.description}
        </Typography>
      </TableCell>
      <TableCell align="center" className="expense_table_cell">
        <Typography variant="body2" className="table_amount_text">
          {formatCurrency('INR', expense.amount)}
        </Typography>
      </TableCell>
      <TableCell align="center" className="expense_table_cell">
        <div className="table_category_container">
          <Typography variant="body2" className="table_category_text" style={{ color: cat?.color ?? '#333' }}>
            {cat?.label ?? expense.category}
          </Typography>
        </div>
      </TableCell>
      <TableCell align="center" className="expense_table_cell ">
        <Typography className="table_date_text">{formatDate(expense.date)}</Typography>
      </TableCell>
      <TableCell align="center" className="expense_table_cell">
        <ActionMenu onDelete={() => onDelete(expense.id)} onEdit={onEdit ? () => onEdit(expense) : undefined} />
      </TableCell>
    </TableRow>
  );
};

export default ExpenseRow;
