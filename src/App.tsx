import { useState } from 'react'
import './App.css'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Auth } from './views/auth/index'
import { ExpenseTracker } from './views/expense/ExpenseTracker'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/expense-tracker' element={
        <ProtectedRoute route={<ExpenseTracker/>} /> }
         />
      </Routes>
    </BrowserRouter>
  )
}

export default App
