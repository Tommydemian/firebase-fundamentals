import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../../types/index';

type TransactionsState = {
    entities: Transaction[],
    loading: boolean,
    error: string | null,
}

const initialState: TransactionsState = {
    entities: [], 
    loading: false, 
    error: null
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState, 
    reducers: {
        setLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        addTransactionToRedux: (state, action: PayloadAction<Transaction>) => {
            state.entities.push(action.payload);
        },
        removeTransactionFromRedux: (state, action: PayloadAction<string>) => {
            const index = state.entities.findIndex(transaction => transaction.id === action.payload);
            if (index !== -1) {
                state.entities.splice(index, 1);
            }
        }        
    }
});

export const { addTransactionToRedux, setLoading, removeTransactionFromRedux } = transactionsSlice.actions;

export default transactionsSlice.reducer;
