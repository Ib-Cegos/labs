console.log( "ibLab theme V1" );

function ibMajBoutonParametres() {
    const bouton = document.getElementById( "ibSettingsButton" );
    if (!bouton) { return; }
    bouton.classList.remove( "ibNeedsConfig" );
    if ( ibVariablesAConfigurer()) { bouton.classList.add( "ibNeedsConfig" ); }}    