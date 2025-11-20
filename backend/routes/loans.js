const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

// Get user's loans
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM loans WHERE borrower_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) { next(err); }
});

// Get loan providers (hardcoded for now)
router.get('/providers', async (req, res, next) => {
  try {
    const providers = [
      {
        id: 1,
        name: 'BoltLoans',
        interest_rate: 12,
        min_amount: 5000,
        max_amount: 1000000,
        min_term_months: 6,
        max_term_months: 36,
      },
      {
        id: 2,
        name: 'FastCredit',
        interest_rate: 15,
        min_amount: 10000,
        max_amount: 500000,
        min_term_months: 3,
        max_term_months: 24,
      },
      {
        id: 3,
        name: 'QuickFunds',
        interest_rate: 18,
        min_amount: 2000,
        max_amount: 100000,
        min_term_months: 1,
        max_term_months: 12,
      },
    ];
    res.json(providers);
  } catch (err) { next(err); }
});

// Apply for loan
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
