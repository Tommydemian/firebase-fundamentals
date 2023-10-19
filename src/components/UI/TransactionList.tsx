import { useEffect } from 'react';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { Transaction } from '../../types/index';
// components
import { LoadingSpinner } from './LoadingSpinner';

export const TransactionList = () => {
  const { transactions, isLoading } = useGetTransactions();

  useEffect(() => {
    console.log(isLoading);
  },[isLoading]);

  if (isLoading) {
    //return <LoadingSpinner loading={isLoading} />;
    return 'loading';
  }

  return (
    <div className="transactions">
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction: Transaction) =>  {
          const { description, transactionType, transactionAmount, id } = transaction;
          return (
            <li key={id}>
              <h4>{description}</h4>
              <p>${transactionAmount} - <label style={{ color: transactionType === 'expense'? "red" : "green" }}>{transactionType}</label></p>
            </li>
          );
        })}
      </ul>
     </div>
  );
};
