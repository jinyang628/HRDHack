import 'dotenv/config';

import { giveConsentSchema } from './schema/giveConsent';
import express, { Request, Response } from 'express';
import generateUniqueToken from './helper/generateUniqueToken';

const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT;

app.use(express.json())
app.use(cors());

// Should see this in localhost:3000 (since root url)
// GET retrieves data FROM the server
app.get('/', (req, res) => {
  res.json("API IS RUNNING!")
});

let sentQuestionsIndices = new Set();

app.get('/api/generate_question', (req, res) => {
  const questionsPath = path.join(__dirname, 'questions.json');

  fs.readFile(questionsPath, 'utf8', (err: any, data: string) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while retrieving the questions.');
    }

    // Parse the JSON data
    const questions = JSON.parse(data).questions;
    // Get an array of indices that haven't been sent yet
    const unsentIndices = questions.map((_: any, index: any) => index).filter((index: unknown) => !sentQuestionsIndices.has(index));

    // If all questions have been sent, reset the set
    if (unsentIndices.length === 0) {
      sentQuestionsIndices = new Set();
      unsentIndices.push(...questions.map((_: any, index: any) => index));
    }

    // Select a random question index from the unsent indices
    const questionIndex = unsentIndices[Math.floor(Math.random() * unsentIndices.length)];
    // Add the index to the set of sent questions
    sentQuestionsIndices.add(questionIndex);
    // Send the selected question
    res.json({ question: questions[questionIndex] });
  });
});

let unique_token: string = "";

app.post('/api/give_consent', (req, res) => {
    try {
        const parsedBody = giveConsentSchema.parse(req.body);
        unique_token = generateUniqueToken(parsedBody.username);
        // This token must be used with ALL APIs so that we know where to store the information for that specific person in the database (JSON file for our hackathon)
        res.status(201).send(parsedBody.username);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
})

app.get('/api/get_unique_token/', (req, res) => {
  res.status(200).send(unique_token);
});

app.get('/api/get_discussion/:id', (req, res) => {
  // Define the path to the JSON file
  const filePath = path.join(__dirname, 'groups', `${req.params.id}.json`);

  // Read the file asynchronously
  fs.readFile(filePath, 'utf8', (err: any, data: string) => {
      if (err) {
          // Send a server error response if there's an issue reading the file
          res.status(500).send('Error reading data');
      } else {
          // Parse the JSON data and send it as a response
          try {
              const jsonData = JSON.parse(data);
              res.json(jsonData);
          } catch (parseErr) {
              // Handle JSON parsing error
              res.status(500).send('Error parsing data');
          }
      }
  });
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
