import { useState,useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeNavBar from './pages/HomeNavBar';
import Home from './pages/Home';
import Users from './pages/managerPages/Users';
import AllOrders from './pages/managerPages/AllOrders';
import UserDetails from './pages/userPages/UserDetails';
import ShoppingCart from './pages/userPages/ShoppingCart';
import Confirmation from './pages/userPages/Confirmation';
import Product from './components/product/Product';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PastOrders from './pages/userPages/PastOrders';
import CurrentOrderDetails from './pages/userPages/CurrentOrderDetails';
import Products from './pages/Products';
import Order from './pages/managerPages/Order';
import FactoryDetails from './pages/managerPages/FactoryDetails';
import NotFound from './pages/NotFound';
import ContactUs from './pages/ContactUs';



function App() {
  const [chosenCartProducts, setChosenCartProducts] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0);


  // const dispatch = useDispatch();


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='home' element={<HomeNavBar setCountCartItems={setCountCartItems}  countCartItems={countCartItems}    />}>
          <Route index element={<Home   />} />
          <Route path='contactUs' element={< ContactUs />} />
          <Route path='userDetails' element={<UserDetails  />} />
          <Route path='factoryDetails' element={<FactoryDetails  />} />
          <Route path='users' element={<Users  />} />
          <Route path='products'>
            <Route index element={<Products   />} />
            <Route path=':nameProduct' element={<Product setCountCartItems={setCountCartItems}   />} />
          </Route>
          <Route path='allOrders'>
            <Route index element={<AllOrders   />} />
            <Route path=':OrderId' element={<Order   />} />
          </Route>
          <Route path='orders'  >
            <Route index element={<PastOrders   />} />
            <Route path=':OrderId' element={<Order   />} />
          </Route>

          <Route path='shopping_cart'>
            <Route index element={<ShoppingCart  chosenCartProducts={chosenCartProducts} setChosenCartProducts={setChosenCartProducts} />} />
            <Route path='order' element={<CurrentOrderDetails  chosenCartProducts={chosenCartProducts} setChosenCartProducts={setChosenCartProducts} />} />
            <Route path='confirmation' element={<Confirmation />} />
          </Route>
        </Route>
        <Route path='login' element={<Login    />} />
        <Route path='signup' element={<Signup    />} />
        <Route path='signup' element={<Signup    />} />
        <Route path='*' element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
