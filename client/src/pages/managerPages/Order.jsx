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
import { putRequest } from '../../modules/requests/server_requests';
import AddEvent from '../../components/events/AddEvent';

const statusOptions = ['התקבלה', 'אושרה', 'בתהליך הכנה', 'נשלחה', 'הסתיימה'];

function Order({ token }) {
    const { OrderId } = useParams();
    const [order, setOrder] = useState(null);
    const [wrongRequest, setWrongRequest] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [status, setStatus] = useState('');
    const [addEvent, setAddEvent] = useState(false);




    useEffect(() => {
        async function fetchOrder() {
            const responseData = await getRequest(`http://localhost:3000/orders/${OrderId}`, token);
            if (responseData.ok) {
                await setOrder(responseData.body);
            } else {
                alert('בעיה בטעינת הנתונים אנא נסה שוב')
            }
        }
        fetchOrder();
    }, [OrderId, token]);

    const handleSaveStatus = async (event) => {
        const updatedOrder = {
            id: order.orderInfo.orderId, userId: order.orderInfo.userId,
            date: order.orderInfo.date, status: status, remarks: order.orderInfo.remarks
        };

        const response = await putRequest(`http://localhost:3000/orders/${OrderId}`, updatedOrder, token);
        if (response.ok) {
            const order = response.body;
            await setOrder({ ...order, status: order.status });
            await setEditStatus(false);
        } else {
            setWrongRequest(true);
        }
    };

    const handleEventAdded = (newEvent) => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            events: [...prevOrder.events, newEvent],
        }));
    };
    // function formatDate(dateString) {
    //     const date = new Date(dateString);
    //     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    //     return date.toLocaleDateString(undefined, options) + ' ' + date.toLocaleTimeString(undefined, options);
    // }



    if (!order) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="orderDetailsContainer">
            <div>
                <h2>פרטי הזמנה</h2>
                <div className="orderInfo">
                    <p>מספר מזהה של ההזמנה: {order.orderInfo.orderId}</p>
                    <p>משתמש ID: {order.orderInfo.userId}</p>
                    <p>תאריך: {order.orderInfo.date}</p>
                    <p>הערות: {order.orderInfo.remarks}</p>
                    {!editStatus ?
                        <p>סטטוס: {order.orderInfo.status}</p> :
                        <>
                            <FormControl  className='editStatus'>
                                <InputLabel id="demo-simple-select-label" >סטטוס</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="status"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value={statusOptions[0]}>{statusOptions[0]}</MenuItem>
                                    <MenuItem value={statusOptions[1]}>{statusOptions[1]}</MenuItem>
                                    <MenuItem value={statusOptions[2]}>{statusOptions[2]}</MenuItem>
                                    <MenuItem value={statusOptions[3]}>{statusOptions[3]}</MenuItem>
                                    <MenuItem value={statusOptions[4]}>{statusOptions[4]}</MenuItem>
                                </Select>
                            </FormControl>
                            <br></br>
                            {editStatus && <button className="saveStatus" onClick={handleSaveStatus}>שמור סטטוס</button>}

                        </>
                    }
                    {!editStatus && <button onClick={() => setEditStatus(true)}>ערוך סטטוס</button>}
                </div>


                <div className="products">
                    <h3>מוצרים</h3>
                    {order.products.map(product => (
                        <OrderProduct key={product.id} product={product} />
                    ))}
                </div>
                {order.events.length > 0 && <div className="events">
                    <h3>אירועים</h3>
                    {order.events.map(event => (
                        <Event key={event.id} event={event} />
                    ))}
                </div>}
                {!addEvent && <button onClick={() => { setAddEvent(true) }}>הוסף אירוע</button>}
                {addEvent && <AddEvent setAddEvent={setAddEvent} orderId={order.orderInfo.orderId} token={token} onEventAdded={handleEventAdded} />}

            </div>


        </div >

    );
}

export default Order;
