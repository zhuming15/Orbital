const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();



// Route for login
router.post('/api/login/:email/:password', (req, res) => {
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

module.exports = router;