# Guide du rédacteur ibCAN

## ibCAN du point de vue du rédacteur

ibCAN (Cahier d'Ateliers Numériques) est une plateforme permettant de publier des ateliers de formation stockés en Markdown.
L'objectif est de permettre à un rédacteur de se concentrer sur la qualité pédagogique du contenu sans avoir à se préoccuper :

- du HTML
- du CSS
- du JavaScript
- de la navigation entre les éléments
- du suivi de progression du lecteur
- de l'impression de l'ensemble des exercices.

Le moteur ibCAN enrichit automatiquement les contenus pour produire une expérience de lecture interactive, cohérente et agréable.

## À qui s’adresse ce guide ?

Ce guide accompagne les formateurs et rédacteurs qui utilisent ibCANWriter pour créer ou modifier un stage. Il explique les principales zones de l’éditeur, le format attendu pour organiser les ateliers et exercices, et la manière dont le moteur ibCAN interprète le Markdown.

Le Writer aide à produire le contenu, mais la prévisualisation n’est pas une reproduction parfaite du site publié. Vérifiez toujours le rendu du stage dans ibCAN après publication.

## 1. Ouvrir ou créer un stage

Depuis le catalogue ibCAN :

- **Nouveau stage** ouvre un stage vierge dans le Writer.
- **Modifier** ouvre dans le Writer l’archive du stage correspondant.
- **Modifier un stage** permet de choisir un fichier ZIP ibCAN enregistré sur votre ordinateur.

Le Writer est une application web : pendant l’édition, le modèle du stage et ses ressources sont conservés dans le stockage de votre navigateur, de manière indépendante de la version publiée. Exportez régulièrement une archive ZIP sur votre ordinateur.

## 2. Les zones de l’éditeur

### En-tête du stage

Renseignez les champs :

- **Référence** : identifiant court utilisé pour le stage et son dossier publié ;
- **Titre** : titre lisible du stage ;
- **Auteur** : votre nom affiché comme auteur du stage.

La référence et le titre sont obligatoires pour exporter. Choisissez une référence stable, courte et sans espace, de préférence en minuscules (par exemple `m365-demarrage`).

### Navigation et édition

La colonne de navigation contient l’introduction, les ateliers et leurs exercices. Cliquez sur une entrée pour modifier son contenu dans la zone centrale.

Pour organiser le stage :

- **+ Atelier** ajoute un atelier avec un premier exercice ;
- **+ Exercice** ajoute un exercice à l’atelier sélectionné ;
- faites glisser un atelier ou un exercice dans la navigation pour le déplacer ;
- utilisez les boutons de suppression avec prudence : supprimer un atelier supprime ses exercices ; le dernier atelier ou le dernier exercice d’un atelier ne peut pas être supprimé.

Après un déplacement, les numéros sont recalculés dans l’ordre d’affichage (Les illustrations attachées aux exercices sont renommées avec leur exercice).

### Outils de rédaction

Le bouton **Outils** affiche une barre flottante. Elle permet notamment d’insérer des titres, du gras, de l’italique, du code, des listes, une citation, des liens, des images, des fichiers, des variables et des tableaux. Les commandes **Annuler** et **Rétablir** deviennent également disponibles.

La barre travaille sur la sélection ou sur la ligne où se trouve le curseur. Pour obtenir le résultat voulu, placez le curseur ou sélectionnez le texte avant de choisir une commande.

### Aperçu et export

- **Aperçu** ouvre une autre fenêtre qui affiche le contenu rendu et peut suivre la position de lecture de l’éditeur. Choisissez l'organisation qui vous convient le mieux pour travailler (double écran, onglets multiples...).
- **Exporter** télécharge une archive ZIP de travail. Elle contient toutes les ressources que vous avez utilisées dans le Writer (qu'elles soient ou non utilisées dans le texte de votre document).

Transmettez le ZIP exporté à l'équipe responsable de la publication des stages pour que son contenu soit intégré à l'environnement et que vous puissiez le vérifier.

## 3. Construire un stage lisible

### Introduction

L’entrée **Introduction** a pour objectif de présenter le contexte, les objectifs, les consignes générales et les informations utiles avant de commencer les ateliers du stage. C'est l'adresse de cette page qui devra être fournie aux lecteurs.

Le premier titre de niveau 1 (`#`) est le titre du stage. Dans le Writer, ce titre est géré par le champ **Titre**. Inutile, donc, de le dupliquer dans le texte de l’introduction.

Le bouton **+ Sommaire** insère le marqueur `{{ sommaire() }}` à la position du curseur. Dans le site publié, ibCAN le remplace par la liste des ateliers et exercices. Placez-le là où le sommaire doit apparaître (par exemple entre la présentation du stage et des considérations plus annexes).

### Ateliers et exercices

Un stage est organisé ainsi :

```text
Stage
├── Introduction
├── Atelier 1
│   ├── Exercice 1
│   └── Exercice 2
└── Atelier 2
    └── Exercice 1
```

Chaque exercice doit proposer un objectif clair et une suite d’actions réalisables. Utilisez les champs **Atelier**, **Exercice** et **Durée** au-dessus de la zone de texte pour ses informations structurelles :

- le titre d’atelier est partagé par les exercices d'un même atelier ;
- le titre d’exercice apparaît dans la navigation, les sommaires et en-tête de page d'exercice avec le titre de l'atelier;
- la durée estimée (optionnelle) est exprimée en minutes et sera affichée par ibCAN.

L’ordre des entrées dans la navigation est l’ordre pédagogique.

> Les numéros affichés (`Atelier 2 - Exercice 1`) sont générés à partir de cet ordre ; évitez de faire référence à un exercice uniquement par son numéro dans un texte qui pourrait devenir obsolète après réorganisation.

### Stage autonome

On appellera Atelier ou stage autonome un stage comportant un seul atelier et un seul exercice. Le site redirige alors directement la page d'introduction vers l’exercice et utilise le titre du stage comme titre visible de l’exercice. Cette forme convient à une activité isolée, elle n’est pas adaptée à un parcours nécessitant plusieurs exercices.

## 4. Écrire en Markdown

Le contenu de la zone d’édition est du Markdown. Les commandes de la barre d’outils écrivent ce Markdown pour vous, mais vous pouvez également le saisir directement.

### Titres et paragraphes

Utilisez des lignes vides pour séparer les paragraphes. Dans un exercice, le titre principal est défini par le champ **Exercice** ; utilisez les boutons T1 et T2 pour créer les sections et sous-sections du contenu :

```markdown
## Préparer l’environnement

Expliquez brièvement ce qui doit être prêt avant de commencer.

### Vérifier les accès

Ajoutez ici les précisions nécessaires.
```

Réservez `#` au titre principal géré par le Writer. Le moteur ibCAN ajoute automatiquement les informations d’atelier et d’exercice au titre des pages publiées.

### Mise en forme courante

```markdown
**Texte important en gras**
*Terme à mettre en évidence en italique*
`commande-ou-valeur`
> Conseil ou avertissement à lire avant de continuer.
```

Les blocs de code s’écrivent avec trois accents graves. Vous pouvez préciser le langage après les accents mais cette information n'est pas utilisée, à date par le moteur d'affichage et les deux syntaxes suivantes sont équivalentes:

````markdown
```powershell
Get-MgUser -Top 5
```
````

ou

````markdown
```
Get-MgUser -Top 5
```
````

Dans les pages ibCAN, les blocs de code et les codes intégrés seront accompagnés d’un bouton de copie. N’incluez donc dans un bloc que les caractères que l’apprenant doit réellement recopier.

### Étapes et listes

Une liste numérotée de premier niveau dans un exercice est transformée par ibCAN en tâches cochables. La progression de l’exercice est calculée à partir de ces tâches. Une liste à puces (ou une sous-liste numérotée) reste une liste informative et n’alimente pas la progression.

```markdown
1. Ouvrir le portail d’administration.
2. Sélectionner l’utilisateur indiqué.
3. Vérifier que la modification est visible.
```
Construisez donc votre numérotation pour faciliter aux lecteurs le suivi des actions qu'ils ont réalisées. Pour une énumération sans suivi, préférez les puces :

```markdown
- Un compte disposant des droits nécessaires
- Un navigateur à jour
```

Écrivez une action par étape, commencez par un verbe (essayer de conserver le même temps au long de votre document) et donnez assez de contexte pour que le lecteur sache quoi faire et quel résultat vérifier. Les listes imbriquées ne constituent pas un moyen fiable d’ajouter des tâches de progression : essayez de garder les tâches à un seul niveau et placez les précisions sous forme de paragraphes ou de puces séparées.

### Liens internes et externes

Utilisez l’outil **Lien** pour créer un lien vers un site externe. Lorsque le stage contient plusieurs exercices, l’éditeur propose aussi de choisir un exercice comme destination interne pour faciliter la navigation du lecteur. Il crée automatiquement le lien vers l’exercice sélectionné.

En Markdown, un lien s’écrit :

```markdown
[Consulter la documentation](https://example.org/)
```

Pour un fichier joint au stage, utilisez l’outil **Fichier inclus** : il ajoute un lien vers le dossier de ressources du stage.

### Tableaux

L’outil **Tableau** insère ou modifie un tableau. Le format correspondant est :

```markdown
| Rôle | Accès attendu |
| --- | --- |
| Lecteur | Consultation |
| Administrateur | Modification |
```

Gardez les tableaux simples et lisibles (pensez aux écrans étroits).

## 5. Variables de stage

Le bouton **Variables []** permet de créer et gérer des informations réutilisables dans le stage. Choisissez le type de variable selon la personne qui doit pouvoir modifier sa valeur :

- **modifiable par le lecteur** : à utiliser lorsque la valeur dépend de la personne ou de son environnement (par exemple son nom ou le nom de son entreprise). Le lecteur peut la personnaliser dans le panneau *Paramètres* du site publié ;
- **fixe** : à utiliser lorsque la même information apparaît à plusieurs endroits et que vous, rédacteur, souhaitez pouvoir la mettre à jour facilement. Le lecteur voit cette valeur dans le contenu, mais ne peut pas la modifier.

Par exemple, vous pouvez créer une variable fixe `NomEntreprise` ayant pour valeur `Contoso`, puis écrire `[NomEntreprise]` dans plusieurs consignes. Si le nom de l’entreprise change, vous modifiez la valeur de la variable une seule fois au lieu de corriger chaque consigne. La nouvelle valeur apparaîtra partout où la variable est utilisée après la mise à jour du stage.

Une variable fixe n’est pas cachée : sa valeur est visible par les lecteurs. N’y placez pas de mot de passe ni d’autre information confidentielle.

Insérez une variable dans le texte avec l’outil **Variables** de la barre d’outils. Elle apparaît ensuite dans le Markdown sous la forme `[NomVariable]`.

Exemple :

```text
Connectez-vous avec le compte [UserName] et le mot de passe [UserPassword].
```

Conseils :

- choisissez un nom simple, commençant par une lettre ;
- donnez une valeur par défaut utile et un libellé compréhensible si le lecteur doit pouvoir la modifier ;
- renseignez une aide qui explique où trouver la valeur ;
- utilisez le sélecteur de variables plutôt que de retaper le nom afin d’éviter les fautes ;
- avant de supprimer une variable, vérifiez les occurrences signalées : la suppression de la définition ne réécrit pas automatiquement le texte qui l’emploie.

Le moteur possède aussi la variable système <code>&#91;ResourcesUrl&#93;</code>, utile pour construire un lien vers une ressource du stage. L’outil **Fichier inclus** l’utilise automatiquement.

## 6. Images, illustrations et fichiers

### Illustration d’un exercice

Le bouton **📸** dans l’en-tête d’un exercice associe une illustration à cet exercice. Le fichier d'image est alors ajouté au stage en édition (il sera dans le ZIP exporté) et suit l’exercice lors d’un déplacement. Dans le site publié, il peut apparaître dans le panneau Illustration et être inclus dans l’impression.

Une illustration est différente d’une image insérée dans le corps du texte : elle est attachée à l’exercice et affichée dans un panneau dédié facilement accessible pendant toute la lecture de l'exercice.

> Si vous supprimez une illustration, elle sera transformée en ressource image, utilisable dans tous les exercices et que vous pourrez complètement supprimer si devenue inutile.

### Image dans le texte

Utilisez le bouton **Image/Illustration** de la barre d’outils pour importer une image dans les ressources du stage ou renseigner une URL externe. Le Markdown produit est de la forme :

```markdown
![Description de l’image](ressources/capture.png)
```

Le chemin ci-dessus illustre le Markdown produit par l’outil pour une image interne. Donnez à l’image un texte descriptif. Une image externe dépend de la disponibilité de son site d’origine ; elle n’est pas incluse dans l’archive du stage.

> L'illustration d'un exercice peut, si nécessaire, être incluse comme image dans ledit exercice

### Fichier à télécharger

Le bouton **Fichier inclus** ajoute un fichier au dossier de ressources et insère un lien vers celui-ci. Le Writer affiche l’adresse <code>&#91;ResourcesUrl&#93;</code>, qui sera remplacée par l’adresse du stage dans le site publié.

Vérifiez les liens et les ressources après leur insertion. Supprimer une ressource peut également retirer les références détectées dans les contenus.

### Lancer un script PowerShell fourni avec le stage

Un script (PowerShell par exemple) peut être distribué parmi les fichiers de ressources. Dans le contenu, <code>&#91;ResourcesUrl&#93;</code> est remplacé par l’adresse des ressources du stage publié.

Pour permettre l'execution directe d'un script powershell dans ne session Windows, vous pouvez, par exemple, utiliser la commande suivante :

```powershell
iex ([Text.Encoding]::UTF8.GetString((Invoke-WebRequest '[resourcesUrl]/MonScript.ps1' -UseBasicParsing).Content))
```

(il pourra être pertinent de rappeler d'éviter de lancer un script téléchargé sans l’avoir vérifié et de se conformer aux règles de production de chaque organisation...)

## 7. Ce que le moteur ibCAN ajoute automatiquement

À partir du Markdown et des métadonnées, ibCAN construit notamment :

- la navigation entre ateliers et exercices ;
- le sommaire du stage et les sommaires d’impression ;
- les titres de page et l’affichage des durées ;
- les tâches cochables à partir des listes numérotées ;
- le calcul et l’affichage de progression ;
- les champs et remplacements de variables ;
- les boutons de copie sur le code ;
- les panneaux Notes, Paramètres, Aide et Illustration ;
- la version imprimable du stage.

Il n’est donc pas nécessaire d’écrire du HTML pour obtenir ces fonctions. Maintenez plutôt le contenu dans les champs du Writer et dans son Markdown.

## 8. Prévisualisation, validation et limites

Ouvrez régulièrement **Aperçu** pendant la rédaction. Vous pouvez y vérifier l’ordre du contenu, les titres, les listes, les variables et les images. La fenêtre permet de basculer entre l’affichage du nom d’une variable et sa valeur par défaut.

L’aperçu Writer rend le Markdown en direct avec un autre moteur que celui utilisé pour générer les pages du site final. L'aperçu se veut utile, mais il n'est pas 100% fidèle au résultat publié. Après export et publication, contrôlez au minimum :

1. que le titre, l’introduction et le sommaire sont corrects ;
2. que les ateliers, exercices et durées apparaissent dans le bon ordre ;
3. que les actions attendues sont des tâches numérotées de premier niveau ;
4. que les liens, images, fichiers joints et variables fonctionnent ;
5. que l’impression reste lisible.

Les sources de publication sont les fichiers Markdown et les ressources du stage. Le writer et son sytème d'export ZIP ne sont qu'un moyen de faciliter la rédaction/la modification des ateliers sur ibCAN.

## 9. Enregistrer, reprendre et transmettre

1. Cliquez sur **Exporter** après une étape importante de rédaction et avant de fermer l’éditeur.
2. Conservez le ZIP téléchargé comme sauvegarde de votre travail.

    > Vous pouvez conserver une ou plusieurs versions antérieures d'un stage que vous modifiez.

3. Pour reprendre plus tard, utilisez **Modifier un stage** depuis le catalogue puis sélectionnez ce ZIP.
4. Pour transmettre une modification, fournissez le ZIP de travail demandé.
5. Après publication, ouvrez le stage dans ibCAN et faites une dernière vérification visuelle.

> L’export des données du lecteur depuis le panneau Paramètres du site est un export totalement différent : il sauvegarde les notes, variables personnalisées, progression et préférences du lecteur au format JSON. Il ne remplace pas l’export ZIP du Writer.

## 10. Checklist pédagogique avant export

Pour chaque exercice, vérifiez les points suivants :

- l’objectif est clair et le lecteur peut constater qu’il l’a atteint ;
- les prérequis, accès et informations nécessaires sont présentés avant les étapes ;
- chaque étape numérotée décrit une action réalisable, formulée de façon cohérente avec les autres étapes ;
- le résultat attendu ou la manière de vérifier l’action est indiqué lorsque cela aide le lecteur ;
- les acronymes et les termes propres à l’environnement sont expliqués ;
- les énumérations informatives sont présentées sous forme de puces plutôt que comme des tâches à cocher ;
- les valeurs susceptibles de varier sont remplacées par des variables adaptées, sans y placer d’information confidentielle ;
- les liens, fichiers et illustrations sont utiles, accessibles et correctement décrits ;
- l’aperçu est relu, puis le rendu publié et imprimé est vérifié.

N'hésitez pas à vous inspirer des contenus déjà publiés sur la plateforme.

> Si vous pensez qu'un élément manque à cette aide ou à un autre endroit de ibCAN, n'hésitez pas à nous le faire savoir. C'est avec votre aide que nous pourrons toujours améliorer cet outil.