import re
import json
import yaml
from pathlib import Path
from datetime import datetime
import tools

IB_PREFIX = "iblab-"

COPY_BUTTON_SVG = """
<svg viewBox="-1 0 20 20">
  <g id="copy-4" transform="translate(-3 -2)">
    <path id="secondary" fill="currentColor" d="M19,3H16V4a1,1,0,0,1-1,1H13a1,1,0,0,1-1-1V3H9A1,1,0,0,0,8,4V16a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V4A1,1,0,0,0,19,3Z"/>
    <path id="primary" d="M16,17v3a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8A1,1,0,0,1,5,7H8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    <path id="primary-2" data-name="primary" d="M19,3H9A1,1,0,0,0,8,4V16a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V4A1,1,0,0,0,19,3ZM12,4a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V3H12Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </g>
</svg>
"""

def on_page_content(html, page, config, files):
    meta = tools.charger_meta_atelier(page)
    html = injecter_variables(html, page, meta)
    html = ajouter_boutons_copie(html)
    html = ajouter_boutons_copie_inline(html)
    html = ajouter_checkboxes(html, page)
    html = remplacer_variables(html, meta)
    html = construire_alerte_yaml(page) + html
    html += construire_panneau_parametres(meta)
    return html

def on_page_markdown(markdown, page, config, files):
    fichier = Path(page.file.src_uri).name
    # Titre des pages d'exercices
    infos = tools.analyser_exercice(fichier)
    if infos:
        numero_atelier, numero_exercice = infos
        duree = None
        dossier_stage = Path(page.file.abs_src_path).parent
        ateliers = tools.charger_structure_stage(dossier_stage)
        for exercice in ateliers.get(numero_atelier, []):
            if exercice["numero"] == numero_exercice:
                duree = exercice["duree"]
                break
        bloc_duree = ""
        if duree: bloc_duree = ( f'\n\n<div class="ibDuration">⏱ Durée estimée : {duree} minutes</div>\n' )
        if tools.est_atelier_autonome(page): return re.sub( r"^#\s+(.+)$", r"# \1" + bloc_duree, markdown, count=1, flags=re.MULTILINE, )
        return re.sub( r"^#\s+(.+)$", rf"# Atelier {numero_atelier} - Exercice {numero_exercice} : \1" + bloc_duree, markdown, count=1, flags=re.MULTILINE, )
    # Titre des pages README
    if fichier.upper() == "README.MD":
        code_stage = Path(page.file.src_uri).parent.name.upper()
        return re.sub( r"^#\s+(.+)$", rf"# {code_stage} - \1", markdown, count=1, flags=re.MULTILINE, )
    return markdown

def on_page_context(context, page, config, nav):
    fichier = Path(page.file.abs_src_path)
    context["ibLastUpdate"] = ( datetime.fromtimestamp(fichier.stat().st_mtime).strftime("%d/%m/%Y") )
    context["ibNav"] = construire_pagination(page)
    context["ibNavigationTree"] = ( construire_navigation_stage(page) )
    context["ibShowNavigation"] = bool( context["ibNavigationTree"] )
    return context

# Pagination dans les exercices
def construire_pagination(page):
    fichier_courant = Path(page.file.src_uri).name
    infos = tools.analyser_exercice(fichier_courant)
    if not infos: return ""
    numero_atelier, numero_exercice = infos
    dossier_stage = Path(page.file.abs_src_path).parent
    exercices = []
    for fichier in dossier_stage.glob( f"a{numero_atelier}e*.md" ):
        infos = tools.analyser_exercice(fichier.name)
        if infos: _, numero_exercice_fichier = infos
        exercices.append((numero_exercice_fichier, fichier.stem))
    exercices.sort( key=lambda x: x[0] )
    if len(exercices) <= 1: return ""
    position = next(
        (i for i, (n, _) in enumerate(exercices)
         if n == numero_exercice),
        None )
    if position is None: return ""
    precedent = (
        exercices[position - 1][1]
        if position > 0 else None )
    suivant = (
        exercices[position + 1][1]
        if position < len(exercices) - 1
        else None )
    html = []
    if precedent: html.append( f'<a class="navPrev" href="../{precedent}/" title="Exercice précédent">⬅️</a>' )
    else: html.append( '<span class="navPlaceholder"></span>' )
    html.append( '<a class="navSom" href="../" title="Sommaire de l\'atelier">📖</a>' )
    if suivant: html.append( f'<a class="navNext" href="../{suivant}/" title="Exercice suivant">➡️</a>' )
    else: html.append('<span></span>')
    return "".join(html)    

def remplacer_variables(html, meta):
    variables = meta.get("Variables", {})
    for nom, definition in variables.items():
        nom_normalise = nom.lower()
        valeur_defaut = definition.get( "defaut", nom )
        html = re.sub( rf"\[{re.escape(nom)}\]", ( f'<span class="ibVariable" data-variable="{nom_normalise}">{valeur_defaut}</span>' ), html, flags=re.IGNORECASE )
    return html

def injecter_variables(html, page, meta):
    variables = meta.get("Variables")
    code_atelier = (Path(page.file.src_uri).parent.name.lower())
    fichier = Path(page.file.src_uri).name
    est_exercice = bool(tools.analyser_exercice(fichier))
    code_exercice = None
    if est_exercice: code_exercice = Path(page.file.src_uri).stem.lower()
    atelier_autonome = tools.est_atelier_autonome(page)
    est_readme = ( fichier.lower() == "readme.md" )
    dossier_stage = Path(page.file.abs_src_path).parent
    ateliers = tools.charger_structure_stage(dossier_stage)
    exercices = {}
    for liste_exercices in ateliers.values():
        for exercice in liste_exercices:
            exercices[ exercice["fichier"].rstrip("/") ] = exercice["nb_taches_a_cocher"]
    stage_markdown = ""
    if est_readme: stage_markdown = tools.charger_markdown_stage( dossier_stage )
    script = (
    "<script>"
    f"window.ibLabCode = {json.dumps(code_atelier)};"
    f"window.ibVariables = {json.dumps(variables, ensure_ascii=False)};"
    f"window.ibExercises = {json.dumps(exercices)};"
    f"window.ibIsExercise = {str(est_exercice).lower()};"
    f"window.ibExerciseCode = {json.dumps(code_exercice)};"
    f"window.ibStandaloneWorkshop = {str(atelier_autonome).lower()};"
    f"window.ibIsReadme = {str(est_readme).lower()};"
    f"window.ibStageMarkdown = {json.dumps(stage_markdown, ensure_ascii=False)};"
    "</script>" )
    return script + html

def ajouter_checkboxes(html, page):
    stage = Path(page.file.src_uri).parent.name
    fichier = Path(page.file.src_uri).stem
    compteur = 0
    dans_ol = False
    def remplacer(match):
        nonlocal compteur
        nonlocal dans_ol
        balise = match.group(0)
        if balise.lower().startswith("<ol"):
            dans_ol = True
            return balise
        if balise.lower().startswith("</ol"):
            dans_ol = False
            return balise
        if balise.lower().startswith("<li") and dans_ol:
            compteur += 1
            identifiant = ( f"{IB_PREFIX}{stage}-{fichier}-{compteur}" )
            return ( f'<li class="ibLabTask" id="{identifiant}">' )
        return balise
    return re.sub( r'</?ol[^>]*>|<li[^>]*>', remplacer, html, flags=re.IGNORECASE )

def ajouter_boutons_copie(html):
    pattern = re.compile( r'(<pre.*?</pre>)', re.DOTALL )
    def remplace(match):
        bloc = match.group(1)
        return ( f'<div class="ibCodeBlock"><button class="ibCopyButton" onclick="ibCopy(this.parentElement.querySelector(\'code\').innerText,this)">{COPY_BUTTON_SVG}</button>{bloc}</div>' )
    return pattern.sub(remplace, html)

def ajouter_boutons_copie_inline(html):
    blocs_pre = []
    def proteger(match):
        blocs_pre.append(match.group(0))
        return f"%%PRE_BLOCK_{len(blocs_pre)-1}%%"
    html = re.sub( r"<pre.*?</pre>", proteger, html, flags=re.DOTALL )
    pattern = re.compile( r'(?<!<pre>)<code>(.*?)</code>', re.DOTALL )
    def remplace(match):
        code_html = match.group(0)
        return ( f'<span class="ibInlineCode">{code_html}<button class="ibInlineCopyButton" onclick="ibCopy(this.parentElement.querySelector(\'code\').innerText,this)">{COPY_BUTTON_SVG}</button></span>' )
    html = pattern.sub(remplace, html)
    for i, bloc in enumerate(blocs_pre): html = html.replace( f"%%PRE_BLOCK_{i}%%", bloc )
    return html

def construire_panneau_parametres(meta):
    variables = meta.get("Variables", {})
    variables_visibles = {
        nom: definition
        for nom, definition in variables.items()
        if definition.get("lib")}
    contenu = """
<aside id="ibSettingsPanel" class="ibModal">
    <div class="ibSettingsHeader ibModalHeader"><span>⚙ Paramètres</span><button id="ibSettingsClose" class="ibModalClose" title="Fermer">✕</button></div>
    <div id="ibSettingsContent" class="ibModalContent">
"""
    if variables_visibles:
        contenu += """
        <div class="ibVariablesIntro">
            Les variables ci-dessous permettent de personnaliser les informations utilisées dans cet atelier.
            (Toute modification est automatiquement enregistrée et répercutée dans les exercices.)
        </div>
"""
    for nom, definition in variables_visibles.items():
        contenu += f"""
        <div class="ibVariableEditor">
            <label for="ibVar_{nom.lower()}">
                {definition["lib"]}
            </label>
            <input type="text" id="ibVar_{nom.lower()}" class="ibVariableInput" data-variable="{nom.lower()}">
            <div class="ibVariableHelp">{definition.get("aide", "")}</div>
        </div>
"""
    contenu += """
        <div class="ibSettingsSection">
            <div class="ibSettingsSectionTitle">Affichage</div>
            <div class="ibDisplayEditor">
            <label for="ibFontSize">📝 Taille du texte</label>
            <select id="ibFontSize" class="ibDisplayInput">
                <option value="0.95rem">Petite</option>
                <option value="1rem">Normale</option>
                <option value="1.1rem">Grande</option>
                <option value="1.2rem">Très grande</option></select>
            <div class="ibVariableHelp">Modifie la taille du texte affiché dans les ateliers.</div></div></div>
        <div class="ibSettingsSection">
            <div class="ibSettingsSectionTitle">Sauvegarde</div>
            <div class="ibSettingsActions">
                <button id="ibExportButton" class="ibSettingsAction">💾 Exporter mes données</button>
                <button id="ibImportButton" class="ibSettingsAction">📂 Importer ma sauvegarde</button>
                <button id="ibPrintButton" class="ibSettingsAction">🖨 Imprimer le stage</button>
            </div>
        </div>
        <input type="file" id="ibImportFile" accept=".json" style="display:none">
    </div>
</aside>
"""
    return contenu

# prévenir rédacteur d'erreur dans le YAML
def construire_alerte_yaml(page):
    fichier_courant = str(Path(page.file.abs_src_path))
    if not tools.YAML_ERRORS: return ""
    erreurs = [
        erreur
        for erreur in tools.YAML_ERRORS
        if erreur["fichier"] == fichier_courant]
    if not erreurs: return ""
    html = ['<div class="ibYamlWarning">','<div class="ibYamlWarningTitle">⚠ Erreur dans l\'en-tête YAM</div>']
    for erreur in tools.YAML_ERRORS:
        html.append( f'<p><b>Le fichier "{Path(erreur["fichier"]).name}" contient une erreur de configuration.</b><br/>Les variables, durées ou métadonnées de l\'atelier peuvent ne pas être interprétées correctement.</p>')
        html.append( f'<pre>{erreur["erreur"]}</pre>')
    html.append('</div>')
    return "".join(html)

def construire_navigation_stage(page):
    fichier_courant = Path(page.file.src_uri).name
    if not tools.REGEX_EXERCICE.match(fichier_courant): return ""
    dossier_stage = Path(page.file.abs_src_path).parent
    exercices = list(dossier_stage.glob("a*e*.md"))
    if len(exercices) <= 1: return ""
    ateliers = tools.charger_structure_stage(dossier_stage)
    html = []
    for numero_atelier in sorted(ateliers.keys()):
        exercices = sorted( ateliers[numero_atelier], key=lambda e: e["numero"] )
        titre_atelier = tools.extraire_titre_atelier(exercices)
        atelier_courant = False
        for exercice in exercices:
            stem = exercice["fichier"].rstrip("/")
            if stem == Path(page.file.src_uri).stem: atelier_courant = True
        code_stage = dossier_stage.name.lower()
        html.append( f'<details class="ibNavAtelier{" ibNavAtelierCurrent" if atelier_courant else ""}" data-stage="{code_stage}" data-atelier="{numero_atelier}" {"open" if atelier_courant else ""}>' )
        html.append( f'<summary class="ibNavAtelierHeader"><div class="ibNavAtelierText"><div class="ibNavAtelierRef">Atelier {numero_atelier}</div><div class="ibNavAtelierTitre">{titre_atelier or ""}</div></div></summary>' )
 
        for exercice in exercices:
            stem = exercice["fichier"].rstrip("/")
            titre = exercice["titre"]
            numero_exercice = exercice["numero"]
            courant = (
            " ibNavCurrent"
            if stem == Path(page.file.src_uri).stem
            else "")
            html.append( f'<a class="ibNavExercice{courant}" data-stage="{code_stage}" data-exercice="{stem}" href="../{stem}/"><div class="ibNavExRef">Exercice {numero_exercice}</div><div class="ibNavExTitre">{titre}</div></a>' )
        html.append('</details>')
    return "".join(html)
