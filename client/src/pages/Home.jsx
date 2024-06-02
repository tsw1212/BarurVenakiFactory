import React from 'react';
import { useState, useEffect } from 'react';
import '../css/home.css';
import WorngRequest from '../pages/WorngRequest';
import { getRequest } from '../modules/requests/server_requests';

function Home({ status, token, setToken }) {
  const [worngRequest, setWorngRequest] = useState(false);

  useEffect(() => {
    async function fatchData() {
      let updateToken;
      if (token == "") {
        updateToken = localStorage.getItem("token");
        if (!updateToken) {
          let dataRequest = await getRequest(`http://localhost:3000/guest_token`);
          if (dataRequest.ok) {
            localStorage.setItem('token', dataRequest.token);
            await setToken(dataRequest.token);
          }
        }
        else {
          await setToken(updateToken);
        }
      }
    }
    fatchData();
  }, []);

  return (
    <div>
      <div className="hero">
        <div >
          <h2 className="section-title">אודותינו</h2>
          <p className="section-content">
            ברור ונקי-המקום בו איכות פוגשת נוחות
          </p>
        </div>
      </div>

      <section className="">
        <h2 className="section-title">המוצרים שלנו</h2>
        <div className="container">
          <div className="leftSideTxt">
            <p className="section-content">
              המגוון שלנו כולל סוגים שונים של קטניות ואורז, אשר כולם מגיעים מהחוות הטובות ביותר ועוברים תהליך קפדני של ניקוי, מיון ואריזת ואקום כדי לשמור על הערכים התזונתיים ולהאריך את חיי המדף.
            </p>
          </div>
          <img className='imgAboutuSRight' src='../../images/home1.png' alt="תמונה של הסיפור שלנו" />
        </div>
      </section>

      <section className="">
        <h2 className="section-title">טכנולוגיה מתקדמת</h2>
        <div className="container">
          <div className="rightSideTxt">
            <p className="section-content">
              אנו משתמשים בטכנולוגיות המתקדמות ביותר כדי להבטיח שמוצרינו יהיו באיכות הגבוהה ביותר. מכונות האריזה המתקדמות שלנו יוצרות אטימה הרמטית המגינה מפני לחות, אוויר ומזיקים, ומבטיחות שתקבלו את המוצר הטרי ביותר.
            </p>
          </div>
          <img className='imgAboutuSLeft' src="path/to/image2.jpg" alt="תמונה של ערכינו" />
        </div>
      </section>

      <section className="">
        <h2 className="section-title">בקרת איכות</h2>
        <div className="container">
          <div className="leftSideTxt">
            <p className="section-content">
              האיכות היא במרכז כל מה שאנחנו עושים. תהליכי בקרת האיכות המחמירים שלנו מבטיחים שכל חבילה שיוצאת מהמפעל עומדת בסטנדרטים הגבוהים ביותר של בטיחות ומצוינות. אנו מחויבים לספק מוצרים לא רק טעימים אלא גם בריאים ובטוחים למשפחתכם.
            </p>
          </div>
          <img className='imgAboutuSRight' src="client\images\home1.png" alt="תמונה של הצוות" />
        </div>
      </section>
      <section >
        <h2 className="section-title"> ? למה לבחור בנו</h2>
        <div className="container">
          <div className="rightSideTxt">
            <h3 className="section-item">איכות יוצאת דופן: המוצרים שלנו מגיעים מהחוות הטובות ביותר ועוברים תהליך עיבוד לשמירה על טריות מירבית</h3>
            <h3 className="section-item">אריזה מתקדמת: הטכנולוגיה המתקדמת שלנו לאריזת ואקום מבטיחה איכות לאורך זמן והגנה מפני מזיקים</h3>
            <h3 className="section-item">נוחות: עם מערכת ההזמנות המקוונת שלנו, תוכל
              ו להירשם במהירות ולהתחיל לבצע הזמנות בקלות</h3>
            <h3 className="section-item">בריאות ובטיחות: אנו מקפידים על הסטנדרטים הגבוהים ביותר של בקרת איכות כדי להבטיח שכל חבילה בטוחה ומזינה</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
