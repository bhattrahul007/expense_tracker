import Container from '@mui/material/Container';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import { ExpenseProvider } from './context/ExpenseContext';
import { useExpenses } from './context/useExpenses';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from './components/Modal';
import React from 'react';

const AppContent: React.FC = () => {
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Expense Tracker</h1>
      <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={() => setOpenAdd(true)}>
        Add Expense
      </Button>
      <Modal open={openAdd} title="Add Expense" onClose={() => setOpenAdd(false)}>
        <ExpenseForm
          onAdd={expense => {
            addExpense(expense);
            setOpenAdd(false);
          }}
        />
      </Modal>
      <ExpenseList expenses={expenses} onDelete={id => setDeleteId(id)} />
      <Modal
        open={!!deleteId}
        title="Confirm Delete"
        onClose={() => setDeleteId(null)}
        actions={
          <>
            <Button onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                if (deleteId) {
                  deleteExpense(deleteId);
                  setDeleteId(null);
                }
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <Typography>Are you sure you want to delete this expense?</Typography>
      </Modal>
      <ExpenseSummary expenses={expenses} />
    </Container>
  );
};

const App: React.FC = () => (
  <ExpenseProvider>
    <AppContent />
  </ExpenseProvider>
);

export default App;
