import {useEffect, useState, useContext} from 'react';
import {SettingsContext} from '/src/context/Settings.jsx';
import useForm from '../../hooks/form';
import {v4 as uuid} from 'uuid';
import {Container, Group, Pagination} from '@mantine/core';
import '@mantine/core/styles.css';
import Form from "../Form/Form.jsx";
import TaskCard from "../TaskCard.jsx";
import Auth from "../auth/auth.jsx";


const Todo = () => {
    const settings = useContext(SettingsContext);
    const [defaultValues] = useState({
        difficulty: 4,
    });
    const [list, setList] = useState([]);
    const [displayList, setDisplayList] = useState([]);
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


    function deleteItem(id) {
        const items = list.filter(item => item.id !== id);
        setList(items);
    }

    useEffect(() => {
        let incompleteCount = list.filter(item => !item.complete).length;
        setIncomplete(incompleteCount);
        const visibleItems = list.slice((currentPage - 1) * itemsToShow, currentPage * itemsToShow);
        setDisplayList(visibleItems);
        document.title = `To Do List: ${incomplete}`;
    }, [list]);


    return (
        <Container size="xl" style={{padding: '2rem'}}>
            <p>{incomplete}</p>
            <Group position="apart" align="flex-start" noWrap>
                <Auth capability="create">
                    <Form handleChange={handleChange}
                          handleSubmit={handleSubmit}
                          difficulty={defaultValues.difficulty}/>
                </Auth>
                <TaskCard list={displayList}
                          toggleComplete={toggleComplete}
                          deleteItem={deleteItem}/>
            </Group>

            <Pagination
                style={{position: 'fixed', bottom: '20px', right: '20px', zIndex: '100'}}
                total={Math.ceil(list.length / itemsToShow)}
                page={currentPage}
                onChange={setCurrentPage}
            />
        </Container>
    );
};

export default Todo;

