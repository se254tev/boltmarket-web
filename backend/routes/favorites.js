const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT f.item_id, i.* FROM favorites f JOIN items i ON i.id=f.item_id WHERE f.user_id=$1', [req.user.id]);
    res.json(rows.map(r => r));
  } catch (err) { next(err); }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { itemId } = req.body;
    await db.query('INSERT INTO favorites (user_id, item_id) VALUES ($1,$2) ON CONFLICT DO NOTHING', [req.user.id, itemId]);
    res.json({ success: true });
  } catch (err) { next(err); }
});

router.delete('/:itemId', requireAuth, async (req, res, next) => {
  try {
    const { itemId } = req.params;
    await db.query('DELETE FROM favorites WHERE user_id=$1 AND item_id=$2', [req.user.id, itemId]);
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;
