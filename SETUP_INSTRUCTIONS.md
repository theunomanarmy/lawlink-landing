# Demo Lawyer Account Setup Instructions

## Prerequisites
- PostgreSQL database installed and running
- Node.js and npm installed

## Step 1: Create .env File

Create a `.env` file in the project root with the following content:

```env
# Database connection string
# Replace with your actual PostgreSQL credentials
DATABASE_URL="postgresql://username:password@localhost:5432/lawlink?schema=public"

# NextAuth.js secret (already generated)
AUTH_SECRET="pif4/sDxpJmYZS4CUqGdeAhrSZTB6icVjanVbXPrmfs="
AUTH_URL="http://localhost:3000"

# File upload settings (optional)
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp,application/pdf"
```

**Important:** Replace `username`, `password`, and `localhost:5432` with your actual PostgreSQL credentials.

### Creating the Database

If you haven't created the database yet, run:

```bash
# Using psql
psql -U postgres
CREATE DATABASE lawlink;
\q
```

Or using createdb command:
```bash
createdb lawlink
```

## Step 2: Run Database Migrations

```bash
npm run db:migrate
```

This will:
- Create all database tables
- Generate the Prisma client

## Step 3: Seed Demo Account

```bash
npm run db:seed
```

This creates a demo lawyer account with:
- **Email**: `demo@lawlink.com`
- **Password**: `demo123456`
- Complete profile with sample practice areas

## Step 4: Start Development Server

```bash
npm run dev
```

## Step 5: Access Lawyer Dashboard

1. Navigate to `http://localhost:3000/login`
2. Login with:
   - Email: `demo@lawlink.com`
   - Password: `demo123456`
3. You'll be automatically redirected to `/dashboard/lawyer`

## Alternative: Manual Registration

If you prefer to register manually:
1. Go to `http://localhost:3000/register?role=lawyer`
2. Fill out the registration form
3. You'll be auto-logged in and redirected to the lawyer dashboard

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready` or check your PostgreSQL service
- Check `DATABASE_URL` format matches: `postgresql://user:password@host:port/database?schema=public`
- Ensure database exists: `psql -U postgres -l` to list databases

### Migration Issues
- If migrations fail, try: `npm run db:push` (pushes schema without migrations)
- Or reset: `npx prisma migrate reset` (⚠️ This will delete all data)

### Seed Script Issues
- If seed fails, check that migrations ran successfully
- Verify the demo account doesn't already exist (script will skip if it does)

