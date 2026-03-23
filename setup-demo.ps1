# LawLink Demo Account Setup Script
# This script helps you set up the demo lawyer account

Write-Host "`n🚀 LawLink Demo Account Setup`n" -ForegroundColor Cyan

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    Write-Host "`nPlease create a .env file with the following content:" -ForegroundColor Yellow
    Write-Host @"
DATABASE_URL="postgresql://username:password@localhost:5432/lawlink?schema=public"
AUTH_SECRET="pif4/sDxpJmYZS4CUqGdeAhrSZTB6icVjanVbXPrmfs="
AUTH_URL="http://localhost:3000"
"@ -ForegroundColor Gray
    Write-Host "`nReplace 'username' and 'password' with your PostgreSQL credentials.`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ .env file found" -ForegroundColor Green

# Check if DATABASE_URL is set (basic check)
$envContent = Get-Content .env -Raw
if ($envContent -match 'DATABASE_URL="postgresql://user:password@') {
    Write-Host "⚠️  DATABASE_URL appears to have placeholder values!" -ForegroundColor Yellow
    Write-Host "Please update .env with your actual PostgreSQL credentials.`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ DATABASE_URL configured" -ForegroundColor Green
Write-Host "`n📦 Running database migrations...`n" -ForegroundColor Cyan
npm run db:migrate

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Migrations completed successfully!" -ForegroundColor Green
    Write-Host "`n🌱 Seeding demo account...`n" -ForegroundColor Cyan
    npm run db:seed
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Demo account created successfully!" -ForegroundColor Green
        Write-Host "`n📝 Demo Account Credentials:" -ForegroundColor Cyan
        Write-Host "   Email: demo@lawlink.com" -ForegroundColor White
        Write-Host "   Password: demo123456" -ForegroundColor White
        Write-Host "`n🚀 Starting development server...`n" -ForegroundColor Cyan
        Write-Host "Once the server starts, visit: http://localhost:3000/login" -ForegroundColor Yellow
        npm run dev
    } else {
        Write-Host "`n❌ Failed to seed database. Please check the error above." -ForegroundColor Red
    }
} else {
    Write-Host "`n❌ Migrations failed. Please check your DATABASE_URL and ensure PostgreSQL is running." -ForegroundColor Red
}

