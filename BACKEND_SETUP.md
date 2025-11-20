# Backend Setup Guide

## Prerequisites

- Node.js 16+ and npm installed
- PostgreSQL 12+ installed and running
- Git installed

## Step 1: Environment Configuration

1. Copy the environment template:
```bash
cp .env.sample .env
```

2. Edit `.env` with your values:
```
# Database - Create database first:
# psql -U postgres -c "CREATE DATABASE boltmarket;"
DATABASE_URL=postgresql://postgres:password@localhost:5432/boltmarket

# Generate JWT secret:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_generated_secret_here

# M-Pesa (optional - can use mock values for testing)
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
```

## Step 2: Install Dependencies

```bash
cd backend
npm install
```

## Step 3: Create Database

1. Start PostgreSQL:
```bash
# macOS/Linux
psql

# Windows
psql -U postgres
```

2. In psql shell:
```sql
CREATE DATABASE boltmarket;
\connect boltmarket
```

3. Execute schema:
```bash
psql -U postgres -d boltmarket -f backend/db/schema.sql
```

Or paste `backend/db/schema.sql` content into psql shell.

## Step 4: Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
BoltMarket backend listening on port 5000
```

## Step 5: Verify Backend is Running

Test the server with curl:
```bash
# Health check
curl http://localhost:5000/api/categories

# Should return empty array: []
```

## Frontend Configuration

1. Create `.env` in root directory (if not exists):
```bash
cp .env.sample .env
```

2. Set API URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start frontend:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify JWT token

### Items (Marketplace)
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item details
- `POST /api/items` - Create item (auth required)
- `PUT /api/items/:id` - Update item (seller only)
- `DELETE /api/items/:id` - Delete item (seller only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id/items` - Get items by category

### Users
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/:id` - Get user profile by ID
- `GET /api/users/me/listings` - Get my listings

### Favorites
- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites/:itemId` - Add to favorites
- `DELETE /api/favorites/:itemId` - Remove from favorites

### Chats
- `GET /api/chats` - Get user's conversations
- `GET /api/chats/:conversationId/messages` - Get messages
- `POST /api/chats/:conversationId/messages` - Send message

### Escrow
- `POST /api/escrow` - Create escrow transaction
- `POST /api/escrow/:id/release` - Release funds to seller
- `POST /api/escrow/:id/dispute` - Raise dispute

### M-Pesa
- `POST /api/mpesa/stkpush` - Initiate STK push
- `POST /api/mpesa/callback` - Payment callback

### Loans
- `GET /api/loans` - Get user's loans
- `POST /api/loans` - Apply for loan
- `GET /api/loans/providers` - Get loan providers
- `POST /api/loans/:id/approve` - Approve loan (admin)

### Admin
- `GET /api/admin/reports` - Get content reports
- `PUT /api/admin/reports/:id` - Update report status
- `GET /api/admin/disputes` - Get all disputes
- `PUT /api/admin/disputes/:id` - Resolve dispute
- `GET /api/admin/stats` - Get platform statistics

## Database Schema

The following tables are created:

- **users** - User accounts (email, password hash, role)
- **items** - Marketplace listings
- **categories** - Item categories
- **favorites** - User's favorite items
- **conversations** - Chat conversations between users
- **messages** - Chat messages
- **payments** - Payment transactions
- **escrow_transactions** - Escrow holds for transactions
- **disputes** - Dispute records
- **loans** - Soft loan applications
- **user_points** - User reward points

## Testing the System

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create an Item
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "iPhone 13",
    "description": "Mint condition",
    "price": 50000,
    "category": "Electronics",
    "image": "https://example.com/image.jpg"
  }'
```

## Troubleshooting

### Port Already in Use
```bash
# macOS/Linux - Find and kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database exists: `psql -l | grep boltmarket`

### JWT Token Expired
- Tokens expire after 24 hours
- Login again to get new token
- Check JWT_SECRET is set in .env

### CORS Errors
- Ensure REACT_APP_API_URL matches backend origin
- Frontend must be on different port than backend

## Production Deployment

Before deploying:

1. Set strong JWT_SECRET (32+ random characters)
2. Change NODE_ENV to `production`
3. Use environment-specific database URL
4. Enable HTTPS
5. Configure CORS for your domain
6. Set up SSL/TLS certificates
7. Use database backup strategy
8. Enable logging and monitoring

## Support

For issues or questions:
1. Check error logs: `backend.log`
2. Verify .env configuration
3. Test endpoints with curl/Postman
4. Check database with pgAdmin
