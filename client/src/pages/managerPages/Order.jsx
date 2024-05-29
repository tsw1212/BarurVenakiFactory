import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../../modules/requests/server_requests';
import Event from '../../components/events/Event';
import OrderProduct from '../../components/orders/OrderProduct';
import '../../css/orderDetails.css';
import WorngRequest from '../../pages/WorngRequest';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const statusOptions = ['התקבלה', 'אושרה', 'בתהליך הכנה', 'נשלחה', 'הסתיימה'];

function Order({ token }) {
    const { OrderId } = useParams();
    const [order, setOrder] = useState(null);
    const [wrongRequest, setWrongRequest] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [status, setStatus] = useState('');



    useEffect(() => {
        async function fetchOrder() {
            const responseData = await getRequest(`http://localhost:3000/orders/${OrderId}`, token);
            if (responseData.ok) {
                await setOrder(responseData.body);
            } else {
                await setWrongRequest(true);
            }
        }
        fetchOrder();
    }, [OrderId, token]);

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        const updatedOrder = { ...order, orderInfo: { ...order.orderInfo, status: newStatus } };
    
        const response = await postRequest(`http://localhost:3000/orders/${OrderId}/status`, { status: newStatus }, token);
        if (response.ok) {
          setOrder(updatedOrder);
        } else {
          setWrongRequest(true);
        }
      };

      function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString(undefined, options) + ' ' + date.toLocaleTimeString(undefined, options);
      }
      
      
      
    if (!order) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="orderDetailsContainer">
            {wrongRequest ? <WorngRequest /> :
                <div>
                    <h1>פרטי הזמנה</h1>
                    <div className="orderInfo">
                        <p>מספר מזהה של ההזמנה: {order.orderInfo.orderId}</p>
                        <p>משתמש ID: {order.orderInfo.userId}</p>
                        <p>תאריך: {order.orderInfo.date}</p>
                        {!editStatus ?
                            <p>סטטוס: {order.orderInfo.status}</p> :
                            <>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">סטטוס</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="status"
                                        onChange={handleStatusChange}
                                    >
                                        <MenuItem value={statusOptions[0]}>{statusOptions[0]}</MenuItem>
                                        <MenuItem value={statusOptions[1]}>{statusOptions[1]}</MenuItem>
                                        <MenuItem value={statusOptions[2]}>{statusOptions[2]}</MenuItem>
                                        <MenuItem value={statusOptions[3]}>{statusOptions[3]}</MenuItem>
                                        <MenuItem value={statusOptions[4]}>{statusOptions[4]}</MenuItem>
                                    </Select>
                                </FormControl>
                            </>
                        }

                        <p>הערות: {order.orderInfo.remarks}</p>
                    </div>
                    <button onClick={() => setEditStatus(true)}>ערוך סטטוס</button>

                    <div className="products">
                        <h2>מוצרים</h2>
                        {order.products.map(product => (
                            <OrderProduct key={product.id} product={product} />
                        ))}
                    </div>
                    {order.events.length > 0 && <div className="events">
                        <h2>אירועים</h2>
                        {order.events.map(event => (
                            <Event key={event.id} event={event} />
                        ))}
                    </div>}

                </div>

            }
        </div >

    );
}

export default Order;
