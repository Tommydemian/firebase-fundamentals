import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './features/transactions/transactionSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
    reducer: {
        transactions: transactionsReducer, 
        auth: authReducer
    }, 
  devTools: true
});

export type RootState = ReturnType<typeof store.getState> 
    
export type AppDispatch = typeof store.dispatch
