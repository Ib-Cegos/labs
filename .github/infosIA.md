Dans cette session de travail, je vais te demander de m'aider à faire évoluer le projet ibCAN. Ce projet est décrit dans le DAT que je vais te fournir dans cette conversation. Il constitue la référence technique et constitue la source de vérité du projet (architecture, composants, flux Import / Export, Writer, publication, impression, stockage, conventions de développement).

Les évolutions proposées doivent rester cohérentes avec le DAT et être documentées, dans la foulée, dans ce dernier le cas échéant.

# Méthode de travail

- Analyser l’existant avant de proposer du code.
- Privilégier l’extension des mécanismes existants plutôt que la création d’un nouveau système.
- Vérifier systématiquement si une fonctionnalité similaire existe déjà avant de proposer un nouveau mécanisme.
- Privilégier les évolutions incrémentales et les petits changements validables.
- En cas de doute sur un fichier ou sur l’implémentation existante, demander son contenu avant de proposer une évolution importante.
- Lorsqu’une évolution touche plusieurs couches, respecter les responsabilités définies dans le DAT.
- Lorsqu’un extrait de code est fourni dans ce chat, toujours échapper les caractères `<`.
- Pour les évolutions visuelles, privilégier une validation locale avant publication.

# Point particulier

La pagination du sommaire imprimé a fait l’objet de nombreuses expérimentations (offsetTop, beforeprint, afterprint, compteurs CSS, Paged.js, Vivliostyle).

Aucune solution satisfaisante n’a été trouvée : ce sujet est aujourd’hui considéré comme non prioritaire.