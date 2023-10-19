import React, { useState } from 'react';
// Hooks
import { useAddTransaction } from '../../hooks/useAddTransaction';
// Compoents
import { TransactionForm } from '../../components/UI/TransactionForm';
import { LoadingSpinner } from '../../components/UI/LoadingSpinner';
import { TransactionList } from '../../components/UI/TransactionList';
 
export const ExpenseTracker = () => { 
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<'expense' | 'income'>('expense');
  
  const { addTransaction, isLoading } = useAddTransaction({ description, transactionAmount: amount, transactionType: type });

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTransaction();
  };

  if (isLoading) { 
    return <LoadingSpinner loading={isLoading} />;
  }
  
  return (
    <>
    <div className='expense-tracker'>
      <div className='container'>
        <h1>Expense Tracker</h1>
        <div className='balance'>
          <h3>Your Balance:</h3>
          <h2>$0.00</h2>
        </div>
        <div className="summary">
          <div className="income">
            <h4>Income:</h4>
            <p>0.00</p>
          </div>
          <div className="expenses">
            <h4>Expenses:</h4>
            <p>0.00</p>
          </div>
        </div>
        <TransactionForm 
        amount={amount}
        description={description}
        onSubmit={onSubmit}
        setAmount={setAmount}
        setDescription={setDescription}
        type={type}
        setType={setType} />
      </div>
      </div>
      {/* Display transactions */}
      <TransactionList />
      </>
  );
};
