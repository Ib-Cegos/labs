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
window.ibLabCode = codeStage
nbNotes = 0;
document.querySelectorAll('.ibPrintNotes').forEach(NoteDiv => {
    const valeur = localStorage.getItem(ibNoteKey(codeStage,NoteDiv.dataset.exercise))
    if (valeur) {
        NoteDiv.innerHTML = `
                <div class="ibPrintNotesTitle">Mes notes personnelles</div>
                <div class="ibPrintNotesContent">${valeur.replace(/\n/g,"<br>")}</div>`
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
    const valeur = localStorage.getItem( ibVarKey(nomVar));
    console.log(nomVar + ibVarKey(nomVar) + valeur);
    if (valeur) {
        nbVariables ++;
        variableDiv.dataset.custom=valeur; }});
if (nbVariables < 1) { 
    document.getElementById('ibPrintVariablesSection').remove()
    document.getElementById('printVariablesTip').remove()}
document.getElementById("useCustomVariables").addEventListener("change", ibToglePrintVariables);    

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

function ibToglePrintVariables() {
    const useCustomVariables = document.getElementById("useCustomVariables").checked;
    document.querySelectorAll(".ibPrintVariable").forEach(varDiv => {
            if (useCustomVariables) { varDiv.innerHTML = varDiv.dataset.custom; }
            else {varDiv.innerHTML = varDiv.dataset.default; }});}
ibToglePrintVariables();      

function ibToglePrintNotes() {
    const includeNotes = document.getElementById("includePersonalNotes").checked;
    document.querySelectorAll(".ibPrintNotes").forEach(NoteDiv => {
            if (includeNotes) { NoteDiv.hidden = false; }
            else {NoteDiv.hidden = true; }});}