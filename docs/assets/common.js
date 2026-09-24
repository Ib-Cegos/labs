const IB_PREFIX = "ibCAN-";
const WRITER_PREFIX = "ibCANWriter-";
const DB_NAME = WRITER_PREFIX + "Files";
const DB_VERSION = 1;
const DB_STORE = "files";

/* Simplifcation des lecture-excriture dans le localStorage */
const storage = {
    read(key, defaultValue = null) {
        const value = localStorage.getItem(WRITER_PREFIX + key);
        if (value === null) {
            localStorage.setItem(WRITER_PREFIX + key, JSON.stringify(defaultValue));
            return defaultValue; }
        try { return JSON.parse(value); }
        catch { return value; }},
    write(key, value) {
        localStorage.setItem(WRITER_PREFIX + key, JSON.stringify(value));},
    remove(key) {
        localStorage.removeItem(WRITER_PREFIX + key);}};

function getCurrentAtelier() {
    return Stage.Ateliers.find(a => a.Id == Current.Atelier);}
function getCurrentExercice() {
    const atelier = getCurrentAtelier();
    if (!atelier) return null;
    return atelier.Exercices.find(e => e.Id == Current.Exercice);}

const session = {
    read(key, defaultValue = null) {
        const value = sessionStorage.getItem(WRITER_PREFIX + key);
        if (value === null) {
            sessionStorage.setItem(WRITER_PREFIX + key, JSON.stringify(defaultValue));
            return defaultValue; }
        try { return JSON.parse(value); }
        catch { return value; }},
    write(key, value) {
        sessionStorage.setItem(WRITER_PREFIX + key, JSON.stringify(value));},
    remove(key) {
        sessionStorage.removeItem(WRITER_PREFIX + key);}};

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

/* Chargement d'un zip pour mettre son contenu dans le localStorage et le indexedDB */
async function ouvrirStageDepuisZip(source) {
    const zip = await JSZip.loadAsync(source);
    const content = zip.file("content.json");
    if (!content) throw new Error("content.json introuvable");
    const json = await content.async("string");
    localStorage.setItem(WRITER_PREFIX + "Stage", json);
    const stage = JSON.parse(json);
    localStorage.setItem(WRITER_PREFIX + "Current", JSON.stringify({Atelier: 0, Exercice: 0, Contenu: stage.Introduction}));
    session.remove("Undo");
    session.remove("Redo");
    await db.clear();
    for (const [path,file] of Object.entries(zip.files)) {
        if (path === "content.json") continue;
        if (file.dir) continue;
        const blob = await file.async("blob");
        await db.write(path, blob);}
    window.location.href = "writer/";}

/* module de travail avec indexedDB */
const db = {
    database: null,
    async init() {
        if (this.database) return this.database;
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = () => {reject(request.error);};
            request.onupgradeneeded = event => {
                const database = event.target.result;
                if (!database.objectStoreNames.contains(DB_STORE)) database.createObjectStore(DB_STORE, { keyPath: "path" });};
            request.onsuccess = () => {
                this.database = request.result;
                resolve(this.database);};});},
    async write(path, blob) {
        const database = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(DB_STORE, "readwrite");
            const store = transaction.objectStore(DB_STORE);
            const request = store.put({path, blob});
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);});},
    async read(path) {
        const database = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(DB_STORE, "readonly");
            const store = transaction.objectStore(DB_STORE);
            const request = store.get(path);
            request.onsuccess = () => {resolve(request.result?.blob ?? null);};
            request.onerror = () => reject(request.error);});},
    async delete(path) {
        const database = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(DB_STORE, "readwrite");
            const store = transaction.objectStore(DB_STORE);
            const request = store.delete(path);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);});},
    async list() {
        const database = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(DB_STORE, "readonly");
            const store = transaction.objectStore(DB_STORE);
            const request = store.getAllKeys();
            request.onsuccess = () => {resolve(request.result);};
            request.onerror = () => reject(request.error);});},
    async clear() {
        const database = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(DB_STORE, "readwrite");
            const store = transaction.objectStore(DB_STORE);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);});},
    async getUrl(path) {
    const blob = await this.read(path);
    if (!blob) return null;
    return URL.createObjectURL(blob);},
    releaseUrl(url) {
       URL.revokeObjectURL(url);},
    async find(prefix) {
        const files = await this.list();
        return files.find(path => path.startsWith(prefix)) ?? null;}};
    
    /* Gestion des varaibles système pour éditeur et preview */
    function systemVariableRefresh() {
            const siteUrl = window.location.origin +  window.location.pathname.replace(/\/writer\/?.*$/i, "");
            Object.values(SYSTEM_VARIABLES).forEach(variable => {
            variable.defaut = variable.defaut.replaceAll("[site_url]", siteUrl).replaceAll("[stage]", Stage.Reference);});}

