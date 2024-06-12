import React, {useState} from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
    const [itemsToShow,setItemsToShow] = useState(5);
    const [hideCompleted, setHideCompleted] = useState(true);
    const [defaultSort] = useState('difficulty'); // for optional stretch

    // const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');
    return (
        <SettingsContext.Provider value={{itemsToShow,setItemsToShow, hideCompleted,setHideCompleted}}>
            {props.children}
        </SettingsContext.Provider>
    );
}

export default SettingsProvider;
