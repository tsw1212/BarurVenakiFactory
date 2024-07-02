import * as React from 'react';
import '../../css/orderProduct.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';


function OrderProduct({ product, onAmountChange, orderStatus }) {
  const status = useSelector((state) => state.app.status);
  const [amount, setAmount] = useState(product.amount);
  const [reason, setReason] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onAmountChange(product.productId, amount, reason);
    setIsEditing(false);
  };

  return (

    <div className="orderProduct">
      <div className="productDetails">
        <p>מספר מזהה של המוצר: {product.productId}</p>
        <p>שם : {product.name}</p>
        <p>סוג אריזה : {product.package}</p>
        {!isEditing ?
          <>
            <p>כמות : {product.amount}</p>
            {(status == "manager" && (orderStatus !== "הסתיימה") || orderStatus == "התקבלה") && <button className='button' onClick={() => setIsEditing(true)}>ערוך כמות</button>}
          </>
          :
          null
        }
      </div>
      {isEditing && (
        <div className="editAmountContainer">
          <TextField
            label="כמות"
            type="number"
            value={amount}
            onChange={(e) => { if (e.target.value >= 0) { setAmount(e.target.value) } }}
          />
          <TextField
            label="סיבה לשינוי"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <button className='button' onClick={handleSave}>שמור</button>
          <button className='button' onClick={() => setIsEditing(false)}>ביטול</button>
        </div>
      )}
    </div>
  );
}

export default OrderProduct;
