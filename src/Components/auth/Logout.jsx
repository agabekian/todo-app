import React, { useContext } from 'react';
import { LoginContext } from './context.jsx';
import { Button } from '@mantine/core'; // or any other UI library you are using

const Logout = () => {
    const { logout } = useContext(LoginContext);

    return (
        <Button onClick={logout}>
            Log Out
        </Button>
    );
};

export default Logout;
