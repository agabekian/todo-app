import {useEffect, useState, useContext, Component} from 'react';
import { SettingsContext } from '/src/context/Settings.jsx';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import { Input, Button, Text, Card, Title, Slider, Pagination } from '@mantine/core'; // Import Mantine components
import '@mantine/core/styles.css';
import TodoItem from '../TaskCard.jsx';

class Todo extends Component {
    render() {
        const settings = useContext(SettingsContext);
        const [defaultValues] = useState({
            difficulty: 4,
        });
        const [list, setList] = useState([]);
        const [incomplete, setIncomplete] = useState([]);
        const [currentPage, setCurrentPage] = useState(1); // for pagination
        const {handleChange, handleSubmit} = useForm(addItem, defaultValues);
        const itemsToShow = settings.itemsToShow; // var to control number of items to display

        function addItem(item) {
            item.id = uuid();
            item.complete = false;
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

        const visibleItems = list.slice((currentPage - 1) * itemsToShow, currentPage * itemsToShow);

        return (
            <>
                <header>
                    <Title order={1} align="center">To Do List: {incomplete} items pending</Title>
                </header>

                <form onSubmit={handleSubmit} style={{maxWidth: '400px', margin: '0 auto'}}>
                    <Title order={2}>Add To Do Item</Title>

                    <Input onChange={handleChange} style={{maxWidth: '400px', margin: '0 auto'}} name="text"
                           placeholder="Item Details"/>
                    <Input onChange={handleChange} name="assignee" placeholder="Assignee Name"/>
                    <Input onChange={handleChange} name="enumeration" placeholder="#"/>

                    
                    <Button type="submit" style={{width: '100%'}}>Add Item</Button>
                </form>

                <div style={{marginBottom: '50px'}}>
                    {visibleItems.map(item => (
                        <TodoItem
                            key={item.id}
                            item={item}
                            toggleComplete={toggleComplete}
                            hideCompleted={settings.hideCompleted}
                        />
                    ))}
                </div>

                <Pagination
                    style={{position: 'fixed', bottom: '20px', right: '20px', zIndex: '100'}}
                    total={Math.ceil(list.length / itemsToShow)}
                    page={currentPage}
                    onChange={setCurrentPage}
                />
            </>
        );
    }
}

export default Todo;
