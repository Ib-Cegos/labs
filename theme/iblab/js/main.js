async function ibCopy(text, button) {
    await navigator.clipboard.writeText(text);
    button.classList.add("ok");
    setTimeout( () => button.classList.remove("ok"), 1500 );}

const IB_PREFIX = "iblab-";
function ibVarKey(variable) {
    return (IB_PREFIX + window.ibLabCode + "-" + variable.toLowerCase());}    

document.addEventListener(
    "DOMContentLoaded",
    () => {
        ibInitVariables();
        ibInitSettingsPanel();
        ibInitHelpPanel();
        ibInitTasks();
    });

/* Gestion des variabmes */
function ibInitVariables() {
    if (!window.ibVariables) { return; }
    Object.entries(window.ibVariables).forEach(([nom, definition]) => {
        const cle = ibVarKey( nom );
        if ( localStorage.getItem(cle) === null ) { localStorage.setItem( cle, definition.defaut );}});
    ibLoadVariables();
    ibSaveVariables();
    ibUpdateVariables();}

function ibUpdateVariables() {
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

function ibInitSettingsPanel() {
    const panel = document.getElementById( "ibSettingsPanel" );
    document.getElementById( "ibSettingsButton" ).addEventListener( "click",() => panel.classList.toggle("open"));
    document.getElementById( "ibSettingsClose"  ).addEventListener( "click",() => panel.classList.remove("open"));
    document.getElementById( "ibExportButton" ).addEventListener( "click", ibExport );
    document.getElementById( "ibImportButton" ).addEventListener( "click",() => { document.getElementById( "ibImportFile" ).click(); });
    document.getElementById( "ibImportFile" ).addEventListener( "change", ibImport );}

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

function ibInitTasks() {
    const tasks = Array.from( document.querySelectorAll( ".ibLabTask" ));
    /* restauration */
    tasks.forEach(task => { if ( localStorage.getItem(task.id) === "true" ) { task.classList.add("done"); }});
    /* clic */
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