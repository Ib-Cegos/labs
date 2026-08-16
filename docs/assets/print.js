document.addEventListener("DOMContentLoaded", () => {
    const walker = document.createTreeWalker( document.body, NodeFilter.SHOW_COMMENT );
    const commentaires = [];
    while (walker.nextNode()) { commentaires.push(walker.currentNode); }
    commentaires.forEach(commentaire => {
        if ( commentaire.nodeValue.trim() === "IBLAB_PAGE_BREAK" ) {
            const saut = document.createElement("div");
            saut.className = "ibPageBreak";
            commentaire.parentNode.replaceChild( saut, commentaire );}});});

function launchPrint() {
    document.getElementById("ibPrintSetupDialog").style.display = "none";
    document.getElementById("ibPrintSetupOverlay").style.display = "none";
    window.print(); }            

document.getElementById("ibPrintSetupClose").addEventListener("click", () => {
    document.getElementById("ibPrintSetupDialog").style.display = "none";
    document.getElementById("ibPrintSetupOverlay").style.display = "none"; });
document.getElementById("ibPrintButton").addEventListener("click", () => { launchPrint(); });

document.querySelectorAll(".ibPrintVariable").forEach(variable => { variable.dataset.original = variable.textContent;});

/* Insertion du contenu dans les notes */
const cheminPrint = window.location.pathname.split("/").filter(Boolean);
codeStage = (cheminPrint[cheminPrint.length - 2]).toLowerCase();
nbNotes = 0;
document.querySelectorAll('.ibPrintNotes').forEach(NoteDiv => {
    if (localStorage.getItem(ibNoteKey(codeStage,NoteDiv.dataset.exercise))) {
        NoteDiv.innerHTML = `
                <div class="ibPrintNotesTitle">Mes notes personnelles</div>
                <div class="ibPrintNotesContent">${localStorage.getItem(ibNoteKey(codeStage,NoteDiv.dataset.exercise)).replace(/\n/g,"<br>")}</div>`
        nbNotes++}})
if (nbNotes > 1) { notesPluriel = 's';} else { notesPluriel = ''}
document.getElementById('notesSummary').innerHTML = nbNotes + 'note' + notesPluriel + ' trouvée' + notesPluriel;

/* Panneau préaparation déplaçable */
const dialog = document.getElementById("ibPrintSetupDialog");
const header = dialog.querySelector(".ibPrintSetupHeader");
const closeButton = document.getElementById("ibPrintSetupClose");
let dragging = false;
let offsetX = 0;
let offsetY = 0;
header.addEventListener("mousedown", (e) => {
    closeButton.addEventListener("pointerdown", (e) => { e.stopPropagation();})
    if (e.target.closest(".ibPrintSetupClose")) { return; }
   const rect = dialog.getBoundingClientRect();
    dialog.style.left = `${rect.left}px`;
    dialog.style.top = `${rect.top}px`;
    dialog.style.transform = "none";
    dragging = true;
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;});
document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    dialog.style.left = `${e.clientX - offsetX}px`;
    dialog.style.top = `${e.clientY - offsetY}px`;
    dialog.style.transform = "none";});
document.addEventListener("mouseup", () => { dragging = false; });

function ibUpdatePrintVariables(useCustomValues) {
    document.querySelectorAll(".ibPrintVariable").forEach(variable => {
            const nom = variable.dataset.variable;
            let valeur;
            if (useCustomValues) {
                valeur = localStorage.getItem(`iblab-var-${nom}` ); }
            if (!valeur) { valeur = variable.dataset.original ?? variable.textContent; }
            variable.textContent = valeur; }); }

function ibUpdatePrintNotes(includeNotes) {
    document.querySelectorAll(".ibPrintNotes").forEach(zone => {
            const exercice = zone.dataset.exercise;
            if (!includeNotes) {
                zone.hidden = true;
                return;}
            const notes = localStorage.getItem(`iblab-notes-${exercice}`);
            if (!notes?.trim()) {
                zone.hidden = true;
                return;}
            zone.hidden = false;
            zone.innerHTML =
                `
                <div class="ibPrintNotesTitle">
                    Mes notes personnelles
                </div>

                <div class="ibPrintNotesContent">
                    ${notes.replace(/\n/g,"<br>")}
                </div>`;});}

document.getElementById("useCustomVariables").addEventListener( "change", ibRefreshPrintPreview);
document.getElementById("includePersonalNotes").addEventListener("change", ibRefreshPrintPreview);

function ibRefreshPrintPreview() {
    const useCustomVariables = document.getElementById("useCustomVariables").checked;
    const includeNotes = document.getElementById("includePersonalNotes").checked;
    ibUpdatePrintVariables( useCustomVariables );
    ibUpdatePrintNotes( includeNotes );}

document.addEventListener("DOMContentLoaded", () => {ibRefreshPrintPreview();});    