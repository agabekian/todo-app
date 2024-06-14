import React, { useContext } from 'react';
import { Button } from '@mantine/core';
import { LoginContext } from './context.jsx';
import { useMantineTheme } from '@mantine/core';

const Logout = () => {
    const { logout, user } = useContext(LoginContext);
    const theme = useMantineTheme();

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ color: 'white' }}>
                Welcome, {user.name}
            </p>
            <Button
                style={{ marginLeft: 10 }} // Add margin between welcome message and button
                color="gray" // Adjust button color based on your design
                onClick={logout}
            >
                Log Out
            </Button>
        </div>
    );
};

export default Logout;
