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

  // Closing the connection
 // planetscale.end();
});

module.exports = planetscale;
