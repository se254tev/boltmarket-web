const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

// Admin only middleware
router.use(requireAuth, requireRole('admin', 'seller'));

/**
 * Get all content reports
 */
router.get('/reports', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM content_reports ORDER BY created_at DESC LIMIT 100'
    );
    res.json(rows);
  } catch (err) { next(err); }
});

/**
 * Update report status
 */
router.put('/reports/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, action } = req.body;
    const { rows } = await db.query(
      'UPDATE content_reports SET status=$1, admin_action=$2, reviewed_at=NOW() WHERE id=$3 RETURNING *',
      [status, action, id]
    );
    res.json(rows[0]);
  } catch (err) { next(err); }
});

/**
 * Get all disputes
 */
router.get('/disputes', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      'SELECT d.*, e.amount, e.item_id FROM disputes d LEFT JOIN escrow_transactions e ON d.escrow_id = e.id ORDER BY d.created_at DESC LIMIT 100'
    );
    res.json(rows);
  } catch (err) { next(err); }
});

/**
 * Resolve dispute
 */
router.put('/disputes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { resolution, status } = req.body;
    const { rows } = await db.query(
      'UPDATE disputes SET status=$1, resolution=$2, resolved_at=NOW() WHERE id=$3 RETURNING *',
      [status, resolution, id]
    );
    res.json(rows[0]);
  } catch (err) { next(err); }
});

/**
 * Get platform statistics
 */
router.get('/stats', async (req, res, next) => {
  try {
    const stats = {};
    
    // Total listings
    const listings = await db.query('SELECT COUNT(*) FROM items');
    stats.total_listings = parseInt(listings.rows[0].count);
    
    // Active users
    const users = await db.query('SELECT COUNT(*) FROM users');
    stats.active_users = parseInt(users.rows[0].count);
    
    // Total transactions
    const transactions = await db.query('SELECT COUNT(*) FROM payments');
    stats.total_transactions = parseInt(transactions.rows[0].count);
    
    // Total revenue
    const revenue = await db.query('SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status = $1', ['completed']);
    stats.total_revenue = parseFloat(revenue.rows[0].total);
    
    // Pending reports
    const reports = await db.query("SELECT COUNT(*) FROM content_reports WHERE status = 'pending'");
    stats.pending_reports = parseInt(reports.rows[0].count);
    
    // Open disputes
    const disputes = await db.query("SELECT COUNT(*) FROM disputes WHERE status = 'open'");
    stats.open_disputes = parseInt(disputes.rows[0].count);
    
    res.json([stats]);
  } catch (err) { next(err); }
});

module.exports = router;
