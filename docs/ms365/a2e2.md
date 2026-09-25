---
layout: stage
title: "Lab2-Ex2 - Création de groupes"
length: "00"
date: "10/01/2025"
script: "ms365.js"
---
# Scénario
Vous avez déjà ajouté plusieurs compte utilisateurs Microsoft 365. Pour poursuivre dans votre rôle d'administration de Dominique Skyetson, vous souhaitez désormais mettre en place la gestion des groupes dans Microsoft 365. Dans cet exercice, vous allez créer de nouveaux groupes et gérer leur contenu, en leur affectant des utilisateurs.  
Vous testerez aussi l'effet d'une suppression de groupe sur les utilisateurs contenus dans celui-ci.

## Tâche 1 - Création de groupes avec le portail d'administration
En tant que Dominique Skyetson, vous souhaitez désormais mettre en oeuvre les groupes Microsoft 365 dans le projet pilote. Dans cette tâche, vous allez ajouter deux groupes de Vente et un groupe du service comptabilité.  
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation de gauche, ouvrez **Teams & groups** pour sélectionner **Active teams & groups**.
1. Cliquez sur le bouton **+ Add a Microsoft 365 group** dans la barre de menu de l'onglet **Teams & Microsoft 365 groups**.
1. Dans la fenêtre **Set up the basics**, entrez ```Inside Sales``` dans le champ **Name** et ```Collaboration group for the Inside Sales users``` dans le champ **Description** avant de cliquer sur **Next**.
1. Dans la fenêtre **Assign owners**, cliquez sur **+ Assign owners** pour afficher la liste des utilisateurs. Sélectionnez **Alan Yoo**, avant de cliquer sur **Add (1)** puis **Next**. 
1. Dans la fenêtre **Add members**, cliquez sur **Next** (vous ajouterez des membres au groupe plus loin dans cette tâche).
1. Dans la fenêtre **Edit settings**, saisissez ```insidesales``` dans le champ **Group email address**.  
1. Après avoir configuré l'adresse email, sous la section **Privacy**, laissez la valeur par défaut à **Public** et cliquez sur **Next**.
1. Dans la fenêtre **Review and finish adding group** , vérifiez votre saisie et si une option a besoin d'être modifiée, cliquez sur l'option **Edit** en regard de celle-ci; sinon, cliquez sur le bouton **Create group** en bas de la page.
1. Sur la page **Inside Sales group created**, un message s'affiche indiquant que l'apparition du groupe dans la liste pourra prendre jusqu'à 5 minutes. Cliquez sur **Close**
1. De retour sur la liste **Active teams and groups**, cliquez sur l'onglet **Security groups**
1. Dans l'onglet **Security groups**, cliquez sur le bouton **+ Add a security group**
1. Dans la fenêtre **Set up the basics**, entrez ```Sales Department``` dans le champ **Name** et ```Sales Department users``` dans le champ **Description** avant de cliquer sur **Next**.
1. Dans la fenêtre **Edit settings**, cliquez simplement sur **Next**.
1. Dans la fenêtre **Review and finish adding group** , vérifiez votre saisie et si une option a besoin d'être modifiée, cliquez sur l'option **Edit** en regard de celle-ci; sinon, cliquez sur le bouton **Create group** en bas de la page.
1. Sur la page **Sales Department group created**, un message s'affiche indiquant que l'apparition du groupe dans la liste pourra prendre jusqu'à 5 minutes. Cliquez sur **Close**
1. Dans la liste **Active teans and groups**, si les deux nouveaux groupes n'apparaissent pas dans leur onglet respectif, utilisez le bouton **Refresh** de la barre de menu au-dessus de la liste jusqu'à ce que les deux groupes apparaissent (il pourra être nécessaire, à plusieurs reprises, d'attendre un moment avant de cliquer sur **Refresh** de nouveau).
1. Vous êtes maintenant prêt à ajouter des membres au groupe de sécurité. Dans la liste des groupes **Teams & Microsoft 365 groups**, sélectionnez le groupe **Inside Sales**, un panneau d'informations sur ce groupe s'ouvre à droite de l'écran.
1. Sur le panneau **Inside Sales**, l'onglet **General** est affiché par défaut. Sélectionnez l'onglet **Membership** et la section **Members**.
1. Dans la section **Members**, vous pouvez voir qu'aucun membre n'est présent. Cliquez sur **Add members**. 
1. Dans la fenêtre **Add group members to Inside Sales**, Cliquez sur le champ **Search by name or email address** et sélectionnez **Ada Russel** dans la liste des utilisateurs actifs.
1. Cliquez de nouveau sur le champ **Search by name or email address** et sélectionnez **Alan Yoo** dans la liste avant de cliquer sur **Add (2)**. 
1. Une fois les 2 membres ajoutés, cliquez sur le **X** en haut à droite pour fermer le panneau.
1. Dans la liste des groupes, changez pour afficher l'onglet **Security groups**.
1. Dans l'onglet **Security groups**, cliquez sur le bouton **+ Add a security group**
1. Dans la fenêtre **Set up the basics**, entrez ```Accounts receivable``` dans le champ **Name** et ```Accounts Receivable department users``` dans le champ **Description** avant de cliquer sur **Next**.
1. Dans la fenêtre **Edit settings**, cliquez simplement sur **Next**.
1. Dans la fenêtre **Review and finish adding group** , vérifiez votre saisie et si une option a besoin d'être modifiée, cliquez sur l'option **Edit** en regard de celle-ci; sinon, cliquez sur le bouton **Create group** en bas de la page.
1. Sur la page **Account receivable group created**, un message s'affiche indiquant que l'apparition du groupe dans la liste pourra prendre jusqu'à 5 minutes. Cliquez sur **Close**
1. Dans l'onglet **Security groups** de la liste, si le groupe Accounts Receivable ne s'affiche pas dans la liste, utilisez le bouton **Refresh**, comme expliqué précédemment jusqu'à ce que le groupe s'affiche.
1. Sélectionnez le groupe **Accounts Receivable**, ce qui affiche un panneau d'informations concernant ce groupe.
1. Dans le panneau **Account Receivable**, cliquez sur l'onglet **Members**.
1. Sur l'onglet **Members**, il y a actuellement 0 propriétaires (*Owners*) et 0 membres (*members*). Sélectionnez **View all and manage owners** pour ajouter un propriétaire au groupe.
1. Dans la fenêtre **Owners**, cliquez sur **+ Add owners**. La liste des utilisateurs actifs s'affiche.
1. Dans la liste des utilisateurs, sélectionnez **Libby Hayward** et cliquez sur **Add (1)**.
1. Une fois que le message vert **Saved** apparait sur le panneau **Owners**, cliquez sur **<-** en haut à gauche pour revenir à l'affichage des informations sur **Accounts Receivable**.
1. Sous la section **Members** de la fenêtre **Accounts Receivable**, sélectionnez le lien **View all and manage members** pour ajouter des membres au groupe. 
1. Dans la fenêtre **Members**, cliquez sur le bouton **+ Add members** : La liste des utilisateurs actifs s'affiche.
1. Dans la liste des utilisateurs, sélectionnez **Adam Hobbs** et **Libby Hayward** puis cliquez sur **Add (2)**.
1. Une fois que le message vert **Saved** apparait sur le panneau **Owners**, cliquez sur le **X** en haut à droite pour fermer le panneau d'informations sur **Accounts Receivable**.
 
## Tâche 2 - Suppression de groupe
Vous souhaitez désormais tester les effets de la suppression d'un groupe.  
1. Basculez sur l'onglet **Teams & Microsoft 365 groups**.
1. Cliquez sur les points de suspension verticaux à droite du groupe **Inside Sales** et cliquez sur **Delete team**. 
1. Dasn la fenêtre **Delete Inside Sales?**, cliquez sur le bouton **Delete team**.
1. Sur la fenêtre **Inside Sales was deleted**, cliquez sur **Close**.
1. Vous voilà de retour sur la liste des **Teams & microsoft 365 groups** dans le portail **Microsoft 365 admin center**. Le groupe **Inside Sales** ne devrait plus apparaitre dans cette liste (utilisez le bouton *refresh* le cas échéant).
1. Pour vérifier si la suppression d'un groupe a eu un impact sur ses membres, dans le menu de navigation à gauche, cliquez sur le choix **Active users** dans le groupe d'options **Users**.
1. Dans la liste des **Active users**, vérifiez que les 2 membres du groupe supprimé, **Ada Russel** et **Alan Yoo**, sont toujours présents dans la liste.
1. Vous venez donc de vérifier que la suppression d'un groupe ne supprime pas ses membres.

## Tâche 3 - Création de groupes avec Windows Powershell
Dans cette tâche, vous allez utiliser Windows Powershell pour créer un groupe et ajouter deux membres à celui-ci.
1. Maximisez l'outil **Windows Powershell ISE** qui devrait être resté ouvert dans la barre des tâches.
1. Dans la partie basse (fond bleu) de l'outil, tapez la commande suivante avant de taper sur **[Entrée]** pour la valider : 
	```$mktGroup = New-MgGroup -DisplayName Marketing -Description 'Marketing department users' -groupTypes unified -MailEnabled -securityEnabled -mailNickName marketing```
1. Utilisez la commande suivante pour ajouter **Catherine** (compte utilisateur créés précédemment et encore référencé par la variable powershell) dans le nouveau groupe **Marketing** :
	```New-MgGroupMember -groupId $mktGroup.Id -DirectoryObjectId $user1.Id```
1. Utilisez la commande suivante pour ajouter le compte de **Tameka** dans le nouveau groupe **Marketing** :
	```New-MgGroupMember -groupId $mktGroup.Id -DirectoryObjectId $user2.Id```
1. Pour vérifier votre mise en oeuvre, vous pouvez utiliser la commande suivante :
	```Get-MgGroupMember -groupId $mktGroup.Id | ForEach-Object {Get-MgUser -UserId $_.Id}```
1. Vérifiez que Catherine Richard et Tameka Reed apparaissent dans la liste des membres du groupe Marketing.

## Résultat
A l'issue de cet exercice, vous avez testé la création, la modification et la suppression de groupes par l'interface administrative de Microsoft 365 et à l'aide de Windows Powershell.

Vous pouvez poursuivre par [l'exercice 3 - Authentification multifactorielle](lab2e3)