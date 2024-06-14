import React, { useContext } from 'react';
import { Card, Text, Button, Badge } from '@mantine/core'; // Importing Badge for displaying completion status
import { SettingsContext } from '/src/context/Settings.jsx';
import Auth from "./auth/auth.jsx";

const TaskCard = (props) => {
    const settings = useContext(SettingsContext);

    return (
        <div>
            {props.list.map(item => (
                settings.hideCompleted && item.complete ? null :
                    <Card
                        key={item.id}
                        shadow="xs"
                        style={{ margin: '0 auto', marginBottom: '16px' }}
                        radius="md" // Applying medium border radius
                        padding="lg" // Applying large padding
                        overflow="hidden" // Ensuring content is not obscured
                    >
                        {/* Badge to display completion status */}
                        <Badge onClick={() => props.toggleComplete(item.id)}
                            variant={item.complete ? 'filled' : 'outline'} // Choose between filled or outline based on completion status
                            color={item.complete ? 'green' : 'red'} // Choose color based on completion status
                            style={{ marginBottom: '16px' }} // Add space below the badge
                        >
                            {item.complete ? 'Completed' : 'Incomplete'}
                        </Badge>
                        <Text>{item.text}</Text>
                        <Text size="md">Assigned to: {item.assignee}</Text>
                        <Text size="md">Difficulty: {item.difficulty}</Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                            <Auth capability="delete">
                                <Button
                                    onClick={() => props.deleteItem(item.id)}
                                    variant="outline"
                                    color="red"
                                >
                                    DELETE
                                </Button>
                            </Auth>
                            <Auth capability="update">
                                <Button
                                    onClick={() => props.toggleComplete(item.id)}
                                    variant={item.complete ? 'light' : 'outline'}
                                >
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
