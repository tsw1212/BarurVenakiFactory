import { NavLink } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/notAdd.css';
function NotAdd({ setNotAddFlag }) {
    return (
        <div>
            <div className='overlay' onClick={() => setNotAddFlag(false)} />
            <div className='deleteForm_container'>
                <FontAwesomeIcon className='exit' icon="fas fa-times" onClick={() => setNotAddFlag(false)} />
                <p>אתה במצב לא מחובר
                    <br /> בכדי להוסיף מוצר לסל הנך צריך להתחבר
                </p>
                <NavLink className="auth-link" to="/login">כניסה</NavLink>
                <NavLink className="auth-link" to="/signup">הרשמה</NavLink>
            </div>
        </div>
    );
}

export default NotAdd;
