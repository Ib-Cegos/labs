---
layout: stage
title: "Lab9-Ex1 - Etat de santé du service Microsoft 365"
length: "00"
date: "14/02/2025"
script: "ms365.js"
---
# Scénario
Pour conclure le projet pilote d'ib cegos Workshop, Dominique Skyetson souhaite faire le point sur la visibilité de l'état des services Microsoft 365, incluant Office on the web, Engage et le MDM. Après une petite recherche, Dominique a découvert que cette information est directement accessible dans la page *Service Health* sur le portail d'administration Microsoft 365. Ainsi, si ib Cegos Workshop rencontre des problèmes avec l'exploitation d'un service Cloud, Dominique peut vérifier l'état de santé dudit service pour déterminer si le problème est actuel/connu/en cours de résolution avant d'ouvrir un ticket de support chez Microsoft et/ou de passer du temps à résoudre le souci. 

Dans cet exercice, Dominique va visualiser les informations d'état de santé du service et divers rapports depuis le portails Microsoft 365.

# Objectifs
A la fin de cet exercice, vous aurez une meilleure connaissance de :
- La consultation de l'état de santé des services de l'environnement Microsoft 365
- La consultation de rapports depuis les portails d'administration.


## Tâche 1 - Visualiser l'état de santé des services
1. Sur la machine virtuelle **LON-CL1**, les portails **Microsoft 365 admin center** et **Micrsooft Purview** (que vous pouvez désormais fermer) devraient être resté ouverts dans votre navigateur Internet (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le menu de navigation du portail **Microsoft 365 admin center**, sélectionnez **Service health** dans le groupe d'options **Health** (il pourra être utile de cliquer sur **Show all**).
1. Sur la page **Service health** page, si un problème est présent dans la section **Active issues Microsoft is working on**, cliquez sur son titre pour ouvrir un panneau d'information contenant les détails du problème. Consultez les informations détaillées sur le problème, puis fermer le panneau.
1. Sur la page **Service health**, sous la section **Service status**, consultez la liste des services pour voir si certains affichent un problème connu en cours. Essayez, le cas échéant, de faire le lien avec les informations consultées dans le point précédent.
1. Sur la page **Service health**, cliquez sur l'onglet **Issue history**. Un historique des incidents récemment résolus et autres avertissements va s'afficher.
1. Dans le menu de navigation du portail **Microsoft 365 admin center**, sélectionnez **Message center** dans le groupe d'options **Health**.
1. La page **Message Center** affiche une liste de tous les messages en cours (*inbox*) liés à des modifications planifiées et/ou en cours de mise en oeuvre. Sélectionnez un message pour consulter quelques informations sur le changement prévu. N'hésitez pas à consulter n'importe quel message dont le thème vous intéresse.
1. L'onglet **Archive** affiche la liste de changement récent, mais passés. Sélectionnez une entrée de la liste pour avoir plus de détails dessus.
1. Laissez ouvert le navigateur Internet pour la tâche suivante.

## Tâche 2 - Visualiser des rapports

1. Dans le menu de navigation du portail **Microsoft 365 admin center**, cliquez sur le groupe d'options **Reports**.
1. Consultez chacun des 3 types de rapports proposés ici (**Organizational messages**, **Usage** et **Adoption Score**).
1. Microsoft 365 inclut également d'autres types de rapport, qui peuvent être trouvés dans le portail qui les concerne. Par exemple des :
	- Rapports de sécurité sont disponibles dans le portail *Defender*.
		1. Dans le menu de navigation du portail **Microsoft 365 admin center**, cliquez sur le portail **Security** dans la section **Admin centers**.
		1. Dans le portail **Microsoft Defender**, si nécessaire, cliquez (à gauche) sur la flêche **Show navigation**.
		1. En bas du menu de navigation du portail **Defender**, cliquez sur le choix **Reports**.

	- Rapports de flux de messages dans le centre d'administration Exchange.
		1. Dans le menu de navigation du portail **Microsoft 365 admin center**, cliquez sur le portail **Exchange** dans la section **Admin centers**.
		1. Dans le menu de navigation du portail **Exchange**, sélectionnez **Mail flow** dans le groupe d'options **Reports** 

	>**Note :** Dans le contexte de votre atelier, de nombreux rapports contiendront peu ou pas d'information, du fait du peu d'interaction des utilisateurs ib Cegos Workshop avec l'environnement pilote...

## Résultat
A l'issue de cet exercice, vous devriez savoir surveiller l'état de santé des services Microsoft 365 et consulter des rapports depuis le centre d'administration.

Vous pouvez poursuivre par [l'exercice 2 - Dépannage de flux de messages](lab9e2)