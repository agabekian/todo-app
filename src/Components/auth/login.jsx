import {useContext, useState} from 'react';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';


import {LoginContext} from './context.jsx';

const Login = () => {
    const {loggedIn, login, logout} = useContext(LoginContext);
    const [credentials, setCredentials] = useState({username: '', password: ''});

    const handleChange = e => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        login(credentials.username, credentials.password); //send to context login async func
    };

    return (
        <Container size={420} my={40} style={{width: '100%', margin: 'auto', marginBottom: '1rem'}}>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Anchor size="sm" component="button">
                        Create account
                    </Anchor>
                </Text>
                <form onSubmit={handleSubmit}>
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput label="Name"
                                   name="username"
                                   onChange={handleChange}
                                   placeholder="you"
                                   required/>
                        <PasswordInput label="Password"
                                       name="password"
                                       onChange={handleChange}
                                       placeholder="Your password"
                                       required mt="md"/>

                        <Group justify="space-between" mt="lg">
                            <Checkbox label="Remember me"/>
                            <Anchor component="button" size="sm">
                                Forgot password?
                            </Anchor>
                        </Group>

                        <Button type="submit" fullWidth mt="xl">
                            Sign in
                        </Button>
                    </Paper>
                </form>
        </Container>
    );
};


export default Login;
