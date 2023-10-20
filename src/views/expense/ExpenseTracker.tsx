// Compoents
import { TransactionCreator } from '../../components/container/TransactionCreator';
import { TransactionList } from '../../components/UI/TransactionList';
// Hooks
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
 
export const ExpenseTracker = () => {
  
  const { authObject } = useGetUserInfo();
  
  return (
    <>
    <div className='expense-tracker'>
      <div className='container' style={{ border: '1px solid red' }}>
        {
          authObject?.profilePhoto && <img src={authObject.profilePhoto} alt="profile-picture" style={{ borderRadius: '100%', float: 'right', cursor: 'pointer' }} />
        }
        <button onClick={signUserOut}>Sign Out</button>
        <h1>{authObject?.name} Expense Tracker</h1>
        <TransactionCreator />
      </div>
      </div>
      <TransactionList />
      </>
  );
};
