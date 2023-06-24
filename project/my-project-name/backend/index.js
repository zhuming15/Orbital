const express = require('express');
const planetscale = require('./config/planetscale')
const cors = require('cors')

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json())


// Route for creating the user
app.post('/api/signup', (req,res)=> {

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const query = "INSERT INTO users (email, username, password_hash) VALUES (?,?,?)";

    console.log(email, username, password);

    planetscale.query(query,[email, username, password], ( err, result ) => {
        if(err) {
            console.log(err);
        } 
        console.log(result);
    });   
});

// Route for login 
app.get('/api/login/:email', (req, res) => {
    
    const email = req.params.email;
    const query = `SELECT * FROM users where email = ?`;

    planetscale.query(query, email, (err, data) => {
    //   const p = data.params.password;
    //   if (err) return res.json({ error: err.message });
    //   else if (p != password) return res.send(false);
        res.send(data);
    });
});

// Route for deleting account
app.post('/api/delete', (req,res)=> {

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const query = `DELETE FROM users WHERE email = ?`;

    console.log(email, username, password);

    planetscale.query(query, email, ( err, result ) => {
        if(err) {
            console.log(err);
        } 
        console.log(result);
    });   
});


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})