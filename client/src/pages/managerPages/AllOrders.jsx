import * as React from 'react';
import Orders from '../../components/orders/Orders';

function AllOrders({ token,status }) {

  return (
    <Orders token={token} status={status}/>
  )
}

export default AllOrders
