const express = require('express');
const planetscale = require('../config/planetscale');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



// Route for login
app.post('/api/login/:email/:password', (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const query = `SELECT * FROM users WHERE email = ?`;

  planetscale.query(query, [email], (err, result) => {
    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Invalid email or password' });
    } else if (result[0].password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    return res.status(200).json({ message: 'Login successful' });
  });
});