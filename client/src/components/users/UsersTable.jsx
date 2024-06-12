import React, { useEffect, useState } from 'react';
import { getRequest } from '../../modules/requests/server_requests';
import '../../css/UsersTable.css';
import Loading from '../Loading';

const UsersTable = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await getRequest('http://localhost:3000/users', token);
                if (responseData.ok) {
                    await setUsers(responseData.body);
                    setLoading(false);
                }
            } catch (error) {
                alert('ישנה בעיה, בבקשה נסה שוב');
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            {loading && <Loading />}
            <table className='users_table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>שם</th>
                        <th>אמייל</th>
                        <th>עיר</th>
                        <th>רחוב</th>
                        <th>מספר בית</th>
                        <th>שם העסק</th>
                        <th>מספר טלפון 1</th>
                        <th>מספר טלפון 2</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.city}</td>
                            <td>{user.street}</td>
                            <td>{user.houseNumber}</td>
                            <td>{user.username}</td>
                            <td>{user.phone1}</td>
                            <td>{user.phone2}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default UsersTable;
