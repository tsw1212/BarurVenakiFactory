import { name } from 'nodeman/lib/mustache'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/signup.css';
import { postRequest } from '../modules/requests/server_requests.js';
import { useDispatch, useSelector } from 'react-redux';


function Signup() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ name: '', email: '', city: '', street: '', houseNumber: '', username: '', phone1: '', phone2: '', password: '' });
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);


  async function signup(ev) {
    ev.preventDefault();
    const dataRequest = await postRequest("http://localhost:3000/signup", newUser, token);
    if (!dataRequest.ok) {
      alert("ישנה תקלה בבקשה נסה שוב");
    }
    else if (dataRequest.body) {
      localStorage.setItem("currentUser", JSON.stringify({id:dataRequest.body.id}));
      localStorage.setItem("token", `${dataRequest.token}${dataRequest.body.id}`);
      localStorage.setItem("status", (dataRequest.status));
      await  dispatch({ type: 'SET_TOKEN', payload: `${dataRequest.token}${dataRequest.body.id}` });
      await  dispatch({ type: 'SET_STATUS', payload: dataRequest.status  });
      await  dispatch({ type: 'SET_USER', payload: dataRequest.body });
      navigate(`/`);
    }
    else {
      alert("אחד מנתונים שהכנסתה שגוי. נסה שוב")
    }
  }


  return (
    <div>
      <NavLink to="/home"> <img className='logoImg' src='../../../images/logo.png' alt='logo' /></NavLink>
      <div className='myDiv'>
        <div className='signup_container'>
          < form onSubmit={signup} className='signup_form'>
            <h3>הזן פרטי משתמש</h3>
            <input type="text" name='name' placeholder='*שם' value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required />
            <input type="text" name='username' placeholder='*שם עסק' value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} required />
            <input type="password" name='password' placeholder='*סיסמא' min={4} value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
            <input type="email" name='email' placeholder='*אמייל' value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
            <input type="text" name='city' placeholder='*עיר' value={newUser.city} onChange={(e) => setNewUser({ ...newUser, city: e.target.value })} required />
            <input type="text" name='street' placeholder='*רחוב' value={newUser.street} onChange={(e) => setNewUser({ ...newUser, street: e.target.value })} required />
            <input type="number" name='houseNumber' placeholder='*מספר בית' value={newUser.houseNumber} onChange={(e) => setNewUser({ ...newUser, houseNumber: e.target.value })} required />
            <input type="tel" name='phone1' placeholder='*מספר טלפון' value={newUser.phone1} onChange={(e) => setNewUser({ ...newUser, phone1: e.target.value })} style={{ direction: 'rtl' }} required />
            <input type="tel" name='phone2' placeholder='טלפון נוסף' value={newUser.phone2} onChange={(e) => setNewUser({ ...newUser, phone2: e.target.value })} style={{ direction: 'rtl' }} />

            <input type="submit" value="צור חשבון" />
            <NavLink to={'/login'} className='goToLogin'> היכנס לחשבון קיים</NavLink>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
