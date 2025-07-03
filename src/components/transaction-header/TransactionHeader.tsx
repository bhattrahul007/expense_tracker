import AddButton from './../button/AddExpense';
import { Typography } from '@mui/material';
import React from 'react';

export interface TransactionHeaderProps {
  openAddExpenseModal: (open: boolean) => void;
}

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({ openAddExpenseModal }) => (
  <div className="transaction transaction_header">
    <div className="transaction_header_content">
      <Typography variant="h3" className="transaction_header_title">
        Transactions
      </Typography>
    </div>
    <div className="transaction_header_actions">
      <AddButton onClick={() => openAddExpenseModal(true)} />
    </div>
  </div>
);

export default TransactionHeader;
