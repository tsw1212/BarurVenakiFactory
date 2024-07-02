import React from 'react';
import '../css/home.css';
;


function Home() {


  return (
    <div className='home'>
      <div className="hero">
        <div>
          <h2 className="section-title">אודותינו</h2>
          <p className="section-content">
            ברור ונקי - המקום בו איכות פוגשת נוחות. אנו מתחייבים לספק מוצרים באיכות הגבוהה ביותר עם דגש על נוחות מקסימלית ללקוחותינו. החברה שלנו משלבת טכנולוגיות מתקדמות ותהליכי ייצור חדשניים כדי להבטיח שכל מוצר עומד בסטנדרטים הגבוהים ביותר.
          </p>
          <p className="section-content">
            אנו מאמינים בשקיפות, שירות מצוין ושביעות רצון לקוחות כמפתח להצלחה. כל מוצרינו עוברים בדיקות איכות קפדניות, ואנו מציעים מגוון פתרונות המתאימים לצרכים שונים של לקוחות פרטיים ועסקיים כאחד. הצוות המקצועי שלנו כאן כדי לספק לכם את המידע והתמיכה שאתם זקוקים להם.
          </p>
          <p className="section-content">
            הצטרפו למשפחת לקוחותינו ותיהנו מהאיכות והנוחות שאין שני להם. אנו גאים להיות הבחירה המובילה של אלפי לקוחות מרוצים בכל רחבי הארץ.
          </p>
        </div>
      </div>


      <section className="">
        <h2 className="section-title">המוצרים שלנו</h2>
        <div className="container ">
          <div className="leftSideTxt">
            <p className="section-content">
              המגוון שלנו כולל סוגים שונים של קטניות ואורז, אשר כולם מגיעים מגידולי השדה הטובים ביותר ועוברים תהליך קפדני של ניקוי, ברירה ואריזה בואקום כדי לשמור על נקיות המוצר מחרקים ולהאריך את חיי המדף.
            </p>
          </div>
          <img className='imgAboutuSRight' src='../../images/home1.png' alt="תמונה של הסיפור שלנו" />
        </div>
      </section>

      <section className="price">
        <h2 className="section-title">המחירים שלנו</h2>
        <div className="container ">
          <img className='imgPriceLeft' src="../../images/price2.jpeg" alt="תמונה של מחירים" />
          <div className="rightSideTxt">
            <p className="section-contentPtice">
              המחירים שלנו מותאמים ללקוחות פרטיים, ומציעים תמורה מעולה עבור כל מוצר. עם זאת, אנו מספקים הנחות מיוחדות עבור רכישות בכמויות גדולות, כך שהעסק שלכם יוכל ליהנות מחיסכון משמעותי
            </p>
          </div>
        </div>
      </section>
      <section >
        <h2 className="section-title"> ? למה לבחור בנו</h2>
        <div className="container ">
          <div className="lastDivManyItems">
            <div className="section-item1">
              <h2>בריאות ובטיחות</h2>
              אנו מקפידים על הסטנדרטים הגבוהים ביותר של בקרת איכות כדי להבטיח שכל חבילה בטוחה ומזינה
              באישור משרד הבריאות         </div>
            <div className="section-item2">
              <h2>טכנולוגיה מתקדמת</h2>
              הטכנולוגיה המתקדמת שלנו לאריזת ואקום מבטיחה איכות לאורך זמן והגנה מפני מזיקים</div>
            <div className="section-item3">
              <h2>נוחות</h2>
              עם מערכת ההזמנות המקוונת שלנו, תוכלו
              להירשם במהירות ולהתחיל לבצע הזמנות בקלות</div>
            <div className="section-item4">
              <h2>כשרות</h2>
              <img  src="https://www.hamichlol.org.il/w/upload/michlol/b/b7/HCharedit.svg" alt='לוגו כשרות בד"ץ העדה החרדית'></img>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
