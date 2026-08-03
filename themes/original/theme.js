document.addEventListener(
    "DOMContentLoaded",
    () => {

        ibInitSettingsPanel();
        ibInitHelpPanel();

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

