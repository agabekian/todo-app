import {Card, Text, Button} from '@mantine/core';

const TodoItem = (props) => {
    return (
        <div>
            {props.list.map(item => !props.hideCompleted && !item.complete ?
                (
                    <Card key={item.id} shadow="xs" style={{maxWidth: '400px', margin: '0 auto', marginBottom: '16px'}}>
                        <Text>{item.text}</Text>
                        <Text size="sm">Assigned to: {item.assignee}</Text>
                        <Text size="sm">Difficulty: {item.difficulty}</Text>
                        <Button onClick={() => props.toggleComplete(item.id)} variant={item.complete ? 'light' : 'outline'}>
                            Complete
                        </Button>
                    </Card>
                ):<></>
            )}
        </div>

    )};

export default TodoItem;
