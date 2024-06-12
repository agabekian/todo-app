import React, { useContext } from 'react';
import { SettingsContext } from '/src/context/Settings.jsx';
import { Container, Title, Group, Switch, NumberInput, Button, Text } from '@mantine/core';

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
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </label>
            </div>
        </Container>
    );
};

export default SettingsPage;
