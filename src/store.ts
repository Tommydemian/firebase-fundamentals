import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './features/transactions/transactionSlice';
import authReducer from './features/auth/authSlice';

import { transactionsApi } from './services/transactionService';

export const store = configureStore({
    reducer: {
        transactions: transactionsReducer, 
        auth: authReducer,
        [transactionsApi.reducerPath]: transactionsApi.reducer
    }, 
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(transactionsApi.middleware),
  devTools: true
});

export type RootState = ReturnType<typeof store.getState> 
    
export type AppDispatch = typeof store.dispatch
