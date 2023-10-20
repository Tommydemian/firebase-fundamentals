import { useState, useEffect } from 'react';
import { query, collection, where, orderBy, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { Transaction } from '../types/index';

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const transactionCollectionRef = collection(db, 'transactions');
    const { authObject } = useGetUserInfo();

    // function to get transactions from the database
    const getTransactions = () => {
        let unsubscribe: Unsubscribe;
        setIsLoading(true);
        try {
            const transactionQuery = query(
                transactionCollectionRef,
                 where("userID", "==", authObject?.userID),
                 orderBy("createdAt") 
                 );

                 unsubscribe = onSnapshot(transactionQuery,(snapShot) => {

                    const docs: Transaction[] = []; 

                    snapShot.forEach((doc) => {
                        const data = doc.data();
                        const id = doc.id;

                        docs.push({ ...data, id } as Transaction);
                    });

                    setTransactions(docs);
                    setIsLoading(false);
                 });
                
        } catch (e) {
            const error = e as Error;
            console.error('Error retrieving transactions', error.message);   
            setIsLoading(false);
        }
        return () => unsubscribe && unsubscribe();
    };

    // useEffect(() => {
    //   getTransactions();
    // }, []);

    useEffect(() => {
        const unsubscribe = getTransactions();
        return () => unsubscribe && unsubscribe();
    }, [authObject?.userID]); // Agregar dependencias aquí
    
    
    return { transactions, isLoading }; 
};