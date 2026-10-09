# Documentation d’architecture technique — ibCAN

## 1. Objet et périmètre

ibCAN est un site de cahiers d’ateliers numériques. Les contenus publiés sont écrits en Markdown, puis transformés en site statique par MkDocs. Un moteur spécifique en Python enrichit le rendu ; du JavaScript fournit les interactions dans le navigateur.

Le dépôt contient également ibCANWriter, un éditeur web autonome qui manipule un modèle JSON de stage et ses ressources. Il n’est pas un service serveur : son interface fonctionne dans le navigateur et l'échange de stages se fait sous forme d’archives ZIP.

Les contenus des stages sont des données pédagogiques : leur contenu détaillé n'a pas vocation à être décrit ici.

## 2. Vue d’ensemble

```text
Sources Markdown sous docs/
          │
          ├── README.md + aXeY.md + métadonnées + ressources
          │
          ├── generate_prints.py ──> print.md (documents dérivés)
          ├── writer/export.py ────> ZIP de stage + pythonTransfer.js
          │
          └── MkDocs + hooks/content_processor.py + main.py
                                      │
                                      └── site HTML statique
                                             │
                                             └── JavaScript / CSS dans le navigateur

ibCANWriter (éditeur web)
    ZIP (content.json + ressources)
          ⇅
    Modèle JSON + IndexedDB (fichiers)
          ⇅
    writer/import.py ──> Markdown sous docs/
```

Les deux chaînes se rejoignent sur les fichiers Markdown de `docs/` :

- ils constituent la source de publication.
- ils peuvent être convertis en modèle JSON pour ibCANWriter.
- un ZIP créé par le Writer peut être publié si déposé dans `writer/`.

## 3. Organisation des composants

| Fichier ou dossier | Responsabilité |
|---|---|
| `mkdocs.yml` | Configuration MkDocs, thème, hook, plugins et extensions Markdown. |
| `main.py` | Macros MkDocs (sommaire d’un stage et catalogue de stages). |
| `hooks/content_processor.py` | Hooks MkDocs qui enrichissent les pages, injectent les métadonnées et construisent les composants HTML. |
| `hooks/tools.py` | Fonctions communes : analyse des fichiers de stage, métadonnées YAML, illustrations, variables système, impression et métadonnées Git. |
| `docs/` | Stages et autres pages du site principal. |
| `docs/index.md` | Page de listing des stages hébergés : non destinées aux lecteurs (référence interne et pour les rédacteurs) |
| `docs/assets/` | JavaScript, CSS, bibliothèque ZIP et thèmes du site. |
| `docs/writer/` | Interface d’édition et de prévisualisation de ibCANWriter. |
| `themes/` | Templates MkDocs pour le rendu normal et l’impression. |
| `writer/export.py` | Conversion Markdown vers ZIP de stage pour édition (et génération de `pythonTransfer.js`). |
| `writer/import.py` | Conversion des ZIP déposés dans `writer/` vers les fichiers Markdown du stage. |
| `generate_prints.py` | Génération d'une page `print.md` par stage, à partir des sources de celui-ci. |
| `start-ibCAN.ps1` | Préparation et lancement de l’environnement local sous Windows. |
| `.github/workflows/` | Import automatisé des ZIP et publication du site sur GitHub Pages. |

### Front-end du site

- `docs/assets/common.js` : utilitaires communs, vérification du stockage et du presse-papiers, thèmes, chargement des ZIP dans le Writer et accès à IndexedDB.
- `docs/assets/contenu.js` : variables du stage, tâches et progression, notes, taille de texte et export/import des données du lecteur.
- `docs/assets/interface.js` : panneaux et interactions de navigation, aide, paramètres, illustrations et ouverture de l’impression.
- `docs/assets/print.js` : préparation du document imprimable et application des options d’impression.
- `docs/assets/contenu.css` : styles communs du site.
- `docs/assets/print.css` : styles dédiés à l’impression.
- `docs/assets/themes/*.css` : thèmes d’affichage sélectionnables.

### Front-end du Writer

- `docs/writer/index.html` et `writer.js` : écran d’édition, navigation dans le stage, opérations sur ateliers et exercices, outils Markdown, ressources et export.
- `docs/writer/preview.html` et `preview.js` : fenêtre de prévisualisation Markdown, variables, illustration et synchronisation de lecture.
- `docs/writer/writer.css` : styles propres aux fenêtres du Writer.
- `docs/writer/marked.min.js` : rendu Markdown dans la prévisualisation.
- `docs/assets/jszip.min.js` : lecture et création des archives ZIP dans le navigateur.
- `docs/assets/pythonTransfer.js` : fonctions et constantes de transfert générées par `writer/export.py`.

## 4. Sources documentaires et conventions

### 4.1 Structure d’un stage

Un dossier de stage dans `docs/` est pris en compte par le catalogue et les outils Python lorsqu’il contient un fichier `README.md`. Les exercices sont des fichiers Markdown nommés selon la convention `aXeY.md`, par exemple `a1e1.md` ou `X` identifie l’atelier  et `Y` identifie l’exercice.

L’ordre d'affichage est calculé numériquement à partir de ces identifiants.

> La structure logique « stage → ateliers → exercices » n’est pas stockée dans une arborescence dédiée. Elle est reconstruite depuis le nom des fichiers et leurs métadonnées.

Le `README.md` contient le titre du stage (premier titre `#`), l’introduction et, éventuellement, un front matter YAML avec l’auteur et les variables. Le marqueur `{{ sommaire() }}` est remplacé par le sommaire des ateliers du stage, généré automatiquement.

Un fichier d’exercice peut avoir un front matter YAML avec :

```yaml
Atelier: Nom de l’atelier
Duree: 15
```

`Atelier` fournit le libellé de l’atelier ; `Duree` est optionnelle, et affichée comme durée estimée. Le premier exercice portant le titre d’atelier fournit le libellé utilisé par la navigation et les sommaires.

### 4.2 Métadonnées du stage et variables

Le front matter de `README.md` peut contenir `Auteur` et `Variables`. Chaque variable utilise les propriétés suivantes :

```yaml
Variables:
  NomVariable:
    defaut: Valeur initiale
    lib: Libellé du champ (facultatif)
    aide: Texte d’aide (facultatif)
```

- `defaut` est la valeur utilisée initialement dans le texte de tous les exercices du stage.
- la présence de `lib` rend la variable modifiable par le lecteur et fait apparaître son champ dans Paramètres ;
- sans `lib`, la variable est une valeur fixe du contenu ;
- les occurrences `[NomVariable]` sont converties en éléments que le JavaScript peut actualiser.

Le moteur fournit aussi la variable système `ResourcesUrl`, dont la valeur pointe vers le dossier de ressources du stage sur le site.

### 4.3 Illustrations et ressources

Une illustration d’exercice est associée automatiquement si un fichier image porte le même nom de base que l’exercice, par exemple `a1e1.png`. Les extensions prises en charge sont `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`, `.bmp` et `.gif`. Une illustration est affichée dans un panneau latéral et peut être intégrée à l’impression.

Les autres images et fichiers du stage sont des ressources ordinaires. Les références Markdown à des images peuvent être locales ou externes. 
> Dans le Writer, les ressources internes sont stockées dans IndexedDB pendant l’édition et incluses dans le ZIP d’échange.

## 5. Génération et publication du site

### 5.1 Traitement MkDocs

`mkdocs.yml` configure MkDocs avec les plugins `search` et `macros`, le hook `hooks/content_processor.py` et les extensions Markdown déclarées dans la configuration.

`main.py` expose deux macros :

- `sommaire()` : lit la structure du dossier courant et produit la liste hiérarchique des ateliers, exercices et durées ;
- `liste_stages()` : parcourt `docs/`, sélectionne les dossiers munis d’un `README.md`, lit leur titre et auteur, puis génère les liens du catalogue et les actions de modification/export.

Les hooks du processeur de contenu agissent à plusieurs étapes :

1. **Markdown** : remplacent la variable système, adaptent le titre des pages de stage et d’exercice, ajoutent la durée et gèrent les stages autonomes et les ateliers à exercice unique.
2. **Contexte de page** : fournissent le template à utiliser, les informations Git, la navigation, le contenu d’aide et la présence/URL d’une illustration.
3. **HTML rendu** : injectent les métadonnées nécessaires au JavaScript, ajoutent les commandes de copie, transforment les éléments numérotés en tâches interactives, convertissent les variables, signalent les erreurs YAML et construisent le panneau Paramètres.

Les templates `themes/main.html`, `themes/default.html` et `themes/print.html` séparent le routage du rendu courant et du rendu imprimable, puis définissent leurs structures HTML respectives.

### 5.2 Pages d'atelier autonome

Le code reconnaît un dossier comme autonome lorsqu’il contient exactement un atelier et un exercice. Pour le comportement de redirection et de titre, la convention attendue est l’exercice unique `a1e1.md` :

- le `README.md` redirige vers l’exercice ;
- la navigation d’atelier est omise ;
- le titre du README sert de titre à l’exercice ;
- l’impression est construite autour de cet exercice.

### 5.3 Ateliers à exercice unique

Dans un stage qui contient plusieurs exercices au total, un atelier à exercice unique est affiché comme une entrée directe « Atelier » dans le sommaire et la navigation. Son titre reprend le titre défini pour l’atelier, avec le titre de l’exercice comme repli. Le document imprimable reprend cette présentation. Les ateliers à plusieurs exercices gardent leur hiérarchie actuelle.

### 5.4 Publication continue

Le workflow `.github/workflows/publish.yml` se déclenche sur les pushes vers `main` ou `travail`, sauf lorsque les seuls changements concernent `writer/**`. Il :

1. installe Python et les dépendances de génération ;
2. lance `generate_prints.py` ;
3. lance `writer/export.py` ;
4. exécute `mkdocs build` ;
5. déploie le répertoire `site` sur GitHub Pages.

Le site publié est donc un site statique ; les fonctionnalités du lecteur s’exécutent côté navigateur et n’ont pas de service applicatif côté serveur.

## 6. Comportement dans le navigateur

### 6.1 Interface et navigation

Le template courant fournit l’en-tête, le pied de page, l’aide, les notes, le bouton Paramètres et, selon la page, la navigation et le panneau d’illustration. `interface.js` relie ces composants à leurs actions.

La navigation est reconstruite par Python depuis les fichiers d’exercice. Elle permet d’ouvrir les exercices, de repérer l’exercice courant, d’afficher la progression et de signaler les notes présentes. L’ouverture du panneau et l’état des groupes d’ateliers sont conservés temporairement dans `sessionStorage`.

### 6.2 Tâches et progression

Les éléments de premier niveau des listes ordonnées des pages d’exercice sont rendus interactifs. Une tâche cochée entraîne la validation des tâches précédentes ; décocher une tâche retire aussi la validation des suivantes. Les états sont conservés dans le stockage local du navigateur. La progression par exercice est calculée à partir du nombre de tâches et utilisée dans la navigation et le sommaire.

### 6.3 Notes, variables et préférences

- Les notes sont associées à un exercice, enregistrées automatiquement et signalées dans la navigation.
- Les variables modifiables sont enregistrées automatiquement et répercutées dans le contenu du stage.
- La taille du texte et le thème sont des préférences persistantes.
- Les fichiers CSS présents dans `docs/assets/themes/` alimentent la liste des thèmes lors de la génération. `common.js` applique le choix en changeant la feuille de style ; en l’absence de préférence, le thème sombre est choisi si le navigateur signale un thème système sombre, sinon le thème `original`.
- Les blocs de code et certains éléments de code inline reçoivent un bouton de copie. La disponibilité du presse-papiers est vérifiée dans le navigateur.

### 6.4 Stockages navigateur

Le lecteur et le Writer utilisent des espaces distincts :

| Stockage | Usage |
|---|---|
| `localStorage`, clés `ibCAN-*` | Données persistantes du lecteur : variables, notes, progression et préférences. |
| `sessionStorage` | États temporaires d’interface et de navigation. |
| `localStorage`, clés `ibCANWriter-*` | Modèle JSON `Stage`, élément `Current` et état persistant d’édition du Writer. |
| `sessionStorage`, clés `ibCANWriter-*` | État temporaire du Writer, par exemple piles d’annulation et positions de fenêtres. |
| IndexedDB `ibCANWriter-Files` | Fichiers et images associés au stage en cours d’édition. |

Les fonctions d’export/import du lecteur portent sur les données `ibCAN-*` et n’incluent pas les états `sessionStorage`. Si le navigateur interdit le stockage local, les fonctions qui en dépendent sont désactivées et un avertissement est affiché.

### 6.5 Aide

`docs/help.md` est converti en HTML par `charger_aide()` dans le hook et injecté dans le panneau de la page. Son contenu est séparé du JavaScript et des templates mais il réutilise les éléments visuels réels du site...

## 7. Impression

`generate_prints.py` parcourt les dossiers de `docs/` contenant un README et génère un `print.md` pour chaque stage. Les sources utilisées sont le README, les exercices, les métadonnées et les illustrations. Ces fichiers sont dérivés : les modifier directement n’est pas le mode de maintenance prévu.

Pour un stage classique, `hooks/tools.py` :

- assemble le README, le sommaire, puis les exercices dans l’ordre des ateliers ;
- ajoute des ancres de saut de page ;
- ajuste les niveaux de titres des exercices ;
- prépare les emplacements pour notes et illustrations ;
- prépare les variables afin que `print.js` puisse choisir les valeurs par défaut ou personnalisées.

La page imprimable utilise `themes/print.html`, `docs/assets/print.css` et `docs/assets/print.js`. La préparation propose, lorsque ces contenus existent, d’inclure les notes personnelles, les illustrations et les valeurs personnalisées. Le bouton d’impression ouvre la route `/STAGE/print/`, puis appelle la boîte d’impression du navigateur.

Les informations d’édition du document sont calculées à partir des fichiers Markdown du stage. `hooks/tools.py` tente de récupérer les métadonnées du dernier commit via l’API GitHub en environnement Actions, puis utilise Git local pour le build local.

## 8. ibCANWriter et échanges de stages

### 8.1 Modèle JSON

Le modèle pivot manipulé dans le navigateur a la forme générale suivante :

```text
Stage
├── Reference
├── Titre
├── Auteur
├── Variables
├── Introduction
└── Ateliers[]
    ├── Id
    ├── Titre
    └── Exercices[]
        ├── Id
        ├── Titre
        ├── Duree
        └── Contenu
```

Les identifiants `Id` expriment l’ordre courant. Le Writer renumérote ateliers et exercices après les opérations structurelles et renomme les illustrations liées aux exercices déplacés.

### 8.2 Édition et prévisualisation

Le Writer permet d’éditer l’introduction, les ateliers, les exercices, leurs titres et durées, les variables et les ressources. Il permet aussi d’ajouter, supprimer et réordonner ateliers/exercices, d’insérer des éléments Markdown à l’aide de sa barre d’outils, et d’annuler/rétablir des changements.

La prévisualisation est une fenêtre distincte. Elle lit le modèle partagé via `localStorage`, observe les événements `storage`, rend le Markdown avec Marked et récupère les images internes depuis IndexedDB. La position de lecture peut être synchronisée avec l’éditeur. Les variables peuvent y être visualisées sous leur nom ou avec leur valeur par défaut.

### 8.3 Format ZIP et conversion

Le ZIP d’échange du Writer contient `content.json` et les ressources du stage, notamment les images et les fichiers sous `ressources/`.

- **Export dans le navigateur** : `writer.js` écrit `content.json` et les fichiers d’IndexedDB dans un ZIP téléchargé sous la forme `<Reference>-edit.zip`. L’export est bloqué si la référence ou le titre du stage est absent.
- **Ouverture dans le Writer** : `common.js` lit `content.json`, réinitialise l’espace de travail Writer, charge les ressources en IndexedDB puis ouvre l’éditeur. Depuis le catalogue, l’action Modifier charge le ZIP publié du stage.
- **Export de publication** : `writer/export.py` reconstruit le modèle JSON depuis le README et les fichiers `aXeY.md`, puis écrit `docs/<stage>/<stage>.zip` avec `content.json` et les ressources présentes.
- **Import vers Markdown** : `writer/import.py` traite les ZIP présents dans `writer/`, recrée le README et les exercices Markdown, restaure les fichiers du ZIP et supprime l’archive traitée.

Le format JSON sert d’échange entre les interfaces, mais les fichiers Markdown restent les entrées de la publication MkDocs.

## 9. Flux de modification par ZIP et intégration continue

Le workflow `.github/workflows/import-stage.yml` se déclenche sur un push vers `main` ou `travail` qui ajoute ou modifie un fichier `writer/**/*.zip`. Il exécute `writer/import.py`, puis ajoute et committe les fichiers générés sous `docs/`. Le push de ces changements déclenche ensuite le workflow de publication.

En local, `start-ibCAN.ps1` :

1. crée et active `.venv` si nécessaire, puis installe `requirements.txt` ;
2. exécute `writer/import.py` ;
3. génère les fichiers d’impression ;
4. régénère les ZIP de publication et `pythonTransfer.js` ;
5. lance `mkdocs serve` et ouvre le site local lorsqu’il devient disponible.

À distinguer :

- un ZIP **`<stage>-edit.zip`** exporté depuis l’éditeur sert au transfert du modèle du Writer ;
- un ZIP **`docs/<stage>/<stage>.zip`** produit par `writer/export.py` est présenté dans le catalogue et sert à ouvrir/modifier le stage ;
- un ZIP déposé dans **`writer/`** est une entrée du convertisseur Markdown piloté localement ou par GitHub Actions.

## 10. Sources et artefacts générés

Les principales sources maintenues sont les Markdown des stages, les ressources, le code Python/JavaScript/CSS/HTML, la configuration MkDocs et les workflows.

Les principaux artefacts régénérables sont :

- les `print.md` générés dans les dossiers de stage ;
- les ZIP de publication créés par `writer/export.py` ;
- `docs/assets/pythonTransfer.js`, généré à partir des définitions partagées dans `hooks/tools.py` (rend disponible des constantes Python dans la partie js).

## 11. Repères de maintenance

- Modifier le comportement de génération des pages dans `hooks/content_processor.py` ou les helpers associés dans `hooks/tools.py`.
- Modifier le contenu du catalogue ou sa macro dans `main.py`.
- Modifier les interactions du lecteur dans `docs/assets/` ; conserver les styles communs dans `contenu.css`, les styles d’impression dans `print.css` et les variantes visuelles dans `assets/themes/`.
- Modifier l’édition dans `docs/writer/` et les règles d’échange ou de conversion dans `writer/`.
- Modifier les contenus pédagogiques dans les fichiers Markdown de `docs/<stage>/`, pas dans les artefacts `print.md`.
- Après un changement aux structures échangées, vérifier ensemble la compatibilité entre `writer.js`, `writer/export.py`, `writer/import.py` et les fichiers Markdown produits.
