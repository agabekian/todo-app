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
    const [hideCompleted, setHideCompleted] = useState(settings.hideCompleted);

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
        const filteredList = hideCompleted ? list.filter(item => !item.complete) : list;
        const totalPages = Math.ceil(filteredList.length / itemsToShow);
        setDisplayList(filteredList.slice((currentPage - 1) * itemsToShow, currentPage * itemsToShow));

        setIncomplete(filteredList.filter(item => !item.complete).length);

        localStorage.setItem('todoList', JSON.stringify(list));
        localStorage.setItem('currentPage', JSON.stringify(currentPage));
        document.title = `To Do List: ${incomplete}`;
    }, [list, currentPage, itemsToShow, hideCompleted]);

    useEffect(() => {
        setHideCompleted(settings.hideCompleted);
    }, [settings.hideCompleted]);

    useEffect(() => {
        // Filter the list based on hideCompleted setting
        const filteredList = hideCompleted ? list.filter(item => !item.complete) : list;

        // Calculate incomplete count
        const incompleteCount = filteredList.filter(item => !item.complete).length;
        setIncomplete(incompleteCount);

        // Calculate total pages
        const totalPages = Math.ceil(filteredList.length / itemsToShow);

        // Update displayList with proper pagination
        const startIndex = (currentPage - 1) * itemsToShow;
        const endIndex = Math.min(startIndex + itemsToShow, filteredList.length);
        const displayItems = filteredList.slice(startIndex, endIndex);
        setDisplayList(displayItems);

        // Update localStorage and document title
        localStorage.setItem('todoList', JSON.stringify(list));
        localStorage.setItem('currentPage', JSON.stringify(currentPage));
        document.title = `To Do List: ${incomplete}`;
    }, [list, currentPage, itemsToShow, hideCompleted]);



    function handlePageChange(page) {
        setCurrentPage(page);
    }

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
                total={Math.ceil(incomplete / itemsToShow)}
                page={currentPage}
                onChange={handlePageChange}
                data-testid="pagination-component"
            />
        </Container>
    );
};

export default Todo;
