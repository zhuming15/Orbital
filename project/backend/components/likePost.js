const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();


router.route('/api/like/:username')

    // Route for liking post
    .post( (req, res) => {
        const post_owner = req.body.post_owner;
        const picture_name = req.body.picture_name;
        const post_of = 'post_of_' + post_owner;
        const query = `UPDATE ${post_of} SET like = like + 1 WHERE picture_name = ?`;

        const post_liker = req.params.post_liker;
        const get_liker_preference_query = `SELECT preference FROM users WHERE username = ?`;

        const tags = req.body.tags;
        const update_liker_preference_query = `UPDATE users SET preference = ? WHERE username = ?`; 
        
        planetscale.query(query, [picture_name], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'error liking post' });
            }
            planetscale.query(get_liker_preference_query, [post_liker], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'error getting liker preference' });
                }
                const preference = result[0].preference;
                const json = JSON.parse(preference);
                const merge = merger(json, tags);
                const merged = JSON.stringify(merge);
                planetscale.query(update_liker_preference_query, [post_liker, merged], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'error updating liker preference' });
                    }
                    return res.status(200).json({ message: 'liked successfully' });
                });
            });
        });
    })

    // Route to unlike post
    .delete( (req, res) => {
        const picture_name = req.body.picture_name;
        const username = req.params.username;
        const post_of = 'post_of_' + username;
        const query = `UPDATE ${post_of} SET like = like - 1 WHERE picture_name = ?`;
        
        planetscale.query(query, [picture_name], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'error unliking post' });
            }
            return res.status(200).json({ message: 'unliked successfully' });
        });
    })
;


const merger = (preference, tags) => {
    for (const tag of tags) {
      if (preference.hasOwnProperty(tag)) {
        preference[tag] += 1; // Increment the value if the key already exists
      } else {
        preference[tag] = 1; // Create a new key with value 1
      }
    }
    return preference;
};

module.exports = router;