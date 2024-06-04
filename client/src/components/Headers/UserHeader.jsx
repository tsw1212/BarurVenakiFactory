import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../modules/FontAwesome';
import { NavLink } from 'react-router-dom';
import '../../css/header.css';
import NumbersOfItem from './NumbersOfItem';

function UserHeader({ logOut, countCartItems }) {
    return (
        <header>
            <nav className='nav'>
                <div className='leftSide'>
                    <NavLink className='navLinkHeader' to="userDetails">
                        <FontAwesomeIcon className='icon' icon="fas fa-user-alt" />
                    </NavLink>
                    <NavLink className='navLinkHeader' to="shopping_cart">
                        <div className="cartContainer">
                            <FontAwesomeIcon className='icon' icon="fas fa-shopping-cart" />
                            <NumbersOfItem countCartItems={countCartItems} />
                        </div>
                    </NavLink>
                    <NavLink className='navLinkHeader' to="orders">הזמנות קודמות</NavLink>
                    <NavLink className='navLinkHeader' to="products">מוצרים</NavLink>
                    <NavLink className='navLinkHeader' to="." onClick={() => logOut()}>
                        <FontAwesomeIcon className='icon' icon="fas fa-sign-out-alt" />
                    </NavLink>
                </div>
                <NavLink to=".">
                    <img className='logoImg' src='../../../images/logo.png' alt='logo' />
                </NavLink>
            </nav>
        </header>
    );
}

export default UserHeader;
