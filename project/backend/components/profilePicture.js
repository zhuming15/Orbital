const azureBlob  = require('../config/azureBlob');
const planetscale = require('../config/planetscale');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Temporary storage for the uploaded image

router.route('/api/profilePicture/:username')

  // Route for getting profile picture
  .get( (req, res) => {
    const username = req.params.username;
    const query = `SELECT picture_name FROM profilePicture WHERE created_by = ?`

    planetscale.query(query, [username], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'error getting profile picture' });
      }
      const picture_name = result[0].picture_name;
      const imageFile = azureBlob.retrieveImage(picture_name);
      // Convert the buffer to a Base64 string
      const imageBase64 = imageFile.toString('base64');
      return res.status(200).json( imageBase64 );
    });
  })

  // Route for changing profile picture
  .put(upload.single('image'), async (req, res) => {
      const username = req.params.username;
      const image = req.file;

      if (!req.file) {
        return res.status(500).json({ message: 'Image file missing.' });
    }

    const picture_name = await azureBlob.addImage(image);

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