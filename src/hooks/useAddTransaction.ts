import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
// Hooks
import { useGetUserInfo } from './useGetUserInfo';

type UseAddTransactionParams = {
    description: string, 
    transactionAmount: number, 
    transactionType: string,
}

export const useAddTransaction = ({ description, transactionAmount, transactionType }: UseAddTransactionParams) => {

    const [isLoading, setIsLoading] = useState(false);

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
            await addDoc(transactionCollectionRef, {
                userID: authObject?.userID || '',
                description: description, 
                transactionAmount: transactionAmount, 
                transactionType: transactionType, 
                createdAt: serverTimestamp()
            });
        } catch(e) {
            const error = e as Error;
            console.error("Error occurred while adding a transaction:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { addTransaction, isLoading };
};