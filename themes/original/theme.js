document.addEventListener(
    "DOMContentLoaded",
    () => {

        ibInitSettingsPanel();
        ibInitHelpPanel();
        ibInitNotesPanel();
        ibInitNavigationPanel();
        ibInitialiserNavigation();

    });

function ibMajBoutonParametres() {
    const bouton = document.getElementById( "ibSettingsButton" );
    if (!bouton) { return; }
    bouton.classList.remove( "ibNeedsConfig" );
    if ( ibVariablesAConfigurer()) { bouton.classList.add( "ibNeedsConfig" ); }}

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
    document.getElementById( "ibImportFile" ).addEventListener( "change", ibImport );}

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
        if (window.ibEnvironment.storage) { localStorage.setItem("ibNavigationOpen","false") }
        return; }
    if ( localStorage.getItem( "ibNavigationOpen" ) === "true" ) { panel.classList.add("open"); }
    tab.addEventListener( "click", () => {
        panel.classList.toggle("open");
        localStorage.setItem( "ibNavigationOpen", panel.classList.contains( "open" )); }); }    

function ibInitialiserNavigation() {
    const storageKey = "ibNavContent";
    let navigation = {};
    try { navigation = JSON.parse( localStorage.getItem(storageKey) || "{}" ); }
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
            localStorage.setItem( storageKey, JSON.stringify(navigation) );});});}        