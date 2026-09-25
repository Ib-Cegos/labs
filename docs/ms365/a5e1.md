---
layout: stage
title: "Lab5-Ex1 - Création de Boîtes aux lettres"
length: "00"
date: "04/02/2025"
script: "ms365.js"
---
# Scénario
Vous avez pris l'identité de Dominique Skyetson, Administratrice de l'entreprise Adatib Cegos Workshop, et vous avez commencé à déployer Microsoft 365 dans un environnement virtuel pilote. Dans cet exercice, Dominique veut créer des boites aux lettres dans Exchange Online en utilisant le portail Exchange admin center. Même si les boites aux lettres utilisateurs sont créées par l'affectation de license aux utilisateur, il est pertinent de savoir comment créer des boityes aux lettres de resources et des boites aux lettres partagées.  

# Objectifs
A la fin de cet exercice, vous aurez une meilleure connaissance des :
- Boites aux lettres de resources
- Boites aux lettres partagées

## Tâche 1 - Changement du domaine de messagerie
Microsoft ayant eu de nombreux problèmes d'utilisation des domaines *onmicrosoft.com* pour des attaques cyber, ces domaines sont désormais marqués comme étant illégitimes (spam) par défaut. Dans cette première tâche, vous allez ajouter une adresse email basée sur le domaine [godeployDomain].godeploylabs.com à toutes les boites qui seront utilisées pour test par la suite.
1. Ouvrez une session sur LON-CL1 en utilisant le compte ```adatum\administrator``` et le mot de passe ```Pa55w.rd```.
1. Cliquez sur l'icône de **Microsoft Edge** dans la barre des tâches pour lancer votre navigateur Internet. Maximisez sa fenêtre.
1. Dans votre navigateur internet, utilisez l'adresse ```https://admin.microsoft.com``` pour ouvrir le portail **Microsoft 365 admin center**.
1. Connectez-vous au centre d'administration avec le compte de Dominique (```dom@[onmicrosoftDomain].onmicrosoft.com``` et mot de passe ```ibForm@tion```)
1. Dans le menu de navigation du portail **Microsoft 365 Admin center**, sous la section **Admin Centers** cliquez sur **Exchange**. Cela va ouvrir le portail administratif de Exchange Online dans un nouvel onglet.
1. Si nécessaire, dans le portail **Exchange admin center**, dans le menu de navigation à gauche, ouvrez le groupe d'options **Recipients** pour sélectionner **Mailboxes**.
1. Cliquez sur le nom de *Dominique Skyetson** puis, dans le panneau d'informations qui apparait, cliquez sur le lien **Manage email address types** dans la section **Email addresses**.
1. Sur le panneau **Manage email address types**, cliquez sur **+ Add email address type**
1. Sur le panneau **New email address**, saisissez ```dom``` dans le champ **Email address**, avant de sélectionner le domaine **[godeployDomain].godeploylabs.com** après le sigle @.
1. cliquez sur la case **Set as primary email address** afin de la sélectionner et valider en utilisant le bouton **OK** en bas de page.
1. De retour sur le panneau **Manage email adress types**, cliquez sur **Save** puis fermez le panneau d'informations de Dominique avec la croix de fermeture en haut à droite.  
>**Important :** Répétez ensuite les étapes précedentes pour les comptes utilisateurs qui vont nous servir pour les test dans nos ateliers :
>- Alan Yoo : ```alan```@[godeployDomain].godeploylabs.com
>- Megan Bowen  : ```meganB```@[godeployDomain].godeploylabs.com

## Tâche 1 - Création d'une Boite aux lettres de resources.
1. Dans votre navigateur internet, retournez sur l'onglet ou le portail **Microsoft 365 admin center** est ouvert.
1. Dans la section **Resources** cliquez sur **Rooms & equipment**.
1. Dans la page **Rooms & equipment**, cliquez sur **+ Add resource**.
1. Dans le panneau **Add resource** qui apparait, saisissez les informations suivantes avant de cliquer sur **Save** :  
	- **Resource type** : Room 
	- **Name** : ```Salle de réunion 1``` 
	- **Email** : ```reunion1```@[godeployDomain].godeploylabs.com 
	- **Capacity** : ```12``` 
	- **Location** : ```Batiment 1``` 
	- **Phone number** : Laisser ce champ vide 
1. Une fois que le message **Salle de réunion 1 is ready** apparaît, cliquer sur la croix de fermeture en haut à droite pour la fermer.
1. Sur la page **Rooms & equipement**, vous devriez désormais voir la boîte de resource *Salle de réunion 1* que vous venez de créer.  
1. Laissez votre navigateur ouvert pour réaliser la tâche suivante.

## Tâche 2 - Création d'une boite aux lettres partagée
1. Dans votre navigateur internet, retournez sur l'onglet ou le portail **Exchange admin center** est ouvert.
1. Dans le portail **Exchange admin center**, dans le menu de navigation à gauche, ouvrez le groupe d'options **Recipients** si nécessaire pour y sélectionner **Mailboxes**.
1. Cliquez sur **+ Add a shared mailbox** sur la barre de menu.
1. Dans le panneau **Add resource** qui apparait, saisissez les informations suivantes avant de cliquer sur **Create** : 
	- **Display name** : ```hotline``` 
	- **Email address** : ```hotline```@[godeployDomain].godeploylabs.com 
	- **Alias** : ```hotline``` 
1. Une fois que la boite est créée, cliquez sur le lien **Add users to this mailbox**.
1. Dans la panneau **Manage shared mailbox members**, cliquez sur le bouton **+ Add members**.
1. Sélectionnez le compte de **Alan Yoo** (alan@[godeployDomain].godeploylabs.com) avant de cliquer sur **Save**.
1. Sur le panneau **Add delegate permissions?**, cliquez sur le bouton **Confirm**.
1. Attendez que le bandeau vert indiquant que l'opération a réussi avant de cliquzer sur la croix de fermeture en haut à droite.
1. Laissez votre navigateur ouvert pour réaliser la tâche suivante.  

## Tâche 3 - Visualisation des boites créées
1. Basculez vers la machine virtuelle **LON-CL2**. Vous devriez être resté connecté avec le compte **Admin**, le navigateur Internet étant resté ouvert et connecté avec le compte de **Alan Yoo**. Sur l'onglet **Home - Microsoft 365**, cliquez sur l'icône de **Outlook** dans le menu des applications à gauche.
1. Sur la page **Mail - Alan Yoo - Outlook**, cliquez sur la flêche à droite du bouton **New mail** pour sélectionner **Event**.
1. Dans le formulaire *event*, cliquez sur le champ **Add a title** et saisissez ```Réunion de préparation```.
1. Dans le formulaire *event*, cliquez sur le champ **Invite attendees** et saisissez ```Salle de réunion 1``` pour sélectionner la salle de réunion.
1. Ajoutez Dominique Skyetson (```dom@[godeployDomain].godeploylabs.com```) comme invitée à la réunion.
1. Fermez la fenêtre **Réunion de préparation - Meeting** (cliquez sur **Leave** pour confirmer).
1. Sur la page **Mail - Alan Yoo - Outlook**, cliquez sur l'engrenage de paramètrage de la messagerie, en haut à droite.
1. Sur le panneau **Settings** qui apparait, sélectionnez le premier onglet **Account** et le sous onglet **Shared with me**.
1. Dans le popup **Add shared email account**, saisissez l'adresse ```hotline@[godeployDomain].godeploylabs.com```.
1. Cliquez sur le bouton **Continue** puis **Close**.
1. Constatez que la boite partagée **hotline** apparaît en dessous des autres dossiers de Outlook.

## Résultat
A l'issue de cet exercice, vous avez configuré des boites aux lettres dans Exchange Online.

Vous pouvez poursuivre par [l'exercice 2 - Paramètres de transport des messages](lab5e2)