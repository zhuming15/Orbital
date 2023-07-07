import { addImage } from azureBlob;

const express = require('express');
const planetscale = require('../config/planetscale');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



// Route for liking post
app.post('/api/like', (req, res) => {
    const picture_name = req.body.picture_name;
    const post_of = 'post-of-' + username;
    const query = `UPDATE ${post_of} SET like = like + 1 WHERE picture_name = ?`;
    
    planetscale.query(query, [picture_name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'error liking post' });
        }
        return res.status(200).json({ message: 'liked successfully' });
    });
});

// Route to unlike post
app.post('/api/unlike', (req, res) => {
    const picture_name = req.body.picture_name;
    const post_of = 'post-of-' + username;
    const query = `UPDATE ${post_of} SET like = like - 1 WHERE picture_name = ?`;
    
    planetscale.query(query, [picture_name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'error unliking post' });
        }
        return res.status(200).json({ message: 'unliked successfully' });
    });
});


