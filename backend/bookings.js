const express = require('express');
const router = express.Router();
const db = require('../db');

// Save a booking
router.post('/add', async (req, res) => {
  const { user_id, movie_id, showtime, seat_count, total_amount } = req.body;
  await db.run(
    'INSERT INTO bookings (user_id, movie_id, showtime, seat_count, total_amount) VALUES (?, ?, ?, ?, ?)',
    [user_id, movie_id, showtime, seat_count, total_amount]
  );
  res.json({ message: 'Booking saved!' });
});

// Get all bookings by user
router.get('/:userId', async (req, res) => {
  const bookings = await db.all(
    `SELECT b.*, m.title AS movie_title 
     FROM bookings b 
     JOIN movies m ON m.id = b.movie_id 
     WHERE b.user_id = ?`,
    [req.params.userId]
  );
  res.json(bookings);
});

module.exports = router;
