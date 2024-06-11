import {Title} from "@mantine/core";

const Header = (props) => {
    return (
        <header>
            <Title order={1} align="center">To Do List: {props.openItems} items pending</Title>
        </header>
    )
}


export default Header;