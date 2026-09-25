---
layout: stage
title: "Lab2-Ex3 - Authentification multifactorielle"
length: "00"
date: "10/01/2025"
script: "ms365.js"
---
# Scénario
Depuis Mars 2024, Microsoft, victime de trop d'attaques cyber, impose l'utilisation de la MFA pour tous les contextes professionnels, y-compris pour les tenant de test Microsoft 365 que l'éditeur fournit pour les formations officielles.  
Dominique Skyetson souhaite donc mettre son compte dans le tenant Pilote de *ib Cegos Workshop* en conformité avec ce principe.

## Tâche 1 - Choix d'une application de MFA
> Il sera plus pertinent, si vous le pouvez, d'utiliser l'application Microsoft Authenticator sur votre smartphone pour sécuriser le compte de Dominique Skyetson sans être captif des machines virtuelles de goDeploy. Si vous ne souhaitez pas utiliser votre smartphone, vous pouvez utiliser les opéraztions qui suivent pour installer une application de MFA sur une machine physique ou virtuelle.  

1. Si vous l'aviez fermée, ouvrez l'outil **Windows PowerShell ISE** en administrteur.
1. Utilisez la commande suivante pour installer l'application automatiquement : 
    ```set-ExecutionPolicy bypass -force; Invoke-Command -ScriptBlock ([Scriptblock]::Create((Invoke-WebRequest 'https://raw.githubusercontent.com/renaudwangler/ib-labs/master/2fast.ps1' -useBasicParsing).Content))```
1. Une fois l'application installée et lançée, si une fenêtre **Tutorial** s'affiche, cliquez sur le bouton **Skip**.
1. Sur la page **Welcome**, cliquez sur le bouton **Create new data file (first start)**.
1. Dans la fenêtre **Create datafile**, cliquez sur le bouton **Choose local path**.
1. Dans la fenêtre **Select folder**, choisissez le dossier **Documents** et cliquez sur le bouton **Select folder**.
1. Dans la fenêtre **New data file**, utilisez les informations suivantes avant de cliquer sur le bouton **Create data file** :
	- Filename : ```ms365-MFA```
	- Password : ```Pa55w.rd```
	- Repeat password : ```Pa55w.rd```
	- Path : laissez la valeur indiquée

## Tâche 2 - Activer la MFA
1. Retournez sur la page du centre d'administration 365 et cliquez sur l'icône de profil de Dominique Skyetson (le cercle en haut à droite avec les initiales **DS**)
1. Cliquez sur le lien **View account**
1. Sur la tuile **Security info**, cliquez sue le lien **UPDATE INFO**
1. Sur la page **Security info**, cliquez sur le bouton "**+ Add sign-in method**
1. Dans la fenêtre "**Add a sign-in method**", cliquez sur "**Microsoft Authenticator**".
1. Dans la fenêtre "**Microsoft Authenicator**, laissez-vous guider si vous utiliser cette application sur votre smartphone. Sinon, cliquez sur le lien "**I want to use a different authenticator app**" avant de cliquer sur **Next**.
1. Sur la page **Scan QR code** page, cliquez sur le bouton **Can't scan image?**.
1. Copiez le "Account name" dans le presse-papier.
1. Retournez sur la fenêtre de l'application **2fast**.
1. Sur la page **Accounts**, cliquez sur le bouton *Add* (**+** en haut).
1. Sur la page **Input type**, cliquez sur le bouton **Manual input**.
1. Sur la page **Inputs**, saisissez ```Dominique Skyetson``` dans le champ **Label**.
1. Collez le nom de compte dans le champ **Account name** (enlever tout caractère présent avant le véritable nom de connexion de l'utilisateur - i.e. *ib Cegos Workshop:*).
1. Retournez dans le navigateur Internet et copiez la valeur de la **Secret key** dans le presse-papier.
1. Retournez dans la fenêtre de l'application **2fast** et collez la clef secrète dans le champ **Secret key**.
1. Cliquez sur le bouton **Create account**.
1. Copiez le code à 6 chiffres affiché dans l'application **2fast**.
1. Retournez dans le navigateur Internet et cliquez sur le bouton **Next**.
1. Sur la page **Enter code**, collez le code à 6 chiffres et cliquez sur **next** (si le code/session est périmé, répétez les 2 étapes précédentes).
1. cliquez sur le bouton **Done**.

## Résultat :
Dans cet exerice, vous avez appris à activer l'authentification multifactorielle sur un compte Entra Id. Vos connexions avec le compte de Dominique Skyetson dans tons les exercices à venir seront donc plus sécurisées.

# Fin de l'atelier 2