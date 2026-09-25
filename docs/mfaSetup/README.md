---
Atelier: Mise en place de la M.F.A pour les ateliers Microsoft
Duree: 10
---

# Mise en place de la M.F.A pour les ateliers Microsoft
Depuis Mars 2024, Microsoft, victime de trop d'attaques cyber, impose l'utilisation de la MFA pour tous les contextes professionnels, y-compris pour les tenant de test Microsoft 365 que l'éditeur fournit pour les formations officielles.  
Il faut donc désormais mettre en place la MFA pour tous les utilisateurs à tester dans ce contexte.

## Etape 1a : Installer une application MFA depuis le Store Microsoft sur Windows 11  

> Si vous le pouvez, utilisez une application de gestion de MFA sur votre smartphone/machine physique, cela vous évitera de vous rendre tributaire de la disponibilité de la machine virtuelle de l'environnement d'atelier. Si vous ne le pouvez/souhaitez pas , vous pouvez utiliser la procédure ci dessous (ou celle de la tâche 1b) pour installer une application MFA sur mla machine virtuelle.  

1. Ouvrir une session sur la machine cible de l'installation.
1. Cliquer sur le bouton **Démarrer** de Windows 10/11 et taper `Store`
1. Cliquer sur le raccourci **"Microsoft Store"**

    > Le service Windows Update doit être activé et démarré pour utiliser le *Microsoft Store*  

1. Dans le champ **"Search"**, taper `2fast`
1. Cliquer sur le lien **"2fast - Two factor authenticator App"**
1. Cliquer sur le bouton **Get**.
1. Si une fenêtre proposant la connexion "**Use across your devices** s'affiche cliquer sur "**No, thanks**"
1. Attendre que l'application soit téléchargée puis installée avant de poursuivre.
1. Sur le **Microsoft Store**, sur la page **"2 fast - Two factor Authenticator"**, cliquer sur le bouton **Launch**
1. Si une fenêtre **Tutorial** s'affiche, cliquez sur le bouton **Skip**.
1. Sur la page **Welcome**, cliquer sur le bouton **Create new datafile (first start)**.
1. Dans la fenêtre **Create datafile**, cliquer sur le bouton **Choose local path**.
1. Dans la fenêtre **Select Folder**, choisir le dossier **Documents** et cliquer sur le bouton **Select Folder**
1. De retour sur la fenêtre **Create datafile**, saisir les données suivantes avant de cliquer sur le bouton **Create datafile**.
    - `mibMFA` dans le champ **Filename**
    - `Pa55w.rd` dans les champs **Password** et **Repeat password**

> Cette procédure pourra être répétée (ainsi que la procédure *2*) sur chaque machine virtuelle et/ou profils depuis lesquels on souhaitera accèder à la MFA des utilisateurs.

## Etape 1b : Installer une application MFA automatiquement sur Windows 10/11

1. Ouvrir une session sur la machine cible de l'installation.
1. Ouvrir une invite Powershell **en Administrateur**
1. Utiliser la commande suivante pour installer l'application automatiquement : 
    ```powershell
    set-ExecutionPolicy bypass -force; iex ([Text.Encoding]::UTF8.GetString((Invoke-WebRequest '[resourcesUrl]/2fast.ps1' -UseBasicParsing).Content))
    ```
1. Une fois l'application installée et lançée, si une fenêtre **Tutorial** s'affiche, cliquez sur le bouton **Skip**.
1. Sur la page **Welcome**, cliquer sur le bouton **Load existing data file**.
1. Dans la fenêtre **Create datafile**, cliquer sur le bouton **Choose local path**.
1. Dans la fenêtre **Open**, choisir le dossier **Documents** et ouvrir le fichier **ibMFA.2fa**
1. De retour sur la fenêtre **Load existing Datafile**, saisir `Pa55w.rd` dans le champ **Password** avant de valider.

## Etape 2a : Activer la MFA pour un compte utilisateur lors de sa première connexion

1. Lors de la connexion de l'utilisateur, après saisie du mot de passe, apparaît la fenêtre **More information required** :
1. Cliquer sur le bouton **Next**.
1. Sur la fenêtre "**Keep your account secure** qui apparaît ensuite, cliquer sur **I want tu use a different authenticator app** avant de cliquer sur le bouton **Next**.
1. Sur la page **Scan QR code** page, cliquer sur le bouton **Can't scan image?**.
1. Copier le "Account name" dans le presse-papier.
1. Retourner sur la fenêtre de l'application **2fast**.
1. Sur la page **Accounts**, cliquer sur le bouton *Add* **+** en haut.
1. Sur la page **Input type**, cliquer sur le bouton **Manual input**.
1. Sur la page **Inputs**, choisir un label qui représentera la compte dont vous activez la MFA.
1. Coller le nom de compte dans le champ **Account name** (enlever tout caractère présent avant le véritable nom de connexion de l'utilisateur - i.e. *Contoso:*).
1. Retourner dans le navigateur Internet et copier la valeur de la **Secret key** dans le presse-papier.
1. Retourner dans la fenêtre de l'application **2fast** et coller la clef secrète dans le champ **Secret key**.
1. Cliquer sur le bouton **Create account**.
1. Copier le code à 6 chiffres affiché dans l'application **2fast**.
1. Retourner dans le navigateur Internet et cliquer sur le bouton **Next**.
1. Sur la page **Enter code**, coller le code à 6 chiffres et cliquer sur **next** (si le code/session est périmé, répéter les 2 étapes précédentes).
1. cliquer sur le bouton **Done**.

    > Lors de la première connexion d'un utilisateur, il est possible que vous deviez changer son mot de passe

## Etape 2b : Activer/modifier la MFA pour un compte déjà connecté (ajout d'une application)

1. Lancer un navigateur Internet et se connecter à la page d'informations utilisateur en utilisant le lien suivant : `https://myaccount.microsoft.com/security-info`.  
1. Cliquer sur le bouton "**+ Add sign-in method**
1. Dans la fenêtre "**Add a method**", sélectionner "**Authenticator app**" avant de cliquer sur **Add**.
1. Dans la fenêtre "**Microsoft Authenicator**, cliquez sur le lien "**I want to use a different authenticator app**" avant de cliquer sur **Next**.
1. Sur la page **Scan QR code** page, cliquer sur le bouton **Can't scan image?**.
1. Copier le "Account name" dans le presse-papier.
1. Retourner sur la fenêtre de l'application **2fast**.
1. Sur la page **Accounts**, cliquer sur le bouton *Add* **+** en haut.
1. Sur la page **Input type**, cliquer sur le bouton **Manual input**.
1. Sur la page **Inputs**, choisir un label qui représentera la compte dont vous activez la MFA.
1. Coller le nom de compte dans le champ **Account name** (enlever tout caractère présent avant le véritable nom de connexion de l'utilisateur - i.e. *Contoso:*).
1. Retourner dans le navigateur Internet et copier la valeur de la **Secret key** dans le presse-papier.
1. Retourner dans la fenêtre de l'application **2fast** et coller la clef secrète dans le champ **Secret key**.
1. Cliquer sur le bouton **Create account**.
1. Copier le code à 6 chiffres affiché dans l'application **2fast**.
1. Retourner dans le navigateur Internet et cliquer sur le bouton **Next**.
1. Sur la page **Enter code**, coller le code à 6 chiffres et cliquer sur **next** (si le code/session est périmé, répéter les 2 étapes précédentes).
1. cliquer sur le bouton **Done**.

## Etape 3 : Connexion avec la MFA active

1. Saisir le nom, puis le mot de passe de l'utilisateur à connecter avant de cliquer sur **Sign in**.
1. Lors de l'apparition de la fenêtre de saisie du code, relancer l'application MFa (rechercher `2fast` dans le menu démarrer si nécessaire)
1. Dans l'écran de l'application "**2fast - two factor authenticator**", choisir l'entrée correspondant au compte à connecter et cliquer sur le bouton de copie du code à 6 digits.
1. Retourner dans la fenêtre de connexion de la MFA et coller le code à 6 digits avant de cliquer sur **Verify**.
1. et VOILA : l'utilisateur est désormais connecté...