const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();


// Route for commenting
router.post('/api/comment', (req, res) => {
    const username = req.body.username;
    const picture_name = req.body.picture_name;
    const comment = req.body.comment;
    const post = 'post_' + picture_name;
    const query = `INSERT INTO ${post} (comment, created_by) VALUES (?,?)`;

    planetscale.query(query, [comment, username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error commenting' });
        }
        return res.status(200).json({ message: 'commented successfully' });
    });
});

module.exports = router;