import { ExpenseProvider } from './context/expense-context/ExpenseProvider';
import { useExpenses } from './context/expense-context/useExpenses';
import { useExpenseFilters } from './hooks/useExpenseFilters';
import FilterBar from './components/filter-bar/FilterBar';
import type { Expense } from './components/types';
import {
  DeleteExpenseModal,
  EditExpenseModal,
  ExpenseForm,
  ExpenseList,
  ExpenseSummary,
  TransactionHeader,
  DoughnutChart,
  Modal,
} from './components';
import React from 'react';

const AppContent: React.FC = () => {
  const { expenses, addExpense, deleteExpense, editExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = React.useState<import('./components/types').Expense | null>(null);
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
        <ExpenseList
          expenses={filteredExpenses}
          onDelete={id => setDeleteId(id)}
          onEdit={expense => setEditingExpense(expense)}
        />
        <Modal title="Add Expense" open={openAdd} onClose={() => setOpenAdd(false)}>
          <ExpenseForm
            onAdd={expense => {
              addExpense(expense);
              setOpenAdd(false);
            }}
            onClose={() => setOpenAdd(false)}
          />
        </Modal>
        <EditExpenseModal
          open={!!editingExpense}
          expense={editingExpense as Expense}
          onEdit={expense => {
            editExpense(expense);
            setEditingExpense(null);
          }}
          onClose={() => setEditingExpense(null)}
        />
        <DeleteExpenseModal
          open={!!deleteId}
          onClose={() => setDeleteId(null)}
          onDelete={() => {
            if (deleteId) {
              deleteExpense(deleteId);
              setDeleteId(null);
            }
          }}
        />
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
