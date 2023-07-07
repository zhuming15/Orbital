const express = require('express');
const planetscale = require('../config/planetscale');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Route for getting email
app.post('/api/get-email', (req, res) => {
  const email = req.body.email;
  const query = `SELECT * FROM users WHERE email = ?`;

  planetscale.query(query, email, (err, result) => {
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Invalid Email' });
    } 
    return res.status(200).json({ message: 'Accouont Exist' });
  });
});

// Route for reset password
app.post('/api/reset-password', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = `UPDATE users SET password = '?' WHERE email = '?' `;

  planetscale.query(query, [password, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while resetting password' });
    }
    return res.status(200).json({ message: 'password reset successfully' });
  });
});




