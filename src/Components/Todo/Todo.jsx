import { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '/src/context/Settings.jsx';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import { Input, Button, Text, SegmentedControl, Card, Title } from '@mantine/core'; // Import Mantine components
import '@mantine/core/styles.css';

const Todo = () => {
    const settings = useContext(SettingsContext);
    const [defaultValues] = useState({
        difficulty: 4,
    });
    const [list, setList] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // for pagination
    const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
    const itemsToShow = settings.itemsToShow; // var to control number of items to display

    function addItem(item) {
        item.id = uuid();
        item.complete = false;
        console.log(item);
        setList([...list, item]);
    }

    function toggleComplete(id) {
        const updatedList = list.map(item => {
            if (item.id === id) {
                item.complete = !item.complete;
            }
            return item;
        });

        setList(updatedList);
    }

    useEffect(() => {
        let incompleteCount = list.filter(item => !item.complete).length;
        setIncomplete(incompleteCount);
        document.title = `To Do List: ${incomplete}`;
    }, [list]);

    const handleNextPage = () => setCurrentPage(prevPage => prevPage + 1);
    const handlePrevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

    const visibleItems = list.slice((currentPage - 1) * itemsToShow, currentPage * itemsToShow);

    return (
        <>
            <header>
                <Title order={1} align="center">To Do List: {incomplete} items pending</Title>
            </header>

            <form onSubmit={handleSubmit}>
                <Title order={2}>Add To Do Item</Title>

                <Input onChange={handleChange} name="text" placeholder="Item Details" />
                <Input onChange={handleChange} name="assignee" placeholder="Assignee Name" />
                <SegmentedControl
                    data={[
                        { value: 1, label: '1' },
                        { value: 2, label: '2' },
                        { value: 3, label: '3' },
                        { value: 4, label: '4' },
                        { value: 5, label: '5' },
                    ]}
                    defaultValue={defaultValues.difficulty}
                    onChange={(value) => handleChange({ target: { name: 'difficulty', value } })}
                />

                <Button type="submit">Add Item</Button>
            </form>

            {visibleItems.map(item => (
                settings.hideCompleted && item.complete // hide task if completed
                    ? <></>
                    : <Card key={item.id} shadow="xs" style={{ marginBottom: '16px' }}>
                        <Text>{item.text}</Text>
                        <Text size="sm">Assigned to: {item.assignee}</Text>
                        <Text size="sm">Difficulty: {item.difficulty}</Text>
                        <Button onClick={() => toggleComplete(item.id)} variant={item.complete ? 'light' : 'outline'}>Complete</Button>
                    </Card>
            ))}

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
                {currentPage > 1 && <Button onClick={handlePrevPage}>Prev Page</Button>}
                {list.length > currentPage * itemsToShow && <Button onClick={handleNextPage}>Next Page</Button>}
            </div>
        </>
    );
};

export default Todo;
