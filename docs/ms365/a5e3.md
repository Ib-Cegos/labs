---
layout: stage
title: "Lab5-Ex3 - Configuration de la protection de la messagerie"
length: "00"
date: "04/02/2025"
script: "ms365.js"
---
# Scénario
Dans cet exercice, vous allez continuer, sous l'identité de Dominique Skyetson, Administratrice de l'entreprise ib Cegos Workshop à déployer Microsoft 365 dans un environnement virtuel pilote. ib Cegos Workshop a récemment constaté une recrudescence des attaques virales. Le CTO de l'entreprise a demandé à Dominique de rechercher les différentes options disponibles dans Exchange Online pour fortifier l'environnement de messagerie.  
Vous allez accéder au centre d'administration de Exchange Online depuis votre machine cliente et voir comment créer une série de règles de filtrage d'hygiène pensées pour protéger l'environnement de messagerie de ib Cegos Workshop. Vous allez créer un filtre antiviral, un filtre de connexion et un filtre de spam.  

# Objectifs
A la fin de cet exercice, vous aurez une meilleure connaissance de :
- Les stratégies antivirales de Microsoft 365
- Les stratégies antispam de Microsoft 365


## Tâche 1 - Créer un filtre antiviral
1. Vous devriez encore être connecté sur **LON-CL1** à l'issue de l'atelier précédent. Les portails **Microsoft 365 admin center** et **Exchange admin center** devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Microsoft 365 Admin center**, sous la section **Admin Centers** du menu de navigation à gauche, cliquez sur **Security**.
1. Dans le portail **Microsoft Defender**, cliquez (à gauche) sur la flêche **Show navigation**.
1. Dans le portail **Microsoft 365 Defender**, dans le groupe d'options **Email &amp; collaboration** du menu de navigation, cliquez sur **Policies &amp; rules**.
1. Sur la page **Policies &amp; rules**, cliquez sur **Threat policies**.
1. Sur la page **Threat policies**, cliquez sur **Anti-malware** dans la section **Policies**.
1. Sur la barre de menu, cliquez sur **+ Create** pour ajouter un nouveau filtre antiviral.
1. Sur la page **Name your policy**, entrez ```Strategie antivirus``` dans le champ **Name**.
1. Dans le champ **Description**, saisissez ```Cette stratégie a été créée pour protéger l'environement de messagerie de ib Cegos Workshop.``` avant de cliquer sur **Next**.
1. Sur la page **Users and Domains**, cliquez dans le champ **Domains** et tapez ```onmicrosoft```pour sélectionner votre domaine original (**[onmicrosoftDomain].onmicrosoft.com** et pas [onmicrosoftDomain].mail.onmicrosoft.com) avant de cliquer sur **Next**.
1. Sur la page **Protection settings**, constatez les valeurs par défaut et les options disponibles et cliquez sur **Next**.
1. Sur la page **Review**, cliquez sur le bouton **Submit** (vous pouvez aussi choisir d'annuler l'assistant car vous ne testerez pas cette stratégie antivirale).
1. Sur la page **Created new anti-malware policy**, cliquez sur **Done**.
1. Dans le menu de navigation séquentielle en haut de page, cliquez sur **Threat policies** pour remonter d'un niveau.

## Tâche 2 - Créer un filtre de connexion
Dans cette tâche, vous allez modifier le filtre de connexion par défaut pour y inclure une IP bloquée et une IP de confiance. Tout message venant d'une IP de confiance sera accepté, tandis que tout message venant d'une IP bloquée sera bloqué.
1. Dans le portail **Microsoft 365 Defender**, sur la page **Threat policies**, cliquez sur **Anti-spam**.
1. Dans la liste des stratégies, sélectionnez **Connection filter policy (Default)**.
1. Une fois le panneau des détails de la stratégie affiché, cliquez sur le lien **Edit connection filter policy**.
1. Dans le contexte de l'atelier, vous **N'ALLEZ PAS** ajouter d'adresse IP bloquée. Vous pourriez le faire si vous aviez connaissance d'une adresse que vous souhaitez tester et/ou marquer comme problématique. Cependant, il faudra à peu près une heure pour que ce changement se propage sur la globalité de l'environnement. Pour votre atelier, il est suffisant de constater que vous êtes à même d'ajouter une adresse IP dans cette interface.
1. Cochez la case **Turn on safe list** plus bas dans la page. C'est un conseil d'activer cette fonction pour votre *tenant* pour souscrire à la gestion par Microsoft des adresses à problèmes les plus connues. Cocher cette case supprimera automatiquement les messages de spam émis par ces émetteurs.
1. Cliquez sur les boutons **Save** puis **Close** une fois les changements sauvegardés.
1. Laissez votre navigateur Internet ouvert sur l'onglet **Anti-spam policies** pour la tâche suivante.

## Tâche 3 - Créer un filtre antispam
Pour les clients Microsoft 365 dont les boites aux lettres sont hébergées sur Exchange Online, leurs messages sont automatiquement protégés contre les spams et les virus. Microsoft 365 a des fonctionnalités natives de filtrage antispam et antivirales qui protègent les flux de messages entrants et sortants.  
En tant qu'administratrice de ib Cegos Workshop, Dominique souhaite activer et maintenir les technologies de filtrage utilisées, qui sont activées par défaut. Ceci étant, il peut customiser l'utilisation de ces technologies dans le contexte de l'entreprise.
1. Vous devriez encore être connecté sur **LON-CL1** à l'issue de l'atelier précédent. Les portails **Microsoft 365 admin center**, **Exchange admin center** et **Mircosoft 365 Defender** devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Microsoft 365 Defender**, sur la page **Anti-spam policies**, cliquez sur **Anti-spam inbound policy (Default)**.
1. Dans le panneau **Anti-spam inbound policy (Default)** qui s'affiche, descendez pour cliquer sur le lien **Edit actions**.  
	>**Note :** Dans cette section vous sont présentées une sélection d'options sur la manière dont seront repérés les spam et la manière dont ils seront traités en fonction de leur niveau de gravité.
1. Dans la fenêtre **Actions**, réalisez les sélections suivantes :
	- Spam : **Move message to Junk Email folder**
	- High Confident Spam : **Prepend subject line with text**
	- Bulk complaint level (BCL) met or exceeded : **Move message to Junk Email folder**
	- Retain spam in quarantine for this many days: **10**
	- Prepend subject line with this text: saisissez ```SPAM: This message contains potential spam```
1. Cliquez sur le bouton **Save**.
1. Une fois les modifications sauvegardées, cliquez sur **Close**.
1. Laissez votre navigateur Internet ouvert sur l'onglet **Anti-spam policies** pour la tâche suivante.

## Résultat
Au cours de cet exercice, vous avez configuré les paramètres anti-spam et anti-virus de Microsoft 365.

# Fin de l'atelier 5