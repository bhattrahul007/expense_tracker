import TransactionHeader from './components/transaction-header/TransactionHeader';
import { ExpenseProvider } from './context/expense-context/ExpenseProvider';
import ExpenseSummary from './components/expense-summary/ExpenseSummary';
import { useExpenses } from './context/expense-context/useExpenses';
import ExpenseForm from './components/expense-form/ExpenseForm';
import ExpenseList from './components/expense-list/ExpenseList';
import { useExpenseFilters } from './hooks/useExpenseFilters';
import FilterBar from './components/filter-bar/FilterBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from './components/modal/Modal';
import React from 'react';
import DoughnutChart from './components/charts/DonutChart';

const AppContent: React.FC = () => {
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const {
    selectedCategories,
    setSelectedCategories,
    selectedDates,
    setSelectedDates,
    clearFilters,
    filteredExpenses,
    categories,
  } = useExpenseFilters(expenses);

  return (
    <div className="app_container">
      <div className="app_container_layout">
        <h1 className="text-3xl font-bold">Welcome to Expense Tracker</h1>
        <p className="mb-8 text-neutral-500">Keep track of your expenses and income</p>

        {/* Summary component */}
        <div className="flex flex-col items-center md:flex-row md:items-stretch gap-4 mb-8">
          <ExpenseSummary expenses={expenses} />
          <DoughnutChart expenseData={expenses} />
        </div>

        {/* Transaction Header with filters */}
        <div className="flex flex-col items-center mb-4">
          <TransactionHeader onAddExpense={() => setOpenAdd(true)} />
          <div className="self-start">
            <FilterBar
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              selectedDates={selectedDates}
              onDateChange={setSelectedDates}
              onClear={clearFilters}
            />
          </div>
        </div>
        <ExpenseList expenses={filteredExpenses} onDelete={id => setDeleteId(id)} />
        <Modal title="Add Expense" open={openAdd} onClose={() => setOpenAdd(false)}>
          <ExpenseForm
            onAdd={expense => {
              addExpense(expense);
              setOpenAdd(false);
            }}
          />
        </Modal>
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
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <ExpenseProvider>
    <AppContent />
  </ExpenseProvider>
);

export default App;
