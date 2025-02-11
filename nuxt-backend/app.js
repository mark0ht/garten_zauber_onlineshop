/* const express = require('express');
const mysql = require('mysql2'); // Use mysql2 for better async/await support
const app = express();

// MySQL Connection Setup
const db = mysql.createConnection({
  host: 'localhost',      // Database host
  user: 'root',           // Database username
  password: '', // Database password
  database: 'garten_zauber_db'  // Database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Route to fetch all users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users'; // Correct SQL Query

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }

    // Return the results as JSON
    res.status(200).json(results);
  });
});

// Route Post to register a new user
app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  const query = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)'; // Correct SQL Query

  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }

    // Return the results as JSON
    res.status(200).json({ message: 'User registered successfully' });
  });
});
// INSERT INTO `users` (`id`, `username`, `passwort`, `timestamp`) VALUES (NULL, 'hans', 'dieter', current_timestamp());


// Start the Express.js server
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); */