import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { postRequest } from '../../modules/requests/server_requests';
import { useNavigate } from 'react-router-dom';
import '../../css/currentOrderDetails.css';
import { useSelector } from 'react-redux';


function CurrentOrderDetails({ chosenCartProducts, setChosenCartProducts }) {
  const token = useSelector(state => state.app.token);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [remarks, setRemarks] = useState('');

  let navigate = useNavigate();
  const user = useSelector(state => state.app.user);

  const calculateTotalPrice = () => {
    const total = chosenCartProducts.reduce((total, product) => total + (product.price * product.amount), 0);
    return parseFloat(total.toFixed(2));
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  async function handleFinishOrder() {
    let productsToSave = chosenCartProducts.map(product => {
      return {
        productId: product.productId,
        amount: product.amount
      };
    });
    let newOrder = {
      userId: user.id,
      date: getCurrentDateTime(),
      status: null,
      deliveryDate: deliveryDate , 
      // deliveryDate.toISOString().split('T')[0] : null,
      remarks: remarks,
      products: productsToSave,
      totalPrice: calculateTotalPrice()
    };

    const reqData = await postRequest(`http://localhost:3000/orders`, newOrder, token);
    if (!reqData.ok) {
      alert('משהו השתבש בבקשה נסה שוב');
    } else {
      setChosenCartProducts([]);
      navigate('/home/shopping_cart/confirmation');
    }
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const getMinDeliveryDate = () => {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className='order_container'>
      <h3 className='title'>פרטי הזמנה</h3>
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
      <div className='moreDetails'>
        <div className='deliveryDate'>
          <label htmlFor="deliveryDate">תאריך משלוח:</label>
          <input type='date'
            className='order_input_date'
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            minDate={new Date(getMinDeliveryDate())}
            renderInput={(params) => <input {...params} />} 
            required/>
        </div>

        <div className='remarks'>
          <textarea
            className='order_input_remarks'
            id="remarks"
            value={remarks}
            onChange={handleRemarksChange}
            rows="4"
            cols="50"
            placeholder="הכנס הערות להזמנה שלך כאן"
          ></textarea>
        </div>
      </div>
      <button className="finish_order_button" onClick={handleFinishOrder}>אישור הזמנה</button>
    </div>
  );
}

export default CurrentOrderDetails;
