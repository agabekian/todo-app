import { Button, Input, Title } from "@mantine/core";

function Form(props) {
    return (
        <form onSubmit={props.handleSubmit} style={{ textAlign: 'center' }}>
            <Title order={2}>Add To Do Item</Title>

            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <Input onChange={props.handleChange} name="text" type="text" placeholder="Item Details" />
                <Input onChange={props.handleChange} name="assignee" type="text" placeholder="Assignee Name" />
            </div>
            <Button type="submit">Add Item</Button>
        </form>
    );
}

export default Form;
