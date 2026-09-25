---
layout: stage
title: "Lab1-Ex2 - Paramètres d'organisation"
length: "20"
date: "10/01/2025"
script: "ms365.js"
---
# Scénario
En tant que Dominique, il vous a été demandé de configurer le profil de l'entreprise sur le tenant pilote. Dans cet exercice, vous allez procéder à cette configuration.
 
## Tâche 1 - Paramètrage de la distribution d'Office
1. Sur LON-DC1, dans le **Microsoft 365 admin center**, dans le menu de navigation de gauche, cliquez sur **Settings** (il pourra être nécessaire de cliquer sur **Show all**) pour en ouvrir le groupe d'options, puis cliquez sur **Org Settings**.
1. Dans la fenêtre **Org Settings**, c'est l'onglet **Services** qui est affiché par défaut. Puisque vous souhaitez modifier une information pour toute l'entreprise, cliquez sur l'onglet **Organization profile**.
1. Sélectionnez ensuite **Release preferences**.
1. Dans la fenêtre **Release preferences**, sélectionnez **Targeted release for select users** et cliquez sur **Save**.
	> **Note :** Un des avantages de Microsoft 365 est la possibilité de tirer parti des dernières fonctionnalités et mises à jour automatiquement dans votre tenant, ce qui va réduire les couts de maintenance et la surcharge administrative pour une entreprise.
    L'option **Targeted release for select users** vous permet de garder le contrôle des utilisateurs qui auront les mises à jour et nouvelles fonctionnalités en premier, afin de préparer sereinement l'entreprise à l'arrivée de ces nouveautés pour tout le monde.
1. Sous votre choix **Targeted release for select users** S'affichent désormais les possibilités **Select users** et **Upload users** (depuis un fichier CSV). Cliquez sur **Select users**.
1. Dans la fenêtre **Choose users for targeted release**, cliquez dans le champ **Who should receive targeted releases?**. Vous allez ainsi avoir accès à la liste des comptes utilisateurs existant.
1. Dans la liste des utilisateurs, sélectionnez *MOD Administrator* avant de cliquer sur **Save**.
1. Dans la fenêtre **Release preferences** , clique sur le **X** de fermeture en haut à droite.

## Tâche 3 - Customisation de l'apparence
1. De retour sur l'onglet **Organization profile** de la fenêtre **Org settings**, sélectionnez **Custom themes**.
1. Dans la fenêtre **Customize Microsoft 365 for your organization**, cliquez sur **Default theme**
1. Dans la fenêtre **Default theme**, prenez le temps de parcourir les différentes options d'affichage et de branding qui s'offrent à vous. Pour les besoins de l'atelier, n'hésitez pas à modifier quelques paramètres ici pour voir comment ils seront appliqués aux utilisateurs de ICW.
1. Si vous avez fait des changements dans le thème par défaut, cliquez sur **Save** lorsque vous avez terminé. Cliquez ensuite sur le **X** en haut à droite pour fermer la fénêtre **Default theme**.

## Résultat
A l'issue de ce second exercice, vous avez configuré quelques options Microsoft 365 pour toute l'entreprise ICW.  

Vous pouvez poursuivre par [l'exercice 3 - Perrsonnalisation du tenant](lab1e3)