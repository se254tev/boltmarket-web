const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

// Get user points and badges
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM user_points WHERE user_id=$1', [req.user.id]);
    res.json(rows[0] || { points: 0 });
  } catch (err) { next(err); }
});

module.exports = router;
