const IB_PREFIX = "ibCAN-";
const WRITER_PREFIX = "ibCANWriter-";
const DB_NAME = WRITER_PREFIX + "Files";
const DB_VERSION = 2;
const DB_STORE = "files";
const OLD_DB_STORE = "oldFiles";

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

async function checkStoredStage() {
    const storedStage = localStorage.getItem(WRITER_PREFIX + "Stage");
    if (storedStage === null) return null;
    let stage;
    try {
        stage = JSON.parse(storedStage);
        if (!stage || typeof stage !== "object" || Array.isArray(stage)) return null;
    } catch {
        return null;}
    await db.snapshotFiles();
    localStorage.setItem(WRITER_PREFIX + "oldStage", storedStage);
    const storedCurrent = localStorage.getItem(WRITER_PREFIX + "Current");
    if (storedCurrent === null) localStorage.removeItem(WRITER_PREFIX + "oldCurrent");
    else localStorage.setItem(WRITER_PREFIX + "oldCurrent", storedCurrent);
    return true;}

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

function ibMakeDraggable(element, handleSelector, storageKey = null, excludeSelector = ".ibModalClose") {
    if (!element) return;
    const handle = element.querySelector(handleSelector);
    if (!handle) return;
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let previousTransition = "";
    const getPositionKey = () => {
        const key = typeof storageKey === "function" ? storageKey() : storageKey;
        return key ? WRITER_PREFIX + key : null;};
    const positionKey = getPositionKey();
    const savedLeft = positionKey ? sessionStorage.getItem(positionKey + "Left") : null;
    const savedTop = positionKey ? sessionStorage.getItem(positionKey + "Top") : null;
    if (savedLeft && savedTop) {
        element.style.left = savedLeft;
        element.style.top = savedTop;
        element.style.transform = "none";}
    handle.addEventListener("mousedown", event => {
        if (excludeSelector && event.target instanceof Element && event.target.closest(excludeSelector)) return;
        const rect = element.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        previousTransition = element.style.transition;
        element.style.transition = "none";
        element.style.left = `${rect.left}px`;
        element.style.top = `${rect.top}px`;
        element.style.transform = "none";
        dragging = true;
        handle.classList.add("dragging");
        event.preventDefault();});
    document.addEventListener("mousemove", event => {
        if (!dragging) return;
        element.style.left = `${event.clientX - offsetX}px`;
        element.style.top = `${event.clientY - offsetY}px`;});
    document.addEventListener("mouseup", () => {
        if (!dragging) return;
        dragging = false;
        const activePositionKey = getPositionKey();
        if (activePositionKey) {
            sessionStorage.setItem(activePositionKey + "Left", element.style.left);
            sessionStorage.setItem(activePositionKey + "Top", element.style.top);}
        handle.classList.remove("dragging");
        element.style.transition = previousTransition;});}

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

async function clearWorkspace() {
    localStorage.removeItem(WRITER_PREFIX + "Stage");
    localStorage.removeItem(WRITER_PREFIX + "Current");
    session.remove("Undo");
    session.remove("Redo");
    await db.clear();}

/* Chargement d'un zip pour mettre son contenu dans le localStorage et le indexedDB */
async function ouvrirStageDepuisZip(source) {
    const zip = await JSZip.loadAsync(source);
    const content = zip.file("content.json");
    if (!content) throw new Error("content.json introuvable");
    const json = await content.async("string");
    const stage = JSON.parse(json);
    if (!stage || typeof stage !== "object" || Array.isArray(stage) || !Array.isArray(stage.Ateliers)
        || stage.Ateliers.some(atelier => !atelier || !Array.isArray(atelier.Exercices))) {
        throw new Error("Le fichier ne contient pas un stage ibCAN valide.");}
    await checkStoredStage();
    await clearWorkspace();
    localStorage.setItem(WRITER_PREFIX + "Stage", json);
    if (stage.Ateliers.length === 1 && stage.Ateliers[0].Exercices.length === 1) localStorage.setItem(WRITER_PREFIX + "Current", JSON.stringify({Atelier: stage.Ateliers[0].Id, Exercice: stage.Ateliers[0].Exercices[0].Id, Contenu: stage.Ateliers[0].Exercices[0].Contenu}));
    else localStorage.setItem(WRITER_PREFIX + "Current", JSON.stringify({Atelier: 0, Exercice: 0, Contenu: stage.Introduction}));
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
                if (!database.objectStoreNames.contains(DB_STORE)) database.createObjectStore(DB_STORE, { keyPath: "path" });
                if (!database.objectStoreNames.contains(OLD_DB_STORE)) database.createObjectStore(OLD_DB_STORE, {keyPath: "path"});};
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
    async clearWorkspaceFiles() {
        const database = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction([DB_STORE, OLD_DB_STORE], "readwrite");
            transaction.objectStore(DB_STORE).clear();
            transaction.objectStore(OLD_DB_STORE).clear();
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error || new Error("La suppression des fichiers du stage a échoué."));});},
    async snapshotFiles() {
        const database = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction([DB_STORE, OLD_DB_STORE], "readwrite");
            const files = transaction.objectStore(DB_STORE);
            const oldFiles = transaction.objectStore(OLD_DB_STORE);
            const request = files.getAll();
            request.onsuccess = () => {
                oldFiles.clear();
                request.result.forEach(file => oldFiles.put(file));};
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error || new Error("La sauvegarde des fichiers du stage a échoué."));});},
    async restoreSnapshotFiles() {
        const database = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction([DB_STORE, OLD_DB_STORE], "readwrite");
            const files = transaction.objectStore(DB_STORE);
            const oldFiles = transaction.objectStore(OLD_DB_STORE);
            const request = oldFiles.getAll();
            request.onsuccess = () => {
                files.clear();
                request.result.forEach(file => files.put(file));};
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error || new Error("La restauration des fichiers du stage a échoué."));});},
    async clearSnapshotFiles() {
        const database = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(OLD_DB_STORE, "readwrite");
            transaction.objectStore(OLD_DB_STORE).clear();
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error || new Error("La suppression de la sauvegarde des fichiers du stage a échoué."));});},
    async getUrl(path) {
    const blob = await this.read(path);
    if (!blob) return null;
    return URL.createObjectURL(blob);},
    releaseUrl(url) {
       URL.revokeObjectURL(url);},
    async find(prefix) {
        const files = await this.list();
        return files.find(path => path.startsWith(prefix)) ?? null;}};
    
    /* Gestion des variables système pour éditeur et preview */
    function systemVariableRefresh() {
            const siteUrl = window.location.origin +  window.location.pathname.replace(/\/writer\/?.*$/i, "");
            Object.values(SYSTEM_VARIABLES).forEach(variable => {
            variable.defaut = variable.defaut.replaceAll("[site_url]", siteUrl).replaceAll("[stage]", Stage.Reference);});}
