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
import { useSelector, useDispatch } from 'react-redux';


function Orders() {
  let token = useSelector(state => state.app.token);
  let status = useSelector(state => state.app.status);
  let user = useSelector(state => state.app.user);
  let reduxSortedOrders = useSelector(state => state.details.orders);
  const dispatch = useDispatch()
  const [orders, setOrders] = useState([]);
  const [wrongRequest, setWorngRequest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreOrders, setHasMoreOrders] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    async function getOrders() {
      let responseData;
      if (token === '' || user == {} || status == '') {
        token = localStorage.getItem('token');
        user = JSON.parse(localStorage.getItem('currentUser'));
        status = localStorage.getItem('status');

      }
      if (status === 'manager') {
        if (reduxSortedOrders.length == 0 || page != 1) {
          responseData = await getRequest(`http://localhost:3000/orders/paged/${page}`, token);
          if (responseData.ok) {
            if (responseData.body.length < 10) {
              setHasMoreOrders(false);
            }

            let newOrders = [...orders, ...responseData.body]
            reduxSortedOrders = newOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            if(page==1){
              await dispatch({ type: 'SET_ORDERS', payload: reduxSortedOrders });
              await setOrders(reduxSortedOrders);
              setFilteredOrders(reduxSortedOrders);
              setLoading(false);
            }
            else{
              await setOrders(reduxSortedOrders);
              setFilteredOrders(reduxSortedOrders);
              setLoading(false);
            }
          }
          else{
            setWorngRequest(true);

          }
        }
        else {
          if(reduxSortedOrders.length <10){
            setHasMoreOrders(false);
          }
          setOrders(reduxSortedOrders);
          setLoading(false);
          setFilteredOrders(reduxSortedOrders);
        }
       
      } else {
        if (reduxSortedOrders.length == 0) {
          responseData = await getRequest(`http://localhost:3000/users/${user.id}/orders`, token);
          if (responseData.ok) {
            reduxSortedOrders = responseData.body.sort((a, b) => new Date(b.date) - new Date(a.date));
            await dispatch({ type: 'SET_ORDERS', payload: reduxSortedOrders });
            await setOrders(reduxSortedOrders);
            setFilteredOrders(reduxSortedOrders);
            setLoading(false);
          } else {
            setWorngRequest(true);
          }
        }
        else {
          setOrders(reduxSortedOrders);
          setLoading(false);
          setFilteredOrders(reduxSortedOrders);
        }
      }


    }
    getOrders();
  }, [wrongRequest, page]);

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

  const loadMoreOrders = () => {
    setPage(prevPage => prevPage + 1);
  };


  return (
    <div className='ordersContainer'>
      {loading && <Loading />}
      {wrongRequest && <WorngRequest setWorngRequest={setWorngRequest} />}
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
      {hasMoreOrders && !loading && (
        <button className="loadMoreButton" onClick={loadMoreOrders}>
          טען עוד הזמנות
        </button>
      )}
    </div>
  );
}

export default Orders;
