require('dotenv').config();

const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');


// Route for login
router.post('/api/login/:email/:password', (req, res) => {
  const username = req.body.username;
  const email = req.params.email;
  const password = req.params.password;
  const query = `SELECT * FROM users WHERE email = ?`;

  planetscale.query(query, [email], (err, result) => {
    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Invalid email or password' });
    } else if (result[0].password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const user = { email: email, username: username };
    const jwtToken = jwt.sign(user, 'privatekey', { expiresIn: '1h' }, (err, token) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating token' });
        }
        return token;
    });
    return res.status(200).json({ message: 'login successful', token: jwtToken, expiresIn: 3600, authUserState: { email: email, username: username } });
  });
});

module.exports = router;