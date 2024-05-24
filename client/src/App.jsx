import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'
import HomeNavBar from './pages/HomeNavBar'
import Home from './pages/Home'
import Users from './pages/managerPages/Users'
import AllOrders from './pages/managerPages/AllOrders'
import UserDetails from './pages/userPages/UserDetails'
import ShoppingCart from './pages/userPages/ShoppingCart'
import Confirmation from './pages/userPages/Confirmation'
import Product from './components/product/Product'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Orders from './pages/userPages/Orders'
function App() {
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('guest')

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Navigate to='/home' replace />} />
            <Route path='home' element={<HomeNavBar setToken={setToken} status={status} setStatus={setStatus}/>} >
              <Route index element={<Home setToken={setToken} token={token} status={status} />} />
              <Route path='users' element={<Users token={token} />} />
              <Route path='products/:name' element={<Product status={status} token={token} />} />
              <Route path='allOrders' element={<AllOrders token={token} />} />
              <Route path='userDetails' element={<UserDetails token={token} />} />
              <Route path='orders' element={<Orders token={token} />} />
              <Route path='shopping_cart'>
                <Route index element={<ShoppingCart />} />
                <Route path='confirmation' element={<Confirmation />} />
              </Route>
            </Route>
            
            <Route path='login' element={<Login token={token} setToken={setToken} setStatus={setStatus}/>} />
            <Route path='signup' element={<Signup token={token} setToken={setToken} setStatus={setStatus}/>} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
