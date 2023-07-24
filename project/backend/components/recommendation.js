const planetscale = require('../config/planetscale');
const azureBlob  = require('../config/azureBlob');
const express = require('express');
const router = express.Router();


// Route to get recommended post
router.get('/api/recommendation/:username', (req, res) => {
    const username = req.params.username;

    const userPreferenceQuery = `SELECT preference FROM users WHERE username = ?`;

    // Query to retrieve table names that contain the substring 'post'
    const tableNamesQuery = `SELECT table_name
                             FROM information_schema.tables
                             WHERE table_name LIKE '%post_of_%'`;

    planetscale.query(userPreferenceQuery, [username], (err, resp) => {
      if (err) {
        return res.status(500).json({ error: "Error getting user preference" });
      }
      // console.log(resp);
      // Execute the query to retrieve table names
      planetscale.query(tableNamesQuery, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving table names:' });
        } else {
            // Construct the UNION query dynamically
            let unionQuery = '';
            result.forEach((row, index) => {
            const tableName = row.TABLE_NAME;
            const selectQuery = `SELECT * FROM ${tableName}`;
            unionQuery += index === 0 ? selectQuery : ` UNION ${selectQuery}`;
            });

            // Execute the UNION query
            planetscale.query(unionQuery, async (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error executing UNION query:' });
                    // Handle the error
                } else {
                    // console.log(result);
                    const rankedPosts = rankPosts(result, resp);
                    // Loop through the result array and add the new key-value pair to each object
                    const postsWithImage = await Promise.all(rankedPosts.map(async (post) => {
                        const imageFile = await azureBlob.retrieveImage(post.picture_name);
                        return post;
                    }));
                    // console.log(postsWithImage);
                    return res.status(200).json(postsWithImage);
                }
            });
        }
      });
    });
});
  
module.exports = router;


function rankPosts(posts, userPreferences) {
    const rankedPosts = [];
  
    for (const post of posts) {
      const picture_name = post.picture_name;
      const caption = post.caption;
      const tags = post.tags;
      const datetime = post.datetime;
      const likes = post.likes;
  
      let rankValue = 0;
      for (const feature in userPreferences) {
        if (userPreferences.hasOwnProperty(feature) && post.tags.includes(feature)) {
          rankValue += userPreferences[feature];
        }
      }
  
      rankedPosts.push({ picture_name, caption, tags, datetime, likes, rankValue });
    }
  
    rankedPosts.sort((a, b) => b.rankValue - a.rankValue);
    // console.log(rankedPosts);
    return rankedPosts;
}