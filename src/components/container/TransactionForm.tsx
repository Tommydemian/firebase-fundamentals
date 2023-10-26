import React, { useState } from 'react';
// import { useAddTransaction } from '../../hooks/useAddTransaction';
// Components
import { LoadingSpinner } from '../UI/LoadingSpinner';
// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux/useRedux';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
// import { addTransactionToRedux } from '../../features/transactions/transactionSlice';
// Slice/s
import { addTransaction } from '../../features/transactions/transactionSlice';


export const TransactionForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<'expense' | 'income'>('expense');

  const dispatch = useAppDispatch();

  const { authObject } = useGetUserInfo();
  const isLoading = useAppSelector(state => state.transactions.loadingAddTransaction);
  

  // currying to handleChange
  const handleChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>) => (e: React.ChangeEvent<HTMLInputElement> ) => {
    setter(e.target.value as unknown as T); 
  };
  
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // create transaction document and add it to Redux
    dispatch(addTransaction({ userID: authObject?.userID || '', transactionAmount:amount, transactionType:type, description }));
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
