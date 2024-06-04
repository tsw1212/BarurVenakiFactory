import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../../css/confirmation.css'

function Confirmation() {
  return (
    <div className='confirmationContainer'>
      <h2 className='h2'>ההזמנה שלך התקבלה בהצלחה!</h2>
      <h3 className='h3'>ההזמנה תסופק  עד תאריך ההספקה המבוקש</h3>
      <NavLink className='navLink' to="/home/orders">לצפייה בהזמנות שלך</NavLink>
    </div>
  )
}

export default Confirmation
