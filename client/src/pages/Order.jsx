import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest, putRequest, postRequest } from '../modules/requests/server_requests';
import Event from '../components/events/Event';
import OrderProduct from '../components/orders/OrderProduct';
import '../css/orderDetails.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import AddEvent from '../components/events/AddEvent';
import Loading from '../components/Loading';
import formatDates from '../modules/formatDateTime';
import OrderTimeline from '../components/orders/OrderTimeLine';
import { useSelector } from 'react-redux';

const statusOptions = ['התקבלה', 'אושרה', 'בתהליך הכנה', 'נשלחה', 'הסתיימה'];

function Order() {
    const { OrderId } = useParams();
    const [order, setOrder] = useState({});
    const [wrongRequest, setWrongRequest] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [orderStatus, setOrderStatus] = useState('');
    const [addEvent, setAddEvent] = useState(false);
    const [loading, setLoading] = useState(true);
    let token = useSelector((state) => state.app.token);
    const status = useSelector((state) => state.app.status);

    const sortEventsByDate = (events) => {
        return events.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    useEffect(() => {
        async function fetchOrder() {
            if (token === '') {
                token = localStorage.getItem('token');
            }
            const responseData = await getRequest(`http://localhost:3000/orders/${OrderId}`, token);
            if (responseData.ok) {
                const orderData = responseData.body;
                orderData.events = sortEventsByDate(orderData.events);
                await setOrder(orderData);
                await setLoading(false);
            } else {
                alert('בעיה בטעינת הנתונים אנא נסה שוב');
            }
        }
        fetchOrder();
    }, [OrderId]);

    // const updateProductInventory = async (productId, amount) => {
    //     const response = await putRequest(`http://localhost:3000/products/${productId}`, { inventory: amount }, token);
    //     if (!response.ok) {
    //         console.error(`Failed to update inventory for product ${productId}`);
    //     }
    // };

    const handleSaveStatus = async (event) => {
        const updatedOrder = {
            id: order.orderInfo.orderId, 
            userId: order.orderInfo.userId,
            date: order.orderInfo.date, 
            status: orderStatus, 
            remarks: order.orderInfo.remarks
        };

        const response = await putRequest(`http://localhost:3000/orders/${OrderId}`, updatedOrder, token);
        if (response.ok) {
            const order = response.body;
            await setOrder({ ...order, status: order.status });
            await setEditStatus(false);
            
            // if (status === 'manager' && orderStatus === 'הסתיימה') {
            //     for (const product of order.products) {
            //         await updateProductInventory(product.productId, product.amount);
            //     }
            // }
        } else {
            setWrongRequest(true);
        }
    };

    const handleEventAdded = (newEvent) => {
        setOrder((prevOrder) => {
            const updatedEvents = sortEventsByDate([...prevOrder.events, newEvent]);
            return {
                ...prevOrder,
                events: updatedEvents,
            };
        });
    };

    const handleProductAmountChange = async (productId, newAmount, reason) => {
        const updatedProduct = {
            orderId: order.orderInfo.orderId,
            productId: productId,
            amount: newAmount,
        };

        const response = await putRequest(`http://localhost:3000/productOrder`, updatedProduct, token);
        if (response.ok) {
            const updatedOrder = {
                ...order,
                products: order.products.map(product =>
                    product.productId === productId ? { ...product, amount: newAmount } : product
                )
            };
            setOrder(updatedOrder);

            const newEvent = {
                orderId: order.orderInfo.orderId,
                text: `הכמות של מוצר מספר: ${productId} השתנתה ל: ${newAmount}. הסיבה: ${reason}`,
                date: formatDates.formatDateTime(new Date())
            };
            const eventResponse = await postRequest(`http://localhost:3000/events`, newEvent, token);
            if (eventResponse.ok) {
                handleEventAdded(newEvent);
            } else {
                console.error('Failed to create event');
            }
        } else {
            console.error('Failed to update product amount');
        }
    };

    return (
        <div className="container">
            <div className="timelineContainer">
                {!loading && <OrderTimeline currentStatus={order.orderInfo.status} />}
            </div>
            <div className="orderDetailsContainer">
                <h2>פרטי הזמנה</h2>
                {loading ? <Loading /> :
                    <>
                        <div className="orderInfo">
                            <p>מספר מזהה של ההזמנה: {order.orderInfo.orderId}</p>
                            <p>מספר משתמש: {order.orderInfo.userId}</p>
                            <p>שם משתמש: {order.orderInfo.username}</p>
                            <p>עיר: {order.orderInfo.city}</p>
                            <p>תאריך: {formatDates.formatDateTime(order.orderInfo.date)}</p>
                            <p>תאריך אספקה: {formatDates.formatDate(order.orderInfo.deliveryDate)}</p>
                            <p>הערות: {order.orderInfo.remarks}</p>
                            {!editStatus ?
                                <p>סטטוס: {order.orderInfo.status}</p> :
                                <>
                                    <FormControl className='editStatus'>
                                        <InputLabel id="demo-simple-select-label">סטטוס</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={orderStatus}
                                            label="status"
                                            onChange={(e) => setOrderStatus(e.target.value)}
                                        >
                                            {statusOptions.map(option => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <br />
                                    {editStatus && <button className="saveStatus" onClick={handleSaveStatus}>שמור סטטוס</button>}
                                </>
                            }
                            {(!editStatus && status === 'manager') && <button onClick={() => setEditStatus(true)}>ערוך סטטוס</button>}
                        </div>
                        <div className="products">
                            <h3>מוצרים</h3>
                            {order.products.map(product => (
                                product.amount !== 0 &&
                                <OrderProduct orderStatus={orderStatus === "" ? order.orderInfo.status : orderStatus} key={product.productId} product={product} onAmountChange={handleProductAmountChange} />
                            ))}
                        </div>
                        {order.events.length > 0 && <div className="events">
                            <h3>אירועים</h3>
                            {order.events.map(event => (
                                <Event key={event.id} event={event} />
                            ))}
                        </div>}
                        {!addEvent && status === 'manager' && <button onClick={() => setAddEvent(true)}>הוסף אירוע</button>}
                        {addEvent && <AddEvent setAddEvent={setAddEvent} orderId={order.orderInfo.orderId} onEventAdded={handleEventAdded} />}
                    </>
                }
            </div>
        </div>
    );
}

export default Order;
