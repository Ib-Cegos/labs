console.log( "ibLab theme V1" );

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