import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SettingsPage from '../src/Components/Settings/SettingsPage.jsx';
import Todo from "./Components/Todo/Todo.jsx";
import Header from "./Components/Header/Header.jsx"; // Assuming you have a component named Settings
import LoginContext from './Components/auth/context.jsx';
import Login from "./Components/auth/login.jsx";
import Auth from "./Components/auth/auth.jsx";

const App = () => {
    return (
        <LoginContext>
            <Login />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={
                            <Todo />
                    } />
                    <Route path="/settings" element={
                        <Auth>
                            <SettingsPage />
                        </Auth>
                    } />
                </Routes>
            </BrowserRouter>
        </LoginContext>
    );
};

export default App;
