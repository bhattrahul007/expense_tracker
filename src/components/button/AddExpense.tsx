import { Button, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import React from 'react';

interface AddButtonProps {
  onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = React.memo(({ onClick }) => (
  <Button
    disableElevation
    className="add_expense_button"
    onClick={onClick}
    variant="contained"
    fullWidth
    startIcon={<AddOutlined />}
  >
    <Typography>Add</Typography>
  </Button>
));

export default AddButton;
