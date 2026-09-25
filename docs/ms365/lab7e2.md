---
layout: stage
title: "Lab7-Ex2 - Gestion des stratégies Microsoft Teams"
length: "00"
date: "10/01/2025"
script: "ms365.js"
---
# Scénario
Une stratégie à l'échelle de l'entreprise, nommée *Global* est créée par défaut et est affectée à tous les utilisateurs de l'entreprise lors de la création du tenant. Dominique a choisi de modifier cette stratégie par défaut.  
Dominique souhaite également utiliser les paramètres des réunions *Teams* pour contrôler si des utilisateurs anonymes peuvent rejoindre les réunions et customiser les messages d'invitation dans ces réunions. Dans le contexte du projet pilote d'ib Cegos Workshop, il lui a été demandé de vérifier les paramètres modifiables concernant ces messages d'invitation. 
Ensuite, Dominique va se pencher sur les stratégies d'appel. Il lui a été demandé de créer une stratégie d'appels pour ib Cegos Workshop. Au lieu de customiser la stratégie globale par défaut, elle suivra le conseil générique et créera sa propre stratégie qui sera utilisée par défaut ensuite par ib Cegos Workshop.  

# Objectifs
A la fin de cet exercice, vous aurez une meilleure connaissance de :
- Les stratégies de réunion *Teams*
- Les stratégies de messages

## Tâche 1 - Gestion de la stratégie globale de réunion
Les stratégies de réunion contrôlent les fonctionnalités disponibles pour les participants dans les réunions *Teams* qui ont été planifiées par les utilisateurs de l'organisation. Une stratégie par défaut pour l'entreprise nommée *Global* a été créée par défaut et elle a été appliquée à tous les utilisateurs de l'organisme. Vous pouvez soit faire des changements à cette stratégie par défaut, soit créer votre propre stratégie spécifique. En créant une stratégie spécifique, il est possible d'autoriser ou d'interdire la disponibilité de certaines fonctionnalités à vos utilisateurs.
Dans le rôle de Dominique Skyetson, vous souhaitez maintenant customiser la stratégie globale des réunions pour l'organisation, comme souhaité dans le cadre du projet pilote de mise en oeuvre de *Teams* chez ib Cegos Workshop.
1. A l'issue de l'exercice précédent, votre session devrait déjà ouverte sur **LON-CL1**, avec le compte **ADATUM\Administrator** et le mot de passe **Pa55w.rd**.
1. Les portails **Microsoft 365 admin center** et **Microsoft Teams admin center** devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Microsoft Teams admin center**,  dans le menu de navigation, cliquez sur **Show All** si nécessaire pour ouvrir le groupe d'options **Meetings** et cliquer sur le choix **Meeting policies**.
1. Descendez dans la fenêtre **Meeting policies** pour cliquer sur le nom de la stratégie **Global (Org-wide default)**.  
1. Dans la fenêtre **Global (Org-wide default)** qui s'affiche, sous la section **Meeting join & lobby**, observez chaque paramètre. Comme ib Cegos Workshop a rencontré des problèmes par le passé avec des invités en accès téléphonique entrant de manière inopinée dans des réunions, il a été demandé de vérifier que l'option **People dialing-in can bypass the lobby** soit sur **Off**.
1. Sous la section **Content Sharing**, observez chaque paramètre. Sur le choix **Screen sharing**, cliquez sur **Entire screen** pour le changer en **Single application**.
1. Toujours sous la section **Content Sharing**, basculez le choix **External participants can give or request control** à **On**.
1. Sous la section **Recording and transcription**, observez chaque paramètre et passez la fonctionnalité de  **Transcription** à **On**.
1. Cliquez sur le bouton **Save** en bas de la page.
1. Cliquez sur le bouton **Confirm** dans la boite de dialogue **Changes will take time to take effect**.

## Tâche 2 – Gestion des paramètres de réunions
Toujours en tant que Dominique Skyetson, Administratrice de l'organisation ib Cegos Workshop, vous allez ici utiliser les paramètres de contrôle des réunions *Teams* pour contrôler si les utilisateurs anonymes peuvent rejoindre des réunions, et customiser les messages d'invitation.
1. sur le portail **Microsoft Teams admin center**, cliquez sur **Meeting settings** dans le groupe d'options **Meetings**.
1. Sur la page **Meetings settings**, dans la section **Email invitation**, Saisissez les informations suivantes :
	- **Logo URL** : ```https://renaudwangler.github.io/ib-pages/logo_ibcegos.png```
	- **Pirvacy and security URL** : ```https://www.ib-formation.fr/informations-legales/cgv```
	- **Help URL** : ```https://adatum.com/joiningmeetinghelp.html```
	- **Footer :** ```Merci de nous faire savoir si vous souhaitez/pouvez participer à cette réunion si possible.```
1. Cliquez sur le bouton **Preview invite**.
1. Sur la boite de dialogue **Email invite preview**, consultez l'aperçu de l'invitation avant de cliquer sur le bouton **Close** pour la fermer.
1. De retour sur la page **Meetings settings**, sous la section **Network**, consultez les paramètres actuels.  
	>**Note :** Si vous aviez besoin de ports réseau spécifiques que votre entreprise utilise pour envoyer et recevoir le flux multimédia, c'est l'endroit où vous pourriez le configurer. Pour les besoins de notre atelier, vous n'avez pas besoin de toucher aux paramètres de cette section. 
1. Cliquez sur le bouton **Save**.
1. Cliquez sur le bouton **Confirm** sur dans la boite de dialogue **Changes will take time to take effect**.

## Tâche 3 – Gestion des stratégies de messages
Les stratégies de messages sont utilisées pour contrôler quelles fonctionnalités de messagerie sont disponibles aux utilisateurs *Teams* dans la messagerie interpersonnelle et dans les canaux d'équipes.    
Dans le contexte de son projet pilote, ib Cegos Workshop demande la création d'une nouvelle stratégie de messages concernant les fonctionnalités dans les messages dans l'environnement *Teams*.
1. sur le portail **Microsoft Teams admin center**, cliquez sur **Messaging policies** dans le groupe d'options **Messaging**.
1. Sur la page **Messaging policies**, constatez que seule la stratégie par défaut **Global (Org-wide default)** existe. Cliquez sur **+ Add** dans la barre de menu au-dessus de la liste de stratégies.
1. Sur la fenêtre **Messaging policies \ Add**, saisissez ```Stratégie de canaux et conversation``` dans le champ **Add a name for your messaging policy** en haut du formulaire.
1. Sélectionnez les valeurs suivantes pour chaque paramètre :
	- **Owners can delete sent messages** : **Off**
	- **Delete sent messages** : **Off**
	- **Users can delete messages sent by bots** : **Off**
	- **Delete chat** : **Off**
	- **Edit sent messages** : **On**
	- **Read receipts** : **Turned on for everyone**
	- **Upload custom emojis** : **Off**
	- **Delete custom emojis** : **Off**
	- **Chat** : **On**
	- **Chat with groups** : **On**
	- **Custom avatars for group chats** : **On**
	- **Giphy in conversations** : **Off**
	- **Giphy content rating** : **PG (Based on the Giphy content rating)**
	- **Memes in conversations** : **Off**
	- **Stickers in conversations** : **Off**
	- **URL previews** : **On**
	- **Report inappropriate content** : **On**
	- **Report a security concern** : **On**
	- **Translate messages** : **On**
	- **Immersive reader for messages** : **On**
	- **Send urgent messages using priority notifications** : **On**
	- **Create voice messages** : **Allowed in chats and channels**
	- **On mobile devices, display favorite channels about recent chats** : **Not enabled**
	- **Remove users from a group chat** : **Off**
	- **Text prediction** : **Off**
	- **Suggested replies** : **On**
	- **Chat permission role** : **Restricted permissions**
	- **Users with full chat permissions can delete any message** : **Off**
	- **Video messages** : **Off**
	- **Priority account chat control** : **Off**
	- **Automatically share files and Loop links with all people in external chats.** : **Not Enabled**
1. Cliquez sur **Save.** 

## Résultat
Dans cet atelier, vous avez travaillé sur diverses stratégies de contrôle de l'environnement *Teams*.

Vous pouvez poursuivre par [l'exercice 3 - Fonctionnalités avancées de Microsoft Teams](lab7e3)