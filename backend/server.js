require('dotenv').config();
const express = require('express');
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

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`BoltMarket backend listening on port ${PORT}`);
});
