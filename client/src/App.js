import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import './styles/App.css'; // Import the custom styles
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Component
const apiUrl = process.env.REACT_APP_API_URL

const App = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = (newTodo) => { // Called from TodoForm when a new todo is added
    setTodos([...todos, newTodo]); // Adds new todo to the existing list of todos at the end
  };
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${apiUrl}/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
  } catch (error) {
    console.log(error);
  }};

  const toggleCompleted = async (id,currentStatus) => {
    try {
      await axios.patch(`${apiUrl}/todos/${id}`, { completed: !currentStatus });
      setTodos(todos.map(todo => 
        todo._id === id ? { ...todo, completed: !currentStatus} : todo
      ));
    } catch (error) {
      console.log("Cannot mark complete")
    }
  }

  // useEffect runs code when the component (App in this case) loads
  useEffect(() => {
    // Fetch data from the Express server
    axios.get(`${apiUrl}/todos`)
      .then(response => setTodos(response.data)) // Sets Todos with response.data
      .catch(error => console.error(error));
  }, []); // [] means this runs once when the component mounts

  // Returns the UI on page
  return (
    <div>
      <h1>To Do List</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? "completed" : ""}>
            <FormControlLabel 
            control={
              <Checkbox
              checked={todo.completed}
              onChange={() => toggleCompleted(todo._id, todo.completed)} 
              />} 
              label={todo.task} />
            <div>
              {/* <IconButton aria-label="delete" size="small" onClick={() => deleteTodo(todo._id)}>
              <EditIcon fontSize="inherit"/>
              </IconButton> */}
              <IconButton aria-label="delete" size="small" onClick={() => deleteTodo(todo._id)}>
              <DeleteIcon fontSize="inherit"/>
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;