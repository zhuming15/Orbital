const express = require('express');
const planetscale = require("./config/planetscale");
const cors = require('cors');

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json());

app.route('api/user/:email/:username/:password')

  // Route for creating the user
  .post((req, res) => {
    const email = req.params.email;
    const username = req.params.username;
    const password = req.params.password;

    const query = `INSERT INTO users (username, email, password) VALUES (?,?,?)`;

    planetscale.query(query, [username, email, password], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Account already exists' });
      }
    });

    const post_of = 'post-of-' + username;
    const createPostTablesQuery = `
      CREATE TABLE IF NOT EXISTS ${post_of} (
        id INT AUTO_INCREMENT PRIMARY KEY,  
        picture_name TEXT, 
        caption TEXT,
        likes INT
      )`;

    planetscale.query(createPostTablesQuery, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating post table' });
      }
    });

    const following = username + 'following';
    const createFollowingTablesQuery = `
      CREATE TABLE IF NOT EXISTS ${following} (
        id INT AUTO_INCREMENT PRIMARY KEY,  
        following_username VARCHAR(255) UNIQUE,
      )`;

    planetscale.query(createFollowingTablesQuery, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating following table' });
      }
    });

    const followers = username + 'followers';
    const createFollowerTablesQuery = `
      CREATE TABLE IF NOT EXISTS ${followers} (
        id INT AUTO_INCREMENT PRIMARY KEY,  
        follower_username VARCHAR(255) UNIQUE,
      )`;

    planetscale.query(createFollowerTablesQuery, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating followers table' });
      }
    });

    return res.status(200).json({ message: 'Signup successful' });
  })

  // Route for deleting account
  .delete((req, res) => {
    const email = req.params.email;
    const query = `DELETE FROM users WHERE email = ?`;

    planetscale.query(query, email, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred while deleting the account' });
      }
      return res.status(200).json({ message: 'Account deleted successfully' });
    });
  })

  // Route for reset password
  .put((req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    const query = `UPDATE users SET password = '?' WHERE email = '?' `;

    planetscale.query(query, [password, email], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred while resetting password' });
      }
      return res.status(200).json({ message: 'password reset successfully' });
    });
  })
  ;


// Route to check if account exist
app.get('/api/get-email/:email', (req, res) => {
  const email = req.body.email;
  const query = `SELECT * FROM users WHERE email = ?`;

  planetscale.query(query, email, (err, result) => {
    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Invalid Email' });
    }
    return res.status(200).json({ message: 'Accouont Exist' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
