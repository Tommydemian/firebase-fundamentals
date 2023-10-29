import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { db } from '../../config/firebase';
// Types
import { Transaction } from '../../types/index';

type TransactionsState = {
    entities: Transaction[],
    loadingAddTransaction: boolean,
    loadingGetTransactions: boolean,
    loadingDeleteTransactions: boolean,
    error: string | null,
    loading: boolean
}

const initialState: TransactionsState = {
    entities: [], 
    loadingAddTransaction: false, 
    loadingGetTransactions: false, 
    loadingDeleteTransactions: false, 
    error: null,
    loading: false
};

// type AddTransactionParams = {
//     userID: string;
//     description: string; 
//     transactionAmount: number; 
//     transactionType: string;
// }

// Async Thunk
// export const addTransaction = createAsyncThunk(
//     'transactions/addTransactions', 
//     async({ userID, description, transactionAmount, transactionType }: AddTransactionParams) => {

//         const transactionCollectionRef = collection(db, 'transactions');
        
//         // clause guard
//         if (!description || !transactionAmount || !transactionType) {
//             console.error("Invalid data: All fields are required.");
//             return {};
//         }

//         try {
//             const docRef = await addDoc(transactionCollectionRef, {
//                 userID: userID,
//                 description: description, 
//                 transactionAmount: transactionAmount, 
//                 transactionType: transactionType, 
//                 createdAt: serverTimestamp()
//             });
//             // new transaction
//             return { id: docRef.id, userID, transactionAmount, transactionType, description };
//         } catch(e) {
//             const error = e as Error;
//             console.error("Error occurred while adding a transaction:", error.message);
//             return {};
//         } 
// });

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState, 
    reducers: {
        setLoading: (state, action:PayloadAction<boolean>) => {
            state.loadingAddTransaction = action.payload;
        },
        setLoadingAddTransaction: (state, action:PayloadAction<boolean>) => {
            state.loadingAddTransaction = action.payload;
        },
        
        setLoadingGetTransaction: (state, action:PayloadAction<boolean>) => {
            state.loadingGetTransactions = action.payload;
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
    // },extraReducers:(builder) => {
    //     builder
    //     .addCase(addTransaction.pending, state => {
    //         state.loadingAddTransaction = true;
    //         state.error = null;
    //     })
    //     .addCase(addTransaction.fulfilled, (state, action: PayloadAction<Transaction | unknown>) => {
    //         state.loadingAddTransaction = false;
    //         if (action.payload && Object.keys(action.payload).length > 0) {
    //             state.entities.push(action.payload as Transaction);
    //         } else {
    //             console.error('empty object returned');
    //         }})
    //     .addCase(addTransaction.rejected, state => {
    //         state.loadingAddTransaction = false;
    //         state.error = 'rejected';
    //     });
    // },
});

export const { addTransactionToRedux, setLoadingAddTransaction, setLoadingGetTransaction, setLoading, removeTransactionFromRedux } = transactionsSlice.actions;

export default transactionsSlice.reducer;
