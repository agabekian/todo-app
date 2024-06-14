import {Button, Paper, Slider, TextInput} from "@mantine/core";
import classes from '/src/Components/auth/AuthenticationTitle.module.css';

function Form(props) {
    return (
        <form onSubmit={props.handleSubmit} style={{textAlign: 'center'}}>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput onChange={props.handleChange}
                           label="Task"
                           name="text"
                           type="text"
                           placeholder="Item Details"
                />
                <TextInput onChange={props.handleChange}
                           label="Who"
                           name="assignee"
                           type="text"
                           placeholder="Assignee Name"/>


                <label htmlFor="difficulty"><h5>Difficulty:</h5></label>
                <Slider onChange={props.handleChange}
                        name="difficulty"
                        min={1}
                        max={5}
                        aria-label="Task difficulty slider"
                />
                <Button type="submit" fullWidth mt="xl">
                    Add Task
                </Button>
            </Paper>
        </form>
    );
}

export default Form;
