import React from 'react';
import UsersTable from '../../components/users/UsersTable';
import UserManagerForm from '../../components/users/UserManagerForm';

const Users = ({token}) => {
    return (
        <div>
            <UserManagerForm token={token} />
            <UsersTable token={token}/>
        </div>
    );
};

export default Users;
