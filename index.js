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

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;

    if (!nama || !nim || !kelas) {
        return res.status(400).json({message: "Nama, NIM, dan Kelas wajib diisi."}); 
    }

    db.query(
        "INSERT INTO users (nama, nim, kelas) VALUES (?, ?, ?)", 
    [nama, nim, kelas], 
    (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({message: "Database error"});
        }
        res.status(201).json({message: "Data berhasil ditambahkan"});
    }
    );
});

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const {nama, nim, kelas} = req.body;
    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ? WHERE id = ?',
        [nama, nim, kelas, userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.json({ message: 'Data berhasil diperbarui' });
        }
    )
})

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Data berhasil dihapus' });
    })
})