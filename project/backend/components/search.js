const { addImage } = require('../config/azureBlob');

const planetscale = require('../config/planetscale');
const express = require('express');
const router = express.Router();

// Route to search post
router.get('/api/search/:keyword', (req, res) => {
    const keyword = req.params.keyword;
  
    // Query to retrieve table names that contain the substring 'post'
    const tableNamesQuery = `SELECT table_name
                            FROM information_schema.tables
                            WHERE table_name LIKE '%post%'`;
  
    // Execute the query to retrieve table names
    planetscale.query(tableNamesQuery, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving table names:' });
        } else {
            // Construct the UNION query dynamically
            let unionQuery = '';
            result.forEach((row, index) => {
            const tableName = row.table_name;
            const selectQuery = `SELECT * FROM ${tableName} WHERE caption LIKE CONCAT( '%', ?, '%')`;
            unionQuery += index === 0 ? selectQuery : ` UNION ${selectQuery}`;
            });
  
            // Execute the UNION query
            planetscale.query(unionQuery, [keyword], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error executing UNION query:' });
                    // Handle the error
                } else {
                    // Process the result
                    return res.status(200).json({ post: result });
                }
            });
        }
    });
});  

module.exports = router;