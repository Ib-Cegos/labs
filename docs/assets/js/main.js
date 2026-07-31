function ibCopy(texte) {
    navigator.clipboard.writeText(texte); }

async function ibCopy(text, button) {
    await navigator.clipboard.writeText(text);
    button.classList.add("ok");
    setTimeout( () => button.classList.remove("ok"), 1500 );}

document.addEventListener( "DOMContentLoaded", () => {
        document
            .querySelectorAll(".ibLabTask")
            .forEach(task => {
                task.addEventListener( "click", () => { task.classList.toggle("done"); });
            });});