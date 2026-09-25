---
layout: stage
title: "Lab4-Ex1 - Déploiement de Microsoft 365 apps for enterprise"
length: "00"
date: "03/02/2025"
script: "ms365.js"
---
# Scénario
Vous avez pris l'identité de Dominique Skyetson, Administrateur de l'entreprise ib Cegos Workshop, et vous avez commencé à déployer Microsoft 365 dans un environnement virtuel pilote. Dans cet exercice, vous allez réaliser les tâches nécessaires pour comprendre l'installation de la suite Office par les utilisateurs. Cette installation *user-driven* est un processus à deux étapes : 1) Configurer le compte utilisateur de telle sorte qu'un utilisateur éligible puisse télécharger les fichiers et réaliser l'installation, et 2) réaliser l'installation de la suite Office.  
Dans les deux premières tâches de cet exercice, vous allez vérifier en quoi les conditions suivantes affectent la possibilité pour un utilisateur de télécharger la suite Microsoft 365 Apps for enterprise :  
- L'utilisateur n'a pas de licence pour la suite Office (ce que vous vérifierez en tâche 1). 
- Un administrateur désactive le paramètre global permettant aux utilisateurs le téléchargement des applications pour tous les utilisateurs (testé en tâche 2).  
Dans la dernière tâche de cet exercice, vous installerez la suite Microsoft 365 Apps for enterprise depuis le compte d'un des utilisateurs de ib Cegos Workshop.

# Objectifs
A la fin de cet exercice, vous aurez une meilleure connaissance de :
- L'impact des licences sur la possibilité, pour les utilisateurs, d'installer la suite Office.
- Le paramètre global permettant d'empêcher de télécharger l'assistant d'installation de la suite Office.
- L'installation *user-driven* de Microsoft 365 apps.

## Tâche 1 – Vérifier l'impact des licences sur l'installation
Dans cette tâche, Dominique va tester si un utilisateur qui ne s'est pas vu affecté de licence peut ou non télécharger Microsoft 365 Apps. Pour ce test, vous pouvez utiliser n'importe quel utilisateur préexistant de la liste **Active Users** dans le portail Microsoft 365 admin center. Ces utilisateurs ont des comptes Entra Id du domaine par défaut ([onmicrosoftDomain].onmicrosoft.com); ils n'ont pas de compte correspondant *on-premises* dans le domaine ADDS (qui a désormais été changé *on-premises* et remplacé par [godeployDomain].godeploylabs.com). Sans compte *on-premises*, vous ne pouvez vous connecter à une VM Cliente.  
C'est pourquoi vous devez d'abord utiliser un compte ADDS pour vous connecter. Pour ce test, vous utiliserez le compte de **Laura Atkins**. Vous allez créer un compte pour Laura, mais sans lui affecter de licence.  
Vous utiliserez ensuite la VM **LON-CL2** pour installer Microsoft 365 Apps.
1. Basculez vers **LON-CL2** et connectez-vous en ```.\Admin``` avec le mot de passe ```Pa55w.rd```.
1. Vous allez commencer par tester si un utilisateur sans licence Office 365 peut ou non installer Microsoft 365 Apps. Pour ce test, vous allez utiliser le compte de **Laura Atkins**. Vous avez créé un compte pour Laura dans [l'atelier 2,exercice1](lab2e1#t%C3%A2che-1---cr%C3%A9ation-dutilisateurs), mais ne lui avez pas affecté de licence. Dans LON-CL2, cliquez sur l'icône **Microsoft Edge** sur la barre des tâches.
1. Maximisez votre navigateur Internet puis rendez-vous sur la page d'accueil **Microsoft 365** en utilisant l'adresse suivante : ```https://www.microsoft365.com```
	>**Note :** Si n'importe quel compte est automatiquement connecté, déconnectez-le nom d'utilisateur (en bas à gauche dans le menu) et en sélectionnant **Sign out**, retapez ensuite ```https://www.microsoft365.com``` dans la barre d'adresse.
1. Cliquez sur **Sign in**.
1. Dans la fenêtre **Sign in**, tapez ```Laura@[onmicrosoftDomain].onmicrosoft.com``` avant de cliquer sur **Next**.
1. Dans la fenêtre **Enter password**, saisissez ```Pa55w.rd``` et cliquez sur **Sign in**.
1. Dans la boite de dialogue **Update your password**, entrez ```Pa55w.rd``` dans le champ **Current password**, puis entrez ```ibForm@tion``` dans les champs **New password** et **Confirm password**. Cliquez sur **Sign in**.
1. Si une fenêtre **Stay signed in?** apparait, cochez la case **Don't show this again** et cliquez sur **Yes.**
1. Si la boite de dialogue **Welcome to Microsoft 365** apparait, fermez-la.
1. Dans la page **What can I help you find?", ouvrez le menu de gauche is nécessaire pour cliquer sur **Apps**.
1. Sur la page **Apps**, cliquez sur le bouton **Install apps** en haut à droite et sélectionnez **Microsoft 365 apps**.
1. La fenêtre **My account** de Laura s'affiche.
1. Cliquez sur le bouton **View apps & devices**.
1. Dans la section **Office**, vous ne devriez rien trouver...  
	>**Important :** Vous venez de vérifier qu'un utilisateur ne peut télécharger Microsoft 365 Apps for enterprise s'il ne s'est pas vu affecter de licence idoine.
1. Fermez la page **My account** de Laura, mais laissez votre navigateur Internet ouvert pour réaliser la tâche suivante.

## Tâche 2 – Paramètre de téléchargement global
Dominique va désormais tester si les utilisateurs avec licence peuvent être empêché de télécharger Microsoft 365 Apps si un administrateur comme elle désactive le paramètre global contrôlant ce téléchargement pour tous les utilisateurs.
1. Basculez vers **LON-DC1**, ou vous devriez encore être connecté avec le compte **Administrator**. Vous devriez également avoir votre navigateur Internet ouvert, et y être connecté avec le compte de Dominique Skyetson. Vous devirez avoir un onglet ouvert sur le portail **Microsoft 365 admin center**.
1. Pour désactiver le paramètre de téléchargement global, ouvrez l'onglet de votre navigateur qui affiche le portail **Microsoft 365 admin center**, Si nécessaire, cliquez sur **...Show all** dans le menu de navigation afin de pouvoir ouvrir le groupe d'options **Settings**, et sélectionnez pour finir **Org Settings**.
1. Sur la page **Org settings**, l'onglet **Services** est affiché par défaut. Défilez la liste des services afin de pouvoir cliquer sur **Microsoft 365 installation options**.
1. Dans le panneau **Microsoft 365 installation options** qui s'affiche, cliquez sur l'onglet **Installation** puis, dans la section **Apps for Windows and mobile devices**, décochez la case **Office (includes Skype for Business)**, ce qui va désactiver cette fonctionnalité.
1. Cliquez sur **Save**.
	>**Important :** Laissez le panneau **Microsoft 365 installation options** ouvert car vous allez y revenir dans la tâche suivante.

1. Vous souhaitez tester si, en désactivant ce paramètre, cela empêche un utilisateur **licencié** d'installer Microsoft 365 Apps for enterprise. Dans ce cas vous allez utiliser le compte de **Alan Yoo**, qui a aussi été créé lors de [l'atelier 2,exercice1](lab2e1#t%C3%A2che-1---cr%C3%A9ation-dutilisateurs); cependant, contrairement à Laura Atkins, vous aviez affecté une licence Office 365 E5 à Alan.
1. Basculez vers **LON-CL2**.
1. Sur LON-CL2, vous devriez encore être connecté à l'environnement Microsoft 365 avec le compte de Laura Atkins suite à la tâche précédente. Vous devez d'abord vous déconnecter du compte de Laura, cliquez donc sur son nom (en bas à gauche) pour cliquer sur **Sign out**.
	>**Important :** Suite à une déconnexion, il est très fortement conseillé de fermer tous les onglets de votre navigateur sauf celui qui s'appelle **Login**.
1. Dans l'onglet **Login**, cliquez sur **Switch to a different account**.
1. Dans le champ **Email address**, saisissez ```alan@[onmicrosoftDomain].onmicrosoft.com``` et cliquez sur **Sign in**
1. Dans la fenêtre **Enter password**, saisissez ```Pa55w.rd``` et cliquez sur **Sign in.**
1. Dans la boite de dialogue **Update your password**, tapez ```Pa55w.rd``` dans le champ **Current password**, tapez ensuite ```ibForm@tion``` dans les champs **New password** et **Confirm password** avant de cliquer sur **Sign in**.
1. Dans la page **What can I help you find?**, ouvrez le menu de gauche si nécessaire pour cliquer sur **Apps**.
1. Sur la page **Apps**, cliquez sur le bouton **Install apps** en haut à droite et sélectionnez **Microsoft 365 apps**.
1. La fenêtre **My account** de Alan s'affiche. Sous la section **Office apps &amp; devices**, vous ne devriez pas pouvoir installer Office...  
	>**Important :** Vous venez de vérifier qu'un utilisateur licencié ne peut télécharger Microsoft 365 Apps for enterprise si le paramètre global l'en empêche.
1. Dominique souhaite désormais réactiver le paramètre d'installation global pour que Alan puisse réaliser l'installation de Microsoft 365 Apps for enterprise.  
	Pour ce faire, basculez de nouveau sur **LON-DC1**. La fenêtre **Microsoft 365 installation options** devrait toujours être ouverte suite à la tâche précédente.  
	Cliquez sur l'onglet **Installation** si nécessaire et dans la section **Apps for Windows and mobile devices**, cochez la case **Office (includes Skype for Business)** pour réactiver cette fonctionnalité.
1. Cliquez sur **Save**.
1. Une fois vos modifications sauvegardées, cliquez sur le **X** de fermeture en haut à droite du panneau **Microsoft 365 installation options** pour le fermer. 
1. Pour vérifier comment ce changement de paramètre affecte le compte d'Alan dans sa possibilité de télécharger Microsoft 365 Apps, basculez de nouveau sur **LON-CL2**.
1. Sur LON-CL2, le navigateur Internet devrait être resté ouvert sur la page du compte de Alan contenant la section **Office apps and devices**.  
	Cliquez sur l'icône **Refresh** du navigateur pour recharger complètement la page.
	>**Note :** IL pourra être nécessaire d'attendre quelques instants et de recharger de nouveau la page...
1. Sous la section **Office apps &amp; devices**, un bouton **Install Office** est apparu.  
	>**Important :** Vous venez de vérifier qu'un utilisateur avec une licence Office affectée est capable de lancer le téléchargement et l'installation de la suite Office depuis son portail si le paramètre global est actif.
1. Restez sur cette page sur LON-CL2 pour réaliser l'installation *user-driven* dans la tâche suivante.

## Tâche 3 – Installation *user-driven*
Dans la tâche précédente, vous vous êtes connecté avec le compte de Alan Yoo et avez vérifié qu'un utilisateur correctement licencié peut télécharger Microsoft 365 Apps for enterprise. Dans cette tâche, vous allez poursuivre vos tests en procédant à l'installation de la suite office à l'aide du compte de Alan Yoo.  
1. Vous devriez encore être connecté à LON-CL2, avec votre navigateur Internet ouvert sur la page **My Account** de Alan Yoo. 
1. Dans la section **Office apps &amp; devices**, vous avez constaté qu'un bouton **Install Office** est apparu.  
	>**Important :** En cliquant sur ce bouton  **Install Office** c'est la version anglaise 64 bit de Microsoft 365 Apps qui sera installée. Cependant, si vous souhaitez installer une autre version et/ou une autre langue, il vous faut cliquer sur l'onglet **Apps &amp; devices**.  

	Puisque Alan veut installer une version 32-bits anglaise de Microsoft 365 Apps for enterprise, cliquez sur l'onglet  **View Apps &amp; devices** et modifiez le champ **Version** à **32-bit** avant de cliquer sur le bouton orange **Install Office**.
1.  Dans la barre de notification qui apparait en haut à droite de votre navigateur, cliquez sur le lien **Open file** sous le fichier **OfficeSetup.exe** une fois ce dernier téléchargé. Vous allez ainsi lancer l'assistant d'installation d'Office.
1. Si une boite de dialogue **Do you want to allow this app to make changes to your device?** apparait, cliquez sur **Yes**.
1. L'installation va prendre quelques minutes à se terminer. Une fois l'installation réalisée, cliquez sur le bouton **Close** dans la fenêtre **You're all set!**.
1. Pour vérifier l'installation de Microsoft 365 Apps for enterprise par Alan Yoo, cliquez sur le bouton **Démarrer** en bas à gauche de la barre des tâches. La section **Recently added** (en haut du menu **Démarrer**) affiche Microsoft 365 Apps for enterprise qui vient juste d'être installée. Cela pourra inclure Word, PowerPoint, OneNote, Outlook, Publisher, Access, Teams et Excel.
1. Dans le menu **Démarrer**, cliquez sur **Word**.
1. Dans la fenêtre **Hello Alan, welcome to Word**, cliquez sur **Continue**.
1. Dans la fenêtre **Activate Office**, saisissez l'adresse de Alan : ```alan@[onmicrosoftDomain].onmicrosoft.com``` avant de cliquer sur **Next**.
1. Dans la fenêtre **Enter password**, tapez ```ibForm@tion``` et cliquez sur **Sign in.**
1. Sur la fenêtre **Stay signed in to all your apps**, cliquez sur le lien **No, sign in to this app only**.
1. Sur la fenêtre **Accept the license agreement**, cliquez sur le bouton **Accept**.
1. Dans la fenêtre **Your privacy matters** window, cliquez sur **Close**.
1. Vérifiez que Word fonctionne correctement en créant un nouveau document vierge (**Blank document**) et en tapant un peu de texte avant de le sauvegarder dans le dossier **Documents**.
1. Fermez Word.
1. Laissez votre navigateur ouvert en vue de l'exercice suivant.  

## Résultat
Vous avez vérifié les paramètres de téléchargement et l'impact des licences sur l'installation *user-driven* de la suite Microsoft 365 apps.

Vous pouvez poursuivre par [l'exercice 2 - Déploiement de Microsoft 365 apps via MDM](lab4e2)