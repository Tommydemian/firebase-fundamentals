import React, { useState } from 'react';
import { useAddTransaction } from '../../hooks/useAddTransaction';
// Components
import { LoadingSpinner } from '../UI/LoadingSpinner';

export const TransactionForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<'expense' | 'income'>('expense');

  // currying to handleChange
  const handleChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>) => (e: React.ChangeEvent<HTMLInputElement> ) => {
    setter(e.target.value as unknown as T); 
  };

  const { addTransaction, isLoading } = useAddTransaction({ description, transactionAmount: amount, transactionType: type });

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTransaction();
  };

  if (isLoading) { 
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <form className="add-transaction" onSubmit={onSubmit}>
          <input
           type="text"
            placeholder='Description'
            value={description}
            onChange={handleChange(setDescription)}
            required 
            />
          <input 
            type="number"
            placeholder='Amount'
            value={amount}
            onChange={handleChange(setAmount)}
            required
            />
          <label htmlFor="expense">Expense</label>
          <input 
            type="radio"
            id='expense'
            value="expense"
            checked={type === 'expense'}
            onChange={handleChange(setType)} 
            />
          <label htmlFor="income">Income</label>
          <input 
            type="radio"
            id='income'
            value="income"
            checked={type === 'income'}
            onChange={handleChange(setType)} 
            />
          <button type='submit'>Send Transaction</button>
        </form>
  );
};
