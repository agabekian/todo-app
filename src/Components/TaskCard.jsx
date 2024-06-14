import React, { useContext } from 'react';
import { Card, Text, Button } from '@mantine/core';
import { SettingsContext } from '/src/context/Settings.jsx';
import Auth from "./auth/auth.jsx";

const TaskCard = (props) => {
    const settings = useContext(SettingsContext);

    return (
        <div>
            {props.list.map(item => (
                settings.hideCompleted && item.complete ? null :
                    <Card key={item.id} shadow="xs"
                          style={{ minWidth: '400px', margin: '0 auto', marginBottom: '16px', position: 'relative' }}>
                        <div onClick={() => props.toggleComplete(item.id)} style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            backgroundColor: item.complete ? 'green' : 'red',
                            color: '#fff'
                        }}>
                            {item.complete ? 'Completed' : 'Incomplete'}
                        </div>
                        <div style={{ marginLeft: '40px' }}> {/* Adjust margin to prevent text from being obscured */}
                            <Text>{item.text}</Text>
                            <Text size="sm">Assigned to: {item.assignee}</Text>
                            <Text size="sm">Difficulty: {item.difficulty}</Text>
                            <Auth capability="delete">
                                <Button onClick={() => props.deleteItem(item.id)} variant="outline" color="red">
                                    DELETE
                                </Button>
                            </Auth>
                            <Auth capability="update">
                                <Button onClick={() => props.toggleComplete(item.id)}
                                        variant={item.complete ? 'light' : 'outline'}>
                                    UPDATE
                                </Button>
                            </Auth>
                        </div>
                    </Card>
            ))}
        </div>
    );
};

export default TaskCard;
