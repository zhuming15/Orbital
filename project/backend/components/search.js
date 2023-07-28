const azureBlob  = require('../config/azureBlob');
const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();

// Route to search post
router.get('/api/search-post/:keyword', (req, res) => {
    const keyword = req.params.keyword;
  
    // Query to retrieve table names that contain the substring 'post'
    const tableNamesQuery = `SELECT table_name
                            FROM information_schema.tables
                            WHERE table_name LIKE '%post_of_%'`;
  
    // Execute the query to retrieve table names
    planetscale.query(tableNamesQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error retrieving table names:' });
        } else {
            console.log(result);
            // Construct the UNION query dynamically
            let unionQuery = '';
            result.forEach((row, index) => {
            const tableName = row.TABLE_NAME;
            const selectQuery = `SELECT * FROM ${tableName} WHERE caption LIKE '%${keyword}%'`;
            unionQuery += index === 0 ? selectQuery : ` UNION ${selectQuery}`;
            });
  
            // Execute the UNION query
            planetscale.query(unionQuery, async (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Error executing UNION query:' });
                    // Handle the error
                } else {
                    console.log(result);
                    // Loop through the result array and add the new key-value pair to each object
                    const postsWithImage = await Promise.all(result.map(async (post) => {
                        const imageFile = await azureBlob.retrieveImage(post.picture_name);
                        return post;
                    }));
                    console.log(postsWithImage);
                    return res.status(200).json(postsWithImage);
                }
            });
        }
    });
});  

// Route to search account
router.get('/api/search-user/:keyword', (req, res) => {
    const keyword = req.params.keyword;
  
    // Query to retrieve table names that contain the substring 'post'
    const tableNamesQuery = `SELECT * FROM users WHERE username LIKE '%${keyword}%'`;
  
    // Execute the query to retrieve table names
    planetscale.query(tableNamesQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error retrieving table names:' });
        }
        return res.status(200).json( result );
    });
});  

module.exports = router;