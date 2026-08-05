async function ibCopy(text, button) {
    if (!window.ibEnvironment.clipboard) {
    alert( "Désolé, la copie dans le presse-papiers n'est pas disponible dans votre navigateur." );
    return;}
    await navigator.clipboard.writeText(text);
    button.classList.add("ok");
    setTimeout( () => button.classList.remove("ok"), 1500 );}

const IB_PREFIX = "iblab-";

function ibVarKey(variable) {
    return (IB_PREFIX + window.ibLabCode + "-" + variable.toLowerCase());}

function ibNoteKey() {
    if (!window.ibIsExercise) { return null; }
    return ( IB_PREFIX + "note-" + window.ibLabCode.toLowerCase() + "-" + window.ibExerciseCode.toLowerCase());}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        ibCheckEnvironment();
        ibInitVariables();
        ibInitFontSize();
        ibInitTasks();
        ibInitNotes();
    });

/* Gestion de la taille de police */
function ibInitFontSize() {
    if (!window.ibEnvironment.storage) { return; }
    const select = document.getElementById( "ibFontSize" );
    if (!select) { return; }
    const valeur = localStorage.getItem( "iblab-font-size" ) ?? "1rem";
    select.value = valeur;
    document.documentElement.style.setProperty( "--ib-content-font-size", valeur );
    select.addEventListener( "change", () => {
        localStorage.setItem( "iblab-font-size", select.value );
        document.documentElement.style.setProperty( "--ib-content-font-size", select.value);});}

/* Gestion des variabmes */
function ibInitVariables() {
    if (!window.ibVariables) { return; }
    if (!window.ibEnvironment.storage) { return; }
    Object.entries(window.ibVariables).forEach(([nom, definition]) => {
        const cle = ibVarKey( nom );
        if ( localStorage.getItem(cle) === null ) { localStorage.setItem( cle, definition.defaut );}});
    ibLoadVariables();
    ibSaveVariables();
    ibUpdateVariables();}

function ibUpdateVariables() {
    if (!window.ibEnvironment.storage) { return; }
    document.querySelectorAll(".ibVariable").forEach(variable => {
    const nom = variable.dataset.variable.toLowerCase();
    const valeur = localStorage.getItem( ibVarKey(nom));
    if (valeur !== null) { variable.textContent = valeur; }});
    ibMajBoutonParametres();}

function ibLoadVariables() {
    document.querySelectorAll(".ibVariableInput").forEach(input => {
            const cle = ibVarKey(input.dataset.variable);
            input.value = localStorage.getItem(cle) ?? "";});}

function ibSaveVariables() {
    document.querySelectorAll(".ibVariableInput").forEach(input => {
        input.addEventListener("change",() => {
            localStorage.setItem( ibVarKey(input.dataset.variable), input.value);
            ibUpdateVariables(); });});}

function ibVariablesAConfigurer() {
    if (!window.ibVariables) { return false; }
    const variables = Object.entries( window.ibVariables ).filter(([nom, definition]) => definition.lib );
    return variables.some(([nom, definition]) => { const valeur = localStorage.getItem(ibVarKey(nom));
    return ( valeur === definition.defaut ); });}            

/* Sauvegarde et restauration */
function ibClearData() {
    Object.keys(localStorage).forEach(key => {
        if ( key.toLowerCase().startsWith( IB_PREFIX + window.ibLabCode + "-") ) { localStorage.removeItem(key); }});}    

function ibImport(event) {
    const file = event.target.files[0];
    ibClearData();
    if (!file) { return; }
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse( e.target.result );
        Object.entries(data).forEach(
            ([key, value]) => {if ( key.toLowerCase().startsWith( IB_PREFIX ) ) { localStorage.setItem( key, value );}});
        location.reload();};
    reader.readAsText(file);}    
    
function ibExport() {
    const exportData = {};
    Object.keys(localStorage)
        .filter( key => key.startsWith( IB_PREFIX ))
        .forEach( key => { exportData[key] = localStorage.getItem(key); });
    const json = JSON.stringify( exportData, null, 2 );
    const blob = new Blob( [json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().slice(0,10);
    const a = document.createElement("a");
    a.href = url;
    a.download = `iblab-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); }

/* Gestion des tâches cliquables */    
function ibInitTasks() {
    const tasks = Array.from( document.querySelectorAll( ".ibLabTask" ));
    tasks.forEach(task => { if ( localStorage.getItem(task.id) === "true" ) { task.classList.add("done"); }});
    tasks.forEach((task, index) => {
        task.addEventListener( "click", event => {
            if ( event.clientX > task.getBoundingClientRect().left + ( parseFloat( getComputedStyle(task).fontSize ) * 3 )) { return; }
            if ( task.classList.contains( "done" )) {
                for ( let i = index; i < tasks.length; i++ ) {
                    tasks[i].classList.remove("done");
                    localStorage.removeItem( tasks[i].id );}
          } else {
                for ( let i = 0; i <= index; i++ ) {
                    tasks[i].classList.add("done");
                    localStorage.setItem( tasks[i].id, "true" );}}});});}

/* Vérification de l'environnement */
function ibCheckEnvironment() {
    function testStorage() {
        try {
            const test = "__iblab_test__";
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true; }
        catch { return false; }}
    function testClipboard() {
        return !!( navigator.clipboard && navigator.clipboard.writeText );}
    window.ibEnvironment = {
        storage: testStorage(),
        clipboard: testClipboard() };
    if (!window.ibEnvironment.clipboard) {
        document.querySelectorAll( ".ibCopyButton, .ibInlineCopyButton" ).forEach( bouton => bouton.classList.add( "ibClipboardUnavailable" ));}
    if (!window.ibEnvironment.storage) {
        /* Désactivation des commandes nécessitant le localStorage */
        document.querySelectorAll( ".ibVariableInput, .ibDisplayInput" ).forEach( elt => elt.disabled = true );
        document.getElementById("ibExportButton").setAttribute( "disabled", true );
        document.getElementById("ibImportButton").setAttribute( "disabled", true ); 
        document.getElementById( "ibSettingsContent" ).insertAdjacentHTML( "afterbegin",'<div class="ibWarning">Le navigateur n\'autorise pas le stockage local.<br/>La progression et les paramètres ne pourront pas être conservés.</div>' );}}
    
function ibInitNotes() {
    if (!window.ibEnvironment.storage) { return; }
    if (!window.ibIsExercise) { return; }
    const textarea = document.getElementById("ibNotesTextarea");
    if (!textarea) { return; }
    const key = ibNoteKey();
    textarea.value = localStorage.getItem(key) ?? "";
    ibMajBoutonNotes();
    ibMajBoutonSuppressionNote();
    textarea.addEventListener( "input", () => { localStorage.setItem( key, textarea.value ); ibMajBoutonNotes(); ibMajBoutonSuppressionNote();});}

function ibMajBoutonSuppressionNote() {
    const bouton = document.getElementById("ibNotesDelete");
    if (!bouton) { return; }
    const textarea = document.getElementById("ibNotesTextarea");
    if (!textarea) { return; }
    bouton.disabled = textarea.value.trim().length === 0;}    