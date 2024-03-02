import 'dotenv/config';

import express, { Request, Response } from 'express';
import generateUniqueToken from './helper/generateUniqueToken';

const app = express();
const cors = require('cors');

const PORT = process.env.PORT;

app.use(express.json())
app.use(cors());

// Should see this in localhost:3000 (since root url)
// GET retrieves data FROM the server
app.get('/', (req, res) => {
  res.json("API IS RUNNING!")
});

app.post('/api/give_consent', (req, res) => {
    const username: string = req.body.username;
    const unique_token: string = generateUniqueToken(username);
    res.status(201).send(unique_token);
})

// PUT updates existing data on server ENTIRELY
app.put('/api/items/:id', (req, res) => {
  // Logic to update an item ENTIRELY
  // Access the item id with req.params.id
  res.send(`Item ${req.params.id} updated`);
});

// PATCH updates existing data on server PARTIALLY
app.patch('/api/items/:id', (req, res) => {
  // Logic to partially update an item
  res.send(`Item ${req.params.id} partially updated`);
});

// DELETE deletes data from the server
app.delete('/api/items/:id', (req, res) => {
  // Logic to delete an item
  res.send(`Item ${req.params.id} deleted`);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
