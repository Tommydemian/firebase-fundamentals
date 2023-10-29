import { useAppSelector } from './useRedux';

export const useGetTransactionsFromStore = () => {
    const transactions = useAppSelector(state => state.transactions.entities);
    const loading = useAppSelector(state => !!state.transactions.loadingGetTransactions);
    return { transactions, loading };
};