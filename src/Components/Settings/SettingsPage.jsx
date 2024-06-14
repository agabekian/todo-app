import React, { useContext } from 'react';
import { SettingsContext } from '/src/context/Settings.jsx';
import { Container } from '@mantine/core';

const SettingsPage = () => {
    const { hideCompleted, itemsToShow, setHideCompleted, setItemsToShow } = useContext(SettingsContext);

    const handleHideCompletedChange = () => {
        setHideCompleted((prev) => !prev);
    };

    const handleItemsToShowChange = (event) => {
        setItemsToShow(parseInt(event.target.value));
    };

    return (
        <Container size="md" style={{ padding: '2rem' }}>
            <div>
                <label>
                    Hide Completed:
                    <input type="checkbox" checked={hideCompleted} onChange={handleHideCompletedChange} />
                </label>
            </div>
            <div>
                <label>
                    Items to Show:
                    <select value={itemsToShow} onChange={handleItemsToShowChange}>
                        {[...Array(20)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </Container>
    );
};

export default SettingsPage;
