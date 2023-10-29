import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';

import { ThemeProvider } from './contexts/theme-context';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth } from './views/auth/index';
import { ExpenseTracker } from './views/expense/ExpenseTracker';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {

  return (
    <ThemeProvider>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/expense-tracker' element={
        <ProtectedRoute route={<ExpenseTracker/>} /> }
         />
      </Routes>
    </BrowserRouter>
    </Provider>
    </ThemeProvider>
  );
}

export default App;
