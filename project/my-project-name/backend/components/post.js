import { addImage } from azureBlob;

const express = require('express');
const planetscale = require('../config/planetscale');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.route(`api/post/:username`)

    // Route for creating post
    .post( (req, res) => {
        const username = req.params.username;
        const image = req.body.image;
        const caption = req.body.caption;
    
        const picture_name = addImage(image);
        
        const post_of = 'post-of-' + username;
        const query = `INSERT INTO ${post_of} (picture_name, caption, likes) VALUES (?,?,0)`;
    
        planetscale.query(query, [picture_name, caption], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating post' });
        }
        });

        const commentTable = 'post-' + picture_name;
            const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS ${commentTable} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                comment TEXT,
                created_by VARCHAR(255)
            )`;

        planetscale.query(createTablesQuery, [], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating comment table' });
        }
        return res.status(200).json({ message: 'Post created' });
        });
    })

    // Route for deleting post
    .delete( (req, res) => {
        const username = req.params.username;
        const picture_name = req.body.picture_name;
        const post_of = 'post-of-' + username;
        const query = `DELETE FROM ${post_of} WHERE picture_name = ?`;

        planetscale.query(query, [picture_name], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error deleting post' });
            }
            return res.status(200).json({ message: 'Post deleted' });
        });
    })

    // Route to get all post of a user
    .get( (req, res) => {
        const username = req.params.username;
        const post_of = 'post-of-' + username;
        const query = `SELECT * FROM ${post_of}`;

        planetscale.query(query, [], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error getting post' });
            }
            return res.send(result);
        });
    })
;

