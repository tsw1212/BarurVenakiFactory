import React from 'react'
import { useState, useEffect } from 'react';
import '../css/home.css';
import WorngRequest from '../pages/WorngRequest';
import { getRequest } from '../modules/requests/server_requests'
function Home({ status, token, setToken }) {
  const [worngRequest, setWorngRequest] = useState(false);

  useEffect(() => {
    async function fatchData() {
      let products;
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
  }, [worngRequest]);
  return (
    worngRequest ? <WorngRequest className='wrongRequest' setWorngRequest={setWorngRequest} /> :
      <div className="home-container">
        <section className="home-section about-us">
          <h2 className="section-title">אודותינו</h2>
          <p className="section-content">
            במפעל קטניות ואורז פרימיום, אנו גאים לספק את הקטניות והאורז באיכות הגבוהה ביותר, אשר נארזים באריזת ואקום כדי לשמור על טריותם ולמנוע חדירת חרקים. המסירות שלנו לאיכות וחדשנות מבדילה אותנו בשוק.
          </p>
        </section>
        <section className="home-section products">
          <h2 className="section-title">המוצרים שלנו</h2>
          <p className="section-content">
            המגוון שלנו כולל סוגים שונים של קטניות ואורז, אשר כולם מגיעים מהחוות הטובות ביותר ועוברים תהליך קפדני של ניקוי, מיון ואריזת ואקום כדי לשמור על הערכים התזונתיים ולהאריך את חיי המדף.
          </p>
        </section>
        <section className="home-section technology">
          <h2 className="section-title">טכנולוגיה מתקדמת</h2>
          <p className="section-content">
            אנו משתמשים בטכנולוגיות המתקדמות ביותר כדי להבטיח שמוצרינו יהיו באיכות הגבוהה ביותר. מכונות האריזה המתקדמות שלנו יוצרות אטימה הרמטית המגינה מפני לחות, אוויר ומזיקים, ומבטיחות שתקבלו את המוצר הטרי ביותר.
          </p>
        </section>
        <section className="home-section quality-control">
          <h2 className="section-title">בקרת איכות</h2>
          <p className="section-content">
            האיכות היא במרכז כל מה שאנחנו עושים. תהליכי בקרת האיכות המחמירים שלנו מבטיחים שכל חבילה שיוצאת מהמפעל עומדת בסטנדרטים הגבוהים ביותר של בטיחות ומצוינות. אנו מחויבים לספק מוצרים לא רק טעימים אלא גם בריאים ובטוחים למשפחתכם.
          </p>
        </section>
        <section className="home-section ordering">
          <h2 className="section-title">הזמנות בקלות</h2>
          <p className="section-content">
            חוו את הנוחות שבהזמנת המוצרים הפרימיום שלנו אונליין. עם רישום חד-פעמי פשוט, תוכלו לבצע הזמנות במהירות ובקלות. תהנו מהיתרונות של קניות ללא מאמץ וקבלו את הקטניות והאורז האיכותיים שלנו ישירות לביתכם.
          </p>
        </section>
        <section className="home-section why-choose-us">
          <h2 className="section-title">למה לבחור בנו?</h2>
          <ul className="section-list">
            <li className="section-list-item">איכות יוצאת דופן: המוצרים שלנו מגיעים מהחוות הטובות ביותר ועוברים תהליך עיבוד לשמירה על טריות מירבית</li>
            <li className="section-list-item">אריזה מתקדמת: הטכנולוגיה המתקדמת שלנו לאריזת ואקום מבטיחה איכות לאורך זמן והגנה מפני מזיקים</li>
            <li className="section-list-item">נוחות: עם מערכת ההזמנות המקוונת שלנו, תוכלו להירשם במהירות ולהתחיל לבצע הזמנות בקלות</li>
            <li className="section-list-item">בריאות ובטיחות: אנו מקפידים על הסטנדרטים הגבוהים ביותר של בקרת איכות כדי להבטיח שכל חבילה בטוחה ומזינה</li>
          </ul>
        </section>
        <section className="home-section product-details">
          <h2 className="section-title">המוצרים שלנו</h2>
          <ul className="section-list">
            <li className="section-list-item">אורז פרימיום: גרגירים ארוכים, גרגירים קצרים, בסמטי ועוד – כולם נארזים באריזת ואקום לשמירה על טעמם ומרקמם הטבעי.</li>
            <li className="section-list-item">קטניות איכותיות: עדשים, שעועית, חומוס וקטניות נוספות, שנבחרו ונארזו כדי לספק את הטוב ביותר בתזונה ובטעם.</li>
          </ul>
        </section>
        <section className="home-section order-now">
          <h2 className="section-title">הזמינו היום</h2>
          <p className="section-content">
            הצטרפו לקהילת הלקוחות המרוצים שלנו ותהנו מהקטניות והאורז הטובים ביותר בשוק. הירשמו עכשיו באתר שלנו והתחילו בקניות עוד היום!
          </p>
          <p className="section-content">
            למידע נוסף או לביצוע הזמנה, בקרו באתר שלנו או פנו לצוות שירות הלקוחות שלנו. אנו כאן כדי לעזור לכם בכל הצרכים שלכם ולהבטיח שתקבלו את המוצרים הטובים ביותר, ישירות לדלת ביתכם.
          </p>
        </section>
      </div>
  );
};


export default Home
