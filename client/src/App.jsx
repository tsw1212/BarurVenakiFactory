import { useState, useEffect } from 'react';
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
import Order from './pages/Order';
import FactoryDetails from './pages/managerPages/FactoryDetails';
import NotFound from './pages/NotFound';
import ContactUs from './pages/ContactUs';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest } from './modules/requests/server_requests';
import AccessibilityButton from './components/AccessibilityButton';




function App() {
  const [chosenCartProducts, setChosenCartProducts] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0);
  let token = useSelector((state) => state.app.token);



  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      let updateToken;
      let updatedStatus;
      let updatedUser;

      if (token === "") {
        updateToken = localStorage.getItem("token");
        if (!updateToken) {
          let dataRequest = await getRequest(`http://localhost:3000/guest_token`);
          if (dataRequest.ok) {
            localStorage.setItem('token', dataRequest.token);
            dispatch({ type: 'SET_TOKEN', payload: dataRequest.token });
          }
        } else {
          updatedStatus = localStorage.getItem("status");
          updatedUser = localStorage.getItem("currentUser");
          dispatch({ type: 'SET_TOKEN', payload: updateToken });
          dispatch({ type: 'SET_STATUS', payload: updatedStatus });
          dispatch({ type: 'SET_USER', payload: JSON.parse(updatedUser) });
        }
      }
    };

    const executeFetchData = async () => {
      await fetchData();
    };

    executeFetchData();
  }, [token]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/' element={<HomeNavBar setCountCartItems={setCountCartItems} countCartItems={countCartItems} />}>
          <Route path='home' element={<Home />} />
          <Route path='contactUs' element={< ContactUs />} />
          <Route path='userDetails' element={<UserDetails />} />
          <Route path='factoryDetails' element={<FactoryDetails />} />
          <Route path='users' element={<Users />} />
          <Route path='products'>
            <Route index element={<Products />} />
            <Route path=':nameProduct' element={<Product setCountCartItems={setCountCartItems} />} />
          </Route>
          <Route path='allOrders'>
            <Route index element={<AllOrders />} />
            <Route path=':OrderId' element={<Order />} />
          </Route>
          <Route path='orders'  >
            <Route index element={<PastOrders />} />
            <Route path=':OrderId' element={<Order />} />
          </Route>

          <Route path='shopping_cart'>
            <Route index element={<ShoppingCart setCountCartItems={setCountCartItems} chosenCartProducts={chosenCartProducts} setChosenCartProducts={setChosenCartProducts} />} />
            <Route path='order' element={<CurrentOrderDetails chosenCartProducts={chosenCartProducts} setChosenCartProducts={setChosenCartProducts} />} />
            <Route path='confirmation' element={<Confirmation />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>

        <Route path='*' element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
