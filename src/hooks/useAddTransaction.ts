import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
// Hooks
import { useGetUserInfo } from './useGetUserInfo';
// types
import { Transaction } from '../types/index';

type UseAddTransactionParams = {
    description: string, 
    transactionAmount: number, 
    transactionType: string,
}

export const useAddTransaction = ({ description, transactionAmount, transactionType }: UseAddTransactionParams) => {

    const [isLoading, setIsLoading] = useState(false);
    const [newTransaction, setNewTransaction] = useState<Transaction>();

    const { authObject } = useGetUserInfo();
    const transactionCollectionRef = collection(db, 'transactions');  

    const addTransaction = async() => {
        // clause guard
        if (!description || !transactionAmount || !transactionType) {
            console.error("Invalid data: All fields are required.");
            return;
        }
    
        setIsLoading(true);
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
            setIsLoading(false);
        }
    };

    return { addTransaction, isLoading, newTransaction };
};