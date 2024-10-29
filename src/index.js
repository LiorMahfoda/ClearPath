// backend/index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'clearpath'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Endpoint to handle contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  const query = `INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)`;
  db.query(query, [name, email, phone, message], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to save contact');
    } else {
      res.send('Contact saved successfully');
    }
  });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
