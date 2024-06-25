import * as React from 'react';
import { useState, useEffect } from 'react';
import { getRequest } from '../../modules/requests/server_requests';
import formatDates from '../../modules/formatDateTime';
import WorngRequest from '../../pages/WorngRequest';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../css/orders.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  useSelector } from 'react-redux';


function Orders() {
  const token = useSelector(state => state.app.token);
  const status = useSelector(state => state.app.status);
  const user = useSelector(state => state.app.user);

  const [orders, setOrders] = useState([]);
  const [wrongRequest, setWorngRequest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function getOrders() {
      let responseData;
      let sortedOrders = [];
      if (status === 'manager') {
        responseData = await getRequest('http://localhost:3000/orders', token);
        if (responseData.ok) {
          sortedOrders = responseData.body.sort((a, b) => new Date(b.orderInfo.date) - new Date(a.orderInfo.date));
        }
      } else {
        responseData = await getRequest(`http://localhost:3000/users/${user.id}/orders`, token);
        if (responseData.ok) {
          sortedOrders = responseData.body.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
      }

      if (responseData.ok) {
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
        setLoading(false);
      } else {
        setWorngRequest(true);
      }
    }
    getOrders();
  }, [token, status]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = orders.filter(order => {
      const searchableFields = status === 'manager' ? order.orderInfo : order;
      return Object.entries(searchableFields).some(([key, value]) =>
        !['date', 'deliveryDate'].includes(key) && value.toString().toLowerCase().includes(lowercasedQuery)
      );
    });
    setFilteredOrders(filtered);
  }, [searchQuery, orders, status]);

  return (
    <div className='ordersContainer'>
      {loading && <Loading />}
      {wrongRequest && <WorngRequest />}
      <div className="search-container">
        <input
          type="text"
          placeholder="חפש..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchInput"
        />
        <FontAwesomeIcon icon="fas fa-search" />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='tableHead' align="right">מספר הזמנה</TableCell>
              <TableCell className='tableHead' align="right">מפר מזהה של משתמש</TableCell>
              {status === "manager" && (
                <>
                  <TableCell className='tableHead' align="right">שם משתמש</TableCell>
                  <TableCell className='tableHead' align="right">עיר</TableCell>
                </>
              )}
              <TableCell className='tableHead' align="right">תאריך הזמנה</TableCell>
              <TableCell className='tableHead' align="right">סטטוס הזמנה</TableCell>
              <TableCell className='tableHead' align="right">הערות</TableCell>
              <TableCell className='tableHead' align="right">תאריך אספקה</TableCell>
              <TableCell className='tableHead' align="right">סכום</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => {
              if (status === 'manager') {
                return (
                  <TableRow
                    className='row'
                    key={order.orderInfo.orderId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => navigate(`${order.orderInfo.orderId}`)}
                  >
                    <TableCell align="right">{order.orderInfo.orderId}</TableCell>
                    <TableCell align="right">{order.orderInfo.userId}</TableCell>
                    <TableCell align="right">{order.orderInfo.username}</TableCell>
                    <TableCell align="right">{order.orderInfo.city}</TableCell>
                    <TableCell align="right">{formatDates.formatDateTime(order.orderInfo.date)}</TableCell>
                    <TableCell align="right">{order.orderInfo.status}</TableCell>
                    <TableCell align="right">{order.orderInfo.remarks}</TableCell>
                    <TableCell align="right">{formatDates.formatDate(order.orderInfo.deliveryDate)}</TableCell>
                    <TableCell align="right">{order.orderInfo.totalPrice}</TableCell>
                  </TableRow>
                );
              } else {
                return (
                  <TableRow
                    className='row'
                    key={order.orderId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => navigate(`${order.orderId}`)}
                  >
                    <TableCell align="right">{order.orderId}</TableCell>
                    <TableCell align="right">{order.userId}</TableCell>
                    <TableCell align="right">{formatDates.formatDateTime(order.date)}</TableCell>
                    <TableCell align="right">{order.status}</TableCell>
                    <TableCell align="right">{order.remarks}</TableCell>
                    <TableCell align="right">{formatDates.formatDate(order.deliveryDate)}</TableCell>
                    <TableCell align="right">{order.totalPrice}</TableCell>
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
