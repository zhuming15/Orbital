import { addImage } from azureBlob;

const express = require('express');
const planetscale = require('../config/planetscale');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// Route to search post
app.post('/api/search', (req, res) => {
    const keyword = req.body.keyword;
    const query = `SELECT * FROM ${post_of} WHERE comment LIKE CONCAT( '%', ?, '%')`;

    planetscale.query(query, [keyword], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting post' });
        }
        return res.send(result);
    });
});