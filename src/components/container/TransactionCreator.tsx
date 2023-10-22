import { useState, useEffect, useMemo } from 'react';
import { TransactionForm } from './TransactionForm';
// Hooks
import { useGetTransactions } from '../../hooks/useGetTransactions';
// utils 
import { calculateTotal } from '../../utils/calculateBalance';

export const TransactionCreator = () => {

  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const { transactions } = useGetTransactions();
  
    // Filter all [income] transactions type and map the value into a new Array
    const totalIncomeVal = useMemo(() => {
      const allIncomeArr = transactions.filter(transaction => transaction.transactionType === 'income')
      .map(el => String(el.transactionAmount));
      // calculate total amount and set it to the income state
      return calculateTotal((allIncomeArr));
    }, [transactions]);

    // Filter all [expense] transactions type and map the value into a new Array  
    const totalExpensesVal = useMemo(() => {
      const allExpensesArr = transactions.filter(transaction => transaction.transactionType === 'expense')
      .map(el => String(el.transactionAmount));
      
      // calculate total amount and set it to the expenses state
      return calculateTotal(allExpensesArr);
    }, [transactions]);
  
  useEffect(() => {
    setIncome(totalIncomeVal);
    setExpenses(totalExpensesVal);
  }, [totalIncomeVal, totalExpensesVal]);

  useEffect(() => {
    setBalance(income - expenses);
  }, [income, expenses]);

  return (
    <>
        <div className='balance'>
          <h3>Your Balance:</h3>
          <h2>${balance}</h2>
        </div>
        <div className="summary">
          <div className="income">
            <h4>Income:</h4>
            <p>{income}</p>
          </div>
          <div className="expenses">
            <h4>Expenses:</h4>
            <p>{expenses}</p>
          </div>
        </div>
        <TransactionForm />
    </>     
  );
};
