import React from 'react'
import '../css/Login.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Login({ setToken }) {
    const [isForgot, setIsForgot] = useState(false);

    async function Authorization(ev) {
        ev.preventDefault()
        try {
            let { email, password } = ev.target.elements;
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            if (!response.ok) {
                throw response.statusText;
            }
            const data = await response.json();
            const token = response.headers.get('XAuthentication-Token');
            if (data.length != 0) {
                localStorage.setItem("currentUser", JSON.stringify(data));
                setToken(token);
                navigate(`/home`)
            }
            else {
                alert("One of the data entered is incorrect. Please try again.")
            }
        }
        catch {
            alert("An error occurred. Please try again ")
        }
    }

    async function handleResetPassword(ev) {
        ev.preventDefault();
        const email=ev.target.value;
        try {
            const response = await fetch("http://localhost:3000/login/forgot-password", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({email}),
            });
            if (!response.ok) {
                throw response.statusText;
            }
        }
        catch {
            alert("An error occurred. Please try again ")
        }

    }

    return (
        <div className='body'>
            <div className='login_container'>
                < form onSubmit={Authorization} className='login_form'>
                    <h3>הזן שם משתמש וסיסמא</h3>
                    <input type="email" name='email' placeholder='אימייל' className='input' />
                    <input type="password" name='password' placeholder='סיסמא' className='input' autoComplete="current-password" />
                    <input type="submit" value="היכנס" />
                    <p className='forgotPassButton' onClick={() => setIsForgot(true)}>שכחתי סיסמא</p>
                    <NavLink to={'/signup'} className='goToSignup'> צור חשבון</NavLink>
                </form>

                {isForgot && <form className='reset-form' onSubmit={handleResetPassword}>
                    <p>נא הזן אימייל לאיפוס</p>
                    <input type="email" name="email" placeholder='אימייל' />
                    <input type="submit" value="אפס סיסמא" />
                </form>}
            </div>
        </div>
    )
}


export default Login
