// Importing dependencies
require('dotenv').config()

const express = require('express'); // Loads Express library to build web server
const mongoose = require('mongoose'); // Loads Mongoose library to connect and work with MongoDB database
const cors = require('cors'); // Loads CORS library (middleware) so your frontend talks to backend
const app = express(); // Server - listens for requests from clients (computers or programs) and sends back response
const PORT = process.env.PORT || 5000; // Sets the port for the server to listen on (telling server to listen for knocks/requests on "door" 5000), defaulting to 5000 if not specified
app.use(cors()); // Allows cross-origin requests so frontend can communicate with backend without security issues
app.use(express.json()); // Lets server understad JSON - can send and receive data as JSON in API requests

// Connect to MongoDB - server can store and get data from database 
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Create table headers 
// Define "model" for database - blueprint/template for what a Todo item looks like
// Each Todo item will have a task (string) and completed status (boolean)
const todoSchema = new mongoose.Schema({
  task: String,
  completed: { type: Boolean, default: false },
});

// Update data in table
// Models let you interact with a collection/table in database
// Telling Mongoose to create collection called "todos" in database and use the todoSchema to define its structure
const Todo = mongoose.model('Todo', todoSchema); // Creates a model for the Todo items in the database

app.get('/todos', async (req, res) => { // When someone sends GET request to /todos, run this function
  const todos = await Todo.find(); // Mongoose function that finds items in database collection (green variable defined above)
  res.json(todos);
});

// Create a new todo
app.post('/todos', async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json(newTodo);
});

// Update an existing todo
app.put('/todos/:id/complete', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});
 
app.patch('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Could not update todo" });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted successfully' });
});

// Starts/turns on server - app begins listening for requests on specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});