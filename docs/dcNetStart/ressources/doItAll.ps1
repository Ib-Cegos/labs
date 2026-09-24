$ADdomain = Get-ADDomain -Current LocalComputer
if ((Get-NetConnectionProfile).NetworkCategory -ne 'DomainAuthenticated') {
    Write-Host "Nettoyage du réseau local." -ForegroundColor Yellow
    Get-NetAdapter|Restart-NetAdapter
    while((Get-NetConnectionProfile).NetworkCategory -ne 'DomainAuthenticated') { Start-Sleep -Seconds 1 }
} else { Write-Host "Réseau local déjà en mode domaine." -ForegroundColor Green}
Get-ADComputer -Filter * | Where DNSHostName -NotLike "$($ENV:ComputerName)*" | ForEach-Object {
    $compName = $_.DNSHostName
    try { 
        Restart-Computer -ComputerName $compName -Force -ErrorAction Stop
        Write-Host "Redémarrage de $compName." -ForegroundColor Green }
    Catch { 
        Write-Host "Impossible de redémarrer $compName." -ForegroundColor Red
        Write-Host "  ($($_.Exception.Message))." -ForegroundColor Magenta }}