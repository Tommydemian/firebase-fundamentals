import { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux/useRedux';
import { query, collection, where, orderBy, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { Transaction } from '../types/index';
import { setLoading } from '../features/transactions/transactionSlice';

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const dispatch = useAppDispatch();

    const transactionCollectionRef = collection(db, 'transactions');
    const { authObject } = useGetUserInfo();

    // function to get transactions from the database
    const getTransactions = () => {
        let unsubscribe: Unsubscribe;
        dispatch(setLoading(true));
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
                    dispatch(setLoading(false));
                 });
                
        } catch (e) {
            const error = e as Error;
            console.error('Error retrieving transactions', error.message);   
            dispatch(setLoading(false));
        }
        return () => unsubscribe && unsubscribe();
    };

    useEffect(() => {
        const unsubscribe = getTransactions();
        return () => unsubscribe && unsubscribe();
    }, [authObject?.userID]);
    
    
    return { transactions }; 
};