# LawLink Setup Guide

This guide will help you set up the authentication and database system for LawLink.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- npm or yarn package manager

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- NextAuth.js v5 (Auth.js) for authentication
- Prisma ORM for database access
- bcryptjs for password hashing
- recharts for pie charts
- Other required dependencies

## Step 2: Set Up Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Update the following variables:

```env
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/lawlink?schema=public"

# Generate a secret key for NextAuth.js
# Run: openssl rand -base64 32
AUTH_SECRET="your-generated-secret-key-here"
AUTH_URL="http://localhost:3000"

# File upload settings
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp,application/pdf"
```

## Step 3: Set Up Database

### Create PostgreSQL Database

```bash
# Using psql
createdb lawlink

# Or using SQL
psql -U postgres
CREATE DATABASE lawlink;
```

### Run Prisma Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

## Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Step 5: Create Your First Account

1. Navigate to `/register`
2. Choose "Lawyer" or "Client"
3. Fill in the registration form
4. You'll be automatically logged in and redirected to your dashboard

## Project Structure

```
src/
├── app/
│   ├── (site)/          # Public pages
│   │   ├── login/       # Login page
│   │   ├── register/    # Registration page
│   │   └── lawyers/     # Public lawyer directory
│   ├── dashboard/       # Protected dashboard pages
│   │   ├── lawyer/      # Lawyer dashboard
│   │   └── client/      # Client dashboard
│   └── api/             # API routes
│       ├── auth/        # NextAuth.js endpoints
│       ├── register/    # Registration endpoint
│       └── lawyer/      # Lawyer-specific APIs
├── components/          # React components
├── lib/                 # Utilities
│   ├── auth.ts         # NextAuth configuration
│   ├── auth-helpers.ts  # Auth utility functions
│   └── prisma.ts        # Prisma client
└── types/               # TypeScript type definitions
prisma/
└── schema.prisma        # Database schema
```

## Database Schema

The application uses the following main models:

- **User**: Base user account with email, password, and role
- **LawyerProfile**: Extended profile for lawyers
- **ClientProfile**: Extended profile for clients
- **PracticeArea**: Case distribution data for lawyers
- **Document**: Certificates and files uploaded by lawyers

## Authentication Flow

1. **Registration**: User selects role (Lawyer/Client) → Fills form → Account created → Auto-login
2. **Login**: Email/password → NextAuth validates → Session created → Redirect to dashboard
3. **Protected Routes**: Middleware checks session → Role-based access control

## Role-Based Access

- **LAWYER**: Can access `/dashboard/lawyer`, edit profile, manage case stats, upload documents
- **CLIENT**: Can access `/dashboard/client`, view public lawyer directory

## File Uploads

- Files are stored in `./public/uploads/` (development)
- For production, configure cloud storage (S3, Cloudinary, etc.)
- Update `UPLOAD_DIR` environment variable accordingly

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check `DATABASE_URL` format
- Ensure database exists

### Authentication Issues

- Verify `AUTH_SECRET` is set
- Check session cookies in browser
- Review NextAuth.js logs

### File Upload Issues

- Ensure `public/uploads/` directory exists
- Check file size limits
- Verify file type restrictions

## Next Steps

1. Set up production database
2. Configure cloud file storage
3. Set up email service for password reset
4. Add rate limiting for API routes
5. Implement password reset functionality
6. Add email verification

## Production Deployment

1. Set environment variables in your hosting platform
2. Run migrations: `npx prisma migrate deploy`
3. Build the application: `npm run build`
4. Start production server: `npm start`

For more details, see [deploy.md](./deploy.md)

