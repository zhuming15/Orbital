const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();

const axios = require('axios');


router.route('/api/follow/:username1/:username2')

  // Route for following another user
  .post( (req, res) => {
      const username1 = req.params.username1;
      const username2 = req.params.username2;
      
      const following = username1 + '_following';
      const followQuery = `INSERT INTO ${following} (following_username) VALUES (?)`;

      const followers = username2 + '_followers';
      const followedQuery = `INSERT INTO ${followers} (follower_username) VALUES (?)`;
    
      planetscale.query(followQuery, [username2], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error following' });
        } else {
          planetscale.query(followedQuery, [username1], (err, result) => {
            if (err) {
              return res.status(500).json({ error: 'Error following' });
            } else {
              return res.status(200).json({ message: 'following successful' });
            }
          });
        }
      });
  })
    
  // Route for unfollowing another user
  .delete( (req, res) => {
      const username1 = req.params.username1;
      const username2 = req.params.username2;

      const following = username1 + '_following';
      const followQuery = `DELETE FROM ${following} WHERE following_username = ?`;
      
      const followers = username2 + '_followers';
      const followedQuery = `DELETE FROM ${followers} WHERE follower_username = ?`;

      planetscale.query(followQuery, [username2], (err, result) => {
          if (err) {
              return res.status(500).json({ error: 'Error unfollowing' });
          }
          planetscale.query(followedQuery, [username1], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error unfollowing' });
            }
            return res.status(200).json({ message: 'unfollowing successfully' });
        });
      });
  })
;
  

// Route to get following numbers
router.get('/api/following/:username', (req, res) => {
    const username = req.params.username;

    const following = username + '_following';
    const query = `SELECT COUNT(*) AS row_count FROM ${following}`;

    planetscale.query(query, [], (err, result) => {
        if (err) {
        return res.status(500).json({ error: 'Error getting following number' });
        }
        return res.status(200).json({ number: result[0].row_count });
    });
});

  
// Route to get follower numbers
router.get('/api/follower/:username', (req, res) => {
    const username = req.params.username;
  
    const followers = username + '_followers';
    const query = `SELECT COUNT(*) AS row_count FROM ${followers}`;
    
    planetscale.query(query, [], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error getting follower number" });
      }
      return res.status(200).json({ number: result[0].row_count });
    });
});
  
module.exports = router;

// async function main() {
//   const username1 = "test";
//   const username2 = "tes";
//   await axios.delete(`http://localhost:3002/api/follow/${username1}/${username2}`)
//   .then(res => {
//     console.log(res.data.message);
//     console.log("SignUp OK");
//     //navigate("/");
//   }).catch(err => {
//     console.log(err.response.data.error);
//     console.log("SignUp NOT OK");
//     //setError(true);
//   });
// };

// main();
