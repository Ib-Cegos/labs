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

/* Déplacement des éléments dans la page */
function makeDraggable(elementId, handleSelector, storageKey) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const handle = element.querySelector(handleSelector);
    if (!handle) return;
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    const savedLeft = sessionStorage.getItem(IB_PREFIX + "Writer" + storageKey + "Left");
    const savedTop =  sessionStorage.getItem(IB_PREFIX + "Writer" + storageKey + "Top");
    if (savedLeft && savedTop) {
        element.style.left = savedLeft;
        element.style.top = savedTop;
        element.style.transform = "scale(1)";}
    handle.addEventListener("mousedown", event => {
        dragging = true;
        const rect = element.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        element.style.left = `${rect.left}px`;
        element.style.top = `${rect.top}px`;
        element.style.transform = "scale(1)";
        event.preventDefault(); });
    document.addEventListener("mousemove", event => {
        if (!dragging) return;
        element.style.left = `${event.clientX - offsetX}px`;
        element.style.top = `${event.clientY - offsetY}px`; });
    document.addEventListener("mouseup", () => {
        if (!dragging) return;
        dragging = false;
        sessionStorage.setItem(IB_PREFIX + "Writer" + storageKey + "Left", element.style.left);
        sessionStorage.setItem(IB_PREFIX + "Writer" + storageKey + "Top",element.style.top);});}        

/* Gestion des fenêtres modales */
const dialog = {
    show(title, content, buttons = [], size = '') {
        document.getElementById("ibWriterDialogTitle").innerHTML = title;
        document.getElementById("ibWriterDialogContent").innerHTML = content;
        document.getElementById("ibWriterDialogOverlay").style.display = "flex";
        const modal =document.getElementById("ibWriterDialog");
        if (size == 'small') modal.classList.add ('ibModalSmall');
        else modal.classList.remove ('ibModalSmall');
        if (!sessionStorage.getItem(IB_PREFIX + "WriterDialogLeft")) {
            const rect =modal.getBoundingClientRect();
            modal.style.left = `${rect.left}px`;
            modal.style.top =  `${rect.top}px`;
            modal.style.transform = "scale(1)";}
        document.getElementById("ibWriterDialog").classList.add("ibModalOpen");
        const footer = document.getElementById("ibWriterDialogButtons");
        footer.innerHTML = "";
        buttons.forEach(button => {
            const element = document.createElement("button");
            element.textContent = button.label;
            element.addEventListener("click",button.action);
            element.className = button.className || "ibDialogButton";
            footer.appendChild(element);});
        if (buttons.length == 0) document.getElementById("ibWriterDialogButtons").style.display = "none";
        else document.getElementById("ibWriterDialogButtons").style.display = "flex";},
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
    if (Current.Atelier == 0) Stage.Introduction = Current.Contenu;
    else {
        const atelier = Stage.Ateliers.find(a => a.Id == Current.Atelier);
        const exercice = atelier.Exercices.find(e => e.Id == Current.Exercice);
        exercice.Contenu = Current.Contenu; }
    storage.write('Stage', Stage); }

function renumberStage() {
    Stage.Ateliers.forEach((atelier, atelierIndex) => {
        atelier.Id = atelierIndex + 1;
        atelier.Exercices.forEach((exercice, exerciceIndex) => {exercice.Id = exerciceIndex + 1;});});}    

function construireNavigation() {
    const nav = document.getElementById("writerNavigation");
    let html = '<div id ="writerNavIntroduction">Introduction</div>';
    Stage.Ateliers.forEach(atelier => {
        html += `<div class="writerNavAtelier">📂 Atelier ${atelier.Id}</div>`;
        atelier.Exercices.forEach(exercice => {
            html += `<div class="writerNavExercice" data-atelier="${atelier.Id}" data-exercice="${exercice.Id}">📄 Exercice ${exercice.Id}</div>`;});});
    nav.innerHTML = html;
    document.getElementById("writerNavIntroduction").addEventListener("click", () => {selectIntroduction();});
    document.querySelectorAll(".writerNavExercice").forEach(lien => {
        lien.addEventListener("click", () => {
            const atelier = parseInt(lien.dataset.atelier);
            const exercice = parseInt(lien.dataset.exercice);
            selectExercice(atelier,exercice);});});}

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
    /* Intègre l'affichage de l'exercice sélectionné */
    document.querySelectorAll(".writerNavExercice").forEach(lien => {
        if ( lien.dataset.atelier != Current.Atelier || lien.dataset.exercice != Current.Exercice) { lien.classList.remove("writerNavSelected");}
        else {lien.classList.add("writerNavSelected");}});
    if (Current.Atelier == 0) {
        document.getElementById("btnAddSommaire").style.display = "flex";
        document.getElementById("btnAddExercice").style.display = "none";
        document.getElementById("writerNavIntroduction").classList.add("writerNavSelected");
        document.getElementById("ExerciceHeader").style.display = "none";
        document.getElementById("btnDeleteExercice").style.display = "none";
        document.getElementById("btnDeleteAtelier").style.display = "none";}
    else {
        if (Stage.Ateliers.length <= 1) document.getElementById("btnDeleteAtelier").style.display = "none";
        else document.getElementById("btnDeleteAtelier").style.display = "flex";
        document.getElementById("btnAddSommaire").style.display = "none";
        document.getElementById("btnAddExercice").style.display = "flex";
        document.getElementById("writerNavIntroduction").classList.remove("writerNavSelected");
        document.getElementById("ExerciceHeader").style.display = "flex";
        const atelier = getCurrentAtelier();
        if (atelier.Exercices.length <= 1)  document.getElementById("btnDeleteExercice").style.display = "none";
        else document.getElementById("btnDeleteExercice").style.display = "flex";
        const exercice = getCurrentExercice();
        document.getElementById("writerAtelierTitle").value = atelier.Titre;
        document.getElementById("writerExerciceTitle").value = exercice.Titre;
        document.getElementById("writerExerciceLength").value = exercice.Duree;}
    /* Signaler les champs vides */
    document.querySelectorAll("#ibHeader input, #ExerciceHeader input").forEach(field => validateField(field));
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

function togglePreview() {
    document.getElementById("writerMain").classList.toggle("previewOpen");}

function validateField(field) {
    field.classList.toggle("ibMissing",field.value.trim() === "");}
    
/* Ajout / Suppression / déplacement des Ateliers */
function addAtelier() {
    Stage.Ateliers.push({Id: 0, Titre: "",Exercices: [{Id: 1, Titre: "", Duree: "",Contenu: ""}]});
    renumberStage();
    storage.write("Stage", Stage);
    construireNavigation();
    Current.Atelier = Stage.Ateliers.at(-1).Id;
    Current.Exercice = 1;
    chargerExercice();
    afficherExercice();}
function deleteAtelier() {
    if (Stage.Ateliers.length <= 1) {
        dialog.show( "Suppression impossible", "<p>Le stage doit contenir au moins un atelier.</p>", [], "small");
        return;}
    const index = Stage.Ateliers.findIndex(a => a.Id == Current.Atelier);
    Stage.Ateliers.splice(index, 1);
    renumberStage();
    storage.write("Stage", Stage);
    const nextIndex = Math.min(index,Stage.Ateliers.length - 1);
    Current.Atelier = Stage.Ateliers[nextIndex].Id;
    Current.Exercice = Stage.Ateliers[nextIndex].Exercices[0].Id;
    chargerExercice();
    construireNavigation();
    afficherExercice();}
function confirmDeleteAtelier() {
    const atelier =getCurrentAtelier();
    dialog.show("Supprimer l'atelier",
        `<p>Supprimer "${`Atelier ${atelier.Id} : ${atelier.Titre}` || `Atelier ${atelier.Id}`}" ?</p><p>Tous les exercices de cet atelier seront supprimés.</p>`, [{label : "Annuler", action : () => dialog.close()},{label : "Supprimer", className : "ibDialogButtonDelete", action : () => {deleteAtelier(); dialog.close();}}],"small");}     

/* Ajout / Suppression / déplacement des Exercices */
function addExercice() {
    const atelier = getCurrentAtelier();
    if (!atelier) return;
    atelier.Exercices.push({ Id: 0, Titre: "", Duree: "", Contenu: ""});
    renumberStage();
    storage.write("Stage", Stage);
    construireNavigation();
    Current.Exercice = atelier.Exercices.at(-1).Id;
    chargerExercice();
    afficherExercice();}
function deleteExercice() {
    const atelier = getCurrentAtelier();
    if (!atelier) return;
    if (atelier.Exercices.length <= 1) {
        dialog.show("Suppression impossible", "<p>Un atelier doit contenir au moins un exercice.</p>", [], "small" );
        return;}
    const index = atelier.Exercices.findIndex(e => e.Id == Current.Exercice);
    atelier.Exercices.splice(index, 1);
    renumberStage();
    storage.write("Stage", Stage);
    const nextIndex = Math.min(index, atelier.Exercices.length - 1);
    Current.Exercice =  atelier.Exercices[nextIndex].Id;
    chargerExercice();
    construireNavigation();
    afficherExercice();}
function confirmDeleteExercice() {
    const exercice = getCurrentExercice();
    dialog.show("Supprimer l'exercice",`<p>Supprimer "${`Exercice ${exercice.Id} : ${exercice.Titre}` || `Exercice ${exercice.Id}`}" ?</p><p>Cette action est définitive.</p>`, [{label : "Annuler", action : () => dialog.close()}, {label : "Supprimer",className: "ibDialogButtonDelete", action : () => { deleteExercice(); dialog.close(); }}], 'small');}

/* Chargement initial de la page */
let Stage = storage.read('Stage',{ Titre: "", "Auteur": "", "Variables": {}, "Introduction": "", "Reference": "", "Ateliers": [{ "Id": 1, "Titre": "", "Exercices": [{ "Id": 1, "Titre": "", "Contenu": "", "Duree": "" }]}]});
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
document.querySelectorAll("#ibHeader input, #ExerciceHeader input").forEach(field => {
    field.addEventListener("input",() => validateField(field));
    validateField(field);});  

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
/* Initialisation des boutons */        
document.getElementById("btnAddAtelier").addEventListener("click", addAtelier);
document.getElementById("btnAddExercice").addEventListener("click", addExercice);
document.getElementById("btnExport").addEventListener("click", exporterStage);
document.getElementById("btnDeleteExercice").addEventListener("click", confirmDeleteExercice);
document.getElementById("btnDeleteAtelier").addEventListener("click", confirmDeleteAtelier);
/* Initialisation de la gestion des fenêtres modales */
makeDraggable("ibWriterDialog",".ibModalHeader","Dialog");
document.getElementById("ibWriterDialogClose").addEventListener("click",() => dialog.close());
/* Initialisation de la barre de styles */
document.getElementById("btnStyle").addEventListener("click",() => document.getElementById("ibWriterStyleBar").style.display="flex");
document.getElementById("ibWriterStyleClose").addEventListener("click",() => document.getElementById("ibWriterStyleBar").style.display="none");
if (!sessionStorage.getItem(IB_PREFIX + "WriterStyleLeft")) {
    const styleButton = document.getElementById("btnStyle");
    const styleBar  = document.getElementById("ibWriterStyleBar");
    styleBar.style.display = "flex";
    const rectStyleButton = styleButton.getBoundingClientRect();
    sessionStorage.setItem(IB_PREFIX + "WriterStyleLeft",(rectStyleButton.right - styleBar.offsetWidth)+"px");
    sessionStorage.setItem(IB_PREFIX + "WriterStyleTop",(rectStyleButton.top - styleBar.offsetHeight + 12)+"px");
    styleBar.style.display = "none"; }
makeDraggable("ibWriterStyleBar",".ibWriterStyleHandle","Style");
