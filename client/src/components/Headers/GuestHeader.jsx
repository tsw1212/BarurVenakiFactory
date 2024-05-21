import React from 'react'
import '../../css/header.css'
import { NavLink } from 'react-router-dom'
function GuestHeader() {
    return (
        <div className='nav'>
            <img src='../../../images/logo.png' alt='logo' />
            <NavLink to="/login">כניסה</NavLink>
            <NavLink to="/signup">הרשמה</NavLink>
        </div>
    )
}

export default GuestHeader
