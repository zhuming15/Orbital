require('../dotenv').config();

const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.route('/api/bio/:username')

  // Route for getting user bio
  .get((req, res) => {
    const username = req.params.username;
    const query = `SELECT bio FROM users WHERE username = ?`;

    planetscale.query(query, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while getting user bio' });
        } else if (result[0].bio === null) {
            return res.status(401).json({ error: 'no bio' });
        }
        return res.status(200).json({ result });
    });
  })

  // Route for reset password
  .put((req, res) => {
    const username = req.params.username;
    const bio = req.body.bio;
    const query = `UPDATE users SET bio = ? WHERE username = ? `;

    planetscale.query(query, [bio, username], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred while updating bio' });
      }
      return res.status(200).json({ message: 'bio updated successfully' });
    });
  })
;

module.exports = router;