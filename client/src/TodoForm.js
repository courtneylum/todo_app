import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const TodoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');
  
  const addTodo = async () => {
    if (task.trim() === '') return; 
    try {
      const response = await axios.post('http://localhost:5000/todos', { task });
      onAdd(response.data);
      setTask('');
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <Button variant="contained" onClick={addTodo}>Add Todo</Button>
    </div>
  );
};
export default TodoForm;