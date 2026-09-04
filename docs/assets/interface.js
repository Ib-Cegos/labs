document.addEventListener(
    "DOMContentLoaded",
    () => {
        if ( window.ibStandaloneWorkshop && window.ibIsReadme ) {
            window.location.replace("./a1e1/");
            return; }
        ibInitSettingsPanel();
        ibInitHelpPanel();
        ibInitNotesPanel();
        ibInitNavigationPanel();
        ibInitIllustrationPanel();
        ibInitialiserNavigation();

    });

function ibResizeIllustrationPanel() {
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

function ibMajBoutonParametres() {
    const bouton = document.getElementById("ibSettingsButton");
    if (!bouton) { return; }
    bouton.classList.remove("ibNotification");
    if (ibVariablesAConfigurer()) { bouton.classList.add("ibNotification");}}

function ibMajBoutonNotes() {
    const bouton = document.getElementById("ibNotesButton");
    if (!bouton) { return; }
    bouton.classList.remove("ibNotification");
    if (!window.ibIsExercise) { return; }
    const key = ibNoteKey();
    const note = localStorage.getItem(key) ?? "";
    if (note.trim().length > 0) { bouton.classList.add("ibNotification");}}    

function ibToggleModal(id) {
    const modal = document.getElementById(id);
    const wasOpen = modal.classList.contains( "ibModalOpen" );
    document.querySelectorAll(".ibModal").forEach( modal => modal.classList.remove( "ibModalOpen" ));
    if (!wasOpen) { modal.classList.add( "ibModalOpen" );}}    

function ibInitHelpPanel() {
    const panel = document.getElementById("ibHelpPanel");
    document.getElementById( "ibHelpButton" ).addEventListener( "click", () => ibToggleModal( "ibHelpPanel" ));
    document.getElementById( "ibHelpClose").addEventListener( "click", () => panel.classList.remove( "ibModalOpen" ));}

function ibInitSettingsPanel() {
    const panel = document.getElementById( "ibSettingsPanel" );
    document.getElementById( "ibSettingsButton" ).addEventListener( "click", () => ibToggleModal("ibSettingsPanel"));
    document.getElementById( "ibSettingsClose").addEventListener( "click", () => panel.classList.remove( "ibModalOpen" ));
    document.getElementById( "ibExportButton" ).addEventListener( "click", ibExport );
    document.getElementById( "ibImportButton" ).addEventListener( "click",() => { document.getElementById( "ibImportFile" ).click(); });
    document.getElementById( "ibImportFile" ).addEventListener( "change", ibImport );
    const printButton = document.getElementById("ibPrintButton");
    printButton.addEventListener( "click", ibPrint );
    if ( !window.ibIsReadme && !window.ibIsExercise) { printButton.disabled = true; }}

function ibInitNotesPanel() {
    const panel = document.getElementById( "ibNotesPanel" );
    const button = document.getElementById( "ibNotesButton" );
    if ( !window.ibIsExercise ) { button.disabled = true; return; }
    button.addEventListener( "click", () => ibToggleModal( "ibNotesPanel" ));
    document.getElementById( "ibNotesClose" ).addEventListener( "click", () => panel.classList.remove( "ibModalOpen" ));}    

function ibInitNavigationPanel() {
    const panel = document.getElementById( "ibNavigationPanel" );
    const tab = document.getElementById( "ibNavigationTab" );
    if (!panel || !tab) {
        if (window.ibEnvironment.storage) { sessionStorage.setItem("ibNavigationOpen","false") }
        return; }
    if ( sessionStorage.getItem( "ibNavigationOpen" ) === "true" ) { panel.classList.add("open"); }
    tab.addEventListener( "click", () => {
        panel.classList.toggle("open");
        sessionStorage.setItem( "ibNavigationOpen", panel.classList.contains( "open" )); }); }

function ibInitIllustrationPanel() {
    const panel = document.getElementById("ibIllustrationPanel");
    const tab = document.getElementById("ibIllustrationTab");
    if (!panel || !tab) { 
        sessionStorage.removeItem( IB_PREFIX + "illustration-context" );
        return; }
    const context = sessionStorage.getItem( IB_PREFIX + "illustration-context" );
    if ( context && context !== window.ibExerciseCode ) { sessionStorage.removeItem( IB_PREFIX + "illustration-context" ); }
    /* Retailler le panneau selon la taille de l'image si nécessaire */
    const image = document.getElementById( "ibIllustrationImage" );
    if (image) {
         if (image.complete) { ibResizeIllustrationPanel(); }
        image.addEventListener( "load", ibResizeIllustrationPanel );
        window.addEventListener( "resize", ibResizeIllustrationPanel ); }
    if ( sessionStorage.getItem( IB_PREFIX + "illustration-context" ) === window.ibExerciseCode ) { 
        panel.classList.add("open");
        panel.style.right = "0"; }
    tab.addEventListener("click", () => {
        panel.classList.toggle("open");
        if (panel.classList.contains("open")) { 
            sessionStorage.setItem( IB_PREFIX + "illustration-context", window.ibExerciseCode ); 
            panel.style.right = "0"; }
        else { 
            sessionStorage.removeItem( IB_PREFIX + "illustration-context" ); 
            panel.style.right = `-${panel.offsetWidth}px`; }});}

function ibInitialiserNavigation() {
    const storageKey = "ibNavContent";
    let navigation = {};
    try { navigation = JSON.parse( sessionStorage.getItem(storageKey) || "{}" ); }
    catch { navigation = {}; }
    document.querySelectorAll(".ibNavAtelier").forEach(atelier => {
        const cle = atelier.dataset.stage + "-a" + atelier.dataset.atelier;
        const atelierCourant = atelier.classList.contains( "ibNavAtelierCurrent" );
        if (atelierCourant) { atelier.open = true; } else if (cle in navigation) { atelier.open = navigation[cle]; } else { atelier.open = false; }
        atelier.addEventListener( "toggle", () => {
            if (atelierCourant) {
                atelier.open = true;
                return; }
            navigation[cle] = atelier.open;
            sessionStorage.setItem( storageKey, JSON.stringify(navigation) );});});}

function ibPrint() {
    let url = window.location.pathname;
    url = url.replace( /\/print\/?$/i, "" );
    url = url.replace( /\/a\d+e\d+\/?$/i, "" );
    url = url.replace( /\/$/, "" );
    window.open( url + "/print/", "_blank" );
}