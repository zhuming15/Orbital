const express = require('express');
const planetscale = require('../config/planetscale');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



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





