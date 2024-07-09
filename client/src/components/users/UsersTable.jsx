import React, { useEffect, useState } from 'react';
import { getRequest } from '../../modules/requests/server_requests';
import '../../css/UsersTable.css';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';

const UsersTable = ({ setFilteredUsers, filteredUsers }) => {
    const dispatch = useDispatch();
    let token = useSelector((state) => state.app.token);
    const usersRedux = useSelector((state) => state.details.users);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [hasMoreUsers, setHasMoreUsers] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (token === '') {
                    token = localStorage.getItem('token');
                }
                if (usersRedux.length === 0 || page !== 1) {
                    const responseData = await getRequest(`http://localhost:3000/users/paged/${page}`, token);
                    if (responseData.ok) {
                        if (responseData.body.length < 10) {
                            setHasMoreUsers(false);
                        }

                        if (page === 1) {
                            await dispatch({ type: 'SET_USERS', payload: responseData.body });
                            await setUsers(responseData.body);
                        } else {
                            await setUsers([...usersRedux, ...responseData.body]);
                        }

                        setLoading(false);
                    }
                } else {
                    if (usersRedux.length < 10) {
                        setHasMoreUsers(false);
                    }
                    setUsers(usersRedux);
                    setLoading(false);
                }
            } catch (error) {
                alert('ישנה בעיה, בבקשה נסה שוב');
            }
        };

        fetchUsers();
    }, [token, page]);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = users.filter(user =>
            Object.values(user).some(value =>
                value.toString().toLowerCase().includes(lowercasedQuery)
            )
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const loadMoreUsers = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>
            {loading && <Loading />}
            <div className="search-container">
            <FontAwesomeIcon icon="fas fa-search" />

                <input
                    type="text"
                    placeholder="חפש ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="searchInput"
                />
            </div>
            <div className="table-container">
                <table className="users_table">
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
                <div className="cards_users">
                    {filteredUsers.map(user => (
                        <div key={user.id} className="user-card">
                            <p><strong>מספר מזהה:</strong> {user.id} {user.manager ? "*" : ""}</p>
                            <p><strong>שם:</strong> {user.name}</p>
                            <p><strong>אמייל:</strong> {user.email}</p>
                            <p><strong>עיר:</strong> {user.city}</p>
                            <p><strong>רחוב:</strong> {user.street}</p>
                            <p><strong>מספר בית:</strong> {user.houseNumber}</p>
                            <p><strong>שם העסק:</strong> {user.username}</p>
                            <p><strong>מספר טלפון 1:</strong> {user.phone1}</p>
                            <p><strong>מספר טלפון 2:</strong> {user.phone2}</p>
                        </div>
                    ))}
                </div>
            </div>
            {hasMoreUsers && !loading && (
                <button className="loadMoreButton" onClick={loadMoreUsers}>
                    טען עוד משתמשים
                </button>
            )}
        </>
    );
};

export default UsersTable;
