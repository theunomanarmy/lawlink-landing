# Helper to update PostgreSQL credentials in .env

Write-Host "`n=== Update PostgreSQL Credentials ===" -ForegroundColor Cyan
Write-Host ""

$currentEnv = Get-Content .env -Raw

# Extract current DATABASE_URL
if ($currentEnv -match 'DATABASE_URL=(.+)') {
    $currentUrl = $matches[1].Trim()
    Write-Host "Current DATABASE_URL: $currentUrl" -ForegroundColor Yellow
}

Write-Host "`nPlease enter your PostgreSQL credentials:" -ForegroundColor Cyan
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

$newUrl = "postgresql://${username}:${passwordPlain}@${host}:${port}/${database}?schema=public"

# Update .env file
$newEnv = $currentEnv -replace 'DATABASE_URL=[^\r\n]+', "DATABASE_URL=$newUrl"
$newEnv | Out-File -FilePath .env -Encoding utf8 -NoNewline

Write-Host "`n[OK] Updated .env file" -ForegroundColor Green
Write-Host "Testing connection..." -ForegroundColor Cyan

# Test connection
$testResult = npm run db:migrate 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Connection successful!`n" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Connection failed. Please verify your credentials.`n" -ForegroundColor Red
}

