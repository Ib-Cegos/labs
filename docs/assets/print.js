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

/* Insertion du contenu dans les notes */
const cheminPrint = window.location.pathname.split("/").filter(Boolean);
codeStage = (cheminPrint[cheminPrint.length - 2]).toLowerCase();
nbNotes = 0;
document.querySelectorAll('.ibPrintNotes').forEach(NoteDiv => {
    if (localStorage.getItem(ibNoteKey(codeStage,NoteDiv.dataset.exercise))) {
        NoteDiv.innerHTML = `
                <div class="ibPrintNotesTitle">Mes notes personnelles</div>
                <div class="ibPrintNotesContent">${localStorage.getItem(ibNoteKey(codeStage,NoteDiv.dataset.exercise)).replace(/\n/g,"<br>")}</div>`
        nbNotes++}
    else {
        NoteDiv.remove();}})
if (nbNotes > 1) { notesPluriel = 's';} else { notesPluriel = ''}
if (nbNotes < 1) { 
    document.getElementById('ibPrintNotesSection').remove()
    document.getElementById('prinNotesTip').remove()}
else { document.getElementById('notesSummary').innerHTML = nbNotes + ' note' + notesPluriel + ' trouvée' + notesPluriel; }
document.getElementById("includePersonalNotes").addEventListener("change", ibToglePrintNotes);

/* Insertion des valeurs dans les variables */
nbVariables = 0;
document.querySelectorAll('.ibPrintVariable').forEach(variableDiv => {
    const nomVar = variableDiv.dataset.variable.toLowerCase();
    const valeur = localStorage.getItem( ibVarKey(nom));
    if (localStorage.getItem(ibVarKey(nomVar))) {
        nbVariables ++;
        variableDiv.dataset.custom=localStorage.getItem(ibVarKey(nom)); }}
if (nbVariables < 1) { 
    document.getElementById('ibPrintVariablesSection').remove()
    document.getElementById('printVariablesTip').remove()}

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

function ibToglePrintNotes() {
    const includeNotes = document.getElementById("includePersonalNotes").checked;
    document.querySelectorAll(".ibPrintNotes").forEach(NoteDiv => {
            if (includeNotes) { NoteDiv.hidden = false; }
            else {NoteDiv.hidden = true; }});}

document.getElementById("useCustomVariables").addEventListener( "change", ibRefreshPrintPreview);


function ibRefreshPrintPreview() {
    const useCustomVariables = document.getElementById("useCustomVariables").checked;
    ibUpdatePrintVariables( useCustomVariables );}

document.addEventListener("DOMContentLoaded", () => {ibRefreshPrintPreview();});    