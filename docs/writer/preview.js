let Stage = storage.read("Stage");
let Current = storage.read("Current");
let PreviewShowVariableValues = sessionStorage.getItem("PreviewShowVariableValues") === 'true';
let previewSyncEnabled = session.read("Synchro",true);
const openerOrigin = opener.location;
systemVariableRefresh();

function togglePreviewSync() {
    previewSyncEnabled = !previewSyncEnabled;
    session.write("Synchro",previewSyncEnabled);
    updateSyncButton();}
function updateSyncButton() {
    const button = document.getElementById("previewSyncButton");
    button.title = previewSyncEnabled ? "Suivre la position de l'éditeur" : "Position dans la fenêtre independante de l'éditeur.";
    button.classList.toggle("previewSyncDisabled",!previewSyncEnabled);
    button.classList.toggle("previewSyncEnabled",previewSyncEnabled);}

function replaceVariables(content) {
    Object.entries(Stage.Variables).forEach(([name, variable]) => {
        const regex = new RegExp(`\\[${name}\\]`, "gi");
        content = content.replace(regex, `<span class="ibVariable" title="${variable.lib || ""}">${PreviewShowVariableValues ? variable.defaut || "" : '['+name+']'}</span>`);});
    Object.entries(SYSTEM_VARIABLES).forEach(([name, variable]) => {
        const regex = new RegExp(`\\[${name}\\]`, "gi");
        content = content.replace(regex, variable.defaut);});
    return content;}

function variableButton() {
    const variButton = document.getElementById("btnPreviewVariables");
    if (PreviewShowVariableValues) {
        variButton.innerText = 'abc → [ ]';
        variButton.title = 'Afficher les noms de variables.';}
    else {
        variButton.innerText = '[ ] → abc';
        variButton.title = 'Afficher les valeurs des variables.';}}

function toggleShowVariables() {
    PreviewShowVariableValues = !PreviewShowVariableValues;
    sessionStorage.setItem("PreviewShowVariableValues",PreviewShowVariableValues);
    renderPreview();}

async function resolveInternalImages(html) {
    const parser = document.createElement("div");
    parser.innerHTML = html;
    for (const img of parser.querySelectorAll("img")) {
        const src = img.getAttribute("src");
        const url = await db.getUrl(src);
        if (url) img.src = url;}
    return parser.innerHTML;}

async function renderPreview() {
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
    variableButton();
    const illuDiv = document.getElementById("ibIllustrationPanel")
    if (Current.IllustrationName) {
        const illustrationUrl = await db.getUrl(Current.IllustrationName);
        illuDiv.style.display = "";
        document.getElementById("ibIllustrationImage").src = illustrationUrl;}
    else {
        illuDiv.style.display = "none";
    }
    contenu = marked.parse(contenu);
    contenu = await resolveInternalImages(contenu);
    contenu = replaceVariables(contenu);
    document.getElementById("ibContent").innerHTML = contenu;}

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
 
theme = localStorage.getItem( IB_PREFIX + "theme") || 'original';
ibApplyTheme(theme);
renderPreview();
updateSyncButton(); 

window.addEventListener("storage", event => {
    if (event.key === WRITER_PREFIX + "Current" || event.key === WRITER_PREFIX + "Stage") renderPreview();});
/* Synchonisation de la lecture sur fenêtre parent */
window.addEventListener("message", (event) => {
    if (event.data.type === "scroll" && previewSyncEnabled) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0,maxScroll * event.data.percent);}
    if (event.data.type === "cursor" && previewSyncEnabled) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({top: maxScroll * event.data.percent, behavior: "smooth"});}
});
/* Surveillance de fermeture de l'éditeur */
setInterval(() => {
    try {if (!opener || opener.closed || opener.location !== openerOrigin) window.close();}
    catch {window.close();}}, 1000);

/* Panneau d'illustration */
function resizeIllustrationPanel() {
    const panel = document.getElementById("ibIllustrationPanel");
    const image = document.getElementById("ibIllustrationImage");
    if (!panel || !image) { return; }
    const largeurMax = window.innerWidth * 0.90;
    const hauteurMax = (window.innerHeight - 120) * 0.95;
    const ratio = image.naturalWidth / image.naturalHeight;
    const largeurSelonHauteur = hauteurMax * ratio;
    const largeur = Math.min( image.naturalWidth + 32, largeurSelonHauteur + 32, largeurMax );
    panel.style.width = `${Math.round(largeur)}px`;
    if (!panel.classList.contains("open")) { panel.style.right = `-${Math.round(largeur)}px`; }}

const panel = document.getElementById("ibIllustrationPanel");
const tab = document.getElementById("ibIllustrationTab");
/* Retailler le panneau selon la taille de l'image si nécessaire */
const image = document.getElementById( "ibIllustrationImage" );
if (image) {
    if (image.complete) { resizeIllustrationPanel(); }
    image.addEventListener( "load", resizeIllustrationPanel );
    window.addEventListener( "resize", resizeIllustrationPanel ); }
panel.style.right = `-${panel.offsetWidth}px`;
tab.addEventListener("click", () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) { 
        sessionStorage.setItem( IB_PREFIX + "illustration-context", window.ibExerciseCode ); 
        panel.style.right = "0"; }
    else { 
        sessionStorage.removeItem( IB_PREFIX + "illustration-context" ); 
        panel.style.right = `-${panel.offsetWidth}px`; }});
