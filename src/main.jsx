import React from 'react';
import ReactDOM from 'react-dom/client';
import SettingsProvider from './context/Settings.jsx';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SettingsProvider>
            <App/>
        </SettingsProvider>
    </React.StrictMode>
);
