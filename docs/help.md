# Navigation

- Vous pouvez revenir au sommaire du stage à tout moment en cliquant sur l'icône sommaire <span class="navSom">📖</span>.  
- Dans un atelier contenant plusieurs exercices, les boutons <span class="navPrev">⬅️</span> et <span class="navNext">➡️</span> vous permettent de naviguer entre les exercices de l'atelier.  
- Cliquez sur l'onglet <span class= "ibNavigationTab">Navigation</span> sur le bord gauche de l'écran pour ouvrir le panneau de navigation. Dans ce panneau :
    - Vous pouvez suivre votre progression et accéder rapidement à tous les exercices du stage.  
    - <span class="ibNavExerciceHelp" style="--ib-progress: 35%;">Un fond vert apparaît derrière le titre d'un exercice commencé. Sa largeur dépend de votre progression dans l'exercice.</span>  
    - <span class="ibHasNote"><span class="ibNavExRef">Une barre jaune indique la présence de notes personnelles.</span></span>  
    - <span class="ibNavExerciceHelp ibExerciceTermine" style="--ib-progress: 100%;">Une barre verte s'affiche à droite d'un exercice est terminé.</span>  
    - Le comportement de ces éléments (qui est repris dans le sommaire du stage) dépend des cases que vous avez coché dans le contenu de l'exercice.

# Contenu

- Les opérations à réaliser sont souvent représentées sous forme de tâches numérotées.
    Pour suivre votre avancement, **cliquez sur la case** <span class="iblabTaskHelp"> en regard du numéro d'une tâche</span> (Toutes les tâches précédentes seront automatiquement marquées comme effectuées).
- Une tâche déjà réalisée apparaît ainsi : <span class="iblabTaskHelp done"> </span>.
- <div>Sous le titre de l'exercice en cours, une ligne verte vous indique votre progression dans cet exercice.<div class="ibHelpCurrentProgress"></div></div>
- Certaines informations peuvent être adaptées à votre environnement de travail (nom d'utilisateur, mot de passe, nom de domaine, etc.).  
    <span class="ibVariable" data-variable="Elles apparaissent sous cette forme">Elles sont affichées sous cette forme</span> et leur contenu est modifiable dans les *paramètres*.  
- Certains champs comportent un bouton de copie {{ IB_COPY_BUTTON }} qui permet de copier le texte contenu dans votre presse-papier pour faciliter la saisie dans vos exercices.  

# Notes

- Le bouton <button class="ibActionButton ibNotesButton">📝 Notes</button> vous permet d'ajouter et consulter des notes personnelles que vous pouvez ajouter à chaque exercice.  
- Elles sont automatiquement enregistrées dans votre navigateur.  
- Lorsqu'un exercice contient déjà des notes personnelles que vous avez saisies, le bouton <button class="ibActionButton ibNotesButton ibNotification">📝 Notes</button> se voit ajouté une pastille de notification.
- <span class="ibHasNote"><span class="ibNavExRef">De même, dans la navigation de l'atelier, une barre jaune signale les exercices que vous avez annotés.</span></span>

# Paramètres
Le bouton <span class="ibActionButton ibSettingsButton">⚙ Paramètres</span> ouvre une fenêtre qui vous permet :

- de **personnaliser les variables** du stage.  
    (Si certaines variables personnelles ne sont pas encore renseignées, une pastille de notification apparaît sur le bouton <span class="ibActionButton ibSettingsButton ibNotification">⚙ Paramètres</span>.)
- d'**exporter vos données** : toutes vos données (telles que vos notes personnelles, vos variables personnalisées et votre progression) sont stokées localement dans votre navigateur.  
    En cliquant sur le bouton <span class="ibExportButton ibSettingsAction">💾 Exporter mes données</span> vous pouvez sauvegarder un fichier *.json* contenant toutes ces informations.
    Ce fichier pourra être réimporté par la suite pour reprendre votre stage dans un autre navigateur/une autre machine ou après une perte d'informations par le navigateur.  
    Il vous est donc conseillé d'<u>exporter régulièrement vos données</u>, après avoir terminé un exercice ou pour reprendre votre travail sur un autre navigateur par exemple.
- d'**importer une sauvegarde** :
    en cliquant sur le bouton <span class="ibImportButton ibSettingsAction">📂 Importer ma sauvegarde</span>, vous pourrez sélectionner le fichier *.json* préalablement sauvegardé pour effacer toutes les valeurs locales de votre navigateur concernant ce stage et les remplacer par celles contenues dans le fichier.
- d'**imprimer** tous les ateliers du stage :
    En cliquant sur le bouton <span class="ibPrintButton ibSettingsAction">🖨 Préparer l'impression</span>, vous ouvrez une nouvelle page qui vous permet de préparer l'impression de tous les ateliers du stage (pour les conserver en PDF par exemple).

# Impression des ateliers

- Dans la fenêtre *Paramètres*, en cliquant sur le bouton <span class="ibPrintButton ibSettingsAction">🖨 Préparer l'impression</span>, vous ouvrez la page de préparation d'impression.  
    Cette page permet de générer un document regroupant l'ensemble des ateliers du stage afin de l'imprimer sur papier ou de le conserver au format PDF.
- À son ouverture, cette page affiche un document complet contenant un sommaire et l'intégralité des ateliers du stage. 
- Une fenêtre déplaçable **Préparation du document** est affichée sur cette page.
    Les modifications effectuées dans cette fenêtre sont immédiatement répercutées dans le document affiché.  
    Utilisez-là pour customiser le contenu de la page avant de passer par la fonctionnalité d'impression de votre navigateur.  
- Si les ateliers à imprimer contiennent des variables customisables, vous pouvez :
    - Décocher la case **Utiliser mes paramètres personnels** pour utiliser les valeurs par défaut.
    - Cocher la case **Utiliser mes paramètres personnles** pour remplacer les valeurs par défaut du document par celles que vous avez saisies.
- Si vous avez saisi des notes personnelles dans certains exercices, leur nombre est indiqué dans la fenêtre de préparation.
    - Cochez la case **Inclure mes notes personnelles** pour insérer ces notes directement dans le document imprimé, au début de chaque exercice concerné.
- Une fois la préparation terminée, utilisez la fonction d'impression de votre navigateur pour imprimer le document ou l'enregistrer au format PDF.
