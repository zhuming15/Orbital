require('../dotenv').config();

const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');


// Route for login
router.post('/api/login/:username/:email/:password', (req, res) => {
  const username = req.params.username;
  const email = req.params.email;
  const password = req.params.password;
  const query = `SELECT * FROM users WHERE email = ?`;

  planetscale.query(query, [email], (err, result) => {
    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Invalid email or password' });
    } else if (result[0].data.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const user = { user: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).json({ accessToken: accessToken });
  });
});

module.exports = router;