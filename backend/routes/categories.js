const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM categories ORDER BY name');
    res.json(rows);
  } catch (err) { next(err); }
});

router.get('/:id/items', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM items WHERE category_id=$1', [id]);
    res.json(rows);
  } catch (err) { next(err); }
});

module.exports = router;
