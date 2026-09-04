# Présentation du projet
J'ai développé une application web nommée **ibCAN** (anciennement ibLab) dont l'objectif est d'héberger, enrichir et diffuser des consignes d'ateliers de formation.
Les contenus pédagogiques sont rédigés en Markdown par des formateurs qui ne sont ni développeurs ni spécialistes du web. Le moteur doit donc masquer autant que possible la complexité technique et enrichir automatiquement les contenus générés.
Le projet est basé sur **MkDocs** mais une partie importante de la logique est assurée par des scripts **Python**, **JavaScript** et **CSS** développés spécifiquement pour ibCAN.
L'objectif est de fournir une expérience de lecture enrichie et interactive tout en conservant Markdown comme source documentaire principale.
Parmi les fonctionnalités actuellement prises en charge :

- enrichissement automatique des contenus ;
- Possibilité d'insérer une illustration pour chaque exercice;
- personnalisation des variables pédagogiques ;
- suivi de progression ;
- notes personnelles ;
- export/import des données utilisateur ;
- préparation à l'impression ;
- aide intégrée ;
- système de thèmes sélectionnables par le lecteur.

L'architecture du produit repose sur une séparation stricte des responsabilités :

- Python : structure + génération + métadonnées
- JavaScript : comportement + stockage + interaction utilisateur
- CSS : apparence + thèmes + personnalisation visuelle

Le dépôt est public : https://github.com/ib-Cegos/labs

Si nécessaire, je peux fournir le contenu complet des fichiers concernés par l'évolution sur laquelle nous travaillons.
Les fonctionnalités récemment ajoutées (notamment le système de thèmes) reposent sur une architecture permettant de faire évoluer l'apparence du site indépendamment :

- du contenu Markdown ;
- de la structure HTML générée ;
- de la logique métier JavaScript.

Cette séparation constitue désormais un principe structurant du projet.

---

# Architecture générale
## Génération des pages
MkDocs appelle `main.py` pour participer à la génération du site.
Pendant le build, MkDocs appelle également `hooks/content_processor.py` qui enrichit les pages générées.
Les fonctions réutilisables sont regroupées dans `hooks/tools.py`.

---

## Rôle des composants

### Python
Python est responsable de la structure documentaire et de la génération des contenus enrichis.
Principales responsabilités :

- analyser les stages ;
- analyser les exercices ;
- reconstruire l'organisation logique des ateliers ;
- générer les structures HTML nécessaires ;
- insérer l'image d'illustration le cas échéant;
- fournir les métadonnées nécessaires au JavaScript ;
- générer les panneaux enrichis (paramètres, navigation, aide, etc.) ;
- générer automatiquement certaines données injectées dans les pages ;
- détecter les erreurs documentaires ;
- préparer les exports d'impression.

Python ne pilote pas directement les données utilisateur stockées dans le navigateur.

---

### JavaScript
Le JavaScript est séparé en trois couches principales.

#### interface.js
Gestion de l'interface utilisateur :

- fenêtres modales ;
- navigation ;
- panneaux latéraux ;
- boutons ;
- comportements visuels ;
- ouverture de la préparation d'impression ;
- gestion de certains états temporaires d'interface ;
- interaction avec les différents composants de l'application.

#### contenu.js
Gestion des données utilisateur :

- variables personnalisées ;
- progression ;
- notes personnelles ;
- export/import ;
- préférences utilisateur ;
- taille d'affichage ;
- sélection du thème ;
- gestion du stockage local ;
- interactions liées aux contenus pédagogiques.

Les données persistantes sont stockées dans le `localStorage`.
Les états temporaires d'interface sont stockés dans le `sessionStorage`.

#### print.js
Gestion spécifique de l'impression :

- préparation d'impression ;
- variables imprimables ;
- notes imprimables ;
- illustrations imprimables;
- personnalisation du document ;
- mise à jour dynamique du contenu avant impression.

---

## CSS
### contenu.css
Contient les styles fonctionnels et pédagogiques communs à l'ensemble de l'application :

- contenu Markdown ;
- navigation pédagogique ;
- notes ;
- variables ;
- paramètres ;
- composants de copie ;
- aide intégrée ;
- éléments interactifs liés au contenu.

Ce fichier constitue le socle visuel commun à tous les thèmes.

---

### print.css
Contient exclusivement les styles utilisés pour les documents imprimables.
Il est indépendant des thèmes d'affichage utilisés pour la consultation.

---

### Thèmes
Les thèmes constituent une couche de présentation indépendante du contenu pédagogique.
L'apparence générale du site est définie par :

- un socle commun : `contenu.css` ;
- un thème sélectionnable : `themes/*.css`.

Architecture actuelle :

```text
docs/assets/
├── contenu.css
├── print.css
└── themes
    ├── original.css
    ├── sombre.css
    └── ...
```

Le lecteur peut sélectionner son thème depuis le panneau **Paramètres**.
Le thème sélectionné est :

- appliqué dynamiquement ;
- mémorisé dans le navigateur ;
- inclus dans les exports/imports utilisateur.

La liste des thèmes proposés est générée automatiquement pendant le build à partir des fichiers présents dans : "docs/assets/themes"
L'ajout d'un nouveau thème ne doit normalement nécessiter :

- aucune modification du JavaScript ;
- aucune modification du HTML ;
- aucune modification du contenu pédagogique.

Les thèmes doivent principalement agir au travers de variables CSS.
L'objectif est de faire varier l'apparence sans modifier :

- la structure HTML ;
- les mécanismes JavaScript ;
- les contenus Markdown.

Le système de thèmes est désormais considéré comme une fonctionnalité stable de l'architecture ibCAN.

---

# Structure du dépôt

```text
.
├── docs
│   ├── assets
│   │   ├── interface.js
│   │   ├── contenu.js
│   │   ├── print.js
│   │   ├── contenu.css
│   │   ├── print.css
│   │   └── themes
│   │       ├── original.css
│   │       ├── sombre.css
│   │       └── ...
│   │
│   ├── INDEX.md
│   ├── help.md
│   ├── ms503
│   └── msms030
│
├── hooks
│   ├── content_processor.py
│   └── tools.py
│
├── themes
│   ├── main.html
│   ├── default.html
│   └── print.html
│
├── generate_prints.py
├── requirements.txt
├── start-ibCAN.ps1
└── main.py
```

---

## Description rapide
### docs/
Contient l'ensemble des contenus pédagogiques ainsi que les ressources statiques utilisées par le site généré.

### docs/assets/
Contient les ressources front-end utilisées par les pages générées :

#### interface.js
Gestion de l'interface utilisateur :

- modales ;
- navigation ;
- panneaux ;
- boutons ;
- comportements visuels ;
- ouverture de la préparation d'impression.

#### contenu.js
Gestion des données utilisateur :

- variables personnalisées ;
- progression ;
- notes ;
- préférences utilisateur ;
- export/import ;
- stockage local ;
- thèmes ;
- fonctionnalités liées aux contenus pédagogiques.

#### print.js
Gestion de la préparation d'impression :

- personnalisation du document ;
- variables imprimables ;
- notes imprimables ;
- options d'impression.

#### contenu.css
Socle de styles commun à tous les thèmes.
Ce fichier contient :

- la mise en forme du contenu pédagogique ;
- les composants interactifs ;
- les panneaux ;
- les notes ;
- les variables ;
- les paramètres ;
- les styles utilisés par l'aide intégrée.

#### print.css
Styles spécifiques à l'impression.

#### assets/themes/
Contient les thèmes graphiques sélectionnables par le lecteur.
Chaque thème constitue une couche de présentation indépendante du contenu pédagogique.
Exemples :

```text
themes/
├── original.css
├── sombre.css
└── ...
```

La liste des thèmes disponibles est déterminée automatiquement lors du build à partir des fichiers présents dans ce répertoire.

---

### docs/help.md
Contient l'aide intégrée de l'application.
Le contenu est rédigé en Markdown puis transformé en HTML et injecté automatiquement dans la fenêtre d'aide pendant le build.

---

### docs/INDEX.md
Page d'accueil du site.
Elle est destinée principalement aux formateurs et aux auteurs de contenu et liste les stages disponibles.

---

### docs/STAGE/
Chaque dossier de stage contient :

- un README.md ;
- un ou plusieurs exercices `aXeY.md`.
- une image d'illustration par exercice (optionnelle) `aXeY.png`

Exemples : "ms503/", "sms030/", "az104/", "ms102/"

---

### hooks/
Contient les mécanismes d'enrichissement exécutés pendant le build MkDocs.

#### content_processor.py
Responsable de :

- l'enrichissement des pages ;
- l'injection des métadonnées ;
- la génération des panneaux ;
- l'ajout des boutons de copie ;
- la génération de la navigation ;
- l'intégration de l'aide ;
- détection et intégration des illustrations d'exercices ;
- la génération de certains composants HTML.

#### tools.py
Bibliothèque de fonctions réutilisables utilisée par les différents hooks Python.
Responsabilités :

- analyse documentaire ;
- lecture des métadonnées YAML ;
- détection des ateliers ;
- génération des exports d'impression ;
- accès aux informations Git ;
- détection automatique des illustrations associées aux exercices ;
- fonctions utilitaires communes.

---

### themes/
Contient les templates MkDocs utilisés pour le rendu final.

#### main.html
Template principal.

#### default.html
Template utilisé pour la consultation normale des ateliers.

#### print.html
Template utilisé pour les documents imprimables.

---

### generate_prints.py
Génère automatiquement les fichiers `print.md` nécessaires au pipeline d'impression avant l'exécution du build MkDocs.
Ces fichiers sont considérés comme des artefacts de génération.

---

### start-ibCAN.ps1
Script de démarrage du projet en environnement local.
Responsabilités :

- création du `.venv` si nécessaire ;
- installation des dépendances ;
- génération des documents d'impression ;
- lancement de MkDocs ;
- ouverture automatique du navigateur.

---

### main.py
Point d'entrée Python appelé par MkDocs pour participer au processus de génération du site.
``

---

# Modèle documentaire

## Accueil du site (INDEX.md)
Représente les coulisses du projet.
Cette page liste les stages disponibles mais n'est pas destinée aux apprenants.
Elle constitue le point d'entrée principal du site et permet :

- d'accéder aux différents stages publiés ;
- d'accéder aux informations générales du projet ;
- de faciliter les activités de rédaction et de maintenance.

---

## Stage
Chaque stage est représenté par un dossier 
Chaque dossier contient un fichier `README.md` qui constitue le point d'entrée principal fourni au stagiaire.

Le README :

- contient le titre du stage (premier `#`) ;
- contient éventuellement une introduction ;
- déclare les variables du stage dans son YAML ;
- peut contenir des informations générales sur le stage ;
- ne contient pas le sommaire du stage, celui-ci étant généré automatiquement.

Le README constitue la source documentaire principale du stage.

---

## Atelier
La notion d'atelier n'existe pas physiquement dans l'arborescence.
Elle est reconstruite automatiquement pendant le build à partir des noms des fichiers d'exercices et de leurs métadonnées.
Cette approche permet :

- de simplifier le travail des rédacteurs ;
- d'éviter une arborescence complexe ;
- de conserver une structure documentaire légère.

---

## Exercice
Chaque exercice est contenu dans un fichier nommé "aXeY.md" où X = numéro de l'atelier et Y = numéro de l'exercice.
Exemples : "a1e1.md", "a1e2.md", "a2e1.md", "a3e4.md"
Le moteur utilise cette convention de nommage pour :

- reconstruire la structure du stage ;
- générer la navigation ;
- calculer la progression ;
- produire les exports d'impression.

Chaque exercice constitue l'unité pédagogique élémentaire du système.

## Illustrations d'exercice
Chaque exercice peut être accompagné d'une illustration associée automatiquement par le moteur.
Le moteur recherche les images portant le même nom que l'exercice : aXeY.png
Lorsqu'une illustration est détectée, un panneau latéral Illustration est ajouté sur le bord droit de l'écran (le panneau s'adapte automatiquement aux dimensions de l'image)
La détection des illustrations est entièrement automatique et ne nécessite aucune métadonnée supplémentaire dans les fichiers Markdown.

---

## Métadonnées YAML
Les exercices peuvent contenir un en-tête YAML optionnel.
Exemple :

```yaml
Atelier: Nom de l'atelier
Duree: 15
```

Métadonnées actuellement prises en charge :
### Atelier

```yaml
Atelier: Nom de l'atelier
```

Permet de définir le nom de l'atelier auquel appartient l'exercice.
La valeur est utilisée lors de la génération :

- de la navigation ;
- du sommaire ;
- de l'impression.

L'information est généralement définie sur le premier exercice de l'atelier mais peut être présente sur plusieurs exercices.

### Duree

```yaml
Duree: 15
```

Permet de définir la durée estimée de l'exercice en minutes.
Cette durée est affichée automatiquement :

- dans le sommaire du stage ;
- dans l'exercice concerné ;
- dans certains éléments de navigation générés par le moteur.

---

## Reconstruction automatique du modèle documentaire
Le moteur ne s'appuie pas sur une déclaration explicite des ateliers.
La structure complète du stage est reconstruite à partir : "README.md" + "aXeY.md" + YAML
Python analyse ces éléments pour produire : Stage ==> Ateliers ==> Exercices

Cette reconstruction alimente ensuite :

- la navigation ;
- les indicateurs de progression ;
- les exports d'impression ;
- les métadonnées injectées au JavaScript ;
- les différents panneaux de l'interface utilisateur.

L'objectif est de limiter au maximum la quantité d'informations structurelles que les rédacteurs doivent maintenir manuellement.

---

# Variables

Les variables permettent de personnaliser dynamiquement les contenus pédagogiques sans modifier les fichiers Markdown.

Elles sont définies dans le YAML du `README.md` du stage.

Exemple :

```yaml
Variables:
    MODPassword:
        lib: Mot de passe administrateur
        defaut: MOD Admin Password

    userPass:
        defaut: ibForm@tion
```

---

## Variables modifiables

Si une variable possède la propriété :

```yaml
lib:
```

elle est considérée comme modifiable par le lecteur.

Exemple :

```yaml
MODPassword:
    lib: Mot de passe administrateur
    defaut: MOD Admin Password
```

Le moteur génère automatiquement un champ de saisie dans le panneau **Paramètres**.

La valeur saisie par l'utilisateur :

- est enregistrée automatiquement ;
- est conservée entre les sessions ;
- est réutilisée dans tous les exercices du stage ;
- participe à l'export/import des données utilisateur.

Les valeurs sont stockées dans le `localStorage` sous des clés commençant par :

```text
ibcan-
```

Exemple :

```text
ibcan-ms503-modpassword
```

---

## Variables fixes

Les variables ne possédant pas :

```yaml
lib:
```

sont considérées comme des constantes documentaires.

Exemple :

```yaml
userPass:
    defaut: ibForm@tion
```

Ces variables :

- ne sont pas modifiables par le lecteur ;
- n'apparaissent pas dans le panneau Paramètres ;
- sont remplacées automatiquement lors de l'affichage du contenu.

---

## Utilisation

Les variables peuvent être utilisées directement dans le contenu Markdown.

Exemple :

```text
Le mot de passe administrateur est : [MODPassword]
```

Lors de l'affichage de la page, le moteur remplace automatiquement :

```text
[MODPassword]
```

par la valeur correspondante.

Cette valeur peut être :

- la valeur par défaut définie dans le YAML ;
- ou la valeur personnalisée saisie par le lecteur.

---

## Remplacement automatique

Le remplacement des variables est effectué par le moteur pendant la génération de la page.

Les rédacteurs n'ont donc pas à gérer eux-mêmes :

- le stockage ;
- les formulaires ;
- le JavaScript ;
- la persistance des valeurs.

Le moteur se charge automatiquement de :

```text
Variable YAML
        ↓
Champ de saisie éventuel
        ↓
Stockage local
        ↓
Remplacement dans le document
```

---

# Stockage local
ibCAN utilise deux mécanismes de stockage du navigateur.

---

## localStorage
Le `localStorage` contient toutes les données persistantes de l'utilisateur.
Toutes les clés persistantes utilisées par ibCAN commencent obligatoirement par "ibcan-"

Exemples : "ibcan-font-size", "ibcan-theme", "ibcan-note-ms503-a1e1", "ibcan-ms503-modpassword"
Les données stockées dans le `localStorage` :

- sont conservées après fermeture du navigateur ;
- participent à l'export/import ;
- sont considérées comme les données utilisateur du produit.

Le `localStorage` contient notamment :

- les variables personnalisées ;
- les notes personnelles ;
- la progression ;
- la taille d'affichage ;
- le thème sélectionné.

---

## sessionStorage

Le `sessionStorage` est utilisé pour les informations temporaires d'interface.
Ces données :

- ne sont pas exportées ;
- ne sont pas importées ;
- disparaissent automatiquement à la fermeture du navigateur.

Le `sessionStorage` est réservé aux états d'interface n'ayant pas vocation à être conservés à long terme.

---

## Export / Import

L'export utilisateur repose exclusivement sur les clés "ibcan-*"
L'import restaure l'ensemble de ces données afin de permettre :

- la reprise d'un stage sur un autre navigateur ;
- la reprise sur une autre machine ;
- la restauration après perte des données locales.

Les informations stockées dans le `sessionStorage` ne participent jamais à l'export/import.
---

# Fonctionnalités du moteur
## Gestion des prérequis navigateur
Au chargement des pages, le moteur vérifie les fonctionnalités nécessaires à son fonctionnement.
Détections actuellement réalisées :

- accès au presse-papiers ;
- disponibilité du `localStorage`.

Lorsque certaines fonctionnalités ne sont pas disponibles :
- les commandes concernées sont désactivées ;
- les composants dépendants sont masqués ou rendus inactifs ;
- un message explicite est présenté à l'utilisateur.

L'objectif est de maintenir une expérience dégradée mais fonctionnelle plutôt qu'un comportement erratique.

---

## Copie de code
Le moteur ajoute automatiquement des boutons de copie sur les éléments de code.
Types pris en charge :

- blocs de code ;
- code intégré au texte (*inline code*).

L'utilisateur peut ainsi copier rapidement les commandes nécessaires aux ateliers sans sélection manuelle.
Cette fonctionnalité est injectée automatiquement pendant le build et ne nécessite aucune intervention du rédacteur.

---

## Progression
Toutes les listes numérotées présentes dans les exercices sont automatiquement transformées en tâches cochables.
Exemple :

```markdown
1. Créer un utilisateur
2. Attribuer une licence
3. Tester la connexion
```

Chaque étape devient une tâche interactive mémorisée dans le navigateur.
Le calcul de progression repose sur une collaboration entre Python et JavaScript : Python => analyse documentaire => window.ibExercises => JavaScript => calcul des progressions.
Le moteur calcule automatiquement :

- la progression de l'exercice ;
- la progression affichée dans la navigation ;
- les indicateurs visuels de complétion.

La progression est sauvegardée automatiquement et participe à l'export/import des données utilisateur.

---

## Navigation
Un panneau de navigation latéral permet :

- de circuler entre les exercices ;
- de visualiser l'organisation des ateliers ;
- de suivre la progression ;
- d'identifier rapidement les exercices terminés ;
- de signaler la présence de notes personnelles.

La structure de navigation est reconstruite automatiquement à partir du modèle documentaire.
Le panneau conserve certains états d'interface temporaires durant la session de navigation.

---

## Notes personnelles
Chaque exercice peut être annoté par le lecteur.
Stockage : "ibcan-note-STAGE-aXeY" (Exemple : "ibcan-note-ms503-a1e1")
Les notes :

- sont sauvegardées automatiquement ;
- participent à l'export/import ;
- sont signalées visuellement dans la navigation ;
- peuvent être incluses dans les documents imprimés.

Les notes constituent une fonctionnalité majeure du moteur et sont considérées comme des données utilisateur persistantes.

---

## Préférences utilisateur
Le moteur permet de mémoriser certaines préférences d'affichage.
Préférences actuellement prises en charge :

- taille du texte  (ibCAN-font-size)
- thème graphique (ibCAN-theme)

Caractéristiques :

- application immédiate ;
- sauvegarde automatique ;
- participation à l'export/import ;
- restauration automatique lors des visites suivantes.

Le système de thèmes repose sur les fichiers présents dans : "docs/assets/themes/"
Chaque thème constitue une variation d'apparence sans impact sur le contenu pédagogique ou les données utilisateur.

---

## Métadonnées Git
Le moteur exploite Git afin d'afficher des informations d'édition pertinentes.
Informations actuellement exposées :

- date d'édition ;
- auteur ;
- version (hash Git court).

### Consultation
Les informations affichées doivent correspondre au fichier Markdown actuellement consulté.
L'utilisateur visualise ainsi la date et l'auteur de la dernière modification du contenu affiché.

### Impression
Lors de la génération d'un document imprimable, les informations affichées doivent correspondre au fichier le plus récemment modifié parmi tous ceux constituant le document.
L'objectif est de refléter l'état réel du document exporté et non celui d'un exercice particulier.

---

## Détection YAML
Les erreurs présentes dans les en-têtes YAML sont détectées pendant le build.
Lorsqu'une erreur est identifiée :

- elle est enregistrée côté Python ;
- un message visuel est intégré dans la page concernée ;
- le rédacteur dispose d'informations facilitant le diagnostic.

Les erreurs YAML doivent être considérées comme des problèmes documentaires et non comme des erreurs utilisateur.
L'objectif est de permettre au rédacteur d'identifier rapidement :

- les erreurs de syntaxe ;
- les erreurs d'indentation ;
- les métadonnées invalides ;
- les problèmes empêchant l'interprétation correcte des variables ou des informations de stage.

---

# Interface utilisateur
Le pied de page contient plusieurs boutons permettant d'ouvrir des panneaux fonctionnels.
Chaque panneau :

- possède sa propre fenêtre ;
- peut être ouvert ou fermé indépendamment ;
- peut être fermé par son bouton dédié ;
- peut être fermé par sa croix de fermeture.

La logique d'ouverture et de fermeture des panneaux est centralisée dans `interface.js`.

---

## Aide
L'application dispose d'une aide intégrée accessible depuis le bouton **Aide**.
L'objectif de cette aide est d'expliquer rapidement les principales fonctionnalités du produit sans nécessiter de documentation externe.

---

## Aide intégrée
L'aide affichée par le bouton **Aide** est maintenue dans : "docs/help.md"
Ce document est considéré comme du contenu pédagogique et non comme une ressource technique.
Son contenu est converti en HTML puis injecté dans la fenêtre d'aide pendant le build.
L'objectif est que son évolution puisse être réalisée par un rédacteur sans modification du JavaScript ou des templates HTML.
L'aide intégrée est désormais considérée comme une fonctionnalité stable du produit.
Elle couvre actuellement :

- Navigation ;
- Contenu ;
- Notes ;
- Paramètres ;
- Impression.

L'aide doit rester synthétique.
Il s'agit d'une aide utilisateur et non d'un tutoriel détaillé.
Lorsqu'un élément de l'interface doit être présenté dans l'aide :

- privilégier la réutilisation des composants HTML/CSS existants ;
- éviter les captures d'écran lorsque cela est possible ;
- faire en sorte que les exemples suivent automatiquement le thème graphique actif ;
- éviter de recréer un composant spécifique à l'aide lorsqu'un composant équivalent existe déjà dans l'application ;
- privilégier les composants réels de l'application plutôt que des illustrations spécifiques.

Principe de préférence : Composants réels > Composants dérivés > Illustrations spécifiques
L'aide doit expliquer l'usage et les bénéfices d'une fonctionnalité avant d'en détailler le fonctionnement.

---

## Notes
Le panneau **Notes** permet la gestion des annotations personnelles associées à chaque exercice.
Fonctionnalités :

- saisie libre ;
- sauvegarde automatique ;
- suppression à la demande ;
- signalement visuel dans la navigation ;
- participation à l'export/import ;
- prise en charge lors de l'impression.

Les notes constituent une fonctionnalité de travail personnelle destinée à accompagner la réalisation des ateliers.

---

## Paramètres
Le panneau **Paramètres** centralise les préférences utilisateur ainsi que certaines fonctionnalités de maintenance des données.
Il est également utilisé pour mettre en évidence les variables personnalisables qui n'ont pas encore été renseignées.

---

### Variables dynamiques
Le panneau affiche automatiquement les variables possédant :

```yaml
lib:
```

Ces variables peuvent être modifiées par le lecteur.
Les modifications :

- sont sauvegardées automatiquement ;
- sont immédiatement répercutées dans le contenu affiché ;
- participent à l'export/import.

Une notification visuelle signale les variables encore laissées à leur valeur par défaut.

---

### Taille d'affichage
Persistée dans "ibCAN-font-size"
Le lecteur peut choisir la taille d'affichage du contenu.

Caractéristiques :

- application immédiate ;
- sauvegarde automatique ;
- participation à l'export/import.

La taille du texte constitue la référence d'affichage du contenu pédagogique.
Les styles dépendant directement du texte doivent donc privilégier les unités relatives afin de respecter ce réglage utilisateur.

---

### Thème graphique
Persisté dans : "ibCAN-theme"
Le lecteur peut sélectionner le thème graphique de son choix.
Caractéristiques :

- application immédiate ;
- sauvegarde automatique ;
- participation à l'export/import ;
- restauration automatique lors des visites suivantes.

La liste des thèmes disponibles est générée automatiquement pendant le build à partir des fichiers présents dans  "docs/assets/themes"
L'ajout d'un nouveau fichier CSS de thème doit automatiquement permettre sa sélection dans le panneau Paramètres.
Le changement de thème ne doit jamais modifier :

- le contenu pédagogique ;
- les données utilisateur ;
- la progression ;
- les notes ;
- les variables personnalisées.

Les thèmes ne doivent modifier que l'apparence.

---

### Export
Téléchargement d'un fichier JSON contenant l'ensemble des données persistantes : "ibcan-*"
Sont notamment exportés :

- les variables personnalisées ;
- les notes ;
- la progression ;
- la taille du texte ;
- le thème sélectionné.

L'objectif est de permettre la reprise du travail sur un autre navigateur ou une autre machine.

---

### Import
Restauration complète d'un export précédemment réalisé.
Les données actuellement enregistrées sont remplacées par celles contenues dans le fichier importé.
Après import, le rechargement de la page permet de retrouver :

- la progression ;
- les notes ;
- les variables ;
- les préférences d'affichage ;
- le thème actif.

---

### Impression
Ouvre "/STAGE/print/" pour accéder à la préparation d'impression.
Cette fonctionnalité permet :

- l'impression du stage ;
- la génération d'un PDF ;
- la personnalisation du document avant impression ;
- l'inclusion éventuelle des notes et des variables personnalisées.

---

# Ateliers autonomes
Cas particulier : 1 atelier contenant 1 seul exercice (donc "a1e1.md" uniquement) : Le moteur considère alors qu'il s'agit d'un atelier autonome.  
Conséquences :

- le README reste obligatoire ;
- le README redirige automatiquement vers `a1e1` ;
- la navigation spécifique est masquée ;
- le titre n'est pas préfixé ;
- l'impression correspond essentiellement au contenu de `a1e1.md`.

---

# Système d'impression
L'impression est considérée comme une fonctionnalité majeure et relativement autonome du moteur ibCAN.
Elle possède :

- son propre pipeline de génération ;
- ses propres templates ;
- ses propres mécanismes JavaScript ;
- sa propre couche CSS.

L'objectif est de produire un document adapté à l'impression tout en conservant les capacités de personnalisation offertes au lecteur.

---

## Pipeline
generate_prints.py => print.md => MkDocs => print.html => print.js
Le document imprimable est généré à partir des sources Markdown puis enrichi par les mécanismes habituels du moteur.
La préparation d'impression permet ensuite de modifier dynamiquement le document affiché :

- notes personnelles ;
- variables personnalisées ;
- options d'impression ;
- contenus optionnels.

La pagination finale dépend donc du document réellement affiché au moment de l'impression et non uniquement des sources Markdown.

---

## URL
Chaque stage dispose d'une URL dédiée : "/STAGE/print/"
Cette page est spécifiquement destinée à la consultation et à la préparation du document imprimable.

---

## Génération
Les fichiers `print.md` sont générés automatiquement avant le build MkDocs par "generate_prints.py"
Les fichiers `print.md` sont considérés comme des artefacts de génération.
Ils :

- ne constituent pas une source documentaire ;
- ne doivent pas être maintenus manuellement ;
- peuvent être régénérés à tout moment à partir des sources réelles.

Le contenu imprimable est toujours reconstruit à partir : README.md + aXeY.md + métadonnées

---

## Document imprimé
### Stage classique
Le document imprimé contient : README => Sommaire => Exercices regroupés par ateliers
La structure du document est reconstruite automatiquement à partir du modèle documentaire du stage.

---

### Atelier autonome
Cas particulier : 1 atelier + 1 exercice
Le README n'est alors pas imprimé.
Le document contient essentiellement : Exercice unique + Variables + Notes éventuelles
Cette approche évite la duplication inutile d'informations.

---

## Préparation d'impression
Lors du chargement de "/STAGE/print/" une fenêtre de préparation est affichée.
Caractéristiques :

- déplaçable ;
- interactive ;
- mise à jour immédiate du document ;
- prise en compte instantanée des modifications ;
- masquage automatique des options inutiles.

La fenêtre constitue le principal point d'entrée utilisateur pour la personnalisation du document avant impression.

---

## Variables imprimables
Les variables modifiables du stage peuvent être imprimées :

- avec leur valeur par défaut ;
- avec leur valeur personnalisée.

Le choix est effectué lors de la préparation d'impression.
Cette fonctionnalité permet notamment :

- de distribuer un atelier générique ;
- de produire une version personnalisée ;
- de générer une documentation adaptée à un environnement spécifique.

---

## Notes imprimables
Les notes personnelles peuvent être incluses dans le document.
Fonctionnement :

- les notes sont injectées en tête de chaque exercice ;
- les exercices sans note n'affichent aucun bloc inutile ;
- l'utilisateur peut choisir d'inclure ou non ses annotations.

Cette fonctionnalité permet de produire :

- un support personnel enrichi ;
- un document de révision ;
- une archive complète du travail réalisé.

---

## Illustrations
Les illustrations associées aux exercices peuvent être intégrées au document imprimé  : 

- insertion automatique sous les notes personnelles de l'exercice ;
- habillage spécifique via `print.css` ;
- inclusion optionnelle lors de la préparation d'impression ;
- comptabilisation des illustrations disponibles dans la fenêtre de préparation.

---

## Métadonnées d'édition
Une page de garde affiche les informations d'édition du document :

- date d'édition ;
- version Git ;
- auteur de la dernière révision.

Ces informations sont calculées automatiquement à partir des métadonnées Git utilisées par le moteur.
Pour un document imprimé, les informations affichées doivent correspondre au fichier le plus récemment modifié parmi tous ceux composant l'export.

---

## Sauts de page
Les exercices sont identifiés dans les sources par des marqueurs techniques "<!-- IBCAN_PAGE_BREAK|aXeY -->
Lors du rendu HTML, ces marqueurs deviennent : "<div class="ibPageBreak" id="aXeY"></div>"
Ces ancres sont utilisées pour :

- la navigation dans le document imprimé ;
- les liens du sommaire ;
- l'identification des exercices ;
- certains mécanismes de préparation d'impression.

---

## Pagination du sommaire
La pagination automatique du sommaire a fait l'objet de plusieurs expérimentations :

- `offsetTop` ;
- `beforeprint` ;
- `afterprint` ;
- compteurs CSS ;
- Paged.js ;
- Vivliostyle.

Aucune solution simple, robuste et compatible avec l'architecture actuelle n'a été retenue à ce jour.
Le moteur ne cherche donc pas actuellement à récupérer les numéros de page réels produits par Chromium.
Ce sujet n'est plus considéré comme prioritaire.

---

## Principes d'architecture du système d'impression
L'impression repose sur les mêmes principes de séparation des responsabilités que le reste du projet : Python => génération documentaire => JavaScript => préparation du document => CSS => apparence imprimée
Les mécanismes d'impression doivent rester indépendants :

- des thèmes de consultation ;
- des styles de lecture à l'écran ;
- des préférences purement visuelles du site.

Le document imprimable constitue un produit dérivé du contenu pédagogique et non une simple capture de la version affichée à l'écran.

---

# Principes d'architecture
Toujours privilégier :

- Python => structure + métadonnées + génération HTML
- JavaScript => comportement + stockage + interaction utilisateur
- CSS => apparence + thèmes + personnalisation visuelle

Éviter autant que possible le mélange des responsabilités.

---

## Séparation des responsabilités
Python ne doit pas piloter directement les données utilisateur.
JavaScript ne doit pas reconstruire la structure documentaire lorsqu'elle peut être fournie par Python.
CSS ne doit pas porter de logique métier.
Les thèmes ne doivent pas avoir connaissance :

- du contenu pédagogique ;
- des données utilisateur ;
- des mécanismes métier JavaScript.

Ils ne modifient que l'apparence du site.

---

## Système de thèmes
Le système de thèmes est considéré comme une fonctionnalité stable du moteur.
L'apparence est construite à partir : "contenu.css" + "theme.css"
Les thèmes doivent :

- être sélectionnables par le lecteur ;
- être indépendants du contenu ;
- être indépendants de la logique métier ;
- pouvoir être ajoutés sans modification du JavaScript ;
- privilégier l'usage de variables CSS.

Le changement de thème ne doit jamais modifier :

- les notes ;
- la progression ;
- les variables personnalisées ;
- les préférences utilisateur.

---

## Réutilisation de l'existant
Avant de créer un nouveau mécanisme :

- vérifier qu'un mécanisme similaire n'existe pas déjà ;
- rechercher en priorité les composants, styles ou mécanismes déjà présents dans ibCAN ;
- privilégier l'extension de l'existant ;
- éviter les systèmes parallèles ;
- privilégier les évolutions cohérentes avec l'architecture actuelle.

---

## Génération automatique
Lorsqu'une information peut être reconstruite automatiquement à partir de sources existantes, privilégier cette approche plutôt que la maintenance d'informations redondantes.

Exemples :

- génération automatique du sommaire ;
- reconstruction des ateliers ;
- génération de la navigation ;
- génération de la liste des thèmes à partir du contenu du répertoire `themes`.

---

# Principes UX
- Interface volontairement simple.
- Public principal : stagiaires et formateurs.
- Fonctionnalités discrètes.
- Sauvegarde automatique des données importantes.
- Interactions compréhensibles sans documentation.
- Les contraintes techniques doivent être masquées aux rédacteurs et aux apprenants.
- Les préférences visuelles doivent être mémorisées automatiquement.
- Le changement de thème doit être immédiat et sans impact sur les données utilisateur.
- Les composants doivent rester utilisables quel que soit le thème actif.

---

## Documentation et aide
Lorsqu'un élément de l'interface doit être expliqué dans la documentation ou dans l'aide :

- privilégier la réutilisation des composants HTML/CSS existants plutôt que des captures d'écran ;
- faire en sorte que les démonstrations suivent automatiquement le thème graphique actif ;
- éviter de recréer un composant spécifique à l'aide lorsqu'un composant équivalent existe déjà dans l'application ;
- privilégier les composants réels de l'application.

Principe de préférence : Composants réels > Composants dérivés > Illustrations spécifiques
La documentation utilisateur doit expliquer : Usage => Bénéfices => Fonctionnement, et non l'inverse.

---

# Méthode de travail
- Analyser l'architecture existante avant de proposer du code.
- Privilégier les évolutions incrémentales.
- Préférer plusieurs petits commits validables à une évolution massive.
- Vérifier systématiquement si un mécanisme équivalent existe déjà avant d'en créer un nouveau.
- Lorsqu'un code est fourni dans ce chat, toujours échapper les caractères `<` afin d'éviter qu'ils soient interprétés par l'interface web.
- En cas de doute sur un fichier, demander son contenu avant de proposer une évolution importante.
- Lorsqu'une évolution touche plusieurs couches (Python, JavaScript, CSS), conserver la séparation des responsabilités décrite précédemment.
- Lorsqu'une évolution visuelle est proposée, privilégier une validation locale avant publication.

---

# Environnement local
Le projet peut être exécuté localement sous Windows.
Outils installés :

- GitHub Desktop ;
- VS Code ;
- Python.

Le script **start-ibCAN.ps1** permet de :

- créer automatiquement l'environnement Python (`.venv`) s'il n'existe pas ;
- installer les dépendances définies dans `requirements.txt` ;
- générer les fichiers `print.md` ;
- lancer `mkdocs serve` ;
- ouvrir automatiquement le navigateur pour les tests locaux.

---

## Cycle de travail
Le cycle de travail peut être : "VS Code Web" ou "VS Code" => "Ctrl+S" => "Actualisation du navigateur local" => "Validation visuelle locale" => "Commit Git" => "Push GitHub"
Les évolutions visuelles doivent être validées localement avant publication via GitHub Pages.

---

## Priorité de validation
Pour les évolutions visuelles :
Modification => Test local => Validation visuelle => Commit => Publication
L'environnement local constitue désormais le mode de travail privilégié pour les développements, les corrections de bugs et les évolutions d'interface.