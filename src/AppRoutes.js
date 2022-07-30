import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CoinPage from './Pages/CoinPage'
import HomePage from './Pages/HomePage'

function AppRoutes() {
  return (
        <Routes>
            <Route path='/' exact element={<HomePage />}/>
            <Route path='/coin/:id/:name' element={<CoinPage />}/>
        </Routes>
  )
}

export default AppRoutes