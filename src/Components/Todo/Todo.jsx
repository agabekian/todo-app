import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '/src/context/Settings.jsx';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import { Container, Group, Pagination } from '@mantine/core';
import '@mantine/core/styles.css';
import Form from "../Form/Form.jsx";
import TaskCard from "../TaskCard.jsx";
import Auth from "../auth/auth.jsx";

const Todo = () => {
    const settings = useContext(SettingsContext);
    const [defaultValues] = useState({
        difficulty: 4,
    });
    const [displayList, setDisplayList] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
    const itemsToShow = settings.itemsToShow;
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
        let filteredList = list;
        if (settings.hideCompleted) {
            filteredList = list.filter(item => !item.complete);
        }

        const incompleteCount = filteredList.filter(item => !item.complete).length;
        setIncomplete(incompleteCount);

        const totalPages = Math.ceil(filteredList.length / itemsToShow);
        setDisplayList(filteredList.slice((currentPage - 1) * itemsToShow, currentPage * itemsToShow));

        localStorage.setItem('todoList', JSON.stringify(list));
        localStorage.setItem('currentPage', JSON.stringify(currentPage));
        document.title = `To Do List: ${incomplete}`;
    }, [list, currentPage, itemsToShow, settings.hideCompleted]);

    return (
        <Container size="xl" style={{ padding: '2rem' }}>
            <p data-testid="todo-component">{incomplete}</p>
            <Group position="apart" align="flex-start">
                <Auth capability={'create'}>
                <Form handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      difficulty={defaultValues.difficulty} />
                </Auth>

                <TaskCard list={displayList}
                          toggleComplete={toggleComplete}
                          deleteItem={deleteItem} />
            </Group>

            <Pagination
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '100' }}
                total={Math.ceil(list.filter(item => !item.complete).length / itemsToShow)}
                page={currentPage}
                onChange={setCurrentPage}
                data-testid="pagination-component"
            />
        </Container>
    );
};

export default Todo;
