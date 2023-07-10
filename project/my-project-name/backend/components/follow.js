const express = require('express');
const planetscale = require('../config/planetscale');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.route(`api/follow/:username1/:username2`)

  // Route for following another user
  .post( (req, res) => {
      const username1 = req.params.username;
      const username2 = req.params.username;
      
      const following = username1 + 'following';
      const followQuery = `INSERT INTO ${following} (following_username) VALUES (?)`;
    
      planetscale.query(followQuery, [username2], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error following' });
        }
      });
    
      const followers = username2 + 'followers';
      const followedQuery = `INSERT INTO ${followers} (follower_username) VALUES (?)`;
    
      planetscale.query(followedQuery, [username1], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error following' });
        }
      });
    
      return res.status(200).json({ message: 'following successful' });
  })
    
  // Route for unfollowing another user
  .delete( (req, res) => {
      const username1 = req.params.username1;
      const username2 = req.params.username2;

      const following = username1 + 'following';
      const followQuery = `DELETE FROM ${following} WHERE following_username = ?`;

      planetscale.query(followQuery, [username2], (err, result) => {
          if (err) {
              return res.status(500).json({ error: 'Error unfollowing' });
          }
      });

      const followers = username2 + 'followers';
      const followedQuery = `DELETE FROM ${followers} WHERE follower_username = ?`;

      planetscale.query(followedQuery, [username1], (err, result) => {
          if (err) {
              return res.status(500).json({ error: 'Error unfollowing' });
          }
      });

      return res.status(200).json({ message: 'unfollowing successfully' });
  })
;
  

// Route to get following numbers
app.get('/api/following:username', (req, res) => {
    const username = req.params.username;

    const following = username + 'following';
    const query = `SELECT COUNT(*) AS row_count FROM ${following}`;

    planetscale.query(query, [], (err, result) => {
        if (err) {
        return res.status(500).json({ error: 'Error getting following number' });
        }
        return res.send(result);
    });
});

  
// Route to get follower numbers
app.get('/api/follower/:username', (req, res) => {
    const username = req.params.username;
  
    const followers = username + 'followers';
    const query = `SELECT COUNT(*) AS row_count FROM ${followers}`;
    
    planetscale.query(query, [], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error getting follower number' });
      }
      return res.send(result);
    });
});
  


