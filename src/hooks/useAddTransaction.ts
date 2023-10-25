import { useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
// Hooks
import { useGetUserInfo } from './useGetUserInfo';
// Slice
import { setLoading } from '../features/transactions/transactionSlice';
// types
import { Transaction } from '../types/index';

type UseAddTransactionParams = {
    description: string, 
    transactionAmount: number, 
    transactionType: string,
}

export const useAddTransaction = ({ description, transactionAmount, transactionType }: UseAddTransactionParams) => {

    const [newTransaction, setNewTransaction] = useState<Transaction>();

    const dispatch = useAppDispatch();

    const { authObject } = useGetUserInfo();
    const transactionCollectionRef = collection(db, 'transactions');  

 /**
 * Asynchronously adds a new transaction to the database.
 * Handles validation, state management, and error logging.
 * 
 * @async
 * @function addTransaction
 * @returns {void}
 */
    const addTransaction = async() => {
        // clause guard
        if (!description || !transactionAmount || !transactionType) {
            console.error("Invalid data: All fields are required.");
            return;
        }
        dispatch(setLoading(true));
        try {
            const docRef = await addDoc(transactionCollectionRef, {
                userID: authObject?.userID || '',
                description: description, 
                transactionAmount: transactionAmount, 
                transactionType: transactionType, 
                createdAt: serverTimestamp()
            });
            setNewTransaction({ id: docRef.id, userID: authObject?.userID, transactionAmount: transactionAmount, transactionType: transactionType, description: description });
        } catch(e) {
            const error = e as Error;
            console.error("Error occurred while adding a transaction:", error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { addTransaction, newTransaction };
};