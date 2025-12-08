# Quick Demo Setup - Set POSTGRES_PASSWORD environment variable first
# Usage: $env:POSTGRES_PASSWORD="yourpassword"; .\quick-demo.ps1

param(
    [string]$Password = $env:POSTGRES_PASSWORD,
    [string]$Username = "postgres",
    [string]$Host = "localhost",
    [string]$Port = "5432",
    [string]$Database = "lawlink"
)

if ([string]::IsNullOrWhiteSpace($Password)) {
    Write-Host "`n[ERROR] PostgreSQL password required!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Usage options:" -ForegroundColor Cyan
    Write-Host "  1. Set environment variable: `$env:POSTGRES_PASSWORD='yourpassword'; .\quick-demo.ps1" -ForegroundColor White
    Write-Host "  2. Pass as parameter: .\quick-demo.ps1 -Password 'yourpassword'" -ForegroundColor White
    Write-Host "  3. Run interactive: .\run-demo.ps1`n" -ForegroundColor White
    exit 1
}

Write-Host "`n=== LawLink Demo Setup ===" -ForegroundColor Cyan
Write-Host ""

# Update .env
$newUrl = "postgresql://${Username}:${Password}@${Host}:${Port}/${Database}?schema=public"
$envContent = Get-Content .env -Raw
$newEnv = $envContent -replace 'DATABASE_URL=[^\r\n]+', "DATABASE_URL=$newUrl"
$newEnv | Out-File -FilePath .env -Encoding utf8 -NoNewline

Write-Host "[OK] Updated .env file" -ForegroundColor Green

# Migrate
Write-Host "`nRunning migrations..." -ForegroundColor Cyan
$migrateResult = npm run db:migrate 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Migrations completed!`n" -ForegroundColor Green
    
    # Seed
    Write-Host "Creating demo account..." -ForegroundColor Cyan
    npm run db:seed 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Demo account created!`n" -ForegroundColor Green
        Write-Host "=== Ready! ===" -ForegroundColor Green
        Write-Host ""
        Write-Host "Demo Account:" -ForegroundColor Cyan
        Write-Host "  Email:    demo@lawlink.com" -ForegroundColor White
        Write-Host "  Password: demo123456" -ForegroundColor White
        Write-Host ""
        Write-Host "Starting server...`n" -ForegroundColor Cyan
        npm run dev
    } else {
        Write-Host "[ERROR] Failed to seed database" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[ERROR] Migration failed" -ForegroundColor Red
    if ($migrateResult -match "Authentication failed") {
        Write-Host "Authentication failed. Please verify your PostgreSQL password.`n" -ForegroundColor Yellow
    }
    exit 1
}

