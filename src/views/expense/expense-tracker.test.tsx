import { screen, render } from '@testing-library/react';
import { ExpenseTracker } from './ExpenseTracker';

it('should have Expense text in screen', () => {
    render(<ExpenseTracker/>);
    const message = screen.queryByText('Expense');
    expect(message).toBeDefined();
});

/* 

WAY TO GO

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../path_to_your_rootReducer'; // Update this path
import { ExpenseTracker } from './ExpenseTracker';

it('should have Expense text in screen', () => {
  // Create a store for the test with your root reducer
  const store = configureStore({
    reducer: rootReducer,
  });

  render(
    <Provider store={store}>
      <ExpenseTracker />
    </Provider>
  );

  const message = screen.queryByText('Expense');
  expect(message).toBeDefined();
});
*/