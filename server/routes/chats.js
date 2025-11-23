const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

// Simple polling-style chat endpoints
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM conversations WHERE user_id=$1 OR seller_id=$1', [req.user.id]);
    res.json(rows);
  } catch (err) { next(err); }
});

router.get('/:conversationId/messages', requireAuth, async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { rows } = await db.query('SELECT * FROM messages WHERE conversation_id=$1 ORDER BY created_at ASC', [conversationId]);
    res.json(rows);
  } catch (err) { next(err); }
});

router.post('/:conversationId/messages', requireAuth, async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { text } = req.body;
    const { rows } = await db.query(
      'INSERT INTO messages (conversation_id, sender_id, text) VALUES ($1,$2,$3) RETURNING *',
      [conversationId, req.user.id, text]
    );
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
});

module.exports = router;
