import React from 'react';

type Props = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    type: string;
    setType: React.Dispatch<React.SetStateAction<'expense' | 'income'>>;
}

export const TransactionForm: React.FC<Props> = ({ onSubmit, description, setDescription, amount, setAmount, type, setType }) => {

  // currying to handleChange
  const handleChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>) => (e: React.ChangeEvent<HTMLInputElement> ) => {
    setter(e.target.value as unknown as T); 
  };

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
