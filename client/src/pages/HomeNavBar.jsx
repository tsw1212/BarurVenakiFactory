import React from 'react'
import Footer from '../components/Footer'
import UserHeader from '../components/Headers/UserHeader'
import ManagerHeader from '../components/Headers/ManagerHeader'
import GuestHeader from '../components/Headers/GuestHeader'
import { Outlet, useNavigate } from 'react-router-dom'


function HomeNavBar({ status, setStatus,setToken,countCartItems ,token ,setCountCartItems}) {
    const navigate = useNavigate();
    function logOut() {
        setToken('');
        setStatus("guest");
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('status');
        navigate('/home')

    }

    return (

        <div>
            {status == 'manager' ? < ManagerHeader logOut={logOut}/> : status == "user" ? <UserHeader  setCountCartItems={setCountCartItems } token={token}countCartItems={countCartItems} logOut={logOut}/> : <GuestHeader logOut={logOut}/>}
            <main >
                <Outlet />
            </main>
            <Footer token={token} />
        </div>
    )
}

export default HomeNavBar
