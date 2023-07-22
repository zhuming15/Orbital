const planetscale = require('../config/planetscale');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();



// Route for login
router.post('/api/login/:email/:password', (req, res) => {
  const username = req.params.username;
  const email = req.params.email;
  const password = req.params.password;
  const query = `SELECT * FROM users WHERE email = ?`;

  planetscale.query(query, [email], (err, result) => {
    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Invalid email or password' });
    } else if (result[0].password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const jwtToken = jwt.sign({ email: email, username: username }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating token' });
      }
      return token;
    });
    return res.status(200).json({ message: 'Login successful', token: jwtToken, expiresIn: 3600, authUserState: { email: email, username: username } });
  });
});

module.exports = router;