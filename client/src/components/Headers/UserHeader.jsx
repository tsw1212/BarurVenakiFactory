import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../modules/FontAwesome';
import { NavLink } from 'react-router-dom';
import '../../css/header.css'
function UserHeader({ logOut }) {
    return (
        <header>
            <nav className='nav'>
                <div className='leftSide'>
                    <NavLink className='navLink' to="userDetails"><FontAwesomeIcon className='icon' icon="fas fa-user-alt" /></NavLink>
                    <NavLink className='navLink' to="shopping_cart"><FontAwesomeIcon className='icon' icon="fas fa-shopping-cart" /></NavLink>
                    <NavLink className='navLink' to="orders">הזמנות קודמות</NavLink>
                    <NavLink className='navLink' to="products">מוצרים</NavLink>
                    <NavLink className='navLink' to="." onClick={() => logOut()}><FontAwesomeIcon className='icon' icon="fas fa-sign-out-alt" /></NavLink >
                </div>
                <NavLink to="."> <img className='logoImg' src='../../../images/logo.png' alt='logo' />
                </NavLink>
            </nav>
        </header>
    )
}

export default UserHeader
