require('../dotenv').config();

const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.route('/api/user')

  // Route for creating the user
  .post((req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const query = `INSERT INTO users (email, username, password, preference) VALUES (?, ?, ?, '{}')`;

    const post_of = 'post_of_' + username;
    const createPostTablesQuery = `
      CREATE TABLE IF NOT EXISTS ${post_of} (
        id INT AUTO_INCREMENT PRIMARY KEY,  
        picture_name TEXT, 
        caption TEXT,
        tags JSON,
        datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        likes INT
      )`;

    const following = username + '_following';
    const createFollowingTablesQuery = `
      CREATE TABLE IF NOT EXISTS ${following} (
        id INT AUTO_INCREMENT PRIMARY KEY,  
        following_username VARCHAR(255) UNIQUE
      )`;

    const followers = username + '_followers';
    const createFollowerTablesQuery = `
      CREATE TABLE IF NOT EXISTS ${followers} (
        id INT AUTO_INCREMENT PRIMARY KEY,  
        follower_username VARCHAR(255) UNIQUE
      )`;

    planetscale.query(query, [email, username, password], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Account already exists' });
      } else {
        planetscale.query(createPostTablesQuery, (err, result) => {
          if (err) {
            return res.status(500).json({ error: 'Error creating post table' });
          } else {
            planetscale.query(createFollowingTablesQuery, (err, result) => {
              if (err) {
                return res.status(500).json({ error: 'Error creating following table' });
              } else {
                planetscale.query(createFollowerTablesQuery, (err, result) => {
                  if (err) {
                    return res.status(500).json({ error: 'Error creating followers table' });
                  }
                  const user = { user: username };
                  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                  return res.status(200).json({ accessToken: accessToken });
                });
              }
            });
          }
        });
      }
    });
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
router.get('/api/get-email/:email', (req, res) => {
  const email = req.body.email;
  const query = `SELECT * FROM users WHERE email = ?`;

  planetscale.query(query, email, (err, result) => {
    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Invalid Email' });
    }
    return res.status(200).json({ message: 'Accouont Exist' });
  });
});



// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     console.log(err)
//     if (err) return res.sendStatus(403)
//     req.user = user
//     next()
//   })
// }


module.exports = router;