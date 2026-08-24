const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
const commentaires = [];
while (walker.nextNode()) { commentaires.push(walker.currentNode); }
commentaires.forEach(commentaire => {
    const valeur = commentaire.nodeValue.trim();
    if (!valeur.startsWith("IBLAB_PAGE_BREAK")) { return; }
    const saut = document.createElement("div");
    saut.className = "ibPageBreak";
    const morceaux = valeur.split("|");
    if (morceaux.length > 1) { saut.id = morceaux[1]; }
    commentaire.parentNode.replaceChild( saut, commentaire );});

/* Test numéros de page */
function ibComputePages() {

    const content = document.getElementById("ibPrintContent");

    if (!content) {
        return;
    }

    const scrollHeight = content.scrollHeight;

    /*
       1191 = valeur observée sur msms030

       89354 px / 75 pages ≈ 1191 px/page
    */
    const estimatedPageHeight = 1191;

    const estimatedTotalPages =
        Math.ceil(scrollHeight / estimatedPageHeight);

    console.log("scrollHeight =", scrollHeight);
    console.log("estimatedTotalPages =", estimatedTotalPages);

    document
        .querySelectorAll(".ibPageBreak")
        .forEach(el => {

            const page =
                Math.floor(
                    el.offsetTop
                    /
                    (scrollHeight / estimatedTotalPages)
                ) + 1;

            console.log(
                el.id,
                page
            );
        });
}

window.addEventListener(
    "beforeprint",
    ibComputePages
);

function launchPrint() {
    document.getElementById("ibPrintSetupDialog").style.display = "none";
    document.getElementById("ibPrintSetupOverlay").style.display = "none";
    window.print(); }            

document.getElementById("ibPrintSetupClose").addEventListener("click", () => {
    document.getElementById("ibPrintSetupDialog").style.display = "none";
    document.getElementById("ibPrintSetupOverlay").style.display = "none"; });
document.getElementById("ibPrintButton").addEventListener("click", () => { launchPrint(); });

function ibToglePrintVariables() {
    const useCustomVariables = document.getElementById("useCustomVariables").checked;
    document.querySelectorAll(".ibPrintVariable").forEach(varDiv => {
            if (useCustomVariables) { varDiv.textContent = varDiv.dataset.custom; }
            else {varDiv.textContent = varDiv.dataset.default; }});}

function ibToglePrintNotes() {
    const includeNotes = document.getElementById("includePersonalNotes").checked;
    document.querySelectorAll(".ibPrintNotes").forEach(NoteDiv => {
            if (includeNotes) { NoteDiv.hidden = false; }
            else {NoteDiv.hidden = true; }});}

/* Placer les informations d'édition sous le premier titre H1 de la page de garde */
const h1 = document.querySelector("#ibPrintContent h1");
const infos = document.getElementById("ibPrintCoverInfo");
if (h1 && infos) { h1.insertAdjacentElement("afterend", infos); }       

/* Insertion du contenu dans les notes */
const cheminPrint = window.location.pathname.split("/").filter(Boolean);
let codeStage = (cheminPrint[cheminPrint.length - 2]).toLowerCase();
window.ibLabCode = codeStage
let nbNotes = 0;
document.querySelectorAll('.ibPrintNotes').forEach(NoteDiv => {
    const valeur = localStorage.getItem(ibNoteKey(codeStage,NoteDiv.dataset.exercise))
    if (valeur) {
        NoteDiv.innerHTML = `
                <div class="ibPrintNotesTitle">Mes notes personnelles</div>
                <div class="ibPrintNotesContent">${valeur.replace(/\n/g,"<br>")}</div>`
        nbNotes++}
    else {
        NoteDiv.remove();}})
let notesPluriel = ''
if (nbNotes > 1) { notesPluriel = 's';}
if (nbNotes < 1) { 
    document.getElementById('ibPrintNotesSection').remove()
    document.getElementById('prinNotesTip').remove()}
else {
    document.getElementById('notesSummary').innerHTML = nbNotes + ' note' + notesPluriel + ' trouvée' + notesPluriel; 
    document.getElementById("includePersonalNotes").addEventListener("change", ibToglePrintNotes);}

/* Insertion des valeurs dans les variables */
let nbVariables = 0;
const regexVariables = /\[\[([^\]]+)\],\[([^\]]*)\]\]/gi;
document.querySelectorAll("#ibPrintContent *").forEach(element => {
    if (!element.innerHTML) { return; }
    element.innerHTML = element.innerHTML.replace( regexVariables, (match, nomVar, valeurDefaut) => {
        nbVariables++;
        const valeurCustom = localStorage.getItem(ibVarKey(nomVar.toLowerCase())) || valeurDefaut;
        return `<span class="ibPrintVariable" data-variable="${nomVar.toLowerCase()}" data-default="${valeurDefaut}" data-custom="${valeurCustom}">[${nomVar}]</span>`; });})
if (nbVariables < 1) { 
    document.getElementById('ibPrintVariablesSection').remove()
    document.getElementById('printVariablesTip').remove()}
else { 
    document.getElementById("useCustomVariables").addEventListener("change", ibToglePrintVariables);
    ibToglePrintVariables(); }

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
          