const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const requireAuth = (req, res, next) => {
  const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  if (req.user.role !== role && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

module.exports = { requireAuth, requireRole };
