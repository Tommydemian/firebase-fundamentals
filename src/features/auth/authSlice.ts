import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthInfo } from '../../types/index';

type AuthState = {
    // loggedIn: boolean
    // loading: boolean,
    userInfo: AuthInfo,
    // userToken: string | null,
    // error: string | null
    // success: boolean
}

const initialState: AuthState = {
//   loggedIn: false,
//   loading: false,
  userInfo: {
    userID: '',
    name: '', 
    profilePhoto: '', 
    isAuth: false
  }, // for user object
//   userToken: null, // for storing the JWT
//   error: null,
  //   success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<AuthInfo>) => {
            state.userInfo = action.payload;
        },
        clearUserInfo : (state) => {
            state.userInfo = {
                userID: '', 
                name: '', 
                profilePhoto: '', 
                isAuth: false
            };
        }
    }
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;

export default authSlice.reducer;