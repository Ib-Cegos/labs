const IB_PREFIX = "ibCAN-";

/* Simplifcation des lecture-excriture dans le localStorage */
const storage = {
    read(key, defaultValue = null) {
        const value = localStorage.getItem(IB_PREFIX + "writer" + key);
        if (value === null) {
            localStorage.setItem(IB_PREFIX + "writer" + key, JSON.stringify(defaultValue));
            return defaultValue; }
        try { return JSON.parse(value); }
        catch { return value; }},
    write(key, value) {
        localStorage.setItem(IB_PREFIX + "writer" + key, JSON.stringify(value));},
    remove(key) {
        localStorage.removeItem(IB_PREFIX + "writer" + key);}};

/* Gestion des fenêtres modales */
/* Gestion des fenêtres modales */
const dialog = {
    show(title, content, buttons = []) {
        document.getElementById("ibWriterDialogTitle").innerHTML = title;
        document.getElementById("ibWriterDialogContent").innerHTML = content;
        document.getElementById("ibWriterDialogOverlay").style.display = "flex";
        const footer = document.getElementById("ibWriterDialogButtons");
        footer.innerHTML = "";
        buttons.forEach(button => {
            const element = document.createElement("button");
            element.textContent = button.label;
            element.addEventListener("click",button.action);
            footer.appendChild(element);});},
    close() {
        document.getElementById("ibWriterDialogOverlay").style.display = "none";}};

function exporterStage() {
    majStage();
    const json = JSON.stringify(Stage,null,2);
    const blob = new Blob([json],{ type: "application/json" });
    const url = URL.createObjectURL(blob);
    const lien = document.createElement("a");
    lien.href = url;
    lien.download = `${Stage.Reference || "stage"}-edit.json`;
    lien.click();
    URL.revokeObjectURL(url); }

function getCurrentAtelier() {
    return Stage.Ateliers.find(a => a.Id == Current.Atelier);}
function getCurrentExercice() {
    const atelier = getCurrentAtelier();
    if (!atelier) return null;
    return atelier.Exercices.find(e => e.Id == Current.Exercice);}

function majStage() {
    Current = storage.read('Current');
    Stage = storage.read('Stage');
    if (Current.Atelier == 0) Stage.Introduction = Current.Contenu;
    else {
        const atelier = Stage.Ateliers.find(a => a.Id == Current.Atelier);
        const exercice = atelier.Exercices.find(e => e.Id == Current.Exercice);
        exercice.Contenu = Current.Contenu; }
    storage.write('Stage', Stage); }

function construireNavigation() {
    const nav = document.getElementById("writerNavigation");
    let html = '<div ';
    if (Current.Atelier == 0) html +='class="writerNavSelected" ';
    html += 'id ="writerNavIntroduction">Introduction</div>';
    Stage.Ateliers.forEach(atelier => {
        html += `<div class="writerNavAtelier">📂 Atelier ${atelier.Id}</div>`;
        atelier.Exercices.forEach(exercice => {
            html += '<div class="writerNavExercice';
            if (Current.Atelier == atelier.Id && Current.Exercice == exercice.Id) html += ' writerNavSelected'
            html += `" data-atelier="${atelier.Id}" data-exercice="${exercice.Id}">📄 Exercice ${exercice.Id}</div>`;});});
    nav.innerHTML = html;}

/* Adaptation du contenu aux header et footer */
function resizeWriter() {
    const header = document.getElementById("ibHeader");
    const footer = document.getElementById("ibFooter");
    const writerMain = document.getElementById("writerMain");
    const hauteur = window.innerHeight - header.offsetHeight - footer.offsetHeight;
    writerMain.style.height = `${hauteur}px`;
    writerMain.style.marginTop = `${header.offsetHeight}px`;}
window.addEventListener("resize", resizeWriter);
resizeWriter();

function chargerExercice() {
    if (Current.Atelier == 0) { Current.Contenu = Stage.Introduction; }
    else {
        const exercice = getCurrentExercice();
        if (exercice) { Current.Contenu = exercice.Contenu; }}
    storage.write("Current", Current);}

function afficherExercice() {
    document.querySelectorAll(".writerNavExercice").forEach(lien => {
        if ( lien.dataset.atelier != Current.Atelier || lien.dataset.exercice != Current.Exercice) { lien.classList.remove("writerNavSelected");}});
    if (Current.Atelier == 0) {
        document.getElementById("btnAddSommaire").style.display = "flex";
        document.getElementById("writerNavIntroduction").classList.add("writerNavSelected");
        document.getElementById("ExerciceHeader").style.display = "none";}
    else {
        document.getElementById("btnAddSommaire").style.display = "none";
        document.getElementById("writerNavIntroduction").classList.remove("writerNavSelected");
        document.getElementById("ExerciceHeader").style.display = "flex";
        const atelier = getCurrentAtelier();
        const exercice = getCurrentExercice();
        document.getElementById("writerAtelierTitle").value = atelier.Titre;
        document.getElementById("writerExerciceTitle").value = exercice.Titre;
        document.getElementById("writerExerciceLength").value = exercice.Duree;}
    document.getElementById("writerContenu").value = Current.Contenu;}

function selectExercice(atelier, exercice) {
    if (atelier == Current.Atelier && exercice == Current.Exercice) return;
    majStage();
    Current.Atelier = atelier;
    Current.Exercice = exercice;
    chargerExercice();
    afficherExercice(); }

function selectIntroduction() {
    if (Current.Atelier == 0) return;
    majStage();
    Current.Atelier = 0;
    Current.Exercice = 0;
    chargerExercice();
    afficherExercice(); }

/* Chargement initial de la page */
let Stage = storage.read('Stage',{ Titre: "", "Auteur": "", "Variables": {}, "Introduction": "", "Reference": "", "Ateliers": [{ "Id": 1, "Titre": "", "Exercices": [{ "Id": 1, "Titre": "", "Contenu": "" }]}]});
let Current = storage.read ('Current', {Atelier : 0, Exercice : 0, Contenu : Stage.Introduction});
document.getElementById("stageReference").value = Stage.Reference || "";
document.getElementById("stageReference").addEventListener("input", () => {
    Stage.Reference = stageReference.value;
    storage.write("Stage", Stage);});
document.getElementById("stageTitle").value = Stage.Titre || "";
document.getElementById("stageTitle").addEventListener("input", () => {
    Stage.Titre = stageTitle.value;
    storage.write("Stage", Stage);});
document.getElementById("stageAuthor").value = Stage.Auteur || "";
document.getElementById("stageAuthor").addEventListener("input", () => {
    Stage.Auteur = stageAuthor.value;
    storage.write("Stage", Stage);});
construireNavigation();
afficherExercice();
document.getElementById("writerNavIntroduction").addEventListener("click", () => {
    if (Current.Atelier == 0) return;
    Current.Atelier = 0;
    Current.Exercice = 0;
    Current.Contenu = Stage.Introduction;
    afficherExercice();})

document.querySelectorAll(".writerNavExercice").forEach(lien => {
    lien.addEventListener("click", () => {
        lien.classList.add("writerNavSelected");
        const atelier = parseInt(lien.dataset.atelier);
        const exercice = parseInt(lien.dataset.exercice);
        selectExercice(atelier,exercice)});});

/* Initialisation des champs dynamiques */
document.getElementById("writerAtelierTitle").addEventListener("input", event => {
        getCurrentAtelier().Titre = event.target.value;
        storage.write("Stage", Stage);});
document.getElementById("writerExerciceTitle").addEventListener("input", event => {
        getCurrentExercice().Titre = event.target.value;
        storage.write("Stage", Stage);});
document.getElementById("writerExerciceLength").addEventListener("input", event => {
        getCurrentExercice().Duree = event.target.value;
        storage.write("Stage", Stage);});
document.getElementById("writerContenu").addEventListener("input", event => {
        Current.Contenu = event.target.value;
        storage.write("Current",Current);});
document.getElementById("btnExport")
    .addEventListener("click", exporterStage);

document.getElementById("ibWriterDialogOverlay").addEventListener("click", event => {
    if ( event.target.id == "ibWriterDialogOverlay") dialog.close();});
