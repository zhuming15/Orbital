import { addImage } from azureBlob;

const express = require('express');
const planetscale = require('../config/planetscale');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());




// Route for commenting
app.post('/api/comment', (req, res) => {
    const username = req.body.username;
    const picture_name = req.body.picture_name;
    const comment = req.body.comment;
    const post = 'post-' + picture_name;
    const query = `INSERT INTO ${post} (comment, created_by) VALUES (?,?)`;

    planetscale.query(query, [comment, username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error commenting' });
        }
        return res.status(200).json({ message: 'commented successfully' });
    });
});


