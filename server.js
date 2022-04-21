const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.post('/api/notes', (req, res) =>
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function(error, data) {
    if (error) {
      throw error;
    }
    let db = JSON.parse(data);
    let note = req.body;
    let id = db.length + 1
    let newNote = {
      "id": id,
      "title": note.title,
      "text": note.text
    } 
    db.push(newNote);
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(db, null, 2), function(err) {
      if (err) throw err;
  });
  })
);

// app.delete()

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

