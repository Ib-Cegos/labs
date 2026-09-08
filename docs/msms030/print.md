---
title: Administration de Microsoft 365
editionDate: 01/09/2026
gitVersion: a4f7da4
editorName: renaudwangler
---

# Administration de Microsoft 365
L'entreprise Adatum héberge actuellement un environnement informatique *classique* (dans ses datacenters) qui comporte diverses applications historiques (comme Microsoft Exchange par exemple). L'entreprise a cependant récemment acquis un abonnement Microsoft 365, y voyant l'opportunité d'un déploiement hybride et d'un rapprochement des applications du Cloud.  

Au fil des ateliers de ce stage, vous allez prendre l'identité de Dominique Skyetson, membre de l'équipe d'administration IT de Adatum.

L'équipe projet de Adatum a décidé de mettre en œuvre Microsoft 365  dans un projet pilote, afin de monter en compétence sur le produit et de voir les besoins métiers qui pourraient être couverts par les produits de l'offre Microsoft 365.
## Sommaire

- Atelier 1 - Découverte du tenant Microsoft 365
    - <a class='ibPrintTocLink' href='#a1e1'>Exercice 1 - Prise en main de l'environnement</a>
    - <a class='ibPrintTocLink' href='#a1e2'>Exercice 2 - Ajout d'un domaine DNS d'entreprise</a>
    - <a class='ibPrintTocLink' href='#a1e3'>Exercice 3 - Visite des portails administratifs 365</a>
- Atelier 2 - Gestion des utilisateurs et des groupes Microsoft 365
    - <a class='ibPrintTocLink' href='#a2e1'>Exercice 1 - Gestion des utilisateurs avec le centre d'administration Microsoft 365</a>
    - <a class='ibPrintTocLink' href='#a2e2'>Exercice 2 - Gestion des stratégies de mots de passe Microsoft 365</a>
    - <a class='ibPrintTocLink' href='#a2e3'>Exercice 3 - Gestion des groupes</a>
    - <a class='ibPrintTocLink' href='#a2e4'>Exercice 4 - Gestion des utilisateurs et des groupes avec Windows PowerShell</a>
    - <a class='ibPrintTocLink' href='#a2e5'>Exercice 5 - Délégation d'administration</a>
- Atelier 3 - Connectivité à Microsoft 365
    - <a class='ibPrintTocLink' href='#a3e1'>Exercice 1 - Utilisation de Microsoft 365 connectivity analyzer</a>
- Atelier 4 - Configuration de la synchronisation d'identités
    - <a class='ibPrintTocLink' href='#a4e1'>Exercice 1 - Préparation de la synchronisation d'identités</a>
    - <a class='ibPrintTocLink' href='#a4e2'>Exercice 2 - Mise en oeuvre de la synchronisation d'identités</a>
    - <a class='ibPrintTocLink' href='#a4e3'>Exercice 3 - Activation de la jonction de domaine hybride</a>
- Atelier 5 - Déploiement de Microsoft 365 Apps
    - <a class='ibPrintTocLink' href='#a5e1'>Exercice 1 - Déploiement de Microsoft 365 apps for enterprise</a>
    - <a class='ibPrintTocLink' href='#a5e2'>Exercice 2 - Déploiement de Microsoft 365 apps via MDM</a>
- Atelier 6 - Configuration des services Exchange Online
    - <a class='ibPrintTocLink' href='#a6e1'>Exercice 1 - Paramètres de transport des messages</a>
    - <a class='ibPrintTocLink' href='#a6e2'>Exercice 2 - Configuration de la protection de la messagerie</a>
    - <a class='ibPrintTocLink' href='#a6e3'>Exercice 3 - Configuration des stratégies d'accès client</a>
- Atelier 7 - Déploiement de Microsoft Teams
    - <a class='ibPrintTocLink' href='#a7e1'>Exercice 1 - Configuration de Microsoft Teams</a>
- Atelier 8 - Configuration de Sharepoint Online
    - <a class='ibPrintTocLink' href='#a8e1'>Exercice 1 - Configuration des paramètres de SharePoint Online</a>
    - <a class='ibPrintTocLink' href='#a8e2'>Exercice 2 - Configuration de sites SharePoint Online</a>
    - <a class='ibPrintTocLink' href='#a8e3'>Exercice 3 - Partage externe dans Sharepoint Online</a>
- Atelier 9 - Autres outils Microsoft 365
    - <a class='ibPrintTocLink' href='#a9e1'>Exercice 1 - Viva Engage</a>
    - <a class='ibPrintTocLink' href='#a9e2'>Exercice 2 - OneDrive for Business</a>
- Atelier 10 - Sécurité et conformité dans Microsoft 365
    - <a class='ibPrintTocLink' href='#a10e1'>Exercice 1 - Création de labels de sensibilité</a>
- Atelier 11 - Surveillance et dépannage de Microsoft 365
    - <a class='ibPrintTocLink' href='#a11e1'>Exercice 1 - Etat de santé du service Microsoft 365</a>
    - <a class='ibPrintTocLink' href='#a11e2'>Exercice 2 - SDépannage de flux de messages</a>

## Conseils génériques

- Les ateliers doivent être réalisés dans l'ordre prévu pour éviter les surprises, avec les exceptions/adaptations suivantes :

    - L'exerice 3 de l'atelier 1 est dispensable
    - L'exercice 2 de l'atelier 2 est dispensable
    - L'atelier 3 est dispensable.
    - Les tâches 2 et 3 de l'atelier 4, exercice 1 sont dispensables
    - Si vous souhaitez maximiser vos chances de constater les résultats de l'atelier 10, vous pouvez le réaliser en avance, car son résultat nécessite un délai d'attente importante.

<!-- IBCAN_PAGE_BREAK|a1e1 --># Atelier 1 - Découverte du tenant Microsoft 365

## Exercice 1 - Prise en main de l'environnement

<div class="ibPrintNotes" data-exercise="a1e1" hidden></div>

Dans ce premier exercice, vous allez commencer par visiter le tenant 365 dans le projet pilote.  
Certaines informations d'identification que vous récupèrerez lors de ce premier exercice seront utilisées dans l'ensemble des ateliers et exercices du stage.  

Vous allez commencer par vous connecter sur la machine **LON-DC1** en utilisant le compte administrateur  **Adatum\administrator**, pour ensuite vous connecter au tenant Microsoft 365 avec le compte **MOD Administrator**. Vous allez ensuite mettre à jour le profil de l'entreprise Adatum.  

#### Avant de commencer

goDeploy, qui héberge l'environnement d'atelier, a déjà créé un tenant Microsoft 365 de test pour vous. Quelques comptes utilisateurs ont aussi été créés dans cet environnement, ainsi que deux comptes administrateur :

- Un compte administrateur du domaine pour l'environnement adatum (adatum\administrator).  
- Un compte administrateur du tenant Microsoft 365 (dont le nom affiché est *MOD Administrator*).  

#### Tâche 1 - Renseignement des variables
Une fois votre atelier démarré, vous pourrez accéder au compte de test Microsoft 365 fourni par goDeploy. Le compte *MOD Administrator* a été créé et s'est vu affecté le rôle *Global Administrator* sur le tenant de test.

Cliquez sur le bouton **Paramètres** au bas de cette page pour renseigner les *variables* qui simpliieront grandement la réalisation de l'ensemble de vos ateliers : Vous allez ainsi pouvoir, par exemple, personnaliser les noms de domaine contenus dans les présentes instruction : 

1. **Préfixe du tenant**. Ce préfixe sera utilisé pour identifier et se connecter avec les comptes Entra Id dans votre tenant. Le format de ce préfixe est de la forme **xxxxxxxx.onmicrosoft.com**. Notez donc la valeur **xxxxxxxx** pour utilisation ultérieure dans tous les ateliers (sa valeur actuelle est "[[onMicrosoftDomain],[wwlxxxxx]]").
1. **Domaine DNS de l'entreprise**. goDeploy a également créé un nom de domaine DNS pour l'entreprise Adatum. Il peut être trouvé sous le nom **Lab Domain** dans l'onglet **DNS** du volet de gauche de votre environnement goDeploy (c'est un nom qui ressemble à *labXXXXX.godeploylabs.com*) (sa valeur actuelle est "[[godeployDomain],[labXXXXX]]").  
1. **Mot de passe de l'administrateur du tenant**. Fourni par goDeploy, c'est le mot de passe du compte *MOD Administrator* et des utilisateurs précréés (sa valeur actuelle est "[[MODPassword],[MOD Admin Password]]").

#### Tâche 2 - Profil d'entreprise de Adatum
A travers les ateliers de ce stage, vous allez prendre l'identité de Dominique Skyetson, administrateur Microsoft 365 de Adatum. En tant que Dominique, il vous a été demandé de configurer le profil de l'entreprise sur le tenant de test. Dans cette tâche, vous allez procéder à cette configuration. Puisque Dominique ne s'est pas encore créé de compte personnel dans l'environnement (ce sera fait à l'atelier suivant), vous allez d'abord vous connecter avec le compte *MOD Administrator*.  

Vous allez, dans un premier temps, constater comment modifier des informations qui concernent tout le tenant : Contact technique, apparence des portails web et canal de mise à jour des fonctionnalités.

1. Lors de l'ouverture de votre environnement d'ateliers, vous devez vous connecter sur la machine virtuelle **LON-DC1**. Si votre environnement s'est ouvert sur une autre machine virtuelle par défaut, basculez sur la machine **LON-DC1**.
1. Connectez-vous sur LON-DC1 avec le compte ```Administrator``` et le mot de passe ```Pa55w.rd```.

    > Si un panneau **Networks** s'affiche sur la droite de votre écran demandant si vous souhaitez activer la découverte sur le réseau, cliquez sur **Yes**.

1. Le **Server Manager** va s'ouvrir automatiquement. Laissez cette fenêtre ouverte mais réduisez-là dans la barre des tâches pour le moment.
1. Sur la barre des tâches, cliquez sur l'icône de **Microsoft Edge**. Passez les éventuelles pages de bienvenue (vous pouvez choisir **Continue without signing in**).
1. Dans le navigateur, accédez au portail d'administration de Microsoft 365 en utilisant l'url `https://admin.microsoft.com`.  

    > Si vous rencontrez des soucis réseau dans les machines virtuelles goDeploy pour vous connecter sur l'environnement Microsoft 365, vous pouvez executer toutes les opérations à faire dans un navigateur Internet sur n'importe quel autre navigateur Internet en local.

1. Dans la fenêtre **Sign in**, saisissez le nom de connexion du compte *MOD Administrator* (```admin@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com```) et cliquez sur **Next**
1. Dans la fenêtre **Enter password**, saisissez ou collez le mot de passe du tenant **```[[MODPassword],[MOD Admin Password]]```** et cliquez sur **Sign in**

    > Depuis Mars 2024, Microsoft, victime de trop d'attaques cyber, impose l'utilisation de la MFA pour tous les contextes professionnels, y-compris pour les tenant de test Microsoft 365 que l'éditeur fournit pour les formations officielles.  
    > Il vous est conseillé de mettre en place la MFA (de préférence avec une application sur votre smartphone) la première fois que cela vous est proposé, pour ne plus avoir à vous en préoccuper par la suite...

1. Sur la fenêtre **Stay signed in?**, cochez la case **Don’t show this again** et cliquez sur **Yes.**
1. Si un popup **Welcome to Microsoft 365** apparaît, cliquez deux fois sur la flèche droite pour pouvoir le fermer.
1. Dans le **Microsoft 365 admin center**, dans le menu de navigation de gauche, sélectionnez **...Show all** pour voir tous les choix dudit menu.

    > Si le menu de navigation n'apparait pas, cliquez sur les trois lignes horizontales en haut à gauche de la fenêtre pour le faire apparaitre.

1. Dans le menu de navigation, cliquez sur **Settings** pour en ouvrir le groupe d'options, puis cliquez sur **Org Settings**.
1. Dans la fenêtre **Org Settings**, c'est l'onglet **Services** qui est affiché par défaut. Puisque vous souhaitez modifier le profil de l'entreprise, cliquez sur l'onglet **Organization profile** pour l'afficher. sélectionnez ensuite **Organization information**.
1. Dans la fenêtre **Organization information** qui s'affiche, modifiez l'information  **Technical contact** avec  l'adresse email du compte *MOD Administrator* : ```admin@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com```.
1. Cliquez ensuite sur **Save**.
1. Une fois les modifications sauvegardées, un message ***Saved*** apparaît en haut de la fenêtre dans un encadré vert. Cliquez sur le **X** tout en haut à droite de la fenêtre **Organization information** pour la fermer.
1. Vous êtes de retour sur l'onglet **Organization profile** de la fenêtre **Org settings**, sélectionnez dès lors **Release preferences**.
1. Dans la fenêtre **Release preferences**, sélectionnez **Targeted release for select users** et cliquez sur **Save**.

	> Un des avantages de Microsoft 365 est la possibilité de tirer parti des dernières fonctionnalités et mises à jour automatiquement dans votre tenant, ce qui va réduire les couts de maintenance et la surcharge administrative pour une entreprise.
    L'option **Targeted release for select users** vous permet de garder le contrôle des utilisateurs qui auront les mises à jour et nouvelles fonctionnalités en premier, afin de préparer sereinement l'entreprise à l'arrivée de ces nouveautés pour tout le monde.

1. Sous votre choix **Targeted release for select users** S'affichent désormais les possibilités **Select users** et **Upload users** (depuis un fichier CSV). Cliquez sur **Select users**.
1. Dans la fenêtre **Choose users for targeted release**, cliquez dans le champ **Who should receive targeted releases?**. Vous allez ainsi avoir accès à la liste des comptes utilisateurs existant.
1. Dans la liste des utilisateurs, sélectionnez *MOD Administrator* avant de cliquer sur **Save**.
1. Dans la fenêtre **Release preferences** , clique sur le **X** de fermeture en haut à droite.
1. De retour sur l'onglet **Organization profile** de la fenêtre **Org settings**, sélectionnez **Custom themes**.
1. Dans la fenêtre **Customize Microsoft 365 for your organization**, cliquez sur **Default theme**
1. Dans la fenêtre **Default theme**, prenez le temps de parcourir les différentes options d'affichage et de branding qui s'offrent à vous. Pour les besoins de l'atelier, n'hésitez pas à modifier quelques paramètres ici pour voir comment ils seront appliqués aux utilisateurs de Adatum.
1. Si vous avez fait des changements dans le thème par défaut, cliquez sur **Save** lorsque vous avez terminé. Cliquez ensuite sur le **X** en haut à droite pour fermer la fénêtre **Default theme**.

#### Tâche 3 - Vérification de la création du tenant
Bien que goDeploy ait initié la création du tenant Microsoft 365 pour Adatum, en tant que Dominique Skyetson, administrateur de Adatum, vous allez vérifier cette création en vous assurant que la boite aux lettres du compte MOD Admin est bien présente dans Exchange Online, afin de pouvoir poursuivre vos tests pour le projet pilote.

1. A la suite de la tâche précédente, vous devriez toujours être connecté sur **LON-DC1** avec le compte **Administrator** et être connecté sur le portail d'administration de Microsoft 365 sous le compte **MOD Administrator**.
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation, sélectionnez le groupe **Users**, puis le choix **Active users**. 
1. Dans la liste **Active users**, vous voyez la liste des utilisateurs qui ont été pré-créés dans le tenant.
1. En bas du menu de navigation, dans la section **Admin centers** section, sélectionnez **Exchange**.
1. Un nouvel onglet s'ouvre dans votre navigateur, affichant le portail **Exchange admin center**. Dans le menu de navigation, ouvrez le groupe **Recipients** pour sélectionner **Mailboxes**.
1. Une liste d'utilisateurs, similaires à celle présentée précédemment sous **Active users** dans le portail **Microsoft 365 admin center** devrait être affichée sur cette page  **Manage mailboxes**.  
1. Dans votre navigateur, fermez l'onglet **Exchange admin center** mais laissez ouvert l'onglet **Microsoft 365 admin center** pour la suite et fin de cet exercice. 

#### Tâche 4 - Vérification du service Microsoft 365
Dans cette tâche, vous allez vérifier l'état de santé du service Microsoft 365 sur votre tenant en prenant connaissance, le cas échéant, de messages de l'éditeur concernant les problèmes en cours sur son environnement cloud.

1. A la suite de la tâche précédente, vous devriez toujours être connecté sur **LON-DC1** avec le compte **Administrator** et être connecté sur le portail d'administration de Microsoft 365 sous le compte **MOD Administrator**.
1. Dans le portail **Microsoft admin center**, dans le menu de navigation, ouvrez le groupe **Health** pour choisir l'option **Service health**. Cela fait apparaitre le dashboard **Service health**.
1. Sur la page **Service health**, l'onglet **Overview** est affiché apr défaut. Cet onglet affiche les problèmes concernant actuellement les services Microsoft 365 disponibles avec vos abonnements.

	> Si aucun problème n'est actuellement listé, vous pouvez toujours cliquer sur l'onglet **Issue history** pour réaliser l'opération suivante.

1. Cliquez sur une ligne représentant un problème pour observer le détail des informations fournies par l'éditeur sur ce problème et son état actuel de prise en charge et/ou de résolution.
1. Après avoir observé les détails d'un problème, cliquez sur le **X** en haut à droite pour le fermer et n'hésitez pas à aller en observer d'autres.

<!-- IBCAN_PAGE_BREAK|a1e2 --># Atelier 1 - Découverte du tenant Microsoft 365

## Exercice 2 - Ajout d'un domaine DNS d'entreprise

<div class="ibPrintNotes" data-exercise="a1e2" hidden></div>

Adatum a acheté un nouveau nom de domaine DNS pour son projet pilote (fourni par goDeploy) qui soit utilisable sur Internet.

Adatum gère directement les enregistrements de ses domaines DNS. Pour que ce domaine soit utilisable sur le tenant, il va vous falloir passer par un assistant de configuration et créer les enregistrements DNS attendus. C'est ce que vous allez réaliser dans ce second exercice.

#### Avant de commencer

dans votre environnement d'atelier, goDeploy vous fournit un nom de domaine DNS d'entreprise pour le projet pilote. Vous pouvavez déjà identifié ce nom de domaine en tête de l'onglet **DNS** dans l'environnement d'atelier.

#### Tâche 1 - Ajout du DNS d'entreprise
Dans cette tâche vous allez ajouter le domaine DNS d'entreprise à votre tenant Microsoft 365, en créant les enregistrements nécessaires pour les services Exchange Online et Intune.

1. A l'issue du précédent exercice, vous devriez être connecté sur **LON-DC1** avec le compte **Administrator**.
1. Dans votre navigateur Internet, vous devriez toujours être sur le portail **Microsoft 365 admin center**, connecté avec le compte *MOD Administrator*.
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation, vous avez déjà ouvert le groupe **Settings** pour l'exercice précédant. Pour ajouter le domaine d'entreprise, cliquez sur **Domains** dans ce groupe. 
1. Sur la page **Domains**, vous devriez voir apparaitre le domaine par défaut, créé avec votre tenant ( [[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com ).
1. Cliquez sur **+ Add domain** pour ouvrir la page **Add a domain**.
1. Sur la page **Add a domain**, saisissez le **nom DNS d'entreprise** (`[[godeployDomain],[labXXXXX]].godeploylabs.com`) dans le champ **Domain name** avant de cliquer sur le bouton **Use this domain**.
1. Sur la page **Verify you own your domain**, sélectionnez l'option **Add a TXT record to the domain's DNS record** et cliquez sur **Continue**.
1. Sur la page **Add a record to verify ownership**, prenez note de la valeur mentionnée après **TXT value**. Elle devrait ressembler à *MS=msXXXXXXXX* (Vous pouvez utiliser le bouton "Notes" du présent cahier d'atelier pour conserver cette information).
1. Dans l'environnement d'atelier, ouvrer l'onglet **DNS** et cliquez sur **Add New +** dans la section **TXT Records**
1. Dans la fenêtre **Add DNS TXT Record**, tapez **```@```** dans le champ **Name** et la valeur notée précédemment dans le champ **Value** avant de cliquer sur **Save**.
1. De retour dans la machine virtuelle **LON-DC1**, Sur la page **Add a record to verify ownership**, cliquez sur le bouton **Verify**.
1. Sur la page **How do you want to connect to your domain ?**, sélectionnez **More options**. Deux options s'affichent : **Add your own DNS records**, et **Skip and do this later (not recommended)**. L'option **Add your own DNS records** est sélectionnée par défaut, cliquez sur le bouton **Continue** pour ouvrir la page **Add DNS records**.
1. La page **Add DNS records** identifie les services qu'une entreprise peut implémenter dans le contexte de son déploiement Microsoft 365 et qui ont besoin d'enregistrements DNS. L'option **Exchange and Exchange Online Protection** devrait être sélectionnée par défaut (sinon, sélectionnez là).
1. Trois enregistrements DNS sont nécessaires pour les services Exchange - un enregistrement **MX** , un alias **CNAME**, et un enregistrement **TXT**. Sélectionnez chaque enregistrement pour l'ouvrir et prendre note de son contenu à créer.  

    - MX pointe vers `[[godeployDomain],[labXXXXX]]-godeploylabs-com.mail.protection.outlook.com` avec préférence de **0**  
    - CNAME associe `autodiscover` à `autodiscover.outlook.com`  
    - TXT contient `v=spf1 include:spf.protection.outlook.com -all`

1. Plus bas dans la page **Add DNS records** cliquez sur **Advanced Options**.
1. Deux services additionnels sont affichés ici : **Intune and Mobile Device Management for Microsoft 365** et **DomainKeys Identified Mail (DKIM)**.  
1. Sélectionnez la case à cocher en regard du premier, cela va faire apparaître un ensemble d'enregistrements DNS à créer.

1. Notez que deux alias CNAME sont nécessaires au fonctionnement correct de **Intune and Mobile Device Management for Microsoft 365**. Sélectionnez **CNAME Record (2)** pour les afficher et prenez bonne note de leur contenu.  

    - CNAME associe `enterpriseregistration` à `enterpriseregistration.windows.net`  
    - CNAME associe `enterpriseenrollment` à `enterpriseenrollment-s.manage.microsoft.com` (selon les tenants, peut aussi être associé à `enterpriseenrollment.manage.microsoft.com`).  

1. Retournez dans l'onglet **DNS** de votre environnement d'atelier et créez-y tous les enregistrements DNS nécessaires pour le tenant du projet pilote.

    > Voici un exemple d'onglet DNS contenant les enregistrements nécessaires créés pour vous aider : il vous faudra cependant remplacer la mention labXXXXXX par votre nom DNS d'entreprise ([[godeployDomain],[labXXXXX]]):  
    >
    >![msms030fr DNS Sample](../resources/DNS-Sample.png)

1. De retour dans la machine virtuelle **lon-DC1**, cliquez sur le bouton **Continue**. A ce moment, l'assistant de création du domaine va vérifier que tous les enregistrements DNS nécessaires ont correctement été créés.
1. Si tous les enregistrements DNS attendus ont été correctement crées, la page **Domain setup is complete** devrait apparaître (Dans le cas contraire, merci de vérifier les enregistrement DNS manquant/erronés indiqués sur la page **Add DNS records** qui s'est réaffichée, avant de cliquer de nouveau sur **Continue**). Cliquez sur **Done**.
1. Vous allez être renvoyé vers la page **Domains** dans laquelle la colonne **status** pour votre DNS d'entreprise ([[godeployDomain],[labXXXXX]].godeploylabs.com) devrait afficher **Healthy**.

<!-- IBCAN_PAGE_BREAK|a1e3 --># Atelier 1 - Découverte du tenant Microsoft 365

## Exercice 3 - Visite des portails administratifs 365

<div class="ibPrintNotes" data-exercise="a1e3" hidden></div>

Maintenant que le tenant du projet pilote 365 de Adatum est complètement créé, vous pouvez commencer à utiliser l'environnement Microsoft 365. Dans cet exercice, vous allez visiter divers portails administratifs les plus utiles pour le quotidien d'un administrateur 365 afin de commencer à vous familiariser avec leur contenu et leur navigation.

Dans les exercices précédents, vous avez accédé aux portail 365 depuis un contrôleur de domaine (LON-DC1). La création du tenant étant désormais actée, il semble plus judicieux à Dominique Skyetson d'accéder aux outils d'administration depuis sa machine d'administrateur LON-CL1.

Vous allez donc commencer par vous connecter sur la machine cliente **LON-CL1** en utilisant le compte administrateur local **Adatum\administrator** pour ensuite vous connecter au tenant Microsoft 365 avec le compte **MOD Administrator**.

#### Tâche 1 - Visite du Microsoft 365 admin center
Bien que vous ayez déjà accédé au portail général d'administration *Microsoft 365 admin center* dans les exercices précédents, vous allez désormais découvrir quelques fonctionnalités complémentaires de ce portail : commencez donc par vous y connecter !

1. Basculez vers la machine virtuelle **LON-CL1**.
1. Connectez-vous à la machine LON-CL1 avec le compte **```adatum\Administrator```** et le mot de passe **```Pa55w.rd```**. 

    > Si un panneau **Networks** s'affiche sur la droite de votre écran demandant si vous souhaitez activer la découverte sur le réseau, cliquez sur **Yes**.

1. Sur la barre des tâches, cliquez sur l'icône de **Microsoft Edge** pour lancer votre navigateur. Maximisez la fenêtre du navigateur lorsqu'elle s'ouvre.
1. Dans votre navigateur, rendez-vous sur le portail d'administration **Microsoft 365 admin center** en utilisant l'url `https://admin.microsoft.com/`
1. Dans la fenêtre **Sign in**, saisissez le nom de connexion du compte *MOD Administrator* (sous la forme `admin@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com`) et cliquez sur **Next**
1. Dans la fenêtre **Enter password**, saisissez ou collez le mot de passe du tenant ([[MODPassword],[MOD Admin Password]]) et cliquez sur **Sign in**
1. Sur la fenêtre **Stay signed in?**, cochez la case **Don’t show this again** et cliquez sur **Yes.**
1. Si un popup **Welcome to Microsoft 365** apparaît, cliquez deux fois sur la flèche droite pour pouvoir le fermer.
1. Dans le premier exercice, vous avez déjà été voir la liste des utilisateurs déclarés (**Active Users**). Vous allez désormais poursuivre votre exploration en regardant la liste des groupes présents dans l'environnement. Dans le menu de navigation à gauche, ouvrez le groupe **Teams & Groups** pour sélectionner l'option **Active teams & groups**... 
1. Dans le menu de navigation, cliquez sur **...Show all** pour afficher toutes les options de ce menu. 
1. Dans le menu de navigation, ouvrez le groupe **Health** afin de sélectionner le **Message center**.
1. Dans la page **Message center**, l'onglet **Inbox** est affiché par défaut. Parcourez-en les messages. Si un message en particulier vous intéresse, cliquez dessus pour en ouvrir le détail. Cela va ouvrir un panneau à droite de la page qui affiche tous les détails concernant le message choisi. Après avoir fini de consulter les détails de ce message, cliquez sur le **X** tout en haut à droite pour fermer le panneau de détails.

#### Tâche 2 - Visite du Exchange admin center

Sans prendre trop de temps (vous y reviendrez plus tard dans ce stage), vous allez vous connecter sur le portail d'administration de Exchange Onine, pour consulter les rubriques qu'il présente.

1. Suite à la tâche précédente, vous devriez toujours être connecté à **LON-CL1** et votre navigateur Internet devrait être ouvert sur le **Microsoft 365 Admin Center**, connecté en **MOD Administrator**. Dans le menu de navigation, dans la section **Admin centers**, cliquez sur **Exchange**. Un nouvel onglet va s'ouvrir, affichant le portail **Exchange admin center**.
1. Parcourez le **Exchange admin center**, en sélectionnant chaque entrée de son menu de navigation. Consultez les informations disponibles pour chaque entrée et parcourez les onglets (le cas échéant).
1. Une fois terminée votre visite du *Exchange admin center*, fermez l'onglet du navigateur dans lequel vous l'avez ouvert (laissez le navigateur et les autres onglets ouverts).

#### Tâche 3 - Visite du Teams admin center

Sans prendre trop de temps (vous y reviendrez plus tard dans ce stage), vous allez vous connecter sur le portail d'administration de Teams, pour consulter les rubriques qu'il présente.

1. Suite à la tâche précédente, vous devriez toujours être connecté à **LON-CL1** et votre navigateur Internet devrait être ouvert sur le **Microsoft 365 Admin Center**, connecté en **MOD Administrator**. Dans le menu de navigation, dans la section **Admin centers**, cliquez sur **Teams**. Un nouvel onglet va s'ouvrir, affichant le portail **Microsoft Teams admin center**.
1. Parcourez le **Microsoft Teams admin center**, en sélectionnant chaque entrée de son menu de navigation. Consultez les informations disponibles pour chaque entrée et parcourez les onglets (le cas échéant).
1. Une fois terminée votre visite du *Microsoft Teams admin center*, fermez l'onglet du navigateur dans lequel vous l'avez ouvert (laissez le navigateur et les autres onglets ouverts).

#### Tâche 4 - Visite du SharePoint admin center

Sans prendre trop de temps (vous y reviendrez plus tard dans ce stage), vous allez vous connecter sur le portail d'administration de Sharepoint Onine, pour consulter les rubriques qu'il présente.

1. Suite à la tâche précédente, vous devriez toujours être connecté à **LON-CL1** et votre navigateur Internet devrait être ouvert sur le **Microsoft 365 Admin Center**, connecté en **MOD Administrator**. Dans le menu de navigation, dans la section **Admin centers**, cliquez sur **Sharepoint**. Un nouvel onglet va s'ouvrir, affichant le portail **Sharepoint admin center**.
1. Parcourez le **Sharepoint admin center**, en sélectionnant chaque entrée de son menu de navigation. Consultez les informations disponibles pour chaque entrée et parcourez les onglets (le cas échéant).
1. Une fois terminée votre visite du *Sharepoint admin center*, fermez l'onglet du navigateur dans lequel vous l'avez ouvert (laissez le navigateur et les autres onglets ouverts).

#### Tâche 5 - Visite de Microsoft 365 Defender

Sans prendre trop de temps (vous y reviendrez plus tard dans ce stage), vous allez vous connecter sur le portail d'administration de la sécuité, Microsoft Defender, pour consulter les rubriques qu'il présente.

1. Suite à la tâche précédente, vous devriez toujours être connecté à **LON-CL1** et votre navigateur Internet devrait être ouvert sur le **Microsoft 365 Admin Center**, connecté en **MOD Administrator**. Dans le menu de navigation, dans la section **Admin centers**, cliquez sur **Security**. Un nouvel onglet va s'ouvrir, affichant le portail **Microsoft 365 Defender**.
1. Parcourez le **Microsoft 365 Defender**, en sélectionnant chaque entrée de son menu de navigation. Consultez les informations disponibles pour chaque entrée et parcourez les onglets (le cas échéant).
1. Une fois terminée votre visite du *Microsoft 365 Defender*, fermez l'onglet du navigateur dans lequel vous l'avez ouvert (laissez le navigateur et les autres onglets ouverts).

#### Tâche 6 - Visite de Microsoft Purview

Sans prendre trop de temps (vous y reviendrez plus tard dans ce stage), vous allez vous connecter sur le portail d'administration de la conformité, Microsoft Purview, pour consulter les rubriques qu'il présente.

1. Suite à la tâche précédente, vous devriez toujours être connecté à **LON-CL1** et votre navigateur Internet devrait être ouvert sur le **Microsoft 365 Admin Center**, connecté en **MOD Administrator**. Dans le menu de navigation, dans la section **Admin centers**, cliquez sur **Microsoft Purview**. Un nouvel onglet va s'ouvrir, affichant le portail **Microsoft Purview**.
1. Parcourez le **Microsoft Purview**, en sélectionnant chaque entrée de son menu de navigation. Consultez les informations disponibles pour chaque entrée et parcourez les onglets (le cas échéant).
1. Une fois terminée votre visite du *Microsoft Purview*, fermez l'onglet du navigateur dans lequel vous l'avez ouvert (laissez le navigateur et les autres onglets ouverts).

<!-- IBCAN_PAGE_BREAK|a2e1 --># Atelier 2 - Gestion des utilisateurs et des groupes Microsoft 365

## Exercice 1 - Gestion des utilisateurs avec le centre d'administration Microsoft 365

<div class="ibPrintNotes" data-exercise="a2e1" hidden></div>

Dominique Skyetson est l'administrateur de l'entreprise Adatum. Comme il n'a pas de compte utilisateur Microsoft 365 déclaré pour lui-même, Dominique s'est jusqu'à présent connecté à l'administration du tenant avec le compte *Mod Administrator*. Dans cet exercice, il va se créer son compte et y assigner le rôle *Global Administrator* qui lui permettra ensuite de faire toutes les actions administratives sur le tenant de manière nominative.

Prenant le rôle de Dominique, vous allez ensuite créer plusieurs comptes utilisateurs en utilisant le centre d'administration 365 que vous serez par la suite amené à ajouter à des groupes pour gérer la sécurité. Bien que les administrateurs de plus haut niveau de l'entreprise ne créent pas habituellement des comptes utilisateurs, il vous est nécessaire de le faire en attendant que la configuration complète du tenant pilote soit terminée et que les comptes soient automatiquement synchronisés.  

> Pour votre environnement réel, il est très fortement conseillé de noter le mot de passe du compte *Global Admin* original (*Mod Administrator* dans notre atelier) et de le stocker de manière particulièrement sécurisée. Ce compte est un compte non nominatif sur lequel il vous faudra peut-être compter lorsque tous les autres moyens de vous en sortir ne fonctionneront plus. Le mot de passe de ce compte sera potentiellement partagé par plusieurs personnes, en faisant une cible idéale pour les attaques de sécurité. Il est donc conseillé de ne jamais l'utiliser au quotidien et de toujours préférer l'utilisation de comptes personnalisés et nominatifs (comme celui de Dominique dans notre atelier).

Dans le contexte de l'atelier, vous activerez la MFA pour le compte de Dominique dans le prochain exercice au cours duquel vous vous occuperez des stratégies de mots de passe.

#### Préparation - Désaffectation de licences

goDeploy a potentiellement déjà affecté des licences à beaucoup (trop) d'utilisateurs. Vous allez, dans un premier temps, désaffecter ces licences pour pouvoir les réutiliser dans la suite de vos manipulations.

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue du premier atelier. Le **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur et vous devriez y être connecté avec le compte *MOD Administrator*. 
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation à gauche, ouvrez le groupe **Billing** pour sélectionner l'entrée **Licenses**.  
1. Dans la fenêtre licenses, cliquez sur la ligne **Microsoft 365 E5 (no Teams)**.
1. Dans le panneau **Microsoft 365 E5 (no Teams)**, cochez les cases en regard des utilisateurs suivant avant de cliquer sur **Unassign licenses** :

	- Adele Vance
	- Alex Wilber
	- Christie Cline
	- Debra Berger
	- Grady Archie
	- Irvin Sayers
	- Johanna Lorenz
	- Lee Gu
	- Lidia Holloway
	- Miriam Graham
	- Pradeep Gupta

	> Si tous les utilisateurs de la liste ne sont pas présent dans votre tenant de test, contentez-vous de désaffecter les licences de celles et ceux qui s'y trouvent, ce n'est pas pénalisant pour la suite....

	> Si, sur votre tenant, les licenses présentes sont **Office 365 E5 (no teams)** et non **Microsoft 365 E5 (no Teams)**, merci d'adapter des énnonçés des ateliers en conséquence...

1. Dans la fenêtre de confirmation **Unassign 11 licenses?**, cliquez sur le bouton **Unassign**.
1. Dans le menu de navigation à gauche du portail administratif, ouvrez le groupe **Billing** pour resélectionner l'entrée **Licenses**.  
1. Répétez la procédure précédente pour désaffecter la license **Microsoft Teams Enterprise** des mêmes utilisateurs.

#### Tâche 1 - Création d'utilisateurs

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue du premier atelier. Le **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur et vous devriez y être connecté avec le compte *MOD Administrator*. 
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation à gauche, ouvrez le groupe **Users** pour sélectionner l'entrée **Active users**.

	> Puisque vous prenez le rôle de Dominique Skyetson pour cet exercice, vous allez vous créer un compte utilisateur pour vous même et lui affecter le rôle *Global Administrator*, donnant ainsi à Dominique l'accès à toutes les prérogatives administratives dans l'environnement Microsoft 365.

1. Dans la fenêtre **Active Users**, cliquez sur **Add a user**.
1. Sur la page **Set up the basics**, saisissez les informations suivantes :
	- First name : `Dominique`
	- Last name : `Skyetson` 
	- Display name : En tabulant dans ce champ, il sera automatiquement rempli avec la valeur `Dominique Skyetson`.
	- Username : `dom`  

		> A droite du champ **Username** se trouve le domaine de l'utilisateur. Il sera rempli avec le domaine DNS configuré comme étant le domaine par défaut. Pour Adatum, il s'agit du domaine que vous avez ajouté lors du premier atelier.

		> Cependant, pour les besoin des exercices concernant la synchronisation d'identité, il vous est conseillé de sélectionner le domaine **[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com** pour tous les utilisateurs que vous créez dans cet exercice.  

		> C'est pourquoi vous devez sélectionner la flèche à droite du champ **Domains** pour sélectionner le domaine **[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com** (s'il vous est impossible de sélectionner ce domaine à la création des utilisateurs, vous pouvez le changer à postériori).  

		> Après avoir configuré ce champ, le nom utilisateur de Dominique devrait apparaitre sous la forme: **dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com**

	- Décochez l'option **Automatically create a password**
	- Password : ```Pa55w.rd``` (Astuce : cliquez sur l'icône d'oeil à droite pour vérifier le mot de passe saisi)
	- Cochez la case **Require this user to change their password when they first sign in**

1. Cliquez **Next**.
1. Sur la page **Assign product licenses** , saisissez les informations suivantes:
	- Select location : **United States**
	- Licences : Vérifier que l'option **Assign user a product license** est sélectionnée et cochez les cases en regard des licences **Microsoft 365 E5 (no Teams)**  et **Microsoft Teams Enterprise**

	> Il vous faudra peut-être rafraichir votre navigateur si les licences n'ont pas encore été libérées suite à la Tâche précédente.

1. Cliquez sur **Next.**
1. Sur la page **Optional settings**, cliquez sur la ligne **Roles (User : no administration access).**
1. Sélectionnez le titre **Admin center access**. Les rôles les plus souvent affectés vont alors s'afficher.

	> Si vous souhaitez affecter un autre rôle qui ne se trouve pas dans cette liste, sélectionnez la ligne **Show all by category** pour afficher l'intégralité des rôles disponibles. Cependant, dans notre cas, Dominique veut s'assigner le rôle Global Administrator. Il peut le faire, étant connecté avec le compte *MOD Administrator*, qui est aussi Global admin. Seul un Global admin peut affecter le rôle Global Administrator à un utilisateur.

1. Sélectionnez **Global Administrator** avant de cliquer sur **Next**.
1. Sur la page **Review and finish** , vérifiez les informations saisies. Si quoi que ce soit nécessite d'être changé, cliquez sur le lien **Edit** correspondant et réalisez les changements nécessaires. Sinon, si tout est correct, cliquez sur **Finish adding**. 
1. Sur la page **Dominique Skyetson added to active users**, cliquez sur **Show** à coté de **Password** pour vérifier que vous avez bien saisi correctement **Pa55w.rd**.
1. En bas de la page, cliquez sur le lien **Add another user** et recommencez les étapes précédentes, pour ajouter les utilisateurs avec les informations suivantes :

	- **Username domain :** Lors de la saisie du **Username** pour chaque utilisateur, assurez-vous de sélectionner le domaine **[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com** comme vous l'avez fait pour le compte de Dominique (Si vous ne pouvez le sélectionner à la création, changez-le une fois le compte créé).
	- **Password :** Utilisez le mot de passe ```Pa55w.rd```, et, comme pour le compte de Dominique, exigez le changement de mot de passe à la première connexion.
	- **Licenses :** Affectez une licence **Microsoft 365 E5 (no Teams)** et une licence **Microsoft Teams Enterprise** à l'utilisateur **Alan Yoo**, en décochant l'App **Skype for Business Online (plan1)** comme vous l'avez fait pour Dominique Skyetson. Pour tous les autres utilisateurs, sélectionner l'option **Create user without product license (not recommended)**.
	- **Roles :** Par défaut chaque utilisateur se verra affecter le rôle **User role (no administration access)**; Cela suffira pour le moment. Dans un futur exercice, vous affecterez des rôles administratifs à certains utilisateurs pour tester la délégation administrative. Ainsi, en arrivant sur la page **Optional settings**, cliquez directement sur **Next**.  

	| **First Name** | **Last Name** | **Display Name** | **username** | **Licence** | **Role** |  
	|----------------|---------------|------------------|--------------|-------------|----------|  
	| `Alan` | `Yoo` | Alan Yoo | `alan` | **Microsoft Teams Enterprise** et **Microsoft 365 E5 (no Teams)** | **User** |  
	| `Ada` | `Russell` | Ada Russel | `ada` | Sans | **User** |  
	| `Adam` | `Hobbs` | Adam Hobbs | `adam` | Sans | **User** |  
	| `Libby` | ` Hayward` | Libby Haywards | `libby` | Sans | **User** |  
	| `Laura` | ` Atkins`| Laura Atkins | `laura` | Sans | **User** |  
	
1. Après avoir ajouté le dernier compte (celui de *Laura Atkins*) cliquez sur le bouton **Close** pour revenir à la liste des **Active users**
1. Vérifiez la liste **Active users**. Vérifiez que chacun des précédents utilisateurs a pour domaine **[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com** et changez-le si ce n'est pas le cas.

#### Tâche 2 : Modification d'utilisateurs Microsoft 365
Dans cette tâche, vous allez réaliser nombre des actions d'édition sur les comptes utilisateurs. Vous allez commencer par mettre à jour les informations de contact d'Alan Yoo, avant de l'empêcher de se connecter.

Empêcher la connexion d'un utilisateur est un *best practice* lorsque vous pensez que le compte ou le mot de passe d'un utilisateur peut avoir été compromis. Ceci évite que l'utilisateur en question puisse se connecter et, en plus, le déconnecte de tous les services Microsoft 365 dans les 60 minutes.

Vous affecterez ensuite une licence produit au compte de Ada Russell. Pour finir, vous allez supprimer le compte de Libby Hayward avant de voir comment le restaurer.

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue du premier atelier. Le **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur et vous devriez y être connecté avec le compte *MOD Administrator*.
1. Dans le portail **Microsoft 365 admin center**, la page **Active users** devrait être encore affichée à l'issue de la première tâche de cet exercice. Sélectionnez la case à cocher en regard du compte de **Alan Yoo**, sans cliquer sur la ligne de ce compte en lui-même.
1. Dans la barre de menu au-dessus de la liste d'utilisateurs, sélectionnez les **points de suspension** (**More actions**). Dans le menu qui apparait, sélectionnez **Manage contact information**.
1. Dans le panneau **Manage contact information** qui apparait pour Alan Yoo, saisissez `Accounts Receivable` dans le champ **Department** avant de cliquer sur **Save changes**. 
1. Une fois que le bandeau vert indiquant **Contact information updated** apparait, cliquez sur le **X** de fermeture en haut à droite du panneau **Manage contact information**.
1. Le compte d'Alan Yoo devrait toujours être sélectionné dans la liste **Active Users**. Dans la barre de menu au-dessus de la liste d'utilisateurs, sélectionnez les **points de suspension** (**More actions**) de nouveau. Dans le menu qui apparait, sélectionnez **Edit sign-in status**.
1. Sur le panneau **Block sign-in**, cochez la case **Block this user from signing in** avant de cliquer sur le bouton **Save changes**. Notez le bandeau vert indiquant que le compte de Alan est désormais bloqué et qu'il sera déconnecté des services Microsoft dans les 60 minutes. Cliquez sur le **X** de fermeture en haut à droite du panneau **Block sign-in**.
1. Dans la liste **Active users**, désélectionnez la case à gauche de **Alan Yoo**, avant de sélectionner **Ada Russell**.
1. Pour Ada, vous souhaitez apprendre à affecter une licence à un utilisateur existant. Dans la barre des menus au-dessus des utilisateurs, cliquez sur **Manage product licenses** (utilisez les points de suspension **More Options** si le choix n'est pas affiché).
1. Sur le panneau **Ada Russell** qui s'affiche, l'onglet **Licenses and apps** est affiché par défaut (puisque vous avez sélectionné l'option **Manage product licenses**). Sous la liste des licences, cliquez sur les cases **Microsoft 365 E5 (no Teams)** et **Microsoft Teams Enterprise** avant de cliquer sur le bouton **Save changes**.  
1. Sélectionnez le **X** en haut à droite pour fermer le panneau d'informations de **Ada Russell**.
1. Dans la liste **Active users**, vous pouvez voir qu'une licence a été affectée au compte de **Ada Russell**. Décochez la case en regard de **Ada Russell** avant de sélectionner **Libby Hayward**.
1. A droite du nom de Libby Hayward, sélectionnez les points de suspension verticaux. Dans le menu qui apparait, notez que les options sont similaires à celle du menu que vous avez utilisé jusqu'à présent, même si moins nombreuses. 
1. Dans cette tâche vous allez supprimer le compte de Libby avant de le restaurer. Vous pouvez supprimer un utilisateur en sélectionnant l'option **Delete user** dans son menu.
1. Sur le panneau **Delete this user ?**, cliquez sur le bouton **Delete user** en bas de page.
1. Sur le panneau **Libby Hayward has been deleted**, cliquez sur le bouton **Close**.
1. Vérifiez que le compte de **Libby Hayward** n'apparait plus dans le liste **Active users**.  
1. Vérifiez maintenant que Libby apparait dans la liste des utilisateurs supprimés. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation, cliquez sur **Deleted users**.
1. Sur la page **Deleted users**, vérifiez que **Libby Hayward** apparait dans la liste des utilisateurs supprimés.
1. Supprimer un utilisateur réalise un *soft-delete* de son compte ; ce qui permet aux entreprises de restaurer les utilisateurs pendant 30 jours après leur suppression. Dans la liste **Deleted users**, sélectionnez la case à cocher en regard de **Libby Hayward**. 
1. Sur la barre de menu, cliquez sur le bouton **Restore user**.
1. Dans le panneau **Restore Libby Hayward**, vous avez l'option d'affecter un nouveau mot de passe à Libby ou de demander la génération automatique d'un nouveau mot de passe. **Sur le terrain, il est conseillé de générer automatiquement un mot de passe et d'exiger que l'utilisateur le change à sa première connexion.**  

	Puisque l'option **Auto-generate password** est sélectionnée par défaut et que la case **Make this user change their password when they first sign in** est cochée, cliquez simplement sur le bouton **Restore** en bas de la page.

1. Le panneau **Libby Hayward has been restored** s'affiche pour confirmer que le compte de Libby a été restauré et son mot de passe remplacé. Prenez soin de copier le nouveau mot de passe (en utilisant par exemple le bouton *Npotes* ci-dessous, vous en aurez besoin à la tâche suivante) avant de cliquer sur le bouton **Close**.  

	> Si vous avez procédé *trop* rapidement à la suppression et restauration de l'utilisateur, il se peut que le nom de connexion de celui-ci ne soit pas correct (restauration effectuée avant que le suppression ne soit complètement assumée). Dans ce cas, vous pourrez ensuite aisément modifier le nom de connexion de Libby pour lui remettre ```libby@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com```...

1. Le compte de Libby ne devrait plus apparaitre dans la liste **Deleted users**. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation, sélectionnez **Active users**.
1. Vérifiez que **Libby Hayward** apparait dans la liste.

#### Tâche 3 - Vérification des paramètres utilisateurs
Dans cette tâche, vous allez vérifier l'impact des changements que vous avez fait aux comptes utilisateurs dans les tâches précédentes. Vous allez vous connecter avec le compte de Libby Hayward et donc avoir besoin du mot de passe temporaire qui lui a été affecté. Vous allez ensuite ouvrir une session Microsoft 365 en tant que Alan Yoo, afin de valider si son compte est bien empêché de se connecter. 

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue du premier atelier. Le **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur et vous devriez y être connecté avec le compte *MOD Administrator*.
1. Vous devez vous déconnecter de Microsoft 365 et vous reconnecter avec le compte de Libby Hayward. Sélectionnez le cercle en haut à droite avec **MA** (les initiales de *MOD Administrator*) et cliquez sur **Sign out**.
1. Une fois qu'une invite apparait vous indiquant que vous êtes correctement déconnecté, fermez votre navigateur Internet pour éviter qu'une session soit restée ouverte sur un autre onglet.
1. Dans la barre des tâches, cliquez sur l'icône de **Microsoft Edge** pour relancer une session de navigation et connectez-vous sur le portail Microsoft 365 à l'adresse `https:/m365.cloud.microsoft`
1. Cliquez sur le bouton **SIgn in**.
1. Dans la fenêtre **Pick an account**, sélectionnez **+ Use another account**.
1. Dans la fenêtre **Sign in**, entrez `Libby@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com` et cliquez sur **Next**.
1. Dans la fenêtre **Enter password**, saisissez le mot de passe temporaire de Libby dont vous avez pris note dans la tâche précédente et cliquez sur le bouton **Sign in**.
1. Dans la fenêtre **Update your password**, entrez de nouveau le mot de passe temporaire de Libby dans le champ **Current password**, et utilisez le mot de passe ```userPass``` dans les champs **New password** et **Confirm password**. Cliquez sur **Sign in**.
1. Si une fenêtre **Welcome to Microsoft 365** apparait, cliquez deux fois sur la flèche de droite pour accéder à la validation vous permettant de la fermer.
1. Vérifiez que vous pouvez accéder à la page d'accueil de M365 Copilot. Notez qu'aucune application n'est présente sur le portail de Libby (en cliquant sur le **App Launcher** de 3*3 carrés en haut à gauche) puisque vous n'avez affecté aucune licence au compte de Libby.
1. Vous devez désormais vous déconnecter du compte de Libby pour tenter de vous connecter avec le compte de Alan Yoo. Pour vous déconnecter, cliquez sur le nom de connexion de Libby Hayward (en bas à gauche) et cliquez sur **Sign out**.
1. Une fois déconnecté, ressaisissez l'adresse suivante dans la barre d'adresse de votre navigateur si nécessaire : `https:/m365.cloud.microsoft`
1. Dans la page **login**, cliquez sur le choix **Switch to a different account** en dessous du bouton **Sign in**
1. Saisissez `Alan@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com` dans le champ **Email address** avant de cliquer sur **Next**
1. Dans la fenêtre **Enter password**, saisissez ```defaultPass``` et cliquez sur **Sign in**.
1. Sur la fenêtre **Pick an account**, constatez qu'un message d'erreur apparait, indiquant que le compte de Alan a été bloqué. Vous venez de vérifier que Alan ne peut plus se connecter à Microsoft 365.
1. Vous allez finalement vous connecter avec votre compte admin de Dominique Skyetson, en utilisant le compte nominatif que vous avez créé dans la première tâche de cet exercice. Dans la fenêtre **Pick an account**, sélectionnez donc **+ Use another account**.
1. Dans la fenêtre **Sign in**, saisissez `dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com` et cliquez sur **Next**.
1. Dans la fenêtre suivante, utilisez le mot de passe ```defaultPass``` et cliquez sur **Sign in**.
1. Dans la fenêtre **Update your password**, saisissez ```defaultPass``` dans le champ **Current password** et saisissez ```userPass``` dans les champs **New password** et **Confirm password**. Cliquez sur **Sign in**.
1. Si une fenêtre **Welcome to Microsoft 365** apparait, cliquez deux fois sur la flèche de droite pour accèder à la validation vous permettant de la fermer. 
1. Dans la page d'accueil de M365 Copilot, cliquez sur le **App Launcher** puis sur **More Apps**".
1. Dans la page "**Apps**", cliquez sur **All apps** pour lancer l'application **Admin**.
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation à gauche, ouvrez le groupe **Users** pour y sélectionner **Active users**.
1. Dans la liste **Active users** cliquez sur le nom de **Alan Yoo**.
1. Sur le panneau d'informations de **Alan Yoo** qui apparait, notez qu'il vous est indiqué que le compte de Alan est actuellement bloqué, cliquez sur le bouton **Unblock sign-in**.
1. Dans le panneau **Unblock sign-in** qui apparait, la case à cocher **Block this user from signing in** est cochée. Décochez cette case avant de cliquer sur **Save changes**.
1. Une fois le message vert de confirmation apparu indiquant que le compte de Alan Yoo est désormais débloqué, cliquez sur le **X** en haut à droite afin de fermer le panneau **Unblock sign in**.

<!-- IBCAN_PAGE_BREAK|a2e2 --># Atelier 2 - Gestion des utilisateurs et des groupes Microsoft 365

## Exercice 2 - Gestion des stratégies de mots de passe Microsoft 365

<div class="ibPrintNotes" data-exercise="a2e2" hidden></div>

Dans cet exercice, vous allez poursuivre, dans la peau de Dominique Skyetson, en tant qu'administrateur d'Adatum. Dans le contexte du projet pilote de Adatum, Dominique veut comprendre les fonctionnalités de gestion de mot de passe de Microsoft 365. Il va commencer par mettre en place une stratégie de mot de passe qui expire après 60 jours.

Puisque Adatum souhaite également implémenter l'authentification multifactorielle (MFA), Dominique doit mettre en place la MFA dans le projet pilote. La MFA est un standard de cybersécurité qui fournit le socle de l'intégrité des identités. La MFA est activée par défaut pour un nouveau tenant Microsoft 365 ; cependant, pour le besoins de ce lab, la MFA a été désactivée pour fluidifier le fonctionnement dans l'environnement virtuel d'ateliers. Ainsi, Dominique va activer la MFA pour son propre compte pour vérifier cette fonctionnalité, avant de la désactiver de nouveau (Désactiver la MFA en fin d'exercice sur le compte de Dominique vous évitera de devoir saisir votre facteur complémentaire à chaque connexion pendant le stage).

> Pour mettre en oeuvre la MFA, vous aurez besoin d'utiliser votre smartphone avec une application d'authentification mutlifactorielle respectant le standard OpenId cmme *Microsoft Authenticator* pour valider la connexion utilisateur. Demandez conseil à votre formateur/trice pour réaliser cette opération si elle ne vous est pas familière.  

#### Tâche 1 - Configurer une stratégie de mot de passe Microsoft 365
Dans cette tâche, vous allez changer la stratégie de mot de passe qui contrôle la fréquence à laquelle les utilisateurs doivent changer leur mot de passe.

Par le passé, vous aviez une stratégie exigeant que les utilisateurs changent leur mot de passe tous les 90 jours. Cependant, pour cet exercice, vous allez changer l'expiration de mot de passe pour la passer à 60 jours.

> Vous allez faire ce changement à seule fin de test, le présent atelier n'ayant pas pour vocation de durer plus de 15 jours...

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue du premier atelier. Le **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur et vous devriez y être connecté avec le compte *Dominique Skyetson*.
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation de gauche, ouvrez **Settings** pour sélectionner **Org settings** (cliquer sur **Show all** si le groupe d'options **Settings** n'est pas affiché).
1. Dans la fenêtre **Org settings**, l'onglet **Services** est affiché par défaut en haut de la page. Sélectionnez plutôt l'onglet **Security & Privacy** situé à côté. 
1. Sur la page **Security & Privacy**, sélectionnez **Password expiration policy** dans la liste de paramètres. 
1. Sur le panneau **Password expiration policy** qui s'affiche, décochez la case **Set passwords to never expire (recommended)**.

	> Vous pouvez cliquer sur le lien documentaire pour comprendre en quoi des mots de passe qui n'expire pas sont désormais considéré comme plus sécurisés.  

1. Entrez **```60```** dans le champ **Days before passwords expire** avant de cliquer sur **Save**.
1. Vérifiez que la case **Set passwords to never expire (recommended)** est décochée et que le message **Changes saved** apparaît en haut de page.
1. Cliquez sur le **X** en haut à droite afin de fermer le panneau **Password expiration policy**.

#### Tâche 2 - Activer l'authentification multifactorielle
Pour tester l'authentification multifactorielle (MFA), Dominique Skyetson veut l'activer sur son compte administrateur nominatif pour en constater le fonctionnement.

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue du premier atelier. Le **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur et vous devriez y être connecté avec le compte *Dominique Skyetson*.
1. Pour activer la MFA pour le compte utilisateur de Dominique Skyetson, vous devez d'abord accéder à la liste des **Active users** dans le portail **Microsoft 365 admin center**. Utilisez donc le menu de navigation pour ouvrir le groupe d'options **Users** afin d'y choisir **Active users**.
1. Dans la page **Active users**, dans la barre de menu au-dessus de la liste d'utilisateurs, cliquez sur **Multi-factor authentication**. Cette action va ouvrir le portail d'administration Entra dans un nouvel onglet, sur la page **Per-user ultifactor authentication** (avec la vue **Users** affichée par défaut).  
1. Si vous êtes amenés à mettre en place la MFA de Dominique pour accèder à cette page, vous pouvez vous référer à la procédure détaillée dans la tâche 3 suivante, sinon, poursuivez avec la procédure de la présente tâche

	> Le statut MFA de tous les utilisateurs existant est **Disabled**.

1. Parcourez la liste des utilisateurs si nécessaire pour cliquer sur la case à gauche de Dominique Skyetson.
1. Dans la barre de menu au dessus de la liste d'utilisateurs, cliquez sur **Enable MFA**
1. Sur le popup **Enable multi-factor authentication**, cliquez sur le bouton **Enable**. 
1. Vous devez désormais vous déconnecter de Microsoft 365. Cliquez sur le compte de Dominique en haut à droite et choisissez **Sign out**.
1. une fois déconnecté, fermez votre navigateur Internet (tous les onglets).

#### Tâche 3 - Tester l'authentification multifactorielle

Vous allez désormais vous connecter avec le compte de Dominique pour sécuriser sa connexion en activant réellement l'authentification multifactorielle sur son compte.

1. Cliquez sur l'icône de **Microsoft Edge** sur la barre des tâches pour ouvrir une nouvelle session de navigation et réouvrez le portail **Microsoft 365 Admin center** en utilisant l'url `https://admin.microsoft.com`
1. Dans la fenêtre **Pick an Account**, choisissez **dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com**.
1. Dans la fenêtre **Enter password**, entrez ```userPass``` et cliquez sur **Sign in**.
1. La MFA étant maintenant active pour Dom, une fenêtre **More information required** apparait. Cliquez sur **Next**.
1. Si nécessaire, reportez-vous à la procédure **Mise en place de la M.F.A pour les ateliers Microsoft** pour activer la génération de codes pour Dominique dans une application de MFA tierce.
1. Après votre connexion avec la MFA, si une fenêtre **Stay signed in?** apparait, sélectionnez **Don't show this again** et cliquez sur **Yes**.
1. Le portail **Microsoft 365 Admin Center** devrait désormais être affiché.

	> Référez-vous à la procédure précédemment mentionnée pour toutes vos connexions ultérieures avec le compte de Dominique.

<!-- IBCAN_PAGE_BREAK|a2e3 --># Atelier 2 - Gestion des utilisateurs et des groupes Microsoft 365

## Exercice 3 - Gestion des groupes

<div class="ibPrintNotes" data-exercise="a2e3" hidden></div>

Précédemment vous avez ajouté plusieurs compte Microsoft 365. Pour poursuivre dans votre rôle d'administration de Dominique Skyetson, vous souhaitez désormais mettre en place la gestion des groupes dans Microsoft 365. Dans cet exercice, vous allez créer de nouveaux groupes et gérer leur contenu en leur affectant des utilisateurs. Vous testerez aussi l'effet d'une suppression de groupe sur les utilisateurs contenus dans celui-ci.

#### Tâche 1 - Création de groupes
En tant que Dominique Skyetson, vous souhaitez désormais mettre en oeuvre les groupes Microsoft 365 dans le projet pilote. Dans cette tâche, vous allez ajouter deux groupes de Vente et un groupe du service paye. Vous allez ensuite supprimer un des groupes Vente pour constater que cela ne supprime pas les utilisateurs contenus dans ce groupe.

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue du premier atelier. Le **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur et vous devriez y être connecté avec le compte *Dominique Skyetson*.
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation de gauche, ouvrez **Teams & groups** pour sélectionner **Active teams & groups**.
1. Au-dessus de la liste **Active teams and groups**, cliquez sur le bouton **Add a Microsoft 365 group** dans la barre de menu de l'onglet **Teams & Microsoft 365 groups**.
1. Dans la fenêtre **Set up the basics**, entrez `Inside Sales` dans le champ **Name** et `Collaboration group for the Inside Sales team` dans le champ **Description** avant de cliquer sur **Next** (Si vous laissez le champ **Description** vide, vous devez cependant sélectionner le champ pour pouvoir cliquer sur le bouton **Next**).
1. Dans la fenêtre **Assign owners**, cliquez sur **+ Assign owners** pour afficher la liste des utilisateurs. Sélectionnez **Alan Yoo**, avant de cliquer sur **Add (1)** puis **Next**. 
1. Dans la fenêtre **Add members**, cliquez sur **Next**.
1. Dans la fenêtre **Edit settings**, saisissez `insidesales` dans le champ **Group email address**.

	> A droite du champ **Group email address** se trouve le domaine. Il est déjà prérempli avec le domaine par défaut de Adatum. Cela diffère de l'ajout d'utilisateurs en ce que vous ne pouvez choisir un autre domaine ; laissez donc la valeur par défaut telle quelle.  

	Après avoir configuré ce champ, l'adresse email du groupe Inside Sales devrait ressembler à : **insidesales@[[godeployDomain],[labXXXXX]].godeploylabs.com**  
	Arès avoir configuré l'adresse email, sous la section **Privacy**, laissez la valeur par défaut à **Public** et laissez la case cochée **Create a team for this group** avant de cliquer sur **Next**.

1. Dans la fenêtre **Review and finish adding group** , vérifiez votre saisie et si une option a besoin d'être modifiée, cliquez sur l'option **Edit** en regard de celle-ci; sinon, cliquez sur le bouton **Create group** en bas de la page.
1. Sur la page **Inside Sales group created**, un message s'affiche indiquant que l'apparition du groupe dans la liste pourra prendre jusqu'à 5 minutes. Cliquez sur **Close**
1. De retour sur la liste **Active teams and groups**, cliquez sur l'onglet **Security groups**
1. Dans l'onglet **Security groups**, cliquez sur le bouton **+ Add a security group**
1. Dans la fenêtre **Set up the basics**, entrez `Sales Department` dans le champ **Name** et `Sales Department users` dans le champ **Description** avant de cliquer sur **Next** (Si vous laissez le champ **Description** vide, vous devez cependant sélectionner le champ pour pouvoir cliquer sur le bouton **Next**).
1. Dans la fenêtre **Edit settings**, cliquez simplement sur **Next**.
1. Dans la fenêtre **Review and finish adding group** , vérifiez votre saisie et si une option a besoin d'être modifiée, cliquez sur l'option **Edit** en regard de celle-ci; sinon, cliquez sur le bouton **Create group** en bas de la page.
1. Sur la page **Sales Department group created**, un message s'affiche indiquant que l'apparition du groupe dans la liste pourra prendre jusqu'à 5 minutes. Cliquez sur **Close**
1. Dans la liste **Active teams and groups**, si les deux nouveaux groupes n'apparaissent pas dans leur onglet respectif, utilisez le bouton **Refresh** de la barre de menu au-dessus de la liste jusqu'à ce que les deux groupes apparaissent (il pourra être nécessaire, à plusieurs reprises, d'attendre un moment avant de cliquer sur **Refresh** de nouveau).
1. Vous êtes maintenant prêt à ajouter des membres au groupe de sécurité. Dans la liste des groupes **Teams & Microsoft 365 groups**, sélectionnez le groupe **Inside Sales**, un panneau d'informations sur ce groupe s'ouvre à droite de l'écran.
1. Sur le panneau **Inside Sales**, l'onglet **General** est affiché par défaut. Sélectionnez l'onglet **Membership** et la section **Members**.
1. Dans la section **Members**, vous pouvez voir qu'aucun membre n'est présent. Cliquez sur **Add members**. 
1. Dans la fenêtre **Add team members to Inside Sales**, Cliquez sur le champ **Search by name or email address** et sélectionnez **Ada Russel** dans la liste des utilisateurs actifs.
1. Cliquez de nouveau sur le champ **Search by name or email address** et sélectionnez **Alan Yoo** dans la liste avant de cliquer sur **Add (2)**. 
1. Cliquez sur le **X** en haut à droite pour fermer le panneau.
1. Dans la liste des groupes, changez pour afficher l'onglet **Security groups**.
1. Dans l'onglet **Security groups**, cliquez sur le bouton **+ Add a security group**
1. Dans la fenêtre **Set up the basics**, entrez `Accounts receivable` dans le champ **Name** et `Accounts Receivable department users` dans le champ **Description** avant de cliquer sur **Next** (Si vous laissez le champ **Description** vide, vous devez cependant sélectionner le champ pour pouvoir cliquer sur le bouton **Next**).
1. Dans la fenêtre **Edit settings**, cliquez simplement sur **Next**.
1. Dans la fenêtre **Review and finish adding group** , vérifiez votre saisie et si une option a besoin d'être modifiée, cliquez sur l'option **Edit** en regard de celle-ci; sinon, cliquez sur le bouton **Create group** en bas de la page.
1. Sur la page **Account receivable group created**, un message s'affiche indiquant que l'apparition du groupe dans la liste pourra prendre jusqu'à 5 minutes. Cliquez sur **Close**
1. Si le groupe Accounts Receivable ne s'affiche pas dans la liste, utilisez le bouton **Refresh**, comme expliqué précédemment jusqu'à ce que le groupe s'affiche.
1. Dans l'onglet **Security groups** de la liste, sélectionnez le groupe **Accounts Receivable**, ce qui affiche un panneau d'informations concernant ce groupe.
1. Dans le panneau **Account Receivable**, cliquez sur l'onget **Members**.
1. Sur l'onglet **Members**, il y a actuellement 0 propriétaires (*Owners*) et 0 membres (*members*). Sélectionnez **View all and manage owners** pour ajouter un propriétaire au groupe.
1. Dans la fenêtre **Owners**, cliquez sur **+ Add owners**. La liste des utilisateurs actifs s'affiche.
1. Dans la liste des utilisateurs, sélectionnez **Libby Hayward** et cliquez sur **Add (1)**.
1. Une fois que le message vert **Saved** apparait sur le panneau **Owners**, cliquez sur **<-** en haut à gauche pour revenir à l'affichage des informations sur **Accounts Receivable**.
1. Sous la section **Members** de la fenêtre **Accounts Receivable**, sélectionnez le lien **View all and manage members** pour ajouter des membres au groupe. 
1. Dans la fenêtre **Members**, cliquez sur le bouton **+ Add members** : La liste des utilisateurs actifs s'affiche.
1. Dans la liste des utilisateurs, sélectionnez **Adam Hobbs** et **Libby Hayward** puis cliquez sur **Add (2)**.
1. Une fois que le message vert **Saved** apparait sur le panneau **Members**, cliquez sur le **X** en haut à droite pour fermer le panneau d'informations sur **Accounts Receivable**.
 
#### Tâche 2 - Suppression de groupe

1. Vous souhaitez désormais tester les effets de la suppression d'un groupe. Basculez sur l'onglet **Teams & Microsoft 365 groups**.
1. Cliquez sur les points de suspension verticaux à droite du groupe **Inside Sales** et cliquez sur **Delete team**. 
1. Dans la fenêtre **Delete Inside Sales?**, cliquez sur le bouton **Delete team**.
1. Sur la fenêtre **Inside Sales was deleted**, cliquez sur **Close**. 
1. Vous voilà de retour sur la liste des **Teams & microsoft 365 groups** dans le portail **Microsoft 365 admin center**. Le groupe **Inside Sales** ne devrait plus apparaitre dans cette liste.
1. Pour vérifier si la suppression d'un groupe a eu un impact sur ses membres, dans le menu de navigation à gauche, cliquez sur le choix **Active users** dans le groupe d'options **Users**.
1. Dans la liste des **Active users**, vérifiez que les 2 membres du groupe supprimé, **Ada Russel** et **Alan Yoo**, sont toujours présents dans la liste.
1. Vous venez donc de vérifier que la suppression d'un groupe ne supprime pas ses membres.

<!-- IBCAN_PAGE_BREAK|a2e4 --># Atelier 2 - Gestion des utilisateurs et des groupes Microsoft 365

## Exercice 4 - Gestion des utilisateurs et des groupes avec Windows PowerShell

<div class="ibPrintNotes" data-exercise="a2e4" hidden></div>

Windows Powershell permet aux administrateurs d'automatiser, d'accélérer et de fluidifier les tâches qui seraient faites dans le portail Microssoft 365 admin center, les plus compliquées comme les plus simples.

Dans cet exercice, vous allez continuer, en tant que Dominique, à faire des opérations administratives de maintenance dans Microsoft 365 en utilisant Windows Powershell. Cela vous permettra de comparer l'expérience de création et de maintenance des utilisateurs et des groupes entre le centre d'administration et le scripting Powershell.

Vous souhaitez donc utiliser Windows Powershell pour créer des comptes utilisateurs, leur affecter des licences, modifier des comptes, créer des groupes...

#### Tâche 1 - Installation du module Windows Powershell pour Entra ID

Dans cette tâche vous allez mettre en place l'environnement fondamental pour la gestion de Microsoft 365 à l'aide de Windows Powershell en insatllant le module Microsoft.graph dans votre machine d'administration **LON-CL1**.

1. Suite à l'exercice précédent, vous devriez être resté connecté sur la machine **LON-CL1** avec le compte **```Administrator```** et le mot de passe **```Pa55w.rd```**.
1. Dans la zone de recherche en bas à gauche de la barre des tâches, tapez ```powershell```
1. Faites un clic-droit sur **Windows Powershell** et, dans le menu qui apparait, choisissez **Run as administrator**.
1. Si une fenêtre **Do you want to allow this app to make changes to your device** apparait, cliquez sur **Yes**.
1. Dans la fenêtre **Administrator: Windows PowerShell**, tapez `install-module microsoft.graph -force` et faites **[Entrée]**.

	> l'installation du module Microsoft Graph est **particulièrement longue**... patience donc...

1. S'il vous est demandé si vous souhaitez faire confiance à **NuGet provider**, tapez **Y** pour répondre oui.
1. S'il vous est demandé de confirmer si vous souhaitez installer les modules depuis la **Powershell Gallery** (PSGallery), tapez **A** pour répondre *Oui à tous*
1. Attendez que l'installation des modules se termine et que l'invite Windows Powershell vous rende la main (Il peut se passer quelques minutes pendant lesquelles vous aurez l'impression que plus rien n'évolue).
1. Pour être sûr que tous les scripts Windows Powershell puissent s'exécuter correctement, il vous faut désactiver le *garde-fou* des stratégies d'exécution. Pour ce faire, utilisez la commande suivante : `Set-ExecutionPolicy bypass -force`

	> Comme pour les commandes précédentes, il vous faudra taper sur la touche **[Entrée]** pour lancer l'exécution de chaque commande. Nous partirons de ce principe et ne le rappellerons plus après chaque commande.

1. Laissez la fenêtre **Administrator: Windows Powershell** ouverte pour la tâche suivante.  

> Si vous n'êtes pas intéressé par le détail des commandes PowerShell, vous pouvez utiliser le script suivant qui va réaliser l'équivalent des commandes des tâches suivantes. Si vous souhaitez utiliser le script, vous pouvez le faire à l'aide de la commande suivante (à l'issue de laquelle vous pouvez passer à l'exercice 5) :  
```powershell
Invoke-Command -ScriptBlock ([Scriptblock]::Create((Invoke-WebRequest 'https://raw.githubusercontent.com/Ib-Cegos/labs/master/resources/msms030-a2e4.ps1' -useBasicParsing).Content))
```

#### Tâche 2 - Créer de nouveaux utilisateurs et leur affecter des licences.
Dans un exercice précédent, vous avez créé des comptes utilisateurs en utilisant le portail **Microsoft 365 admin center**. Dans cette tâche, vous allez créer deux nouveaux utilisateurs en utilisant Windows PowerShell, avant de leur affecter une licence **Microsoft 365 E5 (no Teams)** à chacun. Vous apprendrez ensuite à supprimer un utilisateur et le remettre en production.

1. Vous devriez être resté connecté sur la machine **LON-CL1** avec le compte **```Administrator```** et le mot de passe **```Pa55w.rd```**; l'outil **Windows Powershell** devrait être resté ouvert en tant qu'administrateur. Si nécessaire, maximisez sa fenêtre.
1. Tapez la commande suivante : 
```powershell
Connect-MgGraph -scopes User.ReadWrite.All,Group.ReadWrite.All,Domain.ReadWrite.All,Organization.Read.All,UserAuthenticationMethod.ReadWrite.All
```

> Le cas échéant, il faudra choisir que le compte de Dominique est "professionnel" (*Work or School account*)

1. Dans la fenêtre **Sign in** qui apparaît, connectez-vous avec le compte de Dominique Skyetson : `dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com` et son mot de passe (```ibForm@tion```). 
1. Dans la fenêtre **Permission requested**, cochez la case **Consent on behalf of your organization** et cliquez sur **Accept**.
1. Utilisez désormais la commande suivante pour créer le premier compte utilisateur nommé **Catherine Richard** avec un mot de passe **Pa55w.rd** et un emplacement **CH**.

	> La valeur *False* pour *ForceChangePasswordNextSignIn* signifie que Catherine n'aura pas besoin de modifier son mot de passe lors de sa première connexion.

	```powershell
	$user1 = New-MGuser –UserPrincipalName catherine@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com –DisplayName "Catherine Richard" -GivenName Catherine -SurName Richard -PasswordProfile @{password='Pa55w.rd';ForceChangePasswordNextSignIn=$false} -UsageLocation CH -AccountEnabled -MailNickname catherine
	```

	> Vous pouvez simplement taper la commande `$user1` pour afficher le résultat de l'opération précédente avant de passer à la suite.

1. la commande suivante va créer un second compte utilisateur pour **Tameka Reed**:
	```powershell
	$user2 = New-MGuser –UserPrincipalName tameka@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com –DisplayName "Tameka Reed" -GivenName Tameka -SurName Reed -PasswordProfile @{password='Pa55w.rd';ForceChangePasswordNextSignIn=$false} -UsageLocation CH -AccountEnabled -MailNickname tameka
	```

	> Vous pouvez également taper la commande ```$user2``` pour afficher le résultat de l'opération précédente avant de passer à la suite.

1. Utilisez la commande suivante pour obtenir la liste des comptes qui n'ont pas de licence associée à leur compte :
	```powershell
	Get-MgUser -Filter "assignedLicenses/`$count eq 0 and userType eq 'Member'" -ConsistencyLevel eventual -CountVariable unlicensedUserCount -All
	```

1. Utilisez la commande suivante pour obtenir la licence **```Microsoft 365 E5 (no Teams)```** disponible dans le contexte du projet pilote :
	```powershell
	$license = Get-MgSubscribedSku|where SkuPartNumber -like "*_365_E5*"
	```

	> Vous pouvez taper la commande `$license` pour afficher le résultat de l'opération précédente avant de passer à la suite.

1. Utilisez la commande suivante pour affecter la licence au premier compte utilisateur :
	```powershell
	Set-MgUserLicense -userId $user1.id -AddLicenses @{SkuId=$license.SkuId} -RemoveLicenses @()
	```

1. Utilisez la commande suivante pour affecter la même licence au second compte utilisateur :
	```powershell
	Set-MgUserLicense -userId $user2.id -AddLicenses @{SkuId=$license.SkuId} -RemoveLicenses @()
	```

1. Utilisez la commande suivante pour bloquer le compte de Catherine et l'empècher de se connecter à l'environnement Mixcrosoft 365 :
	```powershell
	Update-MgUser -UserId $user1.Id -AccountEnabled:$false
	```

1. Utilisez la commande suivante pour supprimer le compte de Catherine :
	```powershell
	Remove-MgUser -UserId $user1.Id
	```

	> Cette commande supprimer le compte utilisateur sans demander aucune confirmation.

1. Utilisez la commande suivante pour afficher tous les utilisateurs supprimés (et restaurables) :
	```powershell
	Get-MgDirectoryDeletedUser
	```

1. Vérifiez que Catherine Richard fait partie des comptes supprimés remontés par la précédente commande.
1. Utilisez la commande suivante pour restaurer le compte de Catherine :
	```powershell
	Restore-MgDirectoryDeletedItem -DirectoryObjectId (Get-MgDirectoryDeletedUser|where DisplayName -like catherine*).id
	```

1. Utilisez la commande suivante pour afficher tous les utilisateurs supprimés (et restaurables) :
	```powershell
	Get-MgDirectoryDeletedUser
	```

1. Maintenant que le compte de Catherine a été restauré, il ne devrait plus se trouver dans la liste des utilisateurs restaurables (celle-ci devrait désormais être vide).
1. Utilisez la commande suivante pour afficher la liste des utilisateurs actifs :
	```powershell
	Get-MgUser
	```

1. Vérifiez que le compte de Catherine fait bien partie de cette liste. 
1. Utilisez la commande suivante pour débloquer le compte de Catherine Richard et lui permettre de nouveau de se connecter :
	```powershell
	Update-MgUser -UserId $user1.Id -AccountEnabled
	```

#### Tâche 3 - Import d'utilisateurs multiples
Dans cette tâche, vous allez utiliser Windows Powershell pour importer un fichier CSV de nouveaux utilisateurs dans Microsoft 365. 
 
1. Vous devriez être resté connecté sur la machine **LON-CL1** avec le compte **```Administrator```** et le mot de passe **```Pa55w.rd```**; l'outil **Windows Powershell** devrait être resté ouvert en tant qu'administrateur. Si nécessaire, maximisez sa fenêtre.
1. Tapez la commande suivante : 
```powershell
Invoke-WebRequest "https://raw.githubusercontent.com/renaudwangler/ib-labs/master/resources/users.csv" | Select-Object -ExpandProperty Content | Out-File ".\users.csv"
```

1. En utilisant la commande suivante, vous allez pourvoir visualiser le contenu du fichier CSV dans **Notepad** :
```powershell
Notepad .\users.csv
```

1. Dans la fenêtre **users.csv - Notepad** qui s'ouvre, passez en revue les informations présentes pour les utilisateurs. Notez que, pour chaque utilisateur, le domaine de connexion est **labxxxgodeploylabs.com**. Il vous faut désormais remplacer ce nom de domaine par votre **Nom DNS d'entreprise**. Dans le menu de Notepad, cliquez sur **Edit** puis **Replace**.
1. Dans la fenêtre de remplacement, tapez ```labxxxxx.godeploylabs.com``` dans le champ **Find what** et ```[[godeployDomain],[labXXXXX]].godeploylabs.com``` dans le champ **Replace with**.
1. Cliquez sur le bouton **Replace All** avant de fermer la fenêtre de remplacement.
1. Cliquez sur la case **X** de fermeture de **Notepad**. Dans la boite de dialogue qui apparaît vous demandant si vous souhaitez sauvegarder vos modifications, cliquez sur **Save**.
1. Retournez à **Administrator : Windows Powershell** pour utiliser la commande suivante pour procéder à l'import des utilisateurs contenus dans le fichier :
	```powershell
	Import-Csv -Path .\users.csv | ForEach-Object {New-MGuser –UserPrincipalName $_.UPN –DisplayName $_.DisplayName -GivenName $_.LastName -SurName $_.FirstName -PasswordProfile @{password='Pa55w.rd';ForceChangePasswordNextSignIn=$false} -UsageLocation $_.UsageLocation -AccountEnabled -MailNickname $_.FirstName -jobTitle $_.Title -Department $_.department -StreetAddress $_.StreetAddress -City $_.city -PostalCode $_.PostalCode -Country $_.Country}
	```

1. Constatez le résultat de cette commande : chaque utilisateur est ajouté à l'environnement Microsoft 365 (sans licence affectée cependant).
1. Vous pouvez ensuite utiliser la commande `Get-MgUser` pour obtenir la liste des comptes utilisateurs et constater qu'elle contient désormais les nouveaux utilisateurs importés à l'instant.
1. Minimiser l'outil **Administrator : Windows Powershell** et retournez dans votre navigateur Internet. 
1. Dans le portail **Microsoft 365 admin center** navigez jusqu'à la liste **Active users**. Jetez un oeil au contenu de cette liste pour vérifier que les utilisateurs importés sont bien présents, ainsi que Catherine Richard et Tameka Reed, que vous avez ajouté précédemment par commandes PowerShell.
1. Dans le **Microsoft 365 admin center**, cliquez sur **Show all** (si nécessaire) pour afficher toutes les entrées de menu. Dans le groupe d'options **Admin centers**, cliquez sur **Exchange**.
1. Dans le portail **Exchange admin center**, ouvrez le groupe d'options **Recipients** pour sélectionner **Mailboxes** si vous n'y êtes pas arrivé par défaut. Parcourrez les boites aux lettres et notez qu'aucune boite aux lettres n'a été créée pour les utilisateurs sans licence.
1. Fermez l'onglet **Exchange Admin Center** dans le navigateur, pour retourner sur l'onglet **Microsoft 365 admin center**. 

#### Tâche 4 - Configurez les groupes et leur appartenance

Dans un exercice antérieur, vous avez utilisé le portail d'administration Microsoft 365 pour créer quelques groupes. Dans cette tâche, vous allez utiliser Windows Powershell pour créer un groupe et ajouter deux membres à celui-ci.

1. Vous devriez être resté connecté sur la machine **LON-CL1** avec le compte **```Administrator```** et le mot de passe **```Pa55w.rd```**; l'outil **Windows Powershell** devrait être resté ouvert en tant qu'administrateur. Si nécessaire, maximisez sa fenêtre.
1. Tapez la commande suivante : 
	```powershell
	$mktGroup = New-MgGroup -DisplayName Marketing -Description 'Marketing department users' -groupTypes unified -MailEnabled -securityEnabled -mailNickName marketing
	```

1. Utilisez la commande suivante pour ajouter **Catherine** (compte utilisateur créés précédemment et encore référencé par la variable powershell) dans le nouveau groupe **Marketing** :
	```powershell
	New-MgGroupMember -groupId $mktGroup.Id -DirectoryObjectId $user1.Id
	```

1. Utilisez la commande suivante pour ajouter le compte de **Tameka** dans le nouveau groupe **Marketing** :
	```powershell
	New-MgGroupMember -groupId $mktGroup.Id -DirectoryObjectId $user2.Id
	```

1. Pour vérifier votre mise en oeuvre, vous pouvez utiliser la commande suivante :
	```powershell
	Get-MgGroupMember -groupId $mktGroup.Id | ForEach-Object {Get-MgUser -UserId $_.Id}
	```

1. Vérifiez que Catherine Richard et Tameka Reed apparaissent dans la liste des membres du groupe Marketing.

#### Tâche 5 - Configurer les mots de passe des utilisateurs
Vous avez précédemment utilisé le portail **Microsoft 365 admin center** pour mettre à jour la stratégie de mots de passe de Adatum en changeant la durée de vie de mot de passe pour la faire passer de 90 jours à 60. Vous souhaitez désormais utiliser Windows Powershell pour replacer cette durée d'expiration de mots de passe à 90 jours.  
Vous allez d'ailleurs en profiter pour modifier le timing de notification de cette expiration de mots de passe pour le faire passer à 10 jours.

1. Vous devriez être resté connecté sur la machine **LON-CL1** avec le compte **Administrator** et le mot de passe **Pa55w.rd**; l'outil **Windows Powershell** devrait être resté ouvert en tant qu'administrateur. Si nécessaire, maximisez sa fenêtre.
1. Tapez la commande suivante : 
	```powershell
	Get-MgDomain | ForEach-Object { update-MgDomain -DomainId $_.Id -PasswordNotificationWindowInDays 10 -PasswordValidityPeriodInDays 90 }
	```

1. Utilisez la commande suivante pour modifier le mot de passe du compte utilisateur Tameka :
	```powershell
	Reset-MgUserAuthenticationMethodPassword -UserId $user2.id -NewPassword 'P@$$w0rd' -AuthenticationMethodId (Get-MgUserAuthenticationPasswordMethod -userId $user2.Id).id
	```

1. Utilisez la commande suivante pour que le mot de passe de tous les utilisateurs expire (et s'assurer ainsi que la stratégie choisie à l'instant soit bien appliquée par tout le monde) : 
	```powershell
	Get-MGuser -All | ForEach-Object { Update-MgUser -UserId $_.Id -PasswordPolicies None}
	```

1. Conservez la session ouverte sur la machine virtuelle LON-CL1, réduisez l'outil **Administrator : Windows Powershell** dans la barre des tâches et maximisez la fenêtre de votre navigateur Internet pour l'exercice suivant.

<!-- IBCAN_PAGE_BREAK|a2e5 --># Atelier 2 - Gestion des utilisateurs et des groupes Microsoft 365

## Exercice 5 - Délégation d'administration

<div class="ibPrintNotes" data-exercise="a2e5" hidden></div>

Dans cet exercice, en tant que Dominique Skyetson et pour le projet pilote Microsoft 365 de Adatum, vous allez gérer la délégation administrative en affectant des rôles d'administrateurs à plusieurs utilisateurs. Vous allez procéder à ces affectations de rôle à la fois par le portail d'administration et en Powershell. Une fois ces rôles affectés, vous vous connecterez avec les comptes concernés pour tester la délégation administrative.

#### Tâche 1 - Délégation administrative dans le portail administratif

Connecté avec un compte *Global Admin*, vous allez commencer cet exercice par tester l'affectation de droits administratifs via le portail **Microsoft 365 Admin Center**. Vous allez ainsi affecter le rôle *Billing Administrtor* à *Elvis Cress* et le rôle *User Administrator* à *Leanna Goodwin*.

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue du précédent atelier. Le **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur et vous devriez y être connecté avec le compte *Dominique Skyetson*.
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation de gauche, ouvrez **Users** pour sélectionner **Active users**.
1. Dans la liste **Active users**, cliquez sur le nom de **Elvis Cress**. 
1. Dans le panneau d'informations de Elvis Cress qui s'affiche, l'onglet **Account** est affiché par défaut. Descendez dans la section **Roles** pour cliquer sur **Manage roles**.
1. Dans la fenêtre **Manage roles**, c'est l'option **User (no admin center access)** qui est actuellement sélectionnée par défaut. Puisque vous souhaitez affecter un rôle administratif à Elvis, sélectionnez l'option **Admin center access**. Cela va vous permettre de faire votre choix parmi les rôles administratif.
1. Elvis doit être promu au rang d'administrateur facturation. Cependant, comme le rôle **Billing administrator** n'est pas affiché parmi les plus utilisés, descendez un peu dans la fenêtre et cliquez sur **Show all by category**.
1. Dans la liste complète des rôles qui apparait en dessous, dans la catégorie **Other**, cochez la case à gauche du rôle **Billing administrator**, aavnt de cliquer sur **Save changes**.
1. Cliquez ensuite sur le **X** en haut à droite afin de fermer le panneau **Manage admin roles**. Vous êtes de retour sur la liste des utilisateurs.
1. Répétez les étapes précédentes pour affecter le rôle **User Administrator** à **Leanna Goodwin**.(Ce rôle fait partie de la liste des rôles administratifs les plus utilisés, vous n'aurez pas besoin de cliquer sur **Show all by category**).

#### Tâche 2 - Délégation administrative avec Windows PowerShell

Cette tâche est assez similaire à la précédente, mais vous allez la réaliser avec l'outillage Windows Powershell. Vous allez ainsi affecter le rôle *Service support administrator* à *Nona Snider* en utilisant le module Powershell Microsoft Graph.

1. Vous devriez être toujours connecté sur la machine virtuelle LON-CL1, avec l'outil **Administrator : Windows Powershell** réduit dans la barre des tâches. Agrandissez en la fenêtre (ou relancez l'outil en administrateur si vous l'aviez fermé).

1. Vous allez d'abord vous (re)connecter à l'environnement Microsoft 365 avec le module Microsoft Graph. Utilisez la commande suivante : 
	```powershell
	Connect-MgGraph -scopes user.Read.All,RoleManagement.ReadWrite.Directory
	```

1. Dans la fenêtre **Sign in** qui apparaît, connectez-vous avec le compte de Dominique Skyetson : ```dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` et son mot de passe (```ibForm@tion```). 
1. Dans la fenêtre **Permission requested**, cochez la case **Consent on behalf of your organization** et cliquez sur **Accept**.	
1. Pour voir tous les rôles disponibles, vous pouvez utiliser la commande suivante :
	```powershell
	Get-MgRoleManagementDirectoryRoleDefinition |Select-Object -Property DisplayName,Description | Out-GridView
	```

1. Dominique souhaite affecter le rôle **Service support administrator** à **Nona Snider**. Pour ce faire, vous pouvez utiliser la commande suivante :
	```powershell
	New-MgRoleManagementDirectoryRoleAssignment -DirectoryScopeId '/' -RoleDefinitionId (Get-MgRoleManagementDirectoryRoleDefinition | where DisplayName -eq 'Service support administrator').Id -PrincipalId (Get-MgUser -Search 'DisplayName:nona' -ConsistencyLevel eventual).Id
	```

1. Vous souhaitez désormais vérifier quels utilisateurs se sont vu affecter quels rôles. Pour réaliser cette recherche en Powershell, vous pouvez utiliser la commande suivante :
	```powershell
	Get-MgRoleManagementDirectoryRoleAssignment -Filter "roleDefinitionId eq '$((Get-MgRoleManagementDirectoryRoleDefinition |Select-Object -Property DisplayName,Description,Id | Out-GridView -PassThru).Id)'" | ForEach-Object {Get-MgUser -UserId $_.PrincipalId -ErrorAction SilentlyContinue}
	```

1. Dans la fenêtre affichant la liste des rôles, sélectionnez la ligne **Service Support Administrator** (Vous pouvez cliquer sur le titre de colonne **DisplayName** pour en trier le contenu) et cliquez sur **OK**.
1. Vérifiez que le compte de **Nona Snider** est dans la liste des utilisateurs a qui le rôle **Service support administrator** A été affecté.

	> Vous pouvez utiliser la même commande pour vérifier les utilisateurs à qui a été affecté le rôle **Billing Administrator**. Vous devriez ainsi pouvoir retrouver le compte de **Elvis Cress**.

1. Fermer l'outil **Windows Powershell** .

#### Tâche 3 - Vérification de la délégation administrative
Dans cette tâche, Dominique va vérifier la délégation administrative mise en oeuvre précédemment, concernant les utilisateurs Allan Yoo et Leanna Goodwin. En se connectant sur le portail 365 avec le compte de chacun, il sera possible de confirmer les opérations administratives disponibles à ces administrateurs. Au final, en tant que Leanna Goodwin, récemment promue au rang d'administratrice des utilisateurs de Adatum, vous réaliserez quelques opérations de maintenance des utilisateurs, comme réinitialiser les mots de passe ou bloquer un compte utilisateur.

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue du précédent atelier. Le **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur et vous devriez y être connecté avec le compte *Dominique Skyetson*.
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation de gauche, ouvrez **Users** pour sélectionner **Active users**.
1. Dans la liste **Active users**, cliquez sur le nom de **Alan Yoo**. 
1. Dans le panneau d'informations sur **Alan Yoo**, l'onglet **Account** est affiché par défaut. Sous la section **Roles**, vous devriez voir que Alan est un simple utilisateur de la solution : **No administrator access**. Cliquez sur le **X** en haut à droite pour fermer le panneau d'informations sur Alan.
1. Dans la liste **Active users**, cliquez sur **Leanna Goodwin**.
1. Dans le panneau d'informations sur **Leanna Goodwin**, l'onglet **Account** est affiché par défaut. Sous la section **Roles**, vous devriez voir que Leanna administratrice des utilisateurs : **User Administrator**. Cliquez sur le **X** en haut à droite pour fermer le panneau d'informations de Leanna.
1. Utilisez le menu en haut à droite de votre navigateur **Edge** pour ouvrir une nouvelle fenêtre de navigation privée (**New InPrivate window**).
1. Dans cette nouvelle fenêtre privée, saisissez l'adresse ```https://www.microsoft365.com``` pour vous rendre sur le portail Microsoft 365.
1. Vous allez commencer par vous connecter avec le compte de **Alan Yoo**. Cliquez sur **Sign In**
1. Dans la fenêtre **Sign-in**, entrez ```Alan@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com```.  
1. Dans la fenêtre **Enter password**, tapez ```Pa55w.rd```.
1. Dans la fenêtre **Update your pasword**, changez le mot de passe de Alan comme déjà vu précédemment de **Pa55w.rd** vers ```ibForm@tion```.
1. Dans la fenêtre **Stay signed in?**, cliquez sur **Yes**.
1. Si une fenêtre **Welcome to Microsoft 365** apparait, cliquez deux fois sur la flèche de droite pour pouvoir la fermer.
1. Notez que sur la page d'accueil de **Microsoft 365**, Alan n'a pas d'option **Admin** pour ouvrir le portail d'administration.
	Vous venez donc de vérifier que Alan ne peut accéder au **Microsoft 365 admin center** puisqu'il ne s'est vu affecter aucun rôle administratif.
1. Dans **Microsoft Edge**, en bas à gauche de la page, cliquez sur l'icône utilisateur de **Alan Yoo** (Le cercle contenant ses initiales **AY**), et cliquez sur **Sign out.**
1. Vous allez désormais vous connecter avec le compte de **Leanna Goodwin**. Dans votre page actuelle sur **Edge** en navigation privée, vous devriez être face à un message indiquant **Alan, you're signed out now**. Sur cette page, cliquez sur **Switch to a different account**, et saisissez l'adresse `Leanna@[[godeployDomain],[labXXXXX]].godeploylabs.com` dans le champ **Email address** qui s'affiche avant de cliquer sur **Sign in**.
1. Dans la fenêtre **Sign in**, vérifiez que l'adresse de Leanna est correctement saisie avant de cliquer sur **Next**.
1. Dans la fenêtre **Enter password**, entrez ```Pa55w.rd```.
1. Cliquez sur **Yes** sur la fenêtre **Stay signed in?**.
1. Si une fenêtre **Welcome to Microsoft 365** s'affiche, fermez-la comme vu précédemment.
1. Notez que, vu que Leanna s'est vu affecter un rôle administratif, elle peut accéder au centre d'administration : La tuile **Admin** Apparaît à gauche sur la page d'accueil. Cliquez sur **Admin** pour ouvrir le **Microsoft 365 admin center** dans un nouvel onglet.
1. Sur le portail **Microsoft 365 admin center**, sélectionnez le groupe d'options **Users** dans le menu de navigation pour cliquer sur l'option **Active users**.
1. De par son rôle **User admin**, Leanna a la permission de réinitialiser les mots de passe des utilisateurs. Leanna a récemment été contactée par **Elvis Cress** et **Alan Yoo**, chacun lui indiquant que son mot de passe aurait été compromis. La stratégie de sécurité de Adatum préconise dans ce cas que Leanna réinitialise le mot de passe des utilisateurs dont le compte a pu être compromis et exige que les utilisateurs changent ensuite leur mot de passe à la prochaine connexion.  
Dans la liste **Active users**, notez que, en passant la souris sur les lignes représentant les comptes utilisateurs, une clef apparait à droite du nom de l'utilisateur : c'est l'icône **Reset a password**. Cliquez sur la clef correspondant à la ligne de  **Elvis Cress**.
1. Dans le panneau **Reset password** de Elvis, décochez la case **Automatically create a password**, et saisissez **```Pa55w.rd```** dans le champ **Password**. Si nécessaire, cochez la case **Require this user to change their password when they first sign in**.
1. Cliquez sur **Reset password**.
1. Vous devriez recevoir un message d'erreur indiquant que vous ne pouvez réinitialiser le mot de passe de Elvis car il s'est vu affecté un rôle administratif. En effet, Elvis est *Billing Administrator*. Comme seul le *Global Admin* permet de réinitialiser le mot de passe d'un autre administrateur, Leanna devra demander à Dominique de s'occuper du cas de Elvis. Cliquez sur **Close**.
1. Si un sondage d'option s'affiche, fermez-le en cliquant sur **Cancel**.
1. Dans la liste **Active users**, cliquez sur la clef **Reset a password** en regard du compte de **Alan Yoo**.
1. Dans le panneau **Reset password** pour Alan, si nécessaire, décochez la case **Automatically create a password** et saisissez ```Pa55w.rd``` dans le champ **Password**. Si nécessaire,  sélectionnez la case à cocher **Require this user to change their password when they first sign in**.
1. Cliquez sur **Reset password**.
1. Dans la fenêtre **Password has been reset**, vous devriez voir un message vert indiquant que la réinitialisation du mot de passe a correctement eu lieu. Cliquez sur **close**.
1. Adatum suppute que le compte de Leila Macdonald's ait pu être compromis récemment. En conséquence, Leanna s'est vu demander de bloquer le compte de Leila pour l'empêcher de se connecter jusqu'à ce que l'équipe sécurité détermine l'étendue du problème. Dans la liste **Active users**, cliquez sur le nom de **Leila Macdonald**.   
1. Dans le panneau d'informations sur Leila, cliquez sur le bouton **Block sign-in**.
1. Dans la fenêtre **Block sign-in**, cochez la case **Block this user from signing in** avant de cliquer sur **Save changes**.
1. La fenêtre **Block sign-in** devrait afficher un message vert indiquant que le compte de Leila est désormais bloqué et qu'en plus de ne plus pouvoir ouvrir de session, elle sera déconnectée de ses session existantes dans les 60 minutes. Cliquez sur le **X** en haut à droite du panneau **Block sign-in** pour le fermer.
1. Leanna vient de recevoir notification que le compte de Dominique Skyetson a également été potentiellement compromis. Répétez les étapes précédentes pour bloquer le compte de Dominique Skyetson.
1. En tentant de bloquer le compte de Dominique, vous devriez recevoir un message d'erreur vous indiquant que cette opération ne peut être faite (**Changes could not be saved**). La raison à cette impossibilité est similaire à l'impossibilité de réinitialiser le mot de passe de Elvis précédemment : Dominique est *Global Admin*, et pas Leanna. Seul un *Global Administrator* peut bloquer un *Global Administrator*.
1. Pour vérifier si, oui ou non, Leila Macdonald peut se connecter après que son compte ait été bloqué, vous allez tenter de vous connecter en tant que Leila. Déconnectez-vous, sur Microsoft 365, du compte de **Leanna Goodwin** (En cliquant sur le cercle en haut à droite puis sur **Sign out**).
1. Fermez ensuite tous les autres onglets de la fenêtre de navigation privée de Edge sauf l'onglet **Sign out**. Sur ce dernier onglet, naviguez sur l'adresse `https://www.microsoft365.com`.
1. Sur la page **Login - Microsoft 365**, cliquez sur **Switch to a different account**.
1. Saisissez l'adresse `leila@[[godeployDomain],[labXXXXX]].godeploylabs.com` dans le champ **Email address** avant de cliquer sur **Sign in**.
1. Sur la page **Sign in**, vérifiez l'adresse saisie pour Leila avant de cliquer sur **Next** et saisir le mot de passe ```Pa55w.rd```.
1. La fenêtre **Pick an account** devrait apparaître et afficher un message d'erreur rouge indiquant **Your account has been locked. Contact your support person to unlock it, then try again.** 
	Vous venez de vérifier que Leila (ou quelqu'un ayant obtenu son nom de connexion et son mot de passe) ne peut ouvrir de session.
1. Fermez maintenant la fenêtre de navigation privée de **Edge** et basculez sur votre autre fenêtre **Edge**, dans laquelle vous devriez être resté connecté sur l'environnement **Microsoft 365** en tant que Dominique Skyetson. La liste **Active users** devrait être affichée dans le portail **Microsoft 365 admin center** depuis les précédentes tâches.
1. Après investigation, l'équipe sécurité de Adatum a déterminé que le compte de Leila Macdonald's n'a finalement pas été compromis ; Il a ainsi été demandé à Dominique de supprimer le blocage du compte de Leila.  
Répétez les étapes vues précédemment pour débloquer le compte de Leila. (Notez que le panneau **Block sign-in** s'intitulera cette fois-ci **Unblock sign-in**).
1. Dans le panneau **Unblock sign-in**, la case à cocher **Block this user from signing in** est actuellement cochée. Décochez-la puis cliquez sur **Save changes**.
1. Une fois que le compte de Leila a été débloqué, cliquez sur le **X** en haut à droite pour fermer le panneau **Unblock sign-in**.

<!-- IBCAN_PAGE_BREAK|a3e1 --># Atelier 3 - Connectivité à Microsoft 365

## Exercice 1 - Utilisation de Microsoft 365 connectivity analyzer

<div class="ibPrintNotes" data-exercise="a3e1" hidden></div>

Le *Remote Connectivity Analyzer* est un outil web pensé pour aider les administrateurs IT à dépanner les soucis de connectivité avec leurs déploiement Exchange, Microsoft 365 et Teams. Dominique Skyetson, en tant qu'administrateur de Adatum, doit savoir utiliser cet outil si une configuration erronnée vient interrompre les communications dans le projet pilote par exemple.

#### Tâche 1 - Test de connectivité
Dans cette tâche, vous allez ouvrir l'outil *Microsoft Test connectivity* et vous y connecter.

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue de l'atelier précédent. Le **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur et vous devriez y être connecté avec le compte *Dominique Skyetson*.
1. Ouvrez un nouvel onglet dans le navigateur et rendez-vous à l'adresse du *Remote Connectivity Analyzer* : ```https://testconnectivity.microsoft.com```  
1. Sur la page **Microsoft Remote Connectivity Analyzer**, dans le menu de navigation vertical à gauche, l'onglet **Exchange Online** est affiché par défaut (sélectionnez le si ce n'est pas le cas). Sur cet onglet, sélectionnez la tuile intitulée **Exchange Online Custom Domain DNS Connectivity Test**.
1. Sur la page **Exchange Online Custom Domain DNS Connectivity Test**, saisissez les informations suivantes :

	- Entrez ```[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` dans le champ **Domain Name**
	- Dans la section **Service Selection**, Laissez cochée la case **Microsoft 365 (Default)**
	- Dans la section  **Verification**, saisissez la suite de caractères affichés en violet (Le code de vérification est insensible à la casse) avant de cliquer sur **Verify**.

1. Si la vérification se passe correctement, un message apparaît en bas de page indiquant : **You are now verified for the rest of this browser session (30 minute maximum).**
1. Cliquez sur **Perform Test**.

	> Si vous recevez un message concernant le fait d'avoir réalisé trop de tests les 60 dernières secondes, attendez quelques instant avant de réessayer.

1. Lorsque vous voyez appraître le message **Successfully verified specified external domain name settings for your domain in Microsoft 365**, cliquez sur la flèche basse **V** à gauche de **Test Steps** (cliquez sur le texte **Test Steps** lui-même ne fonctionne pas) afin de parcourir les étapes vérifiées lors de ce test de votre domainde de tenant.

#### Tâche 2 - Test de connectivité Exchange

vous allez maintenant uiliser l'outil *Microsoft Test Connectivity* pour vérifier la connectivité réseau d'une boite aux lettre Outlook.

1. Sur la page **Microsoft Remote Connectivity Analyzer**, dans le menu de navigation vertical à gauche, cliquez sur l'onglet **Exchange Online**.
1. Sélectionnez la tuile intitulée **Outlook Connectivity**.
1. Sur la page **Outlook Connectivity**, saisissez les informations suivantes :  

	- Entrez ```admin@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` dans le champ **Email Address**
	- Cliquez sur le bouton bleu **Sign in** et authentifiez vous avec les informations de *MOD Administrator*
	- En bas de page, cochez la case **I understand that I must use the credentials of a working account from my Exchange domain to be able to test connectivity to it remotely. I also acknowledge that I am responsible for the management and security of this account**.
	
1. Cliquez sur **Perform Test**.

	> Si vous recevez un message concernant le fait d'avoir réalisé trop de tests les 60 dernières secondes, attendez quelques instant avant de réessayer.

1. Lorsqu'apparait le message **The Outlook connectivity test completed successfully** message, cliquez sur la flèche basse **V** à gauche de **Test Steps** (cliquez sur le texte **Test Steps** lui-même ne fonctionne pas) afin de parcourir les étapes vérifiées lors de ce test de connectivité.  
Chaque étape a une mention **Test Steps** que vous pouvez utiliser pour consulter des opérations détaillées. 
1. Fermez votre navigateur Internet.

<!-- IBCAN_PAGE_BREAK|a4e1 --># Atelier 4 - Configuration de la synchronisation d'identités

## Exercice 1 - Préparation de la synchronisation d'identités

<div class="ibPrintNotes" data-exercise="a4e1" hidden></div>

Comme dans les précédents exercices, vous allez vous glisser dans la peau de Dominique Skyetson, administrateur de Adatum. Dans cet atelier, vous réaliserez les tâches nécessaires pour gérer l'hybridation de la gestion d'identités du projet pilote entre l'Active Directory existant et l'Entra ID utilisé par l'environnement Microsoft 365.  
Pendant cet atelier, vous allez préparer, installer et mettre en oeuvre Entra Connect qui sera un jalon important pour Adatum dans sa décision de déplacer ses données et applications vers le cloud 365.

#### Tâche 1 - Modification des UPN
Dans *Active Directory Domain Service* (ADDS), le suffixe UPN par défaut est le nom DNS du domaine dans lequel le compte utilisateur a été créé. L'assistant d'installation Entra Connect utilise l'attribut *UserPrincipalName* (bien qu'il soit possible d'en sélectionner un autre) comme nom de connexion utilisateur pour Entra Id.  
L'environnement de test du pilote de Adatum que vous utilisez a été créé par votre hébergeur d'ateliers et le nom de domaine de l'ADDS choisi est **adatum.com**. Les utilisateurs ADDS ont donc été créés dans ce domaine qui ne sera pourtant pas celui utilisé pour l'environnement Entra Id de Adatum (le nom DNS d'entreprise *[[godeployDomain],[labXXXXX]].godeploylabs.com* sera utilisé à la place).  
Dans cette tâche, vous allez vous faciliter la vie en utilisant Windows Powershell pour changer le suffixe UPN de votre environnement ADDS et l'UPN de tous les utilisateurs *on-premises*.  

1. Basculez sur la machine virtuelle **LON-DC1** sur laquelle vous devriez encore être connecté avec le compte **ADATUM\Administrator** et le mot de passe **Pa55w.rd**.
1. Faites un clic-droit sur le bouton démarrer pour sélectionner **Windows PowerShell (Admin)**.
1. Dans la fenêtre **Administrator: Windows PowerShell**, utilisez la commande suivante pour référencer votre nom DNS d'entreprise :
	```$upnSuff = '[[godeployDomain],[labXXXXX]].godeploylabs.com'```
1. Utilisez ensuite la commande suivante pour remplacer le suffixe UPN de votre forêt ADDS :
	```Set-ADForest -identity adatum.com -UPNSuffixes @{replace = $upnSuff}```
1. Utilisez, pour terminer, la commande suivante pour modifier l'UPN de tous les utilisateurs du domaine ADDS :  
	```Get-ADUser -Filter * -Properties SamAccountName | ForEach-Object { Set-ADUser $_  -UserPrincipalName ($_.SamAccountName.replace(' ','') + '@' + $upnSuff )}```

#### Tâche 2 - Préparation de comptes à problèmes
L'intégration de votre ADDS on-premises avec Entra Id rendra vos utilisateurs plus productifs tout en facilitant l'administration de leurs comptes. Cependant, des erreurs peuvent survenir car, tout au long de la vie de votre ADDS, des informations érronées ont pu être utilisées qui n'ont pas posé de problème on-premises mais ne pourraient être supportées dans le cloud.  
Par exemple, plusieurs objets pourraient avoir un attribut **ProxyAddresses** ou **UserPrincipalName** identiques dans l'ADDS. De nombreuses erreurs similaires pourraient poser problème dans la mise en place de la synchronisation de votre annuaire.  
Dans cette tâche, vous allez utiliser un script pour implémenter quelques erreurs sur les utilisateurs du projet pilote Adatum afin d'identifier ensuite la manière de trouver et corriger ce genre d'erreurs.

1. Sur LON-DC1, dans la fenêtre **Administrator: WIndows Powershell**, utilisez la commande suivante pour récupérer le script que vous utiliserez ensuite :
	```Invoke-WebRequest "https://raw.githubusercontent.com/ib-cegos/labs/master/resources/problemUsers.ps1" | Select-Object -ExpandProperty Content | Out-File ".\problemUsers.ps1"```
1. Lancez ensuite ledit script dans la fenêtre **Administrator: Windows PowerShell** :
	```.\problemUsers.ps1```

	> Vous devriez pouvoir exécuter ce script sans problème car vous avez déjà changé la stratégie d'exécution des scripts sur LON-DC1 dans l'atelier 2.

1. Attendez que le script ait terminé son exécution avant de poursuivre sur la tâche suivante.

#### Tâche 3 - Identification et correction des problèmes avec powerShell
Dans cette tâche vous allez appréhender l'utilisation d'un script powerShell pour identifier et corriger les problèmes sur vos objets ADDS avant de mettre en place la synchronisation de ce dernier vers Entra Id.

1. Vous devriez être encore connecté sur **LON-DC1** à l'issue de la tâche précédente.
1. Dans la fenêtre **Administrator: WIndows Powershell**, utilisez la commande suivante pour récupérer le script que vous utiliserez ensuite :
	```Invoke-WebRequest "https://raw.githubusercontent.com/ib-cegos/labs/master/resources/ibIdFix.ps1" | Select-Object -ExpandProperty Content | Out-File ".\ibIdFix.ps1"```
1. Lancez ensuite ledit script dans la fenêtre **Administrator: Windows PowerShell** :
	```.\ibIdFix.ps1```  
1. Une foix que le script a terminé, il génère un export des problèmes en .csv et ouvre une fenêtre **$Report|out-gridview** vous permettant de constater les comptes posant problèmes dans l'ADDS et qu'il serait impossible de synchroniser correctement.

	- La première ligne indique un problème dans la syntaxte UPN de l'utilisateur *Klemen*,
	- Les secondes et troisièmes lignes indiquent que deux comptes ont l'attribut emailAddress dédoublé.
	- Notez également que le domaine des deux derniers comptes en erreur n'est pas légitime dans l'environnement de l'atelier.
	
1. Ouvrez donc l'outil **Server Manager** (depuis le menu démarrer si vous l'aviez fermé) pour cliquer sur le menu **Tools/Active Directory Administrative Center**.
1. Dans l'outil **Active Directory Administrative center**, saisissez ```klemen``` dans le champ **Search** (à droite, dans l'ancadré **Global Search**).
1. Dans la fenêtre de résultat, double-cliquez sur l'utilisateur **Klemen Sic** pour supprimer le caractère **@** après son prénom dans le champ **User UPN logon**.
1. Cliquez sur **OK** pour valider le changement.
1. Dans la fenêtre **Global Search**, effaçez le nom **Klemen** et saisissez le nom ```Logan``` avant d'appuyer sur **Entrée**.
1. Dans la fenêtre de résultat, double-cliquez sur l'utilisateur **Logan Boyle** pour corriger le contenu de son champ **E-mail** avec la valeur ```logan@[[godeployDomain],[labXXXXX]].godeploylabs.com```.
1. Cliquez sur **OK** pour valider le changement.
1. Dans la fenêtre **Global Search**, effaçez le nom **Logan** et saisissez le nom ```Lara``` avant d'appuyer sur **Entrée**.
1. Dans la fenêtre de résultat, double-cliquez sur l'utilisateur **Lara Raisic** pour corriger le contenu de son champ **E-mail** avec la valeur ```lara@[[godeployDomain],[labXXXXX]].godeploylabs.com```.
1. Cliquez sur **OK** pour valider le changement.
1. Fermez l'outil **Active Directory Administrative Center**, vous êtes prêt à mettre en place la synchronisation.

<!-- IBCAN_PAGE_BREAK|a4e2 --># Atelier 4 - Configuration de la synchronisation d'identités

## Exercice 2 - Mise en oeuvre de la synchronisation d'identités

<div class="ibPrintNotes" data-exercise="a4e2" hidden></div>

Dans cet exercice, vous allez activer la synchronisation entre l'ADDS de Adatum et Entra Id. Entra Connect continuera ensuite à synchroniser les changements toutes les 30 minutes.  
Vous allez ensuite utiliser des objets groupes pour faire quelques modifications sur l'ADDS et vérifier l'effet de la synchronisation sur les objets équivalents dans Entra Id. Dominique souhaite aussi comprendre comment forcer la synchronisation si une opération urgente ne peut attendre le délai de 30 minutes.

> En démarrant cet exercice, préparez-vous à réaliser les 3 premières tâches sans délai entre elles pour éviter que Entra Connect ne synchronise automatiquement les changements que vous souhaitez forcer.

#### Tâche 1 - Installer Entra Connect
Dans cette tâche, vous allez utiliser l'assistant d'installation de Entra Connect pour activer la synchronisation entre l'ADDS de Adatum et Entra Id. Une fois la configuration terminée, le processus de synchronisation démarre automatiquement.

1. Vous devriez encore être connecté sur **LON-DC1** avec le compte **Administrator** à l'issue de la tâche précédente.
1. Avant de pouvoir installer Entra Connect, il nous faut activer la version 1.2 du protocole TLS sur LON-DC1. Dans la barre des tâches, cliquez sur l'icône de l'outil **Administrator: Windows PowerSHell ISE** que vous aviez réduit précédemment.
1. utilisez la commande suivante pour activer le TLS 1.2 et attendez que LON-DC1 redémarre :  
```Invoke-Command -ScriptBlock ([Scriptblock]::Create((Invoke-WebRequest 'https://raw.githubusercontent.com/ib-cegos/labs/master/resources/enabletls12.ps1' -useBasicParsing).Content))```
1. Une fois que la machine LON-DC1 a redémarré, connectez-vous dessus avec le compte ```adatum\administrator``` et le mot de passe ```Pa55w.rd```.

	> Il pourra être intéressant de (re)faire le ménage dans le démarrage du réseau du controleur de domaine avant de poursuivre les manipulations. Demandez conseil à votre formateur/formatrice le cas échéant...

1. Lancez votre navigateur Internet afin de vous rendre à l'adresse ```https://admin.microsoft.com```.
1. Si besoin, dans la boite **Sign in**, utilisez l'adresse de connexion de Dominique Skyetson (```dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com```) et cliquez sur **Next**.

	1. Dans la boite **Enter password**, saisissez ```ibForm@tion``` et cliquez sur **Sign in**.
	1. Dans la boite **Stay signed in?**, cochez la case **Don’t show this again** et cliquez sur **Yes.**

1. Dans le menu de navigation à gauche, cliquez sur **Identity** sous la section **Admin centers** (il pourra être nécessaire de cliquer sur **Show All**) afin d'ouvrir le portail d'administration Entra dans un nouvel onglet.
1. Dans le centre d'administration Entra, ouvrez la section **Entra Id** pour cliquer sur **Entra Connect**.
1. Dans la page **Microsoft Entra Connect - Get started**, cliquez sur l'onglet **Manage** dans la zone de détails à droite.
1. Dans la seconde partie, intitulée **Manage from on-premises : Connect Sync**, cliquez sur le bouton **Donwload Connect Sync Agent**.
1. Dans le panneau **Microsoft Entra Connect Agent** qui s'est ouvert, cliquez sur le bouton **Accept terms & download**.

	> Le téléchargement peut prendre quelques minutes à démarrer dans votre navigateur, sans aucune information... Ici encore, la patience est de rigeur...

1. Dans la notification en haut à droite (si le fichier est "téléchargé et que la notification n'apparaît pas, allez chercher le fichier **AzureADConnect.msi** dans le dossier **Downloads** de LON-DC1), cliquez sur **Open File** sous le nom du fichier téléchargé : **AzureADConnect.msi**.
1. Si une boite de dialogue **Do you want to run this file?** s'affiche, cliquez sur **Run**.
1. L'installation de l'outil Entra Connect a démarré, sur la fenêtre **Welcome to Entra Connect**, cochez la case  **I agree to the license terms and privacy notice** avant de cliquer sur **Continue**.

	> Si la fenêtre **Welcome to Entra Connect** n'apparait pas, cherchez son icône dans la barre des tâches (la plus à droite) et cliquez dessus.

1. Sur la page **Express Settings**, lisez les mentions concernant la synchronisation de la forêt **Adatum** et cliquez sur le bouton **Use express settings**.
1. Sur la page **Connect to Entra**, saisissez ```dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` dans le champ **USERNAME** et cliquez sur **Next**
1. Connectez vous ensuite avec le compte de Dominique (mot de passe ```ibForm@tion```).
1. Sur la page **Connect to AD DS**, saisissez ```ADATUM\Administrator``` dans le champ **USERNAME**, et ```Pa55w.rd``` dans le champ **PASSWORD** avant de cliquer sur **Next**.
1. Dans la page **Entra sign-in configuration**, cochez la case **Continue without matching all UPN suffixes to verified domains** et cliquez sur **Next**.
1. Sur la page **Ready to configure**, vérifiez que la case **Start the synchronization process when configuration completes** soit cochée avant de cliquer sur **Install**.
1. Attendez la fin de la mise en oeuvre de la synchronisation (cela prendra quelques minutes) et cliquez sur **Exit**.
1. Cliquez sur le bouton démarrer en bas à gauche de la barre des tâches. Dans le menu **Démarrer**, lancez l'outil **Synchronization Service**, en allant le chercher dans le groupe d'applications **Azure AD Connect** sur l'onglet **All apps**.  

	> Si, en sélectionnant **Azure AD Connect** dans le menu **Démarrer** vous ne pouvez ouvrir le groupe et sélectionner **Synchronization Service**, il pourra être nécessaire de vous déconnecter et reconnecter sur LON-DC1.

1. Dans la fenêtre **Synchronization Service Manager**, l'onglet **Operations** est affiché par défaut, vous permettant de surveiller le processus de synchronisation.
1. Attentez que la tâche **Export** pour **[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com** soit terminée ; la colonne **Status** devrait indiquer **success**. Une fois terminée, cliquez sur cette ligne.
1. Dans la partie inférieure de la fenêtre, un panneau de détail affiche les informations concernant cette opération de synchronisation.
1. Dans la section **Export Statistics**, notez le nombre d'utilisateurs qui ont été ajoutés et mis à jour.
1. Maintenant que Entra Connect a réalisé la première synchronisation, les suivantes auront lieu toutes les 30 minutes. Fermez l'outil **Synchronization Service Manager**. 
1. Retournez sur votre navigateur Internet et fermez tous les onglets ouverts sauf **Microsoft 365 admin center** pour la tâche suivante. 

#### Tâche 2 - Créer des groupes pour Tester la synchronisation
Vous allez maintenant créer un nouveau groupe de sécurité dans ADDS, le mettre à jour et l'inclure dans un groupe *built-in* de l'ADDS.  
Chaque groupe se verra affecté plusieurs membres. Après la synchronisation forcée, vous vérifierez que le groupe de sécurité est désormais visible dans Entra Id. Vous vérifierez également que le groupe *built-in* n'est PAS visible dans Entra Id, bien qu'il comporte des utilisateurs présents dans l'annuaire.  
Les groupes *Built-in* sont des groupes prédéfinis dans l'ADDS, situés dans le conteneur système **Builtin**. Ils sont créés nativement lors de l'installation de l'ADDS et n'ont d'utilité que dans la mise en place de la sécurité de l'ADDS. N'étant pas utiles dans le cloud, vous vérifierez ici qu'ils n'y sont pas synchronisés.

1. Vous devriez toujours être connecté sur **LON-DC1** avec le compte **Administrator** à l'issue de la tâche précédente.
1. Si vous aviez fermé l'outil **Server Manager**, réouvrez-le maintenant ; sinon, cliquez sur son icône dans la barre des tâches pour le maximiser.
1. Dans l'outil **Server Manager**, cliquez sur le menu **Tools** en haut à droite et lancez le **Active Directory Administrative center**.
1. Vous allez commencer par ajouter des membres dans un groupe *built-in*. Dans la console **Active Directory Administrative Center**, sélectionnez **Adatum (local)**, dans la navigation à gauche.
1. Double-cliquez sur le conteneur **Builtin**. Cela va afficher tous les groupes *built-in* qui ont été créés automatiquement lors de l'installation de l'ADDS de Adatum.
1. Dans le panneau détail à droite, double-cliquez sur le groupe **Print Operators**.
1. Dans la fenêtre des propriétés de **Print Operators**, choisissez l'onglet **Members**et cliquez sur le bouton **Add**.
1. Dans la boite de dialogue **Select Users, Contacts, Computers, Service Accounts, or Groups**, tapez les noms d'utilisateur suivant dans le champ **Enter the object names to select** : ```Ashlee; Juanita; Morgan``` avant de cliquer sur le bouton **OK**.
1. Dans la fenêtre **Print Operators**, cliquez encore sur **OK** pour revenir sur la fenêtre **Active Directory Administrative Center**.
1. Vous allez maintenant créer un groupe de sécurité. Dans l'arborescence de la console, double-cliquez sur **Adatum (local)**.
1. Faites un clic-droit sur l'OU **Research**, choisissez successivement **New >** puis **Group**.
1. Dans la fenêtre **Create Group:** saisissez les informations suivantes :

	- Group name: ```Manufacturing```
	- Group type: **Security**
	- Group scope: **Universal**

1. Basculez sur l'onglet **Members** et répétez les opérations que vous avez faites sur le premier groupe pour ajouter les utilisateurs suivant à ce groupe : ```Bernardo; Charlie; Dawn```.
1. Cliquez sur **OK** mais laissez l'outil **Active Directory Administrative Center** ouvert pour la tâche suivante.  
 
#### Tâche 3 - Modifier des groupes pour Tester la synchronisation 

1. Dans l'outil **Active Directory Administrative Center**, double-cliquez sur **Adatum (local)** puis sur l'OU **Research** dans l'arborescence de la console.
1. Dans le panneau de droite, parcourez la liste des utilisateurs et des groupes pour double-cliquer sur le groupe de sécurité **Research**.
1. Dans la fenêtre de propriétés du groupe **Research**, sélectionnez l'onglet **Members** pour visualiser les membres du groupe.
1. Vous souhaitez supprimer plusieurs membres du groupe : sélectionnez la ligne de **Cai Chu**
1. En maintenant la touche **[Ctrl]**, cliquez sur les lignes de **Shannon Booth** et **Tia Zecirevic**.
1. Une fois les trois utilisateurs sélectionnés, cliquez sur le bouton **Remove**.
1. Vérifiez que les utilisateurs choisis ne sont plus dans la liste des membres et cliquez sur **OK**.
1. Fermez la console **Active Directory Administrative Center**.

#### Tâche 4 - Forcer la synchronisation
Dans cette tâche, vous allez forcer volontairement la synchronisation entre l'ADDS et Entra Id, plutôt que d'attendre jusqu'à 30 minutes qu'elle ait lieu. Vous allez utiliser Windows PowerShell pour lancer cette synchronisation.

1. Sur LON-DC1, si la console **Administrator: Windows PowerShell** est toujours ouverte, **vous devez la fermer maintenant**.

	> Le module Powershell n'était pas encore installé lorsque vous avez précédemment lancé la console Windows Powershell : il vous faut donc désormais la relancer pour avoir accès aux commandes de ce module que vous allez utiliser dans cette tâche.

1. Faites un clic-droit sur le bouton Démarrer, tout à gauche de la barre des tâches et sélectionnez **Windows Powershell (Admin)**.
1. Dans la fenêtre **Administrator: Windows PowerShell**, utilisez la commande suivante pour lancer la synchronisation : ```Start-ADSyncSyncCycle -PolicyType Delta```

	> Le paramètre **Delta** est utilisé pour ne synchroniser que les mises à jour.

1. Une fois la synchronisation lancée, minimisez la console PowerShell (ne la fermez pas) et passez à la tâche suivante.

#### Tâche 5 - Résultat de la Synchronisation   

1. Basculez sur la machine virtuelle **LON-CL1**.
1. Examinons maintenant les résultats de la synchronisation. Lancez votre navigateur Edge et ouvrez le centre d'administration Microsoft 365 en utilisant l'adresse suivante : ```https://admin.microsoft.com```.
1. Connectez vous avec le compte de Dominique (```dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` avec son mot de passe ```ibForm@tion```.
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation à gauche, ouvrez le groupe d'options **Teams & groups** pour sélectionner **Active teams & groups**.
1. Dans la liste **Active teams & groups**, vérifiez qu'un groupe **Manufacturing** apparaît sous l'onglet **Security groups**.
1. Vérifiez que, au contraire le groupe **Print Operators** n'est pas présent.

	> Il vous faudra peut-être attendre quelques minutes pour que le groupe **Manufacturing** apparaisse, continuez à rafraichir la liste avec le bouton **Refresh** jusqu'à ce qu'il soit présent.

1.	Dans la liste **Active teams & groups**, sur la ligne du groupe **Manufacturing** vérifiez que la colonne **Sync status** contient une icône **Synced from on-premises**.
1. Cliquez sur le groupe **Manufacturing** pour ouvrir son panneau de propriétés.
1. Sur le panneau **Manufacturing**, notez le message indiquant que vous ne pouvez gérer cet objet ici car il a été synchronisé depuis votre ADDS.  
1. Cliquez sur l'onglet **Members** et vérifiez que trois utilisateurs sont membres de ce groupe : ceux que vous avez ajouté lors d'une précédente tâche de cet exercice.
1. Fermez le panneau **Manufacturing**.
1. Regardons maintenant le contenu de ce groupe en PowerShell. Dans la barre des tâches, cliquez sur l'icône de l'outil **Administrator: Windows PowerSHell ISE** que vous aviez réduit précédemment.
1. Dans la partie basse (fond bleu) de l'outil, tapez la commande suivante pour vous connecter à Entra Id : ```Connect-MgGraph -scopes User.Read.All,Group.Read.All```.
1. Dans la fenêtre **Sign in** qui apparaît, connectez-vous avec le compte de Dominique Skyetson : ```dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` (ou sélectionnez le dans la fenêtre **Pick an Account** le cas échéant) et son mot de passe (*ibForm@tion*). 
1. Dans la fenêtre **Permission requested**, cochez la case **Consent on behalf of your organization** et cliquez sur **Accept**.
1. Utilisez la commande suivante pour chercher le groupe **Print Operators** :
	```Get-MgGroup -Filter "DisplayName eq 'Print Operators' and MailEnabled eq false"```
1. Vérifiez que la commande ne renvoie pas de réponse, ceci indiquant que le groupe **Print Operators** est introuvable car il n'a pas été synchronisé.
1. Utilisez la commande suivante pour obtenir l'identité du groupe **Manufacturing** :
	```$mktGroup = Get-MgGroup -Filter "DisplayName eq 'Manufacturing' and MailEnabled eq false"```
1. Vous pouvez utiliser la commande suivante pour vérifier si le groupe **Manufacturing** a été trouvé : ```$mktGroup```
1. Utilisez la commande suivante pour afficher la liste des utilisateurs inclus dans le groupe **Manufacturing** :
	```Get-MgGroupMember -GroupId $mktGroup.Id | ForEach-Object { Get-MgUser -UserId $_.Id} | Out-GridView```
1. Vérifiez que les utilisateurs suivants, que vous aviez ajouté à la tâche précédente sont présents dans la liste affichée :
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

<!-- IBCAN_PAGE_BREAK|a4e3 --># Atelier 4 - Configuration de la synchronisation d'identités

## Exercice 3 - Activation de la jonction de domaine hybride

<div class="ibPrintNotes" data-exercise="a4e3" hidden></div>

Dans cet exercice, vous allez configurer Entra Connect pour configurer la jonction de domaine Hybride. La jonction de domaine hybride permet aux ordinateurs de l'entreprise qui ont un compte dans ADDS d'être automatiquement inscrits et reconnus dans Entra Id.

#### Tâche 1 - Configurer la jonction hybride Entra Id
Dans cette tâche, vous allez utiliser l'assistant de configuration de Entra Connect pour activer la jonction hybride des ordinateurs Windows membres de l'ADDS.

1. Basculez sur la machine virtuelle **LON-DC1** sur laquelle vous devriez être resté connecté avec le compte **Administrator**.
1. Sur le bureau, double-cliquez sur l'icône **Azure AD Connect** pour lancer l'outil Entra Connect.
1. Dans la page d'accueil **Welcome to Azure AD Connect**, cliquez sur le bouton **Configure**.
1. Sur la page **Additional tasks**, sélectionnez la ligne **Configure device options** puis cliquez sur **Next**.
1. Sur la page **Overview**, cliquez sur **Next**.
1. Sur la page **Connect to Entra**, saisissez les informations de connexion de Dominique Skyetson (```dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` dans le champ **USERNAME** et ```ibForm@tion``` dans le champ **PASSWORD**) puis cliquez sur **Next**.
1. Si une fenêtre **Sign in to your account** surgit, utilisez la pour vous connecter avec le compte de Dominique.
1. Sur la page **Device options**, sélectionnez **Configure Hybrid Microsoft Entra ID join** et cliquez sur **Next**.
1. Sur la page **Device operating systems**, cochez la case **Windows 10 or later domain-joined devices** et cliquez sur **Next**.
1. Sur la page **SCP configuration**, sélectionnez la case à cocher en regard de **Adatum.com**
	1. Sélectionnez **Entra Id** dans le champ **Authentication Service**.
	1. Cliquez sur **Add**.
	1. Dans la boite de dialogue **Enterprise Admin Credentials**, entrez ```ADATUM\Administrator``` dans le champ **USERNAME** et ```Pa55w.rd``` Dans le champ **PASSWORD**.
	1. Cliquez sur **OK**.

1. De retour sur la fenêtre **SCP configuration**, cliquez sur **Next**.
1. Sur la page **Ready to configure**, cliquez sur le bouton **Configure**.
1. Sur la page **Configuration complete**, cliquez sur **Exit**.
1. Basculez sur la machine **LON-CL1** faites un clic-droit sur le bouton **Démarrer** et choisissez **Shut down or sign out >** puis **sign out**.
1. Si une liste d'applications ouvertes empèchant la fermeture de session s'affiche, cliquez sur **Sign out anyway**.
1. Sur la mire d'ouverture de session, cliquez sur **Other user** et connectez-vous avec le compte de  ```Beth@[[godeployDomain],[labXXXXX]].godeploylabs.com``` et le mot de passe ```Pa55w.rd```.

#### Tâche 2 - Affecter des licences

1. Basculez de nouveau sur **LON-DC1**, vous devriez encore être connecté en tant que Dominique Skyetson sur le portail **Microsoft 365 admin center** dans **Edge**.
1. Dans le portail **Microsoft 365 admin center**, naviguez vers la liste des **Active Users** si nécessaire.
1. Dans la liste des **Active users**, dans le champ **Search active users list** entrez ```isaiah``` et appuyez sur **[Entrée]**.
1. Cliquez sur le nom de **Isaiah Langer**.
1. Dans le panneau qui apparait concernant les informations de **Isahia Langer**, cliquez sur l'onglet **Licenses and apps**.
1. Sur l'onglet **Licenses and apps** de Isaiah Langer, décochez toutes les cases et cliquez sur **Save changes**
	> Les étapes précédentes ne sont nécessaires que si votre tenant ne contient pas assez de licences pour pouvoir en affecter à Beth dans les étapes suivantes. Ne tenez pas compte des étapes précédentes si vous avez assez de licences à affecter à Beth....
1. Dans la liste des **Active users**, dans le champ **Search active users list** entrez ```beth``` et appuyez sur **[Entrée]**.
1. Cliquez sur le nom de **Beth Burke**.
1. Dans le panneau qui apparait concernant les informations de **Beth Burke**, cliquez sur l'onglet **Licenses and apps**.
1. Sur l'onglet **Licenses and apps** de Beth Burke, select **Add License** cochez toutes les cases en regard des licences disponibles et cliquez sur **Save changes**

	> Il vous faudra peut-être décocher l'*App* **Skype for Business Online (plan1)** pour pouvoir valider votre opération.

1. Cliquez sur le **X** en haut à droite pour fermer le panneau d'informations de Beth Burke.

#### Tâche 3 - Vérifier la synchronisation des périphériques

1. Sur LON-DC1, dans la fenêtre **Administrator: Windows PowerShell**, utilisez la flèche haute du clavier pour rappeler la dernière commande :  
   ```Start-AdSyncSyncCycle -PolicyType Delta```
1. Appuyez sur **[Entrée]** pour lancer la commande de synchronisation.
1. De retour dans votre navigateur Internet, dans le portail **Microsoft 365 admin center**, dans le menu de navigation de gauche, cliquez sur **...Show all** pour afficher toutes les options.
1. En bas du menu de navigation, dans la section **Admin centers**, cliquez sur **Identity** pour ouvrir le centre d'administration Entra.
1. Dans le portail **Entra admin center**, dans le menu de navigation à gauche, ouvrez le groupe d'options **Devices** pour sélectionner **All devices**.
1. Dans la fenêtre **Devices - All devices**, vérifiez que **LON-CL1** apparait. Si ce n'est pas le cas, attendez un instant et, au-dessus de la liste des périphériques, cliquez sur le bouton **Refresh** jusqu'à voir apparaitre **LON-CL1**.

#### Tâche 4 - Vérifier l'hybridation Entra Id

1. Basculez de nouveau sur la machine **LON-CL1**.
1. Vous devriez toujours être connecté avec le compte de Beth. Pour vous assurer que la jonction hybride soit effective le plus rapidement possible, il vous faut vous déconnecter : faites un clic-droit sur le bouton **Démarrer** et choisissez **Shut down or sign out >** puis **sign out**.
1. Si une liste d'applications ouvertes empêchant la fermeture de session s'affiche, cliquez sur **SIgn out anyway**.
1. Sur la mire d'ouverture de session, connectez vous avec le compte de  ```Beth@[[godeployDomain],[labXXXXX]].godeploylabs.com``` et le mot de passe ```Pa55w.rd```.
1. Sur la barre des tâches, dans le champ de recherche à droite du bouton Démarrer, tapez ```Windows PowerShell ISE``` sur **Windows Powershell (ISE)**.
1. Utilisez la commande suivante pour afficher l'état de la jonction de la machine : ```dsregcmd /status```.
1. Au début du résultat, vous devriez voir **YES** en regard de **AzureADJoined**. Si ce n'est pas le cas, attendez quelques instants avant de réessayer (vous pouvez utiliser la commande ```dsregcmd /join``` pour tenter d'accélerer les choses....).
1. Fermez la fenêtre **Windows Powershell**.
1. Ouvrez le menu **Démarrer** et cliquez sur l'engrenage **Settings** dans son menu de navigation à gauche.
1. Dans la fenêtre **Windows Settings**, cliquez sur **Accounts**.
1. Cliquez sur l'onglet **Email & accounts**. Vous devriez y voir le compte *Work or school* de Beth.
1. Fermez la fenêtre **Settings**.
1. Dans la barre des tâches, dans la zone de recherche, tapez ```mail``` puis cliquez sur l'application **Mail** dans le menu démarrer.
1. Dans la boite de dialogue **Add an account**, le compte de Beth devrait être proposé comme premier choix dans la liste : cliquez dessus.
1. Une fois la configuration terminée, dans la fenêtre **All done!**, cliquez sur **Done**.

	> Il est possible que la synchronisation de la boite aux lettres ne soit pas encore fonctionnelle et/ou que la boite aux lettres de Beth ne soit pas encore totalement opérationnelle. Ce n'est pas particulièrement pénalisant dans le contexte de cet exercice.
	
1. Fermez l'application **Mail** et déconnectez-vous de LON-CL1 avec le compte de beth comme déjà réalisé précédemment.

<!-- IBCAN_PAGE_BREAK|a5e1 --># Atelier 5 - Déploiement de Microsoft 365 Apps

## Exercice 1 - Déploiement de Microsoft 365 apps for enterprise

<div class="ibPrintNotes" data-exercise="a5e1" hidden></div>

Vous avez pris l'identité de Dominique Skyetson, Administrateur de l'entreprise Adatum, et vous avez commencé à déployer Microsoft 365 dans un environnement virtuel pilote. Dans cet exercice, vous allez réaliser les tâches nécessaires pour comprendre l'installation de la suite Office par les utilisateurs. Cette installation *user-driven* est un processus à deux étapes : 1) Configurer le compte utilisateur de telle sorte qu'un utilisateur éligible puisse télécharger les fichiers et réaliser l'installation, et 2) réaliser l'installation de la suite Office.  
Dans les deux premières tâches de cet exercice, vous allez vérifier en quoi les conditions suivantes affectent la possibilité pour un utilisateur de télécharger la suite Microsoft 365 Apps for enterprise :  

- L'utilisateur n'a pas de licence pour la suite Office (ce que vous vérifierez en tâche 1). 
- Un administrateur désactive le paramètre global permettant aux utilisateurs le téléchargement des applications pour tous les utilisateurs (testé en tâche 2).  

Dans la dernière tâche de cet exercice, vous installerez la suite Microsoft 365 Apps for enterprise depuis le compte d'un des utilisateurs de Adatum.

#### Tâche 1 – Vérifier l'impact des licences sur l'installation
Dans cette tâche, Dominique va tester si un utilisateur qui ne s'est pas vu affecté de licence peut ou non télécharger Microsoft 365 Apps. Pour ce test, vous pouvez utiliser n'importe quel utilisateur préexistant de la liste **Active Users** dans le portail Microsoft 365 admin center. Ces utilisateurs ont des comptes Entra Id du domaine par défaut ([[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com); ils n'ont pas de compte correspondant *on-premises* dans le domaine ADDS adatum.com (qui a désormais été changé *on-premises* et remplacé par [[godeployDomain],[labXXXXX]].godeploylabs.com). Sans compte *on-premises*, vous ne pouvez vous connecter à une VM Cliente.  
C'est pourquoi vous devez d'abord utiliser un compte ADDS pour vous connecter. Pour ce test, vous utiliserez le compte de **Laura Atkins**. Vous allez créer un compte pour Laura, mais sans lui affecter de licence.  
Vous utiliserez ensuite la VM **LON-CL2** pour installer Microsoft 365 Apps.

1. Basculez vers **LON-CL2** et connectez-vous en **.\Admin** avec le mot de passe **Pa55w.rd**.
1. Vous allez commencer par tester si un utilisateur sans licence Microsoft 365 Apps peut ou non installer Microsoft 365 Apps. Pour ce test, vous allez utiliser le compte de **Laura Atkins**. Vous avez créé un compte pour Laura dans [l'atelier 2,exercice1](a2e1.md), mais ne lui avez pas affecté de licence. Dans LON-CL2, cliquez sur l'icône **Microsoft Edge** sur la barre des tâches.
1. Maximisez votre navigateur Internet puis rendez-vous sur la page d'accueil **Microsoft 365** en utilisant l'adresse suivante : ```https://m365.cloud.microsoft```

	> Si n'importe quel compte est automatiquement connecté, déconnectez-le en cliquant sur l'icône d'utilisateur (rond en haut à droite) et en sélectionnant **Sign out**, retapez ensuite ```https://m365.cloud.microsoft``` dans la barre d'adresse.

1. Cliquez sur **Sign in**.
1. Dans la fenêtre **Sign in**, tapez ```Laura@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` avant de cliquer sur **Next**.
1. Dans la fenêtre **Enter password**, saisissez ```Pa55w.rd``` et cliquez sur **Sign in**.
1. Dans la boite de dialogue **Update your password**, entrez ```Pa55w.rd``` dans le champ **Current password**, puis entrez ```ibForm@tion``` dans les champs **New password** et **Confirm password**. Cliquez sur **Sign in**.
1. Si une fenêtre **Stay signed in?** apparait, cochez la case **Don't show this again** et cliquez sur **Yes.**
1. Si la boite de dialogue **Welcome to Microsoft 365** apparait, fermez-la.
1. Dans la page **Hi,What can I help you with?**", ouvrez le *App Launcher* (les 9 carrés en haut à gauche) pour cliquer sur **More apps**.
1. Sur la page **Apps**, cliquez sur le bouton **Install apps** en haut à droite et sélectionnez **Microsoft 365 apps**.
1. La fenêtre **My account** de Laura s'affiche.
1. Cliquez sur le bouton **View apps & devices**.
1. Dans la section **Office**, vous ne devriez rien trouver...  

	> Vous venez de vérifier qu'un utilisateur ne peut télécharger Microsoft 365 Apps for enterprise s'il ne s'est pas vu affecter de licence idoine.

#### Tâche 2 – Paramètre de téléchargement global
Dominique va désormais tester si les utilisateurs avec licence peuvent être empêché de télécharger Microsoft 365 Apps si un administrateur comme lui désactive le paramètre global contrôlant ce téléchargement pour tous les utilisateurs.

1. Basculez vers **LON-DC1**, ou vous devriez encore être connecté avec le compte **Administrator**. Vous devriez également avoir votre navigateur Internet ouvert, et y être connecté avec le compte de Dominique Skyetson. Vous devirez avoir un onglet ouvert sur le portail **Microsoft 365 admin center**.
1. Pour désactiver le paramètre de téléchargement global, ouvrez l'onglet de votre navigateur qui affiche le portail **Microsoft 365 admin center**, Si nécessaire, cliquez sur **...Show all** dans le menu de navigation afin de pouvoir ouvrir le groupe d'options **Settings**, et sélectionnez pour finir **Org Settings**.
1. Sur la page **Org settings**, l'onglet **Services** est affiché par défaut. Défilez la liste des services afin de pouvoir cliquer sur **Microsoft 365 installation options**.
1. Dans le panneau **Microsoft 365 installation options** qui s'affiche, cliquez sur l'onglet **Installation** puis, décochez toutes les cases de la section **Apps for Windows and mobile devices**, ce qui va désactiver ces fonctionnalités.
1. Cliquez sur **Save**.

	> Laissez le panneau *Microsoft 365 installation options** ouvert car vous allez y revenir dans la tâche suivante.

1. Vous souhaitez tester si, en désactivant ce paramètre, cela empêche un utilisateur **licencié** d'installer Microsoft 365 Apps for enterprise. Dans ce cas vous allez utiliser le compte de **Alan Yoo**, qui a aussi été créé lors de [l'atelier 2,exercice1](a2e1.md); cependant, contrairement à Laura Atkins, vous aviez affecté une licence Microsoft 365 E5 à Alan.
1. Basculez vers **LON-CL2**.
1. Sur LON-CL2, vous devriez encore être connecté à l'environnement Microsoft 365 avec le compte de Laura Atkins suite à la tâche précédente. Vous devez d'abord vous déconnecter du compte de Laura, cliquez donc sur son icône (le rond en haut à droite avec ses initiales **LA**) pour cliquer sur **Sign out**.

	> Suite à une déconnexion, il est très fortement conseillé de fermer tous les onglets de votre navigateur sauf celui qui s'appelle **Login**.

1. Dans l'onglet **Login**, cliquez sur **Switch to a different account**.
1. Dans le champ **Email address**, saisissez ```alan@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` et cliquez sur **Sign in**
1. Dans la fenêtre **Enter password**, saisissez ```Pa55w.rd``` et cliquez sur **Sign in.**
1. Dans la boite de dialogue **Update your password**, tapez ```Pa55w.rd``` dans le champ **Current password**, tapez ensuite ```ibForm@tion``` dans les champs **New password** et **Confirm password** avant de cliquer sur **Sign in**.
1. Dans la page **Hi,What can I help you with?**", ouvrez le *App Launcher* (les 9 carrés en haut à gauche) pour cliquer sur **More apps**.
1. Sur la page **Apps**, cliquez sur le bouton **Install apps** en haut à droite et sélectionnez **Microsoft 365 apps**.
1. La fenêtre **My account** de Alan s'affiche. Sous la section **Office apps &amp; devices**, vous ne devriez pas pouvoir installer Office...  

	> Vous venez de vérifier qu'un utilisateur licencié ne peut télécharger Microsoft 365 Apps for enterprise si le paramètre global l'en empêche.

1. Dominique souhaite désormais réactiver le paramètre d'installation global pour que Alan puisse réaliser l'installation de Microsoft 365 Apps for enterprise.  
1. Pour ce faire, basculez de nouveau sur **LON-DC1**. La fenêtre **Microsoft 365 installation options** devrait toujours être ouverte suite à la tâche précédente.  
1. Cliquez sur l'onglet **Installation** si nécessaire et dans la section **Apps for Windows and mobile devices**, cochez la case **Office (includes Skype for Business)** pour réactiver cette fonctionnalité.
1. Cliquez sur **Save**.
1. Une fois vos modifications sauvegardées, cliquez sur le **X** de fermeture en haut à droite du panneau **Microsoft 365 installation options** pour le fermer. 
1. Pour vérifier comment ce changement de paramètre affecte le compte d'Alan dans sa possibilité de télécharger Microsoft 365 Apps, basculez de nouveau sur **LON-CL2**.
1. Sur LON-CL2, le navigateur Internet devrait être resté ouvert sur la page du compte de Alan contenant la section **Office apps and devices**.  
	Cliquez sur l'icône **Refresh** du navigateur pour recharger complètement la page.

	> IL pourra être nécessaire d'attendre quelques instants et de recharger de nouveau la page...

1. Sous la section **Office apps &amp; devices**, un bouton **Install Office** est apparu.  

	> Vous venez de vérifier qu'un utilisateur avec une licence Office affectée est capable de lancer le téléchargement et l'installation de la suite Office depuis son portail si le paramètre global est actif.

#### Tâche 3 – Installation *user-driven*
Dans la tâche précédente, vous vous êtes connecté avec le compte de Alan Yoo et avez vérifié qu'un utilisateur correctement licencié peut télécharger Microsoft 365 Apps for enterprise. Dans cette tâche, vous allez poursuivre vos tests en procédant à l'installation de la suite office à l'aide du compte de Alan Yoo.  

1. Vous devriez encore être connecté à LON-CL2, avec votre navigateur Internet ouvert sur la page **My Account** de Alan Yoo. 
1. Dans la section **Office apps &amp; devices**, vous avez constaté qu'un bouton **Install Office** est apparu.  

	> En cliquant sur ce bouton  **Install Office** c'est la version anglaise 64 bit de Microsoft 365 Apps qui sera installée. Cependant, si vous souhaitez installer une autre version et/ou une autre langue, il vous faut cliquer sur l'onglet **Apps &amp; devices**.  

1. Puisque Alan veut installer une version 32-bits anglaise de Microsoft 365 Apps for enterprise, cliquez sur l'onglet  **Apps &amp; devices** et modifiez le champ **Version** à **32-bit** avant de cliquer sur le bouton orange **Install Office**.
1. Dans la barre de notification qui apparait en haut à droite de votre navigateur, cliquez sur le lien **Open file** sous le fichier **OfficeSetup.exe** une fois ce dernier téléchargé. Vous allez ainsi lancer l'assistant d'installation d'Office.
1. Si une boite de dialogue **Do you want to allow this app to make changes to your device?** apparait, cliquez sur **Yes**.
1. L'installation va prendre quelques minutes à se terminer. Une fois l'installation réalisée, cliquez sur le bouton **Close** dans la fenêtre **You're all set!**.
1. Pour vérifier l'installation de Microsoft 365 Apps for enterprise par Alan Yoo, cliquez sur le bouton **Démarrer** en bas à gauche de la barre des tâches. La section **Recently added** (en haut du menu **Démarrer**) affiche Microsoft 365 Apps for enterprise qui vient juste d'être installée. Cela pourra inclure Word, PowerPoint, OneNote, Outlook, Publisher, Access et Excel.
1. Dans le menu **Démarrer**, cliquez sur **Word**.
1. Dans la fenêtre **Sign in to get started with Word**, cliquez sur **Sign in or create account**.
1. Dans la fenêtre **Activate Office**, saisissez l'adresse de Alan : ```alan@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` avant de cliquer sur **Next**.
1. Dans la fenêtre **Enter password**, tapez ```ibForm@tion``` et cliquez sur **Sign in.**
1. Sur la fenêtre **Stay signed in to all your apps**, cliquez sur le lien **No, sign in to this app only**.
1. Sur la fenêtre **Accept the license agreement**, cliquez sur le bouton **Accept**.
1. Dans la fenêtre **Your privacy matters** window, cliquez sur **Close**.
1. Vérifiez que Word fonctionne correctement en créant un nouveau document vierge (**Blank document**) et en tapant un peu de texte avant de le sauvegarder dans le dossier **Documents**.
1. Fermez Word.
1. Laissez votre navigateur ouvert en vue de l'exercice suivant.

<!-- IBCAN_PAGE_BREAK|a5e2 --># Atelier 5 - Déploiement de Microsoft 365 Apps

## Exercice 2 - Déploiement de Microsoft 365 apps via MDM

<div class="ibPrintNotes" data-exercise="a5e2" hidden></div>

Vous avez pris l'identité de Dominique Skyetson, Administrateur de l'entreprise Adatum, et vous avez commencé à déployer Microsoft 365 dans un environnement virtuel pilote. Dans cet exercice, vous allez réaliser les tâches nécessaires à l'installation de Microsoft 365 Apps en utilisant le MDM.  
Depuis la version 1709 de Windows 10, vous pouvez utiliser un paramètre GPO pour déclencher l'enregistrement automatique des postes du domaine dans un MDM.  
L'intégration dans Intune est déclenchée par une GPO créée par l'administrateur de l'AD local et survient sans interaction utilisateur. Ce qui signifie que vous pouvez intégrer massivement un grand nombre de périphériques du domaine dans Intune. Le processus d'intégration démarre en tâche de fond une fois connecté au périphérique avec un compte Entra Id.  
Dans la première tâche, Dominique ajoute Microsoft 365 apps comme application gérée par Intune.
Dans les tâches 2 et 3 de cet exercice, Dominique étend l'hybridation entre Entra Id et ADDS pour enregistrer les périphériques dans la gestion cloud (MDM et MAM).  
Dans la tâche finale, vous allez vérifier l'installation automatisée et centralisée de 365 apps for enterprise.

#### Tâche 1 - Ajout de 365 apps dans Intune

Dominique souhaite désormais ajouter Microsoft 365 apps automatiquement aux périphériques qu'il gère. Pour gérer les périphériques en utilisant Microsoft 365, Adatum a acquis des abonnements Enterprise Mobility + Security E5 (EMS E5). Dans cette tâche, Dominique va affecter une de ces licences à un utilisateur. Ensuite, il ajoutera Mircosoft 365 apps aux périphériques gérés et en vérifie l'installation.

1. Basculez vers la VM cliente **LON-CL1** sur laquelle vous devriez être connecté avec le compte ```Adatum\Administrator``` et le mot de passe ```Pa55w.rd```. Vous devriez encore être connecté sur votre navigateur Internet avec le compte de Dominique sur le portail **Microsoft 365 admin center**.
1. Dans le menu de navigation du portail **Microsoft 365 admin center**, cliquez sur **Show all...** si nécessaire pour pouvoir cliquer sur **Microsoft Intune**.
1. Dans le portail **Microsoft Intune admin center**, dans le menu de navigation de gauche, sélectionnez **Apps**.
1. Dans la fenêtre **Apps - Overview**, cliquez sur **All apps**.
1. Dans la fenêtre **Apps - All apps**, cliquez sur le bouton **+ Create**.
1. Dans le panneau **Select app type**, sous **App type**, cliquez sur le menu déroulant. Sous **Microsoft 365 Apps**, sélectionnez **Windows 10 and later** avant de cliquer sur **Select**.
1. Dans la page **App suite information**, conservez les valeurs par défaut et cliquez sur **Next**.
1. Dans l'onglet **Configure app suite**, en face de **Select Office apps**, cliquez sur le panneau déroulant. Confirmez que toutes les applications, sauf **Skype for business** sont sélectionnez. Cliquez de nouveau sur l'en-tête de menu pour le fermer.
1. En face de **Select other Office apps (license required)**, cliquez sur le panneau déroulant. Sélectionnez **Project Online Desktop client** et **Visio Online Plan 2**. Cliquez de nouveau sur l'en-tête de menu pour le fermer.
1. Sélectionnez **Office Open Document Format** pour le champ **Default file format**.
1. En face de **Update channel**, sélectionnez **Monthly Enterprise Channel**.
1. En face de **Accept the Microsoft Software License Terms on behalf of users**, sélectionnez **Yes**.
1. Cliquez sur **Next**.
1. Sur l'onglet **Assignments**, sous **Required**, cliquez sur le lien **+ Add all users** avant de cliquer sur **Next**.
1. Sur l'onglet **Review + create**, cliquez sur le bouton **Create**.

#### Tâche 2 - Prérequis d'auto-enrollment
Pour que l'*auto-enrollment* fonctionne comme prévu, vous devez vérifier que que le paramétrage en a été fait correctement. Les étapes suivantes montrent les principaux prérequis dans l'utilisation d'Intune :  

1. Suite à la tâche précédente, vous devriez encore être connecté sur le portail **Microsoft Intune admin center** avec le compte de Dominique.
1. Dans le menu de navigation à gauche du portail **Microsoft Intune admin center**, cliquez sur **Devices**.
1. Dans la section **Devices**, sous **Device onboarding**, cliquez sur **Enrollment**.
1. Dans la page **Devices Enrollment**, dans l'onglet **Windows**, sélectionnez **Automatic Enrollment**.
1. Dans la page **Configure**, en regard de **MDM user scope**, sélectionnez **All**. En regard de **Windows Information Protection (WIP) user scope**, sélectionnez **All**.
1. Cliquez sur **Save**.

#### Tâche 3 - GPO locale pour *auto-enrollment*
Dominique souhaite désormais vérifier comment fonctionne la stratégie d'*auto-enrollment*. En production, vous feriez la même manipulation sur les stratégies de groupe (GPO) de l'ADDS. Mais ici, pour son test, Dominique va utiliser la GPO locale de la machine **LON-CL1**

1. Vous devriez être encore connecté sur **LON-CL1** avec le compte **Adatum\Administrator**. 
1. Cliquez dans la barre de recherche à droite du bouton démarrer sur la barre des tâches et tapez ```gpedit```.
1. Dans la section **Best match** du menu **Démarrer**, cliquez sur **Edit group policy**.
1. Dans l'outil qui s'ouvre, ouvrez séquentiellement les sections **Computer Configuration** > **Administrative Templates** > **Windows Components** > **MDM**.
1. Double-cliquez ensuite, dans le panneau de détails à droite, sur **Enable automatic MDM enrollment using default Azure AD credentials**. 
1. Dans le panneau **Enable automatic MDM enrollment using default Azure AD credentials**, cliquez sur **Enabled**.
1. Dans le menu **Select Credential Type to Use**, choisissez **User Credential**.
1. Cliquez sur **OK**
1. Fermez l'outil **Local Group Policy Editor** et redémarrez LON-CL1.

#### Tâche 4 - Vérification du déploiement par MDM
Dans cette tâche, Beth Burke va vérifier que l'ordinateur est enrôlé pour le MDM et que Microsoft 365 apps est installée.

> Il peut facilement se passer plus de 5 minutes avant que l'enrôlement du poste ne soit effectif.

1. Connectez-vous à  **LON-CL1** en cliquant sur **Other user** pour utiliser le compte ```Beth@[[godeployDomain],[labXXXXX]].godeploylabs.com``` avec le mot de passe ```Pa55w.rd```.

   > Si le mot de passe de Beth n'est pas correct, vous pouvez le réinitialiser :
      1. Basculez sur **LON-DC1**
      1. Dans l'outil **Server Manager**, utilisez le menu **Tools** en haut à droite pour lancer l'**Active Directory Administrative Center**.
      1. Dans la page **Overview** de l'**Active Directory Administrative Center**, tapez ```adatum\beth``` dans le champ **User name** de la tuile **RESET PASSWORD**.
      1. Tapez ```Pa55w.rd``` dans les champs **Password** et **Confirm password**.
      1. Décochez la case **User must change password at next log on**.
      1. Cliquez sur **Apply**.
      1. Fermez l'**Active Directory Administrative Center** et rebasculez sur **LON-CL1** pour vous connecter avec le compte de Beth.

1. Cliquez sur le bouton **Démarrer** à gauche de la barre des tâches et cliquez sur **Settings**.
1. Cliquez sur la section **Accounts** et choisissez l'onglet **Access work or school**.
1. Sous la mention **Connected to ADATUM AD domain**, cliquez sur **Info** pour voir les informations d'enrôlement MDM (redémarrer **LON-CL1** pourra accélérer l'apparition du bouton *Info*).
1. Patientez quelques minutes, pour vérifier que la suite Microsoft 365 apps a été installée sur LON-CL1.
1. Fermez la session de Beth sur LON-CL1

<!-- IBCAN_PAGE_BREAK|a6e1 --># Atelier 6 - Configuration des services Exchange Online

## Exercice 1 - Paramètres de transport des messages

<div class="ibPrintNotes" data-exercise="a6e1" hidden></div>

Vous avez pris l'identité de Dominique Skyetson, Administrateur de l'entreprise Adatum, et vous avez commencé à déployer Microsoft 365 dans un environnement virtuel pilote. Dans cet exercice, Dominique veut créer des connecteurs Exchange Online d'émission et de réception en utilisant le portail Exchange admin center. Exchange utilise ces connecteurs pour gérer les flux de messages entrant et sortant vers et depuis les serveurs Exchange Online.  
Vous allez ensuite créer une série de règles de transport pour modifier le flux de messages dans l'environnement Adatum. Une première règle ajoutera un disclaimer à chaque message reçu, tandis qu'une seconde fera suivre les messages à destination de Megan Bowen vers la boite de Dominique Skyetson pour approbation avant livraison.

#### Tâche 1 - Changement du domaine de messagerie
Microsoft ayant eu de nombreux problèmes d'utilisation des domaines *onmicrosoft.com* pour des attaques cyber, ces domaines sont désormais marqués comme étant illégitimes (spam) par défaut. Dans cette première tâche, vous allez ajouter une adresse email basée sur le domaine [[godeployDomain],[labXXXXX]].godeploylabs.com à toutes les boites qui seront utilisées pour test.

1. Ouvrez une session sur LON-CL1 en utilisant le compte ```adatum\administrator``` et le mot de passe ```Pa55w.rd```.
1. Cliquez sur l'icône de **Microsoft Edge** dans la barre des tâches pour lancer votre navigateur Internet. Maximisez sa fenêtre.
1. Dans votre navigateur internet, utilisez l'adresse ```https://admin.microsoft.com``` pour ouvrir le portail **Microsoft 365 admin center**.
1. Connectez-vous au centre d'administration avec le compte de Dominique (```dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` et mot de passe ```ibForm@tion```)
1. Dans le menu de navigation du portail **Microsoft 365 Admin center**, sous la section **Admin Centers** cliquez sur **Exchange**. Cela va ouvrir le portail administratif de Exchange Online dans un nouvel onglet.
1. Si nécessaire, dans le portail **Exchange admin center**, dans le menu de navigation à gauche, ouvrez le groupe d'options **Recipients** pour sélectionner **Mailboxes**.
1. Cliquez sur le nom de **Dominique Skyetson** puis, dans le panneau d'informations qui apparait, cliquez sur le lien **Manage email address types** dans la section **Email addresses**.
1. Sur le panneau **Manage email address types**, cliquez sur **+ Add email address type**
1. Sur le panneau **New email address**, saisissez ```dom``` dans le champ **Email address**, avant de sélectionner le domaine **[[godeployDomain],[labXXXXX]].godeploylabs.com** après le sigle @.
1. cliquez sur la case **Set as primary email address** afin de la sélectionner et valider en utilisant le bouton **OK** en bas de page.
1. De retour sur le panneau **Manage email adress types**, cliquez sur **Save** puis fermez le panneau d'informations de Dominique avec la croix de fermeture en haut à droite. 

> Répétez ensuite les étapes précedentes pour les comptes utilisateurs qui vont nous servir pour les test dans nos ateliers :  
> | Nom | email |
> | --- | --- |
> | Alan Yoo | ```alan```@[[godeployDomain],[labXXXXX]].godeploylabs.com |
> | Megan Bowen | ```meganB```@[[godeployDomain],[labXXXXX]].godeploylabs.com |

#### Tâche 2 - Création de connecteurs pour TLS
Dans cette tâche, vous allez créer deux connecteurs pour forcer l'utilisation de TLS avec Trey Research, qui est une entreprise partenaire de Adatum avec laquelle des échanges de données sensibles doivent être sécurisés lors de leur transmission par email. Un connecteur servira pour la gestion des messages sortant vers Trey Research et un autre permettra d'accepter les messages entrant depuis l'entreprise partenaire.  

1. Ouvrez une session sur LON-CL1 en utilisant le compte ```adatum\administrator``` et le mot de passe ```Pa55w.rd```.
1. Cliquez sur l'icône de **Microsoft Edge** dans la barre des tâches pour lancer votre navigateur Internet. Maximisez sa fenêtre.
1. Dans votre navigateur internet, utilisez l'adresse ```https://admin.microsoft.com``` pour ouvrir le portail **Microsoft 365 admin center**.
1. Connectez-vous au centre d'administration avec le compte de Dominique (```dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` et mot de passe ```ibForm@tion```)
1. Dans le menu de navigation du portail **Microsoft 365 Admin center**, sous la section **Admin Centers** cliquez sur **Exchange**. Cela va ouvrir le portail administratif de Exchange Online dans un nouvel onglet.
1. Dans le portail **Exchange admin center**, dans le menu de navigation à gauche, ouvrez le groupe d'options **Mail flow** pour sélectionner **Connectors**.
1. Sur la page **Connectors**, vous souhaitez ajouter un nouveau connecteur. Cliquez sur le bouton **+ Add a connector** sur la barre de menu au-dessus de la liste des connecteurs.
1. Sur le panneau **New connector**, sélectionnez **Office 365** sous **Connection from**.
1. Sous **Connection to**, sélectionnez **Partner organization** avant de cliquer sur **Next**.
1. Sur la page **Connector name**, entrez ```Trey Research Outgoing``` dans le champ **Name** et cliquez sur **Next**.
1. Sur la page **Use of connector**, sélectionnez l'option **Only when email messages are sent to these domains**.
1. Dans la boite de texte en-dessous, saisissez ```treyresearch.net``` et cliquez sur le bouton **+** avant de cliquer sur **Next**.
1. Sur la page **Routing**, sélectionnez l'option **Use the MX record associated with the partner’s domain** et cliquez sur **Next**.
1. Sur la page **Security restrictions**, cochez la case **Always use Transport Layer Security (TLS) to secure the connection**, sélectionnez l'option **Issued by a trusted certificate authority (CA)** et cliquez sur **Next.**
1. Sur la page **Validation email**, dans le champ texte, entrez ```postmaster@treyresearch.net``` et cliquez sur le bouton **+**.
1. Cliquez sur le bouton **Validate** et attendez le résultat de la validation.
1. Notez que le statut de la tâche **Send test email** est **Failed**.
1. Sur la page **Validation email**, cliquez sur **Next** avant de cliquer sur **Yes proceed** pour sauvegarder le connecteur bien que la validation ait échoué.  

	> La validation du flux de message n'aboutit pas car vous avez ici utilisé une entreprise fictionnelle qui n'existe pas. C'est le comportement attendu pour cet atelier.

1. Sur la page **Review Connector**, cliquez sur **Create connector** puis sur **Done**.
1. Vous venez d'ajouter un connecteur d'émission (*outbound*) de Adatum vers Trey Research. Vous allez maintenant créer un connecteur de réception (*inbound*) de Trey Research vers Adatum. Dans le centre d'admin Exchange Online, sur la page **Connectors**, cliquez de nouveau sur le bouton **+ Add a connector**.
1. Sur le panneau **New connector**, sélectionnez **Partner organization** sous la section **Connection from**.
1. Notez que **Office 365** est présélectionné automatiquement sous la section **Connection to**. Cliquez sur **Next**.
1. Sur la page **Connector name**, saisissez ```Trey Research Incoming``` dans le champ **Name** avant de cliquer sur **Next**.
1. Sur la page **Authenticating sent email**, sélectionnez l'option **By verifying that the sender domain matches one of the following domains**.
1. Dans le champ texte, saisissez ```treyresearch.net```, cliquez sur le bouton **+** et cliquez sur **Next**.
1. Sur la page **Security restrictions**, cochez la case **Reject email messages if they aren’t sent over TLS** et cliquez sur **Next**.
1. Sur la page **Review connector**, cliquez sur **Create connector**, puis cliquez sur **Done** une fois les informations sauvegardées.
1. Sur la page **Connectors**, vous devriez désormais voir le connecteur d'envoi (*outbound*) et de réception (*inbound*) que vous venez de créer.  

#### Tâche 3 - Créer des règles de transport

1. Vous devriez être resté connecté sur **LON-CL1** avec le compte **adatum\Administrator** et le mot de passe **Pa55w.rd**.
1. Votre navigateur Internet devrait être resté ouvert et connecté sur les portails **Microsoft 365 admin center** et **Exchange admin center** avec le compte de Dominique Skyetson.
1. Dans le portail **Exchange admin center**, le groupe d'options **Mail flow** devrait être resté ouvert suite à la tâche précédente, cliquez sur **Rules** dans ce groupe d'options.
1. Vous allez commencer par créer une règle qui ajoute un message d'avertissement à chaque email reçu. Sur la page **Rules**, cliquez sur **+ Add a rule** sur la barre de menu. Dans le menu qui apparaît, sélectionnez **Apply disclaimers**.
1. Dans le panneau **Set rule conditions** qui s'affiche, entrez les informations suivantes :  

	- Dans le champ **Name**, saisissez ```A. Datum Disclaimer```
	- Dans la section **Apply this rule if**, sélectionnez **The recipient** et **is external/internal**. Une fenêtre **Select recipient location** apparaît. Sélectionnez **Inside the organization** avant de cliquer sur **Save**.
	- Sous la section **Do the following**, cliquez sur le lien hypertexte **Enter text**. Dans la fenêtre **specify disclaimer text**, saisissez le message suivant dans le champ de texte avant de cliquer sur **Save** : ```If you are not the intended recipient of this message, you must delete it.```
	- Sous la section **Do the following** et sous le texte que vous venez de saisir, cliquez sur le lien hypertexte **Select one**. Dans la fenêtre **specity fallback action**, vous devez sélectionner une action à réaliser si le serveur ne peut ajouter le message d'avertissement. Dans notre cas, sélectionnez **Wrap** et cliquez sur **Save**.

1. Cliquez sur **Next**.
1. Sur la page **Set rule settings** choisissez **Enforce** et un niveau de sévérité de **Medium** avant de cliquer sur **Next**.
1. Sur la page **Review and finish**, cliquez sur **Finish**.
1. Une fois la règle créée, cliquez sur le bouton **Done** pour quitter l'assistant de création de règle.
1. Cliquez sur la règle que vous venez de créer et basculez le choix **Enable or disable rule** sur **Enabled** avant de fermer le panneau de la règle.
1. Vous allez désormais créer une seconde règle qui fait suivre automatiquement à la boite aux lettres de Dominique Skyetson pour modération les messages envoyés à Megan Bowen.
1. Sur la page **rules** cliquez sur **+ Add a rule**. Dans le menu qui apapraît, sélectionnez **Send messages to a moderator**.
1. Dans le panneau **Set rule conditions** qui s'affiche, entrez les informations suivantes :  

	- Dans le champ **Name**, saisissez ```Messages that must be moderated```
	- Dans la section **Apply this rule if**, sélectionnez **The recipient** et **is this person**. Une fenêtre **Select members** apparaît. Sélectionnez **Megan Bowen** dans la liste des boites aux lettres et cliquez sur **Save**.
	- Sous la section **Do the following**, sélectionnez **Forward the message for approval** et **to these people**. Une fenêtre **Select members** apparaît. 
	- Sélectionnez **Dominique Skyetson** (dom@[[godeployDomain],[labXXXXX]].godeploylabs.com) dans la liste des boites aux lettres et cliquez sur **Save**.

1. Cliquez sur **Next**.
1. Sur la page **Set rule settings** choisissez **Enforce** et un niveau de sévérité de **Low** avant de cliquer sur **Next**.
1. Sur la page **Review and finish**, cliquez sur **Finish**.
1. Une fois la règle créée, cliquez sur le bouton **Done** pour quitter l'assistant de création de règle.
1. Cliquez sur la règle que vous venez de créer et basculez le choix **Enable or disable rule** sur **Enabled** avant de fermer le panneau de la règle.

#### Tâche 4 - Validation des règles de transport
Dans cette tâche, vous allez tester les nouvelles règles de transport que vous venez de créer. Vous allez envoyer un email de Alan Yoo à Megan Bowen, ce qui devrait déclencher la règle de transport de modération. Vous vérifierez ensuite que le message d'avertissement a été ajouté, respectant la première règle.

1. Basculez vers la machine virtuelle **LON-CL2**. Vous devriez être resté connecté avec le compte **Admin**, le navigateur Internet étant resté ouvert et connecté avec le compte de **Alan Yoo**. Sur l'onglet **Home - Microsoft 365**, cliquez sur l'icône de **Outlook** dans le menu des applications à gauche.
1. Sur la page **Mail - Alan Yoo - Outlook**, cliquez sur le bouton **New mail**.
1. Dans le formulaire de nouveau message, saisissez ```Megan``` dans le champ **To**. Sélectionnez **Megan Bowen** une fois que son compte a été trouvé.
1. Dans le champ **Subject**, entrez ```Message de test du transport Exchange```.
1. Dans le corps du message, saisissez ```Message de test de l'avertissement et de la modération par règles de transport Exchange```.
1. Cliquez sur le bouton **Send**.
1. Vous allez maintenant vous connecter sur la boite aux lettres de Dominique Skyetson. Basculez vers la machine virtuelle **LON-CL1**. Dans votre navigateur Internet, utilisez le menu des application 365 (la grille de 3x3 en haut à gauche des pages 365) pour lancer l'application web Outlook.
1. Dans l'onglet **Mail - Dominique Skyetson - Outlook**, Vérifiez la boite de réception **Inbox** de Dominique. Si vous voyez le message de Alan Yoo, ouvrez le message et vérifiez que le message d'avertissement (**If you are not the intended \[...] delete it.**) a été ajouté à la suite du corps du message.  

	> Si jamais le message ne se trouve pas dans la boite de réception de Dominique, vérifiez le dossier **Junk Email**. Si le message attendu n'est toujours pas visible, attendez un peu et/ou rafraichissez votre onglet de navigateur Internet.

1. Basculez sur l'onglet **Microsoft 365 admin center** et référez-vous aux procédures que vous avez utilisé à [l'atelier 2, exercice 5](a2e5.md) pour réinitialiser le mot de passe de **Megan Bowen** vers **Pa55w.rd**.
1. Ouvrez le menu de votre navigateur Internet (en haut à droite) et lancez-en une nouvelle instance en choisissant **New Inprivate Window**.
1. Dans votre nouvelle fenêtre de navigation privée, utilisez l'adresse suivante pour ouvrir la boite aux lettres de Megan Bowen : ```https://outlook.office.com```.
1. Sur la page **Sign in**, connectez-vous avec le compte ```meganB@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com```.
1. Sur la page **Enter password**, utilisez le mot de passe ```Pa55w.rd``` et cliquez sur **Sign in**.
1. Sur la page **Update your password**, saisissez ```Pa55w.rd``` dans le champ **Current password** et ```ibForm@tion``` dans les champs **New password** et **Confirm password** avant de cliquer sur **Sign in**.
1. Sur la page **Stay sign in?** cochez la case **Don't show this again** et cliquez sur **Yes**.
1. Sur la page **outlook** de Megan Bowen, jetez un oeil à la boite de réception **Inbox** :

	- Si votre message de test est arrivé, c'est probablement que la règle que vous avez créée ne s'est pas encore propagée sur la globalité de l'environnement Exchange Online : vous pouvez retenter l'envoi d'un nouveau message si vous souhaiter pousser le test plus loin.
	- Si votre message de test n'est pas arrivé, vous pouvez basculez entre vos sessions Outlook pour valider l'envoi du message depuis la boite de Dominique et vérifier sa réception après modération dans la boite de Megan Bowen.

1. Sur LON-CL1, fermez votre page de navigation privée de votre navigateur Internet.
1. Basculez sur LON-CL2 pour y fermer votre navigateur Internet.

#### Tâche 5 - Traçabilité de la livraison des messages

1. Sur LON-CL1, vous devriez être resté connecté avec le compte **adatum\Administrator** et le mot de passe **Pa55w.rd**.
1. Votre navigateur Internet devrait être resté ouvert et connecté sur les portails **Microsoft 365 admin center** et **Exchange admin center** avec le compte de Dominique Skyetson (vous pouvez fermer l'onglet avec la boite aux lettres outlook de Dominique).
1. Dans le portail **Exchange admin center**, dans le menu de navigation, dans le groupe d'options **mail flow**, cliquez sur **Message trace**.
1. Prenez quelques instants pour consulter les différentes requêtes proposées par défaut.
1. Cliquez sur le bouton **+ Start a trace**.
1. Dans le panneau **New message trace**, vous pouvez jeter un oeil aux options de recherche avant de cliquer sur **Search**.
1. Dans la fenêtre **Message trace search results**, cliquez sur le message envoyé par **alan@[[godeployDomain],[labXXXXX]].godeploylabs.com** à **meganb@[[godeployDomain],[labXXXXX]].godeploylabs.com**.
1. Dans la fenêtre **Message de test du transport Exchange**, consultez les informations détaillées sur le transport du message. Sélectionnez la flèche en regard de **Message events**.
1. Dans la colonne **Event**, constatez la présence des évènements **Transport rule** qui ont appliqué le message d'avertissement et rerouté le message vers la boite de Dominique Skyetson.
1. Cliquez sur le **X** de fermeture en haut à droite du panneau.

<!-- IBCAN_PAGE_BREAK|a6e2 --># Atelier 6 - Configuration des services Exchange Online

## Exercice 2 - Configuration de la protection de la messagerie

<div class="ibPrintNotes" data-exercise="a6e2" hidden></div>

Dans cet exercice, vous allez continuer, sous l'identité de Dominique Skyetson, Administrateur de l'entreprise Adatum à déployer Microsoft 365 dans un environnement virtuel pilote. Adatum a récemment constaté une recrudescence des attaques virales. Le CTO de l'entreprise a demandé à Dominique de rechercher les différentes options disponibles dans Exchange Online pour fortifier l'environnement de messagerie de Adatum.  
Vous allez accéder au centre d'administration de Exchange Online depuis votre machine cliente et créer une série de règles de filtrage d'hygiène pensées pour protéger l'environnement de messagerie de Adatum. Vous allez créer un filtre antiviral, un filtre de connexion et un filtre de spam. Au final, vous activerez Microsoft Defender for Office, qui protègera Adatum des attaques malicieuses contenues dans les emails, les liens (URLs) et les autres outils de collaboration.

#### Tâche 1 - Créer un filtre antiviral
Dans cette tâche, vous allez créer un filtre antiviral pour les pièces jointes d'un type de fichier particulier qui pourraient correspondre à une attaque potentielle. Si une pièce jointe correspond à un des types de fichiers et que le domaine destinataire est le domaine de Adatum, alors un message préventif sera appliqué au message.

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue de l'atelier précédent. Les portails **Microsoft 365 admin center** et **Exchange admin center** devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Microsoft 365 Admin center**, sous la section **Admin Centers** du menu de navigation à gauche, cliquez sur **Security**.
1. Dans le portail **Microsoft Defender**, cliquez (à gauche) sur la flêche **Show navigation**.
1. Dans le groupe d'options **Email &amp; collaboration** du menu de navigation, cliquez sur **Policies &amp; rules**.
1. Sur la page **Policies &amp; rules**, cliquez sur **Threat policies**.
1. Sur la page **Threat policies**, cliquez sur **Anti-malware** dans la section **Policies**.
1. Sur la barre de menu, cliquez sur **+ Create** pour ajouter un nouveau filtre antiviral.
1. Sur la page **Name your policy**, entrez ```Malware Policy``` dans le champ **Name**.
1. Dans le champ **Description**, saisissez ```This policy has been created to protect the messaging environment.``` avant de cliquer sur **Next**.
1. Sur la page **Users and Domains**, cliquez dans le champ **Domains** et tapez ```onmicrosoft```pour sélectionner votre domaine original (**[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com** et pas [[onMicrosoftDomain],[wwlxxxxx]].mail.onmicrosoft.com) avant de cliquer sur **Next**.
1. Sur la page **Protection settings**, constatez les valeurs par défaut et les options disponibles et cliquez sur **Next**.
1. Sur la page **Review**, cliquez sur le bouton **Submit** (vous pouvez aussi choisir d'annuler l'assistant car vous ne testerez pas cette stratégie antivirale).
1. Sur la page **Created new anti-malware policy**, cliquez sur **Done**.
1. Dans le menu de navigation séquentielle en haut de page, cliquez sur **Threat policies** pour remonter d'un niveau.

#### Tâche 2 - Créer un filtre de connexion
Dans cette tâche, vous allez modifier le filtre de connexion par défaut pour y inclure une IP bloquée et une IP de confiance. Tout message venant d'une IP de confiance sera accepté, tandis que tout message venant d'une IP bloquée sera bloqué.

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue de l'atelier précédent. Les portails **Microsoft 365 admin center**, **Exchange admin center** et **Microsoft 365 Defender** devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Microsoft 365 Defender**, sur la page **Threat policies**, cliquez sur **Anti-spam**.
1. Dans la liste des stratégies, sélectionnez **Connection filter policy (Default)**.
1. Une fois le panneau des détails de la stratégie affiché, cliquez sur le lien **Edit connection filter policy**.
1. Dans le contexte de l'atelier, vous **N'ALLEZ PAS** ajouter d'adresse IP bloquée. Vous pourriez le faire si vous aviez connaissance d'une adresse que vous souhaitez tester et/ou marquer comme problématique. Cependant, il faudra à peu près une heure pour que ce changement se propage sur la globalité de l'environnement. Pour votre atelier, il est suffisant de constater que vous êtes à même d'ajouter une adresse IP dans cette interface.
1. Cochez la case **Turn on safe list** plus bas dans la page. C'est un conseil d'activer cette fonction pour votre *tenant* pour souscrire à la gestion par Microsoft des adresses à problèmes les plus connues. Cocher cette case supprimera automatiquement les messages de spam émis par ces émetteurs.
1. Cliquez sur les boutons **Save** puis **Close** une fois les changements sauvegardés.

#### Tâche 3 - Créer un filtre antispam
Pour les clients Microsoft 365 dont les boites aux lettres sont hébergées sur Exchange Online, leurs messages sont automatiquement protégés contre les spams et les virus. Microsoft 365 a des fonctionnalités natives de filtrage antispam et antivirales qui protègent les flux de messages entrants et sortants.  
En tant qu'administrateur de Adatum, Dominique souhaite activer et maintenir les technologies de filtrage utilisées, qui sont activées par défaut. Ceci étant, il peut customiser l'utilisation de ces technologies dans le contexte de l'entreprise.

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue de l'atelier précédent. Les portails **Microsoft 365 admin center**, **Exchange admin center** et **Microsoft 365 Defender** devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Microsoft 365 Defender**, sur la page **Anti-spam policies**, cliquez sur **Anti-spam inbound policy (Default)**.
1. Dans le panneau **Anti-spam inbound policy (Default)** qui s'affiche, descendez pour cliquer sur le lien **Edit actions**.  

	> Dans cette section vous sont présentées une sélection d'options sur la manière dont seront repérés les spam et la manière dont ils seront traités en fonction de leur niveau de gravité.

1. Dans la fenêtre **Actions**, réalisez les sélections suivantes :

	- Spam : **Move message to Junk Email folder**
	- High Confident Spam : **Prepend subject line with text**
	- Bulk complaint level (BCL) met or exceeded : **Move message to Junk Email folder**
	- Retain spam in quarantine for this many days: **10**
	- Prepend subject line with this text: saisissez ```SPAM: This message contains potential spam```

1. Cliquez sur le bouton **Save**.
1. Une fois les modifications sauvegardées, cliquez sur **Close**.

#### Tâche 4 - Stratégie *Safe attachment*
Dans cette dernière tâche, vous allez activer **Defender for Office** pour Sharepoint, OneDrive et Teams et vous allez créer une stratégie *Safe Attachments* qui va permettre de tester les pièces jointes des messages non détectées comme problématiques par l'antivirus. Vous allez configurer la stratégie de sorte que si une pièce jointe est problématique, elle soit retirée du message avant sa livraison au destinataire et qu'une copie du message original soit envoyée dans la boite de Dominique Skyetson pour investigation plus poussée.

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue de l'atelier précédent. Les portails **Microsoft 365 admin center**, **Exchange admin center** et **Microsoft 365 Defender** devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Microsoft 365 Defender**, en haut de la page **Anti-spam policies**, dans le menu séquentiel, cliquez sur **Threat policies** pour remonter d'un niveau.
1. Dans la section **Policies**, cliquez sur **Safe attachments**.
1. Sur la page **Safe attachments**, cliquez sur **Global settings** dans la barre de menu.
1. Dans le panneau **Global settings** qui s'affiche, dans la section **Protect files in SharePoint, OneDrive, and Microsoft Teams**, activez l'option **Turn on Defender for Office 365 for SharePoint, OneDrive and Microsoft Teams** si elle ne l'est pas et cliquez sur **Save** (cliquez sur **Cancel** si vous n'avez fait aucun changement).
1. Sur la page **Safe attachments**, cliquez sur **+ Create** dans la barre de menu pour créer une nouvelle stratégie.
1. Sur la page **Name your policy**, saisissez ```AttachmentPolicy1``` dans le champ **Name** avant de cliquer sur **Next**.
1. Sur la page **Users and domains**, cliquez dans le champ **Domains** et tapez ```onmicrosoft```. Sélectionnez ensuite votre domaine **[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com** et cliquez sur **Next**.
1. Sur la page **Settings**, dans la section **Safe attachments unknown malware response**, choisissez l'option **Dynamic Delivery**. Cette option permet l'envoi des message traités à leur destinataire dès leur réception, mais sans permettre l'accès à la pièce jointe tant que celle-ci n'a pas été correctement scannée comme sans danger.
1. Sous la section **Redirect messages with detected attachments**, cochez la case **Enable redirect**.
1. Dans le champ **Send messages that contain monitored attachments to the specified email address**, entrez l'adresse de Dominique Skyetson (```dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com```) avant de cliquer sur **Next**.
1. Sur la page **Review**, cliquez sur le bouton **Submit** puis **Done*.
	(Vous pouvez aussi cliquer sur **Cancel** puisque cette stratégie ne sera pas testée)

> Malheureusement, il nous est impossible de créer un environnement d'ateliers dans lequel vous pourriez tester les stratégies que vous venez de créer. Pour ce faire, il vous faudrait vous envoyer un message contenant une cyber-attaque qui ne serait pas préalablement détectée par les antivirus de l'environnement Microsoft 365.  
> Ceci étant dit, après avoir crée une stratégie *Safe Attachments* dans un environnement de production, une bonne manière de constater son bon fonctionnement peut être la consultation des rapports de Defender for office dans le portail. Pour plus d'information sur leur utilisation, vous pouvez consulter la section suivante de la documentation : [View Defender for Office 365 reports in the Microsoft 365 Defender portal](https://learn.microsoft.com/microsoft-365/security/office-365-security/reports-defender-for-office-365).

<!-- IBCAN_PAGE_BREAK|a6e3 --># Atelier 6 - Configuration des services Exchange Online

## Exercice 3 - Configuration des stratégies d'accès client

<div class="ibPrintNotes" data-exercise="a6e3" hidden></div>

Outlook on the web permet aux utilisateurs d'Adatum d'accèder à leur boite aux lettres depuis un navigateur Internet. Après qu'Adatum ait créé son tenant Microsoft 365 avec Exchange Online, ce dernier inclut une unique stratégie nommée **OWAMailboxPolicy-Default**. Cette stratégie définit les paramètres Outlook on the web pour tous les utilisateurs. Cependant, Dominique Skyetson, par son rôle d'administrateur de Adatum, souhaite créer une stratégie Outlook on the web policy qui s'appliqera à un utilisateur particulier (dans notre cas Alan Yoo). En vérifiant si une telle affectation de stratégie par utilisateur fonctionne, Dominique sera dès lors capable de gérer les paramètres de boite aux lettres pour les différentes populations d'utilisateurs de l'entreprise.  
Dominique configurera ensuite une stratégie de boite aux lettres pour les périphériques mobiles qui exige un mot de passe de périphérique, ainsi qu'une stratégie de périphérique mobile permettant de placer en quarantaine tout nouveau périphérique; nécessitant approbation de celui-ci pour qu'il puisse synchroniser les messages.

#### Tâche 1 - Configuration de stratégie Outlook Web App

1. Vous devriez encore être connecté sur **LON-CL1** à l'issue de l'atelier précédent. Les portails **Microsoft 365 admin center**, **Exchange admin center** et **Microsoft 365 Defender** (que vous pouvez désormais fermer) devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Exchange admin center**, ouvrez le groupe d'options **Roles** pour cliquer sur **Outlook Web App policies**.
1. Sur la page **Outlook Web App policies**, constatez la présence d'une stratégie par défaut, nommée **OWAMailboxPolicy-Default**. Cette stratégie définit les paramètres de *Outlook on the web* pour tous les utilisateurs.  
1. Puisque Dominique souhaite ajouter une stratégie spécifique, cliquer sur **New OWA policy** sur a barre de menu au-dessus de la liste.
1. Dans le panneau **new Outlook Web App mailbox policy**, sur la page **Set up the basics**, entrez ```Limited features``` dans le champ **Name**.

	> Cette stratégie est nommée **Limited features** car elle réduit les fonctionnalités accessibles depuis le Webmail.

1. Cliquez sur le bouton **Next**.
1. Sur la page **Select features**, sont affichées toutes les fonctionnalités activées dans *Outlook on the web*. La plupart de ces fonctionnalités sont activées par défaut. Décochez les cases en regard des fonctionnalités suivantes que Dominique ne veut plus voir accessibles dans cette stratégie :  

	- **Instant messaging**
	- **Text messaging**
	- **LinkedIn contact sync**
	- **Information management/Journaling**

1. Cliquez sur le bouton **Next**.
1. Sur la page **View and access attachments**, décochez la case sous **Public or shared computers** ainsi que celle sous **Private computers**.
1. Cliquez sur **Next** puis **Create**.
1. Cliquez sur **Done** une fois que la stratégie a été créée.
1. Dans le menu de navigation du portail **Exchange admin center**, cliquez sur **Mailboxes** dans le groupe d'options **Recipients**.
1. Sur la page **Manage mailboxes**, cliquez sur la ligne correspondante à l'utilisateur **Alan Yoo**.
1. Sur le panneau d'informations de **Alan Yoo** qui s'affiche, cliquez sur **Manage email apps settings** dans la section **Email apps & mobile devices**.
1. Sur la page **Manage settings for email apps**, remplacez (vous pouvez cliquer sur le **x** à droite de la stratégie actuelle) le contenu du champ **Outlook web app mailbox policy** en tapant ```Limited features```.
1. Sélectionnez votre stratégie **Limited features** avant de cliquer sur **Save**.
1. Fermez le panneau d'information d'**Alan Yoo** une fois le changement sauvegardé.
1. Cliquez sur l'icone de recherche de la barre des tâches puis tapez ```Windows Powershell``` et lançez une invite Powershell.
1. Dans la fenêtre Windows Powershell, tapez la commande suivante et validez par **[Entrée]** :
	```Invoke-WebRequest "https://raw.githubusercontent.com/renaudwangler/ib-labs/master/resources/pieceJointe.txt" | Select-Object -ExpandProperty Content | Out-File "$env:USERPROFILE\documents\pieceJointe.txt"```
1. Vous pouvez désormais fermer la fenêtre Powershell et revenir à votre navigateur Internet.
1. Dans votre navigateur Internet, utilisez le menu des application 365 (la grille de 3x3 en haut à gauche des pages 365) pour lancer l'application web Outlook.
1. Dans **Outlook**, cliquez sur le bouton **New mail**.
1. Dans la fenêtre de composition de nouveau message, tapez ```alan@[[godeployDomain],[labXXXXX]].godeploylabs.com``` dans le champ **To**.
1. Dans le champ **Add a subject**, entrez ```Attachment Test```.
1. Dans le bandeau, cliquez sur l'icône de pièce jointe et choisissez **Browse This computer**.
1. Dans la fenêtre **Open**, naviguez vers le dossier **Documents**, sélectionnez **pieceJointe.txt** puis cliquez sur **Open**.
1. Cliquez sur **Send**.
1. Basculez ensuite sur LON-CL2.
1. Si un navigateur Internet est ouvert sur LON-CL2, fermez-le. Lancez ensuite une nouvelle session de navigation en cliquant sur l'icône de **Edge** dans la barre des tâches.
1. Ouvrez *Outlook on the Web* pour **Alan Yoo** en vous rendant à l'adresse suivante : ```https://outlook.office365.com```. Si la boite aux lettres de Alan ne s'ouvre pas, connectez-vous avec son compte (```alan@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` et le mot de passe ```ibForm@tion```).
1. Dans la boite de réception de Alan (*Inbox*), sélectionnez le message reçu de la tâche précédente dont le sujet est **Attachment Test**.
1. Sélectionnez la flèche descendante à droite du fichier joint **pieceJointe.txt**.
1. Dans la boite de Alan, vous ne devriez pas avoir l'option **Download** si la stratégie s'est correctement appliquée.

	> La prise en compte de votre stratégie peut prendre quelques minutes. Vous pouvez aussi essayer de faire un *force-refresh* de votre navigateur pour vous assurer que le moteur de Webmail que Alan utilise n'est pas celui qui a été précédemment mis en cache par exemple.

#### Tâche 2 - Configurer l'accès mobile
Dans cette tâche, vous allez créer une stratégie d'accès mobile qui place tous les nouveaux périphériques mobiles en quarantaine, après quoi la synchronisation de ces nouveaux périphériques devra être validée par un administrateur.  

1. Basculez sur **LON-CL1**. Les portails **Microsoft 365 admin center** et **Exchange admin center** devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Exchange admin center**, ouvrez le groupe d'options **Mobile** pour cliquer sur **Mobile device access**.
1. Sur la page **Quarantined Devices**, cliquez sur le bouton **Edit** en haut à droite.
1. Dans le panneau **Exchange ActiveSync access settings** qui s'affiche, dans la section **Connection Settings**, sélectionnez l'option **Quarantine – Let me decide to block or allow later**.
1. Sous la section **Quarantine Notification Email Messages**, enter l'adresse email de Dominique (```dom@[[godeployDomain],[labXXXXX]].godeploylabs.com```).
1. Cliquez sur le bouton **Save** avant de fermer le panneau **Exchange ActiveSync access settings**.

#### Tâche 3 - Configurer la boite aux lettres pour les mobiles
Dans cette tâche, vous allez configurer une stratégie de boite aux lettres accédée par les périphériques mobiles afin d'exiger un mot de passe de périphérique et une longeur minimum dudit mot de passe.

1. Dans le portail **Exchange admin center**, ouvrez le groupe d'options **Mobile** pour cliquer sur **Mobile device mailbox policy**.
1. Sur la page **Mobile device mailbox policy**, cliquez sur la stratégie **Default**.
1. Sur le panneau **Edit mobile device mailbox policy**, cliquez sur l'onglet **security** pour l'afficher en lieu et place de l'onglet *General*.
1. Sur l'onglet **Security**, cochez la case en regard de **Require a mobile device mailbox password**.
1. Cochez la case en face de **Allow simple passwords** (si elle n'est pas déjà cochée).
1. Dans le champ **Minimum password length**, entrez une valeur de **6**.
1. Dans le champ **Password recycle count**, entrez une valeur de **5**.
1. Cliquez sur **Save** et fermez le panneau **Edit mobile device mailbox policy** une fois vos changements sauvegardés.

<!-- IBCAN_PAGE_BREAK|a7e1 --># Atelier 7 - Déploiement de Microsoft Teams

## Exercice 1 - Configuration de Microsoft Teams

<div class="ibPrintNotes" data-exercise="a7e1" hidden></div>

Dans cet exercice, vous allez apprendre à gérer et configurer les principales fonctionnalités de l'environnement *Teams* depuis *le Teams admin center*. Dans son rôle d'administrateur d'Adatum, Dominique Skyetson a décidé de customiser la stratégie de l'entreprise concernant les réunions. Les stratégies de réunion contrôlent les fonctionnalités disponibles pour les participants. Une stratégie à l'échelle de l'entreprise, nommée *Global* est créée par défaut et est affectée à tous les utilisateurs de l'entreprise lors de la création du tenant. Dominique a choisi de modifier cette stratégie par défaut.  
Dominique souhaite également utiliser les paramètres des réunions *Teams* pour contrôler si des utilisateurs anonymes peuvent rejoindre les réunions et customiser les messages d'invitation dans ces réunions. Dans le contexte du projet pilote d'Adatum, il lui a été demandé de vérifier les paramètres modifiables concernant ces messages d'invitation. 
Ensuite, Dominique veut créer une nouvelle stratégie de messages qui concernera les messages interpersonnels et les canaux. Il va ensuite créer un compte de ressource pour une file d'attente téléphonique qui devra accueillir les appels des clients, jouer un message d'accueil avant de placer l'appel du client en attente, pendant la recherche d'un agent préconfiguré pour répondre à l'appel. Une fois le compte de ressource créé, il procédera à la création de la file d'attente elle-même.  
Arrivé à ce point, Dominique va se pencher sur les stratégies d'appel. Il lui a été demandé de créer une stratégie d'appels pour Adatum. Au lieu de customiser la stratégie globale par défaut, il suivra le conseil générique et créera sa propre stratégie qui sera utilisée par défaut ensuite par Adatum.  
Finalement, Dominique souhaite gérer l'accès à *Teams*, spécifiquement l'accès externe et l'accès invité. Il souhaite bloquer la communication avec les utilisateurs d'un domaine spécifique qui a été source de multiples attaques de spam envers Adatum l'an passé. En même temps, il souhaite autoriser les communications avec les utilisateurs d'un autre domaine qui est un partenaire clef de Adatum.

#### Tâche 1 - Gestion de la stratégie globale de réunion
Les stratégies de réunion contrôlent les fonctionnalités disponibles pour les participants dans les réunions *Teams* qui ont été planifiées par les utilisateurs de l'entreprise. Une stratégie par défaut pour l'entreprise nommée *Global* a été créée par défaut et elle a été appliquée à tous les utilisateurs de l'entreprise. Vous pouvez soit faire des changements à cette stratégie par défaut, soit créer votre propre stratégie spécifique. En créant une stratégie spécifique, il est possible d'autoriser ou d'interdire la disponibilité de certaines fonctionnalités à vos utilisateurs.
Dans le rôle de Dominique Skyetson, vous souhaitez maintenant customiser la stratégie globale de réunions pour l'entreprise, comme souhaité dans le cadre du projet pilote de mise en oeuvre de *Teams* chez Adatum.

1. Votre session devrait déjà ouverte sur **LON-CL1**, avec le compte **ADATUM\Administrator** et le mot de passe **Pa55w.rd**.
1. Les portails **Microsoft 365 admin center** et **Exchange admin center** (que vous pouvez désormais fermer) devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation de gauche, cliquez sur **Show all** (si nécessaire), puis descendez dans ce menu pour cliquer sur **Teams** dans la section **Admin centers**. Cela va ouvrir le **Microsoft Teams admin center** dans un nouvel onglet.
1. Dans le portail **Microsoft Teams admin center**,  dans le menu de navigation, cliquez sur **Show All**.
1. Ouvrez le groupe d'options **Meetings** pour cliquer sur le choix **Meeting policies**.
1. Descendez dans la fenêtre **Meeting policies** pour cliquer sur la stratégie **Global (Org-wide default)**.  
1. Dans la fenêtre **Global (Org-wide default)** qui s'affiche, sous la section **Meeting join &amp; lobby**, observez chaque paramètre. Comme Adatum a rencontré des problèmes par le passé avec des invités en accès téléphonique entrant de manière inopinée dans des réunion, il vous a été demandé de vérifier que l'option **People dialing-in can bypass the lobby** soit sur **Off**.
1. Sous la section **Content Sharing**, observez chaque paramètre. Sur le choix **Screen sharing mode**, cliquez sur **Entire screen** pour le changer en **Single application**.
1. Toujours sous la section **Content Sharing**, basculez le choix **External participants can give or request control** à **On**.
1. Sous la section **Recording and transcription**, observez chaque paramètre et assurez vous que la fonctionnalité de  **Transcription** soit sur **On**.
1. Cliquez sur le bouton **Save** en bas de la page.
1. Cliquez sur le bouton **Confirm** dans la boite de dialogue **Changes will take time to take effect**.

#### Tâche 2 – Gestion des paramètres de réunions
Toujours en tant que Dominique Skyetson, Administrateur de l'entreprise Adatum, vous allez ici utiliser les paramètres de contrôle des réunions *Teams* pour contrôler si les utilisateurs anonymes peuvent rejoindre des réunions, et customiser les messages d'invitation. Vous pourriez aussi utiliser ces paramètres pour activer la QOS (*Quality of Service*) et définir les ports utilisés pour le trafic temps-réel. Tous ces paramètres s'appliquent à toutes les réunions *Teams* que les utilisateurs de l'entreprise vont planifier.

1. Les portails **Microsoft 365 admin center** et **Microsoft Teams admin center** devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. sur le portail **Microsoft Teams admin center**, cliquez sur **Meeting settings** dans le groupe d'options **Meetings**.
1. Sur la page **Meetings settings**, dans la section **Email invitation**, Saisissez les informations suivantes :

	- **Logo URL** : ```https://renaudwangler.github.io/ib-pages/logo_ibcegos.png```
	- **Privacy and security URL** : ```https://adatum.com/legal.html```
	- **Help URL** : ```https://adatum.com/joiningmeetinghelp.html```
	- **Footer :** ```Please accept at your earliest convenience. Thank you!```

1. Cliquez sur le bouton **Preview invite**.
1. Sur la boite de dialogue **Email invite preview**, consultez l'aperçu de l'invitation avant de cliquer sur le bouton **Close** pour la fermer.
1. De retour sur la page **Meetings settings**, sous la section **Network**, consultez les paramètres actuels.  

	> Si vous aviez besoin de ports réseau spécifiques que votre entreprise utilise pour envoyer et recevoir le flux multimédia, c'est l'endroit où vous pourriez le configurer. Pour les besoins de notre atelier, vous n'avez pas besoin de toucher aux paramètres de cette section. 

1. Cliquez sur le bouton **Save**.
1. Cliquez sur le bouton **Confirm** puis sur le
1. Select **Confirm** dans la boite de dialogue **Changes will take time to take effect**.

#### Tâche 3 – Gestion des stratégies de messages
Les stratégies de messages sont utilisées pour contrôler quelles fonctionnalités de messagerie sont disponibles aux utilisateurs *Teams* dans la messagerie interpersonnelle et dans les canaux d'équipes. Vous pouvez utiliser la stratégie par défaut qui a été créée automatiquement en même temps que votre tenant ou créer de nouvelles stratégies spécifiques répondant à des besoins particuliers de certains utilisateurs choisis dans l'entreprise.  
Dans le contexte de son projet pilote, Adatum demande la création d'une nouvelle stratégie de messages concernant les fonctionnalités dans les messages dans l'environnement *Teams*.

1. Les portails **Microsoft 365 admin center** et **Microsoft Teams admin center** devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. sur le portail **Microsoft Teams admin center**, cliquez sur **Messaging policies** dans le groupe d'options **Messaging**.
1. Sur la page **Messaging policies**, constatez que seule la stratégie par défaut **Global (Org-wide default)** existe. Cliquez sur **+ Add** dans la barre de menu au-dessus de la liste de stratégies.
1. Sur la fenêtre **Messaging policies \ Add**, saisissez ```Chat and Channel Messaging Policy``` dans le champ **Name** en haut du formulaire.
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

#### Tâche 4 – Créer un compte de ressource
Un compte de ressource, qui correspond à un objet utilisateur désactivé dans *Entra Id*, peut être utilisé pour représenter n'importe quelle ressource. Par exemple, un compte de ressource dans Exchange est utilisé pour représenter une salle de réunion et, dans *Teams*, les comptes de ressource seront utilisés pour les système de file d'attente et de répondeur de la téléphonie.  
Dans le contexte du projet pilote de Adatum, Dominique a été sollicité pour créer un compte de ressource pour un standard d'appel téléphonique qui devra accepter les appels des clients, jouer un message de bienvenue et placer ensuite le client en attente d'un agent qui décroche l'appel pour s'en occuper.  
Créer une file d'attente téléphonique est un processus en deux étapes, dans cette première tâche, vous allez créer le compte de ressource qui représente cette file d'attente. Dans la prochaine tâche, vous associerez réellement la file d'attente au dit compte.

1. Sur l'onglet **Teams admin center** de votre navigateur, dans le menu de navigation, ouvrez le groupe d'options **Voice** et cliquez sur **Resource accounts.**
1. Sur la page **Resource accounts** cliquez sur **+ Add** dans la barre de menu au-dessus de la liste des comptes de ressource.
1. Sur le panneau **Add resource account** qui apparaît, entrez les information suivantes :

	- **Display name** : ```Calling Queue 1```
	- **Username** : ```cq1```
	- **Domain name** : Dans le champ domaine à droite de l'adresse email, sélectionnez, dans le menu déroulant votre nom de domaine **[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com**.
	- **Resource account type** : **Call queue**

1. Cliquez sur **Save**.
1. **Calling Queue 1** apparaît désormais dans la liste des comptes de ressource.

#### Tâche 5 - Créer une file d'attente
Maintenant que vous avez créé un compte de ressource pour votre file d'atente, vous allez créer ladite file d'attente (dans le cadre de cet atelier nous ne pourrons lui affecter le précédent compte de ressource, par manque de licence et de numéro de téléphone).

1. Sur le portail **Microsoft Teams admin center**, cliquez sur **Call queues** dans le groupe d'options **Voice**.
1. Sur la page **Call queues**, cliquez sur **+ Add** dans la barre de menu en haut de la page puis sur **Advanced setup**.
1. Sur la page **General info**, entrez ```Call Queue 1``` dans le champ **Add a name for your call queue** en haut du formulaire.
1. Sélectionnez **English (United States)** dans le champ **Language** avant de cliquer sur **Next**.
1. Sur la page **Greeting and music**, saisissez les valeurs suivantes :

	- **Greeting** : **No greeting**
	- **Music on hold** : **Play default music**

1. Sur la page **Greeting and music**, cliquez sur **Next**.
1. Sur la page **Call answering** saisissez les valeurs suivantes :

	- Sélectionnez **Choose users and groups**, pour cliquer sur le bouton **Add users**. Dans le panneau **Add users**, entrez ```alan``` dans le champ **Search by display name or username**.  

		> Constatez le message notant **No matches found, as only Enterprise Voice-enabled users are supported**. Vu que Alan Yoo n'a pas de licence téléphonie *Teams* associée il n'apparait pas. Sur le panneau **Add users**, cliquez sur **Cancel**.

	- Cliquez sur le bouton **Add groups**. Dans le panneau **Add call agents**, tapez ```sales``` dans le champ **Search by distribution list or group name**. - Passez votre souris sur la ligne de **Sales department** qui s'affiche pour cliquer sur le bouton **Add** à sa droite.  
	- En bas du panneau **Add call agents** cliquez sur le bouton **Add**.

1. Sur la page **Call answering**, cliquez sur **Next**.
1. Sur la page **Agent selection** renseignez les valeurs suivantes :

	- **Routing Method** : **Round Robin**   
	- **Presence-based routing** : **Off**
	- **Call agents can opt out of taking calls** : **On**
	- **Call agent alert time (seconds)** : **45** (il pourra être plus simple de taper la valeur dans le champ que d'utiliser le curseur)

1. Sur la page **Agent selection**, cliquez sur **Next**.
1. Sur la page **Callback**, n'activez pas la fonctionnalité (valeur par défaut) et cliquez sur **next**.
1. Sur la page **Exception handling**, laissez les valeurs par défaut et cliquez sur **Next**.
1. Sur la page **Authorized users**, cliquez sur **Submit**. **Call Queue 1** apparaît désormais dans la liste des files d'attente (avec un warning, comme mentionné précédemment concernant le manque de licence et de numéro de téléphone).

#### Tâche 6 - Créer une stratégie d'appels
Dans *Teams*, les stratégies d'appels contrôlent quelles fonctionnalités d'appel et de téléphonie sont disponibles aux utilisateurs. Les stratégies d'appels déterminent si un utilisateur peut passer des appels privés, utiliser le transfert d'appel ou des numéros d'appels spécifiques, transfert ses appels vers sa boite vocale, initier des appels de groupe etc... Des stratégies d'appels par défaut sont créées en même temps que le tenant mais les administrateurs peuvent également créer des stratégies plus spécifiques.  
Dans le cadre du projet pilote *Teams* de Adatum, Dominique Skyetson a été missionné pour créer une stratégie d'appels spécifiques. Ainsi, au lieu de modifier une stratégie par défaut, il va créer sa propre stratégie qui sera utilisée sur les comptes des utilisateurs Adatum.

1. Sur le portail **Microsoft Teams admin center**, cliquez sur **Calling policies** dans le groupe d'options **Voice**.
1. Sur la page **Calling policies**, parcourez les stratégies proposées par défaut avant de cliquer sur **+ Add** dans la barre de menu au-dessus de la liste des stratégies.
1. Sur la page **Calling policies \ Add**, Saisissez ```Default Adatum Calling Policy``` dans le champ **Add a name for your calling policy** en haut du formulaire.
1. Parcourez ensuite le formulaire pour saisir les valeurs suivantes (laissez les éléments non mentionnés à leur valeur par défaut) :

	- **Make private calls** : **On**
	- **Call forwarding and simultaneous ringing to people in your organization** : **Off**
	- **Voicemail for inbound calls** : **Off**
	- **Delegation for inbound and outbound calls** : **Off**
	- **Prevent toll bypass and send calls through the PSTN** : **On**
	- **Busy on busy during calls** : **Let users decide**

1. Cliquez sur le bouton **Save**.
1. La stratégie **Default Adatum Calling Policy** apparaît désormais dans la liste. Notez que **yes** s'affiche dans la colonne *Custom policy*.

#### Tâche 7 – Gestion de l'accès externe
Grâce à la fonctionnalité d'accès externe, les utilisateurs *Teams* d'autres domaines peuvent participer à des appels et des échanges de messages. Vous pouvez cependant bloquer les utilisateurs de certains domaines.  
Dans le contexte du projet pilote d'Adatum, Dominique Skyetson souhaite bloquer la communication avec tous les domaines Entra Id externes, sauf pour ce qui concerne les utilisateurs de deux entités partenaire de Adatum (microsoft.com et ib.cegos.fr).

1. Sur le portail **Microsoft Teams admin center**, cliquez sur **External access** dans le groupe d'options **External collaboration settings**.
1. Sur la page **External access**, cliquez sur le menu **Allow all external domains** et sélectionnez **Allow only specific external domains**
1. Pour ajouter le domaine avec lequel la communication est autorisée, cliquez sur le bouton **Add external domain**.
1. Dans le panneau **Add external domain**, saisissez ```microsoft.com``` dans le champ **Enter the external domain you want to allow** avant de cliquer sur **Add** puis **Done**.
1. Pour ajouter un second domaine autorisé, cliquez sur **+ Add a domain** au-dessus de la liste des domaines autorisés.
1. Dans le panneau **Add external domain**, saisissez ```ib.cegos.fr``` dans le champ ***Enter the external domain you want to allow** avant de cliquer sur **Add** puis **Done**.
1. Cliquez sur le bouton **Save** en bas de page.
1. Dans la boite de dialogue **Changes will take time to take effect**, cliquez sur **Confirm**.

#### Tâche 8 – Gestion de l'accès invité
La fonctionnalité d'accès invité de *Teams* permet de gérer si les utilisateurs d'entités externes peuvent être invités dans l'environnement *Teams* et si quelles fonctionnalités sont accessibles à ces utilisateurs invités.  
Dans le contexte du projet pilote Adatum, Dominique Skyetson va maintenant modifier les fonctionnalités disponibles pour les comptes invités dans le tenant de Adatum.

1. Sur le portail **Microsoft Teams admin center**, cliquez sur **Guest access** dans le groupe d'options **External collaboration settings**.
1. Dans la fenêtre **Guest access**, assurez-vous que **Guest access** soit sur **On** en tête de formulaire.
1. Parcourez les paramètres de la section **Messaging** pour modifier les valeurs suivantes :

	- **Edit sent messages** : **Off**
	- **Delete sent Messages** : **Off**
	- **Delete chat** : **Off**
	- **Chat** : **On**
	- **Giphy in conversations** : **Off**
	- **Giphy content rating** : **G (based on the GIPHY Content Rating)**
	- **Memes in conversations** : **Off**
	- **Stickers in conversations** : **Off**
	- **Immersive reader for messages** : **On**

1. Cliquez sur le bouton **Save** en bas de page.
1. Dans la boite de dialogue **Changes will take time to take effect**, cliquez sur **Confirm**.

#### Tâche 9 – Gestion des paramètres d'équipes
Le portail d'administration de *Teams* inclut un ensemble de paramètre qui contrôlent la performance du client *Teams*.  
Dominique Skyetson va, pour finir cet atelier, configurer un certain nombre de ces paramêtres choisis par l'équipe projet pilote d'Adatum.

1. Sur le portail **Microsoft Teams admin center**, cliquez sur **Teams settings** dans le groupe d'options **Teams**.
1. Sur la page **Teams settings**, sélectionnez les valeurs suivantes :

	- **Notifications and feeds**
		- Suggested feeds can appear in a user's activity feed: **On**
	- **Tagging**
		- Who can manage tags: **Team owners and members**
		- Team owners can change who can manage tags: **On**
		- Suggested tags: ```Sales Manufacturing Accounting ``` (Notez qu'il y a un espace après chaque étiquette)
		- Custom tags: **On**
		- Shifts app can apply tags: **Off**
	- **Email integration**
		- Users can send emails to a channel email address: **On**
		- Accept channel email from these SMTP Domains: ```microsoft.com ib.cegos.fr ``` (Notez qu'il y a un espace après chaque domaine)
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

<!-- IBCAN_PAGE_BREAK|a8e1 --># Atelier 8 - Configuration de Sharepoint Online

## Exercice 1 - Configuration des paramètres de SharePoint Online

<div class="ibPrintNotes" data-exercise="a8e1" hidden></div>

Maintenant que Dominique a configuré *Exchange Online* et *Teams*, il s'apprette à implémenter *Sharepoint Online* dans le projet pilote d'Adatum.  
Dans cet exercice, Dominique va commencer par modifier les paramètres génériques de Sharepoint Online pour les mettre en conformité avec les besoins business d'Adatum.

#### Tâche 1 - Configuration de paramètres

1. Basculez sur la machine virtuelle **LON-CL1**, sur laquelle vous devriez encore être connecté avec le compte **adatum\Administrator** et le mot de passe **Pa55w.rd**.
1. Les portails **Microsoft 365 admin center** et **Microsoft Teams admin center** (que vous pouvez désormais fermer) devraient encore être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le portail **Microsoft 365 admin center**, dans le menu de navigation, cliquez sur **Show all** (si nécessaire) puis cliquez sur **Sharepoint** sous la section **Admin centers**. Ceci va ouvrir le portail **SharePoint admin center** dans un nouvel onglet.
1. Si une boite de dialogue **Take the tour** apparaît, cliquez en dehors pour la fermer.
1. Dans le menu de navigation du portail **Sharepoint admin center**, ouvrez le groupe d'options **Policies** pour cliquer sur **Sharing**.
1. Sur la page **Sharing**, cliquez pour ouvrir la section **More external sharing settings**. Parmi les options affichées, cochez la case **Allow guests to share items they don't own** (si elle n'est pas déjà cochée par défaut)). Cliquez sur le bouton **Save** en bas de page.

#### Tâche 2 - Configuration des profils utilisateurs

1. Les portails **Microsoft 365 admin center** et **Sharepoint admin center** devraient être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le menu de navigation du portail **SharePoint admin center** cliquez sur **More features**.
1. Sur la page **More features**, cliquez sur le bouton **Open** sur la tuile **User profiles**.
1. Sur la page **User Profiles**, sous l'en-tête **People** cliquez sur **Manage User Profiles**.
1. Sur la page **User Profiles**, tapez ```Alan``` dans le champ **Find profiles** avant de cliquer surt **Find**.
1. Le profil de Alan yoo s'affiche dans la liste. Cliquez sur la première colonne de la ligne du profil de Alan pour sélectionner **Edit My Profile**.
1. Dans la page **User Profiles**, Saisissez ```dominique``` dans le champ **Manager** et cliquez sur l'icône **check names** à droite du champ et vérifiez que le compte de Dominique Skyetson est affiché.
1. Dans le coin haut à droite de la page **User Profiles**, cliquez sur le bouton **Save and close**.
1. Fermez l'onglet **Manage User Profiles** de votre navigateur internet, afin de retourner sur l'onglet contenant le **SharePoint admin center**.
1. Sur la page **More features**, cliquez sur le bouton **Open** sur la tuile **User profiles**.
1. Sur la page **User Profiles**, sous l'en-tête **My Site Settings** cliquez sur **Setup My Sites**.
1. Sur l'onglet **My Site Settings**, faites défiler la page jusqu'à la section **My Site Cleanup** ; tapez ```dominique``` dans le champ **Secondary Owner** et cliquez sur l'icône **check names** à droite du champ et vérifiez que le compte de Dominique Skyetson est affiché.
1. Défilez jusqu'en bas de la page pour cliquer sur **OK**.
1. Fermez l'onglet **Manage User Profiles** de votre navigateur internet.

#### Tâche 3 - Configuration des applications

1. Les portails **Microsoft 365 admin center** et **Sharepoint admin center** devraient être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le menu de navigation du portail **SharePoint admin center** cliquez sur **More features**.
1. Sur la page **More features**, cliquez sur le bouton **Open** sur la tuile **Apps**.
1. Attendez que le catalogue d'applications soit prêt (votre navigateur Internet peut recharger la page plusieurs fois) et cliquez sur **More Features** dans le menu de navigation.
1. Sur la page **More features**, cliquez sur le bouton **Open** sur la tuile **Configure store settings**.
1. Sur la page **Apps**, en regard de **Apps for Office from the Store** cliquez sur **No** pour désactiver le lancement des applications Office lors de l'ouverture des documents des sites Sharepoint dans le navigateur.
1. Cliquez sur **OK**.
1. Fermez les deux derniers onglets ouverts dans votre navigateur Internet, laissant les portails **Microsoft 365 admin center** et **Sharepoint admin center** ouverts pour l'exercice suivant.

<!-- IBCAN_PAGE_BREAK|a8e2 --># Atelier 8 - Configuration de Sharepoint Online

## Exercice 2 - Configuration de sites SharePoint Online

<div class="ibPrintNotes" data-exercise="a8e2" hidden></div>

Dans cet exercice, Dominique Skyetson veut commencer à explorer les sites *SharePoint Online*. Pour en comparer le fonctionnement, Dominique va créer un site en utilisant le portail *SharePoint Online admin center*, avant d'en créer un second en utilisant Windows PowerShell. Elle va ensuite mettre en place les permissions d'accès sur les sites et vérifier leur mode de fonctionnement.

#### Tâche 1 - Créer un site dans le SharePoint admin center
Dans cette tâche, vous allez utiliser le portail Sharepoint admin center pour créer un site pour le service formation de Adatum.

1. Sur la machine LON-CL1, les portails **Microsoft 365 admin center** et **Sharepoint admin center** devraient être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le menu de navigation du **Sharepoint admin center**, cliquez sur le choix **Active sites** dans le groupe d'options **Sites**.
1. Sur la barre de menu au-dessus de la liste de sites, cliquez sur le bouton **+ Create**.
1. Sur la page **Create a site: Select the site type**, cliquez sur la tuile **Communication Site**.
1. Sur la page **Select a template**, choisissez le modèle de site **Standard communication**, qui semble convenir pour la communication sur les formations proposées par Adatum en cliquant sur la première tuile. Validez votre choix en cliquant sur **use template**.
1. Sur la page **Give your site a name**, saisissez ```Training``` dans le champ **Site name**.
1. Dans le champ **Site description**, saisissez ```Adatum training department catalog```.
1. Dans le champ **Site owner**, tapez ```dominique``` et cliquez sur le compte de Dominique Skyetson.
1. Sur la page **Give your site a name**, cliquez sur le bouton **Next**.
1. Sur la page **Set language and other options**, cliquez sur le bouton **Create site**. Vous allez retourner sur la page **Active sites**.
	> La création d'un site Sharepoint Online peut prendre quelques minutes. Ne passez pas à la suite des opérations tant que vous ne voyez pas apparaître le site **Training** dans la liste.

1. Sur la page **Active sites**, passez votre souris sur la ligne du site **Training**. Sélectionnez la case à cocher qui s'affiche à gauche du nom du site.
1. Sélectionnez la ligne du site **Training** devrait faire apparaître le bouton **Sharing** dans la barre de menu au-dessus de la liste de sites. Si ce bouton n'apparaît pas, vérifiez s'il est masqué dans le choix **More** (points de suspensions), vous pouvez tenter de rafraichir la page de votre navigateur.
1. Cliquez sur le bouton **Sharing** une fois qu'il est apparu sur la barre de menu.
1. Dans le panneau **Sharing**, sélectionnez **Anyone** avant de cliquer sur **Save** et de fermer le panneau.

	> Les paramètres de site changent pour permettre le partage d'éléments de ce site de la manière la plus ouverte possible.

#### Tâche 2 - Créer un site avec Windows Powershell
Après avoir créé un site avec le portail d'administration de Sharepoint Online, vous allez désormais utiliser Windows Powershell pour créer un site pour le service comptabilité de Adatum.

1. Sur **LON-CL1**, tapez ```Powershell ISE``` dans la recherche à droite du bouton **Démarrer** sur la barre des tâches.
1. Sur le menu **Démarrer**, dans le panneau de détail sur l'application **Windows PowerShell ISE**, cliquez sur **Run as administrator**.
1. Si une fenêtre **User Account Control** apparaît, connectez-vous avec le compte **adatum\administrator** et le mot de passe **Pa55w.rd**.
1. Dans la partie basse (bleue) de la fenêtre **Administrator: Windows Powershell ISE**, utilisez la commande suivante pour installer le module Powershell de gestion de Sharepoint Online :  
	```Install-Module Microsoft.Online.SharePoint.PowerShell -Force```
1. Dans l'invite de commande de l'ISE, utilisez la commande suivante pour vous connecter à votre environnement Sharepoint Online :  
	```Connect-SPOService –Url https://[[onMicrosoftDomain],[wwlxxxxx]]-admin.sharepoint.com```
	> Dans cette commande, le nom de domaine original est suffixé de *-admin*.

1. Dans la boite de dialogue **Sign in**, saisissez le nom de connexion de Dominique Skyetson (```dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com```) et cliquez sur **Next**.
1. Dans la boite de dialogue **Enter password**, saisissez ```ibForm@tion``` et cliquez sur **Sign in**.
1. Dans l'invite Powershell, utilisez la commande suivante pour créer un nouveau site nommé **Accounting** :  
	```New-SPOSite -Url https://[[onMicrosoftDomain],[wwlxxxxx]].sharepoint.com/sites/Accounting -Owner dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com -StorageQuota 500 -NoWait -Template PROJECTSITE#0 –Title Accounting```  

1. Minimisez la fenêtre **Administrator: Windows Powershell ISE**.
1. Dans votre navigateur Internet, la page **Active sites** devrait toujours être affichée à l'issue de la tâche précédente. Si le site **Accounting** ne s'affiche pas, rafraichissez la page du navigateur. (Il vous faudra peut-être attendre quelques instants et répéter l'opération). Ne passez pas à la tâche suivante tant que vous n'avez pas constaté l'affichage du site **Accounting** dans la liste des sites actifs.

#### Tâche 3 - Configurer des permissions sur les sites
Après avoir ajouté les sites de la formation et de la comptabilité d'Adatum, vous allez configurer des permissions pour le site de la formation. Vous allez affecter le rôle d'administrateur sur le site Formation à Alan Yoo.

1. Sur la machine LON-CL1, les portails **Microsoft 365 admin center** et **Sharepoint admin center** devraient être resté ouverts dans votre navigateur (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le menu de navigation du portail **SharePoint admin center**, cliquez sur **Active sites** dans le groupe d'options **Sites**.
1. Sur la page **Active sites**, constatez que les sites **Accounting** et **Training** apparaissent dans la liste des sites actifs. Cliquez sur le nom du site **Training**.

	> Cliquez sur le nom du site et non sur son adresse *../sites/training*.

1. A la création du site **Training**, Dominique Skyetson a été affecté comme seul administrateur. Vous souhaitez désormais ajouter **Alan Yoo** comme administrateur secondaire.  
	Sur le panneau **Training** qui s'affiche à droite de l'écran, sélectionnez l'onglet **Membership**.
1. Sur l'onglet **Membership**, sous la section **Site admins** cliquez sur **+ Add site admins**.
1. Sur la page **Add site admins to training**, tapez ```Alan``` dans le champ **Search by name or email address**. Sélectionnez le compte de **Alan Yoo** lorsqu'il apparaît puis cliquez sur **Add (1)**.
1. Fermez le panneau **Add site admins to Training**.
1. Basculez sur la machine virtuelle **LON-CL2** ou vous devriez encore être connecté avec le compte **.\admin**.
1. Dans le navigateur Edge, le Webmail **Outlook** devrait être resté ouvert (et vous devriez y être connecté avec le compte de *Alan Yoo*).
1. Dans la barre d'adresse du navigateur, utilisez l'adresse suivante : ```https://[[onMicrosoftDomain],[wwlxxxxx]].sharepoint.com/sites/Training``` pour ouvrir le site Sharepoint du service formation de Adatum.
1. Une fois que le site **Training** s'ouvre, attendez que l'icône d'engrenage s'affiche en haut à droite (à gauche des initiales de Alan Yoo). Cliquez sur cette icône d'engrenage.
1. Sur le panneau **Settings**, cliquez sur **Site permissions**.
1. Sur le panneau **Permissions**, cliquez sur **Advanced permissions settings**.
1. Sur l'onglet **Permissions: Training**, cliquez sur **Site Collection Administrators** dans la section **Manage** du ruban.
1. Vérifier que **Alan Yoo** apparaît dans le champ. Vous venez de vérifier que Alan est administrateur du site du service Formation, car il peut accéder aux paramètres administratifs de celui-ci.

#### Tâche 4 - Vérification de l'accès aux sites
Dans cette tâche, Alan Yoo, en tant qu'administrateur du site Sharepoint de la formation va donner l'accès au site du service Formation à deux utilisateurs qui en ont besoin : Libby Hayward et Elvis Cress. Tandis que Libby va demander l'accès au site, Alan sait déjà que Elvis a besoin d'accès et va lui assigner directement.

1. Sur **LON-CL2**, faites un clic-droit sur l'icône de **Edge** sur la barre des tâches, et dans le menu qui apparaît, choisissez **New InPrivate window**.
1. Dans la nouvelle session **InPrivate Browsing** de votre navigateur Internet, entrez l'adresse suivante pour ouvrir le site Sharepoint du service formation : ```https://[[onMicrosoftDomain],[wwlxxxxx]].sharepoint.com/sites/Training```.
1. Dans la boite de dialogue **Sign in**, entrez ```libby@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com``` et cliquez sur **Next**.
1. Sur la page **Enter password**, saisissez ```ibForm@tion``` et cliquez sur **Sign in**.
1. Sur la page **Stay signed in?**, cliquez sur **Yes**.
1. Une page s'affiche **Access required** qui indique **You need permission to access this site.** Un champ de message est prérempli avec la valeur : **I'd like access, please**.  
	Puisque ce message peut être personnalisé, Libby souhaite saisir un message justifiant pourquoi elle a besoin d'accéder à ce site. Remplacez le message existant par le suivant : ```Bonjour. Je m'appelle Libby Hayward. Je m'occupe du suivi post-formation de nos stagiaires internes et externes en France. J'aurai donc besoin d'accéder à ce site pour pouvoir participer à la vie du service Formation d'Adatum.```
	> Si une page d'erreur vous indique que Libby n'est pas présente dans l'environnement Sharepoint, votre test est peut-être trop rapide après la création du site : revenez plus tard pour retester la fin de la présente tâche...
1. Cliquez sur le bouton **Request Access**.
1. Minimisez la fenêtre de navigation privée dans la barre des tâches et retournez sur le navigateur Edge ou Alan Yoo est resté connecté.
1. Sur la page du site Sharepoint **Training**, Cliquez sur l'icône d'engrenage.
1. Sur le panneau **Settings**, cliquez sur **Site contents**.
1. en haut à droite de la page, cliquez sur le bouton **Access requests**.
1. Sur la page **Access Requests**, vérifiez que la demande de Libby Hayward apparaît sous la section **Pending Requests** et cliquez sur les points de suspension à droite de son nom.
1. Cliquez sur le menu **Permission** pour sélectionner **Training Visitors** avant de cliquer sur le bouton **Approve** en regard de la demande de Libby Hayward.
1. Sur la page du site Sharepoint **Training**, Cliquez sur l'icône d'engrenage pour sélectionner le lien **Site settings**
1. Sur la page **Site Settings**, dans la section **Users and Permissions**, cliquez sur **Site permissions**.
1. Sur l'onglet **Permissions: Training**, dans la liste des utilisateurs ayant accès au site, sélectionnez **Training Visitors**.
1. Dans la page **People and Groups - Training Visitors**, vérifiez que Libby Hayward soit dans la liste.
1. Vous souhaitez désormais inviter Elvis Cress à devenir membre du site Formation. Dans la barre de menu au-dessus de la liste des utilisateurs, cliquez sur le bouton **New** et choisissez **Add Users**.
1. Sur la boite de dialogue **Share 'Training'**, l'onglet **Invite People** est affiché par défaut. Dans le champ **Enter names or email addresses**, entrez ```Elvis```. Cliquez sur le compte de **Elvis Cress** lorsqu'il apparaît avant de cliquer sur **Share**.  
	Le nom de Elvis Cress apparaît désormais dans la page **People and Groups - Training Visitors** au côté de Libby Hayward.
1. Vous allez maintenant vérifier que Libby peut accéder au site Sharepoint du service Formation. Basculez sur la session de navigation privée que vous aviez minimisée.
1. Rafraichissez la page de demande d'accès au site **Training** (Si nécessaire, retentez l'accès sur l'adresse ```https://[[onMicrosoftDomain],[wwlxxxxx]].sharepoint.com/sites/Training```)
1. Le site **Training** s'ouvre : vous venez de confirmer que Libby peut accéder au site formation d'Adatum suite à l'acceptation de sa demande.
1. Fermez la fenêtre de navigation privée de Libby.
1. Faites de nouveau un clic-droit sur l'icône de **Edge** sur la barre des tâches, et dans le menu qui apparaît, choisissez **New InPrivate window**.
1. Dans la nouvelle sesssion **InPrivate Browsing** de votre navigateur Internet, entrez l'adresse suivante pour ouvrir le site Sharepoint du service formation : ```https://[[onMicrosoftDomain],[wwlxxxxx]].sharepoint.com/sites/Training```.
1. Dans la boite de dialogue **Sign in**, entrez ```elvis@[[godeployDomain],[labXXXXX]].godeploylabs.com``` et cliquez sur **Next**.
1. Sur la page **Enter password**, saisissez ```Pa55w.rd``` et cliquez sur **Sign in**.
1. Sur la page **Stay signed in?**, cliquez sur **Yes**.
1. Le site **Training** s'ouvre, confirmant que Elvis Cress y a accès après que l'administrateur du site lui ait donné accès.
1. Fermez la session de navigation privée de Elvis Cress.

<!-- IBCAN_PAGE_BREAK|a8e3 --># Atelier 8 - Configuration de Sharepoint Online

## Exercice 3 - Partage externe dans Sharepoint Online

<div class="ibPrintNotes" data-exercise="a8e3" hidden></div>

Dans les deux précédents exercices, Dominique Skyetson a configuré les services et les sites *SharePoint Online*. Il est donc désormais prêt à gérer le partage externe dans Sharepoint Online, dans le contexte d'ouverture d'Adatum vers Microsoft 365.  
Les fonctionnalités de partage externe de Sharepoint Online permet aux utilisateurs d'une entreprise de partager du contenu avec des utilisateurs externes à l'entreprise (comme des partenaires, vendeurs ou des clients). Le partage externe peut également être utilisé pour faciliter le travail de collaborateurs dont les comptes sont situés dans des *tenant Entra Id* distinct, si votre organisation en regroupe plusieurs.  
Sharepoint propose un paramétrage du partage externe au niveau de la globalité de l'entreprise et au niveau de chaque site. Pour permettre le partage sur un site de Adatum, Dominique doit d'abord l'autoriser au niveau de l'entreprise. Il pourra ensuite restreindre le partage externe site par site. Si les paramètres de partage externe d'un site et ceux de l'entreprise ne sont pas identique, ce sera le niveau le plus restrictif qui sera appliqué.  
Même si le niveau global de l'entreprise autorise le partage externe, touts les nouveaux sites ne l'autoriseront pas par défaut. Le niveau de partage par défaut pour les sites correspondant aux équipes *Teams* et autres groupes Microsoft 365 est "*New and existing guests*". Le niveau de partage par défaut pour les sites Sharepoint de communication classiques est "*Only people in your organization*".  
Dans cet exercice, Dominique va autoriser le partage externe au niveau de l'organisation et pour un site spécifique. Il vérifiera ensuite qu'il peut partager un document comme un site avec des utilisateurs externes.

#### Tâche 1 - Configurer le paramètre de partage global de Sharepoint
Dans cette tâche, Dominique va autoriser le partage externe sur la globalité de l'entreprise.

1. Basculez vers la machine virtuelle **LON-CL1** ou votre session devrait déjà ouverte, avec le compte **ADATUM\Administrator** et le mot de passe **Pa55w.rd**.
1. Les portails **Microsoft 365 admin center** et **Sharepoint admin center** devraient encore être resté ouverts dans votre navigateur Internet (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le menu de navigation du portail **SharePoint admin center**, sélectionnez **Sharing** dans le groupe d'options **Policies**.
1. Sur la page **Sharing**, cliquez sur la section **More external sharing settings** pour l'ouvrir et vérifiez que la case **Allow only users in specific security groups to share externally** est décochée. Si elle était cochée, décochez-la avant de cliquer sur le bouton **Save** en bas de page.

#### Tâche 2- Configurer un site pour le partage externe
Dans l'exercice précédent, vous avez créé un site pour le service formation d'Adatum. Dans cette tâche, vous allez configurer la possibilité de configurer le partage externe sur ce site.

1. Dans le menu de navigation du portail **SharePoint admin center**, cliquez sur **Active sites** dans le groupe d'options **Sites**.
1. Sur la liste des sites Sharepoint, cliquez sur le nom du site **Training** (pas sur son adresse *../sites/TRaining*).
1. Sur le panneau **Training** qui apparaît à droite de l'écran, cliquez sur l'onglet **Settings**.
1. Sur l'onglet **Settings**, l'option **Anyone** devrait être sélectionnée par défaut pour le champ **External file sharing**. Si ce n'est pas le cas, changez-la avant de sauvegarder (avec le bouton *Save*) ce changement.
1. Fermez ensuite le panneau **Training**.
1. Dans la liste des sites Sharepoint, cliquez désormais sur l'adresse **../sites/training** du site du service formation.
1. Un nouvel onglet s'ouvre, affichant le contenu du site **Training**. En haut de ce nouvel onglet (sous le bandeau *Sharepoint*), cliquez sur **Site access**.
1. dans le panneau **Site access** qui s'affiche, vous pouvez afficher les propriétaires, membres et visiteurs du site. En ouvrant la section **Site visitors - no control**, vous devriez pouvoir vérifier la présence de **Elvis Cress** et **Libby Hayward**.
1. Dans le champ situé au-dessus de ces groupes (sous la mention **Add users, Microsoft 365 groups or \[...]**), entrez une adresse email personnelle (qui n'a pas besoin d'être un compte Microsoft 365). Votre adresse email apparaît ensuite sous le champ en question, vous pouvez cliquer dessus.  
	Votre adresse personnelle apparaît désormais sous le champ, accompagnée d'un message indiquant que cette adresse est en dehors de l'entreprise Adatum.
1. Dans le champ **Add a message**, saisissez le message suivant : ```Comme convenu, vous pouvez désormais accéder au site Formation de Adatum.```.
1. Cliquez ensuite sur le bouton **Share**.
1. Dans la barre de menu de la page **training**, cliquez sur **Documents**.
1. Dans la barre de menu de la page **Documents** qui s'affiche, cliquez sur **+ Create or upload** pour choisir **Word document**.
1. **Word Online** s'ouvre dans un nouvel onglet de votre navigateur Internet. Si une boite de dialogue **Your privacy option** s'affiche, cliquez sur **Close**.
1. Dans le document vierge *Word*, tapez quelques mots de test et attendez que le document soit automatiquement sauvegardé (vous pouvez le surveiller en attendant l'icône de nuage marqué d'une coche de validation à droite du nom du **Document**). Cliquez l'icône de nuage à droite du nom du **Document**.
1. Dans le panneau qui s'affiche, dans le champ **Location**, cliquez sur le lien **Shared Documents**.
1. Un nouvel onglet s'ouvre dans votre navigateur, affichant de nouveau la page des **Documents** du site **training**. Le document que vous venez de créer (Nommé par défaut *Document.docx*) devrait apparaître dans la liste des documents.
1. Sélectionnez donc le bouton **Share this item with other people** qui s'affiche à droite du nom de votre document lorsque vous passez la souris dessus.
1. Dans la boite de dialogue **Share "Document.docx"** qui s'affiche, entrez l'adresse de messagerie personnelle que vous avez déjà utilisée au point précédent dans le champ **Add a name, group or email** et saisissez ```Voici le document que nous avions convenu de vous partager. Il vous est possible de l'éditer.``` dans le champ **Add a message**.
1. Cliquez sur le bouton **Send**.
1. Fermez la boite de dialogue **Link shared with you** qui s'affiche.
1. Conservez votre navigateur Internet ouvert, mais fermez-y tous les onglets sauf le premier (le portail **Microsoft 365 admin center**) pour le prochain atelier. 

#### Tâche 3 - Vérification du partage externe

1. Ouvrez la boite aux lettres personnelle que vous avez utilisée dans la tâche précédente.
1. Votre boite de réception devrait contenir deux messages d'invitation. Si vous ne les y trouvez pas, vérifiez votre dossier de courrier indésirable.
1. Ouvrez le message qui a pour sujet : **Dominique Skyetson wants to share Training**.
1. Cliquez sur le lien **Training** dans le message.
1. Connectez-vous avec les indications qui vous sont fournies (qui vont différer selon que vous ayiez un compte *Entra Id*, un compte personnel Microsoft ou ni l'un ni l'autre) et vérifiez que vous pouvez accéder au site **Training**
1. Fermez le site **Training** et retournez dans votre boite aux lettres personnelle pour ouvrir le second message qui devrait avoir pour sujet **Dominique Skyetson shared "Document" with you**.
1. Une fois le second message ouvert, vous pouvez cliquer sur le bouton **Open**

	> Vous êtes automatiquement redirigé vers Word Online ou s'ouvre le document que vous avez créé tout à l'heure.

1. Vérifiez que vous pouvez modifier le contenu du document, en surveillant la marque de sauvegarde à droite de son nom après avoir fait quelques modifications dedans.

<!-- IBCAN_PAGE_BREAK|a9e1 --># Atelier 9 - Autres outils Microsoft 365

## Exercice 1 - Viva Engage

<div class="ibPrintNotes" data-exercise="a9e1" hidden></div>

Comme *Engage* amène la richesse du réseau social d'entreprise Yammer aux environnements *teams*, *SharePoint Online* et aux autres applications Microsoft 365, Dominique Skyetson s'intéresse à la mise en oeuvre de *Viva Engage* dans le projet pilote d'Adatum. Ceci permettra aux utilisateurs d'Adatum de partager, créer et éditer des fichiers directement dans les conversations *Engage* avec *Office for the web*.  
Dans cet exercice, Dominique va configurer les paramètres principaux de *Viva Engage* pour l'environnement Adatum avant de préparer l'outil pour une meilleure expérience utilisateurs.

#### Tâche 1 - Configurer les paramètres globaux de Engage

1. Retournez sur la machine virtuelle **LON-CL1** ou votre session devrait déjà ouverte, avec le compte **ADATUM\Administrator** et le mot de passe **Pa55w.rd**.
1. Le portail **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur Internet (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Cliquez sur le choix **All admin centers** pour sélectionner **Viva Engage** dans la page **All Admin centers**.
1. Fermez les éventuels popup de bienvenue et d'information en cliquant sur le **X** en haut à droite de chacun.
1. Dans le page d'accueil de **Engage**, cliquez sur l'engrenage en haut à droite pour cliquer sur **Admin center**, cliquez sur la tuile **Tenant settings**.
1. Dans la page **Tenant settings** cliquez sur le bouyton **Add** dans la section **Usage Policy**
1. Utilisez les paramètres suivants : 

	- Dans le champ **Policy Name**, entrez ```Adatum Acceptable Use Policy```.
	- Activez le choix **Enable policy reminder on Viva Engage home feed**.
	- Dans le champ **Policy reminder**, saisissez : ```Please read our Engage usage policy.```
	- Dans le champ **Policy**, saisissez le texte suivant : ```Welcome to Engage! Our goal is to provide a collaborative environment to connect with colleagues and bridge various departments and geographic locations to share meaningful information.```

1. Cliquez sur le bouton **Save** en bas du panneau.
1. De retour sur la page **tenant settings**, activez le choix **Require users to review policy upon initial login and after updates**.
1. Dans votre navigateur Internet, fermez l'onglet **Viva Engage** avant de passer à la tâche suivante.

	> Dans la tâche suivante, vous allez réouvrir *Engage*. Le fait d'avoir fermé l'onglet vous assure que vos nouveaux paramètres seront bien pris en compte pour votre prochaine session de navigation.

#### Tâche 2 - Configurer l'expérience utilisateur dans *Engage*
1. Le portail **Microsoft 365 admin center** devrait encore être resté ouvert dans votre navigateur Internet (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Cliquez sur le menu des applications 365 (le carré de 3 x 3 cases haut à gauche de la page) pour y choisir **Engage**.
1. Dans le page d'accueil de **Engage**, cliquez sur l'engrenage en haut à droite pour cliquer sur *User settings**.
1. Sur la page **Settings**, cliquez sur l'onglet **Notifications**.
1. Dans la liste de notifications, toutes les cases en regard des options pour la section **Email notifications** sont cochées par défaut. Décochez toutes les cases sauf les deux suivantes :  

	- **New device login**
	- **New messages in Engage inbox**

1. Dans votre navigateur Internet, fermez l'onglet **Viva Engage** avant de passer à la tâche suivante.

#### Tâche 3 - Utilisation de *Viva Engage*
Dans cette tâche, vous allez vous connecter à *Viva Engage* avec le compte de Alan Yoo et vérifier que vous receviez bien l'avertissement sur l'utilisation correcte de *Engage* dans l'environnement Adatum que Dominique a configuré dans la première tâche.

1. Basculez vers la machine virtuelle **LON-CL2**. La dernière fois que vous avez utilisé LON-CL2 vous aviez utilisé le navigateur Internet pour ouvrir la boite aux lettres de Alan dans *Outlook on the web*. Fermez tous les onglets du navigateur, sauf celui intitulé **Mail - Alan Yoo - Outlook**.
1. Cliquez sur le menu des applications 365 (le carré de 3 x 3 cases haut à gauche de la page) pour y choisir **Engage**.

	>Si une boite de dialogue **Welcome to the new Viva Engage!** s'affiche, fermez la en utilisant le **X** dans le coin supérieur droit.

1. Une boite de dialogue **Adatum Acceptable Use Policy** devrait s'afficher, indiquant le comportement que Alan est sensé respecter dans cet outil, cliquez sur **I Accept**.

	> Si Alan se connecte de nouveau à *Engage* sur la machine ou sur une autre, cette boite de dialogue ne lui sera désormais plus présentée.
	
1. Fermez l'onglet **Viva Engage - Feed** pour terminer cet exercice.

<!-- IBCAN_PAGE_BREAK|a9e2 --># Atelier 9 - Autres outils Microsoft 365

## Exercice 2 - OneDrive for Business

<div class="ibPrintNotes" data-exercise="a9e2" hidden></div>

Après avoir implémenté *Viva Engage* dans le projet pilote Adatum, Dominique Skyetson est prêt à faire de même avec *OneDrive for Business*. Dominique sait que, avec OneDrive, les utilisateurs d'Adatum pourront accéder aisément et de manière sécurisée à leurs fichiers de travail depuis tous leur périphériques. Cela leur permettra aussi d'être plus efficace dans le travail avec d'autres collaborateurs, qu'ils soient internes ou externes à l'entreprise.  
Dominique a également conscience que *OneDrive for Business* aidera à mieux protéger les documents métier de Adatum car il seront chiffrés, aussi bien lors de leur déplacement que lors de leur stockage.  
Dans cet exercice, Dominique va mettre en oeuvre la synchronisation *OneDrive for Business*, créer quelques fichiers test à synchroniser et vérifier le résultat de ces opérations.  

#### Tâche 1 - Activation de la synchronisation OneDrive

1. Vous deviez être connecté sur **LON-CL2**, avec le compte **.\Admin** et le mot de passe **Pa55w.rd**.
1. Dans un précédent atelier, vous vous êtes connecté sur Microsoft 365 en tant que Alan Yoo et avez téléchargé et installé **Microsoft 365 Apps for enterprise**.  
	Vous devriez donc désormais pouvoir ouvrir l'application **Word** en tapant ```winword``` dans la barre de recherche, à droite du bouton **Démarrer** sur la barre des tâches. Cliquez sur **Word** dans la section **Best match** du menu **Démarrer**.
1. Lorsque **Word** s'ouvre, vérifiez quel compte utilisateur est licencié pour l'utiliser, en haut à droite de la fenêtre. S'il s'agit déjà du compte de Alan (ses initiales **AY** sont dans le cercle), passez au point suivant.  
	Cependant, si un compte différent est présent :

	1. Cliquez sur le bouton **Account** en bas à gauche de la fenêtre Word. Cliquez ensuite sur le lien **Sign out**.
	1. Validez l'opération en cliquant sur le bouton **Sign out**.
	1. Cliquez ensuite sur le bouton **Sign In**.
	1. Dans la fenêtre **Sign in**, saisissez **alan@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com** et cliquez sur **Next**.
	1. Vérifiez que **Alan Yoo** apparaît désormais en haut à droite de Word.

1. Après avoir vérifié que Word est licencié pour Alan Yoo, vous pouvez fermer Word.
1. Basculez sur le navigateur Edge qui devrai être encore ouvert et connecté avec le compte de **Alan Yoo** sur sa boite aux lettres *Outlook on the web*.
1. Cliquez sur le menu des applications 365 (le carré de 3 x 3 cases haut à gauche de la page) pour y choisir **OneDrive**.
1. Si une fenêtre **Welcome to OneDrive for Business** apparaît, fermez-la.
1. Dans la page **OneDrive**, cliquez sur le bouton **Create or upload** et choisissez **Word document**.
1. Si une fenêtre **Your privacy option** s'affiche, cliquez sur **Close**.
1. Dans le document vierge qui s'est ouvert sur un nouvel onglet de navigation dans **Word Online**, tapez un peu de texte témoin et constatez que *Word Online* le sauvegarde en surveillant la petite coche de validation qui apparaît sur le nuage à droite du nom de votre document (**Document**).
1. Vous souhaitez renommer ce document. Dans la barre de menu de Word Online, cliquez sur le champ contenant le nom du document (*Document*) pour saisir le nouveau nom ```OneDrive Test``` dans le champ **Rename File* et cliquez en-dehors de ce champ. Cela va renommer votre fichier.
1. Fermez l'onglet Word Online de votre navigateur.
1. Dans la fenêtre **OneDrive**, votre document **OneDrive test.docx** devrait apparaître (si ce n'est pas le cas, rafraichissez cette fenêtre). Cliquez sur l'icône d'engrenage **Settings** en haut à droite.
1. Sur le panneau **Settings**, cliquez sur **Sync this OneDrive**.
1. Sur la boite de dialogue **This site is trying to open Microsoft OneDrive**, cochez la case **Always allow [[onMicrosoftDomain],[wwlxxxxx]]-my.sharepoint.com to open links of this type in the associated app** avant de cliquer sur **Open**.
1. Dans la boite de dialogue **Set up OneDrive**, le compte d'Alan Yoo est affiché dans le champ **Email address**. Cliquez sur **Sign in**.
1. Dans la fenêtre **Enter password**, saisissez ```ibForm@tion``` et cliquez sur **Sign in**.
1. Sur la page **Stay signed in to all your apps**, cliquez sur **No, sign in to this app only**.
1. Sur la fenêtre **Your OneDrive folder**, notez l'emplacement local de votre dossier OneDrive et cliquez sur **Next**.
1. Sur la page **Backup folders on this PC**, cliquez sur **I'll do it later**.
1. Sur la page **Get to know your OneDrive**, cliquez sur **Next**.
1. Sur la page **Share files and folders**, cliquez sur **Next**.
1. Sur la page **All your files, ready and on-demand**, cliquez sur **Next**.
1. Sur la page **Get the mobile app**, cliquez sur **Later**.
1. Sur la page **You OneDrive is ready for you** cliquez sur **Open my OneDrive folder**.
1. L'explorateur de fichiers de Windows va s'ouvrir automatiquement sur le dossier **OneDrive - Adatum**.Vérifiez que le document **OneDrive test.docx** est à présent effectivement synchronisé sur le poste de travail local.

#### Tâche 2 - Création de fichiers à synchroniser avec OneDrive
Maintenant que la synchronisation de fichiers est activée avec *OneDrive for Business*, Dominique Skyetson veut créer des fichiers sur un poste local pour vérifier qu'il se synchronise bien dans le cloud.

1. Sur **LON-CL2**, assurez-vous que le dossier **OneDrive for Business** est ouvert dans l'explorateur de fichier depuis la tâche précédente. Si ce n'est pas le cas, ouvrez l'explorateur de fichier et sélectionnez l'emplacement **OneDrive - Adatum**.
1. Dans l'explorateur, cliquez sur **New folder** dans la section **New** de l'onglet **Home**.
1. Saisissez ```Private``` comme nom pour ce dossier.
1. De la même manière, créez un second dossier nommé ```Project A```.
1. Double-cliquez sur le dossier *Private* pour l'ouvrir dans l'explorateur de fichiers
1. Cliquez sur **New item** dans la section **New** de l'onglet **Home** de l'explorateur de fichiers et choisissez **Microsoft Word Document** et nommez le document ```Holidays```.docx.
1. Dans l'explorateur de fichiers, une petite coche verte apparaît à droite du nom du fichier **Holidays.docx**.  
1. Double-cliquez sur le fichier **Holidays.docx** pour l'ouvrir (notez que Word est licencié pour Alan Yoo, visible en haut à droite de Word). Tapez quelque texte de test dans le document, sauvegardez le document et fermez Microsoft Word.
1. Notez que l'icône dans la colonne **Status** que l'icône passe en double flèches bleue et se transforme en coche verte une fois le document synchronisé.
1. Dans l'explorateur de fichiers, cliquez sur **OneDrive - Adatum** dans la barre d'adresse pour naviguer dans le dossier parent.
1. Double cliquez sur le dossier **Project A**.
1. Cliquez sur **New item** dans la section **New** de l'onglet **Home** de l'explorateur de fichiers et choisissez **Microsoft Word Document** et nommez le document ```Project targets```.docx.
1. Double-cliquez sur le fichier **Project targets.docx** pour l'ouvrir, tapez quelques mots de test, sauvegardez vos changements avant de fermer Microsoft Word.
1. Vérifiez que le fichier est synchronisé en notant que son icône de statut est devenue une coche verte avant de minimiser l'explorateur de fichiers dans la barre des tâches.
1. Basculez dans la fenêtre de votre navigateur Internet. Vous devriez toujours être sur l'onglet **OneDrive**. Rafraichissez la fenêtre et cliquez sur l'entrée **My files** dans le menu de navigation à gauche.
1. Dans la liste **My files**, vous devriez voir vos deux nouveaux dossiers - **Private** et **Project A**.
1. Cliquez sur votre document **Holidays.docx** pour l'ouvrir dans Word Online.
1. Dans la barre de menu en haut de page, le **Mode Menu** est sur **Editing**. Ajoutez quelques mots à votre document. Ce dernier est automatiquement sauvegardé une fois que la coche apparaît sur le nuage à droite de son nom.
1. Dans votre navigateur Internet, basculez sur l'onglet **OneDrive**.
1. Puisque vous venez de modifier votre fichier **Holidays.docx**, vous verrez mention de ce changement dans la colonne **Modified**, qui vous indique que le document a été modifié il y a quelques secondes.
1. Basculez de nouveau vers l'explorateur de fichier que vous aviez minimisé. 
1. Dans l'arborescence, cliquez sur **OndeDrive - Adatum** pour retourner à la racine de votre emplacement OneDrive. Vous devriez voir que les changements que vous venez de faire ont été correctement synchronisés sur la copie locale.

#### Tâche 3 - Partage de fichiers avec d'autres utilisateurs

1. Dans l'explorateur de fichier, faites un clic-droit sur le dossier *Project A** et sélectionnez **View online**.
1. Votre navigateur Internet devrait s'ouvrir sur le **OneDrive** de Alan, avec l'arborescence ouverte sur **My files > Project A**.  
	Passez votre souris à gauche du nom de fichier **Projetc Targets.docx** et sélectionnez le cercle qui apparaît de sorte que ce dernier affiche une coche.
1. Une fois le fichier sélectionné, cliquez sur le bouton **Share** dans le menu en haut de page.
1. Dans la boite de dialogue **Share "Project Targets.docx"**, entrez les informations suivantes :

	- Entrez l'adresse de Dominique (```dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com```) dans le champ **Add a name, group or email**. Sélectionnez le compte de **Dominique Skyetson** qui s'affiche.
	- Dans le même champ, sur **Add more**, entrez ```Nona``` et sélectionnez le compte de **Nona Snider** qui s'affiche.
	- Dans le champ **Add a message** saisissez ```Voici les dernières informations sur le projet A.```.

1. Cliquez sur le bouton **Send**.
1. Après que le message a été envoyé, fermez la fenêtre **You invited 2 peope to edit[...]**.
1. Basculez sur **LON-CL1**. Votre navigateur Internet devrait être encore ouvert, avec le compte de Dominique Skyetson connecté.
1. Si vous n'avez aucun onglet ouvert sur la messagerie de Dominique, cliquez sur le menu des applications 365 (le carré de 3 x 3 cases haut à gauche de la page) pour y choisir **Outlook**.
1. Sélectionnez le message qui a pour sujet **Alan Yoo shared ""Project Targets" with you** (s'il n'apparaît pas, rafraichissez la page *Outlook on the web*).
1. Dans le message reçu, cliquez sur le bouton **Open**.
1. Vérifiez que votre document s'ouvre correctement dans *Word online* et faites quelques changements au texte. Ces changements devraient être automatiquement sauvegardés (une coche de validation apparaît à droite du nom du fichier **Project targets**). Par défaut, la nouvelle version est directement sauvegardée dans *OneDrive for business* et les versions précédentes restent consultables.
1. Fermez tous les onglets de votre navigateur Internet, sauf celui incluant le portail **Microsoft 365 admin center**.
1. Basculez de nouveau sur LON-CL2 car Alan souhaite stopper le partage du document.
1. Rafraichissez la fenêtre de votre navigateur Internet affichant le fichier **Projext targets.docx** dans *OneDrive for business*. Notez comme la colonne **Sharing** en regard du fichier indique désormais la mention **Shared**.
1. Cliquez sur le statut **Shared** dans la colonne **Sharing**. la boite de dialogue **Manage Access** s'ouvre.
1. Dans la boite de dialogue **Manage access**, cliquez sur **Stop sharing**.
1. Dans la boite de dialogue **Stop sharing?**, cliquez de nouveau sur **Stop sharing**.
1. Fermez la boite de dialogue **Manage Access**. Notez que, dans la liste des fichier, la colonne **Sahring** est repassée à **Private** (si ce n'est pas le cas automatiquement, rafraichissez la page du navigateur Internet).

<!-- IBCAN_PAGE_BREAK|a10e1 --># Atelier 10 - Sécurité et conformité dans Microsoft 365

## Exercice 1 - Création de labels de sensibilité

<div class="ibPrintNotes" data-exercise="a10e1" hidden></div>

Adatum a désormais une bonne vision de Microsoft 365 grâce à son projet pilote. L'entreprise a gagné plusieurs contrats gouvernementaux, l'amenant à travailler sur de nombreux produits sensibles et classifiés.  
Dans son rôle d'administrateur de l'entreprise Adatum, Dominique Skyetson s'est vu demandé par le CTO d'étudier une solution pour protéger et chiffrer les messages concernant ces contrats sensibles.  
Il lui a également été demandé que toute référence au "**Project New Day**" soit automatiquement chiffrée. Il s'agit du nom de code d'un projet top-secret, et il est impératif qu'aucune mention de ce projet ne fuite en dehors du contexte d'Adatum.  
Dans cet atelier, vous allez voir comment mettre en oeuvre la réponse à la demande du CTO en utilisant les labels d'informations sensibles dans le centre d'administration *Purview* et avec des commandes *Windows Powershell*.
>**Important :** Les labels d'informations sensibles et leurs stratégies peuvent prendre jusqu'à 24h pour se propager dans l'intégralité de l'environnement 365. Malheureusement, comme votre stage touche à sa fin, il y a de fortes chances que vous ne soyez pas à même d'en vérifier l'application dans votre tenant de test. Ceci étant acté, cet exercice va tout de même vous permettre de découvrir les interfaces de mise en oeuvre desdits labels et des stratégies correspondantes.

#### Tâche 1 - Créer une équipe *Teams* de test
Dans votre rôle d'administrateur, en tant que Dominique Skyetson, vous allez créer une nouvelle équipe *Teams*, nommée **PND Group** (pour groupe *Project New Day*) qui sera utilisée pour l'applications des labels de données sensibles par la suite.

1. Basculez vers la machine virtuelle **LON-CL1**, sur laquelle vous devrez être resté connecté avec le compte **adatum\Administrator** avec le mot de passe **Pa55w.rd**.
1. A l'issue de l'atelier précédent, votre navigateur Internet devrait être resté ouvert, avec un onglet contenant le portail **Microsoft 365 admin center**, connecté avec le compte de Dominique Skyetson.  

	> Si besoin, utilisez l'adresse ```https://admin.microsoft.com``` pour ouvrir le portail d'administration si vous l'aviez fermé.

1. Dans le menu de navigation du portail **Microsoft 365 admin center**, cliquez sur **Active teams & groups** dans le groupe d'options **Teams & groups**.
1. Sur la page **Active teams & groups**, cliquez sur le bouton **+ Add a team** sur la barre d'outils de l'onglet **Teams & Microsoft 365 groups**.
1. Sur la page **Set up the basics**, saisissez ```PND Group``` dans le champ **Name of team** et ```Group used for sensitivity label testing``` dans le champ **Describe this team**.
1. Cliquez sur **Next**.
1. Sur la page **Add owners**, entrez ```Dominique```dans le champ **Owners** et cliquez sur le compte de **Dominique Skyetson** lorsqu'il s'affiche.
1. Cliquez sur **Next**.
1. Sur la page **Add members**, entrez ```Beth```dans le champ **Members** et cliquez sur le compte de **Beth Burke** lorsqu'il s'affiche.
1. Procédez de même pour ajouter les comptes de ```Alan``` (Alan Yoo) et ```Joni``` (Joni Sherman).
1. Cliquez sur le bouton **Next**.
1. Sur la page **Edit settings**, saisissez ```PNDgroup``` dans le champ **Team email address**.  
1. Toujours sur la page **Edit Settings**, dans le champ **Privacy**, sélectionnez **Private - People can only join if they're added by an owner\[...].**.
1. Cliquez sur le bouton **Next**.
1. Sur la page **Review and finish adding team**, cliquez sur le bouton **Add Team**.
1. Sur la page **New team created**, notez le message indiquant qu'il peut s'écouler 5 minutes avant que la nouvelle équipe ne s'affiche. Cliquez sur **Close**.
1. Sur la page **Active teams and groups**, cliquez sur le bouton **Refresh** dans la barre de menu au-dessus de la liste des groupes. Si nécessaire, attendez quelques instants et répétez l'opération jusqu'à ce qu'apparaisse la nouvelle équipe.
1. Une fois l'équipe **PND group** affichée dans la liste, cliquez sur son nom.
1. Pour des questions de sécurité, vous avez décidé d'inclure Elviss Cress comme copropriétaire de cette équipe. Dans le panneau **PND Group** qui s'affiche, l'onglet **General** est affiché par défaut, cliquez sur l'onglet **Membership** pour l'afficher.
1. Sur l'onglet **Membership**, cliquez sur le bouton **+ Add owners**.
1. Sur le panneau **Add team owners to PND Group**, saisissez ```Elvis``` et cliquez sur le compte de **Elvis Cress** qui s'affiche.
1. En bas de page, cliquez sur **Add (1)**.
1. De retour sur le panneau **Add team owners to PND Group**, cliquez sur le **X** en haut à droite pour fermer les informations sur l'équipe.

#### Tâche 2 - Création de labels dans le portail *Purview*
Dominique a décidé de tester la création de labels de données sensibles en utilisant le portail *Purview* et *Windows Powershell*. Dans cette tâche, vous allez d'abord utiliser le portail *Purview* pour créer un premier label.

1. Dans le menu du portail **Microsoft 365 admin center**, cliquez sur **Microsoft Purview** sous la section **Admin centers**.
1. Cliquez sur la case **I agree to the terms of data flow[...]** avant de cliquer sur **Get started**.
1. Dans le menu de navigation du portail **Microsoft Purview**, cliquez sur **Solutions/Information Protection**.
1. Dans le menu **Information protection**, cliquez sur le choix **Sensitivity labels**.
1. Sur la page **Sensitivity labels**, dans le bandeau jaune sur la page **Labels**, cliquez sur **Turn on now** (s'il n'est pas déjà actif).
1. Sur la page **Labels**, cliquez sur **+ Create a label** dans la barre de menu au-dessus de la liste des labels.
1. Sur la page **Provide basic details for this label**, saisissez ```Adatum-Classified``` dans les champs **Name** et **Display name**
1. Saisissez ```For Official Use Only``` dans les champs **Description for Users** et **Description for admins**
1. Choisissez une couleur pour ce label en cliquant sur le carré la contenant.
1. Cliquez sur le bouton **Next**.
1. Sur la page **Define the scope for this label**, cliquez sur **Next**.
1. Sur la page **Choose protection settings the types of items you selected**, cochez la case devant **Apply content marking** et cliquez sur **Next**.
1.	Sur la page **Content marking**, cliquez sur le contrôle de bascule **Content marking** pour le faire passer à *ON**. De nouvelles options s'affichent que vous allez compléter dans les étapes suivantes.
1. Cochez la case **Add a watermark** et cliquez sur le bouton **Customize text**.
1. Dans le panneau **Customize watermark text**, saisissez les informations suivantes avant de cliquer sur le bouton **Save** :

	- **Watermark text** : ```ADATUM - CLASSIFIED```
	- **Font size** : **48**
	- **Font color** : **Red**
	- **Text layout** : **Diagonal**

1. Cochez la case **Add a header** et cliquez sur le bouton **Customize text**.
1. Dans le panneau **Customize header text**, saisissez les informations suivantes avant de cliquer sur le bouton **Save** :

	- **Header text** : ```FOR OFFICIAL USE ONLY```
	- **Font size** : **12**
	- **Font color** : **Blue**
	- **Align text** : **Left**

1. Cliquez sur le bouton **Customize text** sous la case à cocher **Add a footer** (cochez-la si elle ne l'est pas par défaut).
1. Dans le panneau **Customize footer text**, saisissez les informations suivantes avant de cliquer sur le bouton **Save** :

	- **Footer text** : ```ADATUM - CLASSIFIED```
	- **Font size** : **12**
	- **Font color** : **Green**
	- **Align text**: **Left**

1. Sur la page **Content marking**, cliquez sur le bouton **Next**.
1. Sur la page **Auto-labeling for files and emails**, assurez-vous que l'option **Auto-labeling for files and emails** reste désactivée et cliquez sur **Next**.
1. Sur la page **Define protection settings for groups and sites**, cliquez sur **Next**. 
1. Sur la page **Review your settings and finish**, révisez votre saisie et, si nécessaire, cliquez sur le lien **Edit** pour les modifier ; sinon, cliquez sur le bouton **Create label** en bas de page.
1. Sur la page **Your sensitivity label was created**, cliquez sur le bouton **Done**.
1. Sur le panneau **Publish label** qui s'affiche, cliquez sur **Cancel**, vous réaliserez la publication des labels ultérieurement, dans la tâche 4 du présent exercice.

#### Tâche 3 - Création de labels avec *Windows PowerShell*
Après avoir testé la création de labels de données sensibles en utilisant le portail *Purview*, Dominique souhaite tester la création de labels avec *Windows Powershell*.  

1. Si vous aviez minimisé la fenêtre **Administrator: Windows Powershell ISE** dans la barre des tâches, cliquez sur son icône pour la maximiser. Sinon, tapez ```Windows Powershell ISE``` dans le champ de recherche à droite du bouton **Démarrer** sur la barre des tâches. A droite du menu **Démarrer**, cliquez sur **Run as administrator** sous l'application.
1. Dans la commande (bleue) de **Administrator: Windows PowerShell ISE**, utilisez la commande suivante :  
	```Install-Module -Name ExchangeOnlineManagement -Force```
1. Dans l'invite Powershell, utilisez la commande suivante pour vous connecter à l'environnement *Purview* : (Si la commande pose problème en **Powershell ISE**, utilisez une simple invite **Powershell**) :  
	````Connect-IPPSSession -UserPrincipalName dom@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com````
1. Sur la page **Enter password**, saisissez ```ibForm@tion``` dans le champ **Password** avant de cliquer sur **Sign in**.
1. Dans l'invite Powershell, utilisez la commande suivante pour créer un nouveau label de données sensibles nommé *Adatum-Secret* :  
	```New-Label -Name Adatum-Secret -DisplayName Adatum-Secret -Tooltip 'For use with Government contracts ONLY' -AdvancedSettings @{Color="Red"} -Comment 'For use with Government contracts ONLY' -ApplyContentMarkingFooterEnabled $true -ApplyContentMarkingFooterText 'ADATUM - SECRET' -ApplyContentMarkingFooterFontSize 12 -ApplyContentMarkingFooterFontColor '#008000' -ApplyContentMarkingFooterAlignment left -ApplyContentMarkingHeaderEnabled $true -ApplyContentMarkingHeaderText 'TOP SECRET' -ApplyContentMarkingHeaderAlignment left -ApplyContentMarkingHeaderFontColor '#0000FF' -ApplyContentMarkingHeaderFontSize 12 -ApplyWaterMarkingEnabled $true -ApplyWaterMarkingText 'ADATUM - SECRET' -ApplyWaterMarkingFontColor '#FF0000' -ApplyWaterMarkingFontSize 48 -ApplyWaterMarkingLayout Diagonal```  
1. Basculez vers votre navigateur Internet et affichez l'onglet du portail **Microsoft Purview**. Vous devriez être resté sur la page **Labels**.
1. Dans la liste des labels, le label **Adatum-Classified** que vous avez créé dans le portail est affiché. Cliquez sur le bouton **Refresh** dans la barre de menu au-dessus de la liste.
1. Vous devriez désormais trouver dans la liste des labels le label **Adatum-Secret** que vous venez de créer en PowerShell en plus du label **Adatum-Classified**.  
	
#### Tâche 4 - Publication de labels dans *Purview*
Dans sa découverte des méthodes de travail avec les labels de données sensibles dans Microsoft 365, Dominique souhaite comprendre comment publier ces labels dans le portail *Purview*.

1. Dans le menu de **Microsoft Purview**, cliquez sur **Publishing policies** dans le groupe **Sensitivity labels** de la solution **Information Protection**
1. Sur la page **Label policies**, cliquez sur **Publish label** dans le menu au-dessus de la liste des stratégies de labels.
1. Dans l'assistant **Create policy**, sur la page **Choose sensitivity labels to publish**, cliquez sur le lien **Choose sensitivity labels to publish**.
1. Dans le panneau **Sensitivity labels to publish** qui s'affiche, cochez la case devant **Adatum-Classified** avant de cliquer sur **Add**.
1. De retour sur la page **Choose sensitivity labels to publish** cliquez sur le bouton **Next**.
1. Sur la page **Assign admin units**, cliquez sur **Next**.
1. Sur la page **Publish to users and groups**, vous allez définir quels utilisateurs et groupes sont légitime à utiliser le label. Notez que le choix sélectionné est sur **All users & groups**, ce qui inclut tous les utilisateurs d'Adatum. Cliquez donc sur **Next**.
1. Sur la page **Policy Settings**, laissez toutes les cases décochées et cliquez sur **Next**.
1. Sur la page **Apply a default label to documents**, cliquez sur **Next**.
1. Sur la page **Default settings for emails**, cliquez sur **Next**.
1. Sur la page **Default settings for meetings and calendar events**, cliquez sur le bouton **Next**.
1. Sur la page **Default settings for Power BI content**, cliquez sur **Next**.
1. Sur la page **Name your policy**, saisissez ```Adatum-Classified Policy``` dans le champ **Name** et ```This policy is used for sensitive information in Government contracts only``` dans le champ **Description** avant de cliquer **Next**.
1. Sur la page **Review and finish**, révisez votre saisie et, si nécessaire, cliquez sur le lien **Edit** pour la modifier ; sinon, cliquez sur le bouton **Submit** en bas de page.
1. Sur la page **New policy created**, cliquez sur **Done**.

#### Tâche 5 - Publication de labels avec *Windows PowerShell*
Dominique a, pour finir, décidé de tester la publication de labels de données sensibles avec *Windows PowerShell*.  

> Comme pour les labels précédemment, il serait hors portée de notre stage de réaliser le détail de ces opérations avec *Windows PowerShell*. C'est pourquoi Dominique va se contenter de vérifier la faisabilité de la publication de labels en Powershell...

1. Utilisez son icône sur la barre des tâches pour maximiser la fenêtre **Administrator: Windows PowerShell ISE** que vous aviez utilisée dans une tâche précédente.
1. Dans la commande (bleue) de **Administrator: Windows PowerShell ISE**, utilisez la commande suivante pour créer un stratégie de publication de labels nommée *Adatum-Secret policy* :  
	```New-LabelPolicy -Name 'Adatum-Secret policy' -Labels 'Adatum-Secret' -Comment 'This policy is for the Microsoft 365 pilot project team related to Project New Day.' -ModernGroupLocation PNDgroup@[[onMicrosoftDomain],[wwlxxxxx]].onmicrosoft.com   -AdvancedSettings @{AttachmentAction = 'Automatic'; DisableMandatoryInOutlook = 'True'}``` 

1. Basculez vers votre navigateur Internet et affichez l'onglet du portail **Microsoft Purview**. Vous devriez être resté sur la page **Label policies**.
1. Dans la liste des stratégies, la stratégie **Adatum-Classified Policy** que vous avez créé dans le portail est affichée. Cliquez sur le bouton **Refresh** dans la barre de menu au-dessus de la liste.
1. Vous devriez désormais trouver dans la liste des stratégies celle nommée **Adatum-Secret policy** que vous venez de créer en PowerShell.

<!-- IBCAN_PAGE_BREAK|a11e1 --># Atelier 11 - Surveillance et dépannage de Microsoft 365

## Exercice 1 - Etat de santé du service Microsoft 365

<div class="ibPrintNotes" data-exercise="a11e1" hidden></div>

Pour conclure le projet pilote d'Adatum, Dominique Skyetson souhaite faire le point sur la visibilité de l'état des services Microsoft 365, incluant Office on the web, Engage et le MDM. Après une petite recherche, Dominique a découvert que cette information est directement accessible dans la page *Service Health* sur le portail d'administration Microsoft 365. Ainsi, si Adatum rencontre des problèmes avec l'exploitation d'un service Cloud, Dominique peut vérifier l'état de santé dudit service pour déterminer si le problème est actuel/connu/en cours de résolution avant d'ouvrir un ticket de support chez Microsoft et/ou de passer du temps à résoudre le souci. 

Dans cet exercice, Dominique va visualiser les informations d'état de santé du service et divers rapports depuis le portails Microsoft 365.



#### Tâche 1 - Visualiser l'état de santé des services

1. Sur la machine virtuelle **LON-CL1**, votre session devrait déjà ouverte, avec le compte **ADATUM\Administrator** et le mot de passe **Pa55w.rd**.
1. Les portails **Microsoft 365 admin center** et **Micrsooft Purview** (que vous pouvez désormais fermer) devraient être resté ouverts dans votre navigateur Internet (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans le menu de navigation du portail **Microsoft 365 admin center**, sélectionnez **Service health** dans le groupe d'options **Health** (il pourra être utile de cliquer sur **Show all**).
1. Sur la page **Service health** page, si un problème est présent dans la section **Active issues Microsoft is working on**, cliquez sur son titre pour ouvrir un panneau d'information contenant les détails du problème. Consultez les informations détaillées sur le problème, puis fermer le panneau.
1. Sur la page **Service health**, sous la section **Service status**, consultez la liste des services pour voir si certains affichent un problème connu en cours. Essayez, le cas échéant, de faire le lien avec les informations consultées dans le point précédent.
1. Remontez sur la page **Service health**, cliquez sur l'onglet **Issue history**. Un historique des incidents récemment résolus et autres avertissements va s'afficher.
1. Dans le menu de navigation du portail **Microsoft 365 admin center**, sélectionnez **Message center** dans le groupe d'options **Health**.
1. La page **Message Center** affiche une liste de tous les messages en cours (*inbox*) liés à des modifications planifiées et/ou en cours de mise en oeuvre. Sélectionnez un message pour consulter quelques informations sur le changement prévu. N'hésitez pas à consulter n'importe quel message dont le thème vous intéresse.
1. L'onglet **Archive** affiche la liste de changement récent, mais passés. Sélectionnez une entrée de la liste pour avoir plus de détails dessus.

#### Tâche 2 - Visualiser des rapports

1. Dans le menu de navigation du portail **Microsoft 365 admin center**, cliquez sur le groupe d'options **Reports**.
1. Consultez chacun des 2 types de rapports proposés ici (**Usage** et **Adoption Score**).
1. Microsoft 365 inclut également d'autres types de rapport, qui peuvent être trouvés dans le portail qui les concerne. Par exemple des :

	- Rapports de sécurité sont disponibles dans le portail *Defender*.

		1. Dans le menu de navigation du portail **Microsoft 365 admin center**, cliquez sur le portail **Security** dans la section **Admin centers**.
		1. Dans le portail **Microsoft Defender**, si nécessaire, cliquez (à gauche) sur la flêche **Show navigation**.
		1. En bas du menu de navigation du portail **Defender**, cliquez sur le choix **Reports**.

	- Rapports de flux de messages dans le centre d'administration Exchange.

		1. Dans le menu de navigation du portail **Microsoft 365 admin center**, cliquez sur le portail **Exchange** dans la section **Admin centers**.
		1. Dans le menu de navigation du portail **Exchange**, sélectionnez **Mail flow** dans le groupe d'options **Reports** 

	> Dans le contexte de votre atelier, de nombreux rapports contiendront peu ou pas d'information, du fait du peu d'interaction des utilisateurs Adatum avec l'environnement pilote...

<!-- IBCAN_PAGE_BREAK|a11e2 --># Atelier 11 - Surveillance et dépannage de Microsoft 365

## Exercice 2 - SDépannage de flux de messages

<div class="ibPrintNotes" data-exercise="a11e2" hidden></div>

La conclusion logique à la surveillance des services Microsoft 365 est la possibilité de dépanner les erreurs qui surviennent dans le système. Pour Dominique Skyetson ca veut dire surveiller les problèmes liés à la messagerie, qui furent une plaie par le passé pour Adatum. Dominique pense tirer parti du *Remote Connectivity Analyzer* pour dépanner les problèmes de flux de messages. C'est un outil web pensé pour aider les administrateurs système à dépanner les problèmes de connectivité affectant leur environnement. L'outil va simuler différents flux de connexion et d'utilisation des outils.  
Dominique a prévu de tester cet outil en envoyant un email à un domaine qui n'existe pas et à un utilisateur n'existant pas. Ensuite, il va utiliser l'outil pour résoudre les erreurs survenues. Il va ensuite tester la traçabilité des messages pour en voir l'utilité dans son scénario de flux de messages. Dominique va ainsi chercher à savoir si un message a été reçu, rejeté, différé ou livré par les services Exchange Online.

#### Tâche 1 - Envoi d'un email à un domaine non existant
1. Sur la machine virtuelle **LON-CL1**, votre session devrait déjà ouverte, avec le compte **ADATUM\Administrator** et le mot de passe **Pa55w.rd**.
1. Le portail **Microsoft 365 admin center** devrait être resté ouvert dans votre navigateur Internet (et vous devriez y être connecté avec le compte de *Dominique Skyetson*).
1. Dans la page **Microsoft 365 admin center**, cliquez sur le menu des applications 365 (le carré de 3 x 3 cases en haut à gauche) pour y choisir **Outlook**.
1. Dans **Outlook**, cliquez sur le bouton **New mail**.
1. Dans le formulaire de nouveau message, tapez ```user@alt.none``` dans le champ **To**.
1. Dans le champ **subject**, saisissez ```Test email for non-existing domain.``` et tapez un peu de texte dans le corps du message avant de cliquer sur le bouton **Send**.
1. Attendez de recevoir le message d'échec de livraison.
1. Une fois le message d'échec de livraison reçu, ouvrez-le. Notez la raison de l'échec de livraison : **The Domain Name System (DNS) reported that the recipient's domain does not exist.**
1. Descendez dans le corps du message jusqu'à la section **Diagnostic information for administrators**. Sélectionnez tout le texte de cette section (qui commence après la ligne **Original message headers:** jusqu'à la fin du message) et copiez-le dans votre presse-papier.
1. Ouvrez un nouvel onglet dans votre navigateur Internet et utilisez l'URL suivante ```https://testconnectivity.microsoft.com```.
1. La page **Microsoft Remote Connectivity Analyzer** s'ouvre. Dans le menu de navigation à gauche, cliquez sur l'onglet **Message Analyzer**.
1. Dans la page **Message Header Analyzer** qui s'est ouverte dans un nouvel onglet, Cliquez dans la zone de texte sous le titre **Insert the message header you would like to analyze** et copiez-y les informations de diagnostique précédemment copiées.
1. Cliquez ensuite sur le bouton **Analyze headers**.
1. Consultez les informations de diagnostique et le temps qu'il a fallu pour que le message soit rejeté par exemple.
1. Cliquez sur **Clear** pour réinitialiser le *Message Header Analyzer*.

#### Tâche 2 - Envoi d'un email à un utilisateur non existant
1. Dans votre navigateur Internet, basculez sur l'onglet affichant la messagerie **Outlook** de Dominique Skyetson.
1. Dans **Outlook**, cliquez sur le bouton **New mail**.
1. Dans le formulaire de nouveau message, tapez ```ynotknirf082760@outlook.com``` dans le champ **To**.
1. Dans le champ **subject**, saisissez ```Test email for non-existing user.``` et tapez un peu de texte dans le corps du message avant de cliquer sur le bouton **Send**.
1. Attendez de recevoir le message d'échec de livraison.
1. Une fois le message d'échec de livraison reçu, ouvrez-le.
1. Descendez dans le corps du message jusqu'à la section **Diagnostic information for administrators**. Sélectionnez tout le texte de cette section (qui commence après la ligne **Original message headers:** jusqu'à la fin du message) et copiez-le dans votre presse-papier.
1. Dans votre navigateur Internet, basculez vers l'onglet **Message Header Analyzer**.
1. Cliquez dans la zone de texte sous le titre **Insert the message header you would like to analyze** et copiez-y les informations de diagnostique précédemment copiées.
1. Cliquez ensuite sur le bouton **Analyze headers**.
1. Consultez les informations de diagnostique et le temps qu'il a fallu pour que le message soit rejeté par exemple.
1. Fermez tous les onglets ouverts sur votre navigateur Internet, hormis celui contenant le portail **Microsoft 365 admin center**.

#### Tâche 3 - Analyse du flux de messages
Dans cette tâche, vous allez surveiller le flux de message en analysant leur traçabilité. Notez que bien que la fonctionnalité de traçabilité des messages soit fournie par *Exchange*, elle s'accède depuis le portail *Defender*.
1. Dans le menu de navigation du portail **Microsoft 365 admin center**, sous la section **Admin centers**, cliquez sur **Security** (il pourra être utile de cliquer sur **Show all**).
1. Dans le portail **Microsoft Defender**, si nécessaire, cliquez (à gauche) sur la flêche **Show navigation**.
1. Dans le menu de navigation du portail **Microsoft Defender**, cliquez sur **Exchange message trace** dans la section **Email & collaboration** section.
1. Dans la page **Message trace** vous trouvez quelques requêtes par défaut que vous pouvez directement utiliser. Cependant, dans le cas de Dominique, il souhaite créer une trace customisée. Cliquez sur **+Start a trace**.
1. Dans le panneau **New message trace** qui s'affiche, cliquez dans le champ **Senders** et tapez ```Dominique```. Sélectionnez le compte de **Dominique Skyetson**.
1. Sur l'échelle **Time range**, déplacez le pointeur sur **1 day** (cela permet d'afficher les dernières 24 heures).
1. Sous la section **Detailed search options**, dans le champ **Delivery status**, sélectionnez **Failed**.
1. Cliquez sur le bouton **Search**.
1. Sur la page **Message trace search results**, les deux messages des tâches précédentes de cet exercice apparaissent, Cliquez sur le message **Test email for non-existent user**.
1. Un panneau **Message trace details** s'ouvre, vous donnant des informations concernant ce message et comportant, entre autres, l'émetteur, le destinataire, la taille du message et des informations d'adresses IP.
1. Sélectionnez les zones **Message events** et **More information** pour les ouvrir.
1. Fermez le panneau **Message trace details**.
1. Répétez les opérations précédentes pour le message **Test email for non-existent domain**.