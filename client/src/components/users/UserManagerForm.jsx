import React, { useState } from 'react';
import { postRequest } from '../../modules/requests/server_requests';
import '../../css/usersManagersForm.css'

const UserManagerForm = ({ token }) => {
    const [userId, setUserId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const requestData = await postRequest('http://localhost:3000/managers', { id: userId }, token);
            if (requestData.ok) {
                alert('מנהל נוסף בהצלחה');
            }
            else {
                alert('תקלה בקביעת משתמש בתור מנהל בבקשה נסה שוב');
            }
            setUserId('');
        } catch (error) {
            alert('תקלה בקביעת משתמש בתור מנהל בבקשה נסה שוב');

        }
    };

    return (
        <div className='createManager_container'>
            <form onSubmit={handleSubmit} className='createManager_form'>
                <div>
                    <label>
                        קבע משתמש כמנהל
                        <input
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder='ID של המשתמש'
                            required
                        />
                    </label>
                </div>
                <button type="submit">קבע כמנהל</button>
            </form>
        </div>
    );
};

export default UserManagerForm;
