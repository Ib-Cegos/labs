const IB_PREFIX = "ibCAN-";

/* Simplifcation des lecture-excriture dans le localStorage */
const storage = {
    read(key, defaultValue = null) {
        const value = localStorage.getItem(IB_PREFIX + "writer" + key);
        if (value === null) {
            localStorage.setItem(IB_PREFIX + "writer" + key, JSON.stringify(defaultValue));
            return defaultValue; }
        try { return JSON.parse(value); }
        catch { return value; }},
    write(key, value) {
        localStorage.setItem(IB_PREFIX + "writer" + key, JSON.stringify(value));},
    remove(key) {
        localStorage.removeItem(IB_PREFIX + "writer" + key);}};

function getCurrentAtelier() {
    return Stage.Ateliers.find(a => a.Id == Current.Atelier);}
function getCurrentExercice() {
    const atelier = getCurrentAtelier();
    if (!atelier) return null;
    return atelier.Exercices.find(e => e.Id == Current.Exercice);}

const session = {
    read(key, defaultValue = null) {
        const value = sessionStorage.getItem(IB_PREFIX + "writer" + key);
        if (value === null) {
            sessionStorage.setItem(IB_PREFIX + "writer" + key, JSON.stringify(defaultValue));
            return defaultValue; }
        try { return JSON.parse(value); }
        catch { return value; }},
    write(key, value) {
        sessionStorage.setItem(IB_PREFIX + "writer" + key, JSON.stringify(value));},
    remove(key) {
        sessionStorage.removeItem(IB_PREFIX + "writer" + key);}};

/* Vérification de l'environnement */
function ibCheckEnvironment() {
    function testStorage() {
        try {
            const test = "__ibCAN_test__";
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

/* Gestion des thèmes dynamiques */
function ibInitTheme() {
    if (!window.ibEnvironment.storage) { return; }
    const select = document.getElementById("ibTheme");
    if (!select) { return; }
    let theme = localStorage.getItem( IB_PREFIX + "theme" );
    if (!theme) {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) { theme = "sombre"; }
        else { theme = "original"; }
        localStorage.setItem( IB_PREFIX + "theme", theme );}
    if (!select.querySelector(`option[value="${theme}"]`)) { theme = "original"; }
    select.value = theme;
    ibApplyTheme(theme);
    select.addEventListener( "change", () => {
        localStorage.setItem( IB_PREFIX + "theme", select.value );
        ibApplyTheme( select.value );});}

function ibApplyTheme(theme) {
    const css = document.getElementById("ibThemeCss");
    if (!css) { return; }
    css.href = css.href.replace( /assets\/themes\/[^\/]+\.css$/, `assets/themes/${theme}.css` );}        