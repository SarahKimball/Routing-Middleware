const express = require('express');
const app = express();
const items = require('./fakeDb');

app.use(express.json());

// GET /items - Get the list of shopping items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items - Add an item to the shopping list
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

// GET /items/:name - Get a single item's name and price
app.get('/items/:name', (req, res) => {
  const name = req.params.name;
  const foundItem = items.find(item => item.name === name);

  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// PATCH /items/:name - Update a single item's name and/or price
app.patch('/items/:name', (req, res) => {
  const name = req.params.name;
  const updatedItem = req.body;
  const foundIndex = items.findIndex(item => item.name === name);

  if (foundIndex !== -1) {
    items[foundIndex] = { ...items[foundIndex], ...updatedItem };
    res.json({ updated: items[foundIndex] });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE /items/:name - Delete a specific item
app.delete('/items/:name', (req, res) => {
  const name = req.params.name;
  const foundIndex = items.findIndex(item => item.name === name);

  if (foundIndex !== -1) {
    items.splice(foundIndex, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

module.exports = app;
