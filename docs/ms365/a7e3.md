---
layout: stage
title: "Lab7-Ex3 - Fonctionnalités avancées de Microsoft Teams"
length: "00"
date: "10/01/2025"
script: "ms365.js"
---
# Scénario
Dominique souhaite gérer l'accès à *Teams*, spécifiquement l'accès externe et l'accès invité. Elle souhaite bloquer la communication avec les utilisateurs d'un domaine spécifique qui a été source de multiples attaques de spam envers ib Cegos Workshop l'an passé. En même temps, elle souhaite autoriser les communications avec les utilisateurs d'un autre domaine qui est un partenaire clef de ib Cegos Workshop.

# Objectifs
A la fin de cet exercice, vous aurez une meilleure connaissance de :
- Les stratégies d'accès externe et invité dans *Teams*
- Les paramètres globaux du client *Teams*

## Tâche 1 – Gestion de l'accès externe
Grâce à la fonctionnalité d'accès externe, les utilisateurs *Teams* d'autres domaines peuvent participer à des appels et des échanges de messages. Vous pouvez cependant bloquer les utilisateurs de certains domaines.  
Dans le contexte du projet pilote d'ib Cegos Workshop, Dominique Skyetson souhaite bloquer la communication avec tous les domaines Entra Id externes, sauf pour ce qui concerne les utilisateurs de deux entités partenaire de Adatuib Cegos Workshop (microsoft.com et cegos.fr).
1. Sur le portail **Microsoft Teams admin center**, cliquez sur **External access** dans le groupe d'options **Users**.
1. Sur la page **External access**, cliquez sur le menu **Allow all external domains** et sélectionnez **Allow only specific external domains**
1. Pour ajouter le domaine avec lequel la communication est autorisée, cliquez sur le bouton **Add external domains**.
1. Dans le panneau **Add external domain**, saisissez ```microsoft.com``` dans le champ **Domain** avant de cliquer sur **Add**.
1. Dans le panneau **Add external domain**, saisissez ```cegos.fr``` dans le champ **Domain** avant de cliquer sur **Add**.
1. Cliquez sur le bouton **Done** sur le panneau **Add external domain**.
1. Cliquez sur le bouton **Save** en bas de la page **External access**.
1. Dans la boite de dialogue **Changes will take time to take effect**, cliquez sur **Confirm**.

## Tâche 2 – Gestion de l'accès invité
La fonctionnalité d'accès invité de *Teams* permet de géchoisirrer si les utilisateurs d'entités externes peuvent être invités dans l'environnement *Teams* et quelles fonctionnalités sont accessibles à ces utilisateurs invités.  
Dans le contexte du projet pilote ib Cegos Workshop, Dominique Skyetson va maintenant modifier les fonctionnalités disponibles pour les comptes invités.
1. Sur le portail **Microsoft Teams admin center**, cliquez sur **Guest access** dans le groupe d'options **Users**.
1. Dans la fenêtre **Guest access**, assurez-vous que **Guest access** soit sur **On** en tête de formulaire.
1. Parcourez les paramètres de la section **Messaging** pour modifier les valeurs suivantes :
	- **Edit sent messages** : **Off**
	- **Delete sent Messages** : **Off**
	- **Delete chat** : **Off**
	- **Chat** : **On**
	- **Giphy in conversations** : **Off**
	- **Giphy content rating** : **PG (based on GIPHY Content Rating)**
	- **Memes in conversations** : **Off**
	- **Stickers in conversations** : **Off**
	- **Immersive reader for messages** : **On**
1. Cliquez sur le bouton **Save** en bas de page.
1. Dans la boite de dialogue **Changes will take time to take effect**, cliquez sur **Confirm**.

## Tâche 3 – Gestion des paramètres Teams
Le portail d'administration de *Teams* inclut un ensemble de paramètres qui contrôlent la performance du client *Teams*.  
Dominique Skyetson va, pour finir cet atelier, configurer un certain nombre de ces paramêtres choisis par l'équipe projet pilote d'ib Cegos Workshop.
1. Sur le portail **Microsoft Teams admin center**, cliquez sur **Teams settings** dans le groupe d'options **Teams**.
1. Sur la page **Teams settings**, sélectionnez les valeurs suivantes :
	- **Notifications and feeds**
		- Suggested feeds can appear in a user's activity feed: **On**
	- **Tagging**
		- Who can manage tags: **Team owners and members**
		- Team owners can change who can manage tags: **On**
		- Suggested tags: ```Après-vente Fabrication Comptabilitét Interne ``` (Notez qu'il y a un espace après chaque étiquette)
		- Custom tags: **On**
		- Shifts app can apply tags: **Off**
	- **Email integration**
		- Users can send emails to a channel email address: **On**
		- Accept channel email from these SMTP Domains: ```microsoft.com cegos.fr ``` (Notez qu'il y a un espace après chaque domaine)
	- **Files**
		- Citrix files: **On**
		- DropBox: **Off**
		- Box: **Off**
		- Google Drive: **On**
		- Egnyte: **Off**
	- **Organization**
		- Show Organization tab for users : **On**
	- **Devices**
		- Require a secondary form of authentication to access meeting content: **No access**
		- Set content PIN: **Required for outside scheduled meeting**
		- Surface Hub accounts can send emails: **On**
	- **Search by name**
		- Scope directory search using an Exchange address book policy: **On**
	- **Safety and communications**
		- Role-based chat permissions: **Off**
	- **Shared channels**
		- Provide a link to my support request page : **Off**
1. Cliquez sur le bouton **Save.**
1. Dans la boite de dialogue **Changes will take time to take effect**, cliquez sur **Confirm**.
1. Vous poouvez désormais fermer le portail **Microsoft Teams admin center**.

## Résultat
Dans cet atelier, vous avez travaillé sur certains paramètres avançés de *Teams*.

# Fin de l'atelier 7