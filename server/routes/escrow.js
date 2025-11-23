const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

// Create escrow transaction
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { itemId, amount, buyerId, sellerId } = req.body;
    const { rows } = await db.query(
      'INSERT INTO escrow_transactions (item_id, amount, buyer_id, seller_id, status) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [itemId, amount, buyerId, sellerId, 'pending']
    );
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
});

// Release escrow
router.post('/:id/release', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: check permissions, funds, etc.
    const { rows } = await db.query('UPDATE escrow_transactions SET status=$1, released_at=NOW() WHERE id=$2 RETURNING *', ['released', id]);
    res.json(rows[0]);
  } catch (err) { next(err); }
});

// Dispute escrow
router.post('/:id/dispute', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const { rows } = await db.query('INSERT INTO disputes (escrow_id, reporter_id, reason) VALUES ($1,$2,$3) RETURNING *', [id, req.user.id, reason]);
    await db.query('UPDATE escrow_transactions SET status=$1 WHERE id=$2', ['disputed', id]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
});

module.exports = router;
