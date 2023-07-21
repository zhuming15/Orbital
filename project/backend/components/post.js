const azureBlob  = require('../config/azureBlob');
const planetscale = require('../config/planetscale');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Temporary storage for the uploaded image

// Route for creating post
router.post('/api/post', upload.single('image'), async (req, res) => {
    const username = req.body.username;
    const caption = req.body.caption;
    const tags = req.body.tags;
    const image = req.file;

    if (!req.file) {
        return res.status(500).json({ message: 'Image file missing.' });
    }

    const picture_name = await azureBlob.addImage(image);

    const tagsJson = JSON.stringify(tags);
    
    const post_of = 'post_of_' + username;
    const query = `INSERT INTO ${post_of} (picture_name, caption, tags, likes) VALUES (?,?,?,0)`;

    const commentTable = 'post_' + picture_name;
    const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS ${commentTable} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        comment TEXT,
        created_by VARCHAR(255)
    )`;

    planetscale.query(query, [picture_name, caption, tagsJson], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating post' });
        }
        planetscale.query(createTablesQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error creating comment table' });
            }
            return res.status(200).json({ message: 'Post created' });
        });
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
router.get('/api/post', (req, res) => {
    const username = req.body.username;
    const post_of = 'post_of_' + username;
    const query = `SELECT * FROM ${post_of}`;

    planetscale.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting post' });
        }
        // Loop through the result array and add the new key-value pair to each object
        const postsWithImage = result.map( post => {
            const imageFile = azureBlob.retrieveImage(post.picture_name);
            // Convert the buffer to a Base64 string
            const imageBase64 = imageFile.toString('base64');
            // You can add any new key-value pair here
            post.file = imageBase64;
            return post;
        });

        return res.status(200).json( postsWithImage );
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