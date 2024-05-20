import React from 'react'
import Footer from '../components/Footer'
import UserHeader from '../components/Headers/UserHeader'
import ManagerHeader from '../components/Headers/ManagerHeader'
import GuestHeader from '../components/Headers/GuestHeader'
import { Outlet } from 'react-router-dom'
function HomeNavBar({ status }) {
    function logOut() {
        
    }
    return (
        <div>
            {status == 'manager' ? <ManagerHeader logOut={logOut} /> ?status=="user": <UserHeader logOut={logOut}/>:<GuestHeader />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default HomeNavBar
