# Présentation du projet
J'ai développé une application web nommée **ibCAN** (anciennement ibLab) dont l'objectif est d'héberger et d'enrichir les consignes d'ateliers de formation.
Les contenus pédagogiques sont rédigés en Markdown par des formateurs qui ne sont ni développeurs ni spécialistes du web. Le moteur doit donc masquer autant que possible la complexité technique et enrichir automatiquement les contenus.  
Le projet est basé sur **MkDocs** mais une partie importante de la logique est assurée par des scripts Python et JavaScript développés spécifiquement pour ibLab.  
Le dépôt est public : https://github.com/ib-Cegos/labs  
Si nécessaire, je peux fournir le contenu complet des fichiers concernés par l'évolution sur laquelle nous travaillons.

---

# Architecture générale
## Génération des pages
MkDocs appelle : "main.py" pour participer à la génération du site.  
Pendant le build, MkDocs appelle également "hooks/content_processor.py" qui enrichit les pages générées.
Les fonctions réutilisables sont regroupées dans "hooks/tools.py"

---

## Rôle des composants
### Python
Python :
- analyse les stages ;
- analyse les exercices ;
- génère les structures HTML nécessaires ;
- fournit les métadonnées nécessaires au JavaScript ;
- prépare les exports d'impression.
Python ne pilote pas directement les données utilisateur.

---

### JavaScript
Le JavaScript est séparé en trois couches :
#### interface.js
Gestion de l'interface utilisateur :
- modales ;
- navigation ;
- boutons ;
- panneaux ;
- comportements visuels ;
- ouverture de la préparation d'impression.

#### contenu.js
Gestion des données utilisateur :
- localStorage ;
- variables ;
- progression ;
- notes ;
- export/import ;
- préférences utilisateur.

#### print.js
Gestion spécifique :
- préparation d'impression ;
- notes imprimables ;
- variables imprimables ;
- personnalisation du document avant impression.

---

## CSS
### contenu.css
Apparence des contenus pédagogiques.

### print.css
Apparence du document imprimable.

### Thèmes
Les thèmes ont vocation à être sélectionnables par le lecteur après génération du site.  
Actuellement seul le thème : "original" existe réellement.  
Les thèmes sont considérés comme une couche de présentation (principalement CSS).  
L'architecture cible est :
docs/assets/themes/
├── original.css
└── sombre.css

L'objectif est de faire varier principalement l'apparence et non la structure HTML.

---

# Structure du dépôt
.
├── docs
│   ├── assets
│   │   ├── interface.js
│   │   ├── contenu.js
│   │   ├── print.js
│   │   ├── contenu.css
│   │   ├── print.css
│   │   └── themes
│   │       └── original.css
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

---

# Modèle documentaire
## Accueil du site (index.md)
représente les coulisses du projet.
Cette page liste les stages disponibles mais n'est pas destinée aux apprenants.

---

## Stage
Chaque stage est représenté par un dossier : "ms503"  ou "sms030" par exemple

Chaque dossier contient : "README.md", point d'entrée principal fourni au stagiaire.
Le README :
- contient le titre du stage (premier `#`) ;
- contient éventuellement une introduction ;
- déclare les variables du stage dans son YAML ;
- ne contient pas le sommaire du stage qui est généré automatiquement.

---

## Atelier
La notion d'atelier n'existe pas physiquement dans l'arborescence.
Elle est reconstruite automatiquement à partir des noms des fichiers.

---

## Exercice
Chaque exercice est contenu dans un fichier "aXeY.md" où :
- X = numéro de l'atelier
- Y = numéro de l'exercice

Exemples : "a1e1.md", "a1e2.md", "a2e1.md"...

---

## Métadonnées YAML

Les exercices peuvent contenir :

```yaml
Atelier: Nom de l'atelier
Duree: 15 min
```

- `Atelier` permet de nommer l'atelier.
- `Duree` est affichée dans le sommaire et dans l'exercice.

---

# Variables

Les variables sont définies dans le YAML du README.
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
Si une variable possède :

```yaml
lib:
```

elle peut être modifiée par le lecteur.
La valeur personnalisée est stockée dans "localStorage", sous une clé "iblab-STAGE-VARIABLE"

---

## Variables fixes
Les variables ne possédant pas :

```yaml
lib:
```

sont considérées comme des constantes documentaires.

---

## Utilisation
Dans le contenu : "[MODPassword]" ; Le moteur remplace automatiquement ces occurrences.

---

# Stockage local
Toutes les données utilisateur sont stockées dans "localStorage"
Toutes les clés commencent obligatoirement par "iblab-"
L'export/import repose exclusivement sur ce préfixe.

---

# Fonctionnalités du moteur
## Gestion des prérequis navigateur
Détection :
- accès presse-papiers ;
- disponibilité du localStorage.

---

## Copie de code
Ajout automatique de boutons de copie :
- blocs de code ;
- inline code.

---

## Progression
Toutes les listes numérotées deviennent des tâches cochables.
La progression est calculée automatiquement.
Python fournit les métadonnées structurelles via : "window.ibExercises"
JavaScript calcule ensuite :
- progression des exercices ;
- progression des ateliers ;
- progression du stage.

---

## Navigation
Un panneau de navigation latéral permet :

- de circuler entre les exercices ;
- de suivre la progression ;
- de signaler la présence de notes.

---

## Notes personnelles

Chaque exercice peut être annoté.
Stockage "iblab-note-STAGE-aXeY"
Les notes :

- sont sauvegardées automatiquement ;
- participent à l'export/import ;
- sont signalées visuellement dans la navigation.

---

## Métadonnées Git
Le moteur exploite Git pour afficher :
- date d'édition ;
- auteur ;
- version (hash court).

### Consultation
Les informations affichées doivent correspondre au fichier Markdown actuellement consulté.

### Impression
Les informations affichées doivent correspondre au fichier le plus récemment modifié parmi tous ceux constituant le document imprimé.

---

## Détection YAML
Les erreurs YAML sont détectées pendant le build.
Le moteur ajoute des informations visuelles facilitant leur correction.

---

# Interface utilisateur
Le footer contient plusieurs boutons ouvrant des panneaux.
Chaque panneau :
- possède sa propre fenêtre ;
- peut être fermé par son bouton ;
- peut être fermé par sa croix.

---

## Aide
Panneau d'aide synthétique.
## Aide intégrée
L'aide affichée par le bouton « Aide » est maintenue dans : docs/help.md
Ce document est considéré comme du contenu pédagogique et non comme une ressource technique.
Son contenu est converti en HTML puis injecté dans la fenêtre d'aide pendant le build ( L'objectif est que son évolution puisse être réalisée par un rédcteur sans modification du JavaScript ou du template HTML ).
L'aide est désormais considérée comme une fonctionnalité stable du produit qui couvre actuellement :

- Navigation
- Contenu
- Notes
- Paramètres
- Impression

L'aide doit rester synthétique: Il s'agit d'une aide utilisateur et non d'un tutoriel détaillé.
Lorsqu'un élément de l'interface doit être présenté dans l'aide :

- privilégier la réutilisation des composants HTML/CSS existants ;
- éviter les captures d'écran lorsque cela est possible ;
- faire en sorte que les exemples suivent automatiquement les thèmes visuels ;
- éviter de recréer un composant spécifique à l'aide lorsqu'un composant équivalent existe déjà dans l'application.

---

## Notes
Gestion des annotations personnelles.

---

## Paramètres
Le panneau paramètres contient :

### Variables dynamiques
Modification des variables possédant 

```yaml
lib:
```

Une notification signale les variables encore non renseignées.

---

### Taille d'affichage
Persistée dans "iblab-font-size"
La taille de police pouvant être modifiée par le lecteur, tous les autres styles dans le css devront être exprimés en "em" et non en "rem".

---

### Export
Téléchargement d'un JSON contenant tous les "iblab-*"

---

### Import
Restauration complète d'un export.

---

### Impression
Ouverture de "/STAGE/print/" pour préparer l'impression.

---

# Ateliers autonomes
Cas particulier : 1 atelier contenant 1 seul exercice  
donc "a1e1.md" uniquement.  
Le moteur considère alors qu'il s'agit d'un atelier autonome.  
Conséquences :

- le README reste obligatoire ;
- le README redirige automatiquement vers `a1e1` ;
- la navigation spécifique est masquée ;
- le titre n'est pas préfixé ;
- l'impression correspond essentiellement au contenu de `a1e1.md`.

---

# Système d'impression
L'impression est considérée comme une fonctionnalité majeure autonome du moteur.

## Pipeline
generate_prints.py
    ↓
print.md
    ↓
MkDocs
    ↓
print.html
    ↓
print.js

La préparation d'impression permet de modifier dynamiquement le document (notes personnelles, variables personnalisées, options d'impression).
La pagination finale dépend donc du document réellement affiché au moment de l'impression et non uniquement des sources Markdown.
 - La pagination automatique du sommaire a été étudiée.
 - Aucune solution simple et robuste n'a été retenue.
 - Le sujet n'est plus considéré comme prioritaire.

---

## URL
Chaque stage dispose de "/STAGE/print/"

---

## Génération
Les fichiers "print.md" sont générés avant le build MkDocs par generate_prints.py.
Les fichiers print.md sont considérés comme des artefacts de génération, ils ne constituent pas une source documentaire et n'ont pas vocation à être maintenus manuellement.

---

## Document imprimé
### Stage classique
Le document contient :

README
↓
Sommaire
↓
Exercices regroupés par ateliers

---

### Atelier autonome
Le README n'est pas imprimé.
Seul l'exercice est exporté.

---

## Préparation d'impression

Au chargement de "/STAGE/print/" une fenêtre de préparation apparaît.  
Caractéristiques :

- déplaçable ;
- mise à jour immédiate du document ;
- masquage automatique des options inutiles.

---

## Variables imprimables
Les variables modifiables du stage peuvent être imprimées :

- avec leur valeur par défaut ;
- avec leur valeur personnalisée.

---

## Notes imprimables
Les notes sont injectées en tête d'exercice.
Les exercices sans note n'affichent aucun bloc inutile.
L'utilisateur peut inclure ou exclure les notes personnelles avant impression.

---

## Métadonnées d'édition
Une page de garde affiche :

- date d'édition ;
- version Git ;
- auteur de la dernière révision.

---

## Sauts de page

Les marqueurs d'exercice utilisent désormais : <!-- IBLAB_PAGE_BREAK|aXeY -->

et deviennent : <div class="ibPageBreak" id="aXeY"></div> dans le DOM.

Ces ancres sont utilisées :
- pour la navigation dans les documents imprimés ;
- pour les liens du sommaire imprimé ;
- pour l'identification des exercices lors de la préparation du document.

La pagination automatique du sommaire a fait l'objet de plusieurs expérimentations
(offsetTop, beforeprint, afterprint, compteurs CSS, Paged.js, Vivliostyle).
Aucune solution simple, robuste et compatible avec l'architecture actuelle n'a été retenue à ce jour.
Le moteur ne cherche donc pas actuellement à récupérer les numéros de page réels produits par Chromium.
---

# Principes d'architecture

Toujours privilégier :

Python
    ↓
structure + métadonnées

JavaScript
    ↓
comportement

CSS
    ↓
apparence

Éviter autant que possible le mélange des responsabilités.
Avant de créer un nouveau mécanisme :

- vérifier qu'un mécanisme similaire n'existe pas déjà ;
- rechercher en priorité les composants, styles ou mécanismes déjà présents dans ibLab avant de créer un nouveau composant ;
- privilégier l'extension de l'existant ;
- éviter les systèmes parallèles.

---

# Principes UX

- Interface volontairement simple.
- Public principal : stagiaires et formateurs.
- Fonctionnalités discrètes.
- Sauvegarde automatique des données importantes.
- Interactions compréhensibles sans documentation.
- Les contraintes techniques doivent être masquées aux rédacteurs et aux apprenants.
- Lorsqu'un élément de l'interface doit être expliqué dans la documentation ou dans l'aide, privilégier la réutilisation des composants HTML/CSS existants plutôt que des captures d'écran.
- Les démonstrations présentes dans l'aide doivent suivre automatiquement les thèmes graphiques.
- L'aide intégrée doit privilégier : composants réels ==> composants dérivés ==> illustrations spécifiques
- La documentation utilisateur doit expliquer l'usage et les bénéfices d'une fonctionnalité avant d'en détailler le fonctionnement.

---

# Méthode de travail

- Analyser l'architecture existante avant de proposer du code.
- Privilégier les évolutions incrémentales.
- Préférer plusieurs petits commits validables à une grosse évolution.
- Lorsqu'un code est fourni dans ce chat, toujours échapper les caractères `&lt;` afin d'éviter qu'ils soient interprétés par l'interface web.
- En cas de doute sur un fichier, demander son contenu avant de proposer une évolution importante.

# Environnement local

Le projet peut désormais être exécuté localement sous Windows.
Outils installés :

- GitHub Desktop
- VS Code
- Python

Le script **start-ibCAN.ps1** permet de :

- créer automatiquement l'environnement Python (.venv) s'il n'existe pas ;
- installer les dépendances définies dans requirements.txt ;
- générer les fichiers print.md ;
- lancer mkdocs serve;
- Ouvrir le navigateur pour test en local.

Le cycle de travail peut désormais être enligne (vscodeweb) ou VS Code ==> Ctrl+S ==> Actualisation du navigateur local ==> Validation visuelle locale ==> Commit Git ==> Push GitHub  
En local, les évolutions visuelles doivent être testées en priorité sur l'environnement local avant publication via GitHub Pages.

Dans mon message suivant, je vais maintenant t'indiquer l'objet de notre session de travail du jour.