# Présentation du projet
J'ai développé une application web nommée **ibCAN** (anciennement ibLab) dont l'objectif est d'héberger, enrichir et diffuser des consignes d'ateliers de formation.
Les contenus pédagogiques sont rédigés en Markdown par des formateurs qui ne sont ni développeurs ni spécialistes du web. Le moteur doit donc masquer autant que possible la complexité technique et enrichir automatiquement les contenus générés.

Le dépôt est public : https://github.com/ib-Cegos/labs

Si nécessaire, je peux fournir le contenu complet des fichiers concernés par l'évolution sur laquelle nous travaillons.

---

# Ateliers autonomes
Cas particulier : 1 atelier contenant 1 seul exercice (donc "a1e1.md" uniquement) : Le moteur considère alors qu'il s'agit d'un atelier autonome.  
Conséquences :

- le README reste obligatoire ;
- le README redirige automatiquement vers `a1e1` ;
- la navigation spécifique est masquée ;
- le titre de `a1e1.md` est remplacé par le premier titre du README ;
- l'impression utilise également le titre du README.

---

## Pagination du sommaire du document imprimé
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

# Principes d'architecture
Toujours privilégier :

- Python => structure + métadonnées + génération HTML
- JavaScript => comportement + stockage + interaction utilisateur
- CSS => apparence + thèmes + personnalisation visuelle

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
- privilégier les mécanismes déjà présents dans ibCAN lors du développement du Writer ;
- privilégier les composants réutilisables (modales, stockage, validation, Drag & Drop) ;
- maintenir la compatibilité entre le modèle JSON du Writer et les scripts import/export.

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