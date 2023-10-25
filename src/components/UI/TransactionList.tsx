// Hooks
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useDeleteTransaction } from '../../hooks/useDeleteTransaction';
import { useAppSelector } from '../../hooks/redux/useRedux';
import { useAppDispatch } from '../../hooks/redux/useRedux';
// Components
import { LoadingSpinner } from './LoadingSpinner';
// Redux
import { removeTransactionFromRedux } from '../../features/transactions/transactionSlice';
// Types
import { Transaction } from '../../types/index';
// Styles
import styles from './transaction-list.module.css';

export const TransactionList = () => {
  // Fetch transactions from the database
  const { transactions } = useGetTransactions();

  // Get loading state from Redux
  const isLoading = useAppSelector(state => state.transactions.loading);

  // Hook to handle the deletion of transactions
  const { deleteTransaction } = useDeleteTransaction();

  // Dispatch function to interact with Redux store
  const dispatch = useAppDispatch();

  // Render loading spinner while transactions are being fetched
  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <div className={styles.transactions}>
      <h3>Transactions</h3>
      <ul className={styles.transactions_ul}>
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction: Transaction) => {
            const { description, transactionType, transactionAmount, id } = transaction;
            return (
              <>
                <li className={styles.transactions_li} key={id}>
                  <h4>{description}</h4>
                  <p>${transactionAmount} - <label style={{ color: transactionType === 'expense' ? "red" : "green" }}>{transactionType}</label></p>
                </li>
                <button onClick={() => {
                  // Delete transaction from the database and update Redux store
                  deleteTransaction(id!);
                  dispatch(removeTransactionFromRedux(id!));
                }}>
                  Delete transaction
                </button>
              </>
            );
          })
        ) : (
          <li>No transactions available</li>
        )}
      </ul>
    </div>
  );
};
