---
layout: stage
title: "Lab6-Ex3 - Définition des autorisations"
length: "00"
date: "10/01/2025"
script: "ms365.js"
---

Dans les deux précédents exercices, Dominique Skyetson a configuré les services et les sites *SharePoint Online*. Elle est donc désormais prête à gérer les autorisations et le partage externe dans Sharepoint Online, dans le contexte d'ouverture d'ib Cegos Workshop vers Microsoft 365.  
Les fonctionnalités de partage externe de Sharepoint Online permettent aux utilisateurs d'un organisme de partager du contenu avec des utilisateurs externes à cet organisme (comme des partenaires, vendeurs ou des clients). Le partage externe peut également être utilisé pour faciliter le travail de collaborateurs dont les comptes sont situés dans des *tenant Entra Id* distinct, si votre organisation en regroupe plusieurs.  
Dans cet exercice, Dominique va travailler sur les autorisations du site Formation avant d'autoriser le partage externe au niveau de l'organisation et pour un site spécifique.

# Objectifs
A la fin de cet exercice, vous aurez une meilleure connaissance de :
- La gestion des autorisations dans Sharepoint Online
- La fonctionnalité de partage externe

## Tâche 1 - Configurer des permissions sur les sites
Après avoir ajouté les sites de la formation et de la comptabilité d'ib Cegos Workshop, vous allez configurer des permissions pour le site de la formation. Vous allez affecter le rôle d'administrateur sur le site Formation à Alan Yoo.

1. Sur la machine LON-CL1, les portails **Microsoft 365 admin center** et **Sharepoint admin center** devraient être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*), vous pouvez fermer l'onglet ouvert sur le site **Formation - CVs** pour le moment.
1. Dans le menu de navigation du portail **SharePoint admin center**, cliquez sur **Active sites** dans le groupe d'options **Sites**.
1. Sur la page **Active sites**, constatez que les sites **Comptabilité** et **Formation** apparaissent dans la liste des sites actifs. Cliquez sur le nom du site **Formation**.
	>**Note :** Cliquez sur le nom du site et non sur son adresse *../sites/Formation*.

1. A la création du site **Formation**, Dominique Skyetson a été affecté comme seule administratrice. Vous souhaitez désormais ajouter **Alan Yoo** comme administrateur secondaire.  
	Sur le panneau **Formateur** qui s'affiche à droite de l'écran, sélectionnez l'onglet **Membership**.
1. Sur l'onglet **Membership**, sous la section **Site admins** cliquez sur **+ Add site admins**.
1. Sur la page **Add site admins to training**, tapez ```Alan``` dans le champ **Search by name or email address**. Sélectionnez le compte de **Alan Yoo** lorsqu'il apparaît puis cliquez sur **Add (1)**.
1. Fermez le panneau **Add site admins to Training**.
1. Basculez sur la machine virtuelle **LON-CL2** ou vous devriez encore être connecté avec le compte **.\admin**.
1. Dans le navigateur Edge, le Webmail **Outlook** est resté ouvert (et vous devriez y être connecté avec le compte ```alan@[onmicrosoftDomain].onmicrosoft.com``` et le mot de passe ```ibForm@tion```).
1. Dans la barre d'adresse du navigateur, utilisez l'adresse suivante : ```https://[onmicrosoftDomain].sharepoint.com/sites/Formation``` pour ouvrir le site Sharepoint du service formation de ib Cegos Workshop.
1. Une fois que le site **Formation** s'ouvre, attendez que l'icône d'engrenage s'affiche en haut à droite (à gauche des initiales de Alan Yoo). Cliquez sur cette icône d'engrenage.
1. Sur le panneau **Settings**, cliquez sur **Site permissions**.
1. Sur le panneau **Permissions**, cliquez sur **Advanced permissions settings**.
1. Sur l'onglet **Permissions: Formation**, cliquez sur **Site Collection Administrators** dans la section **Manage** du ruban.
1. Vérifiez que **Alan Yoo** apparaît dans le champ. Vous venez de vérifier que Alan est administrateur du site du service Formation, car il peut accéder aux paramètres administratifs de celui-ci.
1. Fermez l'affichage **Site collection Administrators** mais Conservez votre navigateur Internet ouvert pour la tâche suivante. 

## Tâche 2 - Vérification de l'accès aux sites
Dans cette tâche, Alan Yoo, en tant qu'administrateur du site Sharepoint de la formation va donner l'accès au site du service Formation à deux utilisateurs qui en ont besoin : Libby Hayward et Elvis Cress. Tandis que Libby va demander l'accès au site, Alan sait déjà que Elvis a besoin de l'accès et va lui assigner directement.
1. Sur **LON-CL2**, faites un clic-droit sur l'icône de **Edge** sur la barre des tâches, et dans le menu qui apparaît, choisissez **New InPrivate window**.
1. Dans la nouvelle session **InPrivate Browsing** de votre navigateur Internet, entrez l'adresse suivante pour ouvrir le site Sharepoint du service formation : ```https://[onmicrosoftDomain].sharepoint.com/sites/Formation```.
1. Dans la boite de dialogue **Sign in**, entrez **libby@[onmicrosoftDomain].onmicrosoft.com** et cliquez sur **Next**.
1. Sur la page **Enter password**, saisissez ```Pa55w.rd``` et cliquez sur **Sign in**.
1. SUr la page **Update your password**, saisissez ```Pa55w.rd``` dans le champ **Current password** et ```ibForm@tion``` dans les champs **New password** et **Confirm password** avant de cliquer sur **Sign in**.
1. Sur la page **Stay signed in?**, cliquez sur **Yes**.
1. Une page s'affiche **Access required** qui indique **You need permission to access this site.** Un champ de message est prérempli avec la valeur : **I'd like access, please**.  
	Puisque ce message peut être personnalisé, Libby souhaite saisir un message justifiant pourquoi elle a besoin d'accéder à ce site. Remplacez le message existant par le suivant : ```Bonjour. Je m'appelle Libby Hayward. Je m'occupe du suivi post-formation de nos stagiaires internes et externes en France. J'aurai donc besoin d'accéder à ce site pour pouvoir participer à la vie du service Formation d'ib Cegos Workshop.```
1. Cliquez sur le bouton **Request Access**.
1. Minimisez la fenêtre de navigation privée dans la barre des tâches (sans la fermer) et retournez sur le navigateur Edge ou Alan Yoo est resté connecté.
1. Sur la page du site Sharepoint **Formation**, Cliquez sur l'icône d'engrenage.
1. Sur le panneau **Settings**, cliquez sur **Site contents**.
1. en haut à droite de la page, cliquez sur le bouton **Access requests**.
1. Sur la page **Access Requests**, vérifiez que la demande de Libby Hayward apparaît sous la section **Pending Requests** et cliquez sur les points de suspension à droite de son nom.
1. Cliquez sur le menu **Permission** pour sélectionner **Training Visitors** avant de cliquer sur le bouton **Approve** en regard de la demande de Libby Hayward.
1. Sur la page du site Sharepoint **Formation**, Cliquez sur l'icône d'engrenage pour sélectionner le lien **Site settings**
1. Sur la page **Site Settings**, dans la section **Users and Permissions**, cliquez sur **Site permissions**.
1. Sur l'onglet **Permissions: Formation**, dans la liste des groupes ayant accès au site, sélectionnez **Formation Visitors**.
1. Dans la page **People and Groups - Formation Visitors**, vérifiez que Libby Hayward est bien dans la liste.
1. Vous souhaitez désormais inviter Elvis Cress à devenir membre du site Formation. Dans la barre de menu au-dessus de la liste des utilisateurs, cliquez sur le bouton **New** et choisissez **Add Users**.
1. Sur la boite de dialogue **Share 'Formation'**, l'onglet **Invite People** est affiché par défaut. Dans le champ **Enter names or email addresses**, entrez ```Elvis```. Cliquez sur le compte de **Elvis Cress** lorsqu'il apparaît avant de cliquer sur **Share**.  
	Le nom de Elvis Cress apparaît désormais dans la page **People and Groups - Formation Visitors** au côté de Libby Hayward.
1. Vous allez maintenant vérifier que Libby peut accéder au site Sharepoint du service Formation. Basculez sur la session de navigation privée que vous aviez minimisée.
1. Rafraichissez la page de demande d'accès au site **Formation** (Il sera probablement nécessaire de retaper l'adresse ```https://[onmicrosoftDomain].sharepoint.com/sites/Formation``` pour accéder au site)
1. Le site **Formation** s'ouvre : vous venez de confirmer que Libby peut accéder au site formation d'ib Cegos Workshop suite à l'acceptation de sa demande.
1. Fermez la fenêtre de navigation privée de Libby.
1. Faites de nouveau un clic-droit sur l'icône de **Edge** sur la barre des tâches, et dans le menu qui apparaît, choisissez **New InPrivate window**.
1. Dans la nouvelle sesssion **InPrivate Browsing** de votre navigateur Internet, entrez l'adresse suivante pour ouvrir le site Sharepoint du service formation : ```https://[onmicrosoftDomain].sharepoint.com/sites/Formation```.
1. Dans la boite de dialogue **Sign in**, entrez ```elvis@[onmicrosoftDomain].onmicrosoft.com``` et cliquez sur **Next**.
1. Sur la page **Enter password**, saisissez ```Pa55w.rd``` et cliquez sur **Sign in**.
1. Sur la page **Stay signed in?**, cliquez sur **Yes**.
1. Le site **Formation** s'ouvre, confirmant que Elvis Cress y a accès après qu'Alan, administrateur du site, lui ait donné accès.
1. Fermez la session de navigation privée de Elvis Cress.

## Tâche 3 - Configurer le paramètre de partage global de Sharepoint
1. Basculez vers la machine virtuelle **LON-CL1** ou votre session devrait déjà ouverte, avec le compte **ADATUM\Administrator** et le mot de passe **Pa55w.rd**.
1. Les portails **Microsoft 365 admin center** et **Sharepoint admin center** devraient encore être resté ouverts dans votre navigateur Internet (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le menu de navigation du portail **SharePoint admin center**, sélectionnez **Sharing** dans le groupe d'options **Policies**.
1. Sur la page **Sharing**, cliquez sur la section **More external sharing settings** pour l'ouvrir et vérifiez que la case **Allow only users in specific security groups to share externally** est décochée. Si elle était cochée, décochez-la avant de cliquer sur le bouton **Save** en bas de page.
1. Conservez votre navigateur Internet ouvert pour la tâche suivante.

## Tâche 4 (optionnelle) - Partage externe d'un site Sharepoint Online
1. Dans le menu de navigation du portail **SharePoint admin center**, cliquez sur **Active sites** dans le groupe d'options **Sites**.
1. Sur la liste des sites Sharepoint, cliquez sur le nom du site **Formation** (pas sur son adresse *../sites/Formation*).
1. Sur le panneau **Formation** qui apparaît à droite de l'écran, cliquez sur le dernier onglet **Settings**.
1. Sur l'onglet **Settings**, l'option **Anyone** devrait être sélectionnée par défaut pour le champ **External file sharing**. Si ce n'est pas le cas, changez-la avant de sauvegarder (avec le bouton *Save*) ce changement.
1. Fermez ensuite le panneau **Formation** avec la croix de fermeture en haut à droite.
1. Dans la liste des sites Sharepoint, cliquez désormais sur l'adresse **../sites/Formation** du site du service formation.
1. Un nouvel onglet s'ouvre, affichant le contenu du site **Formation**. En haut de ce nouvel onglet (à droite sous le bandeau *Sharepoint*), cliquez sur **Site access**.
1. dans le panneau **Site access** qui s'affiche, vous pouvez afficher les propriétaires, membres et visiteurs du site. En ouvrant la section **Site visitors - no control**, vous devriez pouvoir vérifier la présence de **Elvis Cress* et **Libby Hayward** ajoutés précédemment.
1. Dans le champ situé au-dessus de ces groupes (sous la mention **Add users, Microsoft 365 groups or \[...]**), entrez une adresse email personnelle (qui n'a pas besoin d'être un compte Microsoft 365). Votre adresse email apparaît ensuite sous le champ en question, vous pouvez cliquer dessus.  
	Votre adresse personnelle apparaît désormais sous le champ, accompagnée d'un message indiquant que cette adresse est en dehors de l'organisation ib cegos Workshop.
1. Dans le champ **Add a message**, saisissez le message suivant : ```Comme convenu, vous pouvez désormais accéder au site Formation de ib Cegos Workshop.```.
1. Cliquez ensuite sur le bouton **Share**.
1. Dans la barre de menu de la page **Formation**, cliquez sur **Stages**.
1. Dans la page **Stages**, cliquez sur le nom du dossier **CVs** pour l'ouvrir.
1. Sélectionnez le bouton **Share this item with other people** qui s'affiche en regard du premier document de la liste.
1. Dans la boite de dialogue **Share "ATS office ...letter.docx"** qui s'affiche, entrez l'adresse de messagerie personnelle que vous avez déjà utilisée au point précédent dans le champ **Add a name, group or email** et saisissez ```Voici le CV que nous avions convenu d'étudier avant validation. Il vous est possible de l'éditer.``` dans le champ **Add a message**.
1. Cliquez sur le bouton **Send**.
1. Fermez la boite de dialogue **Link shared with you** qui s'affiche.

## Tâche 5 (optionnelle) - Vérification du partage externe
1. Ouvrez la boite aux lettres personnelle que vous avez utilisée dans la tâche précédente.
1. Votre boite de réception devrait contenir deux messages d'invitation. Si vous ne les y trouvez pas, vérifiez votre dossier de courrier indésirable.
1. Ouvrez le message qui a pour sujet : **Dominique Skyetson wants to share Formation**.
1. Cliquez sur le lien **Formation** dans le message.
1. Connectez-vous avec les indications qui vous sont fournies (qui vont différer selon que vous ayiez un compte *Entra Id*, un compte personnel Microsoft ou ni l'un ni l'autre) et vérifiez que vous pouvez accéder au site **Formation**
1. Fermez le site **Formation** et retournez dans votre boite aux lettres personnelle pour ouvrir le second message qui devrait avoir pour sujet **Dominique Skyetson shared "ATT office manager cover letter" with you**.
1. Une fois le second message ouvert, vous pouvez cliquer sur le bouton **Open**
	>**Note :** Vous êtes automatiquement redirigé vers Word Online ou s'ouvre le document partagé.
1. Vérifiez que vous pouvez modifier le contenu du document, en surveillant la marque de sauvegarde à droite de son nom après avoir fait quelques modifications dedans.

## Résultat
A l'issue de cet exercice, vous avez une première approche des autorisations dans Sharepoint Online et du partage avec des utilisateurs externes.

Vous pouvez poursuivre par [l'exercice 4 - Fonctionnalités avancées](lab6e4)