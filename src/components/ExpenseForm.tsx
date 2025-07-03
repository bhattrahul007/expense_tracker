import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Box, Typography, Alert } from '@mui/material';
import type { ExpenseInput } from '../context/types';

const categories = ['Food', 'Travel', 'Bills', 'Others'];

interface ExpenseFormProps {
  onAdd: (expense: ExpenseInput) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExpenseInput>({
    defaultValues: { description: '', amount: 0, category: '' },
  });
  const [submitError, setSubmitError] = React.useState('');

  const onSubmit = (data: ExpenseInput) => {
    setSubmitError('');
    if (!data.description.trim()) {
      setSubmitError('Description is required.');
      return;
    }
    if (data.amount <= 0) {
      setSubmitError('Amount must be a positive number.');
      return;
    }
    if (!data.category) {
      setSubmitError('Category is required.');
      return;
    }
    onAdd({ ...data, description: data.description.trim() });
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}
    >
      <Typography variant="h6">Add Expense</Typography>
      {submitError && <Alert severity="error">{submitError}</Alert>}
      <Controller
        name="description"
        control={control}
        rules={{ required: 'Description is required.' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            error={!!errors.description}
            helperText={errors.description?.message}
            required
            fullWidth
          />
        )}
      />
      <Controller
        name="amount"
        control={control}
        rules={{ required: 'Amount is required.', min: { value: 0.01, message: 'Amount must be positive.' } }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Amount (INR)"
            type="number"
            error={!!errors.amount}
            helperText={errors.amount?.message}
            inputProps={{ min: 0, step: '0.01' }}
            required
            fullWidth
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        rules={{ required: 'Category is required.' }}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Category"
            error={!!errors.category}
            helperText={errors.category?.message}
            required
            fullWidth
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Expense
      </Button>
    </Box>
  );
};

export default ExpenseForm;
