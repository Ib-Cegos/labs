---
layout: stage
title: "Lab3-Ex2 - Synchronisation d'objets"
length: "00"
date: "10/01/2025"
script: "ms365.js"
---
# Scénario
Dans cet exercice, vous allez activer la synchronisation entre l'ADDS de *ib Cegos Workshop* et Entra Id. Entra Connect continuera ensuite à synchroniser les changements toutes les 30 minutes.  
Vous allez ensuite utiliser des objets groupes pour faire quelques modifications sur l'ADDS et vérifier l'effet de la synchronisation sur les objets équivalents dans Entra Id.  
>**Important :** En démarrant cet exercice, préparez-vous à réaliser les 3 premières tâches sans délai entre elles pour éviter que Entra Connect ne synchronise automatiquement les changements que vous souhaitez forcer.

## Tâche 1 - Installer Entra Connect
Dans cette tâche, vous allez utiliser l'assistant d'installation de Entra Connect pour activer la synchronisation entre l'ADDS de ICW et Entra Id. Une fois la configuration terminée, le processus de synchronisation démarre automatiquement.
1. Cette manipulation se réalise sur **LON-DC1**, connecté avec le compte **Administrator**.
1. Sur la barre des tâches, cliquez sur l'icône de **Microsoft Edge** et rendez-vous à l'adresse suivante : ```https://entra.microsoft.com```
1. Dans la fenêtre **Sign in**, saisissez le nom de connexion du compte *MOD Administrator* (```admin@[onmicrosoftDomain].onmicrosoft.com```) et cliquez sur **Next**
1. Dans la fenêtre **Enter password**, saisissez ou collez ```[MODPassword]``` et cliquez sur **Sign in**
1. Dans le menu de navigation à gauche, sélectionnez **Entra Connect**.
1. Sur la page **Microsoft Entra Connect - Get started**, cliquez sur l'onglet **Manage** et cliquez ensuite sur le bouton bleu **Download Conect Sync Agent**.
1. Sur le panneau **Download Connect Sync Agent** qui apparait, cliquez sur le bouton **Accept terms & download**
1. Dans la notification en haut à droite (si la notification n'apparaît pas, allez chercher le fichier **AzureADConnect.msi** dans le dossier **Downloads** de LON-DC1), cliquez sur **Open File** sous le nom du fichier téléchargé : **AzureADConnect.msi**.
1. Si une boite de dialogue **Do you want to run this file?** s'affiche, cliquez sur **Run**.
1. L'installation de l'outil Entra Connect a démarré, sur la fenêtre **Welcome to Microsoft Entra Connect**, cochez la case  **I agree to the license terms and privacy notice** avant de cliquer sur **Continue**.
	>**Note :** Si la fenêtre **Welcome to Microsoft Entra Connect** n'apparait pas, cherchez son icône dans la barre des tâches (la plus à droite) et cliquez dessus.
1. Sur la page **Express Settings**, lisez les mentions concernant la synchronisation de la forêt **Adatum** et cliquez sur le bouton **Use express settings**.
1. Sur la page **Connect to Microsoft Entra ID**, saisissez ```dom@[onmicrosoftDomain].onmicrosoft.com``` dans le champ **USERNAME** et cliquez sur **Next**.
1. Sur le panneau **Pick an account**, sléectionnez **dom@[onmicrosoftDomain].onmicrosoft.com** et saisissez ```ibForm@tion``` dans le champ **password** pour cliquer sur **Sign in**.
1. Sur la page **Connect to AD DS** saisissez ```ADATUM\Administrator``` dans le champ **USERNAME**, et ```Pa55w.rd``` dans le champ **PASSWORD** avant de cliquer sur **Next**.
1. Dans la page **Microsoft Entra sign-in configuration**, cochez la case **Continue without matching all UPN suffixes to verified domains** et cliquez sur **Next**.
1. Sur la page **Ready to configure**, vérifiez que la case **Start the synchronization process when configuration completes** soit cochée avant de cliquer sur **Install**.
1. Attendez la fin de la mise en oeuvre de la synchronisation (cela prendra quelques minutes) et cliquez sur **Exit**.

## Tâche 2 - Créer des groupes pour Tester la synchronisation
Vous allez maintenant créer un nouveau groupe de sécurité dans ADDS, le mettre à jour et l'inclure dans un groupe *built-in* de l'ADDS.  
Chaque groupe se verra affecté plusieurs membres. Après la synchronisation forcée, vous vérifierez que le groupe de sécurité est désormais visible dans Entra Id. Vous vérifierez également que le groupe *built-in* n'est PAS visible dans Entra Id, bien qu'il comporte des utilisateurs présents dans l'annuaire.  
> Les groupes *Built-in* sont des groupes prédéfinis dans l'ADDS, situés dans le conteneur système **Builtin**. Ils sont créés nativement lors de l'installation de l'ADDS et n'ont d'utilité que dans la mise ne place de la sécurité de l'ADDDS. N'étant pas utiles dans le cloud, vous vérifierez ici qu'ils n'y sont pas synchronisés.  

1. Si vous aviez fermé l'outil **Server Manager**, réouvrez-le maintenant.
1. Dans l'outil **Server Manager**, cliquez sur le menu **Tools** en haut à droite et lancez le **Active Directory Administrative center**.
1. Vous allez commencer par ajouter des membres dans un groupe *built-in*. Dans la console **Active Directory Administrative Center**, sélectionnez **Adatum (local)**, dans la navigation à gauche.
1. Double-cliquez sur le conteneur **Builtin**. Cela va afficher tous les groupes *built-in* qui ont été créés automatiquement lors de l'installation de l'ADDS.
1. Dans le panneau détail à droite, double-cliquez sur le groupe **Print Operators**.
1. Dans la fenêtre des propriétés de **Print Operators**, choisissez l'onglet **Members**et cliquez sur le bouton **Add**.
1. Dans la boite de dialogue **Select Users, Contacts, Computers, Service Accounts, or Groups**, tapez les noms d'utilisateur suivant dans le champ **Enter the object names to select** :```Ashlee; Juanita; Morgan``` avant de cliquer sur le bouton **OK**.
1. Dans la fenêtre **Print Operators**, cliquez encore sur **OK** pour revenir sur la fenêtre **Active Directory Administrative Center**.
1. Vous allez maintenant créer un groupe de sécurité. Dans l'arborescence de la console, double-cliquez sur **Adatum (local)**.
1. Faites un clic-droit sur l'OU **Research**, choisissez successivement **New >** puis **Group**.
1. Dans la fenêtre **Create Group:** saisissez les informations suivantes :
	- Group name: ```Manufacturing```
	- Group type: **Security**
	- Group scope: **Universal**
1. Basculez sur l'onglet **Members** et répétez les opérations que vous avez faites sur le premier groupe pour ajouter les utilisateurs suivant à ce groupe : ```Bernardo; Charlie; Dawn```.
1. Cliquez sur **OK**.  
 
## Tâche 3 - Modifier des groupes pour Tester la synchronisation 
1. Dans l'outil **Active Directory Administrative Center**, double-cliquez sur **Adatum (local)** puis sur l'OU **Research** dans l'arborescence de la console.
1. Dans le panneau de droite, parcourez la liste des utilisateurs et des groupes pour double-cliquer sur le groupe de sécurité **Research**.
1. Dans la fenêtre de propriétés du groupe **Research**, sélectionnez l'onglet **Members** pour visualiser les membres du groupe.
1. Vous souhaitez supprimer plusieurs membres du groupe : sélectionnez la ligne de **Cai Chu**
1. En maintenant la touche **[Ctrl]**, cliquez sur les lignes de **Shannon Booth** et **Tia Zecirevic**.
1. Une fois les trois utilisateurs sélectionnés, cliquez sur le bouton **Remove**.
1. Vérifiez que les utilisateurs choisis ne sont plus dans la liste des membres et cliquez sur **OK**.
1. Fermez la console **Active Directory Administrative Center**.

## Tâche 4 - Forcer la synchronisation
Dans cette tâche, vous allez forcer volontairement la synchronisation entre l'ADDS et Entra Id, plutôt que d'attendre jusqu'à 30 minutes qu'elle ait lieu. Vous allez utiliser Windows PowerShell pour lancer cette synchronisation.
1. Si la console **Administrator: Windows PowerShell ISE** est toujours ouverte, **vous devez la fermer maintenant**.  
	>**Important :** Le module Powershell n'était pas encore installé lorsque vous avez précédemment lancé la console Windows Powershell ISE: il vous faut donc désormais la relancer pour avoir accès aux commandes de ce module que vous allez utiliser dans cette tâche.
1. Ouvrez l'outil **Windows PowerShell ISE** en administrteur.
1. Dans la fenêtre **Administrator: Windows PowerShell ISE**, utilisez la commande suivante pour lancer la synchronisation : ```Start-ADSyncSyncCycle -PolicyType Delta```
	>**Note :** Le paramètre **Delta** est utilisé pour ne synchroniser que les mises à jour.
1. Une fois la synchronisation lancée, minimisez la console PowerShell (ne la fermez pas) et passez à la tâche suivante.

## Tâche 5 - Résultat de la Synchronisation   
1. Dans votre navigateur, Ouvrez le centre d'administration Microsoft 365 en utilisant l'adresse suivante : ```https://admin.microsoft.com```.
1. Connectez vous avec le compte de Dominique (```dom@[onmicrosoftDomain].onmicrosoft.com``` avec son mot de passe ```ibForm@tion```.
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation à gauche, ouvrez le groupe d'options **Teams & groups** pour sélectionner **Active teams & groups**.
1. Dans la liste **Active teams & groups**, vérifiez qu'un groupe **Manufacturing** apparaît sous l'onglet **Security groups**.
1. Vérifiez que, au contraire le groupe **Print Operators** n'est pas présent.
	>**Note :** Il vous faudra peut-être attendre quelques minutes pour que le groupe **Manufacturing** apparaisse, continuez à rafraichir la liste avec le bouton **Refresh** jusqu'à ce qu'il soit présent.
1.	Dans la liste **Active teams & groups**, sur la ligne du groupe **Manufacturing** vérifiez que la colonne **Sync status** contient une icône **Synced from on-premises**.
	Cliquez sur le groupe **Manufacturing** pour ouvrir son panneau de propriétés.
1. Sur le panneau **Manufacturing**, notez le message indiquant que vous ne pouvez gérer cet objet ici car il a été synchronisé depuis votre ADDS.  
	Cliquez sur l'onglet **Members** et vérifiez que trois utilisateurs sont membres de ce groupe : ceux que vous avez ajouté lors d'une précédente tâche de cet exercice (Bernardo Rutter, Charlie Miller et Dawn Williamson).
1. Fermez le panneau **Manufacturing**.

## Tâche 6 - Résultat de la synchronisation en PowerShell
1. Dans la barre des tâches, cliquez sur l'icône de l'outil **Administrator: Windows PowerSHell ISE** que vous aviez réduit précédemment.
1. Tapez la commande suivante pour vous connecter à Entra Id : ```Connect-MgGraph -scopes User.Read.All,Group.Read.All```.
1. Dans la fenêtre **Pick an Account**, sélectionnez le compte **dom@[onmicrosoftDomain].onmicrosoft.com** et saisissez son mot de passe ```ibForm@tion``` avant de cliquer sur **Sign in**. 
1. Dans la fenêtre **Permission requested**, cochez la case **Consent on behalf of your organization** et cliquez sur **Accept**.
1. Utilisez la commande suivante pour chercher le groupe **Print Operators** :
	```Get-MgGroup -Filter "DisplayName eq 'Print Operators' and MailEnabled eq false"```
1. Vérifiez que la commande ne renvoie pas de réponse, ceci indiquant que le groupe **Print Operators** est introuvable car il n'a pas été synchronisé.
1. Utilisez la commande suivante pour obtenir l'identité du groupe **Manufacturing** :
	```$mktGroup = Get-MgGroup -Filter "DisplayName eq 'Manufacturing' and MailEnabled eq false"```
1. Vous pouvez utiliser la commande suivante pour vérifier si le groupe **Manufacturing** a été trouvé :
	```$mktGroup```
1. Utilisez la commande suivante pour afficher la liste des utilisateurs inclus dans le groupe **Manufacturing** :
	```Get-MgGroupMember -GroupId $mktGroup.Id | ForEach-Object { Get-MgUser -UserId $_.Id} | Out-GridView```
1. Vérifiez que les utilisateurs suivants, que vous aviez ajouté à la tâche précédente sont présents dans la liste affichée avant de la fermer :
	- Bernardo Rutter
	- Charlie Miller
	- Dawn Williamson

1. Utilisez la commande suivante pour obtenir l'identité du groupe **Research** :
	```$resGroup = Get-MgGroup -Filter "DisplayName eq 'Research' and MailEnabled eq false"```
1. Vous pouvez utiliser la commande suivante pour vérifier si le groupe **Research** a été trouvé :
	```$resGroup```
1. Utilisez la commande suivante pour afficher la liste des utilisateurs inclus dans le groupe **Research** :
	```Get-MgGroupMember -GroupId $resGroup.Id | ForEach-Object { Get-MgUser -UserId $_.Id} | Out-GridView```
1. Vérifiez que les utilisateurs suivants, que vous aviez enlevé à la tâche précédente **ne sont pas présents** dans la liste affichée :
	- Cai Chu
	- Shannon Booth
	- Tai Zecirevic

1. Une fois votre vérification effectuée, fermez la fenêtre d'affichage des membres du groupe.

## Résultat
Dans cet exercice, vous avez installé l'outil de synchronisation Entra Connect et utilisé certaines de ses fonctionnalités.

Vous pouvez poursuivre par [l'exercice 3 - Pass Through Authentication](lab3e3)