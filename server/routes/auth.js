const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user','seller','admin').default('user'),
});

router.post('/register', async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const hashed = await bcrypt.hash(value.password, 10);
    const result = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role',
      [value.name, value.email, hashed, value.role]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await db.query('SELECT id, name, email, password, role FROM users WHERE email=$1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    next(err);
  }
});

router.get('/verify', async (req, res) => {
  try {
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = jwt.verify(token, JWT_SECRET);
    const { rows } = await db.query('SELECT id, name, email, role FROM users WHERE id=$1', [payload.id]);
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
