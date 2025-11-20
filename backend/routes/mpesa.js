const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

// Mock MPESA endpoints - in production replace with Daraja integration
router.post('/stkpush', requireAuth, async (req, res, next) => {
  try {
    const { phone, amount, itemId } = req.body;
    // Create a payment record
    const { rows } = await db.query('INSERT INTO payments (user_id, amount, method, status) VALUES ($1,$2,$3,$4) RETURNING *', [req.user.id, amount, 'mpesa', 'pending']);
    const payment = rows[0];
    // Simulate STK push by returning a reference; real integration would call Safaricom API
    res.json({ success: true, paymentId: payment.id, message: 'STK Push initiated (mock)' });
  } catch (err) { next(err); }
});

router.post('/callback', async (req, res, next) => {
  try {
    // MPESA callback processing - update payment status
    const { Body } = req.body;
    // For now, just acknowledge
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;
