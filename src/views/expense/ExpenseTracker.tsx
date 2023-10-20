import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
// Compoents
import { TransactionCreator } from '../../components/container/TransactionCreator';
import { TransactionList } from '../../components/UI/TransactionList';
// Hooks
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { useNavigate } from 'react-router-dom';
 
export const ExpenseTracker = () => {

  const navigate = useNavigate();
  const { authObject } = useGetUserInfo();

  const signUserOut = async() => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/');
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
      
    }
  };
  
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
