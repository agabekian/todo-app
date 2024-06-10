import React, {useState} from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
    const [itemsToShow] = useState(5);
    const [hideCompleted] = useState(true);
    // const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');
    return (
        <SettingsContext.Provider value={{itemsToShow, hideCompleted}}>
            {props.children}
        </SettingsContext.Provider>
    );
}

export default SettingsProvider;
