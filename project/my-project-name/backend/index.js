const express = require('express');
const planetscale = require('./config/planetscale');
const cors = require('cors');

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route for creating the user
app.post('/api/signup', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const query = "INSERT INTO users (email, username, password_hash) VALUES (?,?,?)";

  planetscale.query(query, [email, username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Account already exists' });
    }
    return res.status(200).json({ message: 'Signup successful' });
  });
});

// Route for login
app.post('/api/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = `SELECT * FROM users WHERE email = ?`;

  planetscale.query(query, email, (err, result) => {
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Invalid email or password' });
    } else if (result[0].password_hash !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    return res.status(200).json({ message: 'Login successful' });
  });
});

// Route for deleting account
app.post('/api/delete-account', (req, res) => {
  const email = req.body.email;
  const query = `DELETE FROM users WHERE email = ?`;

  planetscale.query(query, email, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while deleting the account' });
    }
    return res.status(200).json({ message: 'Account deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
