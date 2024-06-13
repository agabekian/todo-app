// src/Components/Todo/Todo.jsx
import React, {useEffect, useState, useContext} from 'react';
import {SettingsContext} from '/src/context/Settings.jsx';
import useForm from '../../hooks/form';
import {v4 as uuid} from 'uuid';
import {Container, Group, Pagination} from '@mantine/core';
import '@mantine/core/styles.css';
import Form from "../Form/Form.jsx";
import TaskCard from "../TaskCard.jsx";

const Todo = () => {
    const settings = useContext(SettingsContext);
    const [defaultValues] = useState({
        difficulty: 4,
    });
    const [displayList, setDisplayList] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const {handleChange, handleSubmit} = useForm(addItem, defaultValues);
    const itemsToShow = settings.itemsToShow;
    // USING LOCAL STORAGE NOW
    const [list, setList] = useState(() => {
        const savedList = localStorage.getItem('todoList');
        return savedList ? JSON.parse(savedList) : [];
    });

    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? JSON.parse(savedPage) : 1;
    });


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
        localStorage.setItem('todoList', JSON.stringify(list)); //added local storage
        localStorage.setItem('currentPage', JSON.stringify(currentPage));//added local storage 2
        document.title = `To Do List: ${incomplete}`;
    }, [list, currentPage, itemsToShow]);

    return (
        <Container size="xl" style={{padding: '2rem'}}>
            <p data-testid="todo-component">{incomplete}</p>
            <Group position="apart" align="flex-start">
                <Form handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      difficulty={defaultValues.difficulty}/>

                <TaskCard list={displayList}
                          toggleComplete={toggleComplete}
                          deleteItem={deleteItem}/>
            </Group>

            <Pagination
                style={{position: 'fixed', bottom: '20px', right: '20px', zIndex: '100'}}
                total={Math.ceil(list.length / itemsToShow)}
                page={currentPage}
                onChange={setCurrentPage}
                data-testid="pagination-component"
            />
        </Container>
    );
};

export default Todo;
