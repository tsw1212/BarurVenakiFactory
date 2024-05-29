import * as React from 'react';
import '../../css/orderProduct.css';
import { useState } from 'react';

function OrderProduct({ product }) {
  return (
    <div className="orderProduct">
      <p>מספר מזהה של המוצר{product.productId}</p>
      <p>שם : {product.name}</p>
      <p>סוג אריזה : {product.package}</p>
      <p>כמות : {product.amount}</p>
    </div>
  );
}

export default OrderProduct;
