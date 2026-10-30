# Chay thu website ma khong cai node_modules vao Google Drive.
#   - Thu vien duoc cai vao thu muc tam: %TEMP%\viin-website\node_modules
#   - Ban build duoc ghi vao:            %TEMP%\viin-website\dist
#   - Ma nguon van sua truc tiep tai day, trinh duyet tu tai lai khi luu file.
# (File de ASCII khong dau de Windows PowerShell 5.1 doc dung.)
#
# Cach dung (PowerShell, tai thu muc viin-website):
#   powershell -ExecutionPolicy Bypass -File scripts\chay-thu.ps1           # chay thu, tu tai lai
#   powershell -ExecutionPolicy Bypass -File scripts\chay-thu.ps1 -Build    # chi build ra thu muc tam

param([switch]$Build)

$ErrorActionPreference = 'Stop'
$project = Split-Path -Parent $PSScriptRoot
$temp = Join-Path $env:TEMP 'viin-website'

New-Item -ItemType Directory -Force $temp | Out-Null
Copy-Item (Join-Path $project 'package.json') $temp -Force
$lock = Join-Path $project 'package-lock.json'
if (Test-Path $lock) { Copy-Item $lock $temp -Force }

Write-Host "Cai thu vien vao $temp ..."
Push-Location $temp
try { npm install --no-audit --no-fund } finally { Pop-Location }
if ($LASTEXITCODE -ne 0) { throw 'npm install that bai' }

# Giu package-lock.json trong du an de GitHub Actions dung `npm ci`
if (-not (Test-Path $lock)) { Copy-Item (Join-Path $temp 'package-lock.json') $lock }

$env:NODE_PATH = Join-Path $temp 'node_modules'
$env:VIIN_DIST = Join-Path $temp 'dist'

if ($Build) {
  node (Join-Path $project 'scripts\build.js')
  Write-Host "Ban build nam tai $env:VIIN_DIST"
} else {
  node (Join-Path $project 'scripts\dev.js')
}
