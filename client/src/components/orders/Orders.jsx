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
import Loading from '../Loading'



function Orders({ token, status }) {
  const [orders, setOrders] = useState([]);
  let user = {};

  const [wrongRequest, setWorngRequest] = useState(false);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();


  useEffect(() => {
    async function getOrders() {
      user = JSON.parse(localStorage.getItem('currentUser'));
      if (status === 'manager') {
        const responseData = await getRequest('http://localhost:3000/orders', token);
        if (responseData.ok) {
          await setOrders(responseData.body);
          setLoading(false);
          
        } else {
          await setWorngRequest(true);
        }
      }
      else {
        const responseData = await getRequest(`http://localhost:3000/users/${user.id}/orders`, token);
        if (responseData.ok) {
          await setOrders(responseData.body);
          setLoading(false);
        } else {
          await setWorngRequest(true);
        }
      }


    }
    getOrders();
  }, [orders])

  return (
    <div className='ordersContainer'>
       {loading&& <Loading />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='tableHead' align="right">מספר הזמנה</TableCell>
              <TableCell className='tableHead' align="right">מפר מזהה של משתמש</TableCell>
              <TableCell className='tableHead' align="right">תאריך הזמנה</TableCell>
              <TableCell className='tableHead' align="right">סטטוס הזמנה</TableCell>
              <TableCell className='tableHead' align="right">הערות</TableCell>
              <TableCell className='tableHead' align="right">תאריך הספקה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              if (status === 'manager') {
                return (
                  <TableRow
                    className='row'
                    key={order.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => navigate(`${order.orderInfo.orderId}`)}
                  >
                    <TableCell align="right">{order.orderInfo.orderId}</TableCell>
                    <TableCell align="right">{order.orderInfo.userId}</TableCell>
                    <TableCell align="right">{order.orderInfo.date}</TableCell>
                    <TableCell align="right">{order.orderInfo.status}</TableCell>
                    <TableCell align="right">{order.orderInfo.remarks}</TableCell>
                    <TableCell align="right">{order.orderInfo.deliveryDate}</TableCell>
                  </TableRow>
                );
              } else {
                return (
                  <TableRow
                    className='row'
                    key={order.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => navigate(`${order.orderId}`)}
                  >
                    <TableCell align="right">{order.orderId}</TableCell>
                    <TableCell align="right">{order.userId}</TableCell>
                    <TableCell align="right">{order.date}</TableCell>
                    <TableCell align="right">{order.status}</TableCell>
                    <TableCell align="right">{order.remarks}</TableCell>
                    <TableCell align="right">{order.deliveryDate}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
  
}

export default Orders;
