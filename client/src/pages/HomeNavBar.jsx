import React from 'react'
import { useEffect } from 'react';
import Footer from '../components/Footer'
import UserHeader from '../components/Headers/UserHeader'
import ManagerHeader from '../components/Headers/ManagerHeader'
import GuestHeader from '../components/Headers/GuestHeader'
import { Outlet, useNavigate } from 'react-router-dom'
import { deleteRequest, getRequest } from '../modules/requests/server_requests'
import { useDispatch, useSelector } from 'react-redux';



function HomeNavBar({ countCartItems, setCountCartItems }) {
    const status = useSelector(state => state.app.status);
    const token = useSelector((state) => state.app.token);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    async function logOut() {
        await deleteRequest(`http://localhost:3000/logOut`, token);
        let dataRequest = await getRequest(`http://localhost:3000/guest_token`);
        if (dataRequest.ok) {
            localStorage.setItem('token', dataRequest.token);
            await dispatch({ type: 'SET_TOKEN', payload: dataRequest.token });
        }
        await dispatch({ type: 'SET_STATUS', payload: 'guest' });
        await dispatch({ type: 'SET_USERS', payload: [] });
        await dispatch({ type: 'SET_PRODUCTS', payload: [] });
        await dispatch({ type: 'SET_ORDERS', payload: [] });
        await dispatch({ type: 'SET_USER', payload: {} });
        await localStorage.setItem('status', 'guest');
        await localStorage.removeItem('currentUser');
        await localStorage.removeItem('token');
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
