const IB_PREFIX = "ibCAN-";

function renumberStage() {
    /* Renumérotation des exercices/ateliers du stage (après ajout/Suppression/déplacement) et mise à jour de l'Id Current */
    Stage.Ateliers.forEach((atelier, atelierIndex) => {
        atelier.Id = atelierIndex + 1;
        atelier.Exercices.forEach((exercice, exerciceIndex) => {exercice.Id = exerciceIndex + 1;});});
    for (const atelier of Stage.Ateliers) {
        const exercice = atelier.Exercices.find(e => e._restoreCurrent);
        if (exercice) {
            Current.Atelier = atelier.Id;
            Current.Exercice = exercice.Id;
            delete exercice._restoreCurrent;
            storage.write('Current',Current);
        break;}}}
