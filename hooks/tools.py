#Ici se trouvent les fonctions utilisables dans les autres scripts python
import re
import yaml
import subprocess
import os
import requests
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

@dataclass
class CommitInfo:
    sha: str
    author_name: str
    commit_date: str

REGEX_EXERCICE = re.compile( r"a(\d+)e(\d+)\.md$", re.IGNORECASE )
REGEX_SOMMAIRE = re.compile( r"\{\{\s*sommaire\s*\(\s*\)\s*\}\}", re.IGNORECASE )
YAML_ERRORS = []
IBLAB_PAGE_BREAK = "<!-- IBLAB_PAGE_BREAK -->"
REGEX_VARIABLE = re.compile( r"\[([A-Za-z0-9_]+)\]")

def preparer_variables_print(dossier_stage,contenu):
    readme = dossier_stage / "README.md"
    if not readme.exists(): return contenu
    contenu_readme = readme.read_text(encoding="utf-8")
    if not contenu_readme.startswith("---"): return contenu
    morceaux = contenu_readme.split("---", 2)
    if len(morceaux) < 3: return contenu
    try: meta = yaml.safe_load(morceaux[1]) or {}
    except yaml.YAMLError: return contenu
    variables = meta.get("Variables", {})
    for nom, definition in variables.items():
        valeur_defaut = definition.get( "defaut", "" )
        contenu = re.sub( rf"\[{re.escape(nom)}\]", ( f'<span class="ibPrintVariable" data-variable="{nom.lower()}" data-default="{valeur_defaut}" data-custom="{valeur_defaut}">[{nom}]</span>' ), contenu, flags=re.IGNORECASE )
    return contenu

def charger_structure_stage(dossier_stage):
    ateliers = {}
    for fichier in dossier_stage.glob('a*e*.md'):
        match = REGEX_EXERCICE.match(fichier.name)
        if not match: continue
        numero_atelier, numero_exercice = analyser_exercice(fichier.name)
        contenu = fichier.read_text(encoding='utf-8')
        nb_taches_a_cocher = len(re.findall(r"^\s*\d+\.\s+",contenu, re.MULTILINE))
        metadata = {}
        if contenu.startswith('---'):
            morceaux = contenu.split('---', 2)
            if len(morceaux) >= 3:
                try:
                    metadata = yaml.safe_load(morceaux[1]) or {}
                except yaml.YAMLError as erreur:
                    erreur_yaml = { "fichier": str(fichier),"erreur": str(erreur)}
                    if erreur_yaml not in YAML_ERRORS: YAML_ERRORS.append(erreur_yaml)
                    metadata = {}
                contenu = morceaux[2]
        titre = fichier.stem
        titre_match = re.search( r'^#\s+(.+)$', contenu, re.MULTILINE )
        if titre_match: titre = titre_match.group(1).strip()
        ateliers.setdefault( numero_atelier, [] ).append({ 'numero': numero_exercice, 'titre': titre, 'fichier': fichier.stem + '/', 'duree': metadata.get('Duree'), 'atelier_titre': metadata.get('Atelier'),'nb_taches_a_cocher': nb_taches_a_cocher})
    if YAML_ERRORS: print("YAML_ERRORS =", YAML_ERRORS)
    return ateliers

def analyser_exercice(nom_fichier):
    match = REGEX_EXERCICE.match(nom_fichier)
    if not match: return None
    return ( int(match.group(1)), int(match.group(2)) )

def charger_meta_atelier(page):
    try:
        fichier = Path("docs") / page.file.src_uri
        readme = fichier.parent / "README.md"
        if not readme.exists(): return {}
        contenu = readme.read_text( encoding="utf-8" )
        if not contenu.startswith("---"): return {}
        morceaux = contenu.split("---", 2)
        if len(morceaux) < 3: return {}
        try:
            meta = yaml.safe_load(morceaux[1])
            return meta or {}
        except yaml.YAMLError as erreur:
            erreur_yaml = {"fichier": str(fichier), "erreur": str(erreur)}
            if erreur_yaml not in YAML_ERRORS: YAML_ERRORS.append(erreur_yaml)
            return {}
    except Exception as erreur:
        print( f"Erreur lecture méta atelier : {erreur}" )
        return {}  

# Gestion des ateliers "autonomes"
def est_dossier_autonome(dossier_stage):
    ateliers = charger_structure_stage(dossier_stage)
    nombre_exercices = sum(
        len(exercices)
        for exercices in ateliers.values())
    return (
        len(ateliers) == 1
        and nombre_exercices == 1)

def est_atelier_autonome(page):
    return est_dossier_autonome( Path(page.file.abs_src_path).parent )

def extraire_titre_atelier(exercices):
    for exercice in exercices:
        if exercice["atelier_titre"]: return exercice["atelier_titre"]
    return None

# Gestion de l'export/impression du stage
def construire_sommaire_export(dossier_stage):
    ateliers = charger_structure_stage(dossier_stage)
    morceaux = ["## Sommaire\n"]
    for numero_atelier in sorted(ateliers.keys()):
        exercices = sorted( ateliers[numero_atelier], key=lambda e: e["numero"])
        titre_atelier = extraire_titre_atelier(exercices)
        if titre_atelier: morceaux.append( f"- Atelier {numero_atelier} - {titre_atelier}" )
        else: morceaux.append( f"- Atelier {numero_atelier}" )
        for exercice in exercices:
            morceaux.append( f"    - Exercice {exercice['numero']} - {exercice['titre']}" )
    return "\n".join(morceaux)

def decaler_titres_markdown(contenu, niveaux=2):
    def remplacer(match): return "#" * (len(match.group(1)) + niveaux) + " "
    return re.sub( r"^(#{1,6})\s+", remplacer, contenu, flags=re.MULTILINE )

def extraire_markdown_sans_yaml(fichier):
    contenu = fichier.read_text(encoding="utf-8")
    if contenu.startswith("---"):
        morceaux = contenu.split("---", 2)
        if len(morceaux) >= 3: return morceaux[2].strip()
    return contenu.strip()

def formater_exercice_pour_export( contenu, numero_atelier, titre_atelier, numero_exercice, titre_exercice ):
    contenu = re.sub( r"^#\s+.+?\n+", "", contenu, count=1, flags=re.MULTILINE ).lstrip()
    contenu = decaler_titres_markdown( contenu, niveaux=2 )
    return (
    f"\n\n{IBLAB_PAGE_BREAK}\n\n"
    f"# Atelier {numero_atelier} - {titre_atelier}\n\n"
    f"## Exercice {numero_exercice} - {titre_exercice}\n\n"
    f'<div class="ibPrintNotes" '
    f'data-exercise="a{numero_atelier}e{numero_exercice}" hidden></div>\n\n'
    f"{contenu}" )
   
def formater_readme_export(dossier_stage):
    readme = dossier_stage / "README.md"
    if not readme.exists(): return ""
    contenu = extraire_markdown_sans_yaml(readme)
    contenu = REGEX_SOMMAIRE.sub( construire_sommaire_export(dossier_stage), contenu)
    return contenu    

def charger_markdown_stage(dossier_stage):
    morceaux = []
    morceaux.append( formater_readme_export(dossier_stage) )
    ateliers = charger_structure_stage(dossier_stage)
    for numero_atelier in sorted(ateliers.keys()):
        exercices = sorted( ateliers[numero_atelier], key=lambda e: e["numero"] )
        titre_atelier = extraire_titre_atelier(exercices)
        for exercice in exercices:
            fichier = ( dossier_stage / f"a{numero_atelier}e{exercice['numero']}.md" )
            contenu = extraire_markdown_sans_yaml(fichier)
            morceaux.append( formater_exercice_pour_export( contenu, numero_atelier, titre_atelier or "", exercice["numero"], exercice["titre"]))
    contenu = "\n\n".join(morceaux)
    titre = dossier_stage.name.upper()
    readme = dossier_stage / "README.md"
    if readme.exists(): contenu_readme = readme.read_text( encoding="utf-8" )
    match = re.search( r"^#\s+(.+)$", contenu_readme, re.MULTILINE )
    if match: titre = match.group(1).strip()
    return ( construire_yaml_print(titre,dossier_stage) + contenu)

def charger_markdown_atelier_autonome(dossier_stage):
    fichier = next(dossier_stage.glob("a1e1.md"))
    contenu = extraire_markdown_sans_yaml(fichier)
    titre = "Cahier d'atelier"
    titre_match = re.search( r"^#\s+(.+)$", contenu, re.MULTILINE )
    if titre_match: titre = titre_match.group(1).strip()
    contenu = preparer_variables_print( dossier_stage, contenu )
    return ( construire_yaml_print(titre,dossier_stage) + '<div class="ibPrintNotes" data-exercise="a1e1" hidden></div>\n\n' + contenu )

def est_page_print(page):
    return page.file.src_uri.endswith("/print.md")

def recuperer_infos_git_stage(dossier_stage):
    infos_plus_recents = { "gitVersion": "", "editorName": "", "editionDate": "" }
    date_plus_recente = None
    fichiers = []
    readme = dossier_stage / "README.md"
    if readme.exists(): fichiers.append(readme)
    fichiers.extend( sorted( dossier_stage.glob("a*e*.md")))
    for fichier in fichiers:
        infos = recuperer_infos_git( fichier )
        try:
            date_infos = datetime.strptime( infos["editionDate"], "%d/%m/%Y" )
            if ( date_plus_recente is None or date_infos > date_plus_recente ):
                date_plus_recente = date_infos
                infos_plus_recents = infos
        except Exception: pass
    return infos_plus_recents     

def construire_yaml_print( titre, dossier_stage):
    infos_git = recuperer_infos_git_stage( dossier_stage )
    return ( f"---\ntitle: {titre}\neditionDate: {infos_git['editionDate']}\ngitVersion: {infos_git['gitVersion']}\neditorName: {infos_git['editorName']}\n---\n\n")

def recuperer_infos_git(fichier):
    #Récupérer les informations d'un commit par l'api github
    token = os.environ["GITHUB_TOKEN"]
    owner, repo = os.environ["GITHUB_REPOSITORY"].split("/")
    url = f"https://api.github.com/repos/{owner}/{repo}/commits"
    headers = { "Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" }
    params = { "path": fichier, "per_page": 1 }
    response = requests.get( url, headers=headers, params=params, timeout=30 )
    print(f"[DEBUG] path transmis à GitHub : '{fichier}'")
    print(response.status_code)
    print(response.text)
    response.raise_for_status()
    commits = response.json()
    if not commits: return  { "gitVersion": 'none', "editorName": 'none', "editionDate": 'none'}
    commit = commits[0]
    return { "gitVersion": commit['sha'][:7], "editorName": commit["commit"]["author"]["name"], "editionDate": commit["commit"]["author"]["date"]}
