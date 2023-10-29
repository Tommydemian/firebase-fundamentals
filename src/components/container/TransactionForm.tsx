import React, { useEffect, useState } from 'react';
// import { useAddTransaction } from '../../hooks/useAddTransaction';
// Components
import { LoadingSpinner } from '../UI/LoadingSpinner';
// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux/useRedux';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
// import { addTransactionToRedux } from '../../features/transactions/transactionSlice';
// Slice/s => Thunk
 import { addTransactionToRedux } from '../../features/transactions/transactionSlice';
// RTK Query
import { useAddTransactionMutation } from '../../services/transactionService';

export const TransactionForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<'expense' | 'income'>('expense');

  const dispatch = useAppDispatch();

  const { authObject } = useGetUserInfo();
  const loading = useAppSelector(state => state.transactions.loadingAddTransaction);

  //[1rts el => mutation trigger, {isLoading, error, data}: MutationResult ] = useMutation()
  const [addTransaction, { isLoading, error, data }] = useAddTransactionMutation();

  useEffect(() => {
    console.log(data);
  }, [data]);

  // currying to handleChange
  const handleChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>) => (e: React.ChangeEvent<HTMLInputElement> ) => {
    setter(e.target.value as unknown as T); 
  };
  
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // create Doc
      await addTransaction({ description, transactionAmount:amount, transactionType: type, userID: authObject?.userID || '' });
      
      if (data) {
        // If the mutation is successful, update the local Redux state
        dispatch(addTransactionToRedux({ id: data.id, description, transactionAmount: amount, transactionType: type, userID: authObject?.userID }));
      } else if (error) {
        // Handle the error accordingly
        console.error(error);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error(error);
    }
  };

  if (isLoading && loading) { 
    return <LoadingSpinner loading={loading && isLoading} />;
  }

  if (error) { 
    return 'Error';
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
