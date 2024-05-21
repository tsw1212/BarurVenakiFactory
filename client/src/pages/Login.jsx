import React from 'react'
import '../css/Login.css';
import { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';

function Login({ setToken,setStatus }) {
    const navigate=useNavigate();
    const [isForgot, setIsForgot] = useState(false);
    const [input, setInput] = useState({ email: '', password: '' });
    const [sendPasswordEmail, setSendPasswordEmail] = useState('');



    async function login(ev) {
        ev.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(input),
            });
            if (!response.ok) {
                throw response.statusText;
            }
            const data = await response.json();
            const token = response.headers.get('XAuthentication-Token');
            const status = response.headers.get('XSecurity-Level');
            if (data.length != 0) {
                localStorage.setItem("currentUser", JSON.stringify(data));
                setToken(token);
                await setStatus(status);
                navigate(`/`);
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
        try {
            const response = await fetch("http://localhost:3000/login/forgot-password", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify( {email:sendPasswordEmail}),
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
                < form onSubmit={login} className='login_form'>
                    <h3>הזן שם משתמש וסיסמא</h3>
                    <input type="email" name='email' placeholder='אימייל' className='input' value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} />
                    <input type="password" name='password' placeholder='סיסמא' className='input' autoComplete="current-password" value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })} />
                    <input type="submit" value="היכנס" />
                    <p className='forgotPassButton' onClick={() => setIsForgot(true)}>שכחתי סיסמא</p>
                    <NavLink to={'/signup'} className='goToSignup'> צור חשבון</NavLink>
                </form>

                {isForgot && <form className='reset-form' onSubmit={handleResetPassword}>
                    <p>נא הזן אימייל לאיפוס</p>
                    <input type="email" name="email" placeholder='אימייל' value={sendPasswordEmail} onChange={(e) =>setSendPasswordEmail(e.target.value)}/>
                    <input type="submit" value="אפס סיסמא" />
                </form>}
            </div>
        </div>
    )
}


export default Login
