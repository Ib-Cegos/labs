console.log( "ibLab theme V1" );

function ibMajBoutonParametres() {
    const bouton = document.getElementById( "ibSettingsButton" );
    if (!bouton) { return; }
    bouton.classList.remove( "ibNeedsConfig" );
    if ( ibVariablesAConfigurer()) { bouton.classList.add( "ibNeedsConfig" ); }}

function ibInitHelpPanel() {
    const panel = document.getElementById("ibHelpPanel");
    document.getElementById( "ibHelpButton" ).addEventListener( "click", () => panel.classList.toggle("open"));
    document.getElementById( "ibHelpClose" ).addEventListener( "click", () => panel.classList.remove("open"));}    