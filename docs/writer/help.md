# Créer et organiser le stage

ibCANWriter vous permet de créer ou modifier un stage et d’en vérifier le rendu. Vos changements sont enregistrés automatiquement dans ce navigateur.

Renseignez la **Référence**, le **Titre du stage** et, si vous le souhaitez, l’**Auteur**. La référence et le titre sont nécessaires à l’export.

La navigation à gauche donne accès à l’introduction, aux ateliers et aux exercices. Cliquez sur un élément pour le modifier. Ajoutez un atelier ou un exercice avec les boutons du footer, ou faites glisser les entrées pour les réordonner. Les numéros se mettent à jour automatiquement.

Dans un exercice, indiquez le titre de l’atelier, le titre de l’exercice et sa durée estimée. Le bouton rouge <button class="ibDeleteButton ibWriterHelpDeleteButton">✖</button> supprime l’élément après confirmation. Supprimer un atelier supprime aussi ses exercices ; le dernier atelier et le dernier exercice d’un atelier sont conservés.

# Rédiger le contenu

Saisissez l’introduction ou le contenu de l’exercice dans la zone d’édition. Le bouton <button class="ibActionButton">+ Sommaire</button>, dans l’introduction, insère le sommaire des ateliers et exercices ; celui-ci est généré à partir de la structure du stage.

Le bouton <button class="ibActionButton">🛠️ Outils</button> ouvre la barre de mise en forme. Sélectionnez le texte à modifier ou placez le curseur à l’endroit où insérer un élément.

| Outil | Utilisation |
|---|---|
| <button class="ibWriterStyleBarButton">T1</button>&nbsp;et&nbsp;<button class="ibWriterStyleBarButton">T2</button> | Titre de section et sous-section. |
| <button class="ibWriterStyleBarButton">**B**</button>&nbsp;et&nbsp;<button class="ibWriterStyleBarButton">*I*</button> | Gras et italique. |
| <button class="ibWriterStyleBarButton">Code</button> | Code dans une ligne ou un bloc. |
| <button class="ibWriterStyleBarButton">1.</button>&nbsp;et&nbsp;<button class="ibWriterStyleBarButton">•</button> | Liste numérotée ou à puces. Les éléments numérotés de premier niveau d’un exercice deviennent des tâches à cocher. |
| <button class="ibWriterStyleBarButton">></button> | Note ou citation. |
| <button class="ibWriterStyleBarButton">🔗</button> | Lien vers une page web ou un autre exercice du stage. |
| <button class="ibWriterStyleBarButton">📎</button> | Ajouter un fichier aux ressources et insérer son lien. |
| <button class="ibWriterStyleBarButton">🖼️</button> | Insérer une image des ressources ou une image externe. |
| <button class="ibWriterStyleBarButton">[ ]</button> | Insérer une variable du stage. |
| <button class="ibWriterStyleBarButton">⊞</button> | Créer ou modifier un tableau. |
| <button class="ibWriterStyleBarButton btnUndo">↩</button>&nbsp;et&nbsp;<button class="ibWriterStyleBarButton btnUndo">↪</button> | Annuler ou rétablir des modifications de contenu (Ne restaurent pas les ateliers ou exercices supprimés). |

Déplacez la barre par sa poignée 🛠️ ; cliquez sur ✕ pour la fermer.

# Variables et ressources

Le bouton <button class="ibActionButton">Variables []</button> permet de définir les valeurs réutilisables dans le contenu sous la forme `[NomVariable]`. Une variable peut être fixe ou éditable par le lecteur ; cette dernière possède un libellé et peut avoir un texte d’aide. Son nom doit commencer par une lettre et contenir uniquement des lettres, des chiffres et des tirets. Les noms doivent être uniques.

Le bouton <button class="ibWriterStyleBarButton">[ ]</button> de la barre d’outils insère une variable disponible. La variable système <code>&#91;ResourcesUrl&#93;</code> désigne le dossier des ressources du stage.

Le bouton 📸 associe une illustration à l’exercice : elle reste accessible dans son panneau pendant la lecture. Les boutons <button class="ibWriterStyleBarButton">🖼️</button> et <button class="ibWriterStyleBarButton">📎</button> servent à insérer respectivement des images et des liens vers les fichiers des ressources. Une image externe n’est pas incluse dans l’export.

# Aperçu et export

<button class="ibActionButton btnPreview">Aperçu</button> ouvre une fenêtre actualisée au fil des modifications. La synchronisation suit la position de l’éditeur ; vous pouvez la désactiver pour parcourir l’aperçu librement. Le bouton **[ ] → abc** alterne entre le nom des variables et leur valeur par défaut.

<button class="ibActionButton btnExport">Exporter</button> télécharge une archive ZIP contenant le stage et ses ressources. L’export exige une référence et un titre. Conseil : exportez régulièrement votre travail.

Avant l’export, le Writer signale les contenus vides, les titres manquants, les variables non définies ou inutilisées, les ressources absentes ou inutilisées et les listes ou tableaux dont l’interprétation Markdown peut être perturbée par l’absence d’une ligne vide avant eux. Il peut aussi rappeler d’ajouter le sommaire dans l’introduction d’un stage complet. Les avertissements associés à une ligne de contenu sont cliquables : ils ouvrent l’introduction ou l’exercice concerné et sélectionnent la ligne. Ces avertissements ne bloquent pas l’export ; vous pouvez corriger les points signalés ou exporter quand même.

## Besoin de plus d’aide ?

Le <a href="../guide-redacteur/" title="Guide du rédacteur ibCAN">Guide du rédacteur ibCAN</a> détaille la rédaction, le Markdown et la publication. Pour le PDF, utilisez l’impression du navigateur et désactivez l’option **En-têtes et pieds de page** si elle est proposée.
