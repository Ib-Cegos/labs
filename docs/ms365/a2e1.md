---
layout: stage
title: "Lab2-Ex1 - Création d'utilisateurs"
length: "00"
date: "10/01/2025"
script: "ms365.js"
---
# Scénario
Comme Dominique Skyetson n'a pas de compte utilisateur Microsoft 365 déclaré pour elle-même, elle s'est jusqu'à présent connectée à l'administration du tenant avec le compte *Mod Administrator*.  
Dans cet exercice, elle va se créer son compte et y assigner le rôle *Global Administrator* qui lui permettra ensuite de faire toutes les actions administratives sur le tenant de manière nominative.  
Prenant le rôle de Dominique, vous allez ensuite créer plusieurs comptes utilisateurs en utilisant le centre d'administration 365 que vous serez par la suite amené à ajouter à des groupes pour gérer la sécurité. Bien que les administrateurs de plus haut niveau de l'entreprise ne créent pas habituellement des comptes utilisateurs, il vous est nécessaire de le faire en attendant que la configuration complète du tenant pilote soit terminée et que les comptes soient automatiquement synchronisés (synchronisation mise en place ultérieurement).  
> **Important :** Pour votre environnement réel, il est très fortement conseillé de noter le mot de passe du compte *Global Admin* original (*Mod Administrator* dans notre atelier) et de le stocker de manière particulièrement sécurisée. Ce compte est un compte non nominatif sur lequel il vous faudra peut-être compter lorsque tous les autres moyens de vous en sortir ne fonctionneront plus. Il est donc conseillé de ne jamais l'utiliser au quotidien et de toujours préférer l'utilisation de comptes personnalisés et nominatifs (comme celui de Dominique dans notre atelier).  

## Tâche 1 - Installation du module Windows Powershell pour Entra ID
Dans cette tâche vous allez mettre en place l'environnement permettant la gestion de Microsoft 365 à l'aide de Windows Powershell. Cette installation est longue et la faire immédiatement avant d'en avoir besoin optimisera vos manipulations suivantes.
1. Cette opération se déroule sur la machine **LON-DC1**, connecté avec le compte **Administrator** et le mot de passe **Pa55w.rd**.
1. Dans la zone de recherche en bas à gauche de la barre des tâches, tapez ```powershell```
1. Faites un clic-droit sur **Windows Powershell ISE** et, dans le menu qui apparait, choisissez **Run as administrator**.
	>**Note :** Veillez à bien cliquer sur "**Windows Powershell ISE**" et non "**Windows Powershell ISE (x86)**".  
1. Si une fenêtre **Do you want to allow this app to make changes to your device** apparait, cliquez sur **Yes**.
1. Dans la partie basse (fond bleu) de la fenêtre **Administrator: Windows PowerShell ISE**, tapez ```install-module microsoft.graph -force``` et faites **[Entrée]**.
1. S'il vous est demandé si vous souhaitez faire confiance à **NuGet provider**, tapez **Y** pour répondre oui.
1. S'il vous est demandé de confirmer si vous souhaitez installer les modules depuis la **Powershell Gallery** (PSGallery), tapez **A** pour répondre *Oui à tous*
1. Vous n'avez pas besoin que l'installation des modules soit terminée et que l'ISE vous rende la main pour la tâche suivante, il faudra que cela soit le cas pour la tâche 5 (Vous pouvez vérifier la couleur du bouton **Stop** en haut de l'outil qui doit être repassé au gris, s'il est rouge c'est que le processus d'installation n'est pas encore terminé, il peut se passer quelques minutes pendant lesquelles vous aurez l'impression que plus rien n'évolue... Patience donc...).
1. Vous fermerez la fenêtre **Administrator: Windows Powershell ISE** une fois l'installation terminée.

## Tâche 2 - Création d'utilisateurs par le portail d'administration
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation à gauche, ouvrez le groupe **Users** pour sélectionner l'entrée **Active users**.  
	>Puisque vous prenez le rôle de Dominique Skyetson pour cet exercice, vous allez vous créer un compte utilisateur pour vous-même et lui affecter le rôle *Global Administrator*, donnant ainsi à Dominique l'accès à toutes les prérogatives administratives dans l'environnement Microsoft 365.
1. Dans la fenêtre **Active Users**, cliquez sur **Add a user**.
1. Sur la page **Set up the basics**, saisissez les informations suivantes :
	- First name : ```Dominique```
	- Last name : ```Skyetson``` 
	- Display name : En tabulant dans ce champ, il sera automatiquement rempli avec la valeur ```Dominique Skyetson```.
	- Username : ```dom```  
		>**IMPORTANT :** A droite du champ **Username** se trouve le domaine de l'utilisateur. Il sera rempli avec le domaine DNS configuré comme étant le domaine par défaut. Assurez vous qu'il s'agisse bien du domaine **[onmicrosoftDomain].onmicrosoft.com**.  
		Après avoir configuré ce champ, le nom utilisateur de Dominique devrait apparaitre sous la forme:
		**dom@[onmicrosoftDomain].onmicrosoft.com**  
	- Décochez l'option **Automatically create a password**
	- Password : ```Pa55w.rd``` (Astuce : cliquez sur l'icône d'oeil à droite pour vérifier le mot de passe saisi)
	- Cochez la case **Require this user to change their password when they first sign in** si elle ne l'est pas
1. Cliquez **Next**.
1. Sur la page **Assign product licenses** , saisissez les informations suivantes:
	- Select location : **United States**
	- Licences : Vérifier que l'option **Assign user a product license** est sélectionnée et cochez la case en regard des licences **Microsoft Teams Enterprise** et **Office 365 E5 (no Teams)** 
	>**Note 1:** Si votre tenant de test vous est fourni avec des licences **Microsoft 365 (no Teams)**, il faudra les utiliser en lieu et place des licences **Office 365 (no Teams)** tout au long de ces ateliers.  
	>**Note 2:** Si vous ne pouvez affecter de licence à Dominique car toutes celles de votre tenant de test sont déjà consommées, il vous faudra désassigner les licences **Office 365 (no Teams)** et **Microsoft Teams Enterprise** des utilisateurs "Debra Berger", "Grady Archie", "Irvin Sayers", "Lee Gu" et "Johanna Lorenz" (n'hésitez pas à solliciter votre animateur/animatrice pour vous aider dans cette démarche).  
1. Cliquez sur **Next.**
1. Sur la page **Optional settings**, cliquez sur la ligne **Roles (User : no administration access).**
1. Sélectionnez le bouton radio **Admin center access**. Les rôles les plus souvent affectés vont alors s'afficher.
	>**Note :** Si vous souhaitez affecter un autre rôle qui ne se trouve pas dans cette liste, sélectionnez la ligne **Show all by category** pour afficher l'intégralité des rôles disponibles. Cependant, dans notre cas, Dominique veut s'assigner le rôle Global Administrator. Il peut le faire, étant connecté avec le compte *MOD Administrator*, qui est aussi Global admin. Seul un Global admin peut affecter le rôle Global Administrator à un utilisateur.
1. Sélectionnez **Global Administrator** avant de cliquer sur **Next**.
1. Sur la page **Review and finish** , vérifiez les informations saisies. Si quoi que ce soit nécessite d'être changé, cliquez sur le lien **Edit** correspondant et réalisez les changements nécessaires. Sinon, si tout est correct, cliquez sur **Finish adding**. 
1. Sur la page **Dominique Skyetson added to active users**, cliquez sur **Show** à coté de **Password** pour vérifier que vous avez bien saisi correctement **Pa55w.rd**.
1. En bas de la page, cliquez sur le lien **Add another user** et recommencez les étapes 3 à 12 précédentes, pour ajouter les utilisateurs avec les informations suivantes :
	- **Username domain :** Lors de la saisie du **Username** pour chaque utilisateur, laissez le domaine **[onmicrosoftDomain].onmicrosoft.com** comme nom de domaine par défaut.
	- **Password :** Utilisez le mot de passe ```Pa55w.rd```, et, comme pour le compte de Dominique, exigez le changement de mot de passe à la première connexion.
	- **Licenses :** Affectez les licences **Office 365 E5 (no Teams)** et **Microsoft Teams Enterprise** à l'utilisateur **Alan Yoo**. Pour tous les autres utilisateurs, sélectionner l'option **Create user without product license (not recommended)**.
	- **Roles :** Par défaut chaque utilisateur se verra affecter le rôle **User role (no administration access)**. Ainsi, en arrivant sur la page **Optional settings**, cliquez directement sur **Next**.  

	| **First Name** | **Last Name** | **Display Name** | **username** | **Licence** | **Role** |  
	|----------------|---------------|------------------|--------------|-------------|----------|  
	| ```Alan``` | ```Yoo``` | Alan Yoo | ```alan``` | **Microsoft Teams Enterprise** et **Office 365 E5 (no Teams)** | **User** |  
	| ```Ada``` | ```Russell``` | Ada Russel | ```ada``` | Sans | **User** |  
	| ```Adam``` | ```Hobbs``` | Adam Hobbs | ```adam``` | Sans | **User** |  
	| ```Libby``` | ``` Hayward``` | Libby Haywards | ```libby``` | Sans | **User** |  
	| ```Laura``` | ``` Atkins```| Laura Atkins | ```laura``` | Sans | **User** |  

1. Après avoir ajouté le dernier compte (celui de *Laura Atkins*) cliquez sur le bouton **Close** pour revenir à la liste des **Active users**
1. Vérifiez la liste **Active users**. Vérifiez que chacun des précédents utilisateurs a pour domaine **[onmicrosoftDomain].onmicrosoft.com** et changez-le si ce n'est pas le cas.

## Tâche 3 : Modification d'utilisateurs Microsoft 365
Dans cette tâche, vous allez réaliser quelques actions d'édition de comptes utilisateurs. Vous allez commencer par mettre à jour les informations de contact d'Alan Yoo, avant de l'empêcher de se connecter.  
>Empêcher la connexion d'un utilisateur est un *best practice* lorsque vous pensez que le compte ou le mot de passe d'un utilisateur a pu être compromis. Ceci évite que l'utilisateur puisse se connecter et, de plus, le déconnectera de tous les services Microsoft 365 dans les 60 minutes.  
Vous affecterez également une licence produit au compte de Ada Russell.  

1. Dans le portail **Microsoft 365 admin center**, la page **Active users** devrait être encore affichée à l'issue de la première tâche de cet exercice. Cliquez sur le nom du compte de **Alan Yoo**.
1. Dans la fenêtre **Alan Yoo**, cliquez sur le lien **Manage contact information**.
1. Dans le panneau **Manage contact information** qui apparait pour Alan Yoo, saisissez ```Accounts Receivable``` dans le champ **Department** avant de cliquer sur **Save changes**. 
1. Une fois que le bandeau vert indiquant **Contact information updated** apparait, cliquez sur le **X** de fermeture en haut à droite du panneau **Manage contact information**.
1. Le compte d'Alan Yoo devrait toujours être sélectionné dans la liste **Active Users**. Dans la barre de menu au-dessus de la liste d'utilisateurs, sélectionnez les **points de suspension** (**More actions**). Dans le menu qui apparait, sélectionnez **Edit sign-in status** (le dernier choix du menu).
1. Sur le panneau **Block sign-in**, cochez la case **Block this user from signing in** avant de cliquer sur le bouton **Save changes**. Notez le bandeau vert indiquant que le compte de Alan est désormais bloqué et qu'il sera déconnecté des services Microsoft dans les 30 minutes. Cliquez sur le **X** de fermeture en haut à droite du panneau **Block sign-in**.
1. Dans la liste **Active users**, désélectionnez la case à gauche de **Alan Yoo**, avant de cliquer sur le nom de **Ada Russell**.
1. Pour Ada, vous souhaitez apprendre à affecter une licence à un utilisateur existant. Basculez sur l'onglet **Licenses and apps**.
1. Sur le panneau **Ada Russell** qui s'affiche, dans la liste des licences, cliquez sur les case **Microsoft Teams Enterprise** et **Office 365 E5 (no Teams)** avant de cliquer sur le bouton **Save changes**.  
1. Sélectionnez le **X** en haut à droite pour fermer le panneau d'informations de **Ada Russell**.
1. Dans la liste **Active users**, vous pouvez voir qu'une licence a été affectée au compte de **Ada Russell**.

## Tâche 4 - Vérification des paramètres utilisateurs
Dans cette tâche, vous allez vérifier l'impact des changements que vous avez fait aux comptes utilisateurs dans les tâches précédentes. Vous allez ouvrir une session Microsoft 365 en tant que Alan Yoo, afin de valider si son compte est bien empêché de se connecter. 
1. Vous devez vous déconnecter de Microsoft 365 et vous reconnecter avec le compte de Dominique Skyetson. Sélectionnez le cercle en haut à droite avec **MA** (les initiales de *MOD Administrator*) et cliquez sur **Sign out**.
1. Une fois qu'une invite apparait vous indiquant que vous êtes correctement déconnecté, fermez votre navigateur Internet pour éviter qu'une session soit restée ouverte sur un autre onglet.
1. Dans la barre des tâches, cliquez sur l'icône de **Microsoft Edge** pour relancer une session de navigation et connectez-vous sur le portail Microsoft 365 à l'adresse suivante :  
```https://www.microsoft365.com```
1. Dans la page **Welcome to Microsoft 365**, cliquez sur le bouton **Sign in**.
1. Dans le panneau **Pick an account**, cliquez sur **+ Use another account**.
1. Saisissez **Alan@[onmicrosoftDomain].onmicrosoft.com** dans le champ **Email address** avant de cliquer sur **Next**.
1. Dans la fenêtre **Enter password**, saisissez ```Pa55w.rd``` et cliquez sur **Sign in**.
1. Sur la fenêtre **Pick an account**, constatez qu'un message d'erreur apparait, indiquant que le compte de Alan a été bloqué. Vous venez de vérifier que Alan ne peut plus se connecter à Microsoft 365.
1. Vous allez finalement vous connecter avec votre compte admin de Dominique Skyetson, en utilisant le compte nominatif que vous avez créé dans la première tâche de cet exercice. Dans la fenêtre **Pick an account**, resélectionnez donc **+ Use another account**.
1. Dans la fenêtre **Sign in**, saisissez **dom@[onmicrosoftDomain].onmicrosoft.com** et cliquez sur **Next**.
1. Dans la fenêtre suivante, utilisez le mot de passe ```Pa55w.rd``` et cliquez sur **Sign in**.
1. Dans la fenêtre **Update your password**, saisissez ```Pa55w.rd``` dans le champ **Current password** et saisissez ```ibForm@tion``` dans les champs **New password** et **Confirm password**. Cliquez sur **Sign in**.
	>**Note :** Si une fenêtre vous invite à configurer l'authentification mutlifactorielle, il vous est conseillé de le faire de suite, pour ne plus avoir à vous en préocuper par la suite....
1. Si une fenêtre **Welcome to Microsoft 365** apparait, cliquez deux fois sur la flèche de droite pour accèder à la validation vous permettant de la fermer. 
1. Dans la page d'accueil **Welcome to Microsot 365**, cliquez sur la tuile **Admin** à gauche.
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation à gauche, ouvrez le groupe **Users** pour y sélectionner **Active users**.
1. Dans la lite **Active users** cliquez sur le nom de **Alan Yoo**.
1. Sur le panneau d'informations de **Alan Yoo** qui apparait, notez qu'il vous est indiqué que le compte de Alan est actuellement bloqué, cliquez sur le bouton **Unblock sign-in**.
1. Dans le panneau **Unblock sign-in** qui apparait, la case à cocher **Block this user from signing in** est cochée. Décochez cette case avant de cliquer sur **Save changes**.
1. Une fois le message vert de confirmation apparu indiquant que le compte de Alan Yoo est désormais débloqué, cliquez sur le **X** en haut à droite afin de fermer le panneau **Unblock sign in**.  

## Tâche 5 - Création d'utilisateurs avec Windows Powershell
Vous devriez avoir fermé la fenêtre **Windows Powershell ISE** qui vous a servi à installer le module Graph en début d'exerice. Ouvrez une nouvelle fenêtre Windows Powershell ISE en tant qu'administrateur (cette manipulation est nécessaire).
1. Dans la partie basse (fond bleu) de l'outil, tapez la commande suivante avant de taper sur **[Entrée]** pour la valider : ```Connect-MgGraph -scopes User.ReadWrite.All,Group.ReadWrite.All,Domain.ReadWrite.All,Organization.Read.All,UserAuthenticationMethod.ReadWrite.All```.  
1. Dans la fenêtre **Sign in** qui apparaît, connectez-vous avec le compte de Dominique Skyetson : ```dom@[onmicrosoftDomain].onmicrosoft.com``` et son mot de passe (```ibForm@tion```).  
>**Note :** Si vous rencontrez un problème sur cet atelier avec l'éditeur Powershell ISE (problème de version de l'éditeur dans les machine svirtuelles de l'atelier), vous pouvez raliser ces manipulations dans l'outil ligne de commande "**Windows Powershell**".  
1. Dans la fenêtre **Permission requested**, cochez la case **Consent on behalf of your organization** et cliquez sur **Accept**.
1. Pour être sûr que tous les scripts Windows Powershell puissent s'exécuter correctement, il vous faut désactiver le *garde-fou* des stratégies d'exécution. Pour ce faire, utilisez la commande suivante : ```Set-ExecutionPolicy bypass -force```
	>**Note :** Comme pour les commandes précédentes, il vous faudra taper sur la touche **[Entrée]** pour lancer l'exécution de chaque commande. Nous partirons de ce principe et ne le rappellerons donc plus après chaque commande.
1. Utilisez la commande suivante pour stocker dans une variable le nom du domaine initial de votre tenant :  
	```$tenantId = (get-MgDomain | where IsInitial).id```
	>**Note :** Vous pouvez simplement taper la commande ```$tenantId``` pour afficher le résultat de l'opération précédente avant de passer à la suite.
1. Utilisez désormais la commande suivante pour créer le premier compte utilisateur nommé **Catherine Richard** avec un mot de passe **Pa55w.rd** et un emplacement **CH**. 
	>**Note :** La valeur *False* pour *ForceChangePasswordNextSignIn* signifie que Catherine n'aura pas besoin de modifier son mot de passe lors de sa première connexion.  
	```$user1 = New-MGuser –UserPrincipalName catherine@$tenantId –DisplayName "Catherine Richard" -GivenName Catherine -SurName Richard -PasswordProfile @{password='Pa55w.rd';ForceChangePasswordNextSignIn=$false} -UsageLocation CH -AccountEnabled -MailNickname catherine```
	>**Note :** Vous pouvez simplement taper la commande ```$user1``` pour afficher le résultat de l'opération précédente avant de passer à la suite.
1. La commande suivante va créer un second compte utilisateur pour **Tameka Reed** :
	```$user2 = New-MGuser –UserPrincipalName tameka@$tenantId –DisplayName "Tameka Reed" -GivenName Tameka -SurName Reed -PasswordProfile @{password='Pa55w.rd';ForceChangePasswordNextSignIn=$false} -UsageLocation CH -AccountEnabled -MailNickname tameka```
	>**Note :** Vous pouvez simplement taper la commande ```$user2``` pour afficher le résultat de l'opération précédente avant de passer à la suite.
1. Utilisez la commande suivante pour obtenir la liste des comptes qui n'ont pas de licence associée à leur compte :
	```Get-MgUser -Filter "assignedLicenses/`$count eq 0 and userType eq 'Member'" -ConsistencyLevel eventual -CountVariable unlicensedUserCount -All```
1. Utilisez la commande suivante pour obtenir la licence **Office 365 E5** disponible dans le contexte du projet pilote :
	```$license = Get-MgSubscribedSku|where SkuPartNumber -like *365*```
	>**Note :** Vous pouvez simplement taper la commande ```$license``` pour afficher le résultat de l'opération précédente avant de passer à la suite.
1. Utilisez la commande suivante pour affecter la licence au premier compte utilisateur :
	```Set-MgUserLicense -userId $user1.id -AddLicenses @{SkuId=$license.SkuId} -RemoveLicenses @()```
1. Utilisez la commande suivante pour affecter la même licence au second compte utilisateur :
	```Set-MgUserLicense -userId $user2.id -AddLicenses @{SkuId=$license.SkuId} -RemoveLicenses @()```	

## Tâche 6 - Import d'utilisateurs multiples
Dans cette tâche, vous allez utiliser Windows Powershell pour importer un fichier CSV de nouveaux utilisateurs dans Microsoft 365.  
1. Tapez la commande suivante avant de taper sur **[Entrée]** pour la valider : ```Invoke-WebRequest "https://raw.githubusercontent.com/renaudwangler/ib-labs/master/resources/users.csv" | Select-Object -ExpandProperty Content | Out-File ".\users.csv"```.
1. En utilisant la commande suivante, vous allez pouvoir visualiser le contenu du fichier CSV dans **Notepad** : ```notepad .\users.csv```
1. Dans la fenêtre **users.csv - Notepad** qui s'ouvre, passez en revue les informations présentes pour les utilisateurs.
1. Retournez à **Administrator : Windows Powershell ISE** pour utiliser la commande suivante pour procéder à l'import des utilisateurs contenus dans le fichier :
	```Import-Csv -Path .\users.csv | ForEach-Object {New-MGuser –UserPrincipalName "$($_.FirstName.ToLower())@$tenantId" –DisplayName $_.DisplayName -GivenName $_.LastName -SurName $_.FirstName -PasswordProfile @{password='Pa55w.rd';ForceChangePasswordNextSignIn=$false} -UsageLocation $_.UsageLocation -AccountEnabled -MailNickname $_.FirstName -jobTitle $_.Title -Department $_.department -StreetAddress $_.StreetAddress -City $_.city -PostalCode $_.PostalCode -Country $_.Country}```
1. Constatez le résultat de cette commande : chaque utilisateur est ajouté à l'environnement Microsoft 365 (sans licence affectée cependant).
1. Vous pouvez ensuite utiliser la commande suivante pour obtenir la liste des comptes utilisateurs et constater qu'elle contient désormais les nouveaux utilisateurs importés à l'instant :
	```Get-MgUser```
1. Minimiser l'outil **Administrator : Windows Powershell ISE** et retournez dans votre navigateur Internet.  
	> **Note :** Il est important de ne pas fermer la fenêtre de l'ISE PowerShell pour ne pas perdre la session PowerShell et les variables qu'elle contient.
1. Dans le portail **Microsoft 365 admin center** navigez jusqu'à la liste **Active users**. Jettez un oeil au contenu de cette loste pour vérifier que les utilisateurs importés sont bien présents, ainsir que Catherine Richard et Tameka Reed, que vous avez ajouté précédemment par commandes PowerShell.

## Résultat
A l'issue de ce premier exercice, vous avez créé et géré des comptes utilisateurs ainsi que leurs licences pour les besoins métier de ib Cegos Workshop.

Vous pouvez poursuivre par [l'exercice 2 - Création de groupes](lab2e2)