import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const apiUrl = process.env.REACT_APP_API_URL

const TodoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');
  
  const addTodo = async () => {
    if (task.trim() === '') return; 
    try {
      const response = await axios.post(`${apiUrl}/todos`, { task });
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