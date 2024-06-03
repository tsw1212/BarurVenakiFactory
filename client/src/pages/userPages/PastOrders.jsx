import React from 'react';
import Orders from '../../components/orders/Orders';

function PastOrders({token,status}) {
  return (
    <div>
      <Orders token={token} status={status}/>
    </div>
  );
}

export default PastOrders;
