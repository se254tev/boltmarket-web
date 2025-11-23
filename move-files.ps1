# move-files.ps1
# PowerShell helper to move repo frontend/backend into `web/` and `server/` folders.

Write-Host "Starting move of frontend and backend files..."

New-Item -ItemType Directory -Force -Path web | Out-Null
New-Item -ItemType Directory -Force -Path server | Out-Null

Write-Host "Moving frontend files..."
if (Test-Path index.html) { Move-Item -Force index.html web\ }
if (Test-Path vite.config.js) { Move-Item -Force vite.config.js web\ }
if (Test-Path postcss.config.js) { Move-Item -Force postcss.config.js web\ }
if (Test-Path tailwind.config.js) { Move-Item -Force tailwind.config.js web\ }
# Do NOT move root package.json — root is monorepo manifest. web/package.json already exists.
if (Test-Path src) { Move-Item -Force src web\ }
if (Test-Path public) { Move-Item -Force public web\ }

Write-Host "Moving backend files to server/ (if backend exists)..."
if (Test-Path backend) { Move-Item -Force backend\* server\ }

Write-Host "Move complete. To finish setup, run the following commands locally to install and verify builds:"
Write-Host "npm install"
Write-Host "npm --prefix web install"
Write-Host "npm --prefix server install"
Write-Host "npm --prefix web run build"
Write-Host "npm --prefix server run dev"

Write-Host "Move complete. Please update any CI / Vercel settings if needed."
