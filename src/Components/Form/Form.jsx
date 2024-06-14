import {Button, Input, Slider, Text} from "@mantine/core";

function Form(props) {
    return (
        <form onSubmit={props.handleSubmit} style={{textAlign: 'center'}}>
            <Text size="lg">Add Task</Text>

            <div style={{maxWidth: '400px', margin: '0 auto'}}>
                <Input onChange={props.handleChange} name="text" type="text" placeholder="Item Details"/>
                <Input onChange={props.handleChange} name="assignee" type="text" placeholder="Assignee Name"/>
            </div>
            <>
                <label htmlFor="difficulty">Difficulty:</label>

                <Slider onChange={props.handleChange}
                        name="difficulty"
                        min={1}
                        max={5} // Adjust max value for desired difficulty scale
                        aria-label="Task difficulty slider"
                />
            </>
            <Button type="submit">Add Item</Button>
        </form>
    );
}

export default Form;
