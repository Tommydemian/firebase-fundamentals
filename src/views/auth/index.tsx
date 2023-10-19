import { useState } from 'react';
/* 
auth => result of getAuth(app)
provider => result of new GoogleAuthProvider()
*/
import { auth, provider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// Types
import { AuthInfo } from '../../types/index';

export const Auth = () => {

  const [errorMssg, setErrorMssg] = useState('');

  const navigate = useNavigate();
 
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const authInfo: AuthInfo = {
        userID: res.user.uid,
        name: res.user.displayName || 'Default user', 
        profilePhoto: res.user.photoURL, 
        isAuth: true 
      }; 
      const authInfoStr = JSON.stringify(authInfo);
      localStorage.setItem('auth', authInfoStr);
      navigate('/expense-tracker');
    } catch (error) {
      setErrorMssg('Sorry, there was an issue logging in with your Google account. Please try again.'); 
      console.error('Error during Google login:', error);    
    }
  };

  if (errorMssg) {
    return (
      <p>{errorMssg}</p>
    );
  }
  
  return (
    <div className='login-page'>
      <p>Sign in with Google</p>
      <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
