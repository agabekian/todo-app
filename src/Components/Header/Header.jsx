import {Link} from 'react-router-dom';
import {Button} from '@mantine/core';
import Logout from "../auth/Logout.jsx";

const Header = () => {
    return (
        <div style={{backgroundColor: '#6187bd', padding: '16px'}}>
            <Button component={Link} to="/" color="white" variant="light" size="xl">Home</Button>
            <Button component={Link} to="/settings" color="white" variant="light" size="xl">Settings</Button>
            <Logout/>
        </div>
    );
};

export default Header;
