import React from 'react'
import '../css/Login.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Login({ setToken, setStatus }) {
    const navigate = useNavigate();
    const [isForgot, setIsForgot] = useState(false);
    const [input, setInput] = useState({ email: '', password: '' });
    const [sendPasswordEmail, setSendPasswordEmail] = useState('');
    const [resetPasswordForm, setResetPasswordForm] = useState(false);
    const [resetPassword, setResetPassword] = useState({ password: '', newPassword: '',repeatNewPassword:'' });


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
            alert("ישנה תקלה בבקשה נסה שוב")
        }
    }

    async function handleForgotPassword(ev) {
        ev.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/login/forgot-password", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email: sendPasswordEmail }),
            });
            if (!response.ok) {
                throw response.statusText;
            }
            setResetPasswordForm(true);
            setIsForgot(false);

        }
        catch {
            alert("ישנה תקלה בבקשה נסה שוב")
        }

    }

    async function handleResetPassword(ev) {
        ev.preventDefault();
        if(resetPassword.newPassword!==resetPassword.repeatNewPassword){
            alert("הסיסמאות אינן תואמות");
            return;
        }
        const { repeatNewPassword, ...passwordData } = resetPassword;
        try {
            const response = await fetch(`http://localhost:3000/passwords/${sendPasswordEmail}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({...passwordData,email:sendPasswordEmail}),
            });
            if (!response.ok) {
                throw response.statusText;
            }
            alert("הסיסמא עודכנה בהצלחה");
            setResetPasswordForm(false);
        }
        catch {
            alert("ישנה תקלה בבקשה נסה שוב")
        }
    }

    return (
        <div className='body'>
            <div className='login_container'>
                < form onSubmit={login} className='login_form'>
                    <h3>הזן שם משתמש וסיסמא</h3>
                    <input type="email" name='email' placeholder='אימייל' className='input' value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })}  />
                    <input type="password" name='password' placeholder='סיסמא' className='input'  value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })} />
                    <input type="submit" value="היכנס" />
                    <p className='forgotPassButton' onClick={() => setIsForgot(true)}>שכחתי סיסמא</p>
                    <NavLink to={'/signup'} className='goToSignup'> צור חשבון</NavLink>
                </form>

                {isForgot && !resetPasswordForm && <form className='reset-form' onSubmit={handleForgotPassword}>
                    <p>נא הזן אימייל לאיפוס</p>
                    <input type="email" name="email" placeholder='אימייל' value={sendPasswordEmail} onChange={(e) => setSendPasswordEmail(e.target.value)} />
                    <input type="submit" value="אפס סיסמא" />
                </form>}
                {resetPasswordForm && <form className='reset-form' onSubmit={handleResetPassword}>
                    <p>סיסמת אימות נשלחה למייל שלך </p>
                    <input type="password" name="auth_password" placeholder='סיסמת אימות' value={resetPassword.password} onChange={(e) => setResetPassword({ ...resetPassword, password: e.target.value })} />
                    <input type="password" name="new_password" placeholder='סיסמא חדשה' value={resetPassword.newPassword} onChange={(e) => setResetPassword({ ...resetPassword, newPassword: e.target.value })} />
                    <input type="password" name="repeat_password" placeholder='חזור על הסיסמא' value={resetPassword.repeatNewPassword} onChange={(e) => setResetPassword({ ...resetPassword, repeatNewPassword: e.target.value })} />
                    <input type="submit" value="שנה סיסמא" />
                </form>}

            </div>
        </div>
    )
}


export default Login
