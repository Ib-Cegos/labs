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