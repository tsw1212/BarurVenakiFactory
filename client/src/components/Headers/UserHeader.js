import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../modules/FontAwesome';

function UserHeader({logOut}) {
    return (
        <header>
            <nav className={styles.nav}>
                <NavLink to="usersDetails"><FontAwesomeIcon icon="fas fa-user-alt" /></NavLink>
                <NavLink to="shopping_cart"><FontAwesomeIcon icon="fas fa-shopping-cart" /></NavLink>
                <NavLink to="orders">orders</NavLink>
                <NavLink to="." onClick={()=>logOut()}><FontAwesomeIcon icon="fas fa-sign-out-alt" /></NavLink >
                <NavLink to="."> <img src='../../../images/logo.png' alt='logo' />
                </NavLink>
            </nav>
        </header>
    )
}

export default UserHeader
