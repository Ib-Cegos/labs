# Installer Git for Windows
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git n'est pas installé : Installez Git : https://git-scm.com/download/win (et relancer terminal/vscode ensuite)"
    start-process "https://git-scm.com/download/win"
    Exit 1 }
Set-Location $PSScriptRoot
code .
if (-not (Test-Path ".\.venv")) {
    Write-Host "Premier lancement : installation de l'environnement"
    python -m venv .venv
    & ".\.venv\Scripts\Activate.ps1"
    pip install -r requirements.txt }
else { & ".\.venv\Scripts\Activate.ps1" }
python generate_prints.py
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors de la génération des documents d'impression."
    exit 1 }
Start-Job {
    do {
        Start-Sleep -Milliseconds 500
        try {
            Invoke-WebRequest -Uri "http://127.0.0.1:8000" -UseBasicParsing -TimeoutSec 1 | Out-Null
            Start-Process "http://127.0.0.1:8000"
            break }
        catch {} } while ($true) }
mkdocs serve
