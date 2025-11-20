const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

// Get user profile by id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT id, name, email, role, created_at FROM users WHERE id=$1', [id]);
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

// current user profile
router.get('/profile', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT id, name, email, role FROM users WHERE id=$1', [req.user.id]);
    res.json(rows[0]);
  } catch (err) { next(err); }
});

// Get current user's listings
router.get('/listings', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM items WHERE seller_id=$1 ORDER BY created_at DESC', [req.user.id]);
    res.json(rows);
  } catch (err) { next(err); }
});

module.exports = router;
