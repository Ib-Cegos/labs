---
title: Démarrage propre d'un atelier mono-DC
editionDate: 25/09/2026
gitVersion: a2f86bf
auteur: Renaud WANGLER
---

<div class="ibPrintNotes" data-exercise="a1e1" hidden></div>

# Démarrage propre d'un atelier mono-DC

Dans un environnement Active Directory (ADDS) ou un seul contrôleur de domaine (DC) est présent, il est fort probable que les machines virtuelles aient des problèmes d'accès aux fonctionnalités réseau.  
Ceci s'explique par la séquence de démarrage : un DC n'est pas seulement un serveur ADDS, c'est aussi en client ADDS. Lorsque le DC démarre, son client ADDS se lance alors que la partie serveur ADDS n'a pas fini de démarrer (ce ne sera pas le cas si l'environnement compte plusieurs DC du même domaine ADDS).  
## Vérification du démarrage du DC
Il est possible de constater si le DC n'a pas correctement démarré dans l'interface, comme en PowerShell.

1. Pour vérifier en PowerShell, lancer une invite *Windows PowerShell* en administrateur (en faisant, par exemple, un clic-droit sur le bouton Démarre de la barre des tâches et en choisissant **Windows Powershell (admin)** ou **Terminal (admin)**)
1. Dans l'invite PowerShell, utilisez la commande suivante :  
    ```(Get-NetConnectionProfile).NetworkCategory```  
    Si le résultat de la précédente commande est **Public** ou **Private**, le DC n'a pas correctement démarré : passez à la procédure de *nettoyage* du réseau du DC] ci-dessous. Sinon (si le résultat de la commande est **DomainAuthenticated**), le reste de cette procédure ne vous servira pas pour ce démarrage.
1. Pour vérifier en interface graphique, dans une session administrative sur votre DC, lancez le gestionnaire de serveur (**Server Manager**).
1. Cliquez sur l'onglet **Local Server**
1. Dans la section **Properties**, notez la valeur de **Microsoft Defender Firewall**  

    Si le résultat affiché est **Public: On** ou **private: On**, le DC n'a pas correctement démarré : passez à la **procédure de *nettoyage* du réseau du DC**. Sinon, le reste de cette procédure ne vous servira pas pour ce démarrage.

## Nettoyage du réseau du DC
Si le DC de votre domaine ADDS n'a pas correctement démarré, vous pouvez *forcer* le redémarrage de son client ADDS une fois que le service serveur ADDS a démarré. Si vous êtes connecté localement sur le DC, le service serveur ADDS a correctement démarré.

1. Pour redémarrer la carte réseau du DC en PowerShell, lancer une invite *Windows PowerShell* en administrateur (en faisant, par exemple, un clic-droit sur le bouton Démarre de la barre des tâches et en choisissant **Windows Powershell (admin)** ou **Terminal (admin)**)
1. Dans l'invite PowerShell, utilisez la commande suivante :  `Get-NetAdapter|restart-NetAdapter`

1. Une fois cette commande passée, votre DC devrait être *proprement* démarré (vous pouvez le vérifier par la procédure précédente).
1. Pour redémarrer la carte réseau du DC en interface graphique, lancez le gestionnaire de serveur (**Server Manager**).
1. Dans la section **Properties**, cliquez sur l'adresse IP en face du nom de votre carte réseau (*Ethernet* par défaut).
1. Dans la fenêtre *Network Connections* qui s'affiche, sélectionnez la carte réseau.
1. Cliquez ensuite sur le bouton **Disable this network device**.
1. Resélectionnez la carte réseau.
1. Cliquez ensuite sur le bouton **Enable this network device**.
1. Après ces deux actions, votre DC devrait être *proprement* démarré (vous pouvez le vérifier par la procédure précédente).

## (re)Démarrage des clients
Une fois le DC correctement démarré, il va vous falloir redémarrer toutes les autres machines virtuelles (afin qu'elles aient effectué leur démarrage dans un contexte ADDS propre et sécurisé).  
Comme pour les procédures précédentes, vous pouvez réaliser celle-ci en PowerShell :  

1. Lancez une invite *Windows PowerShell* en administrateur (en faisant, par exemple, un clic-droit sur le bouton Démarre de la barre des tâches et en choisissant **Windows Powershell (admin)** ou **Terminal (admin)**)
1. Dans l'invite PowerShell, utilisez la commande suivante :  

```
Get-ADComputer -Filter * -SearchBase (Get-ADDomain -Current LocalComputer).computersContainer |ForEach-Object { $compName = $_.DNSHostName.ToLower(); try { Restart-Computer -ComputerName $compName -Force -ErrorAction Stop; Write-Host "Redemarrage de $compName." -ForegroundColor Green } Catch { Write-Host "Impossible de redemarrer $compName." -ForegroundColor Red }}
```

1. Une fois ces commandes passées, attendez que la machine sur laquelle vous souhaitez travailler ait redémarré...
1. Pour redémarrer les machines en passant par l'interface graphique, réalisez les opérations suivantes sur **chaque** machine virtuelle :

    - Basculez sur la machine à redémarrer.
    - Ouvrez une session administrative sur la machine virtuelle
    - Faites un clic-droit sur le menu **Démarrer** et choisissez **Shutdown or sign out > Restart**

1. Il est fortement conseillé de commencer par la machine sur laquelle vous souhaitez ouvrir ensuite une session, la séquence de redémarrage des autres permettra ainsi de patienter pendant le redémarrage de la première...

## Astuces
Si vous voulez vous simplifier la vie, vous pouvez systématiser l'utilisation de la procédure suivante :  

1. Ouvrir une session sur le DC avec le compte administrateur du domaine ADDS.
1. Lancez une invite Windows PowerShell (5.x en administrateur).
1. Utilisez les quelques lignes de script suivantes pour réaliser l'ensemble des opérations proposées dans les procédures précédentes en une fois :  

    ```
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
    ```

1. Si vous le préférez, vous pouvez utiliser la commande suivante qui appelle un script contenant toutes les lignes présentées ci-dessus :  

```powershell
iex ([Text.Encoding]::UTF8.GetString((Invoke-WebRequest '[resourcesUrl]/doItAll.ps1' -UseBasicParsing).Content))
```