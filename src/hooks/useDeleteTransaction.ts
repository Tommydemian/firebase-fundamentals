// import { useState } from 'react';
import { useAppDispatch } from '../hooks/redux/useRedux';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
// Hooks
// import { useGetUserInfo } from './useGetUserInfo';
// Slice
import { setLoading } from '../features/transactions/transactionSlice';
// types
// import { Transaction } from '../types/index';

export const useDeleteTransaction = () => {
    const dispatch = useAppDispatch();
  
    const deleteTransaction = async (id: string) => {
      const docRef = doc(db, 'transactions', id);
      
      dispatch(setLoading(true));
      try {
        await deleteDoc(docRef);
        console.log('Document deleted');
      } catch (err) {
        const error = err as Error;
        console.error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };
  
    return { deleteTransaction };
  };    