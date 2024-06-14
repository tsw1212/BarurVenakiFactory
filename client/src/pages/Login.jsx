import React from 'react'
import '../css/Login.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { postRequest, putRequest } from '../modules/requests/server_requests.js';

function Login({ setToken, setStatus, token }) {
    const navigate = useNavigate();
    const [isForgot, setIsForgot] = useState(false);
    const [input, setInput] = useState({ email: '', password: '' });
    const [sendPasswordEmail, setSendPasswordEmail] = useState('');
    const [resetPasswordForm, setResetPasswordForm] = useState(false);
    const [resetPassword, setResetPassword] = useState({ password: '', newPassword: '', repeatNewPassword: '' });



    async function login(ev) {
        ev.preventDefault();
        const dataRequest = await postRequest("http://localhost:3000/login", input, token)
        if (!dataRequest.ok) {
            alert("ישנם נתונים שגויים. נסה שוב");
        }
        else if (dataRequest.body != 0) {
            localStorage.setItem("currentUser", JSON.stringify(dataRequest.body));
            localStorage.setItem("token", (dataRequest.token));
            localStorage.setItem("status", (dataRequest.status));
            await setToken(dataRequest.token);
            await setStatus(dataRequest.status);
            navigate(`/`);
        }
        else {
            alert("One of the data entered is incorrect. Please try again.")
        }
    }

    async function handleForgotPassword(ev) {
        ev.preventDefault();
        const dataRequest = await postRequest("http://localhost:3000/login/forgot-password", { email: sendPasswordEmail }, token);
        if (!dataRequest.ok) {
            alert("משהו השתבש בבקשה נסה שוב")

        }
        else {
            setResetPasswordForm(true);
            setIsForgot(false);
        }
    }

    async function handleResetPassword(ev) {
        ev.preventDefault();
        if (resetPassword.newPassword !== resetPassword.repeatNewPassword) {
            alert("הסיסמאות אינן תואמות");
            return;
        }
        const { repeatNewPassword, ...passwordData } = resetPassword;
        const dataRequest = await putRequest(`http://localhost:3000/passwords/${sendPasswordEmail}`, { ...passwordData, email: sendPasswordEmail }, token);
        if (!dataRequest.ok) {
            alert("ישנה תקלה בבקשה נסה שוב")
        }
        else {
            const dataRequest = await postRequest("http://localhost:3000/login", { email: sendPasswordEmail, password: resetPassword.newPassword }, token)
            if (!dataRequest.ok) {
                alert("ישנה תקלה בבקשה נסה שוב")
            }
            else if (dataRequest.body != 0) {
                localStorage.setItem("currentUser", JSON.stringify(dataRequest.body));
                localStorage.setItem("token", (dataRequest.token));
                localStorage.setItem("status", (dataRequest.status));
                await setToken(dataRequest.token);
                await setStatus(dataRequest.status);
                navigate(`/`);
            }
            else {
                alert("ישנם נתונים שגויים נסה שוב")
            }
        }

    }

    return (
        <div>
            <NavLink to="/home"> <img className='logoImg' src='../../../images/logo.png' alt='logo' /></NavLink>
                <div className='LoginDiv'>
                    <div className='login_container'>
                        {!resetPasswordForm && < form onSubmit={login} className='login_form'>
                            <h3>הזן שם משתמש וסיסמא</h3>
                            <input type="email" name='email' placeholder='אימייל' className='input' value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} />
                            <input type="password" name='password' placeholder='סיסמא' className='input' value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })} />
                            <input type="submit" value="היכנס" />
                            <p className='forgotPassButton' onClick={() => setIsForgot(true)}>שכחתי סיסמא</p>
                            <NavLink to={'/signup'} className='goToSignup'> צור חשבון</NavLink>
                        </form>}

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
        </div>
    )
}


export default Login
