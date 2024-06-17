import React, { useState } from 'react';
import UsersTable from '../../components/users/UsersTable';
import UserManagerForm from '../../components/users/UserManagerForm';
import '../../css/users.css';

const Users = ({ token }) => {
    const [newManagerOn, setNewMangerOn] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    

    return (
        <>
            <div className={`usersPage ${newManagerOn ? 'blur' : ''}`}>
                <button className='add_manager_button' onClick={() => setNewMangerOn(true)}>הגדר מנהל חדש</button>

                <UsersTable token={token} filteredUsers={filteredUsers} setFilteredUsers={setFilteredUsers} />
            </div>
            {newManagerOn && <UserManagerForm setFilteredUsers={setFilteredUsers} token={token} setNewMangerOn={setNewMangerOn} />}
        </>
    );
};

export default Users;
