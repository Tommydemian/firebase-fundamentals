import { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux/useRedux';
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { Transaction } from '../types/index';
import { setLoadingGetTransaction } from '../features/transactions/transactionSlice';
export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const dispatch = useAppDispatch();
    const { authObject } = useGetUserInfo();

    useEffect(() => {
        if (!authObject?.userID) return; // Asegurarse de que userID esté presente

        dispatch(setLoadingGetTransaction(true));

        const transactionQuery = query(
            collection(db, 'transactions'),
            where("userID", "==", authObject?.userID),
            orderBy("createdAt")
        );

        // Suscribirse a los cambios en la consulta
        const unsubscribe = onSnapshot(transactionQuery, (snapshot) => {
            const docs: Transaction[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                docs.push({ ...data, id: doc.id } as Transaction);
            });

            setTransactions(docs);
            dispatch(setLoadingGetTransaction(false));
        }, (error) => {
            console.error('Error retrieving transactions', error.message);
            dispatch(setLoadingGetTransaction(false));
        });

        // Limpiar la suscripción cuando el componente se desmonte o userID cambie
        return () => unsubscribe();

    }, [authObject?.userID, dispatch]);

    return { transactions };
};
