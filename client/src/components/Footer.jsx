import React, { useEffect, useState } from 'react';
import '../css/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '.././modules/FontAwesome';
import { getRequest } from '../modules/requests/server_requests';
import {  useSelector } from 'react-redux';


const Footer = ({ }) => {
  const [factory, setFactory] = useState({});
  const [isBottom, setIsBottom] = useState(false);
  let token = useSelector(state => state.app.token);

  useEffect(() => {
    async function fetchData() {
      if (token === '') {
        token = localStorage.getItem('token');
    }
      const reqData = await getRequest(`http://localhost:3000/factory/ברור ונקי`, token);
      if (reqData.ok) setFactory(reqData.body.factory);
      console.log("fotter");
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={isBottom ? 'sticky' : ''}>
      <div className="home-footer">
        <div className="footer-contact">
          <h2>צרו קשר</h2>
          <p>{factory?.phone} <FontAwesomeIcon icon="fa-solid fa-phone" /></p>
          <p>{factory?.email} <FontAwesomeIcon icon="fa-solid fa-envelope" /></p>
          <p>{factory?.houseNumber} {factory?.city} {factory?.street} <FontAwesomeIcon icon="fa-solid fa-location-dot" /></p>
        </div>
        <div className="footer-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3391.9914791486262!2d34.99744792492038!3d31.770718334731733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502c507426912bb%3A0x472b3a8391e66367!2z15HXqNeV16gg15XXoNen15k!5e0!3m2!1siw!2sil!4v1716827818936!5m2!1siw!2sil"
            width="400"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
      <p className="footer-thankyou">תודה שבחרתם במפעל קטניות ואורז פרימיום – המקום בו איכות פוגשת נוחות</p>
      </footer>
  );
};

export default Footer;
