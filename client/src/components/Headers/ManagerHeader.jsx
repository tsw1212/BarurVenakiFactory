import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../modules/FontAwesome';
import '../../css/header.css'
import { NavLink } from 'react-router-dom';
function ManagerHeader({logOut}) {
  return (
   
        <header>
            <nav className='nav'>
                <NavLink to="usersDetails"><FontAwesomeIcon icon="fas fa-user-alt" /></NavLink>
                <NavLink to="allOrders">orders</NavLink>
                <NavLink to="allUsers">users</NavLink>
                <NavLink to="." onClick={()=>logOut()}><FontAwesomeIcon icon="fas fa-sign-out-alt" /></NavLink >
                <NavLink to="."> <img src='../../../images/logo.png' alt='logo' />
                </NavLink>
            </nav>
        </header>
   
  )
}

export default ManagerHeader
