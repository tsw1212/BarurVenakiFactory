import React, { useState, useEffect } from 'react';
import UsersTable from '../../components/users/UsersTable';
import UserManagerForm from '../../components/users/UserManagerForm';
import '../../css/users.css';
import { useSelector } from 'react-redux';
import NotFound from '../NotFound';


const Users = () => {
    const [newManagerOn, setNewMangerOn] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const status = useSelector(state => state.app.status);

    useEffect(() => {
        setFilteredUsers((users) => [...users].sort((a, b) => a.name.localeCompare(b.name)));
    }, []);

    return (
        <>
            {status !== 'manager' ? <NotFound /> :
                <>
                    <div className={`usersPage ${newManagerOn ? 'blur' : ''}`}>
                        <button className='add_manager_button' onClick={() => setNewMangerOn(true)}>הגדר מנהל חדש</button>
                        <UsersTable filteredUsers={filteredUsers} setFilteredUsers={setFilteredUsers} />
                    </div>
                    {newManagerOn && <UserManagerForm setFilteredUsers={setFilteredUsers} setNewMangerOn={setNewMangerOn} />}
                </>
            }
        </>
    );
};

export default Users;
