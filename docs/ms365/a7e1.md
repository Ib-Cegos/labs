---
layout: stage
title: "Lab7-Ex0 - Configuration des équipes et des canaux"
length: "00"
date: "06/02/2025"
script: "ms365.js"
---
# Scénario
Dans cet exercice, vous allez apprendre à créer et configurer les équipes et les canauxl de l'environnement *Teams* depuis *le Teams admin center*.

# Objectifs
A la fin de cet exercice, vous aurez une meilleure connaissance de :
- Les équipes Teams
- Les canaux Teams


## Tâche 1 - Création d'une équipe Après-vente depuis le portail Microsoft 365 admin center
1. Votre session devrait déjà ouverte sur **LON-CL1**, avec le compte **ADATUM\Administrator** et le mot de passe **Pa55w.rd**.
1. Le portail **Microsoft 365 admin center** devrait encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*) : Vous pouvez fermer tous les autres onglets de votre navigateur (*Outlook*, *Sharepoint* etc...).
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation de gauche, cliquez sur **Teams & groups** pour ouvrir cette catégorie et sélectionnez **Active Teams & Groups".
1. Dans la page **Active Teams & Groups**, sur l'ongmlet **teams & Microsoft 365 groups**, cliquez sur **+ Add a Team**.
1. Sur la page **Set up the basics**, saisissez les informations suivantes avant de cliquer sur **Next** :
	 - **Name of team** : ```Après-vente```
	 - **Describe this team** : ```Membres du service SAV de ib Cegos Workshop```
1. Sur la page **Add owners**, dans le champ **Owners**, saisissez ```Alan``` et sélectionnez le compte de **Alan Yoo**, puis saisissez ```Dominique``` et sélectionnez **Dominique Skyetson** avant de cliquer sur **Next**
1. Sur la page **Add members**, dans le champ **Members** :
	- Saisissez ```Alan``` pour sélectionner **Alan Yoo**,
	- Saisissez ```Alex``` pour sélectionner **Alex Wilber**,
	- Saisissez ```Beth``` pour sélectionner **Beth Burke**,
	- Saisissez ```Diego``` pour sélectionner **Diego Siciliani**,
1. Cliquez sur **Next**.
1. Sur la page **Edit Settings**, saisissez les informations suivantes avant de cliquer sur **Next** :
	 - **Team email address** : ```sav```@[onmicrosoftDomain].onmicrosoft.com
	 - **Privacy** : Private (people can only join if [...])
1. Sur la page **Review and finish adding team**, vérifiez votre saisie (vous pouvez utiliser les liens **Edit** pour apporter toute correction utile) et cliquez sur le bouton **Add team** pour finir.
1. De retour sur la liste des **Active teams and groups**, vérifiez que la nouvelle équipe après-vente apparait dans la liste (et que l'icone de *Teams* est présent dans la colonne **Teams status**. Il pourra être nécessaire de patienter un peu et de rafraichir la liste).
1. Sur la dernière page **New team created**, cliquez sur le bouton **Close**.

## Tâche 2 - Création d'une équipe CSE depuis le Teams Admin Center
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation de gauche, cliquez sur **Show all** (si nécessaire), puis descendez dans ce menu pour cliquer sur **Teams** dans la section **Admin centers**. Cela va ouvrir le **Microsoft Teams admin center** dans un nouvel onglet.
1. Dans le portail **Microsoft Teams admin center**,  dans le menu de navigation, oiuvrez la catégorie **Teams** pour y sélectionner **Manage Teams**.
1. Dans la page **Manage teams**, cliquez sur **+ Add**.
1. Dans le panneau **Add a new team** qui apparait, saisissez les informations suivantes avant de cliquer sur **Apply** :
	- **Name** : ```cse```
	- **Description : ```Comité social et économique```
	- **Team owners** : Laissez Dominique comme unique propriétaire de l'équipe
	- **Privacy** : Public
1. Une fois la nouvelle équipe créée, vérifiez qu'elle apparait dans la liste des équipes avant de passer à la suite.

## Tâche 3 - Gestion des canaux d'une équipe
1. Sur la page **Manage Teams**, cliquez sur le nom de l'équipe que vous venez de créer : **cse**.
1. Sur la page d'édition de l'équipe **cse**, cliquez sur l'onglet **Channels**. Vous constatez qu'un unique canal de conversation (nommé *General*) a été créé avec la création de l'équipe.
1. dans la barre de menu des canaux, cliquez sur **+ Add**
1. Dans le panneau **Add** qui s'affiche à droite, saisissez les informations suivante avant de cliquer sur **Apply** :
	- **Name** : ```Gestion du cse```
	- **Description** : ```Canal d'échange privés entre les membres du cse```
	- **Type** : ```Private```
	- **Channel owner** : Saisissez ```Dominique``` pour sélectionner **Dominique Skyetson**.
1. De retour sur la liste des canaux, dans la barre de menu, cliquez sur **+ Add**
1. Dans le panneau **Add** qui s'affiche à droite, saisissez les informations suivante avant de cliquer sur **Apply** :
	- **Name** : ```Promotions```
	- **Description** : ```Prompostions négociées par les membres du cse```
	- **Type** : ```Shared```
	- **Channel owner** : Saisissez ```Dominique``` pour sélectionner **Dominique Skyetson**.

## Tâche 4 - Visualisation des équipes dans le client Teams.
1. Ouvrez le menu **App launcher** (les 9 petits carrés en haut à gauche) depuis un des deux onglets déjà ouverts sur votre navigateur.
1. Sélectionnez le client **Teams** : un nouvel onglet va s'ouvrir avec le client Teams web de Dominique.
1. Dans le client Teams de Dominique, cliquez sur l'icone d'équipes **Teams** dans le menu à gauche.
1. Vérifiez que les deux équipes précédemment créés apparaissent : 
	 - cse
	 - Après-vente
1. Ouvrez l'équipe *cse* si nécessaire pour cliquer sur les points de suspension qui apparaissent à droite du nom du canal **Promotions**.
1. Sélectionnez **Share channel** puis **Share with a team you own**.
1. Dans le popup **Pick a team to give access to Promotions channel**, sélectionnez **Après-vente** et cliquez sur **Done**.
1. De retour dans le client Teams de Dominique, attendez de voir que le canal *Promotions* apparait dans l'équipe *Après-vente*.
1. Vous pouvez fermer l'onglet de votre navigateur dans lequel le client Teams est ouvert.

## Résultat
Dans cet exercice, vous avez travaillé sur la création d'équipe et des canaux correspondant aux sujet de travail de l'organisation de diverses manières.

Vous pouvez poursuivre par [l'exercice 2 - Gestion des stratégies Microsoft Teams](lab7e2)