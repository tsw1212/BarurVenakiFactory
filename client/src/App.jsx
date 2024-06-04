import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeNavBar from './pages/HomeNavBar';
import Home from './pages/Home';
import Users from './pages/managerPages/Users';
import AllOrders from './pages/managerPages/AllOrders';
import UserDetails from './pages/UserDetails';
import ShoppingCart from './pages/userPages/ShoppingCart';
import Confirmation from './pages/userPages/Confirmation';
import Product from './components/product/Product';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PastOrders from './pages/userPages/PastOrders';
import CurrentOrderDetails from './pages/userPages/CurrentOrderDetails';
// import Products from './pages/userPages/ProductsUser';
import Products from './pages/Products';
import ManagerProducts from './pages/managerPages/ManagerProducts';
import Order from './pages/managerPages/Order';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [status, setStatus] = useState(localStorage.getItem('status') || 'guest');
  const [chosenCartProducts, setChosenCartProducts] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='home' element={<HomeNavBar countCartItems={countCartItems} setToken={setToken} status={status} setStatus={setStatus} />}>
          <Route index element={<Home setToken={setToken} token={token} />} />
          <Route path='userDetails' element={<UserDetails token={token} />} />
          <Route path='users' element={<Users token={token} />} />
          <Route path='products'>
            <Route index element={<Products status={status} token={token} />} />
            <Route path=':nameProduct' element={<Product setCountCartItems={setCountCartItems} status={status} token={token} />} />
          </Route>
          <Route path='allOrders'>
            <Route index element={<AllOrders token={token} status={status}/>} />
            <Route path=':OrderId' element={<Order token={token} status={status} />} />
          </Route>
          <Route path='orders'  >
            <Route index element={<PastOrders token={token} status={status}/>} />
            <Route path=':OrderId' element={<Order token={token} status={status} />} />
          </Route>

          <Route path='shopping_cart'>
            <Route index element={<ShoppingCart token={token} chosenCartProducts={chosenCartProducts} setChosenCartProducts={setChosenCartProducts}/>} />
            <Route path='order' element={<CurrentOrderDetails token={token} chosenCartProducts={chosenCartProducts} setChosenCartProducts={setChosenCartProducts}/>} />
            <Route path='confirmation' element={<Confirmation />} />
          </Route>
        </Route>
        <Route path='login' element={<Login token={token} setToken={setToken} setStatus={setStatus} />} />
        <Route path='signup' element={<Signup token={token} setToken={setToken} setStatus={setStatus} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
