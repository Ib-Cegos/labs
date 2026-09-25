---
layout: stage
title: "Lab8-Ex2 - Publication des labels de sensibilité"
length: "00"
date: "14/02/2025"
script: "ms365.js"
---
# Scénario
Dans cet exercice, vous allez poursuivre la mise en oeuvre de la réponse à la demande du CTO en utilisant les labels d'informations sensibles dans le centre d'administration *Purview* et avec des commandes *Windows Powershell*.

# Objectifs
A la fin de cet exercice, vous aurez une meilleure connaissance de :
- La création de stratégies de publication de labels de sensibilité dans le portail *Purview*.
- La création de stratégies de publication de labels de sensibilité avec *Windows PowerShell.

## Tâche 4 - Publication de labels dans *Purview*
Dans sa découverte des méthodes de travail avec les labels de données sensibles dans Microsoft 365, Dominique souhaite comprendre comment publier ces labels dans le portail *Purview*.
1. Dans le menu de **Microsoft Purview**, cliquez sur **label publishing policies** dans le groupe **Sensitivity labels** de la solution **Information Protection**
1. Sur la page **Label policies**, cliquez sur **Publish label** dans le menu au-dessus de la liste des stratégies de labels.
1. Dans l'assistant **Create policy**, sur la page **Choose sensitivity labels to publish**, cliquez sur le bouton **Choose sensitivity labels to publish**.
1. Dans le panneau **Sensitivity labels to publish** qui s'affiche, cochez la case devant **ICW-Classifié** avant de cliquer sur **Add**.
1. De retour sur la page **Choose sensitivity labels to publish** cliquez sur le bouton **Next**.
1. Sur la page **Assign admin units**, cliquez sur **Next**.
1. Sur la page **Publish to users and groups**, vous allez définir quels utilisateurs et groupes sont légitime à utiliser le label. Notez que le choix sélectionné est sur **All users & groups**, ce qui inclut tous les utilisateurs d'ib Cegos Workshop. Cliquez donc sur **Next**.
1. Sur la page **Policy Settings**, laissez toutes les cases décochées et cliquez sur **Next**.
1. Sur la page **Apply a default label to documents**, cliquez sur **Next**.
1. Sur la page **Default settings for emails**, cliquez sur **Next**.
1. Sur la page **Default settings for meetings and calendar events**, cliquez sur le bouton **Next**.
1. Sur la page **Default settings for Fabric and Power BI content**, cliquez sur **Next**.
1. Sur la page **Name your policy**, saisissez ```ICW-Classifié``` dans le champ **Name** et ```Cette stratégie est utilisée pour les documents sensibles dans le cadre des contrats gouvernementaux``` dans le champ **Description** avant de cliquer **Next**.
1. Sur la page **Review and finish**, révisez votre saisie et, si nécessaire, cliquez sur le lien **Edit** pour la modifier ; sinon, cliquez sur le bouton **Submit** en bas de page.
1. Sur la page **New policy created**, cliquez sur **Done**.

## Tâche 5 - Publication de labels avec *Windows PowerShell*
Dominique a, pour finir, décidé de tester la publication de labels de données sensibles avec *Windows PowerShell*.  
>**Note :** Comme pour les labels précédemment, il serait hors portée de notre stage de réaliser le détail de ces opérations avec *Windows PowerShell*. C'est pourquoi Dominique va se contenter de vérifier la faisabilité de la publication de labels en Powershell...

1. Utilisez son icône sur la barre des tâches pour maximiser la fenêtre **Administrator: Windows PowerShell** que vous aviez utilisée dans l'exercice précédent.
1. Dans la commande de **Administrator: Windows PowerShell**, utilisez la commande suivante pour créer un stratégie de publication de labels nommée *ICW-Secret* :  
	```New-LabelPolicy -Name 'ICW-Secret' -Labels 'ICW-Secret' -Comment 'Cette stratégie est pour l''équipe pilote du projet Microsoft 365, concernant le projet Renouvellement (PRN).' -ModernGroupLocation groupePRN@[onmicrosoftDomain].onmicrosoft.com   -AdvancedSettings @{AttachmentAction = 'Automatic'; DisableMandatoryInOutlook = 'True'}``` 

1. Basculez vers votre navigateur Internet et affichez l'onglet du portail **Microsoft Purview**. Vous devriez être resté sur la page **Label policies**.
1. Dans la liste des stratégies, la stratégie **ICW-Classifié** que vous avez créé dans le portail est affichée. Cliquez sur le bouton **Refresh** dans la barre de menu au-dessus de la liste.
1. Vous devriez désormais trouver dans la liste des stratégies celle nommée **ICW-Secret** que vous venez de créer en PowerShell. 

## Résultat
Dans cet atelier, vous avez créé des stratégies permettant de rendre disponibles les labels de niveau de sensibilité aux utilisateurs de l'environnement ib Cegos Workshop.

# Fin de l'atelier 8