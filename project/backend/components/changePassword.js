const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();


  // Route for reset password
router.put('/api/changePassword/:username', (req, res) => {
    const username = req.params.username;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const checkPasswordQuery = `select password from users WHERE username = ? `;
    const updatePasswordQuery = `UPDATE users SET password = ? WHERE username = ? `;

    planetscale.query(checkPasswordQuery, [username], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred while getting password' });
      } else if (result[0].password !== currentPassword) {
        return res.status(500).json({ error: 'incorrect password' });
      }
      planetscale.query(updatePasswordQuery, [newPassword, username], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'An error occurred while resetting password' });
        }
        return res.status(200).json({ message: 'password reset successfully' });
      });
    });
});


module.exports = router;