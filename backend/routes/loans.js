const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { amount, reason, term_months } = req.body;
    const { rows } = await db.query(
      'INSERT INTO loans (borrower_id, amount, reason, term_months, status) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [req.user.id, amount, reason, term_months, 'pending']
    );
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
});

// Admin approve loan
router.post('/:id/approve', requireAuth, requireRole('seller'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('UPDATE loans SET status=$1 WHERE id=$2 RETURNING *', ['approved', id]);
    res.json(rows[0]);
  } catch (err) { next(err); }
});

module.exports = router;
