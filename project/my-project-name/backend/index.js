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

  const post_of = 'post-of-' + email;
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS ${post_of} (
      id INT AUTO_INCREMENT PRIMARY KEY,  
      picture_URL TEXT, 
      caption TEXT,
      likes INT
    )`;

  planetscale.query(query, [email, username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Account already exists' });
    }
    planetscale.query(createTablesQuery, [], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating post table' });
      }
      return res.status(200).json({ message: 'Signup successful' });
    });
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

// Route for changing profile picture
app.post('/api/change-profilePicture', (req, res) => {
  const email = req.body.email;
  const URL = req.body.URL;
  const query = `INSERT INTO profilePicture (picture_URL, created_by)
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE picture_URL = ?`;

  planetscale.query(query, [email, URL], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'error' });
    }
    return res.status(200).json({ message: 'Profile picture changed' });
  });
});

// Route for creating post
app.post('/api/post', (req, res) => {
  const picture_URL = req.body.picture_URL;
  const caption = req.body.caption;
  const post_of = 'post-of-' + email;
  const query = `INSERT INTO ${post_of} (picture_URL, caption, likes) VALUES (?,?,0)`;

  planetscale.query(query, [picture_URL, caption], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating post' });
    }
    return res.status(200).json({ message: 'Post created' });
  });
});

// Route for creating comment table
app.post('/api/createCommentTable', (req, res) => {
  const picture_URL = req.body.picture_URL;
  const post_of = 'post-of-' + email;
  const postIdQuery = `SELECT id FROM ${post_of} WHERE picture_URL = ?`;
  
  planetscale.query(postIdQuery, [picture_URL], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error finding post' });
      }
 
    const post_id = result[0].id;
    const commentTable = 'post-' + post_id + '-of' + email;
    const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS ${commentTable} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        comment TEXT,
        created_by VARCHAR(255)
      )`;

    planetscale.query(createTablesQuery, [], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating comment table' });
      }
    });
    return res.status(200).json({ message: 'Comment table created' });
  });
});

// Route for deleting post
app.post('/api/deletePost', (req, res) => {
  const picture_URL = req.body.picture_URL;
  const post_of = 'post-of-' + email;
  const query = `DELETE FROM ${post_of} WHERE picture_URL = ?`;

  planetscale.query(query, [picture_URL], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting post' });
    }
    return res.status(200).json({ message: 'Post deleted' });
  });
});





app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
