import React, { useState } from 'react';
import { postRequest } from '../../modules/requests/server_requests';

const UserManagerForm = ({ token }) => {
    const [userId, setUserId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const requestData = await postRequest('http://localhost:3000/managers', userId, token);
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    ID של במשתמש:
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit">קבע כמנהל</button>
        </form>
    );
};

export default UserManagerForm;
