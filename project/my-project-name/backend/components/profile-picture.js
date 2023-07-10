const { addImage } = require('azureBlob');
const express = require('express');
const planetscale = require('../config/planetscale');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.route(`api/profile-picture/:username`)

  // Route for getting profile picture
  .get((req, res) => {
    const username = req.params.username;
    const query = `SELECT picture_name FROM profilePicture WHERE created_by = ?`

    planetscale.query(query, [username], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'error getting profile picture' });
      }
      return res.send(result);
    });
  })

  // Route for changing profile picture
  .put( (req, res) => {
      const username = req.params.username;
      const image = req.body.image;
    
      const picture_name = addImage(image);
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
  

