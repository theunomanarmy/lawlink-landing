# Helper script to configure .env file for local PostgreSQL

Write-Host "`nLawLink Database Configuration Helper`n" -ForegroundColor Cyan

$envFile = ".env"
if (-not (Test-Path $envFile)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lawlink?schema=public"
AUTH_SECRET="pif4/sDxpJmYZS4CUqGdeAhrSZTB6icVjanVbXPrmfs="
AUTH_URL="http://localhost:3000"
"@ | Out-File -FilePath $envFile -Encoding utf8
    Write-Host "[OK] Created .env file with default PostgreSQL settings" -ForegroundColor Green
    Write-Host "`n[!] Default credentials: postgres/postgres" -ForegroundColor Yellow
    Write-Host "If your PostgreSQL uses different credentials, please edit .env manually.`n" -ForegroundColor Yellow
} else {
    Write-Host "[OK] .env file already exists" -ForegroundColor Green
    $content = Get-Content $envFile -Raw
    
    if ($content -match 'DATABASE_URL="postgresql://user:password@') {
        Write-Host "`n[!] DATABASE_URL contains placeholder values!" -ForegroundColor Yellow
        Write-Host "Updating with default PostgreSQL settings...`n" -ForegroundColor Yellow
        
        $newContent = $content -replace 'DATABASE_URL="postgresql://user:password@localhost:5432/lawlink\?schema=public"', 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lawlink?schema=public"'
        
        if ($newContent -eq $content) {
            # Try alternative pattern
            $newContent = $content -replace 'DATABASE_URL="[^"]*"', 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lawlink?schema=public"'
        }
        
        $newContent | Out-File -FilePath $envFile -Encoding utf8 -NoNewline
        Write-Host "[OK] Updated DATABASE_URL to: postgresql://postgres:postgres@localhost:5432/lawlink" -ForegroundColor Green
        Write-Host "`n[!] If your PostgreSQL uses different credentials, please edit .env manually.`n" -ForegroundColor Yellow
    } else {
        Write-Host "[OK] DATABASE_URL appears to be configured" -ForegroundColor Green
    }
}

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Ensure PostgreSQL is running" -ForegroundColor White
Write-Host "2. Create database: createdb lawlink (or use psql)" -ForegroundColor White
Write-Host "3. If credentials differ, edit .env with your actual username/password`n" -ForegroundColor White

