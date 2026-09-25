---
layout: stage
title: "Lab6-Ex2 - Gestion des bibliothèques de documents"
length: "00"
date: "10/01/2025"
script: "ms365.js"
---
# Scénario
Dans cet exercice, Dominique Skyetson veut commencer à explorer les bibliothèques de documents *SharePoint Online*. Pour en comprendre le fonctionnement, Dominique va créer une bibliothèque en utilisant le portail *SharePoint Online admin center*.

## Tâche 1 - Créer une bibliothèque de documents dans le SharePoint admin center
Dans cette tâche, vous allez utiliser le portail Sharepoint admin center pour créer une bibliothèque de documents sur le site du service formation de ib Cegos Workshop.
1. Sur la machine LON-CL1, les portails **Microsoft 365 admin center** et **Sharepoint admin center** devraient être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le menu de navigation du **Sharepoint admin center**, cliquez sur le choix **Active sites** dans le groupe d'options **Sites**.
1. Cliquez sur l'url **../sites/Formation** du site Formation de ib Cegos Workshop. Le site **Formation** va s'ouvrir dans un nouvel onglet de votre navigateur.
1. sur la barre de menu du site, cliquez sur **Create** puis **Document library**.
1. Cliquez sur la tuile **Learning** de la section **From Microsoft**.
1. Sur la page **Learning**, cliquez sur le bouton **Use template**.
1. sur le panneau suivant, saisissez les informations suivantes avant de cliquer sur **Create**.
	- **Name** : ```Stages```
	- **Description** : ```Ici seront conservés les documents nécessaires aux stages ib Cegos Workshop```.
1. La nouvelle bibliothèque est affichée et elles est accessible depuis le menu de navigation du site **Formation**.

## Tâche 2 - Chargement de documents dans la bibliothèque
1. Cliquez sur le bouton **+ Create or upload** et sélectionnez **Folder**.
1. Dans le panneau **Create a folder**, saisissez ```CVs``` dans le champ **Name** et choisissez une couleur avant de cliquer sur **Create**
1. Une fois le dossier créé, cliquez sur son nom pour accéder à son contenu.
1. Ouvrez un autre onglet dans votre navigateur Internet et saisissez l'adresse suivante pour télécharger les exemples de cet atelier :
```https://raw.githubusercontent.com/renaudwangler/ib-labs/master/resources/sharepointDocs.zip```
1. Après avoir appuyé sur [entrée], ouvrez le dossier **Downloads** sur LON-CL1 (vous pouvez le faire simplement en cliquant sur l'icône de dossier dans la notification qui apparait en haut à droite de votre navigateur).
1. Faites un clic-droit sur le fichier **SharepointDocs.zip** et cliquez sur **Extract all**.
1. Dans la fenêtre **Extract Compressed (Zipped) Folders, désectionnez la case **Show extracted files when complete** et cliquez sur le bouton **Extract**.
1. Vous pouvez fermer la fenêtre **Extract** de l'explorateur de fichier et revenir sur l'onglet **Formation - CVs** de votre navigateur.
1. Cliquez sur **Create or upload** pour choisir **Files upload**
1. Dans la fenêtre **Open**, ouvrez le dossier **sharepointDocs** dans **Downloads** de LON-CL1 (à l'adresse ```C:\Users\Administrator.ADATUM\Downloads\sharepointDocs```)
1. Sélectionnez tous les (6) fichiers du dossier (en utilisant, par exemple [Ctrl]+Clic) et cliquez sur **Open**
1. attendez que les six fichiers apparaissent dans le dossier **Cvs**.

## Tâche 3 - Ajout de colonnes
1. Dans le menu du dossier **CVs** du site **Formation**, cliquez sur le titre de colonne **Name** et sélectionnez **Column settings** puis **Add a column**.
1. Dans le popup **Create a column**, sélectionnez le type **Text** avant de cliquer sur **Next**.
1. dans le panneau **Create a column** saisissez les informations suivantes avant de cliquer sur le bouton **Save**.
	- **Name** : ```Formateur/trice```
	- **Description** : ```Nom du postulant```
	- **Type** : Single line of text
	- **Default value** : [vide]
	- **Use calculated value** : décochée
1. cliquez de nouveau sur le titre de colonne **Name** et sélectionnez **Column settings** puis **Add a column**.
1. Dans le popup **Create a column**, sélectionnez le type **Choice** avant de cliquer sur **Next**.
1. dans le panneau **Create a column** saisissez les informations suivantes avant de cliquer sur le bouton **Save**.
	- **Name** : ```Validé(e)```
	- **Description** : ```Intervenant validé par ib Cegos Workshop```
	- **Type** : Choice
	- **Choices** :
		- cliquez sur **Choice 1** et saisissez ```Non```. Cliquez sur la palette en bout de ligne et sélectionnez la seconde couleur (**Red**).
		- Cliquez sur **Choice 2** et saisissez ```Oui```
		- Cliquez sur la croix en fin de la ligne **CHoice 3** pour supprimer ce choix.
	- **Can add values manually** : Décochée
	- **Default value** : Non
	- **Use calculated value** : décochée

## Tâche 4 - Edition des informations de la bibliothèque
1. Cliquez sur la case au début de la ligne des titres (avant **Name**) pour sélectionner tous les documents.
1. Cliquez sur l'icone **Details** en fin de la ligne de menu du dossier pour ouvrir le panneau de détails.
1. Sur le panneau **Edit 6 items** qui s'affiche, cliquez sur le dernier champ **Validé(e)** pour sélectionner **Non** avant de cliquer sur **Save**.
1. Cliquez ensuite sur la croix de fermeture en haut à droite du panneau **Edit 6 items** pour le fermer.
1. Déselectionnez l'ensemble des fichiers (à l'aide de la case à cocher de sélection dans la ligne de titres)
1. Cliquez sur les points de suspension en regard du second nom de fichier **Bold food service[...]** pour sélectionner **Details**
1. Sur le panneau de détails qui apparait, Cliquez sur le champ **Formateur/trice** pour y saisir ```Victoria Burke```
1. cliquez sur la valeur **Non** en dessous de **Validé(e)** pour sélectionner **Oui**.
1. Cliquez sur les points de suspension en regard du quatrième nom de fichier **Modern nursing[...]** pour sélectionner **Details**
1. Sur le panneau de détails qui apparait, Cliquez sur le champ **Formateur/trice** pour y saisir ```Kristi Laar```
1. cliquez sur la valeur **Non** en dessous de **Validé(e)** pour sélectionner **Oui**.

## Tâche 5 - Création d'une nouvelle vue
1. Cliquez sur **+ Add view** en fin de la ligne de menu du dossier.
1. Sur la fenêtre **Create view** qui apparaît, saisissez les informations suivantes avant de cliquer sur le bouton **Create** :
	- **Add a view name here** : ```Intervenants validés```
	- **Show as** : List
	- **Make this a public view** : Sélectionnée.
1. Dans cette nouvelle vue, cliquez sur le titre de colonne **Name** pour sélectionner **Column settings** et **Show/Hide columnd**.
1. Dans le panneau **Edit view columns** qui s'affiche, sélectionnez uniquement les colonnes suivantes pour être affichées avant de cliquer sur **Apply**:
	- Type
	- Name
	- Validé(e)
	- Formateur/trice
1. Cliquez sur l'icone **More filters** à la fin du menu de la vue.
1. Dans le panneau **Filters** qui s'affiche, cliquez sur la case **Oui** dans la section **Validé(e)**.
1. Vous pouvez fermer le panneau des filtres.
1. Sur l'affichage des documents, vous ne devriez plus voir que les deux documents marqués *validé*.

## Résultat
Après avoir réalisé cet exercice, vous devriez savoir créer et utiliser des bibliothèques de documents sur Sharepoint Online.

Vous pouvez poursuivre par [l'exercice 3 - Définition des autorisation](lab6e3)