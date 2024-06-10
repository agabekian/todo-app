import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { SettingsContext } from '/src/context/Settings.jsx'; // Import the SettingsContext
import Todo from '../Components/Todo/Todo.jsx'; // Adjust the import path as necessary

describe('Todo Component', () => {
  // Mock the SettingsContext value
  const settingsValue = {
    itemsToShow: 4, // Define itemsToShow value for testing
    hideCompleted: false // You can add other properties if needed
  };

  it('renders the component and matches the snapshot', () => {
    const { asFragment } = render(
        <SettingsContext.Provider value={settingsValue}> {/* Provide the mock value */}
          <Todo />
        </SettingsContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('adds a new to-do item', () => {
    render(
        <SettingsContext.Provider value={settingsValue}>
          <Todo />
        </SettingsContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Item Details/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText(/Assignee Name/i), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByText(/Add Item/i));

    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByText(/Assigned to: John Doe/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Difficulty:/i)).toHaveLength(1);
  });

  it('toggles completion status of a to-do item', () => {
    render(
        <SettingsContext.Provider value={settingsValue}>
          <Todo />
        </SettingsContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Item Details/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText(/Assignee Name/i), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByText(/Add Item/i));

    const completeDiv = screen.getByText(/Complete: false/i);
    expect(completeDiv).toBeInTheDocument();

    fireEvent.click(completeDiv);
    expect(screen.getByText(/Complete: true/i)).toBeInTheDocument();
  });
//############# DELETE ############# not implementd so not tested YET
//   it('deletes a to-do item', () => {
//     render(
//         <SettingsContext.Provider value={settingsValue}>
//           <Todo />
//         </SettingsContext.Provider>
//     );
//
//     // Add a new to-do item
//     fireEvent.change(screen.getByPlaceholderText(/Item Details/i), { target: { value: 'New Task' } });
//     fireEvent.change(screen.getByPlaceholderText(/Assignee Name/i), { target: { value: 'John Doe' } });
//     fireEvent.click(screen.getByText(/Add Item/i));
//
//     // Verify that the new to-do item is present
//     expect(screen.getByText('New Task')).toBeInTheDocument();
//
//     // Mark the to-do item as complete
//     fireEvent.click(screen.getByText(/Complete: false/i));
//     fireEvent.click(screen.getByText(/Complete: true/i));
//
//     // Debugging: Log the document body to see if the item is still present
//     console.log(document.body.innerHTML);
//
//     // Verify that the to-do item is no longer present (deleted)
//     expect(screen.queryByText('New Task')).not.toBeInTheDocument();
//   });


  it('limits the display of to-do items to 4', () => {
    render(
        <SettingsContext.Provider value={settingsValue}>
          <Todo />
        </SettingsContext.Provider>
    );

    for (let i = 1; i <= 5; i++) {
      fireEvent.change(screen.getByPlaceholderText(/Item Details/i), { target: { value: `Task ${i}` } });
      fireEvent.change(screen.getByPlaceholderText(/Assignee Name/i), { target: { value: `Person ${i}` } });
      fireEvent.click(screen.getByText(/Add Item/i));
    }

    const tasks = screen.getAllByText(/Task/i);
    expect(tasks).toHaveLength(4);
  });
});
