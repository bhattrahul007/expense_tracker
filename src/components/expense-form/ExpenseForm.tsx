import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Box, InputAdornment } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';
import { CATEGORY_LIST } from './../../constants/categories';
import type { ExpenseInput } from '../../context/types';
import type { Expense } from '../types';

interface ExpenseFormProps {
  onAdd?: (expense: ExpenseInput) => void;
  onEdit?: (expense: Expense) => void;
  expense?: Expense;
  onClose?: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd, onEdit, expense, onClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
  } = useForm<ExpenseInput>({
    defaultValues: expense
      ? { description: expense.description, amount: expense.amount, category: expense.category }
      : { description: '', amount: undefined, category: '' },
  });

  React.useEffect(() => {
    if (expense) {
      reset({
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
      });
    } else {
      reset({ description: '', amount: undefined, category: '' });
    }
  }, [expense, reset]);

  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false,
    message: '',
    severity: 'error',
  });

  const showError = (message: string) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const onSubmit = (data: ExpenseInput) => {
    if (typeof data.description !== 'string' || !data.description.trim()) {
      showError('Description is required and must be a valid string.');
      setError('description', { type: 'manual', message: 'Description is required.' });
      return;
    }
    if (
      (typeof data.amount !== 'number' && typeof data.amount !== 'string') ||
      isNaN(Number(data.amount)) ||
      Number(data.amount) <= 0
    ) {
      showError('Amount must be a number and greater than 0.');
      setError('amount', { type: 'manual', message: 'Amount must be a number and greater than 0.' });
      return;
    }
    if (!data.category || typeof data.category !== 'string' || !CATEGORY_LIST.some(c => c.id === data.category)) {
      showError('Category is required and must be valid.');
      setError('category', { type: 'manual', message: 'Category is required.' });
      return;
    }
    if (expense && onEdit) {
      onEdit({ ...expense, ...data, description: data.description.trim(), amount: Number(data.amount) });
    } else if (onAdd) {
      onAdd({ ...data, description: data.description.trim(), amount: Number(data.amount) });
    }
    onClose?.();
    reset();
  };
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, py: 2 }}
      >
        <Controller
          name="description"
          control={control}
          rules={{
            required: 'Description is required.',
            validate: value => (typeof value === 'string' && value.trim().length > 0) || 'Description is required.',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              error={!!errors.description}
              helperText={errors.description?.message}
              required
              fullWidth
              size="small"
              type="text"
            />
          )}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: 'Amount is required.',
              validate: value => {
                if (typeof value !== 'number' && typeof value !== 'string') return 'Amount must be a number.';
                const num = typeof value === 'string' ? parseFloat(value) : value;
                if (isNaN(num) || num <= 0) return 'Amount must be a number and greater than 0.';
                return true;
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                type="text"
                error={!!errors.amount}
                helperText={errors.amount?.message}
                required
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  inputMode: 'decimal',
                }}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            rules={{
              required: 'Category is required.',
              validate: value =>
                (typeof value === 'string' && value && CATEGORY_LIST.some(c => c.id === value)) ||
                'Category is required and must be valid.',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Category"
                error={!!errors.category}
                helperText={errors.category?.message}
                required
                fullWidth
                size={'small'}
              >
                {CATEGORY_LIST.map(cat => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          {expense ? 'Update Expense' : 'Add Expense'}
        </Button>
        <Button onClick={onClose} variant="outlined" type="button">
          Cancel
        </Button>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbar.severity}
          onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ExpenseForm;
