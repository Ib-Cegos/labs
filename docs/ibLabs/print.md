---
title: Guide du concepteur d'ateliers ibLab
editionDate: 01/08/2026
gitVersion: 1e78e08
editorName: Renaud
---

# Guide du concepteur d'ateliers ibLab

Bienvenue dans le guide de conception des ateliers ibLab.

Cette documentation s'adresse aux personnes chargées de créer, maintenir ou faire évoluer des ateliers diffusés sur la plateforme ibLab.

L'objectif de ce guide est de vous permettre de concevoir des ateliers homogènes, simples à maintenir et agréables à utiliser pour les stagiaires.

## À propos d'ibLab

ibLab est une plateforme de diffusion d'ateliers pédagogiques interactifs.

Contrairement à une simple documentation, la plateforme fournit plusieurs mécanismes permettant de personnaliser l'expérience du stagiaire :

- personnalisation des valeurs utilisées dans les exercices ;
- mémorisation automatique de la progression ;
- sauvegarde et restauration des données ;
- copie facilitée des commandes ;
- navigation guidée entre les exercices.

Le concepteur d'atelier n'a pas besoin de développer de fonctionnalités particulières pour bénéficier de ces mécanismes : il lui suffit de respecter les conventions présentées dans ce guide.

## Objectifs du guide

À l'issue de cette lecture, vous serez capable de :

1. Structurer correctement un atelier.
2. Déclarer et utiliser des variables.
3. Comprendre le rôle du panneau Paramètres.
4. Tirer parti du système de sauvegarde.
5. Appliquer les bonnes pratiques de rédaction.
6. Concevoir des ateliers plus génériques et plus facilement réutilisables.

Commençons par découvrir ce que voit concrètement un stagiaire lorsqu'il utilise la plateforme.

## Sommaire

- Atelier 1
    - <a class='ibPrintTocLink' href='#a1e1'>Exercice 1 - Présentation générale d'ibLab</a>
    - <a class='ibPrintTocLink' href='#a1e2'>Exercice 2 - Ce que voit le stagiaire</a>
    - <a class='ibPrintTocLink' href='#a1e3'>Exercice 3 - Structure d'un atelier</a>
- Atelier 2
    - <a class='ibPrintTocLink' href='#a2e1'>Exercice 1 - Déclaration des variables</a>
    - <a class='ibPrintTocLink' href='#a2e2'>Exercice 2 - Variables visibles et variables internes</a>
- Atelier 3
    - <a class='ibPrintTocLink' href='#a3e1'>Exercice 1 - Utilisation des variables dans les contenus</a>
    - <a class='ibPrintTocLink' href='#a3e2'>Exercice 2 - Bonnes pratiques d'utilisation des variables</a>
- Atelier 4
    - <a class='ibPrintTocLink' href='#a4e1'>Exercice 1 - Le panneau Paramètres</a>
    - <a class='ibPrintTocLink' href='#a4e2'>Exercice 2 - Les variables dans le panneau Paramètres</a>
    - <a class='ibPrintTocLink' href='#a4e3'>Exercice 3 - Exporter mes données</a>
    - <a class='ibPrintTocLink' href='#a4e4'>Exercice 4 - Importer ma sauvegarde</a>
- Atelier 6
    - <a class='ibPrintTocLink' href='#a6e1'>Exercice 1 - Checklists et suivi de progression</a>
- Atelier 7
    - <a class='ibPrintTocLink' href='#a7e1'>Exercice 1 - Blocs de code et copie des commandes</a>
- Atelier 8
    - <a class='ibPrintTocLink' href='#a8e1'>Exercice 1 - Images et illustrations</a>
    - <a class='ibPrintTocLink' href='#a8e2'>Exercice 2 - Maintenance des illustrations</a>
- Atelier 9
    - <a class='ibPrintTocLink' href='#a9e1'>Exercice 1 - Atelier complet commenté - Présentation</a>
    - <a class='ibPrintTocLink' href='#a9e2'>Exercice 2 - Atelier complet commenté - Le README</a>
    - <a class='ibPrintTocLink' href='#a9e3'>Exercice 3 - Atelier complet commenté - Premier exercice</a>
    - <a class='ibPrintTocLink' href='#a9e4'>Exercice 4 - Atelier complet commenté - Utilisation dans les commandes</a>
    - <a class='ibPrintTocLink' href='#a9e5'>Exercice 5 - Atelier complet commenté - Vue du stagiaire</a>
    - <a class='ibPrintTocLink' href='#a9e6'>Exercice 6 - Atelier complet commenté - Ce qu'il faut retenir</a>
- Atelier 10
    - <a class='ibPrintTocLink' href='#a10e1'>Exercice 1 - FAQ - Variables</a>
    - <a class='ibPrintTocLink' href='#a10e2'>Exercice 2 - FAQ - Panneau Paramètres</a>
    - <a class='ibPrintTocLink' href='#a10e3'>Exercice 3 - FAQ - Sauvegarde et restauration</a>
    - <a class='ibPrintTocLink' href='#a10e4'>Exercice 4 - FAQ - Sauvegarde et restauration</a>
    - <a class='ibPrintTocLink' href='#a10e5'>Exercice 5 - FAQ - Conception d'ateliers</a>

<!-- IBLAB_PAGE_BREAK|a1e1 --># Atelier 1 - 

## Exercice 1 - Présentation générale d'ibLab

<div class="ibPrintNotes" data-exercise="a1e1" hidden></div>

#### Une plateforme pensée pour l'apprentissage

ibLab est une plateforme de diffusion d'ateliers pratiques.

Elle a été conçue pour répondre à plusieurs problématiques fréquemment rencontrées lors des formations techniques :

- les stagiaires ne disposent pas tous du même environnement ;
- certaines informations changent d'un laboratoire à l'autre ;
- les exercices sont souvent interrompus puis repris plus tard ;
- les erreurs de copier-coller ralentissent inutilement les manipulations ;
- les longues documentations sont difficiles à suivre.

La plateforme apporte plusieurs réponses à ces problématiques grâce à des mécanismes intégrés que nous détaillerons dans les chapitres suivants.

#### Une documentation interactive

Un atelier ibLab n'est pas une simple suite de pages Markdown.

La plateforme enrichit automatiquement les contenus en y ajoutant :

- un système de navigation ;
- des boutons de copie ;
- des variables dynamiques ;
- des checklists persistantes ;
- un panneau de paramètres ;
- des mécanismes de sauvegarde.

Ces fonctionnalités sont directement prises en charge par la plateforme.

Le rôle du rédacteur consiste donc à produire le contenu pédagogique et non à développer des fonctionnalités.

#### Principes de conception

Lorsque vous rédigez un atelier, gardez les objectifs suivants à l'esprit :

- limiter les manipulations inutiles ;
- réduire les erreurs de saisie ;
- rendre l'atelier réutilisable ;
- faciliter la reprise après interruption ;
- fournir des consignes simples et précises.

Les chapitres suivants expliquent comment tirer parti des outils mis à disposition pour atteindre ces objectifs.

<!-- IBLAB_PAGE_BREAK|a1e2 --># Atelier 1 - 

## Exercice 2 - Ce que voit le stagiaire

<div class="ibPrintNotes" data-exercise="a1e2" hidden></div>

Comprendre l'expérience utilisateur du stagiaire est essentiel pour concevoir des ateliers efficaces.

Avant de rédiger un exercice, prenez quelques minutes pour vous mettre à sa place.

#### Navigation dans l'atelier

Lorsqu'un stagiaire ouvre un atelier, il dispose généralement :

- d'une page d'accueil ;
- d'un sommaire ;
- de plusieurs exercices ;
- d'une navigation précédent / suivant.

L'objectif est de permettre au stagiaire d'avancer naturellement dans le parcours sans avoir à rechercher lui-même la suite des manipulations.

#### Panneau Paramètres

Le stagiaire dispose également d'un panneau Paramètres.

Ce panneau est accessible depuis le pied de page de l'atelier.

Il lui permet notamment :

- de visualiser certaines variables ;
- de modifier leurs valeurs ;
- d'exporter ses données ;
- d'importer une sauvegarde.

Aucun développement particulier n'est nécessaire pour faire apparaître ce panneau : il est généré automatiquement par la plateforme.

#### Sauvegarde des données

Le stagiaire peut enregistrer son environnement de travail sous la forme d'un fichier de sauvegarde.

Cette fonctionnalité est particulièrement utile lorsque :

- une formation est étalée sur plusieurs jours ;
- un atelier est interrompu ;
- les exercices sont réalisés à domicile après la formation.

#### Checklists

La plateforme mémorise la progression du stagiaire.

Les étapes réalisées peuvent donc être retrouvées lors d'une visite ultérieure.

Cette fonctionnalité offre un véritable confort de travail, notamment dans les ateliers longs comportant de nombreuses manipulations.

#### Boutons de copie

Les blocs de code bénéficient automatiquement d'un bouton de copie.

Cela réduit considérablement les erreurs de saisie et accélère les travaux pratiques.

En tant que rédacteur, il est donc recommandé de fournir des commandes complètes et directement exploitables.

<!-- IBLAB_PAGE_BREAK|a1e3 --># Atelier 1 - 

## Exercice 3 - Structure d'un atelier

<div class="ibPrintNotes" data-exercise="a1e3" hidden></div>

La qualité d'un atelier dépend autant de son contenu que de son organisation.

Une structure cohérente facilite la navigation, la maintenance et la compréhension du parcours pédagogique.

#### Organisation générale

Un atelier est généralement structuré sous la forme :

```text
monatelier/
│
├── README.md
├── a1e1.md
├── a1e2.md
├── a1e3.md
├── a2e1.md
└── ...
```

#### Le rôle du README.md

Le fichier README.md constitue le point d'entrée de l'atelier.

Il contient généralement :

- une présentation ;
- un sommaire ;
- les variables utilisées dans l'atelier ;
- diverses informations globales.

Le README est également l'endroit où sont déclarées les variables utilisées dans les différents exercices.

#### Les fichiers d'exercices

Les fichiers suivants contiennent les différents travaux pratiques.

Exemple :

```text
a1e1.md
a1e2.md
a1e3.md
```

Chaque exercice doit idéalement traiter une action ou un groupe d'actions cohérent.

#### Bonnes pratiques

Préférez :

- plusieurs exercices courts ;
- des objectifs clairement identifiés ;
- une progression logique.

Évitez :

- les pages excessivement longues ;
- les changements de sujet brusques ;
- les exercices regroupant des manipulations sans lien entre elles.

Un exercice bien découpé est généralement plus facile à maintenir et plus confortable à suivre pour le stagiaire.

<!-- IBLAB_PAGE_BREAK|a2e1 --># Atelier 2 - 

## Exercice 1 - Déclaration des variables

<div class="ibPrintNotes" data-exercise="a2e1" hidden></div>

#### Pourquoi utiliser des variables ?

Lorsqu'un atelier est conçu pour être réutilisé, certaines informations changent régulièrement :

- nom de l'entreprise ;
- nom de domaine ;
- nom du serveur ;
- URL d'une application ;
- identifiant d'un client ;
- nom d'un environnement ;
- etc.

Si ces valeurs sont directement écrites dans les exercices, chaque nouveau contexte nécessite une modification du contenu.

Cette approche présente plusieurs inconvénients :

- risque d'oubli ;
- erreurs de cohérence ;
- temps de maintenance important ;
- duplication inutile de contenu.

Pour résoudre ce problème, ibLab permet de déclarer des variables.

Les exercices utilisent alors ces variables au lieu de valeurs fixes.

#### Emplacement des variables

Les variables sont déclarées dans l'en-tête YAML du fichier `README.md`.

Exemple :

```yaml
---
Variables:

  nomEntreprise:
    lib: Nom de l'entreprise
    defaut: Contoso
    aide: Nom utilisé dans les exercices de cet atelier.

  domaineClient:
    lib: Domaine principal
    defaut: contoso.local
    aide: Domaine principal utilisé dans le laboratoire.

---
```

Toutes les pages de l'atelier pourront ensuite utiliser ces variables.

#### Les attributs disponibles

##### lib

L'attribut `lib` correspond au libellé affiché dans le panneau Paramètres.

Exemple :

```yaml
lib: Nom de l'entreprise
```

Le stagiaire verra ce texte lorsqu'il ouvrira le panneau Paramètres.

##### defaut

L'attribut `defaut` indique la valeur initiale de la variable.

Exemple :

```yaml
defaut: Contoso
```

Cette valeur sera utilisée tant que le stagiaire n'en aura pas fourni une autre.

##### aide

L'attribut `aide` permet d'expliquer au stagiaire où trouver la valeur attendue.

Exemple :

```yaml
aide: Nom utilisé dans l'environnement de démonstration.
```

Cette information apparaît sous la zone de saisie dans le panneau Paramètres.

#### Exemple complet

```yaml
---
Variables:

  nomEntreprise:
    lib: Nom de l'entreprise
    defaut: Contoso
    aide: Nom utilisé dans les exercices.

  urlApplication:
    lib: URL de l'application
    defaut: https://app.contoso.local
    aide: URL fournie dans la documentation du laboratoire.

---
```

Cette déclaration suffit à rendre les variables disponibles dans l'ensemble de l'atelier.

<!-- IBLAB_PAGE_BREAK|a2e2 --># Atelier 2 - 

## Exercice 2 - Variables visibles et variables internes

<div class="ibPrintNotes" data-exercise="a2e2" hidden></div>

Toutes les variables n'ont pas vocation à être modifiées par le stagiaire.

Certaines sont destinées à être renseignées dans le panneau Paramètres.

D'autres servent uniquement au fonctionnement ou à l'organisation de l'atelier.

#### Variables visibles

Une variable est considérée comme visible lorsqu'elle possède un attribut :

```yaml
lib:
```

Exemple :

```yaml
nomEntreprise:
  lib: Nom de l'entreprise
  defaut: Contoso
```

Cette variable :

- apparaît dans le panneau Paramètres ;
- peut être modifiée par le stagiaire ;
- peut être utilisée dans les exercices.

#### Variables internes

Une variable qui ne possède pas l'attribut `lib` est considérée comme interne.

Exemple :

```yaml
codeAtelier:
  defaut: monatelier
```

Cette variable :

- n'apparaît pas dans le panneau Paramètres ;
- est tout de même initialisée automatiquement ;
- peut être utilisée dans les exercices.

#### Pourquoi utiliser des variables internes ?

Les variables internes permettent notamment de :

- stocker un identifiant d'atelier ;
- mémoriser un paramètre technique ;
- préparer une évolution future ;
- centraliser certaines informations utilisées dans plusieurs pages.

#### Exemple

```yaml
Variables:

  nomEntreprise:
    lib: Nom de l'entreprise
    defaut: Contoso
    aide: Nom utilisé dans les exercices.

  codeAtelier:
    defaut: demo001

  versionSupport:
    defaut: v2
```

Dans cet exemple :

- `nomEntreprise` sera visible dans le panneau Paramètres ;
- `codeAtelier` restera invisible ;
- `versionSupport` restera invisible.

Toutes les variables restent néanmoins utilisables dans les contenus de l'atelier.

#### Recommandation

N'utilisez une variable visible que lorsqu'une modification par le stagiaire présente un intérêt pédagogique.

Si une valeur n'a pas vocation à être modifiée durant l'atelier, préférez une variable interne.

<!-- IBLAB_PAGE_BREAK|a3e1 --># Atelier 3 - 

## Exercice 1 - Utilisation des variables dans les contenus

<div class="ibPrintNotes" data-exercise="a3e1" hidden></div>

Déclarer une variable ne suffit pas.

Pour qu'elle soit utile, elle doit être utilisée dans les exercices.

#### Syntaxe

Une variable s'utilise entre crochets :

```markdown
[nomEntreprise]
```

La plateforme remplacera automatiquement cette expression par la valeur courante de la variable.

#### Exemple simple

Si le README contient :

```yaml
nomEntreprise:
  lib: Nom de l'entreprise
  defaut: Contoso
```

Alors :

```markdown
Bienvenue dans l'environnement de [nomEntreprise].
```

sera affiché sous la forme :

```text
Bienvenue dans l'environnement de Contoso.
```

#### Exemple dans une phrase

```markdown
Connectez-vous au portail de [nomEntreprise].
```

#### Exemple dans une adresse

```markdown
Serveur principal :

srv01.[domaineClient]
```

#### Exemple dans un tableau

| Élément | Valeur |
|----------|----------|
| Société | [nomEntreprise] |
| Domaine | [domaineClient] |

#### Exemple dans un bloc de code

```powershell
ping srv01.[domaineClient]
```

Les variables peuvent être utilisées dans les mêmes contextes que du texte classique.

#### Mise à jour dynamique

Lorsqu'un stagiaire modifie une variable :

```text
Contoso
```

pour la remplacer par :

```text
Fabrikam
```

la modification est immédiatement visible dans l'ensemble de l'atelier.

Le rédacteur n'a aucune action particulière à réaliser pour obtenir ce comportement.

<!-- IBLAB_PAGE_BREAK|a3e2 --># Atelier 3 - 

## Exercice 2 - Bonnes pratiques d'utilisation des variables

<div class="ibPrintNotes" data-exercise="a3e2" hidden></div>

Les variables constituent l'un des mécanismes les plus importants d'ibLab.

Une utilisation judicieuse facilite grandement la maintenance des ateliers.

#### Utiliser des variables pour les valeurs dépendant du contexte

Préférez :

```markdown
Bienvenue dans l'environnement de [nomEntreprise].
```

à :

```markdown
Bienvenue dans l'environnement de Contoso.
```

#### Utiliser des noms explicites

Préférez :

```yaml
nomEntreprise
```

à :

```yaml
var1
```

ou :

```yaml
x
```

Un nom clair facilite la compréhension du contenu.

#### Fournir une aide utile

Préférez :

```yaml
aide: Nom affiché dans votre environnement.
```

à :

```yaml
aide: Valeur à saisir.
```

Le but du texte d'aide est d'expliquer où trouver l'information.

#### Centraliser les informations

Lorsqu'une même valeur est utilisée plusieurs fois dans un atelier, déclarez-la sous forme de variable.

Cela évite les incohérences lors des modifications ultérieures.

#### Éviter les variables inutiles

Toutes les informations ne méritent pas forcément une variable.

Par exemple :

```text
Windows
```

ou :

```text
Microsoft Edge
```

n'ont généralement pas besoin d'être transformés en variables.

Réservez les variables aux informations susceptibles de changer d'une exécution de l'atelier à l'autre.

#### Être cohérent

Choisissez une convention de nommage et respectez-la.

Exemple :

```yaml
nomEntreprise
domaineClient
urlApplication
```

Une convention cohérente améliore grandement la lisibilité du README.

<!-- IBLAB_PAGE_BREAK|a4e1 --># Atelier 4 - 

## Exercice 1 - Le panneau Paramètres

<div class="ibPrintNotes" data-exercise="a4e1" hidden></div>

#### Présentation générale

Le panneau Paramètres est accessible depuis le pied de page de l'atelier.

Il constitue le point central permettant au stagiaire de gérer les informations personnelles utilisées durant le laboratoire.

Son contenu est généré automatiquement à partir des variables déclarées par le concepteur de l'atelier.

Aucun développement particulier n'est nécessaire pour faire apparaître ce panneau.

#### Que contient le panneau ?

Selon l'atelier, le panneau peut contenir :

- des variables modifiables ;
- des informations de personnalisation ;
- des fonctions de sauvegarde ;
- des fonctions de restauration.

#### À quoi sert-il ?

Le panneau Paramètres permet notamment :

- d'éviter de ressaisir plusieurs fois les mêmes informations ;
- d'adapter le contenu d'un atelier à un environnement particulier ;
- de conserver des informations entre plusieurs sessions de travail.

Grâce à ce mécanisme, un même atelier peut être utilisé dans plusieurs laboratoires différents sans nécessiter de modification de son contenu.

#### Comportement

Lorsqu'un stagiaire modifie une variable :

```text
Contoso
```

par :

```text
Fabrikam
```

la nouvelle valeur est immédiatement prise en compte dans l'ensemble de l'atelier.

Les exercices affichent alors automatiquement la nouvelle valeur.

Le stagiaire n'a pas besoin de recharger la page ni d'effectuer d'action particulière.

#### Ce que doit savoir le formateur

Le formateur doit retenir que le panneau Paramètres constitue l'endroit normal où le stagiaire doit renseigner les informations propres à son environnement.

Il est généralement inutile de demander au stagiaire de modifier manuellement le contenu des exercices.

<!-- IBLAB_PAGE_BREAK|a4e2 --># Atelier 4 - 

## Exercice 2 - Les variables dans le panneau Paramètres

<div class="ibPrintNotes" data-exercise="a4e2" hidden></div>

#### Comment les variables apparaissent-elles ?

Chaque variable disposant d'un attribut :

```yaml
lib:
```

est automatiquement affichée dans le panneau Paramètres.

Exemple :

```yaml
Variables:

  nomEntreprise:
    lib: Nom de l'entreprise
    defaut: Contoso
    aide: Nom utilisé dans les exercices.
```

Le stagiaire verra alors :

```text
Nom de l'entreprise

[ Contoso ]
```

#### Modifier une valeur

Le stagiaire peut librement modifier les variables affichées.

Exemple :

```text
Contoso
```

peut devenir :

```text
Adventure Works
```

ou :

```text
Fabrikam
```

selon le contexte du laboratoire.

#### Sauvegarde automatique

Toute modification est automatiquement enregistrée.

Le stagiaire n'a pas besoin :

- de cliquer sur un bouton Enregistrer ;
- de valider la modification ;
- de recharger la page.

#### Mise à jour des exercices

Les changements sont immédiatement visibles dans les contenus utilisant la variable.

Exemple :

```markdown
Bienvenue dans l'environnement de [nomEntreprise].
```

sera automatiquement mis à jour après modification.

#### Questions fréquemment posées

##### Les autres stagiaires voient-ils mes modifications ?

Non.

Les paramètres sont enregistrés localement dans le navigateur utilisé par le stagiaire.

##### Vais-je perdre mes modifications lorsque je ferme le navigateur ?

Non.

Les informations sont conservées et automatiquement restaurées lors d'une visite ultérieure.

<!-- IBLAB_PAGE_BREAK|a4e3 --># Atelier 4 - 

## Exercice 3 - Exporter mes données

<div class="ibPrintNotes" data-exercise="a4e3" hidden></div>

#### Pourquoi exporter ses données ?

Au fil de sa progression, le stagiaire peut :

- renseigner des variables ;
- modifier des paramètres ;
- enregistrer sa progression.

Le bouton :

```text
Exporter mes données
```

permet de conserver ces informations sous forme de fichier.

#### Quand utiliser cette fonctionnalité ?

Cette fonction est particulièrement utile lorsque :

- une formation est répartie sur plusieurs jours ;
- le stagiaire change d'ordinateur ;
- l'environnement de laboratoire va être réinitialisé ;
- le stagiaire souhaite conserver une sauvegarde personnelle.

#### Procédure

Ouvrir le panneau Paramètres.

Cliquer sur :

```text
Exporter mes données
```

La plateforme génère alors un fichier au format JSON.

Le stagiaire peut conserver ce fichier dans un emplacement sûr.

#### Ce que doit savoir le formateur

Cette fonctionnalité ne remplace pas les sauvegardes du laboratoire.

Elle permet uniquement de conserver les informations utilisées par la plateforme.

En cas de doute, il est recommandé d'encourager les stagiaires à réaliser régulièrement une exportation.

<!-- IBLAB_PAGE_BREAK|a4e4 --># Atelier 4 - 

## Exercice 4 - Importer ma sauvegarde

<div class="ibPrintNotes" data-exercise="a4e4" hidden></div>

#### Principe

Le bouton :

```text
Importer ma sauvegarde
```

permet de restaurer les informations précédemment exportées.

Cette fonctionnalité est généralement utilisée lorsqu'un stagiaire :

- reprend une formation interrompue ;
- change de poste de travail ;
- souhaite récupérer un état antérieur.

#### Procédure

Ouvrir le panneau Paramètres.

Cliquer sur :

```text
Importer ma sauvegarde
```

Sélectionner ensuite le fichier JSON précédemment exporté.

La plateforme restaure automatiquement les informations contenues dans ce fichier.

#### Effet de la restauration

Après importation :

- les variables sont restaurées ;
- les paramètres sont restaurés ;
- les données précédemment enregistrées peuvent être remplacées.

Le stagiaire retrouve ainsi l'environnement qu'il avait enregistré.

#### Questions fréquemment posées

##### Puis-je restaurer une sauvegarde provenant d'un autre atelier ?

Ce n'est généralement pas recommandé.

Les sauvegardes sont destinées à être utilisées avec l'atelier qui les a générées.

##### La restauration modifie-t-elle les fichiers du laboratoire ?

Non.

La restauration agit uniquement sur les données utilisées par la plateforme ibLab.

Elle ne modifie jamais les ressources du laboratoire lui-même.

<!-- IBLAB_PAGE_BREAK|a6e1 --># Atelier 6 - 

## Exercice 1 - Checklists et suivi de progression

<div class="ibPrintNotes" data-exercise="a6e1" hidden></div>

L'un des objectifs d'ibLab est de permettre aux stagiaires de reprendre facilement un atelier interrompu.

Pour cela, la plateforme mémorise automatiquement leur progression.

#### Pourquoi cette fonctionnalité ?

Lors d'un atelier technique, il est fréquent que :

- un exercice soit interrompu ;
- une journée de formation se termine avant la fin du laboratoire ;
- un stagiaire souhaite reprendre un travail plusieurs jours plus tard.

Sans mécanisme de mémorisation, le stagiaire doit retrouver seul son niveau d'avancement.

ibLab facilite cette reprise grâce à un système de suivi automatique.

#### Ce que voit le stagiaire

Lorsqu'un exercice comporte plusieurs étapes, la plateforme permet de mémoriser les actions déjà réalisées.

Le stagiaire peut ainsi reprendre son travail plus facilement lors d'une visite ultérieure.

#### Restauration automatique

La progression est automatiquement restaurée lors du rechargement de la page.

Aucune action particulière n'est nécessaire.

Le stagiaire retrouve ainsi son atelier dans un état proche de celui dans lequel il l'avait laissé.

#### Ce que doit savoir le concepteur

Le mécanisme est entièrement pris en charge par la plateforme.

Aucune configuration particulière n'est nécessaire dans les exercices.

#### Ce que doit savoir le formateur

En cas d'interruption d'un atelier, il est possible de demander au stagiaire de revenir directement sur le même exercice.

La plateforme se charge de restaurer automatiquement sa progression.

<!-- IBLAB_PAGE_BREAK|a7e1 --># Atelier 7 - 

## Exercice 1 - Blocs de code et copie des commandes

<div class="ibPrintNotes" data-exercise="a7e1" hidden></div>

Les ateliers techniques comportent fréquemment des commandes, scripts ou extraits de configuration.

Pour faciliter leur utilisation, ibLab ajoute automatiquement un bouton de copie aux blocs de code.

#### Pourquoi utiliser les blocs de code ?

Les blocs de code permettent :

- d'améliorer la lisibilité ;
- de distinguer clairement les commandes des explications ;
- de réduire les erreurs de saisie.

Exemple :

```powershell
Get-Process
```

#### Copie simplifiée

Le stagiaire peut copier le contenu du bloc en un clic.

Cette fonctionnalité limite considérablement les erreurs liées :

- aux fautes de frappe ;
- aux oublis ;
- aux sélections incomplètes.

#### Bonnes pratiques

Préférez :

```powershell
Get-Process
```

à :

```text
Tapez la commande Get-Process dans PowerShell.
```

La séparation entre explications et commandes sera plus claire.

#### Fournir des commandes complètes

Lorsque cela est possible, fournissez directement la commande complète que le stagiaire devra exécuter.

Évitez les fragments nécessitant de nombreuses modifications manuelles.

#### Combiner avec les variables

Les blocs de code peuvent utiliser les variables de l'atelier.

Exemple :

```powershell
ping srv01.[nomEntreprise]
```

Le contenu sera automatiquement adapté aux paramètres du stagiaire.

<!-- IBLAB_PAGE_BREAK|a8e1 --># Atelier 8 - 

## Exercice 1 - Images et illustrations

<div class="ibPrintNotes" data-exercise="a8e1" hidden></div>

Les images constituent un excellent moyen de guider un stagiaire lorsqu'elles sont utilisées à bon escient.

Toutefois, une utilisation excessive peut nuire à la lisibilité d'un atelier.

#### Quand utiliser une image ?

Une image est particulièrement utile lorsque :

- une interface doit être localisée rapidement ;
- plusieurs options similaires existent ;
- une manipulation visuelle est difficile à décrire.

#### Quand éviter une image ?

Une image est souvent inutile lorsque :

- une simple phrase suffit ;
- l'information est évidente ;
- la capture risque d'évoluer fréquemment.

#### Préférer la simplicité

Une capture d'écran doit mettre en évidence l'information pertinente.

Évitez :

- les captures trop grandes ;
- les interfaces complètes lorsque seule une zone est utile ;
- les captures obsolètes.

#### Cohérence

Essayez de conserver :

- un style homogène ;
- des tailles similaires ;
- des niveaux de zoom cohérents.

Cela améliore l'expérience de lecture et donne une impression de professionnalisme.

<!-- IBLAB_PAGE_BREAK|a8e2 --># Atelier 8 - 

## Exercice 2 - Maintenance des illustrations

<div class="ibPrintNotes" data-exercise="a8e2" hidden></div>

Les interfaces évoluent régulièrement.

Une capture pertinente aujourd'hui peut devenir trompeuse quelques mois plus tard.

#### Vérifier régulièrement les images

Lors de la maintenance d'un atelier :

- vérifier les captures ;
- vérifier les intitulés ;
- vérifier les menus ;
- vérifier les icônes.

#### Limiter les dépendances

Plus une capture contient d'éléments de contexte, plus elle risque de devenir obsolète.

Privilégiez des captures ciblées.

#### Utiliser le texte lorsque c'est possible

Une bonne description textuelle vieillit souvent mieux qu'une capture d'écran.

Les images doivent compléter le texte et non s'y substituer.

<!-- IBLAB_PAGE_BREAK|a9e1 --># Atelier 9 - 

## Exercice 1 - Atelier complet commenté - Présentation

<div class="ibPrintNotes" data-exercise="a9e1" hidden></div>

Les chapitres précédents ont présenté individuellement les principales fonctionnalités de la plateforme.

Nous allons maintenant étudier un atelier complet.

L'objectif n'est pas de reproduire un atelier réel mais de présenter, dans un exemple volontairement simple, les mécanismes utilisés au quotidien par les concepteurs.

Nous allons analyser :

- le fichier README.md ;
- les variables ;
- un exercice ;
- l'utilisation des variables dans les contenus ;
- le rendu obtenu pour le stagiaire.

À la fin de cette lecture, vous disposerez d'un modèle réutilisable pour vos propres ateliers.

<!-- IBLAB_PAGE_BREAK|a9e2 --># Atelier 9 - 

## Exercice 2 - Atelier complet commenté - Le README

<div class="ibPrintNotes" data-exercise="a9e2" hidden></div>

Considérons le fichier suivant :

```yaml
---
Variables:

  nomEntreprise:
    lib: Nom de l'entreprise
    defaut: Contoso
    aide: Nom utilisé dans les exercices.

  domaineClient:
    lib: Domaine principal
    defaut: contoso.local
    aide: Domaine principal utilisé dans le laboratoire.

  codeAtelier:
    defaut: demo
---

### Présentation du laboratoire

{{ sommaire() }}
```

Examinons maintenant chaque partie.

#### Bloc Variables

Le nœud :

```yaml
Variables:
```

contient la liste des variables utilisables dans l'atelier.

Chaque enfant correspond à une variable.

Dans notre exemple :

```yaml
nomEntreprise
```

et :

```yaml
domaineClient
```

sont des variables visibles.

À l'inverse :

```yaml
codeAtelier
```

est une variable interne.

#### L'attribut lib

La présence de l'attribut :

```yaml
lib:
```

indique à la plateforme que la variable doit être affichée dans le panneau Paramètres.

Le stagiaire pourra donc modifier sa valeur.

#### L'attribut defaut

L'attribut :

```yaml
defaut:
```

contient la valeur initiale.

Cette valeur sera utilisée tant que le stagiaire n'en aura pas renseigné une autre.

#### L'attribut aide

L'attribut :

```yaml
aide:
```

permet de guider le stagiaire.

Cette information apparaît directement dans le panneau Paramètres.

#### Les variables internes

Une variable qui ne possède pas d'attribut :

```yaml
lib:
```

reste utilisable dans les exercices mais n'apparaît pas dans le panneau Paramètres.

Cette approche permet de conserver certaines informations techniques sans encombrer l'interface utilisateur.

<!-- IBLAB_PAGE_BREAK|a9e3 --># Atelier 9 - 

## Exercice 3 - Atelier complet commenté - Premier exercice

<div class="ibPrintNotes" data-exercise="a9e3" hidden></div>

Considérons maintenant un exercice utilisant les variables précédemment définies.

```markdown
### Découverte de l'environnement

Bienvenue dans l'environnement de [nomEntreprise].

Le domaine principal utilisé durant ce laboratoire est :

[domaineClient]
```

#### Utilisation des variables

Les variables sont simplement référencées entre crochets.

Exemple :

```markdown
[nomEntreprise]
```

Lors de l'affichage, la plateforme remplace automatiquement cette expression par la valeur courante de la variable.

#### Résultat obtenu

Avec les valeurs par défaut précédentes, le stagiaire verra :

```text
Bienvenue dans l'environnement de Contoso.

Le domaine principal utilisé durant ce laboratoire est :

contoso.local
```

#### Pourquoi utiliser cette approche ?

Supposons que l'atelier soit utilisé dans un nouveau contexte.

Sans variables, le rédacteur devrait modifier manuellement tous les exercices concernés.

Avec les variables, il suffit de modifier une seule valeur dans le panneau Paramètres.

<!-- IBLAB_PAGE_BREAK|a9e4 --># Atelier 9 - 

## Exercice 4 - Atelier complet commenté - Utilisation dans les commandes

<div class="ibPrintNotes" data-exercise="a9e4" hidden></div>

Les variables peuvent également être utilisées dans les blocs de code.

Exemple :

```powershell
ping srv01.[domaineClient]
```

Avec notre configuration précédente, le stagiaire verra :

```powershell
ping srv01.contoso.local
```

#### Pourquoi est-ce utile ?

Cette méthode permet :

- d'éviter les copies de contenu ;
- d'adapter facilement un atelier ;
- de conserver des exemples réalistes.

Elle est particulièrement utile lorsque plusieurs commandes utilisent les mêmes informations.

#### Bonnes pratiques

Préférez :

```powershell
ping srv01.[domaineClient]
```

à :

```powershell
ping srv01.contoso.local
```

Cette approche simplifie considérablement la maintenance de l'atelier.

<!-- IBLAB_PAGE_BREAK|a9e5 --># Atelier 9 - 

## Exercice 5 - Atelier complet commenté - Vue du stagiaire

<div class="ibPrintNotes" data-exercise="a9e5" hidden></div>

À ce stade, le stagiaire dispose :

- d'un atelier fonctionnel ;
- de variables personnalisables ;
- d'un panneau Paramètres ;
- de mécanismes de sauvegarde.

Le stagiaire n'a pas connaissance des mécanismes internes utilisés par la plateforme.

Son expérience se limite à :

1. consulter les exercices ;
2. compléter éventuellement certaines variables ;
3. réaliser les manipulations demandées ;
4. reprendre son travail ultérieurement si nécessaire.

Cette simplicité constitue l'un des objectifs principaux d'ibLab.

La complexité est gérée par la plateforme afin de permettre au rédacteur de se concentrer sur le contenu pédagogique.

<!-- IBLAB_PAGE_BREAK|a9e6 --># Atelier 9 - 

## Exercice 6 - Atelier complet commenté - Ce qu'il faut retenir

<div class="ibPrintNotes" data-exercise="a9e6" hidden></div>

Un atelier ibLab minimal peut être résumé ainsi :

```text
README.md
│
├─ Variables
├─ Présentation
└─ Sommaire

a1e1.md
a1e2.md
a1e3.md
...
```

Les variables sont définies une seule fois.

Elles peuvent ensuite être utilisées dans l'ensemble des exercices.

Les variables possédant un attribut :

```yaml
lib:
```

apparaissent dans le panneau Paramètres.

Les autres restent internes à l'atelier.

Cette approche permet :

- de limiter les duplications ;
- de simplifier la maintenance ;
- de faciliter la personnalisation ;
- de rendre les ateliers plus réutilisables.

Pour la majorité des ateliers, cette structure constitue un excellent point de départ.

<!-- IBLAB_PAGE_BREAK|a10e1 --># Atelier 10 - 

## Exercice 1 - FAQ - Variables

<div class="ibPrintNotes" data-exercise="a10e1" hidden></div>

#### Une variable ne s'affiche pas dans le panneau Paramètres

La cause la plus fréquente est l'absence de l'attribut :

```yaml
lib:
```

Exemple :

```yaml
codeAtelier:
  defaut: demo
```

Cette variable est correctement créée mais elle est considérée comme une variable interne.

Elle ne sera donc pas affichée dans le panneau Paramètres.

Pour rendre une variable visible, ajouter :

```yaml
nomEntreprise:
  lib: Nom de l'entreprise
  defaut: Contoso
```

#### Une variable n'est pas remplacée dans un exercice

Vérifier :

- que la variable est bien déclarée dans le README ;
- que le nom est correctement orthographié ;
- que la syntaxe utilisée est bien :

```markdown
[nomEntreprise]
```

#### Les majuscules sont-elles importantes ?

Non.

Les variables sont insensibles à la casse.

Ces formes sont équivalentes :

```markdown
[nomEntreprise]
[NOMENTREPRISE]
[nomentreprise]
[NomEntreprise]
```

#### Une variable interne peut-elle être utilisée dans les exercices ?

Oui.

Une variable sans attribut :

```yaml
lib:
```

reste utilisable dans l'ensemble de l'atelier.

Elle est simplement cachée dans le panneau Paramètres.

<!-- IBLAB_PAGE_BREAK|a10e2 --># Atelier 10 - 

## Exercice 2 - FAQ - Panneau Paramètres

<div class="ibPrintNotes" data-exercise="a10e2" hidden></div>

#### Les modifications du stagiaire sont-elles partagées avec les autres participants ?

Non.

Les informations sont enregistrées localement dans le navigateur utilisé par le stagiaire.

Chaque participant dispose donc de ses propres valeurs.

#### Les modifications sont-elles enregistrées automatiquement ?

Oui.

Aucun bouton Enregistrer n'est nécessaire.

Les changements sont pris en compte automatiquement.

#### Peut-on masquer une variable au stagiaire ?

Oui.

Il suffit de ne pas fournir d'attribut :

```yaml
lib:
```

dans sa définition.

#### Peut-on afficher une valeur calculée ?

La plateforme gère actuellement des variables déclaratives.

Il est recommandé de stocker directement la valeur souhaitée dans le fichier README.

<!-- IBLAB_PAGE_BREAK|a10e3 --># Atelier 10 - 

## Exercice 3 - FAQ - Sauvegarde et restauration

<div class="ibPrintNotes" data-exercise="a10e3" hidden></div>

#### À quoi sert "Exporter mes données" ?

Cette fonction génère un fichier contenant les données associées à l'atelier.

Elle permet notamment au stagiaire :

- de sauvegarder son environnement ;
- de reprendre son travail plus tard ;
- de changer de poste de travail.

#### À quoi sert "Importer ma sauvegarde" ?

Cette fonction restaure un fichier précédemment exporté.

Les variables et autres données sauvegardées sont alors rechargées automatiquement.

#### Est-il possible de partager une sauvegarde ?

Oui.

Une sauvegarde peut être transmise à un autre utilisateur.

Toutefois, il est généralement préférable que chaque stagiaire utilise sa propre sauvegarde.

#### La restauration modifie-t-elle l'environnement du laboratoire ?

Non.

La restauration intervient uniquement sur les données utilisées par ibLab.

Les ressources du laboratoire ne sont jamais modifiées.

#### Que se passe-t-il lors de l'importation ?

Les données déjà présentes pour l'atelier sont remplacées par celles contenues dans la sauvegarde.

Le stagiaire retrouve ainsi l'état enregistré lors de l'export.

<!-- IBLAB_PAGE_BREAK|a10e4 --># Atelier 10 - 

## Exercice 4 - FAQ - Sauvegarde et restauration

<div class="ibPrintNotes" data-exercise="a10e4" hidden></div>

#### À quoi sert "Exporter mes données" ?

Cette fonction génère un fichier contenant les données associées à l'atelier.

Elle permet notamment au stagiaire :

- de sauvegarder son environnement ;
- de reprendre son travail plus tard ;
- de changer de poste de travail.

#### À quoi sert "Importer ma sauvegarde" ?

Cette fonction restaure un fichier précédemment exporté.

Les variables et autres données sauvegardées sont alors rechargées automatiquement.

#### Est-il possible de partager une sauvegarde ?

Oui.

Une sauvegarde peut être transmise à un autre utilisateur.

Toutefois, il est généralement préférable que chaque stagiaire utilise sa propre sauvegarde.

#### La restauration modifie-t-elle l'environnement du laboratoire ?

Non.

La restauration intervient uniquement sur les données utilisées par ibLab.

Les ressources du laboratoire ne sont jamais modifiées.

#### Que se passe-t-il lors de l'importation ?

Les données déjà présentes pour l'atelier sont remplacées par celles contenues dans la sauvegarde.

Le stagiaire retrouve ainsi l'état enregistré lors de l'export.

<!-- IBLAB_PAGE_BREAK|a10e5 --># Atelier 10 - 

## Exercice 5 - FAQ - Conception d'ateliers

<div class="ibPrintNotes" data-exercise="a10e5" hidden></div>

#### Faut-il systématiquement utiliser des variables ?

Non.

Les variables doivent être réservées aux informations susceptibles de varier selon le contexte.

#### Combien de variables peut contenir un atelier ?

Il n'existe pas de limite pratique pour les usages courants.

Il est néanmoins recommandé de ne présenter au stagiaire que les variables réellement utiles.

#### Peut-on modifier ultérieurement la valeur par défaut d'une variable ?

Oui.

Il suffit de mettre à jour l'attribut :

```yaml
defaut:
```

dans le README de l'atelier.

#### Quelle est la première étape pour créer un nouvel atelier ?

Créer le dossier de l'atelier puis :

```text
README.md
```

et définir les variables nécessaires.

Les exercices peuvent ensuite être ajoutés progressivement.

#### Quelle est la meilleure manière d'apprendre à utiliser ibLab ?

Lire ce guide puis étudier attentivement l'exemple complet présenté dans le chapitre précédent.

La plupart des mécanismes utilisés quotidiennement y sont illustrés.