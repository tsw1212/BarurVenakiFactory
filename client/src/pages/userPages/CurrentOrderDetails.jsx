import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function CurrentOrderDetails({ chosenCartProducts, setChosenCartProducts }) {
  const [deliveryDate, setDeliveryDate] = useState('');
  const [remarks, setRemarks] = useState('');

  let user = JSON.parse(localStorage.getItem('currentUser'));

  const calculateTotalPrice = () => {
    return chosenCartProducts.reduce((total, product) => total + (product.price * product.amount), 0);
  };

  const handleDateChange = (e) => {
    setDeliveryDate(e.target.value);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  async function handleFinishOrder() {
    const newOrder = {
      userId: user.id,
      date: getCurrentDateTime(),
      status: 'התקבלה',
      deliveryDate: deliveryDate,
      remarks: remarks
    };
    // Implement order finishing logic here, including the delivery date and remarks
    console.log('New Order:', newOrder);
    // Example: send the newOrder to the server along with the order details
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    // Format: YYYY-MM-DD HH:MM:SS
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <h3>פרטי הזמנה</h3>
      <div className='cartProducts'>
        <DataTable value={chosenCartProducts} rowKey="id" showGridlines stripedRows tableStyle={{ minWidth: '60rem' }}>
          <Column className='column_cart' field="name" header="שם" />
          <Column className='column_cart' header="Image" body={(rowData) => <img src={`data:image/png;base64,${rowData.img}`} alt={rowData.name} style={{ width: '50px' }} />} />
          <Column className='column_cart' field="price" header="מחיר" />
          <Column className='column_cart' field="package" header="סוג אריזה" />
          <Column className='column_cart' field="amount" header="כמות" />
        </DataTable>
      </div>
      <div className='totalPrice'>
        <h4>סכום כולל: {calculateTotalPrice()} ₪</h4>
      </div>
      <div className='deliveryDate'>
        <label htmlFor="deliveryDate">תאריך משלוח:</label>
        <input 
          type="date" 
          id="deliveryDate" 
          value={deliveryDate} 
          onChange={handleDateChange} 
        />
      </div>
      <div className='remarks'>
        <label htmlFor="remarks">הערות:</label>
        <textarea
          id="remarks"
          value={remarks}
          onChange={handleRemarksChange}
          rows="4"
          cols="50"
          placeholder="הכנס הערות להזמנה שלך כאן"
        ></textarea>
      </div>
      <button onClick={handleFinishOrder}>סגור להזמנה</button>
    </div>
  );
}

export default CurrentOrderDetails;
