import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../modules/FontAwesome';
import '../../css/header.css'
import { NavLink } from 'react-router-dom';
function ManagerHeader({ logOut }) {
  return (

    <header>
      <nav className='nav'>
        <div className='leftSide'>
          <NavLink className='navLink' to="usersDetails"><FontAwesomeIcon className='icon' icon="fas fa-user-alt" /></NavLink>
          <NavLink className='navLink' to="allOrders">הזמנות</NavLink>
          <NavLink className='navLink' to="allUsers">משתמשים</NavLink>
          <NavLink className='navLink' to="." onClick={() => logOut()}><FontAwesomeIcon className='icon' icon="fas fa-sign-out-alt" /></NavLink >
        </div>
        <NavLink to="."> <img  src='../../../images/logo.png' alt='logo' />

        </NavLink>
      </nav>
    </header>

  )
}

export default ManagerHeader
