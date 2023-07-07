import { addImage } from azureBlob;

const express = require('express');
const planetscale = require('../config/planetscale');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



// Route for changing profile picture
app.post('/api/changeProfilePicture', (req, res) => {
    const username = req.body.username;
    const image = req.body.image;
  
    const picture_name = addImage(image);
    const query = `INSERT INTO profilePicture (picture_name, created_by)
                  VALUES (?, ?)
                  ON DUPLICATE KEY UPDATE picture_name = ?`;
  
    planetscale.query(query, [username, picture_name], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'error' });
      }
      return res.status(200).json({ message: 'Profile picture changed' });
    });
});
  

