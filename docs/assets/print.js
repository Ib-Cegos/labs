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

document.getElementById("ibClosePrintSetup").addEventListener("click", () => {
    document.getElementById("ibPrintSetupDialog").style.display = "none";
    document.getElementById("ibPrintSetupOverlay").style.display = "none"; });
document.getElementById("ibPrintButton").addEventListener("click", () => { launchPrint(); });

/* Panneau préaparation déplçable */
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
