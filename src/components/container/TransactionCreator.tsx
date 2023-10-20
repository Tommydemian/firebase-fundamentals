import { TransactionForm } from './TransactionForm';

export const TransactionCreator = () => {
  return (
    <>
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
    </>     
  );
};
