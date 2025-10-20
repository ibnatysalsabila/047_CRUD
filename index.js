const express = require('express');
let mysql = require('mysql');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biodata',
    port: 3308
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected succesfully');
})

app.get('api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    })
})