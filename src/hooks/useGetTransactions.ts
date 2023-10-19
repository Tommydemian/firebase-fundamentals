/* 
* Hook created to GET transactions from firestore database
*
*
*/

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
        setIsLoading(true);
        let unsubscribe: Unsubscribe;
        try {
            const transactionQuery = query(
                transactionCollectionRef,
                 where("userID", "==", authObject?.userID),
                 orderBy("createdAt") 
                 );

                 unsubscribe = onSnapshot(transactionQuery,(snapShot) => {

                    const docs: Transaction[] = []; 

                    console.log(snapShot);
                    snapShot.forEach((doc) => {
                        const data = doc.data();
                        const id = doc.id;

                        docs.push({ ...data, id } as Transaction);
                    });

                    setTransactions(docs);
                 });
                
        } catch (e) {
            const error = e as Error;
            console.error(error.message);   
        }
        finally {
            setIsLoading(false);
        }
        return () => unsubscribe && unsubscribe();
    };

    useEffect(() => {
      getTransactions();
    }, []);
    
    return { transactions, isLoading }; 
};