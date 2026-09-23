let DragData = null;
let previewWindow = null;
let scrollTimer = null;
let UndoStack = [];
let RedoStack = [];
let toolBarOpened = session.read('ToolOpen',false);
const UndoLimit = 20;
let imageSelection = null;
let imageUrls = [];

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

async function restoreEditorState(state) {
    Current.Atelier = state.atelier;
    Current.Exercice = state.exercice;
    await chargerExercice();
    afficherExercice();
    textareaSync.value = state.text;
    Current.Contenu = state.text;
    storage.write("Current",Current);
    refreshUndoButtons();
    refreshEditor();
    selection.restore(state.start, state.end);
    textareaSync.scrollTop = state.scrollTop ?? 0;}

function saveUndoStacks() {
    session.write("Undo", UndoStack);
    session.write("Redo", RedoStack);
    refreshUndoButtons();}    

async function undoLastAction() {
    const state = UndoStack.pop();
    if (!state) return;
    RedoStack.push({ action: state.action, timeStamp: Date.now(), atelier: Current.Atelier, exercice: Current.Exercice, text: textareaSync.value, start: textareaSync.selectionStart, end: textareaSync.selectionEnd, scrollTop: textareaSync.scrollTop});
    if (RedoStack.length > UndoLimit) RedoStack.shift();
    saveUndoStacks();
    restoreEditorState(state);}

async function redoLastAction() {
    const state = RedoStack.pop();
    if (!state) return;
    UndoStack.push({ action: state.action, timeStamp: Date.now(), atelier: Current.Atelier, exercice: Current.Exercice, text: textareaSync.value, start: textareaSync.selectionStart, end: textareaSync.selectionEnd, scrollTop: textareaSync.scrollTop});
    saveUndoStacks();
    restoreEditorState(state);}    

function saveUndoState(action = "") {
    RedoStack = [];
    UndoStack.push({action: action, timeStamp: Date.now(), atelier: Current.Atelier, exercice: Current.Exercice, text: textareaSync.value, start: textareaSync.selectionStart, end: textareaSync.selectionEnd, scrollTop: textareaSync.scrollTop});
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
    const savedLeft = sessionStorage.getItem(WRITER_PREFIX + storageKey + "Left");
    const savedTop =  sessionStorage.getItem(WRITER_PREFIX + storageKey + "Top");
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
        sessionStorage.setItem(WRITER_PREFIX + storageKey + "Left", element.style.left);
        sessionStorage.setItem(WRITER_PREFIX + storageKey + "Top",element.style.top);});}        

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
        if (!sessionStorage.getItem(WRITER_PREFIX + "DialogLeft")) {
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

async function exporterStage() {
    majStage();
    const zip = new JSZip();
    zip.file("content.json", JSON.stringify(Stage, null, 2));
    const fichiers = await db.list();
    for (const path of fichiers) {
        const blob = await db.read(path);
        zip.file(path, blob);}
    const blob = await zip.generateAsync({type: "blob"});
    const url = URL.createObjectURL(blob);
    const lien = document.createElement("a");
    lien.href = url;
    lien.download = `${Stage.Reference || "stage"}-edit.zip`;
    lien.click();
    URL.revokeObjectURL(url);}

function majStage() {
    if (Current.Atelier == 0) Stage.Introduction = Current.Contenu;
    else {
        const atelier = Stage.Ateliers.find(a => a.Id == Current.Atelier);
        const exercice = atelier.Exercices.find(e => e.Id == Current.Exercice);
        exercice.Contenu = Current.Contenu; }
    storage.write('Stage', Stage); }

async function renumberStage() {
    /* Renumérotation des exercices/ateliers du stage (après ajout/suppression/déplacement)  + renommage des illustrations */
    const mappings = [];
    Stage.Ateliers.forEach((atelier, atelierIndex) => {
        const oldAtelierId = atelier.Id;
        atelier.Exercices.forEach((exercice, exerciceIndex) => {
            const oldExerciceId = exercice.Id;
            mappings.push({oldPrefix: `a${oldAtelierId}e${oldExerciceId}`, newPrefix: `a${atelierIndex + 1}e${exerciceIndex + 1}`});
            exercice.Id = exerciceIndex + 1;});
        atelier.Id = atelierIndex + 1;});
    /* Restauration du Current */
    for (const atelier of Stage.Ateliers) {
        const exercice = atelier.Exercices.find(e => e._restoreCurrent);
        if (exercice) {
            Current.Atelier = atelier.Id;
            Current.Exercice = exercice.Id;
            delete exercice._restoreCurrent;
            storage.write("Current", Current);
            break;}}
    /* Renommage des illustrations : Passe 1 => ancien nom -> temporaire */
    const files = await db.list();
    for (const atelier of Stage.Ateliers) {
        for (const exercice of atelier.Exercices) {
            if (!exercice._oldIllustrationName) continue;
            const oldPrefix = exercice._oldIllustrationName;
            const newPrefix = `a${atelier.Id}e${exercice.Id}`;
            const file = files.find(path => path.startsWith(oldPrefix + "."));
            if (!file) {
                delete exercice._oldIllustrationName;
                continue;}
            const blob = await db.read(file);
            const extension = file.substring(file.lastIndexOf("."));
            await db.write("__tmp__" + newPrefix + extension, blob);
        delete exercice._oldIllustrationName;}}
    const tempFiles = await db.list();
    for (const tempFile of tempFiles.filter(f => f.startsWith("__tmp__"))) {
        const blob = await db.read(tempFile);
        const finalName = tempFile.replace("__tmp__", "");
        await db.write(finalName, blob);}
    for (const tempFile of tempFiles.filter(f => f.startsWith("__tmp__"))) await db.delete(tempFile);
    for (const file of files) {
        if (/^a\d+e\d+\./i.test(file)) await db.delete(file);}}

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

async function chargerExercice() {
    if (Current.Atelier == 0) { Current.Contenu = Stage.Introduction; Current.IllustrationName = "";}
    else {
        const exercice = getCurrentExercice();
        if (exercice) {
            Current.Contenu = exercice.Contenu;
            const prefix = `a${Current.Atelier}e${Current.Exercice}.`;
            const illusName = await db.find(prefix);
            Current.IllustrationName = illusName ? illusName : "";}}
    UndoStack = session.read("Undo", []);
    RedoStack = session.read("Redo", []);
    refreshUndoButtons();
    storage.write("Current", Current);}

function afficherExercice() {
    /* Intègre l'affichage de l'exercice sélectionné */
    document.querySelectorAll(".writerNavExercice").forEach(lien => {
        if ( lien.dataset.atelier != Current.Atelier || lien.dataset.exercice != Current.Exercice) { lien.classList.remove("writerNavSelected");}
        else {lien.classList.add("writerNavSelected");}});
    refreshIllusButton();
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

async function selectExercice(atelier, exercice) {
    if (atelier == Current.Atelier && exercice == Current.Exercice) return;
    majStage();
    Current.Atelier = atelier;
    Current.Exercice = exercice;
    await chargerExercice();
    afficherExercice(); }

async function selectIntroduction() {
    if (Current.Atelier == 0) return;
    majStage();
    Current.Atelier = 0;
    Current.Exercice = 0;
    await chargerExercice();
    afficherExercice(); }

function validateField(field) {
    field.classList.toggle("ibMissing",field.value.trim() === "");}
    
/* Ajout / Suppression / déplacement des Ateliers */
async function addAtelier() {
    Stage.Ateliers.push({Id: 0, Titre: "",Exercices: [{Id: 1, Titre: "", Duree: "",Contenu: ""}]});
    await renumberStage();;
    storage.write("Stage", Stage);
    construireNavigation();
    Current.Atelier = Stage.Ateliers.at(-1).Id;
    Current.Exercice = 1;
    await chargerExercice();
    afficherExercice();}
async function deleteAtelier() {
    if (Stage.Ateliers.length <= 1) {
        dialog.show( "Suppression impossible", "<p>Le stage doit contenir au moins un atelier.</p>", [], "small");
        return;}
    const index = Stage.Ateliers.findIndex(a => a.Id == Current.Atelier);
    Stage.Ateliers.splice(index, 1);
    await renumberStage();;
    storage.write("Stage", Stage);
    const nextIndex = Math.min(index,Stage.Ateliers.length - 1);
    Current.Atelier = Stage.Ateliers[nextIndex].Id;
    Current.Exercice = Stage.Ateliers[nextIndex].Exercices[0].Id;
    await chargerExercice();
    construireNavigation();
    afficherExercice();}
function confirmDeleteAtelier() {
    const atelier =getCurrentAtelier();
    dialog.show("Supprimer l'atelier",
        `<p>Supprimer "${getAtelierLabel(atelier)}" ?</p><p>Tous les exercices de cet atelier seront supprimés.</p>`, [{label : "Annuler", action : () => dialog.close()},{label : "Supprimer", className : "ibDialogButtonDelete", action : () => {deleteAtelier(); dialog.close();}}],"small");}
async function moveAtelier(aSource,aTarget,before = false, confirmed = false) {
    if (aSource === aTarget) return;
    const atelier = Stage.Ateliers[aSource];
    atelier.Exercices.forEach(exercice => {exercice._oldIllustrationName = `a${atelier.Id}e${exercice.Id}`;});
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
    await renumberStage();;
    await chargerExercice();
    storage.write("Stage", Stage);
    construireNavigation();
    afficherExercice();}

/* Ajout / Suppression / déplacement des Exercices */
async function addExercice() {
    const atelier = getCurrentAtelier();
    if (!atelier) return;
    atelier.Exercices.push({ Id: 0, Titre: "", Duree: "", Contenu: ""});
    await renumberStage();;
    storage.write("Stage", Stage);
    construireNavigation();
    Current.Exercice = atelier.Exercices.at(-1).Id;
    await chargerExercice();
    afficherExercice();}
async function deleteExercice() {
    /* A faire (peut-être) suppression des illustrations inutiles le cas échéant */
    const atelier = getCurrentAtelier();
    if (!atelier) return;
    if (atelier.Exercices.length <= 1) {
        dialog.show("Suppression impossible", "<p>Un atelier doit contenir au moins un exercice.</p>", [], "small" );
        return;}
    const index = atelier.Exercices.findIndex(e => e.Id == Current.Exercice);
    atelier.Exercices.splice(index, 1);
    await renumberStage();;
    storage.write("Stage", Stage);
    const nextIndex = Math.min(index, atelier.Exercices.length - 1);
    Current.Exercice =  atelier.Exercices[nextIndex].Id;
    await chargerExercice();
    construireNavigation();
    afficherExercice();}
function confirmDeleteExercice() {
    const exercice = getCurrentExercice();
    dialog.show("Supprimer l'exercice",`<p>Supprimer "${getExerciceLabel(exercice)}" ?</p>`, [{label : "Annuler", action : () => dialog.close()}, {label : "Supprimer",className: "ibDialogButtonDelete", action : () => { deleteExercice(); dialog.close(); }}], 'small');}
async function moveExercice(aSource, aTarget, eSource, eTarget, before = false, confirmed = false) {
    if (aSource === aTarget && eSource === eTarget) return;
    const atelierSource = Stage.Ateliers[aSource];
    const atelierTarget = Stage.Ateliers[aTarget];
    const exercice = atelierSource.Exercices[eSource];
    exercice._oldIllustrationName = `a${atelierSource.Id}e${exercice.Id}`;
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
    await renumberStage();;
    await chargerExercice();
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

/* Gestion de la barre d'outils' */
function refreshEditor() {
    textareaSync.dispatchEvent(new Event("input"));}

function getCurrentWord(text, position) {
    let start = position;
    let end = position;
    while (start > 0 && /[\p{L}\p{N}_'-]/u.test(text[start - 1])) start--;
    while (end < text.length && /[\p{L}\p{N}_'-]/u.test(text[end])) end++;
    return {start, end, word: text.substring(start, end)};}    

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
    let { start, end, text, selected, spaces } = getSelectedTextInfo();
    if (!selected) {
        const word = getCurrentWord(text, start);
        if (word.word) {
            start = word.start;
            end = word.end;
            selected = word.word;}
    else {
        saveUndoState("Ajout d'un marqueur Gras");
        textareaSync.setRangeText("****", start, end, "end");
        selection.restore(start + 2, start + 2);
        refreshEditor();
        return;}}
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
    let { start, end, text, selected, spaces } = getSelectedTextInfo();
    if (!selected) {
        const word = getCurrentWord(text, start);
        if (word.word) {
            start = word.start;
            end = word.end;
            selected = word.word;}
        else {
            saveUndoState("Ajout d'un marqueur Italique");
            textareaSync.setRangeText("**", start, end, "end");
            selection.restore( start + 1, start + 1);
            refreshEditor();
            return;}}
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
        selection.restore(start - 1, start - 1 + selected.length);}
    else if (singleBefore === "*" && singleAfter === "*" && !(doubleBefore === "**" && doubleAfter === "**")) {
        // *texte* -> texte
        saveUndoState("Suppression du marqueur Italique");
        textareaSync.setRangeText(selected + spaces, start - 1, end + 1, "end");
        selection.restore(start - 1, start - 1 + selected.length);}
    else {
        // texte -> *texte* ou **texte** -> ***texte***
        saveUndoState("Mise en Italique d'un texte");
        textareaSync.setRangeText( "*" + selected + "*" + spaces, start, end, "end");
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
    variables.forEach(([name, variable]) => {html += `<button class="variableInsertButton" title="${variable.lib || ''}" onclick="insertVariable('${name}'); dialog.close();">${name} ${variable.lib ? '👤' : '🔒'}</button>`;});
    html += '</div>';
    dialog.show("Insertion d'une variable", html,[{label : "Annuler", action : () => dialog.close()}], "small");}

function getCurrentTable() {
    const position = textareaSync.selectionStart;
    const text = textareaSync.value;
    const lines = text.split("\n");
    let currentLine = 0;
    let currentOffset = 0;
    while (currentLine < lines.length) {
        const nextOffset = currentOffset + lines[currentLine].length + 1;
        if (position <= nextOffset) break;
        currentOffset = nextOffset;
        currentLine++;}
    const isTableLine = line => /^\s*\|.*\|\s*$/.test(line);
    if (!isTableLine(lines[currentLine])) return {start: position, end: position, headers: ["", ""], rows: [["", ""]]};
    let firstLine = currentLine;
    let lastLine = currentLine;
    while (firstLine > 0 && isTableLine(lines[firstLine - 1])) firstLine--;
    while (lastLine < lines.length - 1 && isTableLine(lines[lastLine + 1])) lastLine++;
    const headerLine = lines[firstLine];
    const headers = headerLine.split("|").slice(1, -1).map(x => x.trim());
    let rows = [];
    for (let lineIndex = firstLine + 2; lineIndex <= lastLine; lineIndex++) {
        let row = lines[lineIndex].split("|").slice(1, -1).map(x => x.trim());
        while (row.length < headers.length) row.push("");
        rows.push(row);}
if (rows.length === 0)
    rows.push(headers.map(() => ""));
    let start = 0;
    for (let i = 0; i < firstLine; i++) start += lines[i].length + 1;
    let end = start;
    for (let i = firstLine; i <= lastLine; i++) {
        end += lines[i].length;
        if (i < lastLine) end++;}
    return {start, end, headers, rows};}
function openTableEditor() {
    const table = getCurrentTable();
    let html = `<div id="ibContent" class="tableInsert"><table id="tableDesigner" class="tableDesigner"><tr>`;
    table.headers.forEach(header => {html += `<th><input value="${header.replace(/"/g, '&quot;')}" placeholder="Titre"></th>`;});
    html += `</tr>
    <tr>`;
    table.rows[0].forEach(value => {html += `<td>${value}</td>`;});
    html += `</tr></table></div>`;
    dialog.show("Insertion / Modification d'un tableau", html, [{label : "+1 Colonne", action : () => addTableColumn()}, {label : "-1 Colonne", action : () => removeTableColumn()}, {label : "Annuler", action : () => dialog.close()}, {label : "Valider", action : () => saveTable()}]);
    setTimeout(() => {document.querySelector("#tableDesigner th input")?.focus();}, 0);}
function addTableColumn() {
    const table = document.getElementById("tableDesigner");
    table.rows[0].insertCell(-1).outerHTML = '<th><input value=""></th>';
    table.rows[1].insertCell(-1);}    
function removeTableColumn() {
    const table = document.getElementById("tableDesigner");
    if (table.rows[0].cells.length <= 1) return;
    table.rows[0].deleteCell(-1);
    table.rows[1].deleteCell(-1);}
function saveTable() {
    const table = getCurrentTable();
    const headers = Array.from(document.querySelectorAll("#tableDesigner th input")).map(input => input.value.trim());
    const adjustedRows = table.rows.map(row => {
        const adjusted = [...row];
        while (adjusted.length < headers.length) adjusted.push("");
        return adjusted.slice(0, headers.length);});
    let markdown = ["| " + headers.join(" | ") + " |", "| " + headers.map(() => "---").join(" | ") + " |", ...adjustedRows.map(row => "| " + row.join(" | ") + " |")].join("\n");
    // Création d'un nouveau tableau uniquement
    if (table.start === table.end) {
        const text = textareaSync.value;
        const beforeText = text.substring(0, table.start);
        const afterText  = text.substring(table.end);
        const needBlankLineBefore = beforeText.length > 0 && !beforeText.endsWith("\n\n");
        const needBlankLineAfter = afterText.length > 0 && !afterText.startsWith("\n\n");
        if (needBlankLineBefore) markdown = "\n" + markdown;
        if (needBlankLineAfter) markdown += "\n";}
    const lignes = markdown.split("\n");
    let offset = 0;
    for (let i = 0; i < 2; i++) offset += lignes[i].length + 1;
    const newPosition = table.start + offset + 2;
    saveUndoState("Insertion / Modification d'un tableau");
    textareaSync.setRangeText(markdown,table.start, table.end, "end");
    dialog.close();
    selection.restore(newPosition, newPosition);}

function normalizeImageName(name) {
    return name.trim().replace(/\s+/g, "-").replace(/[\/\\:*?"<>|]/g, "");}
function splitImagePath(path) {
    const slash = path.lastIndexOf("/");
    const dot = path.lastIndexOf(".");
    return {folder: path.substring(0, slash + 1), name: path.substring(slash + 1, dot), extension: path.substring(dot)};}
function updateImageReferences(oldPath, newPath = "") {
    const escapedPath = oldPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const imageRegex = new RegExp(`!\\[([^\\]]*)\\]\\(${escapedPath}\\)`,"g");
    const processContent = content => {
        if (!content) return content;
        // Renommage
        if (newPath) return content.replaceAll(oldPath, newPath);
        // Suppression
        return content.replace(imageRegex, "").replace(/\n{3,}/g, "\n\n");};
    Stage.Introduction = processContent(Stage.Introduction);
    Stage.Ateliers.forEach(atelier => {
        atelier.Exercices.forEach(exercice => {exercice.Contenu = processContent(exercice.Contenu);});});
    if (Current.Exercice === 0) Current.Contenu = Stage.Introduction;
    else Current.Contenu = getCurrentExercice().Contenu;
    textareaSync.value = Current.Contenu;
    storage.write("Stage", Stage);
    storage.write("Current", Current);}
function getCurrentImage() {
    const position = textareaSync.selectionStart;
    const text = textareaSync.value;
    const regex = /!\[(.*?)\]\((.*?)\)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        if (position >= start && position <= end) return {start, end, title: match[1], path: match[2], internal: !/^https?:\/\//i.test(match[2])};}
    return {start: position, end: position, title: "", path: "", internal: false };}
function countImageReferences(path) {
    let count = 0;
    const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`!\\[[^\\]]*\\]\\(${escapedPath}\\)`,"g");
    const countInContent = content => {
        if (!content) return 0;
        const matches = content.match(regex);
        return matches ? matches.length : 0;};
    count += countInContent(Stage.Introduction);
    Stage.Ateliers.forEach(atelier => {atelier.Exercices.forEach(exercice => {count += countInContent(exercice.Contenu);});});
    return count;}
function selectImage(path) {
    imageSelection = {path: path, title: splitImagePath(path).name};
    document.querySelectorAll(".imageTileSelected").forEach(tile => tile.classList.remove("imageTileSelected"));
    document.querySelector(`[data-path="${path}"]`)?.classList.add("imageTileSelected");}
async function buildImageGallery(selectedPath = "") {
    const files = await db.list();
    const images = files.filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file));
    let html = '<div class="imageGallery">';
    for (const path of images) {
        const url = await db.getUrl(path);
        let imageTitle = splitImagePath(path).name;
        imageUrls.push(url);
        const isCurrentIllustration = path === Current.IllustrationName;
        if (path.match(/^a\d+e\d+\.(png|jpg|jpeg|gif|webp|bmp)$/i) && path !== Current.IllustrationName) continue;
        const selected = path === selectedPath ? " imageTileSelected" : "";
        const icon = isCurrentIllustration ? "📷" : "🖼️";
        imageTitle = imageTitle.length > 20 ? imageTitle.substring(0,17) + "..." : imageTitle;
        html += `<div class="imageTile${selected}" data-path="${path}" onclick="selectImage('${path}')">
        <div class = "imagePreview">
            <img src="${url}">
            ${!isCurrentIllustration ? `<button class="imageDeleteButton" onclick="event.stopPropagation(); confirmDeleteImage('${path}')">🗑️</button>` : ""}
        </div>
        <div class="imageTileName">
            <span class="imageTitle" title="${path}">${icon} ${imageTitle}</span>
            ${!isCurrentIllustration ? `<button class="imageRenameButton" onclick="event.stopPropagation(); startImageRename('${path}')">✏️</button>` : ""}
        </div></div>`;}
    html += "</div>";
    return html;}
function endImageRename(oldPath, newPath = oldPath) {
    const tile = document.querySelector(`.imageTile[data-path="${oldPath}"]`);
    if (!tile) return;
    tile.dataset.path = newPath;
    tile.onclick = () => selectImage(newPath);
    const title =tile.querySelector(".imageTitle");
    const parts = splitImagePath(newPath);
    title.title = newPath;
    title.textContent = `🖼️ ${parts.name}`;
    const delButton = tile.querySelector(".imageDeleteButton");
    delButton.onclick = (event) => {event.stopPropagation(); confirmDeleteImage(newPath);}
    const renameButton = tile.querySelector(".imageRenameButton");
    renameButton.onclick = (event) => {event.stopPropagation(); startImageRename(newPath);}}
function startImageRename(path) {
    const tile = document.querySelector(`.imageTile[data-path="${path}"]`);
    if (!tile) return;
    const title = tile.querySelector(".imageTitle");
    const parts = splitImagePath(path);
    title.innerHTML =`<input class="imageRenameInput" value="${parts.name}" onkeydown="handleImageRename(event, '${path}')">`;
    const input = title.querySelector("input");
    input.focus();
    input.select();}
function handleImageRename(event, oldPath) {
    if (event.key === "Escape") {
        endImageRename(oldPath);
        return;}
    if (event.key === "Enter") {
        event.preventDefault();
        saveImageRename(oldPath, event.target.value);}}
async function saveImageRename(oldPath, newName) {
    newName = normalizeImageName(newName);
    if (!newName) {
        endImageRename(oldPath);
        return;}
    const parts = splitImagePath(oldPath);
    const newPath = parts.folder + newName + parts.extension;
    if (newPath === oldPath) {
        endImageRename(oldPath);
        return;}
    const files = await db.list();
    if (files.includes(newPath)) {
        alert("Ce nom est déjà utilisé.");
        return;}
    const blob = await db.read(oldPath);
    if (!blob) {
        alert("Impossible de lire l'image.");
        endImageRename(oldPath);
        return;}
    updateImageReferences(oldPath, newPath);
    await db.write(newPath, blob);
    await db.delete(oldPath);
    endImageRename(oldPath, newPath);}
async function deleteImage(path) {
    await db.delete(path);
    updateImageReferences(path);
    openImageEditor();}       
function confirmDeleteImage(path) {
    const count = countImageReferences(path);
    let countStr = `<p>(${count} référence`;
    if (count > 1) countStr += 's seront supprimées'; else countStr +=' sera supprimée';
    if (count >0) countStr += ' dans le stage.)</p>'; else countStr = '';
    dialog.show("Suppression d'une image", `<p>Supprimer l'image <strong>${splitImagePath(path).name}</strong> ?</p>${countStr}`, [{label: "Annuler", action: () => openImageEditor(imageSelection.path)},{label: "Supprimer", className: "ibDialogButtonDelete", action: () => deleteImage(path)}],'small');}
async function addImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;
        const path = `images/${normalizeImageName(file.name)}`;
        await db.write(path, file);
        openImageEditor(path);};
    input.click();}
function openExternalImageEditor() {
    let image = getCurrentImage();
    if (image.internal) image = {title: "", path: ""};
    dialog.show(
        "Insertion / Modification d'une image",
        `<div class="variableEditor">
             <div class="variableField"><label>Titre</label><input id="externalImageTitle" value="${image.title || ""}"></div>
             <div class="variableField"><label>URL</label><input id="externalImageUrl" value="${image.path || ""}"></div>
             <p><b><u>Nota</u></b> : Cette image ne sera pas stockée localement, son affichage dépendra de la disponibilité de la resource originale...</p>
        </div>`,
        [{label: "Image interne", action: () => openImageEditor(imageSelection.path)}, {label: "Annuler", action: () => dialog.close()}, {label: "Valider", action: () => saveImage()}]);}
function saveImage() {
    // Mode image externe
    const titleInput = document.getElementById("externalImageTitle");
    const urlInput = document.getElementById("externalImageUrl");
    if (titleInput && urlInput) imageSelection = {title : titleInput.value.trim(), path  : urlInput.value.trim()};
    if (!imageSelection.path) return;
    const image = getCurrentImage();
    const markdown = `![${imageSelection.title}](${imageSelection.path})`;
    saveUndoState("insertion ou modification d'une image");
    textareaSync.value = textareaSync.value.substring(0, image.start) + markdown + textareaSync.value.substring(image.end);
    Current.Contenu = textareaSync.value;
    majStage();
    storage.write("Current", Current);
    selection.restore(image.start + markdown.length,image.start + markdown.length);
    refreshEditor();
    dialog.close();}
async function openImageEditor(selectedPath = null) {
    const image = getCurrentImage();
    if (selectedPath !== null) imageSelection = {path: selectedPath, title: splitImagePath(selectedPath).name};
    else imageSelection = {path : image.internal ? image.path : "",title : image.internal ? splitImagePath(image.path).name : ""};
    imageUrls.forEach(url => db.releaseUrl(url));
    imageUrls = [];
    const html = await buildImageGallery(imageSelection.path);
    dialog.show("Insertion / Modification d'une image",html, [{label : "Ajouter", action : () => addImage()}, {label : "Image externe", action : () => openExternalImageEditor()}, {label : "Annuler", action : () => dialog.close()}, {label : "Valider", action : () => saveImage()}]);}

/* Edition des "illustrations" */
function refreshIllusButton() {
    const illusButton = document.getElementById("illustrationButton");
    if (Current.Atelier == 0) return;
    if (!Current.IllustrationName ) {
        illusButton.title = "Ajouter une illustration à l'exercice.";
        illusButton.classList.remove("hasIllustration");
        illusButton.onclick = () => addIllustration();}
    else {
        illusButton.title = "Supprimer l'illustration de l'exercice.";
        illusButton.classList.add("hasIllustration");
         illusButton.onclick = () => confirmDeleteIllustration();}}
function isIllustration(path) {
    return /^a\d+e\d+\.(png|jpg|jpeg|gif|webp)$/i.test(path);}
async function getCurrentIllustration() {
    const files = await db.list();
    const prefix = `a${Current.Atelier}e${Current.Exercice}.`;
    return files.find(file => file.startsWith(prefix) && isIllustration(file)) || null;}
function confirmDeleteIllustration() {
    dialog.show("Supprimer l'illustration", `<p>Supprimer l'illustration "${Current.IllustrationName}" de cet exercice ?</p><p>(Elle sera conservée dans le dossier "images" pour être insérée dans les ateliers si nécessaire)</p>`, [{label : "Annuler", action : () => dialog.close()},{label : "Supprimer", className : "ibDialogButtonDelete", action : () => {deleteIllustration(); dialog.close();}}],"small");}
async function deleteIllustration() {
    const illustration = await getCurrentIllustration();
    if (!illustration) return;
    const count = countImageReferences(illustration);
    const blob = await db.read(illustration);
    const parts = splitImagePath(illustration);
    let targetPath = `images/${parts.name}${parts.extension}`;
    const files = await db.list();
    let index = 1;
    while (files.includes(targetPath)) {
        targetPath = `images/${parts.name}-${index}${parts.extension}`;
        index++;}
    await db.write(targetPath, blob);
    updateImageReferences(illustration, targetPath);
    Current.IllustrationName = '';
    storage.write("Current",Current);
    await db.delete(illustration);
    refreshIllusButton();
    refreshEditor();}
async function addIllustration() {
    if (Current.IllustrationName != "") return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;
        const extension = file.name.substring(file.name.lastIndexOf("."));
        const illustrationPath = `a${Current.Atelier}e${Current.Exercice}${extension}`;
        await db.write(illustrationPath, file);
        Current.IllustrationName = illustrationPath;
        storage.write("Current", Current);
        refreshIllusButton();};
    input.click();}    

/* Chargement initial de la page */
const textareaSync = document.getElementById("writerContenu")
theme = localStorage.getItem( IB_PREFIX + "theme") || 'original';
ibApplyTheme(theme);
let Stage = storage.read('Stage',{ Titre: "", "Auteur": "", "Variables": {}, "Introduction": "", "Reference": "", "Ateliers": [{ "Id": 1, "Titre": "", "Exercices": [{ "Id": 1, "Titre": "", "Contenu": "", "Duree": "" }]}]});
sortStage();
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
if (!sessionStorage.getItem(WRITER_PREFIX + "StyleLeft")) {
    const styleButton = document.getElementById("btnTools");
    const styleBar  = document.getElementById("ibWriterStyleBar");
    styleBar.style.display = "flex";
    const rectStyleButton = styleButton.getBoundingClientRect();
    sessionStorage.setItem(WRITER_PREFIX + "StyleLeft",(rectStyleButton.right - styleBar.offsetWidth)+"px");
    sessionStorage.setItem(WRITER_PREFIX + "StyleTop",(rectStyleButton.top - styleBar.offsetHeight + 12)+"px");
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


