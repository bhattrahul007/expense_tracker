import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ExpenseForm from '../expense-form';
import Dialog from '@mui/material/Dialog';
import type { Expense } from '../types';
import React from 'react';

interface EditExpenseModalProps {
  open: boolean;
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onClose: () => void;
}

export const EditExpenseModal: React.FC<EditExpenseModalProps> = ({ open, expense, onEdit, onClose }) => {
  return (
    <Dialog slotProps={{ paper: { sx: { maxWidth: '600px' } } }} open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        <ExpenseForm expense={expense} onEdit={onEdit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default EditExpenseModal;
