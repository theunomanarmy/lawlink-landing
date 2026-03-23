# LawLink Demo Setup Script
# This script will complete the setup once PostgreSQL is running

Write-Host "`n=== LawLink Demo Account Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "[ERROR] .env file not found!" -ForegroundColor Red
    Write-Host "Please ensure .env file exists with DATABASE_URL configured.`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "[OK] .env file found" -ForegroundColor Green

# Check PostgreSQL connection
Write-Host "`nChecking PostgreSQL connection..." -ForegroundColor Cyan
$migrateResult = npm run db:migrate 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Database migrations completed!`n" -ForegroundColor Green
    
    Write-Host "Seeding demo account..." -ForegroundColor Cyan
    $seedResult = npm run db:seed 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Demo account created!`n" -ForegroundColor Green
        Write-Host "=== Setup Complete ===" -ForegroundColor Green
        Write-Host ""
        Write-Host "Demo Account Credentials:" -ForegroundColor Cyan
        Write-Host "  Email:    demo@lawlink.com" -ForegroundColor White
        Write-Host "  Password: demo123456" -ForegroundColor White
        Write-Host ""
        Write-Host "Starting development server..." -ForegroundColor Cyan
        Write-Host "Once started, visit: http://localhost:3000/login`n" -ForegroundColor Yellow
        
        npm run dev
    } else {
        Write-Host "[ERROR] Failed to seed database" -ForegroundColor Red
        Write-Host $seedResult -ForegroundColor Red
        exit 1
    }
} else {
    if ($migrateResult -match "Can't reach database server") {
        Write-Host "[ERROR] Cannot connect to PostgreSQL!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please ensure:" -ForegroundColor Yellow
        Write-Host "  1. PostgreSQL is installed and running" -ForegroundColor White
        Write-Host "  2. Service is started (check Services app)" -ForegroundColor White
        Write-Host "  3. Database 'lawlink' exists (or will be created)" -ForegroundColor White
        Write-Host "  4. Credentials in .env are correct" -ForegroundColor White
        Write-Host ""
        Write-Host "See QUICK_START.md for detailed instructions.`n" -ForegroundColor Yellow
    } else {
        Write-Host "[ERROR] Migration failed:" -ForegroundColor Red
        Write-Host $migrateResult -ForegroundColor Red
    }
    exit 1
}

