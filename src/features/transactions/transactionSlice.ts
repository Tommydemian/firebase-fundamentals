import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../../types/index';

export type TransactionsState = {
    entities: Transaction[]
}

const initialState: TransactionsState = {
    entities: []  
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState, 
    reducers: {
        addTransactionToRedux: (state, action: PayloadAction<Transaction>) => {
            state.entities.push(action.payload);
        }
    }
});

export const { addTransactionToRedux } = transactionsSlice.actions;

export default transactionsSlice.reducer;
