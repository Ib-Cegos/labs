let Stage = storage.read("Stage");
let Current = storage.read("Current");

function renderPreview() {
    Current = storage.read("Current");
    Stage = storage.read("Stage");
    const atelier = getCurrentAtelier();
    const exercice = getCurrentExercice();
    document.getElementById("stageReference").value = Stage?.Reference || "";
    document.getElementById("stageTitle").value = Stage?.Titre || "";
    document.getElementById("stageAuthor").value = Stage?.Auteur || "";
    if (Current.Atelier === 0) document.getElementById("ExerciceHeader").style.display = "none";
    else {
        document.getElementById("ExerciceHeader").style.display = "flex";
        document.getElementById("writerAtelierTitle").value = atelier?.Titre || "";
        document.getElementById("writerExerciceTitle").value = exercice?.Titre || "";
        document.getElementById("writerExerciceLength").value = exercice?.Duree || "";}
    document.getElementById("previewContent").innerHTML = marked.parse(Current?.Contenu || "");
}
 
renderPreview();

window.addEventListener("storage", event => {
    if (event.key === IB_PREFIX + "writerCurrent" || event.key === IB_PREFIX + "writerStage") renderPreview();});
/*document.getElementById("btnEditor").addEventListener("click", focusWriter);*/
