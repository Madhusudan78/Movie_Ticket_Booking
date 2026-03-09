const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email already exists
  const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (existingUser) return res.status(400).json({ message: 'Email already registered.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
  res.json({ message: 'User registered successfully' });
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
