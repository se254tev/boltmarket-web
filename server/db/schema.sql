-- BoltMarket DB schema (PostgreSQL)

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT,
  category_id INT,
  image TEXT,
  seller_id INT REFERENCES users(id) ON DELETE SET NULL,
  views INT DEFAULT 0,
  favorites INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS favorites (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  item_id INT REFERENCES items(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, item_id)
);

CREATE TABLE IF NOT EXISTS conversations (
  id SERIAL PRIMARY KEY,
  buyer_id INT REFERENCES users(id),
  seller_id INT REFERENCES users(id),
  item_id INT REFERENCES items(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  conversation_id INT REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id INT REFERENCES users(id),
  text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  amount NUMERIC,
  method TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS escrow_transactions (
  id SERIAL PRIMARY KEY,
  item_id INT REFERENCES items(id),
  amount NUMERIC,
  buyer_id INT REFERENCES users(id),
  seller_id INT REFERENCES users(id),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  released_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS disputes (
  id SERIAL PRIMARY KEY,
  escrow_id INT REFERENCES escrow_transactions(id) ON DELETE CASCADE,
  reporter_id INT REFERENCES users(id),
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS loans (
  id SERIAL PRIMARY KEY,
  borrower_id INT REFERENCES users(id),
  amount NUMERIC,
  reason TEXT,
  term_months INT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_points (
  user_id INT REFERENCES users(id) PRIMARY KEY,
  points INT DEFAULT 0
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_items_seller ON items(seller_id);
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category_id);
