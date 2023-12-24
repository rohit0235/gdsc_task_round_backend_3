// index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage, replace with a database in a real-world scenario
let todos = [];

// GET ALL Todos
app.get('/todo', (req, res) => {
  res.json({ data: todos });
});

// Get One Todo using ID
app.get('/todo/:id', (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((t) => t.id === todoId);
  if (todo) {
    res.json({ data: todo });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Update Todo Item
app.put('/todo/:id', (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((t) => t.id === todoId);
  if (todo) {
    todo.title = req.body.title || todo.title;
    todo.description = req.body.description || todo.description;
    todo.completed = req.body.completed || todo.completed;
    res.json({ data: todo });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Create Todo Item
app.post('/todo', (req, res) => {
  const { title, description, completed } = req.body;
  const newTodo = {
    id: (todos.length + 1).toString(),
    title,
    description,
    completed: completed || false,
  };
  todos.push(newTodo);
  res.json({ data: newTodo });
});

// Delete Todo Item
app.delete('/todo/:id', (req, res) => {
  const todoId = req.params.id;
  todos = todos.filter((t) => t.id !== todoId);
  res.sendStatus(200);
});
// Default route for the root endpoint
app.get('/', (req, res) => {
    res.send('TODO API is running');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
