---
layout: stage
title: "Lab3-Ex1 - Préparation de la synchronisation d'identités"
length: "00"
date: "10/01/2025"
script: "ms365.js"
---
# Scénario
Comme dans les précédents exercices, vous allez vous glisser dans la peau de Dominique Skyetson, administratrice de ib Cegos Workshop. Dans cet atelier, vous réaliserez les tâches nécessaires pour gérer l'hybridation de la gestion d'identités du projet pilote entre l'Active Directory existant et l'Entra ID utilisé par l'environnement Microsoft 365.  
Pendant cet premier atelier, vous allez préparer l'ADDS pour la mise en oeuvre de Entra Connect qui sera un jalon important pour ICW dans sa décision de déplacer ses données et applications vers le cloud 365.

## Tâche 1 - Modification des UPN
Dans *Active Directory Domain Service* (ADDS), le suffixe UPN par défaut est le nom DNS du domaine dans lequel le compte utilisateur a été créé. L'assistant d'installation Entra Connect utilise l'attribut *UserPrincipalName* (bien qu'il soit possible d'en sélectionner un autre) comme nom de connexion utilisateur pour Entra Id.  
L'environnement de test du pilote de ib Cegos Workshop que vous utilisez a été créé par votre hébergeur d'ateliers et le nom de domaine de l'ADDS choisi est **adatum.com**. Les utilisateurs ADDS ont donc été créés dans ce domaine qui ne sera pourtant pas celui utilisé pour l'environnement Entra Id de ICW (le nom DNS d'entreprise sera utilisé à la place).  
Dans cette tâche, vous allez vous faciliter la vie en utilisant Windows Powershell pour changer le suffixe UPN de votre environnement ADDS et l'UPN de tous les utilisateurs *on-premises*.  
1. Cette manipulation se réalise depuis la machine virtuelle **LON-DC1**.
1. Si vous l'aviez fermée, ouvrez l'outil **Windows PowerShell ISE** en administrteur.
1. Dans la fenêtre **Administrator: Windows PowerShell ISE**, utilisez la commande suivante pour remplacer le suffixe UPN de votre forêt ADDS :
	```Get-ADForest | Set-ADForest -UPNSuffixes @{replace = '[godeployDomain].godeploylabs.com'}```
1. Utilisez, pour terminer, la commande suivante pour modifier l'UPN de tous les utilisateurs du domaine ADDS :  
	```Get-ADUser -Filter * -Properties SamAccountName | ForEach-Object { Set-ADUser $_  -UserPrincipalName "$($_.SamAccountName.replace(' ',''))@[godeployDomain].godeploylabs.com" }```

## Tâche 2 - Activation de TLS 1.2
La machine Windows Server fournie dans le cadre de notre pilote n'a pas le protocole TLS 1.2 actif. l'utilisation de nombreuses fonctionnalités du cloud Microsoft n'est désormais plus supportée sans ce prérequis.
1. Toujours dans la fenêtre **Administrator: Windows PowerShell ISE**, utilisez la commande suivante pour activer le protocole TLS 1.2 : ```set-ExecutionPolicy bypass -force; Invoke-Command -ScriptBlock ([Scriptblock]::Create((Invoke-WebRequest 'https://raw.githubusercontent.com/renaudwangler/ib-labs/master/resources/enabletls12.ps1' -useBasicParsing).Content))```
1. Une fois que LON-DC1 a redémarré, ouvrez la session avec le compte ```Adatum\administrator``` et le mot de passe ```Pa55w.rd```
1. Attendez que l'outil **Server Manager** s'ouvre automatiquement.
1. Sur le menu de navigation de gauche de l'outil **Server Manager**, cliquez sur l'onglet **Local Server**
1. En face de la ligne **Windows Defender Firewall**, si vous voyez tout autre mention que **Domain: On**, cela indique un problème de démarrage que nous allons corriger ici.
1. Cliquez sur le lien mentionnant l'adresse IP de LON-DC1 : **172.16.0.10, IPv6 enabled**, situé en regard de la ligne **Ethernet**.
1. Dans le dossier **Network Connections** qui vient de s'ouvrir, sélectionnez la carte réseau **Ethernet**.
1. Faites un clic-droit sur la carte réseau Ethernet et choisissez **Disable**.
1. Refaites un clic-droit sur la même carte réseau pour choisir **Enable**.
1. Attendez que la mention sous le nom de la carte réseau ait changé de **Identifying** à **Adatum.com**. Cela indique que le contrôleur de domaine a correctement démarré : fermez le dossier **Network Connections**.

## Résultat
Dans cet exercice, vous avez préparé votre environnement ADDS pour la mise en place de la synchronisation avec Entra Id.

Vous pouvez poursuivre par [l'exercice 2 - Synchronisation d'objets](lab3e2)