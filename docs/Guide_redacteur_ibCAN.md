# Guide du rédacteur ibCAN

## Introduction

ibCAN (Cahier d'Ateliers Numériques) est une plateforme permettant de publier des ateliers de formation rédigés en Markdown.

L'objectif est de permettre à un auteur de se concentrer sur la qualité pédagogique du contenu sans avoir à se préoccuper :

- du HTML ;
- du CSS ;
- du JavaScript ;
- de la navigation ;
- du suivi de progression ;
- de l'impression.

Le moteur ibCAN enrichit automatiquement les contenus pour produire une expérience de lecture interactive et cohérente.

---

# Structure d'un stage

Un stage est représenté par un dossier contenant :

```text
ms102/
├── README.md
├── a1e1.md
├── a1e2.md
├── a2e1.md
└── ...
```

Le dossier contient :

- un fichier README.md ;
- un ou plusieurs exercices nommés `aXeY.md`.

---

# Le fichier README.md

Le fichier README constitue le point d'entrée principal du stage.

Le premier titre devient automatiquement le titre du stage.

Le README peut contenir :

- une introduction ;
- des objectifs pédagogiques ;
- des informations générales ;
- des variables utilisées dans le stage.

Le sommaire du stage est généré automatiquement.

---

# Les exercices

Convention de nommage :

```text
aXeY.md
```

où X = numéro d'atelier et Y = numéro d'exercice.

---

# Métadonnées YAML

```yaml
---
Atelier: Gestion des utilisateurs
Duree: 20
---
```

## Atelier

```yaml
Atelier: Gestion des utilisateurs
```

## Duree

```yaml
Duree: 20
```

---

# Utilisation du Markdown

## Titres

```markdown
# Titre principal
## Sous-titre
### Sous-section
```

## Listes numérotées

```markdown
1. Première étape
2. Deuxième étape
3. Troisième étape
```

## Liens

```markdown
[Microsoft Learn](https://learn.microsoft.com)
```

---

# Tâches interactives

Les listes numérotées sont automatiquement transformées en tâches interactives.

---

# Variables

Déclaration dans le README :

```yaml
Variables:
  MODPassword:
    lib: Mot de passe administrateur
    defaut: P@ssw0rd!
```

Utilisation :

```markdown
Le mot de passe administrateur est : [MODPassword]
```

---

# Blocs de code

Les blocs de code et les codes inline reçoivent automatiquement un bouton de copie.

---

# Illustrations d'exercice

Associer une image portant le même nom que l'exercice :

```text
a1e1.md
a1e1.png
```

Le moteur détecte automatiquement l'illustration.

- panneau Illustration ;
- ouverture dans un onglet dédié ;
- prise en charge de l'impression.

---

# Notes personnelles

Chaque exercice dispose automatiquement d'un espace de notes personnelles.

---

# Impression

Le moteur génère automatiquement :

- le sommaire ;
- les exercices ;
- les variables ;
- les notes ;
- les illustrations.

---

# Bonnes pratiques

- Une action par étape.
- Des titres explicites.
- Des illustrations utiles.
- Utiliser les variables pour les informations réutilisables.

---

# Ce qu'ibCAN génère automatiquement

- le sommaire ;
- la navigation ;
- la progression ;
- les tâches interactives ;
- les panneaux latéraux ;
- les notes personnelles ;
- les boutons de copie ;
- les exports imprimables ;
- les illustrations.
