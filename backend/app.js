// Importing modules
const express = require("express");
const cors = require("cors");
const db = require('./connection');

// Initializing an express app
const app = express();

// Server Port
const PORT = process.env.PORT || 5001;

// Formatting incoming data
app.use(cors());
app.use(express.json());


app.get('/api', (req, res) => {
    res.json({ message: "Greetings from the server side!" });
});
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});