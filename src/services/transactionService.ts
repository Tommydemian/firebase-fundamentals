import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// normally in redux query we use fetchBaseQuery but since we are just querying the database and firebase does not have any put,delete,update api, we use fakeBaseQuery()

// Define a type for the args my mutation is going to receive 
type AddTransactionArgs = {
    userID: string;
    description: string;
    transactionAmount: number;
    transactionType: string;
  };

  type TransactionResult = {
    id: string;
    success: boolean;
  };

export const transactionsApi = createApi({
    reducerPath: 'transactionsApi',
    baseQuery:  fakeBaseQuery(), 
    // tagTypes: ['Transactions'],
    endpoints: (builder) => {
        return {
            addTransaction: builder.mutation<TransactionResult, AddTransactionArgs>({
                // since we are using fakeBaseQuery we use queryFn
                queryFn: async(args: AddTransactionArgs) => {
                    // define transaction Ref
                    const transactionCollectionRef = collection(db, 'transactions');
                    try {
                        const docRef = await addDoc(transactionCollectionRef, {
                            ...args, 
                            createdAt: serverTimestamp()
                          });
                    return { data: { id: docRef.id, success: true } };
                    } catch (err) {
                        console.error(err);
                        return { error: err };
                    }
                }
            })
        };
    }
});

export const { useAddTransactionMutation } = transactionsApi; 