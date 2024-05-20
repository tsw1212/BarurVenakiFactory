import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'
import HomeNavBar from './pages/HomeNavBar'

function App() {
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('guest')

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Navigate to='/home' replace />} />
            <Route path='home' element={<HomeNavBar token={token} status={status}/>} >
              <Route index element={<Home token={token} />} />
              <Route path='users' element={<Users token={token} />} />
              <Route path='usersDetails' element={<UsersDetails token={token} />} />
              <Route path='shopping_cart'>
                <Route index element={<ShoppingCart />} />
                <Route path='confirmation' element={<Confirmation />} />
              </Route>
              <Route path='orders' element={<Home token={token} />} />
            </Route>
            <Route path='login' element={<Login setToken={setToken} setStatus={setStatus}/>} />
            <Route path='signup' element={<Signup setToken={setToken} />} />
            <Route path='allOrders' element={<AllOrders token={token} />} />
            <Route path='allUsers' element={<AllUsers token={token} />} />

          </Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
