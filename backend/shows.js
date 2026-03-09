const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all shows for a movie
router.get('/:movieId', async (req, res) => {
  const shows = await db.all('SELECT * FROM shows WHERE movie_id = ?', [req.params.movieId]);
  res.json(shows);
});

// Add a show
router.post('/add', async (req, res) => {
  const { movie_id, date, time, screen } = req.body;
  await db.run(
    'INSERT INTO shows (movie_id, date, time, screen) VALUES (?, ?, ?, ?)',
    [movie_id, date, time, screen]
  );
  res.json({ message: 'Show added successfully' });
});
