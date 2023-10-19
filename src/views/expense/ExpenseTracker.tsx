// Compoents
import { TransactionForm } from '../../components/container/TransactionForm';
import { TransactionList } from '../../components/UI/TransactionList';
// Hooks
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
 
export const ExpenseTracker = () => {
  
  const { authObject } = useGetUserInfo();
  
  return (
    <>
    <div className='expense-tracker'>
      <div className='container'>
        <h1>{authObject?.name} Expense Tracker</h1>
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
        <TransactionForm />
      </div>
      </div>
      {/* Display transactions */}
      <TransactionList />
      </>
  );
};
