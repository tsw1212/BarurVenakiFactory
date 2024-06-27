import React, { useEffect, useState } from 'react';
import { getRequest } from '../../modules/requests/server_requests';
import '../../css/UsersTable.css';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  useSelector,useDispatch } from 'react-redux';


const UsersTable = ({ setFilteredUsers,filteredUsers }) => {
    const dispatch = useDispatch();
    let token = useSelector((state) => state.app.token);
const usersRedux=useSelector((state) =>state.details.users)
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (token === '') {
                    token = localStorage.getItem('token');
                }
                if (usersRedux.length == 0) {

                const responseData = await getRequest('http://localhost:3000/users', token);
                if (responseData.ok) {
                    await dispatch({ type: 'SET_USERS', payload: responseData.body });
                    await  setUsers(responseData.body);
                    setLoading(false);
                }
            }else{
                setUsers(usersRedux);
                setLoading(false);
            }
            } catch (error) {
                alert('ישנה בעיה, בבקשה נסה שוב');
            }
        };

        fetchUsers();
    }, [token]);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = users.filter(user =>
            Object.values(user).some(value =>
                value.toString().toLowerCase().includes(lowercasedQuery)
            )
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    return (
        <>
            {loading && <Loading />}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="חפש ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="searchInput"
                />
                <FontAwesomeIcon icon="fas fa-search" />

            </div>
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
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{`${user.id} ${user.manager ? "*" : ""}`}</td>
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
