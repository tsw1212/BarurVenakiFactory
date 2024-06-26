import React, { useState, useEffect } from 'react';
import { getRequest, putRequest } from '../../modules/requests/server_requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/dataDetails.css';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';

const FactoryDetails = () => {
    const [factory, setFactory] = useState({});
    const [alert, setAlert] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    let token = useSelector((state) => state.app.token);

    useEffect(() => {
        async function fetch() {
            setAlert('');
            try {
                console.log('Token:', token);
                if (token === '') {
                    token = localStorage.getItem('token');
                }
                let dataRequest = await getRequest(`http://localhost:3000/factory/ברור ונקי`, token);
                if (dataRequest.ok) {
                    setFactory(dataRequest.body.factory);
                } else {
                    setAlert('בעיה בטעינת הנתונים בבקשה נסה שוב');
                }
            } catch (error) {
                setAlert('בעיה בטעינת הנתונים בבקשה נסה שוב');
                console.error('Failed to fetch factory data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFactory({ ...factory, [name]: value });
    };

    const handleSave = async () => {
        setAlert('');
        try {
            let dataRequest = await putRequest(`http://localhost:3000/factory/ברור ונקי`, factory, token);
            if (dataRequest.ok) {
                setFactory(dataRequest.body.factory);
                setIsEditing(false);
            } else {
                setAlert('בעיה בשמירת השינויים בבקשה נסה שוב');
            }
        } catch (error) {
            setAlert('בעיה בשמירת השינויים בבקשה נסה שוב');
            console.error('Failed to save factory data:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!factory) {
        return <div>Loading data...</div>;
    }

    return (
        <div className='databody'>
            {alert && <h2>{alert}</h2>}

            {isEditing ? (
                <div className='editForm_container'>
                    <div className='editForm_form'>
                        <label>שם: <input className='editInput' type="text" name="name" value={factory.name || ''} readOnly /></label><br />
                        <label>אמייל: <input className='editInput' type="email" name="email" value={factory.email || ''} onChange={handleChange} /></label><br />
                        <label>עיר: <input className='editInput' type="text" name="city" value={factory.city || ''} onChange={handleChange} /></label><br />
                        <label>רחוב: <input className='editInput' type="text" name="street" value={factory.street || ''} onChange={handleChange} /></label><br />
                        <label>מספר בית: <input className='editInput' type="text" name="houseNumber" value={factory.houseNumber || ''} onChange={handleChange} /></label><br />
                        <label>מספר טלפון: <input className='editInput' type="text" name="phone" value={factory.phone || ''} onChange={handleChange} /></label><br />
                        <label>סיסמא של מייל לאפליקציה: <input className='editInput' type="text" name="passwordEmail" value={factory.passwordEmail || ''} onChange={handleChange} /></label><br />
                        <button className='editButton' onClick={handleSave}>שמירה</button>
                        <button className='editButton' onClick={() => setIsEditing(false)}>ביטול</button>
                    </div>
                </div>
            ) : (
                <div className='data_information'>
                    <h2>פרטי משתמש</h2>
                    <p><strong>שם: <FontAwesomeIcon icon="fas fa-factory" /></strong> {factory.name}</p>
                    <p><strong>אמייל: <FontAwesomeIcon icon="fas fa-envelope" /></strong> {factory.email}</p>
                    <p><strong>עיר: <FontAwesomeIcon icon="fas fa-city" /></strong> {factory.city}</p>
                    <p><strong>רחוב: <FontAwesomeIcon icon="fas fa-road" /></strong> {factory.street}</p>
                    <p><strong>מספר בית: <FontAwesomeIcon icon="fas fa-house-factory" /></strong> {factory.houseNumber}</p>
                    <p><strong>מספר טלפון : <FontAwesomeIcon icon="fas fa-phone" /></strong> {factory.phone}</p>
                    <p><strong>סיסמא של מייל לאפליקציה <FontAwesomeIcon icon="fas fa-phone" /></strong> {factory.passwordEmail}</p>
                    <button className='editButton' onClick={() => setIsEditing(true)}>עריכה</button>
                </div>
            )}
        </div>
    );
}

export default FactoryDetails;
