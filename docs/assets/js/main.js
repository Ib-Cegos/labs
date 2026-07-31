console.log("Ateliers ib Cegos");
function ibCopy(texte) {
    navigator.clipboard.writeText(texte);
    console.log(texte);
}

async function ibCopy(text, button) {
    await navigator.clipboard.writeText(text);
    button.classList.add("ok");
    setTimeout(
        () => button.classList.remove("ok"),
        1500
    );
}