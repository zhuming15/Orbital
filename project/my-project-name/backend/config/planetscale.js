const mysql = require('mysql2');

// Creating a connection
const planetscale = mysql.createConnection({
  host: 'aws.connect.psdb.cloud',
  user: 'lh8dzd33eoy0mrlf5jx3',
  password: 'pscale_pw_zhDbFsY97GESqb678oAtusj0URcj1Ne621LNXaZTjSI',
  database: 'orbital',
  ssl: { rejectUnauthorized: true },
  multipleStatements: true,
});

// Connecting to the database
planetscale.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database!');

  // Perform database operations
  const createTablesQuery = `
    -- Create User table
    CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(255) UNIQUE PRIMARY KEY,
      email VARCHAR(255) UNIQUE,
      password TEXT
    );

    CREATE TABLE IF NOT EXISTS profilePicture (
      -- Create Profile picture
      created_by VARCHAR(255) UNIQUE PRIMARY KEY,  
      picture_name Text, 
      KEY users_username_idx (created_by)
     );
  `;

  planetscale.query(createTablesQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    console.log('Query executed successfully:', createTablesQuery);
  });
});

module.exports = planetscale;