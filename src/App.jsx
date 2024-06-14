import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SettingsPage from './Components/Settings/SettingsPage.jsx';
import Todo from "./Components/Todo/Todo.jsx";
import Header from "./Components/Header/Header.jsx";
import LoginProvider, { LoginContext } from './Components/auth/context.jsx';
import Login from "./Components/auth/login.jsx";
import Auth from "./Components/auth/auth.jsx";
import React, { useContext } from 'react';

const AppContent = () => {
    const { loggedIn } = useContext(LoginContext);

    if (!loggedIn) {
        return <Login />;
    }

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Todo />} />
                <Route path="/settings" element={
                    <Auth>
                        <SettingsPage />
                    </Auth>
                } />
            </Routes>
        </BrowserRouter>
    );
};
//refactored to display correctly Login Provide
const App = () => {
    return (
        <LoginProvider>
            <AppContent />
        </LoginProvider>
    );
};

export default App;
