# Quick Start Guide - Demo Lawyer Account

## Current Status
✅ All code and scripts are ready  
✅ .env file is configured correctly  
⏳ **PostgreSQL needs to be running**

## Immediate Next Steps

### 1. Start PostgreSQL

**Option A: If PostgreSQL is installed but not running**
- Start PostgreSQL service:
  - Windows: Open Services, find "PostgreSQL" and start it
  - Or run: `net start postgresql-x64-XX` (replace XX with version)

**Option B: If PostgreSQL is not installed**
- Download and install from: https://www.postgresql.org/download/windows/
- During installation, remember the password you set for the `postgres` user
- Update `.env` file with your actual password if different from `postgres`

### 2. Create the Database

Open a new terminal and run:
```bash
# If psql is in your PATH:
psql -U postgres
CREATE DATABASE lawlink;
\q

# Or if you have pgAdmin, create database through the GUI
```

**Alternative:** The migration will create the database automatically if your user has permission.

### 3. Update .env if Needed

If your PostgreSQL uses different credentials, edit `.env`:
```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/lawlink?schema=public
```

### 4. Run Setup

Once PostgreSQL is running, execute:

```bash
# Run migrations (creates database tables)
npm run db:migrate

# Seed demo account
npm run db:seed

# Start development server
npm run dev
```

### 5. Login

Navigate to: http://localhost:3000/login

**Demo Account Credentials:**
- Email: `demo@lawlink.com`
- Password: `demo123456`

You'll be automatically redirected to `/dashboard/lawyer` after login.

---

## Alternative: Use Docker (If PostgreSQL is not installed)

If you have Docker installed, you can run PostgreSQL in a container:

```bash
docker run --name lawlink-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=lawlink -p 5432:5432 -d postgres
```

Then proceed with step 4 above.

---

## Troubleshooting

**Error: "Can't reach database server"**
- Ensure PostgreSQL service is running
- Check if port 5432 is available: `netstat -an | findstr 5432`
- Verify firewall isn't blocking the connection

**Error: "database does not exist"**
- Create it manually: `CREATE DATABASE lawlink;`
- Or ensure your user has CREATE DATABASE permission

**Error: "password authentication failed"**
- Update `.env` with correct PostgreSQL password
- Default in this setup: `postgres:postgres`

