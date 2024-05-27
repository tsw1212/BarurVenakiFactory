import React from 'react';
import UsersTable from '../../components/users/UsersTable';
import UserManagerForm from '../../components/users/UserManagerForm';

const Users = ({token}) => {
    return (
        <div>
            <h1>משתמשים</h1>
            <UsersTable token={token}/>
            <h2>קבע משתמש כמנהל</h2>
            <UserManagerForm token={token} />
        </div>
    );
};

export default Users;
