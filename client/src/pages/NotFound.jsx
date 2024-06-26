import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NotFound.css'; 
import GuestHeader from '../components/Headers/GuestHeader';
import Footer from '../components/Footer';
function NotFound() {
  return (
    <>
    <GuestHeader/>
    <div className="not-found-container" dir="rtl">
      <h1>404 - עמוד לא נמצא</h1>
      <p>מצטערים, העמוד שחיפשת לא קיים.</p>
    </div>
    <Footer/>
    </>
  );
}

export default NotFound;
