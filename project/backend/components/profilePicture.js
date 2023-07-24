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

router.route('/api/profile-picture/:username')

  // Route for getting profile picture
  .get( (req, res) => {
    const username = req.params.username;
    const query = `SELECT picture_name FROM profilePicture WHERE created_by = ?`

    planetscale.query(query, [username], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'error getting profile picture' });
      } else if (!result || result.length === 0) {
        return res.status(500).json({ error: 'no picture' });
      }
      const picture_name = result[0].picture_name;
      const imageFile = await azureBlob.retrieveImage(picture_name);
      return res.status(200).json( result );
    });
  })

  // Route for changing profile picture
  .put(upload.single('image'), async (req, res) => {
      const username = req.params.username;
      const image = req.file;
      console.log(image);

      if (!req.file) {
        return res.status(500).json({ message: 'Image file missing.' });
      }

    // Read the image file and convert it to a Buffer
    const buffer = fs.readFileSync(image.path);

    const picture_name = await azureBlob.addImage(buffer);

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