const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

console.log('\n🚀 LawLink Complete Setup Script\n');

const envPath = path.join(__dirname, '.env');
const defaultDbUrl = 'postgresql://postgres:postgres@localhost:5432/lawlink?schema=public';
const authSecret = 'pif4/sDxpJmYZS4CUqGdeAhrSZTB6icVjanVbXPrmfs=';

// Read or create .env file
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  console.log('✅ Found existing .env file');
} else {
  console.log('📝 Creating .env file...');
  envContent = '';
}

// Fix DATABASE_URL if it has placeholder or invalid format
let updated = false;
const dbUrlPattern = /DATABASE_URL\s*=\s*["']?[^"'\n\r]*["']?/gi;
const hasInvalidUrl = !envContent.includes('DATABASE_URL=') || 
    envContent.match(/DATABASE_URL.*user:password/i) ||
    envContent.match(/DATABASE_URL.*USER:PASSWORD/i) ||
    envContent.match(/DATABASE_URL.*HOST:PORT/i) ||
    envContent.match(/DATABASE_URL.*localhost:5432.*lawlink/i) === null;

if (hasInvalidUrl) {
  console.log('🔧 Fixing DATABASE_URL...');
  // Remove any existing DATABASE_URL line
  envContent = envContent.replace(dbUrlPattern, '');
  // Add correct DATABASE_URL at the beginning
  envContent = `DATABASE_URL="${defaultDbUrl}"\n${envContent}`.trim() + '\n';
  updated = true;
}

// Ensure AUTH_SECRET is set
if (!envContent.includes('AUTH_SECRET=')) {
  envContent += `\nAUTH_SECRET="${authSecret}"\n`;
  updated = true;
} else if (!envContent.match(/AUTH_SECRET=["'][^"']+["']/)) {
  envContent = envContent.replace(/AUTH_SECRET=["'][^"']*["']/g, `AUTH_SECRET="${authSecret}"`);
  updated = true;
}

// Ensure AUTH_URL is set
if (!envContent.includes('AUTH_URL=')) {
  envContent += `AUTH_URL="http://localhost:3000"\n`;
  updated = true;
}

if (updated) {
  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('✅ Updated .env file with correct values');
}

console.log('\n📦 Running database migrations...\n');
try {
  execSync('npm run db:migrate', { stdio: 'inherit' });
  console.log('\n✅ Migrations completed successfully!\n');
  
  console.log('🌱 Seeding demo account...\n');
  execSync('npm run db:seed', { stdio: 'inherit' });
  console.log('\n✅ Demo account created!\n');
  
  console.log('🚀 Starting development server...\n');
  console.log('📝 Login credentials:');
  console.log('   Email: demo@lawlink.com');
  console.log('   Password: demo123456\n');
  console.log('🌐 Server will be available at: http://localhost:3000\n');
  
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error('\n❌ Setup failed. Please check:');
  console.error('1. PostgreSQL is running');
  console.error('2. Database "lawlink" exists (run: createdb lawlink)');
  console.error('3. DATABASE_URL credentials in .env are correct');
  console.error('\nCurrent DATABASE_URL:', process.env.DATABASE_URL || 'Not set');
  process.exit(1);
}

