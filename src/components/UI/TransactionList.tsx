import { useEffect } from 'react';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { Transaction } from '../../types/index';
// components
// import { LoadingSpinner } from './LoadingSpinner';
import styles from './transaction-list.module.css';

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
    <div className={styles.transactions}>
      <h3>Transactions</h3>
      <ul className={styles.transactions_ul}>
        {transactions.map((transaction: Transaction) =>  {
          const { description, transactionType, transactionAmount, id } = transaction;
          return (
            <li className={styles.transactions_li} key={id}>
              <h4>{description}</h4>
              <p>${transactionAmount} - <label style={{ color: transactionType === 'expense'? "red" : "green" }}>{transactionType}</label></p>
            </li>
          );
        })}
      </ul>
     </div>
  );
};
