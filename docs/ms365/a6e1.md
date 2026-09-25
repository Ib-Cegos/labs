---
layout: stage
title: "Lab6-Ex1 - Création d'un site Sharepoint"
length: "00"
date: "10/01/2025"
script: "ms365.js"
---
# Scénario
Dans cet exercice, Dominique Skyetson veut commencer à explorer les sites *SharePoint Online*. Pour en comparer le fonctionnement, Dominique va créer un site en utilisant le portail *SharePoint Online admin center*, avant d'en créer un second en utilisant Windows PowerShell.

## Tâche 1 - Créer un site dans le SharePoint admin center
Dans cette tâche, vous allez utiliser le portail Sharepoint admin center pour créer un site pour le service formation de ib Cegos Workshop.
1. Basculez sur la machine virtuelle **LON-CL1**, sur laquelle vous devriez encore être connecté avec le compte **adatum\Administrator** et le mot de passe **Pa55w.rd**.
1. Les portails **Microsoft 365 admin center**, **Microsoft Defender admin Center** et **Exchange admin center** (Vous pouvez désormais fermer les deux derniers) devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation, cliquez sur **Show all** (si nécessaire) puis cliquez sur **Sharepoint** sous la section **Admin centers**. Ceci va ouvrir le portail **SharePoint admin center** dans un nouvel onglet.
1. Si une boite de dialogue **Take tour** apparaît, cliquez en dehors pour la fermer.
1. Dans le menu de navigation du **Sharepoint admin center**, cliquez sur le choix **Active sites** dans le groupe d'options **Sites**.
1. Sur la barre de menu au-dessus de la liste de sites, cliquez sur le bouton **+ Create**.
1. Sur la page **Create a site: Select the site type**, cliquez sur la tuile **Communication Site**.
1. Sur la page **Select a template**, choisissez le modèle de site "**Standard communication**". Validez votre choix en cliquant sur **use template**.
1. Sur la page **Give your site a name**, saisissez ```Formation``` dans le champ **Site name**.
1. Dans le champ **Site description**, saisissez ```ib Cegos Workshop - Formations```.
1. Dans le champ **Site owner**, tapez ```dominique``` et cliquez sur le compte de Dominique Skyetson.
1. Sur la page **Give your site a name**, cliquez sur le bouton **Next**.
1. Sur la page **Set language and other options**, cliquez sur le bouton **Create site**. Vous allez retourner sur la page **Active sites**.
	>**Note :** La création d'un site Sharepoint Online peut prendre quelques minutes. Ne passez pas à la suite des opérations tant que vous ne voyez pas apparaître le site **Formation** dans la liste.
1. Sur la page **Active sites**, passez votre souris sur la ligne du site **Formation**. Sélectionnez la case à cocher qui s'affiche à gauche du nom du site.
1. Sélectionner la ligne du site **Formation** devrait faire apparaître le bouton **Sharing** dans la barre de menu au-dessus de la liste de sites. Si ce bouton n'apparaît pas, vous pouvez tenter de rafraichir la page de votre navigateur.
1. Cliquez sur le bouton **Sharing** une fois qu'il est apparu sur la barre de menu.
1. Dans le panneau **Sharing**, sélectionnez **Anyone** avant de cliquer sur **Save** et de fermer le panneau.
	>**Note :** Les paramètres de site changent pour permettre le partage d'éléments de ce site de la manière la plus ouverte possible.
1. Conservez votre navigateur Internet ouvert pour les tâches ultérieures.

## Tâche 2 - Créer un site avec Windows Powershell
Après avoir créé un site avec le portail d'administration de Sharepoint Online, vous allez désormais utiliser Windows Powershell pour créer un site pour le service comptabilité de ib Cegos Workshop.
1. Sur **LON-CL1**, tapez ```Powershell ISE``` dans la recherche à droite du bouton **Démarrer** sur la barre des tâches.
1. Sur le menu **Démarrer**, dans le panneau de détail sur l'application **Windows PowerShell ISE**, cliquez sur **Run as administrator**.
1. Si une fenêtre **User Account Control** apparaît, connectez-vous avec le compte **adatum\administrator** et le mot de passe ```Pa55w.rd```.
1. Dans la partie basse (bleue) de la fenêtre **Administrator: Windows Powershell ISE**, utilisez la commande suivante pour installer le module Powershell de gestion de Sharepoint Online :  
	```Install-Module Microsoft.Online.SharePoint.PowerShell -Force```
1. Dans l'invite de commande de l'ISE, utilisez la commande suivante pour vous connecter à votre environnement Sharepoint Online :  
	```Connect-SPOService –Url https://[onmicrosoftDomain]-admin.sharepoint.com```
1. Dans la boite de dialogue **Sign in**, saisissez le nom de connexion de Dominique Skyetson (```dom@[onmicrosoftDomain].onmicrosoft.com```) et cliquez sur **Next**.
1. Dans la boite de dialogue **Enter password**, saisissez ```ibForm@tion``` et cliquez sur **Sign in**.
1. Dans l'invite Powershell, utilisez la commande suivante pour créer un nouveau site nommé **Comptabilité** :  
	```New-SPOSite -Url https://[onmicrosoftDomain].sharepoint.com/sites/Accounting -Owner dom@[onmicrosoftDomain].onmicrosoft.com -StorageQuota 500 -NoWait -Template PROJECTSITE#0 –Title Comptabilité```
1. Minimisez la fenêtre **Administrator: Windows Powershell ISE**.
1. Dans votre navigateur Internet, la page **Active sites** devrait toujours être affichée à l'issue de la tâche précédente. Si le site **Comptabilité** ne s'affiche pas, rafraichissez la page du navigateur. (Il vous faudra peut-être attendre quelques instants et répéter l'opération). Ne passez pas à la tâche suivante tant que vous n'avez pas constaté l'affichage du site **Comptabilité** dans la liste des sites actifs.

## Résultat
Après avoir réalisé cet exercice, vous devriez savoir créer et configurer des sites Sharepoint Online de base.

Vous pouvez poursuivre par [l'exercice 2 - Gestion des bibliothèques de documents](lab6e2)