const azureBlob  = require('../config/azureBlob');
const planetscale = require('../config/planetscale');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

const upload = multer({
    dest: 'uploads/',
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB in bytes
    },
  });

// Route for creating post
router.post('/api/post/:username', upload.single('image'), async (req, res) => {
    const username = req.body.username;
    const caption = req.body.content;
    const tags = req.body.tag;
    const image = req.file;

    if (!req.file) {
        return res.status(500).json({ message: 'Image file missing.' });
    }

    // Read the image file and convert it to a Buffer
    const buffer = fs.readFileSync(image.path);

    const picture_name = await azureBlob.addImage(buffer);

    
    // Remove the temporary file from the server
    fs.unlinkSync(image.path);

    const tagsJson = JSON.stringify(tags);
    
    const post_of = 'post_of_' + username;
    const query = `INSERT INTO ${post_of} (picture_name, caption, tags, likes) VALUES (?,?,?,0)`;

    // const commentTable = 'post_' + picture_name;
    // const createTablesQuery = `
    // CREATE TABLE IF NOT EXISTS ${commentTable} (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     comment TEXT,
    //     created_by VARCHAR(255)
    // )`;

    // planetscale.query(createTablesQuery, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).json({ error: 'Error creating comment table' });
    //     }
    //     return res.status(200).json({ message: 'Post created' });
    // });

    planetscale.query(query, [picture_name, caption, tagsJson], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating post' });
        }
        return res.status(200).json({ message: 'Post created' });
    });
});

// Route for deleting post
router.delete('/api/post', (req, res) => {
    const username = req.body.username;
    const picture_name = req.body.picture_name;
    const post_of = 'post_of_' + username;
    const query = `DELETE FROM ${post_of} WHERE picture_name = ?`;

    planetscale.query(query, [picture_name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting post' });
        }
        return res.status(200).json({ message: 'Post deleted' });
    });
});

// Route to get all post of a user
router.get('/api/post/:username', (req, res) => {
    const username = req.params.username;
    const post_of = 'post_of_' + username;
    const query = `SELECT * FROM ${post_of}`;

    planetscale.query(query, async (err, result) => {
        // console.log("result");
        if (err) {
            return res.status(500).json({ error: 'Error getting post' });
        }
         // Loop through the result array and add the new key-value pair to each object
         const postsWithImage = await Promise.all(result.map(async (post) => {
            const imageFile = await azureBlob.retrieveImage(post.picture_name);
            return post;
        }));
       // console.log(postsWithImage);
        return res.status(200).json( postsWithImage );
    });
});

// Route to get single post of a user
router.get('/api/singlePost/:postID', (req, res) => {
    const postID = req.params.postID;
  
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
            const selectQuery = `SELECT * FROM ${tableName} WHERE picture_name = '${postID}'`;
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
                    return res.status(200).json(result);
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

// Route to get post number
router.get('/api/postNumber/:username', (req, res) => {
    const username = req.params.username;
    const post_of = 'post_of_' + username;
    const query = `SELECT COUNT(*) AS row_count FROM ${post_of}`;

    planetscale.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting post number' });
        }
        return res.status(200).json({ number: result[0].row_count });
    });
});

module.exports = router;