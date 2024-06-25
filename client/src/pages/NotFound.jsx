import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NotFound.css'; 
import HomeNavBar from './HomeNavBar';
import Footer from '../components/Footer';
function NotFound() {
  return (
    <>
    <HomeNavBar/>
    <div className="not-found-container" dir="rtl">
      <h1>404 - עמוד לא נמצא</h1>
      <p>מצטערים, העמוד שחיפשת לא קיים.</p>
      {/* <Link to="/home">חזור לעמוד הבית</Link> */}
    </div>
    <Footer/>
    </>
  );
}

export default NotFound;
