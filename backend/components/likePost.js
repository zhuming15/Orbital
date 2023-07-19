const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();


router.route('/api/like/:username')

    // Route for liking post
    .post( (req, res) => {
        const picture_name = req.body.picture_name;
        const username = req.params.username;
        const post_of = 'post-of-' + username;
        const query = `UPDATE ${post_of} SET like = like + 1 WHERE picture_name = ?`;
        
        planetscale.query(query, [picture_name], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'error liking post' });
            }
            return res.status(200).json({ message: 'liked successfully' });
        });
    })

    // Route to unlike post
    .delete( (req, res) => {
        const picture_name = req.body.picture_name;
        const username = req.params.username;
        const post_of = 'post-of-' + username;
        const query = `UPDATE ${post_of} SET like = like - 1 WHERE picture_name = ?`;
        
        planetscale.query(query, [picture_name], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'error unliking post' });
            }
            return res.status(200).json({ message: 'unliked successfully' });
        });
    })
;

module.exports = router;