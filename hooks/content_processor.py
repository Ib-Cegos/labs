import re
import json
import yaml
from pathlib import Path

COPY_BUTTON_SVG = """
<svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="8" y="4" width="11" height="13" rx="1" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.6" />
    <rect x="5" y="7" width="11" height="13" rx="1" fill="currentColor" />
</svg>
"""

from pathlib import Path
import yaml
import re

def charger_meta_atelier(page):
    try:
        fichier = Path("docs") / page.file.src_uri
        readme = fichier.parent / "README.md"
        if not readme.exists():
            return {}
        contenu = readme.read_text( encoding="utf-8" )
        if not contenu.startswith("---"):
            return {}
        morceaux = contenu.split("---", 2)
        if len(morceaux) < 3:
            return {}
        meta = yaml.safe_load( morceaux[1] )
        return meta or {}
    except Exception as erreur:
        print(
            f"Erreur lecture méta atelier : {erreur}"
        )
        return {}

def remplacer_variables(html, page):
    meta = charger_meta_atelier(page)
    variables = meta.get("Variables", {})
    for nom, definition in variables.items():
        nom_normalise = nom.lower()
        valeur_defaut = definition.get( "defaut", nom )
        html = re.sub(
            rf"\[{re.escape(nom)}\]",
            (
                f'<span class="ibVariable" data-variable="{nom_normalise}">{valeur_defaut}</span>'
            ),
            html,
            flags=re.IGNORECASE )
    return html

def injecter_variables(html, page):
    meta = charger_meta_atelier(page)
    variables = meta.get("Variables")
    code_atelier = (Path(page.file.src_uri).parent.name.lower())
    script = (
        "<script>"
        f"window.ibLabCode = {json.dumps(code_atelier)};"
        f"window.ibVariables = {json.dumps(variables, ensure_ascii=False)};"
        "</script>"
    )
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
            identifiant = ( f"ibLab-{stage}-{fichier}-{compteur}" )
            return ( f'<li class="ibLabTask" id="{identifiant}">' )
        return balise
    return re.sub( r'</?ol[^>]*>|<li[^>]*>', remplacer, html, flags=re.IGNORECASE )

def construire_navigation(page):
    fichier_courant = Path(page.file.src_uri).name
    match = re.match(r"a(\d+)e(\d+)\.md$", fichier_courant, re.IGNORECASE)
    if not match:
        return ""
    numero_atelier = int(match.group(1))
    numero_exercice = int(match.group(2))
    dossier_stage = Path(page.file.abs_src_path).parent
    exercices = []
    for fichier in dossier_stage.glob(f"a{numero_atelier}e*.md"):
        m = re.match(r"a(\d+)e(\d+)\.md$", fichier.name, re.IGNORECASE)
        if m:
            exercices.append((int(m.group(2)), fichier.stem))
    exercices.sort(key=lambda x: x[0])
    if len(exercices) <= 1:
        return ""
    position = next(
        (i for i, (n, _) in enumerate(exercices) if n == numero_exercice),
        None,
    )

    if position is None:
        return ""
    precedent = exercices[position - 1][1] if position > 0 else None
    suivant = exercices[position + 1][1] if position < len(exercices) - 1 else None
    html = []
    html.append('<div class="navEx">')
    if precedent:
        html.append(
            f'<a class="navPrev" href="../{precedent}/">← Exercice précédent</a>'
        )
    else:
        html.append('<span></span>')

    html.append(
        '<a class="navSom" href="../">Sommaire</a>'
    )
    if suivant:
        html.append(
            f'<a class="navNext" href="../{suivant}/">Exercice suivant →</a>'
        )
    else:
        html.append('<span></span>')
    html.append('</div>')
    return ''.join(html)

def ajouter_boutons_copie(html):
    pattern = re.compile(
        r'(<pre.*?</pre>)',
        re.DOTALL
    )
    def remplace(match):
        bloc = match.group(1)
        return (
            '<div class="ibCodeBlock">'
            '<button class="ibCopyButton" onclick="ibCopy(this.parentElement.querySelector(\'code\').innerText,this)">'
            f'{COPY_BUTTON_SVG}'
            '</button>'
            f'{bloc}'
            '</div>'
        )
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
        return (
            '<span class="ibInlineCode">'
            f'{code_html}'
            '<button class="ibInlineCopyButton" onclick="ibCopy(this.parentElement.querySelector(\'code\').innerText,this)">'
            f'{COPY_BUTTON_SVG}'
            '</button>'
            '</span>'
        )
    html = pattern.sub(remplace, html)
    for i, bloc in enumerate(blocs_pre):
        html = html.replace( f"%%PRE_BLOCK_{i}%%", bloc )
    return html

def on_page_content(html, page, config, files):
    html = injecter_variables(html, page)
    html = ajouter_boutons_copie(html)
    html = ajouter_boutons_copie_inline(html)
    html = ajouter_checkboxes(html, page)
    navigation_html = construire_navigation(page)
    html = remplacer_variables(html, page)
    html += construire_panneau_parametres(page)
    if not navigation_html:
        return html
    return html + navigation_html

def on_page_markdown(markdown, page, config, files):
    """
    Préfixe automatiquement le premier titre H1 des exercices.
    Exemple :
        # Création de l'environnement
    devient :
        # Atelier 1 - Exercice 1 : Création de l'environnement
    """
    fichier = Path(page.file.src_uri).name
    match = re.fullmatch(
        r"a(\d+)e(\d+)\.md",
        fichier,
        re.IGNORECASE,
    )
    if not match:
        return markdown
    numero_atelier = match.group(1)
    numero_exercice = match.group(2)
    markdown = re.sub(
        r"^#\s+(.+)$",
        rf'# <span class="exerciceRef">Atelier {numero_atelier} - Exercice {numero_exercice} :</span> \1',
        markdown,
        count=1,
        flags=re.MULTILINE,
    )
    return markdown

def construire_panneau_parametres(page):
    meta = charger_meta_atelier(page)
    variables = meta.get("Variables", {})
    contenu = """
<aside id="ibSettingsPanel">
    <div class="ibSettingsHeader"><span>Paramètres</span><button id="ibSettingsClose" title="Fermer">✕</button></div>
    <div id="ibSettingsContent">
"""
    for nom, definition in variables.items():
        contenu += f"""
        <div class="ibVariableEditor">
            <label for="ibVar_{nom.lower()}"> {definition.get("lib", nom)}</label>
            <input type="text" id="ibVar_{nom.lower()}" class="ibVariableInput" data-variable="{nom.lower()}">
            <div class="ibVariableHelp"> {definition.get("aide", "")} </div>
        </div>
"""
    contenu += """
        <div class="ibSettingsActions">
            <button id="ibExportButton" class="ibSettingsAction">💾 Exporter mes données</button>
            <button id="ibImportButton" class="ibSettingsAction">📂 Importer ma sauvegarde</button>
        </div>
        <input type="file" id="ibImportFile" accept=".json" style="display:none"></div>
</aside>
"""
    return contenu