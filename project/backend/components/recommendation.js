const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();


// Route to get recommended post
router.get('/api/recommendation/:username', (req, res) => {
    const username = req.params.username;

    const userPreferenceQuery = `SELECT preference FROM users WHERE username = ?`;

    const getPostsQuery = `SELECT picture_name, tags FROM post_of_%`;

    planetscale.query(userPreferenceQuery, [username], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error getting user preference" });
      }
      planetscale.query(getPostsQuery, (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Error getting posts" });
        }
        const rankedPosts = rankPosts(results, result);
        return res.status(200).json({ rankedPosts });
      });
    });
});
  
module.exports = router;


function rankPosts(post, userPreference) {
    // Parse JSON data into JavaScript objects
    const posts = JSON.parse(post);
    const userPreferences = JSON.parse(userPreference);
    
    const rankedPosts = [];
  
    for (const post of posts) {
      const postId = post.id;
      const postFeatures = JSON.parse(post.feature);
  
      let rankValue = 0;
      for (const feature in userPreferences) {
        if (userPreferences.hasOwnProperty(feature) && postFeatures.includes(feature)) {
          rankValue += userPreferences[feature];
        }
      }
  
      rankedPosts.push({ postId, rankValue });
    }
  
    rankedPosts.sort((a, b) => b.rankValue - a.rankValue);
    return rankedPosts;
}