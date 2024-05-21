import React from 'react'
import Footer from '../components/Footer'
import UserHeader from '../components/Headers/UserHeader'
import ManagerHeader from '../components/Headers/ManagerHeader'
import GuestHeader from '../components/Headers/GuestHeader'
import { Outlet, useNavigate } from 'react-router-dom'


function HomeNavBar({ status, setStatus }) {
    const navigate = useNavigate();
    function logOut() {
        setStatus("guest");
        localStorage.removeItem('currentUser');
        navigate('/home')

    }

    return (

        <div>
            {status == 'manager' ? < ManagerHeader logOut={logOut}/> : status == "user" ? <UserHeader logOut={logOut}/> : <GuestHeader logOut={logOut}/>}
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default HomeNavBar
