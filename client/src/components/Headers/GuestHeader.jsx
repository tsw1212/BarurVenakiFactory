import React from 'react'
import '../../css/header.css'
import { NavLink } from 'react-router-dom'
function GuestHeader() {
    return (
        <div className='nav'>
            <div className='leftSide'>
                <NavLink className='navLink' to="/login">כניסה</NavLink>
                <NavLink className='navLink' to="/signup">הרשמה</NavLink>
            </div>
            <NavLink  to="."><img  className='logoImg'  src='../../../images/logo.png' alt='logo' /></NavLink>
        </div>
    )
}

export default GuestHeader
