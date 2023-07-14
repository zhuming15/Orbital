const { addImage, retrieveImage } = require('../config/azureBlob');


const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();

router.route('/api/profilePicture/:username')

  // Route for getting profile picture
  .get((req, res) => {
    const username = req.params.username;
    const query = `SELECT picture_name FROM profilePicture WHERE created_by = ?`

    planetscale.query(query, [username], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'error getting profile picture' });
      }
      const picture_name = result[0].data.picture_name;
      const image = retrieveImage(picture_name);
      return res.status(200).json({ image: image });
    });
  })

  // Route for changing profile picture
  .put( async (req, res) => {
      const username = req.params.username;
      const image = req.body.image;
    
      const picture_name = await addImage(image);
      const query = `INSERT INTO profilePicture (picture_name, created_by)
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE picture_name = ?`;
    
      planetscale.query(query, [picture_name, username, picture_name], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'error updating profile picture' });
        }
        return res.status(200).json({ message: 'Profile picture changed' });
      });
  })
;
  
module.exports = router;