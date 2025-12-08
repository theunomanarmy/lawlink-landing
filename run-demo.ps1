# Interactive Demo Setup Script
# This will prompt for PostgreSQL password and complete the full setup

Write-Host "`n=== LawLink Demo Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "[ERROR] .env file not found!" -ForegroundColor Red
    exit 1
}

# Get PostgreSQL credentials
Write-Host "PostgreSQL Connection Setup" -ForegroundColor Cyan
Write-Host "---------------------------" -ForegroundColor Cyan
$username = Read-Host "Username (default: postgres)"
if ([string]::IsNullOrWhiteSpace($username)) { $username = "postgres" }

$password = Read-Host "Password" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
)

$host = Read-Host "Host (default: localhost)"
if ([string]::IsNullOrWhiteSpace($host)) { $host = "localhost" }

$port = Read-Host "Port (default: 5432)"
if ([string]::IsNullOrWhiteSpace($port)) { $port = "5432" }

$database = Read-Host "Database name (default: lawlink)"
if ([string]::IsNullOrWhiteSpace($database)) { $database = "lawlink" }

# Update .env file
$newUrl = "postgresql://${username}:${passwordPlain}@${host}:${port}/${database}?schema=public"
$envContent = Get-Content .env -Raw
$newEnv = $envContent -replace 'DATABASE_URL=[^\r\n]+', "DATABASE_URL=$newUrl"
$newEnv | Out-File -FilePath .env -Encoding utf8 -NoNewline

Write-Host "`n[OK] Updated .env file" -ForegroundColor Green

# Run migrations
Write-Host "`nRunning database migrations..." -ForegroundColor Cyan
$migrateResult = npm run db:migrate 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Migrations completed!`n" -ForegroundColor Green
    
    # Seed database
    Write-Host "Creating demo account..." -ForegroundColor Cyan
    $seedResult = npm run db:seed 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Demo account created!`n" -ForegroundColor Green
        
        Write-Host "=== Setup Complete ===" -ForegroundColor Green
        Write-Host ""
        Write-Host "Demo Account:" -ForegroundColor Cyan
        Write-Host "  Email:    demo@lawlink.com" -ForegroundColor White
        Write-Host "  Password: demo123456" -ForegroundColor White
        Write-Host ""
        Write-Host "Starting development server..." -ForegroundColor Cyan
        Write-Host "Visit: http://localhost:3000/login`n" -ForegroundColor Yellow
        
        npm run dev
    } else {
        Write-Host "[ERROR] Failed to seed database" -ForegroundColor Red
        Write-Host $seedResult -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[ERROR] Migration failed" -ForegroundColor Red
    if ($migrateResult -match "Authentication failed") {
        Write-Host "Authentication failed. Please check your PostgreSQL password.`n" -ForegroundColor Yellow
    } else {
        Write-Host $migrateResult -ForegroundColor Red
    }
    exit 1
}

