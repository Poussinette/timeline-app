const express = require('express');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath, stat) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
})); // Serve static files from the 'public' directory

app.get('/data', (req, res) => {
  const csvFilePath = path.join(__dirname, 'Subset1021bfe424952e806cab8ed7411a4cae38.csv'); // Corrected path
  fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading CSV file');
    }

    Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const timelineData = results.data.map(row => ({
          event: row.Event,
          year: row.Year,
          date: row.Date,
          period: row.Period,
          notes: row.Notes,
          tafseer: row.Tafseer,
          quranVerse: row['Quran Verse'],
          hadith: row.Hadith
        }));
        res.json(timelineData);
      },
      error: (err) => {
        console.error(err);
        return res.status(500).send('Error parsing CSV file');
      }
    });
  });
});

app.get('/script.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
