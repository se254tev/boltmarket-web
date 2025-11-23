const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const itemSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  price: Joi.number().required(),
  category: Joi.string().allow(null).optional(),
  image: Joi.string().allow(null).optional(),
});

// GET /api/items
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM items ORDER BY created_at DESC LIMIT 100');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM items WHERE id=$1', [id]);
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

// Create item
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { error, value } = itemSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const userId = req.user.id;
    const { rows } = await db.query(
      'INSERT INTO items (title, description, price, category, image, seller_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [value.title, value.description, value.price, value.category, value.image, userId]
    );
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
});

// Update item
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = itemSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    // Ensure owner or admin
    const { rows: current } = await db.query('SELECT * FROM items WHERE id=$1', [id]);
    if (!current[0]) return res.status(404).json({ error: 'Not found' });
    if (current[0].seller_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    const { rows } = await db.query(
      'UPDATE items SET title=$1, description=$2, price=$3, category=$4, image=$5, updated_at=NOW() WHERE id=$6 RETURNING *',
      [value.title, value.description, value.price, value.category, value.image, id]
    );
    res.json(rows[0]);
  } catch (err) { next(err); }
});

// Delete item
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows: current } = await db.query('SELECT * FROM items WHERE id=$1', [id]);
    if (!current[0]) return res.status(404).json({ error: 'Not found' });
    if (current[0].seller_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    await db.query('DELETE FROM items WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;
