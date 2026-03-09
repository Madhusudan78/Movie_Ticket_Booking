const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all movies
router.get('/', async (req, res) => {
  const movies = await db.all('SELECT * FROM movies');
  res.json(movies);
});

// Add a new movie
router.post('/add', async (req, res) => {
  const { title, genre, language, duration, poster, description } = req.body;
  await db.run(
    'INSERT INTO movies (title, genre, language, duration, poster, description) VALUES (?, ?, ?, ?, ?, ?)',
    [title, genre, language, duration, poster, description]
  );
  res.json({ message: 'Movie added successfully' });
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  await db.run('DELETE FROM movies WHERE id = ?', [req.params.id]);
  res.json({ message: 'Movie deleted' });
});

module.exports = router;
