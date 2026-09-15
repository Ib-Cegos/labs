let Stage = storage.read("Stage");
let Current = storage.read("Current");
const openerOrigin = opener.location;

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
    let contenu = Current.Contenu
    if (Current.Atelier === 0) contenu = contenu.replace(/\{\{\s*sommaire\s*\(\s*\)\s*\}\}/i, buildSommaire());
    document.getElementById("ibContent").innerHTML = marked.parse(contenu);}

function buildSommaire() {
    let html = "";
    Stage.Ateliers.forEach(atelier => {
        html += `<div class="somLabTit"> Atelier ${atelier.Id}`;
        if (atelier.Titre != "") html += ` : ${atelier.Titre}`;
        html += ' </div><ul>';
        atelier.Exercices.forEach(exercice => {
            html+=`<li class="somEx"><span class="somExLink">Exercice ${exercice.Id}`;
            if (exercice.Titre != "") html += ` - ${exercice.Titre}`;
            html += '</span>';
            if (exercice.Duree) html += ` <span class="somDuree">(${exercice.Duree} min)</span>`
            html += '</li>';});
        html += "</ul></div>";});
    return html;}    
 
renderPreview();

window.addEventListener("storage", event => {
    if (event.key === IB_PREFIX + "writerCurrent" || event.key === IB_PREFIX + "writerStage") renderPreview();});
/* Synchonisation de la lecture sur fenêtre parent */
window.addEventListener("message", (event) => {
    if (event.data.type === "scroll") {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0,maxScroll * event.data.percent);}
    if (event.data.type === "cursor") {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({top: maxScroll * event.data.percent, behavior: "smooth"});}
});
/* Surveillance de fermeture de l'éditeur */
setInterval(() => {
    try {if (!opener || opener.closed || opener.location !== openerOrigin) window.close();}
    catch {window.close();}}, 1000);
