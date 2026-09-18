let DragData = null;
let previewWindow = null;
let scrollTimer = null;
let UndoStack = [];
let RedoStack = [];
let toolBarOpened = session.read('ToolOpen',false);
const UndoLimit = 20;

/*COnservation/reprise du curseur */
const selection = {
    start: 0,
    end: 0,
    save() {
        this.start = textareaSync.selectionStart;
        this.end = textareaSync.selectionEnd;},
    restore(start = this.start, end = this.end) {
        textareaSync.focus();
        textareaSync.setSelectionRange(start, end);
        this.start = start;
        this.end = end;}};

function restoreEditorState(state) {
    Current.Atelier = state.atelier;
    Current.Exercice = state.exercice;
    chargerExercice();
    afficherExercice();
    textareaSync.value = state.text;
    selection.restore(state.start, state.end);
    Current.Contenu = state.text;
    storage.write("Current",Current);
    refreshUndoButtons();
    refreshEditor();}

function saveUndoStacks() {
    session.write("Undo", UndoStack);
    session.write("Redo", RedoStack);
    refreshUndoButtons();}    

function undoLastAction() {
    const state = UndoStack.pop();
    if (!state) return;
    RedoStack.push({ action: state.action, timeStamp: Date.now(), atelier: Current.Atelier, exercice: Current.Exercice, text: textareaSync.value, start: textareaSync.selectionStart, end: textareaSync.selectionEnd});
    if (RedoStack.length > UndoLimit) RedoStack.shift();
    saveUndoStacks();
    restoreEditorState(state);}

function redoLastAction() {
    const state = RedoStack.pop();
    if (!state) return;
    UndoStack.push({ action: state.action, timeStamp: Date.now(), atelier: Current.Atelier, exercice: Current.Exercice, text: textareaSync.value, start: textareaSync.selectionStart, end: textareaSync.selectionEnd});
    saveUndoStacks();
    restoreEditorState(state);}    

function saveUndoState(action = "") {
    RedoStack = [];
    UndoStack.push({action: action, timeStamp: Date.now(), atelier: Current.Atelier, exercice: Current.Exercice, text: textareaSync.value, start: textareaSync.selectionStart, end: textareaSync.selectionEnd});
    if (UndoStack.length > UndoLimit) UndoStack.shift();
    saveUndoStacks();}

function refreshUndoButtons() {
    const undo = document.getElementById("btnUndo");
    const redo = document.getElementById("btnRedo");
    if (UndoStack.length === 0) undo.style.display = "none";
    else {
        undo.style.display = "flex";
        undo.title = `Annuler : ${UndoStack.at(-1).action}`;}
    if (RedoStack.length === 0) redo.style.display = "none";
    else {
        redo.style.display = "flex";
        redo.title = `Refaire : ${RedoStack.at(-1).action}`;}} 

function openPreview() {
    if (!previewWindow || previewWindow.closed) previewWindow = window.open("preview.html","Preview","width=1200,height=800,resizable=yes");
    else previewWindow.focus();
    // Attendre un peu que la preview soit chargée
    setTimeout(() => { syncPreviewScroll();}, 500);}

/* Déplacement des éléments dans la page */
function makeDraggable(elementId, handleSelector, storageKey) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const handle = element.querySelector(handleSelector);
    if (!handle) return;
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    const savedLeft = sessionStorage.getItem(IB_PREFIX + "Writer" + storageKey + "Left");
    const savedTop =  sessionStorage.getItem(IB_PREFIX + "Writer" + storageKey + "Top");
    if (savedLeft && savedTop) {
        element.style.left = savedLeft;
        element.style.top = savedTop;
        element.style.transform = "scale(1)";}
    handle.addEventListener("mousedown", event => {
        dragging = true;
        const rect = element.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        element.style.left = `${rect.left}px`;
        element.style.top = `${rect.top}px`;
        element.style.transform = "scale(1)";
        event.preventDefault(); });
    document.addEventListener("mousemove", event => {
        if (!dragging) return;
        element.style.left = `${event.clientX - offsetX}px`;
        element.style.top = `${event.clientY - offsetY}px`; });
    document.addEventListener("mouseup", () => {
        if (!dragging) return;
        dragging = false;
        sessionStorage.setItem(IB_PREFIX + "Writer" + storageKey + "Left", element.style.left);
        sessionStorage.setItem(IB_PREFIX + "Writer" + storageKey + "Top",element.style.top);});}        

/* Gestion des fenêtres modales */
const dialog = {
    show(title, content, buttons = [], size = '') {
        selection.save();
        if (toolBarOpened) document.getElementById("ibWriterStyleBar").style.display = "none";
        document.getElementById("ibWriterDialogTitle").innerHTML = title;
        document.getElementById("ibWriterDialogContent").innerHTML = content;
        document.getElementById("ibWriterDialogOverlay").style.display = "flex";
        const modal =document.getElementById("ibWriterDialog");
        if (size == 'small') modal.classList.add ('ibModalSmall');
        else modal.classList.remove ('ibModalSmall');
        if (!sessionStorage.getItem(IB_PREFIX + "WriterDialogLeft")) {
            const rect =modal.getBoundingClientRect();
            modal.style.left = `${rect.left}px`;
            modal.style.top =  `${rect.top}px`;
            modal.style.transform = "scale(1)";}
        document.getElementById("ibWriterDialog").classList.add("ibModalOpen");
        const footer = document.getElementById("ibWriterDialogButtons");
        footer.innerHTML = "";
        buttons.forEach(button => {
            const element = document.createElement("button");
            element.textContent = button.label;
            element.addEventListener("click",button.action);
            element.className = button.className || "ibDialogButton";
            footer.appendChild(element);});
        if (buttons.length == 0) document.getElementById("ibWriterDialogButtons").style.display = "none";
        else document.getElementById("ibWriterDialogButtons").style.display = "flex";},
    close() {
        if (toolBarOpened) document.getElementById("ibWriterStyleBar").style.display = "flex";
        document.getElementById("ibWriterDialogOverlay").style.display = "none";
        selection.restore();}};

/* Synchonisation de la consultation de la preview */
function syncPreviewScroll() {
    if (!previewWindow || previewWindow.closed) return;
    const maxScroll = textareaSync.scrollHeight - textareaSync.clientHeight;
    const percent = maxScroll > 0 ? textareaSync.scrollTop / maxScroll : 0;
    previewWindow.postMessage({ type: "scroll", percent: percent }, "*");}
function syncCursor() {
    if (!previewWindow || previewWindow.closed) return;
    const percent = textareaSync.selectionStart / textareaSync.value.length;
    previewWindow.postMessage({type: "cursor", percent}, "*");}

function getAtelierLabel(atelier) {
    return atelier.Titre ? `Atelier ${atelier.Id} : ${atelier.Titre}` : `Atelier ${atelier.Id}`;}

function getExerciceLabel(exercice) {
    return exercice.Titre ? `Exercice ${exercice.Id} : ${exercice.Titre}` : `Exercice ${exercice.Id}`;}
    
function clearDropIndicators(element) {
    element.classList.remove("writerNavDropBefore", "writerNavDropAfter");}

function exporterStage() {
    majStage();
    const json = JSON.stringify(Stage,null,2);
    const blob = new Blob([json],{ type: "application/json" });
    const url = URL.createObjectURL(blob);
    const lien = document.createElement("a");
    lien.href = url;
    lien.download = `${Stage.Reference || "stage"}-edit.json`;
    lien.click();
    URL.revokeObjectURL(url); }

function majStage() {
    if (Current.Atelier == 0) Stage.Introduction = Current.Contenu;
    else {
        const atelier = Stage.Ateliers.find(a => a.Id == Current.Atelier);
        const exercice = atelier.Exercices.find(e => e.Id == Current.Exercice);
        exercice.Contenu = Current.Contenu; }
    storage.write('Stage', Stage); }

function renumberStage() {
    /* Renumérotation des exercices/ateliers du stage (après ajout/Suppression/déplacement) et mise à jour de l'Id Current */
    Stage.Ateliers.forEach((atelier, atelierIndex) => {
        atelier.Id = atelierIndex + 1;
        atelier.Exercices.forEach((exercice, exerciceIndex) => {exercice.Id = exerciceIndex + 1;});});
    for (const atelier of Stage.Ateliers) {
        const exercice = atelier.Exercices.find(e => e._restoreCurrent);
        if (exercice) {
            Current.Atelier = atelier.Id;
            Current.Exercice = exercice.Id;
            delete exercice._restoreCurrent;
            storage.write('Current',Current);
        break;}}}

function sortStage() {
    Stage.Ateliers.sort((a, b) => a.Id - b.Id);
    Stage.Ateliers.forEach(atelier => {
        atelier.Exercices.sort((a, b) => a.Id - b.Id);});}

function construireNavigation() {
    const nav = document.getElementById("writerNavigation");
    let html = '<div id ="writerNavIntroduction">Introduction</div>';
    Stage.Ateliers.forEach(atelier => {
        html += `<div class="writerNavAtelier" data-atelier="${atelier.Id}" draggable="true">📂 Atelier ${atelier.Id}</div>`;
        atelier.Exercices.forEach(exercice => {
            html += `<div class="writerNavExercice" data-atelier="${atelier.Id}" data-exercice="${exercice.Id}" draggable="true">📄 Exercice ${exercice.Id}</div>`;});});
    nav.innerHTML = html;
    document.getElementById("writerNavIntroduction").addEventListener("click", () => {selectIntroduction();});
    document.querySelectorAll(".writerNavExercice").forEach(lien => {
        lien.addEventListener("click", () => {
            const atelier = parseInt(lien.dataset.atelier);
            const exercice = parseInt(lien.dataset.exercice);
            selectExercice(atelier,exercice);});
        lien.addEventListener("dragstart", event => {DragData = {type: "exercice", aSource : parseInt(lien.dataset.atelier) -1, eSource : parseInt(lien.dataset.exercice) -1};});
        lien.addEventListener("dragover", event => {
            if (DragData.type !== "exercice") return;
            event.preventDefault();
            const rect = lien.getBoundingClientRect();
            const eTarget = parseInt(lien.dataset.exercice) - 1;
            const aTarget = parseInt(lien.dataset.atelier) - 1;
            if ( DragData.aSource === aTarget && DragData.eSource === eTarget) {
                clearDropIndicators(lien);
                return;}
            const before = event.clientY < rect.top + rect.height / 2;
            clearDropIndicators(lien);
            lien.classList.add(before ? "writerNavDropBefore" : "writerNavDropAfter");        });
        lien.addEventListener("drop", event => {
            if (DragData.type !== "exercice") return;
            event.preventDefault();
            const eTarget = parseInt(lien.dataset.exercice) - 1;
            const aTarget = parseInt(lien.dataset.atelier) - 1;
            const rect = lien.getBoundingClientRect();
            const before = event.clientY < rect.top + rect.height / 2;
            clearDropIndicators(lien);
            moveExercice(DragData.aSource, aTarget, DragData.eSource, eTarget, before);});
        lien.addEventListener("dragleave", () => {clearDropIndicators(lien);});});
    document.querySelectorAll(".writerNavAtelier").forEach(element => {
        element.addEventListener("dragstart", event => {
            DragData = {type: "atelier", source : parseInt(element.dataset.atelier) -1};});
        element.addEventListener("dragover", event => {
            if (DragData.type !== "atelier") return;
            event.preventDefault();
            const rect = element.getBoundingClientRect();
            const target = parseInt(element.dataset.atelier) - 1;
            if (DragData.source === target) {
                clearDropIndicators(element);
                return;}
            const before = event.clientY < rect.top + rect.height / 2;
            clearDropIndicators(element);
            element.classList.add(before ? "writerNavDropBefore" : "writerNavDropAfter");        });
        element.addEventListener("drop", event => {
            if (DragData.type !== "atelier") return;
            event.preventDefault();
            const target = parseInt(element.dataset.atelier) - 1;
            const rect = element.getBoundingClientRect();
            const before = event.clientY < rect.top + rect.height / 2;
            clearDropIndicators(element);
            moveAtelier(DragData.source,target,before);});
        element.addEventListener("dragleave", () => {clearDropIndicators(element);});});}

/* Adaptation du contenu aux header et footer */
function resizeWriter() {
    const header = document.getElementById("ibHeader");
    const footer = document.getElementById("ibFooter");
    const writerMain = document.getElementById("writerMain");
    const hauteur = window.innerHeight - header.offsetHeight - footer.offsetHeight;
    writerMain.style.height = `${hauteur}px`;
    writerMain.style.marginTop = `${header.offsetHeight}px`;}
window.addEventListener("resize", resizeWriter);
resizeWriter();

function chargerExercice() {
    if (Current.Atelier == 0) { Current.Contenu = Stage.Introduction; }
    else {
        const exercice = getCurrentExercice();
        if (exercice) { Current.Contenu = exercice.Contenu; }}
    UndoStack = session.read("Undo", []);
    RedoStack = session.read("Redo", []);
    refreshUndoButtons();
    storage.write("Current", Current);}

function afficherExercice() {
    /* Intègre l'affichage de l'exercice sélectionné */
    document.querySelectorAll(".writerNavExercice").forEach(lien => {
        if ( lien.dataset.atelier != Current.Atelier || lien.dataset.exercice != Current.Exercice) { lien.classList.remove("writerNavSelected");}
        else {lien.classList.add("writerNavSelected");}});
    if (Current.Atelier == 0) {
        if (Stage.Ateliers.length == 1 && Stage.Ateliers[0].Exercices.length == 1) document.getElementById("btnAddSommaire").style.display = "none";
        else document.getElementById("btnAddSommaire").style.display = "flex";
        document.getElementById("btnAddExercice").style.display = "none";
        document.getElementById("writerNavIntroduction").classList.add("writerNavSelected");
        document.getElementById("ExerciceHeader").style.display = "none";
        document.getElementById("btnDeleteExercice").style.display = "none";
        document.getElementById("btnDeleteAtelier").style.display = "none";}
    else {
        if (Stage.Ateliers.length <= 1) document.getElementById("btnDeleteAtelier").style.display = "none";
        else document.getElementById("btnDeleteAtelier").style.display = "flex";
        document.getElementById("btnAddSommaire").style.display = "none";
        document.getElementById("btnAddExercice").style.display = "flex";
        document.getElementById("writerNavIntroduction").classList.remove("writerNavSelected");
        document.getElementById("ExerciceHeader").style.display = "flex";
        const atelier = getCurrentAtelier();
        if (atelier.Exercices.length <= 1)  document.getElementById("btnDeleteExercice").style.display = "none";
        else document.getElementById("btnDeleteExercice").style.display = "flex";
        const exercice = getCurrentExercice();
        document.getElementById("writerAtelierTitle").value = atelier.Titre;
        document.getElementById("writerExerciceTitle").value = exercice.Titre;
        document.getElementById("writerExerciceLength").value = exercice.Duree;}
    /* Signaler les champs vides */
    document.querySelectorAll("#ibHeader input, #ExerciceHeader input").forEach(field => validateField(field));
    document.getElementById("writerContenu").value = Current.Contenu;}

function toggleVariableType(name,button) {
    const variable = Stage.Variables[name];
    const infoRow = document.getElementById("variableInfo-" + name);
    if (variable.lib !== undefined) {
        variable.draftLib = variable.lib;
        delete variable.lib;
        if (infoRow) infoRow.style.display = "none";
        button.textContent = "🔒"; }
    else {
        if (!variable.draftLib) variable.lib = "Libellé";
        else {
            variable.lib = variable.draftLib;
            delete variable.draftLib;}
        if (!variable.aide) variable.aide = "Texte d'aide";
        if (infoRow) infoRow.style.display = "table-row";
        button.textContent = "👤";}
    infoRow.innerHTML = `<td colspan="5"><div class="variableLib">${variable.lib}</div><div class="variableHelp">${variable.aide}</diV></td>`;
    storage.write("Stage", Stage);}

function refreshVariableEditor() {
    const editable = document.getElementById("variableEditable").checked;
    document.getElementById("variableEditableFields").style.display = editable ? "block" : "none";
    document.querySelector('label[for="variableDefault"]').innerHTML=editable ? 'Valeur par défaut' : 'Valeur';
    if (editable) {
        if (!document.getElementById("variableLib").value) document.getElementById("variableLib").value = "Libellé";
        if (!document.getElementById("variableHelp").value) document.getElementById("variableHelp").value = "";} }

function saveVariable() {
    /* Ajouter les éventuels mots interdits comme noms de variables ligne suivante */
    const reservedNames = [ "sommaire"];
    const variName = document.getElementById("variableName");
    const variLib = document.getElementById("variableLib");
    const editable = document.getElementById("variableEditable").checked;
    const oldName = (variName.dataset.oldname || "").toLowerCase();
    const newName = variName.value.toLowerCase();
    const variableExists = Object.keys(Stage.Variables).some(v => v.toLowerCase() === newName);
    let saveError = false;
    variName.classList.remove('ibMissing');
    variName.title = "";
    variLib.title = "";
    variLib.classList.remove('ibMissing');
    if (variableExists && oldName !== newName) {
        variName.classList.add('ibMissing');
        variName.title = "Le nom d'une variable doit être unique dans le stage.";
        saveError=true;}
    if (reservedNames.includes(variName.value.toLowerCase())) {
        variName.classList.add('ibMissing');
        variName.title=`Désolé, le terme ${variName.value} est réservé !`;
        saveError=true}
    if (!variName.value.trim() ) {
        variName.classList.add('ibMissing');
        variName.title="Le nom ne peut être vide !";
        saveError=true}
    if (!/^[A-Za-z][A-Za-z0-9-]*$/.test(variName.value)) {
        variName.classList.add('ibMissing');
        variName.title="Le nom doit commencer par une lettre et ne contenir que des lettres, des tirets '-' et des chiffres.";
        saveError=true;}
    if (editable && !variLib.value.trim()) {
        variLib.classList.add('ibMissing');
        variLib.title = "Une variable éditable doit posséder un libellé.";
        saveError=true;}
    if (saveError) return;
    let vari = {
        name : variName.value,
        defaut : document.getElementById("variableDefault").value,
        lib : variLib.value,
        aide : document.getElementById("variableHelp").value}
    if (!editable) delete vari.lib;
    if (variName.dataset.oldname && variName.dataset.oldname !== variName.value) delete Stage.Variables[variName.dataset.oldname];
    Stage.Variables[vari.name] = vari;
    storage.write("Stage", Stage);
    updateStyleBar();
    openVariables();}

function deleteVariable(name) {
    let html =  `<p>Supprimer la variable "${name}" ?</p>`
    const regex = new RegExp(`\\[${name}\\]`,"gi");
    let count = 0;
    let countLib = null;
    if (Stage.Introduction) {
        const matches = Stage.Introduction.match(regex);
        if (matches) {
            count += matches.length;
            countLib = "l'introduction";}}
    Stage.Ateliers.forEach(atelier => {
        atelier.Exercices.forEach(exercice => {
            const matches = exercice.Contenu.match(regex);
            if (matches) {
                count += matches.length;
                countLib = `l'exerice ${exercice.Id} de l'atelier ${atelier.Id}`}});});
    if (count == 1) html += `<p>Attention, l'occurence du terme [${name}] dans ${countLib} du stage ne sera pas supprimée...</p>`;
    if (count > 1) html += `<p>Attention, les ${count} occurences du terme [${name}] dans les ateliers du stage ne seront pas supprimées...</p>`;
    dialog.show("Suppression",html, [{label : "Annuler", action : () => openVariables()}, {label : "Supprimer", action : () => { delete Stage.Variables[name]; storage.write("Stage",Stage); updateStyleBar(); openVariables();}, className : "ibDialogButtonDelete"}],'small');}    

function editVariable(name = null) {
    let vari = null;
    let dialogTitle = "Modifier une variable"
    if (name === null) {
        dialogTitle= "Ajout d'une variable";
        vari = {name : '', defaut : '', aide: ''};}
    else {
        vari = Stage.Variables[name];
        vari.name = name;}
    const variableForm = `
    <div class="variableEditor">
        <div class="variableField"><label>Nom</label><input id="variableName" value="${vari.name}" onchange="document.getElementById('variableNameSample').innerText=this.value;" data-oldname="${vari.name}">
            <span class="variableHint">Le nom doit être unique, commencer par une lettre et ne contenir que des caractères alphanumériques. Il sera utilisé dans le contenu sous la forme [<span id="variableNameSample">${vari.name}</span>].</span></div>
        <div class="variableField"><label for="variableDefault">Valeur${vari.lib ? ' par défaut' : ''}</label><input id="variableDefault" value="${vari.defaut}"></div>
        <div class="variableEditableCheck"><input type="checkbox" id="variableEditable" ${vari.lib ? 'checked' : ''} onchange = "refreshVariableEditor();"><label for="variableEditable">Variable éditable 👤</label></div>
        <div id="variableEditableFields" style="display:${vari.lib ? 'block' : 'none'};">
            <div class="variableField"><label>Libellé</label><input id="variableLib" value="${vari.lib || 'Libellé'}"></div>
            <div class="variableField"><label>Aide</label><textarea id="variableHelp">${vari.aide || ''}</textarea></div>
        </div></div>`;
    dialog.show(dialogTitle, variableForm, [{label : "Enregistrer", action : () => saveVariable()}, {label : "Annuler",action : () => openVariables()}, {label : "Fermer",action : () => dialog.close()}]);
    setTimeout(() => document.getElementById("variableName")?.focus(),0);}

function openVariables() {
    let html = '<table class="variableTable"><tbody>';
    Object.entries(Stage.Variables).forEach(([name, variable], index) => {
        const rowStyle = index % 2 === 0 ? "variableOdd" : "variableEven";
        html += `<tr class="variableRow ${rowStyle}"><td class= "variableName">${name}</td><td class="variableDefault">${variable.defaut || ""}</td><td class="variableEditable"><button class="variableStyle" onclick="toggleVariableType('${name}',this)">${variable.lib ? '👤' : '🔒'}</button></td><td class="variableActions"><button class="variableEdit" onclick="editVariable('${name}');">✏️</button></td><td class="variableActions"><button class="ibDeleteButton" title="Supprimer la variable '${name}'" style="display: flex;" onclick="deleteVariable('${name}');">✖</button></td></tr>`;
        html += `<tr class="variableRowInfo ${rowStyle}" id ="variableInfo-${name}" style="display:${variable.lib ? 'table-row' : 'none'}"><td colspan="5"><div class="variableLib">${variable.lib}</div><div class="variableHelp">${variable.aide}</diV></td></tr>`;
    });
    html += '</tbody></table>';
    dialog.show("Variables", html, [{label : "Ajouter", action : () => editVariable() }, { label : "Fermer", action : () => dialog.close()}]);}

function updateStyleBar() {
    const btn = document.getElementById("styleBarVarButton");
    const variables = Object.keys(Stage.Variables || {});
    btn.dataset.variableCount = variables.length;
    if (variables.length === 0) btn.style.display = "none";
    else btn.style.display = "";
    if (variables.length === 1) btn.title = `Insérer [${variables[0]}]`;
    else btn.title = "Insérer une variable";}    

function selectExercice(atelier, exercice) {
    if (atelier == Current.Atelier && exercice == Current.Exercice) return;
    majStage();
    Current.Atelier = atelier;
    Current.Exercice = exercice;
    chargerExercice();
    afficherExercice(); }

function selectIntroduction() {
    if (Current.Atelier == 0) return;
    majStage();
    Current.Atelier = 0;
    Current.Exercice = 0;
    chargerExercice();
    afficherExercice(); }

function validateField(field) {
    field.classList.toggle("ibMissing",field.value.trim() === "");}
    
/* Ajout / Suppression / déplacement des Ateliers */
function addAtelier() {
    Stage.Ateliers.push({Id: 0, Titre: "",Exercices: [{Id: 1, Titre: "", Duree: "",Contenu: ""}]});
    renumberStage();
    storage.write("Stage", Stage);
    construireNavigation();
    Current.Atelier = Stage.Ateliers.at(-1).Id;
    Current.Exercice = 1;
    chargerExercice();
    afficherExercice();}
function deleteAtelier() {
    if (Stage.Ateliers.length <= 1) {
        dialog.show( "Suppression impossible", "<p>Le stage doit contenir au moins un atelier.</p>", [], "small");
        return;}
    const index = Stage.Ateliers.findIndex(a => a.Id == Current.Atelier);
    Stage.Ateliers.splice(index, 1);
    renumberStage();
    storage.write("Stage", Stage);
    const nextIndex = Math.min(index,Stage.Ateliers.length - 1);
    Current.Atelier = Stage.Ateliers[nextIndex].Id;
    Current.Exercice = Stage.Ateliers[nextIndex].Exercices[0].Id;
    chargerExercice();
    construireNavigation();
    afficherExercice();}
function confirmDeleteAtelier() {
    const atelier =getCurrentAtelier();
    dialog.show("Supprimer l'atelier",
        `<p>Supprimer "${getAtelierLabel(atelier)}" ?</p><p>Tous les exercices de cet atelier seront supprimés.</p>`, [{label : "Annuler", action : () => dialog.close()},{label : "Supprimer", className : "ibDialogButtonDelete", action : () => {deleteAtelier(); dialog.close();}}],"small");}
function moveAtelier(aSource,aTarget,before = false, confirmed = false) {
    if (aSource === aTarget) return;
    const atelier = Stage.Ateliers[aSource];
    const target = Stage.Ateliers[aTarget];
    const position = before ? "avant" : "après";
    if (!confirmed) {
        dialog.show("Déplacer l'atelier", `Déplacer "${getAtelierLabel(atelier)}" ${position} "${getAtelierLabel(target)}" ?`, [{label : "Annuler", action : () => {dialog.close();}},{label : "Déplacer",action : () => {dialog.close(); moveAtelier(aSource,aTarget,before,true)}}],"small");
        return;}
    const exercice = getCurrentExercice();
    if (exercice) exercice._restoreCurrent = true;
    let insertIndex = aTarget;
    if (!before) { insertIndex++; }
    if (aSource < aTarget) insertIndex--;
    Stage.Ateliers.splice(aSource, 1);
    Stage.Ateliers.splice(insertIndex, 0, atelier);
    renumberStage();
    chargerExercice();
    storage.write("Stage", Stage);
    construireNavigation();
    afficherExercice();}

/* Ajout / Suppression / déplacement des Exercices */
function addExercice() {
    const atelier = getCurrentAtelier();
    if (!atelier) return;
    atelier.Exercices.push({ Id: 0, Titre: "", Duree: "", Contenu: ""});
    renumberStage();
    storage.write("Stage", Stage);
    construireNavigation();
    Current.Exercice = atelier.Exercices.at(-1).Id;
    chargerExercice();
    afficherExercice();}
function deleteExercice() {
    const atelier = getCurrentAtelier();
    if (!atelier) return;
    if (atelier.Exercices.length <= 1) {
        dialog.show("Suppression impossible", "<p>Un atelier doit contenir au moins un exercice.</p>", [], "small" );
        return;}
    const index = atelier.Exercices.findIndex(e => e.Id == Current.Exercice);
    atelier.Exercices.splice(index, 1);
    renumberStage();
    storage.write("Stage", Stage);
    const nextIndex = Math.min(index, atelier.Exercices.length - 1);
    Current.Exercice =  atelier.Exercices[nextIndex].Id;
    chargerExercice();
    construireNavigation();
    afficherExercice();}
function confirmDeleteExercice() {
    const exercice = getCurrentExercice();
    dialog.show("Supprimer l'exercice",`<p>Supprimer "${getExerciceLabel(exercice)}" ?</p>`, [{label : "Annuler", action : () => dialog.close()}, {label : "Supprimer",className: "ibDialogButtonDelete", action : () => { deleteExercice(); dialog.close(); }}], 'small');}
function moveExercice(aSource, aTarget, eSource, eTarget, before = false, confirmed = false) {
    if (aSource === aTarget && eSource === eTarget) return;
    const atelierSource = Stage.Ateliers[aSource];
    const atelierTarget = Stage.Ateliers[aTarget];
    const exercice = atelierSource.Exercices[eSource];
    const target = atelierTarget.Exercices[eTarget];
    const position = before ? "avant" : "après";
    const deleteSourceAtelier = aSource !== aTarget && atelierSource.Exercices.length === 1;
    let message = `Déplacer "${getExerciceLabel(exercice)}" ${position} "${getExerciceLabel(target)}"`;
    if (aSource !== aTarget) {message += ` dans "${getAtelierLabel(atelierTarget)}"`;}
    message += " ?";
    if (deleteSourceAtelier) {message += "<br><br><b>L'atelier source vide sera automatiquement supprimé.</b>";}
    if (!confirmed) {
        dialog.show("Déplacer l'exercice", message, [{label: "Annuler", action: () => dialog.close()},{label: "Déplacer", action: () => {dialog.close();moveExercice(aSource,aTarget,eSource,eTarget,before,true);}}], "small");
        return;}
    const current = getCurrentExercice();
    if (current) current._restoreCurrent = true; 
    let insertIndex = eTarget;
    if (!before) insertIndex++;
    if ( aSource === aTarget && eSource < eTarget ) insertIndex--;
    atelierSource.Exercices.splice(eSource, 1);
    atelierTarget.Exercices.splice(insertIndex, 0, exercice);
    if (aSource !== aTarget && atelierSource.Exercices.length === 0) Stage.Ateliers.splice(aSource, 1);
    renumberStage();
    chargerExercice();
    storage.write("Stage", Stage);
    construireNavigation();
    afficherExercice();}

function insertSommaire() {
    if (Current.Atelier != 0) return;
    const marqueur = "{{ Sommaire() }}";
    const regexSommaire = /\{\{\s*sommaire\s*\(\s*\)\s*\}\}/i;
    let position = textareaSync.selectionStart;
    if (position == null) position = textareaSync.value.length;
    let contenu = textareaSync.value;
    const match = contenu.match(regexSommaire);
    let anciennePosition = -1;
    let positionCorrigee = 0;
    if (match) {
        anciennePosition = match.index;
        contenu = contenu.replace(regexSommaire, ""); }
    if (anciennePosition >= 0) {
        contenu = contenu.replace(marqueur,"");
        if (anciennePosition < position) positionCorrigee = position - marqueur.length;
        else positionCorrigee = position;}
    else positionCorrigee = position;
    contenu = contenu.slice(0, positionCorrigee) + marqueur + contenu.slice(positionCorrigee);
    saveUndoState("Ajout / Modification du Sommaire sur la page d'Introduction");
    textareaSync.value = contenu;
    Current.Contenu = contenu;
    Stage.Introduction = contenu;
    storage.write("Current", Current);
    storage.write("Stage", Stage);
    refreshEditor();
    selection.restore(positionCorrigee + marqueur.length);}

/* Gestion de la barre de style/insert */
function refreshEditor() {
    textareaSync.dispatchEvent(new Event("input"));}

function getSelectedTextInfo() {
    textareaSync.focus();
    const start = textareaSync.selectionStart;
    const end = textareaSync.selectionEnd;
    const text = textareaSync.value;
    let selected = text.substring(start, end);
    // Retire les espaces de fin
    const trimmed = selected.trimEnd();
    const spaces = selected.substring(trimmed.length);
    // Nombre d'astérisques en début et fin de sélection
    const leadingStars = (trimmed.match(/^\*+/)?.[0].length) || 0;
    const trailingStars = (trimmed.match(/\*+$/)?.[0].length) || 0;
    // Nombre d'astérisques à conserver
    const keepStars = Math.min(leadingStars, trailingStars);
    // Contenu sans les astérisques excédentaires
    const content = trimmed.substring(leadingStars, trimmed.length - trailingStars);
    // Reconstitution équilibrée
    selected = "*".repeat(keepStars) + content + "*".repeat(keepStars);
    return {start, end, text, selected, spaces};}

function toggleBold() {
    const { start, end, text, selected, spaces } = getSelectedTextInfo();
    if (!selected) {
        saveUndoState("Ajout d'un marqueur Gras");
        textareaSync.setRangeText("****", start, end, "end");
        selection.restore(start + 2);
        refreshEditor();
        return;}
    const tripleBefore = text.substring(start - 3, start);
    const tripleAfter  = text.substring(end, end + 3);
    const doubleBefore = text.substring(start - 2, start);
    const doubleAfter  = text.substring(end, end + 2);
    if (tripleBefore === "***" && tripleAfter === "***") {
        // ***texte*** -> *texte*
        saveUndoState("Suppression du marqueur Gras");
        textareaSync.setRangeText("*" + selected + "*" + spaces, start - 3, end + 3, "end");
        selection.restore(start - 2, start - 2 + selected.length);}
    else if (doubleBefore === "**" && doubleAfter === "**") {
        // **texte** -> texte
        saveUndoState("Suppression du marqueur Gras");
        textareaSync.setRangeText(selected + spaces, start - 2, end + 2, "end");
        selection.restore(start - 2, start - 2 + selected.length);}
    else {
        // texte -> **texte** ou *texte* -> ***texte***
        saveUndoState("Mise en Gras du texte");
        textareaSync.setRangeText("**" + selected + "**" + spaces, start, end, "end");
        selection.restore(start + 2, start + 2 + selected.length);}
    refreshEditor();}
    
function toggleItalic() {
    const { start, end, text, selected, spaces } = getSelectedTextInfo();
    if (!selected) {
        saveUndoState("Ajout d'un marqueur Italique");
        textareaSync.setRangeText("**", start, end, "end");
        selection.restore(start + 1);
        refreshEditor();
        return;}
    const tripleBefore = text.substring(start - 3, start);
    const tripleAfter  = text.substring(end, end + 3);
    const doubleBefore = text.substring(start - 2, start);
    const doubleAfter  = text.substring(end, end + 2);
    const singleBefore = text.substring(start - 1, start);
    const singleAfter  = text.substring(end, end + 1);
    if (tripleBefore === "***" && tripleAfter === "***") {
        // ***texte*** -> **texte**
        saveUndoState("Suppression du marqueur Italique");
        textareaSync.setRangeText("**" + selected + "**" + spaces, start - 3, end + 3, "end");
        selection.restore(start -1, start -1 + selected.length);}
    else if (singleBefore === "*" && singleAfter === "*" && !(doubleBefore === "**" && doubleAfter === "**")) {
        // *texte* -> texte
        saveUndoState("Suppression du marqueur Italique");
        textareaSync.setRangeText(selected + spaces, start - 1, end + 1, "end");
        selection.restore(start -1, start -1 + selected.length);}
    else {
        // texte -> *texte* ou **texte** -> ***texte***
        saveUndoState("Mise en Italique d'un texte");
        textareaSync.setRangeText("*" + selected + "*" + spaces, start, end, "end");
        selection.restore(start + 1, start + 1 + selected.length);}
    refreshEditor();}

function ensureBlankLines(start, end, content) {
    const text = textareaSync.value;
    const before = text.substring(0, start);
    const after  = text.substring(end);
    let prefix = "";
    let suffix = "";
    if (before.length > 0) {
        const breaks = (before.match(/\n*$/)?.[0].length) || 0;
        if (breaks < 2) prefix = "\n".repeat(2 - breaks);}
    if (after.length > 0) {
        const breaks = (after.match(/^\n*/)?.[0].length) || 0;
        if (breaks < 2) suffix = "\n".repeat(2 - breaks);}
    return prefix + content + suffix;}

function toggleCode() {
    textareaSync.focus();
    const start = textareaSync.selectionStart;
    const end = textareaSync.selectionEnd;
    const text = textareaSync.value;
    const selected = text.substring(start, end);
    // Aucune sélection -> bloc vide
    if (!selected) {
        saveUndoState("Ajout d'un bloc de code");
        const block = ensureBlankLines(start, end, "```\n\n```" );
        textareaSync.setRangeText(block, start, end, "end");
        const pos = start + block.indexOf("\n") + 1;
        selection.restore(pos);
        refreshEditor();
        return;}
    // Plusieurs lignes => bloc
    if (selected.includes("\n")) {
        saveUndoState("Transformation d'un texte en bloc de code");
        const block = ensureBlankLines(start, end, "```\n" + selected + "\n```");
        textareaSync.setRangeText(block, start, end, "end");
        selection.restore(start, start + block.length);
        refreshEditor();
        return;}
    // Une seule ligne => inline
    const before = text.substring(start - 1, start);
    const after = text.substring(end, end + 1);
    if (before === "`" && after === "`") {
        saveUndoState("Transformation d'un texte en code");
        textareaSync.setRangeText(selected, start - 1, end + 1, "end" );
        selection.restore(start - 1, start - 1 + selected.length);}
    else {
        saveUndoState("Transformation d'un texte en code");
        textareaSync.setRangeText("`" + selected + "`", start, end, "end");
        selection.restore(start + 1, start + 1 + selected.length);}
    refreshEditor();}

function setHeading(level) {
    textareaSync.focus();
    const prefix = "#".repeat(level) + " ";
    const pos = textareaSync.selectionStart;
    const text = textareaSync.value;
    const lineStart = text.lastIndexOf("\n", pos - 1) + 1;
    let lineEnd = text.indexOf("\n", pos);
    if (lineEnd === -1) lineEnd = text.length;
    let line = text.substring(lineStart, lineEnd);
    // retire un éventuel niveau existant
    line = line.replace(/^#{2,3}\s+/, "");
    const newLine = prefix + line;
    saveUndoState(`Transformation d'une ligne en ${level === 2 ? 'Titre de section' : 'Titre de sous-section'} `);
    textareaSync.setRangeText(newLine, lineStart, lineEnd, "end");
    selection.restore(lineStart + prefix.length);
    refreshEditor();}

function transformLines(transformer, isolateBlock = false) {
    textareaSync.focus();
    const start = textareaSync.selectionStart;
    const end = textareaSync.selectionEnd;
    const text = textareaSync.value;
    const blockStart = text.lastIndexOf("\n", start - 1) + 1;
    let blockEnd;
    if (start === end) blockEnd = text.indexOf("\n", start);
    else blockEnd = text.indexOf("\n", end);
    if (blockEnd === -1) blockEnd = text.length;
    const block = text.substring(blockStart, blockEnd);
    const result = transformer(block);
    const finalContent = isolateBlock ? ensureBlankLines(blockStart, blockEnd, result) : result;
    textareaSync.setRangeText(finalContent, blockStart, blockEnd, "end");
    const delta = finalContent.length - block.length;
    if (start === end) selection.restore(start + delta);
    else selection.restore(start, end + delta);
    refreshEditor();}

function toggleBulletList() {
    saveUndoState("Ajout/supression d'une liste à puces");
    transformLines(block => {
        return block.split("\n").map(line => {
                if (!line.trim()) return line;
                // suppression d'une puce existante
                if (/^\s*-\s/.test(line)) return line.replace(/^(\s*)-\s/, "$1");
                // conversion depuis une liste numérotée
                line = line.replace(/^(\s*)\d+\.\s/, "$1");
                const indent = (line.match(/^\s*/) || [""])[0];
                const content = line.substring(indent.length);
                return indent + "- " + content;})
            .join("\n");}, true);}

function toggleNumberedList() {
    saveUndoState("Ajout/supression d'une liste indexée");
    transformLines(block => {
        const lines = block.split("\n");
        const isNumbered = lines.filter(line => line.trim()).every(line => /^\s*\d+\.\s/.test(line));
        return lines.map(line => {
            if (!line.trim()) return line;
            if (isNumbered) return line.replace( /^(\s*)\d+\.\s/, "$1");
            line = line.replace( /^(\s*)-\s/, "$1");
            const indent = (line.match(/^\s*/) || [""])[0];
            const content = line.substring(indent.length);
            return indent + "1. " + content;}).join("\n");}, true);}

function toggleBlockquote() {
    saveUndoState("Ajout/suppression d'une note");
    transformLines(block => {
        const lines = block.split("\n");
        const isQuote = lines.filter(line => line.trim()).every(line => /^\s*>\s/.test(line));
        return lines.map(line => {
            if (!line.trim()) return line;
            if (isQuote) return line.replace(/^(\s*)>\s/, "$1");
            const indent = (line.match(/^\s*/) || [""])[0];
            const content = line.substring(indent.length);
            return indent + "> " + content;}).join("\n");}, true);}

function buildInternalLinkOptions() {
    let html = "";
    let first = true;
    Stage.Ateliers.forEach(atelier => {
        atelier.Exercices.forEach(exercice => {
            html += `<option value="a${atelier.Id}e${exercice.Id}"`
            if (first) {
                html += ' selected';
                first = false;}
            html += `>Atelier ${atelier.Id} - Exercice ${exercice.Id} ${exercice.Titre ? " : " + exercice.Titre : ""} </option>`;});});
    return html;}

function selectInternalOption() {
    const selector = document.getElementById("linkInternalTarget")
    const linkUrl = document.getElementById('linkUrl');
    linkUrl.value = selector.value + '/';
    const linkText = document.getElementById('linkText');
    if (linkText.value === '') linkText.value=selector.options[selector.selectedIndex].text;}

function toggleInternal() {
     const button =  document.querySelector(".insertLinkSwitch");
    if (!button) return;
    if (button.innerText === 'Lien interne') {
        button.innerText = 'Lien externe';
        document.getElementById("ExternalLink").style.display="none";
        document.getElementById("InternalLink").style.display="";
        selectInternalOption();}
    else {
        button.innerText = 'Lien interne';
        document.getElementById("ExternalLink").style.display="";
        document.getElementById("InternalLink").style.display="none";}}

function saveLink(start,end) {
    const text = document.getElementById("linkText").value.trim();
    const url =  document.getElementById("linkUrl").value.trim();
    if (!url) return;
    const markdown = text ? `[${text}](${url})` : url;
    saveUndoState("Insertion d'un lien");
    textareaSync.setRangeText(markdown, start, end, "end");
    const pos = start + markdown.length;
    selection.restore(pos);
    dialog.close();
    refreshEditor();}

function insertLink() {
    const start = textareaSync.selectionStart;
    const end = textareaSync.selectionEnd;
    const selected = textareaSync.value.substring(start, end).trim();
    const isUrl = /^https?:\/\/\S+$/i.test(selected);
    const textValue = isUrl ? "" : selected;
    const urlValue = isUrl ? selected : "";
    const html = `
    <div class="linkEditor">
        <div class="variableField">
            <label>Texte</label><input id="linkText" value="${textValue.replace(/"/g,'&quot;')}">
        </div>
        <div class="variableField" id="ExternalLink">
            <label>Adresse</label><input id="linkUrl" value="${urlValue.replace(/"/g,'&quot;')}">
        </div>
        <div class="variableField" id="InternalLink" style = "display:none;">
            <label>Destination</label><select id="linkInternalTarget" onchange="selectInternalOption();">${buildInternalLinkOptions()}</select>
        </div>
    </div>`;
    let buttons = [];
    if (Stage.Ateliers.length > 1 || Stage.Ateliers[0].Exercices.length > 1) buttons =  [{label : "Lien interne", action: () => toggleInternal(),className : "insertLinkSwitch"}];
    buttons.push ({label : "Annuler", action : () => dialog.close()},{label : "Insérer", action : () => saveLink(start,end)});
    dialog.show("Insertion d'un lien", html, buttons, "small");
    setTimeout(() => {
        if (isUrl) document.getElementById("linkText")?.focus();
        else document.getElementById("linkUrl")?.focus();},0);}

function insertVariable(name) {
    const variable = `[${name}]`;
    saveUndoState(`Insertion de la variable ${name}`);
    const start = textareaSync.selectionStart;
    const end = textareaSync.selectionEnd;
    textareaSync.setRangeText(variable, start, end, "end");
    selection.restore(start + variable.length);
    refreshEditor();}

function openVariableInsert() {
    const variables = Object.entries(Stage.Variables);
    Object.entries(Stage.Variables).sort(([a],[b]) => a.localeCompare(b))
    if (variables.length === 0) return;
    if (variables.length === 1) {
        insertVariable(variables[0][0]);
        return;}
    let html = '<div class="variableInsertList">';
    variables.forEach(([name, variable]) => {html += `<button class="variableInsertButton" <button title="${variable.lib || ''}"> onclick="insertVariable('${name}'); dialog.close();">${name} ${variable.lib ? '👤' : '🔒'}</button>`;});
    html += '</div>';
    dialog.show("Insertion d'une variable", html,[{label : "Annuler", action : () => dialog.close()}], "small");}


/* Chargement initial de la page */
const textareaSync = document.getElementById("writerContenu")
let Stage = storage.read('Stage',{ Titre: "", "Auteur": "", "Variables": {}, "Introduction": "", "Reference": "", "Ateliers": [{ "Id": 1, "Titre": "", "Exercices": [{ "Id": 1, "Titre": "", "Contenu": "", "Duree": "" }]}]});
sortStage();
renumberStage();
let Current = storage.read ('Current', {Atelier : 0, Exercice : 0, Contenu : Stage.Introduction});
document.getElementById("stageReference").value = Stage.Reference || "";
document.getElementById("stageReference").addEventListener("input", () => {
    Stage.Reference = stageReference.value;
    storage.write("Stage", Stage);});
document.getElementById("stageTitle").value = Stage.Titre || "";
document.getElementById("stageTitle").addEventListener("input", () => {
    Stage.Titre = stageTitle.value;
    storage.write("Stage", Stage);});
document.getElementById("stageAuthor").value = Stage.Auteur || "";
document.getElementById("stageAuthor").addEventListener("input", () => {
    Stage.Auteur = stageAuthor.value;
    storage.write("Stage", Stage);});
construireNavigation();
refreshUndoButtons();
afficherExercice();
document.querySelectorAll("#ibHeader input, #ExerciceHeader input").forEach(field => {
    field.addEventListener("input",() => validateField(field));
    validateField(field);});  

/* Initialisation des champs dynamiques */
document.getElementById("writerAtelierTitle").addEventListener("input", event => {
        getCurrentAtelier().Titre = event.target.value;
        storage.write("Stage", Stage);});
document.getElementById("writerExerciceTitle").addEventListener("input", event => {
        getCurrentExercice().Titre = event.target.value;
        storage.write("Stage", Stage);});
document.getElementById("writerExerciceLength").addEventListener("input", event => {
        getCurrentExercice().Duree = event.target.value;
        storage.write("Stage", Stage);});
textareaSync.addEventListener("input", event => {
        Current.Contenu = event.target.value;
        storage.write("Current",Current);});
/* Initialisation des boutons */
document.getElementById("btnAddSommaire").addEventListener("click",insertSommaire);      
document.getElementById("btnAddAtelier").addEventListener("click", addAtelier);
document.getElementById("btnAddExercice").addEventListener("click", addExercice);
document.getElementById("btnVariables").addEventListener("click", openVariables);
document.getElementById("btnExport").addEventListener("click", exporterStage);
document.getElementById("btnDeleteExercice").addEventListener("click", confirmDeleteExercice);
document.getElementById("btnDeleteAtelier").addEventListener("click", confirmDeleteAtelier);
document.getElementById("btnPreview").addEventListener("click", openPreview);
    
/* Initialisation de la gestion des fenêtres modales */
makeDraggable("ibWriterDialog",".ibModalHeader","Dialog");
document.getElementById("ibWriterDialogClose").addEventListener("click",() => dialog.close());
/* Initialisation de la barre d'outils */
document.getElementById("btnTools").addEventListener("click", () => {
    selection.save();
    toolBarOpened = true;
    session.write('ToolOpen',true);
    document.getElementById("ibWriterStyleBar").style.display = "flex";
    selection.restore();});
document.getElementById("ibWriterStyleClose").addEventListener("click",() => {toolBarOpened = false; session.write('ToolOpen',false); document.getElementById("ibWriterStyleBar").style.display="none"; selection.restore();});
if (!sessionStorage.getItem(IB_PREFIX + "WriterStyleLeft")) {
    const styleButton = document.getElementById("btnTools");
    const styleBar  = document.getElementById("ibWriterStyleBar");
    styleBar.style.display = "flex";
    const rectStyleButton = styleButton.getBoundingClientRect();
    sessionStorage.setItem(IB_PREFIX + "WriterStyleLeft",(rectStyleButton.right - styleBar.offsetWidth)+"px");
    sessionStorage.setItem(IB_PREFIX + "WriterStyleTop",(rectStyleButton.top - styleBar.offsetHeight + 12)+"px");
    styleBar.style.display = "none"; }
makeDraggable("ibWriterStyleBar",".ibWriterStyleHandle","Style");
updateStyleBar();
/* Ajout de la gestion du Ctrl+Z pour l'annulation des actions de la barre d'insertion sur l'exercice en cours */
textareaSync.addEventListener("keydown", event => {
    const ctrl = event.ctrlKey || event.metaKey;
    if (!ctrl) return;
    const key = event.key.toLowerCase();
    if (key === "z") {
        event.preventDefault();
        if (event.shiftKey) redoLastAction();     // Ctrl+Shift+Z
        else undoLastAction();}      // Ctrl+Z
    if (key === "y") {
        event.preventDefault();
        redoLastAction();}          // Ctrl+Y
});
/* Initialisation (nettoyage sur drop dans le vide) du DragNDrop */
document.addEventListener("dragend", () => {
    document.querySelectorAll( ".writerNavDropBefore,.writerNavDropAfter" ).forEach(element => {
        clearDropIndicators(element);});});
/* Synchonisation de la lecture avec fenêtre preview */
textareaSync.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {syncPreviewScroll();}, 50);});
textareaSync.addEventListener("keyup", () => {selection.save(); syncCursor();});
 textareaSync.addEventListener("click", () => {selection.save(); syncCursor();});
textareaSync.addEventListener("mouseup", () => {selection.save(); syncCursor();});
textareaSync.addEventListener("select", () => {selection.save();});
textareaSync.addEventListener("input", () => {selection.save();});
