---
layout: stage
title: "Lab3-Ex3 - Pass Through Authentication"
length: "00"
date: "10/01/2025"
script: "ms365.js"
---
# Scénario
Dans cet exercice, vous allez configurer Entra Connect pour l'ouverture de session en mode PTA et pour la jonction de domaine Hybride.  
> La jonction de domaine hybride permet aux ordinateurs de l'entreprise qui ont un compte dans ADDS d'être automatiquement inscrits et reconnus dans Entra Id.  

## Tâche 1 - Configurer la jonction hybride Entra Id et l'authentification PTA
Dans cette tâche, vous allez utiliser l'assistant de configuration de Entra Connect pour activer la jonction hybride des ordinateurs membres de l'ADDS.
1. Basculez sur la machine virtuelle **LON-DC1** sur laquelle vous devriez être resté connecté avec le compte **Administrator**.
1. Sur le bureau, double-cliquez sur l'icône **Azure AD Connect** pour lancer l'outil Entra Connect.
1. Dans la page d'accueil **Welcome to Azure AD Connect**, cliquez sur le bouton **Configure**.
1. Sur la page **Additional tasks**, sélectionnez la ligne **Configure device options** puis cliquez sur **Next**.
1. Sur la page **Overview**, cliquez sur **Next**.
1. Sur la page **Connect to Microsoft Entra ID**, saisissez les informations de connexion de Dominique Skyetson (```dom@[onmicrosoftDomain].onmicrosoft.com``` dans le champ **USERNAME**) puis cliquez sur **Next**.
1. Si une fenêtre **Sign in to your account** surgit, utilisez la pour vous connecter avec le compte de Dominique (```dom@[onmicrosoftDomain].onmicrosoft.com``` dans le champ **Username** et ```ibForm@tion``` dans le champ **Password**).
1. Sur la page **Device options**, sélectionnez **Configure Hybrid Microsoft Entra ID join** et cliquez sur **Next**.
1. Sur la page **Device operating systems**, cochez la case **Windows 10 or later domain-joined devices** et cliquez sur **Next**.
1. Sur la page **SCP configuration**, sélectionnez la case à cocher en regard de **Adatum.com**
	1. Sélectionnez **Microsoft Entra ID** dans le champ **Authentication Service**.
	1. Cliquez sur **Add**.
	1. Dans la boite de dialogue **Enterprise Admin Credentials**, entrez ```ADATUM\Administrator``` dans le champ **Username** et ```Pa55w.rd``` dans le champ **Password**.
	1. Cliquez sur **OK**.
1. De retour sur la fenêtre **SCP configuration**, cliquez sur **Next**.
1. Sur la page **Ready to configure**, cliquez sur le bouton **Configure**.
1. Sur la page **Configuration complete**, cliquez sur **Exit**.
	> **Note :** S'il vous est indiqué que la synchronisation est activée mais n'a pas encore eu lieu, utilisez le bouton **Retry** Pour retenter la configuration. Cet état peut durer un temps important et il est important que la configuration aboutisse complètement pour la suite de vos ateliers.  
1. Sur le bureau, double-cliquez de nouveau sur l'icône **Azure AD Connect** pour lancer l'outil Entra Connect.
1. Dans la page d'accueil **Welcome to Azure AD Connect**, cliquez sur le bouton **Configure**.
1. Sur la page **Additional tasks**, sélectionnez la ligne **Change user sign-in** puis cliquez sur **Next**.
1. Sur la page **Connect to Microsoft Entra ID**, saisissez les informations de connexion de Dominique Skyetson (```dom@[onmicrosoftDomain].onmicrosoft.com``` dans le champ **Username**) puis cliquez sur **Next**.
1. Si une fenêtre **Sign in to your account** surgit, utilisez la pour vous connecter avec le compte de Dominique (```dom@[onmicrosoftDomain].onmicrosoft.com``` dans le champ **Username** et ```ibForm@tion``` dans le champ **Password**).
1. Sur la page **User sign-in**, sélectionnez **Pass-through authentication** , décochez **Ebale single sign-on** et cliquez sur **Next**.
1. Sur la page **Ready to configure**, cliquez sur le bouton **Configure**.
1. Sur la page **Configuration complete**, cliquez sur **Exit**.
1. Basculez sur la machine **LON-CL1**.
1. Sur la mire d'ouverture de session, cliquez sur **Other user** et connectez-vous avec le compte de  ```Beth@[godeployDomain].godeploylabs.com``` et le mot de passe ```Pa55w.rd```.

## Tâche 2 - Affecter des licences
1. Basculez de nouveau sur **LON-DC1**, vous devriez encore être connecté en tant que Dominique Skyetson sur le portail **Microsoft 365 admin center** dans **Edge**.
1. Dans le portail **Microsoft 365 admin center**, naviguez vers la liste des **Active Users** si nécessaire.
1. Dans la liste des **Active users**, dans le champ **Search active users list** entrez ```isaiah``` et appuyez sur **[Entrée]**.
1. Cliquez sur le nom de **Isaiah Langer**.
1. Dans le panneau qui apparait concernant les informations de **Isaiah Langer**, cliquez sur l'onglet **Licenses and apps**.
1. Sur l'onglet **Licenses and apps** de Isaiah Langer, décochez toutes les cases et cliquez sur **Save changes**
1. Dans la liste des **Active users**, dans le champ **Search active users list** entrez ```beth``` et appuyez sur **[Entrée]**.
1. Cliquez sur le nom de **Beth Burke**.
1. Dans le panneau qui apparait concernant les informations de **Beth Burke**, cliquez sur l'onglet **Licenses and apps**.
1. Sur l'onglet **Licenses and apps** de Beth Burke, cochez toutes les cases en regard des licences disponibles et cliquez sur **Save changes**
1. Cliquez sur le **X** en haut à droite pour fermer le panneau d'informations de Beth Burke.

## Tâche 3 - Vérifier la synchronisation des périphériques
1. Sur LON-DC1, dans la fenêtre **Administrator: Windows PowerShell**, Saisissez la commande suivante pour synchroniser l'ADDS :  
   ```Start-AdSyncSyncCycle -PolicyType Delta```
1. Appuyez sur **[Entrée]** pour lancer la commande de synchronisation.
1. De retour dans votre navigateur Internet, dans le portail **Microsoft 365 admin center**, dans le menu de navigation de gauche, cliquez sur **...Show all** pour afficher toutes les options.
1. En bas du menu de navigation, dans la section **Admin centers**, cliquez sur **Identity** pour ouvrir le centre d'administration Entra.
1. Dans le portail **Entra admin center**, dans le menu de navigation à gauche, ouvrez le groupe d'options **Devices** pour sélectionner **All devices**.
1. Dans la fenêtre **Devices - All devices**, vérifiez que **LON-CL1** apparait. Si ce n'est pas le cas, attendez un instant et, au-dessus de la liste des périphériques, cliquez sur le bouton **Refresh** jusqu'à voir apparaitre **LON-CL1**.

## Tâche 4 - Vérifier l'hybridation Entra Id
1. Basculez de nouveau sur la machine **LON-CL1**.
1. Vous devriez toujours être connecté avec le compte de Beth. Pour vous assurer que la jonction hybride soit effective le plus rapidement possible, il vous faut vous déconnecter : faites un clic-droit sur le bouton **Démarrer** et choisissez **Shut down or sign out >** puis **sign out**.
1. Si une liste d'applications ouvertes empêchant la fermeture de session s'affiche, cliquez sur **Sign out anyway**.
1. Sur la mire d'ouverture de session, connectez vous avec le compte de  ```Beth@[godeployDomain].godeploylabs.com``` et le mot de passe ```Pa55w.rd```.
1. Sur la barre des tâches, dans le champ de recherche à droite du bouton Démarrer, tapez ```Windows PowerShell ISE``` et cliquez sur **Windows Powershell (ISE)**.
1. Utilisez la commande suivante pour afficher l'état de la jonction de la machine : ```dsregcmd /status```.
1. Au début du résultat, vous devriez voir **YES** en regard de **AzureADJoined**. Si ce n'est pas le cas, attendez quelques instants avant de réessayer.
1. Fermez la fenêtre **Windows Powershell ISE**.
1. Ouvrez le menu **Démarrer** et cliquez sur l'engrenage **Settings** dans son menu de navigation à gauche.
1. Dans la fenêtre **Windows Settings**, cliquez sur **Accounts**.
1. Cliquez sur l'onglet **Email & accounts**. Vous devriez y voir le compte *Work or school* de Beth (ce constat peut prendre quelques longues minutes... Voire nécessiter de se déconnecter/reconnecter sur LON-CL1).
1. Fermez la fenêtre **Settings** et déconnectez-vous de LON-CL1 avec le compte de beth comme déjà réalisé précédemment.

## Résultat
A l'issue de cet exercice, vous avez vu la procédure permettant de mettre en place la jonction hybride des postes de travail entre ADDS et Entra Id, ainsi que l'authentification PTA.

# Fin de l'atelier 3