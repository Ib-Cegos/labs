function ibCopy(texte) {
    navigator.clipboard.writeText(texte); }

async function ibCopy(text, button) {
    await navigator.clipboard.writeText(text);
    button.classList.add("ok");
    setTimeout( () => button.classList.remove("ok"), 1500 );}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        const tasks = Array.from( document.querySelectorAll(".ibLabTask") );
    /* Restauration de l'état */
        tasks.forEach(task => { if ( localStorage.getItem(task.id) === "true" ) { task.classList.add("done"); }});
    /* Gestion du clic */
        tasks.forEach((task, index) => { task.addEventListener("click", event => {
        if ( event.clientX > (task.getBoundingClientRect()).left + (parseFloat( getComputedStyle(task).fontSize ) * 3) ) { return; }
        if (task.classList.contains("done")) {
            for ( let i = index; i < tasks.length; i++) { tasks[i].classList.remove("done"); localStorage.removeItem(tasks[i].id);}}
        else {
            for ( let i = 0; i <= index; i++) { tasks[i].classList.add("done"); localStorage.setItem( tasks[i].id,"true");}}});})});

document.addEventListener(
    "DOMContentLoaded",
    () => {
        const panel = document.getElementById( "ibSettingsPanel" );
        document.getElementById( "ibSettingsButton" ).addEventListener( "click", () => panel.classList.toggle( "open" ));
        document.getElementById( "ibSettingsClose"  ).addEventListener( "click", () => panel.classList.remove( "open" ));});            