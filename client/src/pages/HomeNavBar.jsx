import React from 'react'
import Footer from '../components/Footer'
import UserHeader from '../components/Headers/UserHeader'
import ManagerHeader from '../components/Headers/ManagerHeader'
import GuestHeader from '../components/Headers/GuestHeader'
import { Outlet, useNavigate } from 'react-router-dom'
import { deleteRequest } from '../modules/requests/server_requests'
import { useDispatch, useSelector } from 'react-redux';



function HomeNavBar({ countCartItems, setCountCartItems }) {
    const status = useSelector(state => state.app.status);
    const token = useSelector((state) => state.app.token);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function logOut() {
       await deleteRequest(`http://localhost:3000/logOut`, token);
      await  dispatch({ type: 'SET_TOKEN', payload: '' });
      await  dispatch({ type: 'SET_STATUS', payload: 'guest' });
       await dispatch({ type: 'SET_USER', payload: {} });
       await localStorage.removeItem('currentUser');
      await  localStorage.removeItem('token');
       await localStorage.removeItem('status');
        navigate('/home');
    }

    return (

        <div>
            {status == 'manager' ? < ManagerHeader logOut={logOut} /> : status == "user" ? <UserHeader setCountCartItems={setCountCartItems} countCartItems={countCartItems} logOut={logOut} /> : <GuestHeader logOut={logOut} />}
            <main >
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default HomeNavBar
