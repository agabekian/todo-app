import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SettingsPage from '../src/Components/Settings/SettingsPage.jsx';
import Todo from "./Components/Todo/Todo.jsx";
import Header from "./Components/Header/Header.jsx"; // Assuming you have a component named Settings

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Todo/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
