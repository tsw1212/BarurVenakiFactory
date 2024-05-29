import * as React from 'react';
import { useState, useEffect } from 'react';
import { getRequest } from '../../modules/requests/server_requests';
import WorngRequest from '../../pages/WorngRequest';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../css/orders.css'
import { useNavigate } from 'react-router-dom';



function Orders( {token}) {
  const [orders, setOrders] = useState([]);

  const [wrongRequest, setWorngRequest] = useState(false);
  let navigate=useNavigate();


  useEffect(() => {
    async function getOrders() {
      const responseData = await getRequest('http://localhost:3000/orders', token);
      if (responseData.ok) {
        await setOrders(responseData.body);
      } else {
        await setWorngRequest(true);
      }
    }
    getOrders();
  }, [orders])

  return (
    <div className='ordersContainer'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='tableHead' align="right">מספר הזמנה</TableCell>
              <TableCell className='tableHead' align="right">מפר מזהה של משתמש</TableCell>
              <TableCell className='tableHead' align="right">תאריך הזמנה</TableCell>
              <TableCell className='tableHead' align="right">סטטוס הזמנה</TableCell>
              <TableCell className='tableHead' align="right">הערות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
              className='row'
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={()=>navigate(`${order.orderInfo.orderId}`)}
              >
                <TableCell align="right">{order.orderInfo.orderId}</TableCell>
                <TableCell align="right">{order.orderInfo.userId}</TableCell>
                <TableCell align="right">{order.orderInfo.date}</TableCell>
                <TableCell align="right">{order.orderInfo.status}</TableCell>
                <TableCell align="right">{order.orderInfo.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Orders;
