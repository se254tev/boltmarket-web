require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');
const categoriesRoutes = require('./routes/categories');
const usersRoutes = require('./routes/users');
const favoritesRoutes = require('./routes/favorites');
const chatsRoutes = require('./routes/chats');
const escrowRoutes = require('./routes/escrow');
const mpesaRoutes = require('./routes/mpesa');
const loansRoutes = require('./routes/loans');
const rewardsRoutes = require('./routes/rewards');
const adminRoutes = require('./routes/admin');

const errorHandler = require('./middleware/errorHandler');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/chats', chatsRoutes);
app.use('/api/escrow', escrowRoutes);
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/loans', loansRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use('/api/admin', adminRoutes);

// Serve static frontend (production build) if available and provide SPA fallback
try {
  const staticPath = path.join(__dirname, '..', 'web', 'dist');
  if (fs.existsSync(staticPath)) {
    app.use(express.static(staticPath));
    // Important: keep this AFTER API routes so API endpoints are not overridden
    app.get('*', (req, res) => {
      res.sendFile(path.join(staticPath, 'index.html'));
    });
    console.log('Serving static frontend from', staticPath);
  }
} catch (err) {
  console.warn('Could not configure static frontend serving:', err && err.message);
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`BoltMarket backend listening on port ${PORT}`);
});
