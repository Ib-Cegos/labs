#Ici se trouvent les fonctions utilisables dans les autres scripts python
import re
import yaml
from pathlib import Path

REGEX_EXERCICE = re.compile( r"a(\d+)e(\d+)\.md$", re.IGNORECASE )
YAML_ERRORS = []

def charger_structure_stage(dossier_stage):
    ateliers = {}
    for fichier in dossier_stage.glob('a*e*.md'):
        match = REGEX_EXERCICE.match(fichier.name)
        if not match: continue
        numero_atelier, numero_exercice = analyser_exercice(fichier.name)
        contenu = fichier.read_text(encoding='utf-8')
        metadata = {}
        if contenu.startswith('---'):
            morceaux = contenu.split('---', 2)
            if len(morceaux) >= 3:
                try:
                    metadata = yaml.safe_load(morceaux[1]) or {}
                except yaml.YAMLError as erreur:
                    YAML_ERRORS.append({"fichier": str(fichier), "erreur": str(erreur)})
                    metadata = {}
                contenu = morceaux[2]
        titre = fichier.stem
        titre_match = re.search( r'^#\s+(.+)$', contenu, re.MULTILINE )
        if titre_match: titre = titre_match.group(1).strip()
        ateliers.setdefault( numero_atelier, [] ).append({ 'numero': numero_exercice, 'titre': titre, 'fichier': fichier.stem + '/', 'duree': metadata.get('Duree'), 'atelier_titre': metadata.get('Atelier')})
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
            YAML_ERRORS.append({"fichier": str(readme),"erreur": str(erreur)})
            return {}
    except Exception as erreur:
        print( f"Erreur lecture méta atelier : {erreur}" )
        return {}  

# Gestion des ateliers "autonomes"
def est_atelier_autonome(page):
    dossier_stage = Path(page.file.abs_src_path).parent
    ateliers = charger_structure_stage(dossier_stage)
    nombre_exercices = sum(
        len(exercices)
        for exercices in ateliers.values() )
    return (
        len(ateliers) == 1
        and nombre_exercices == 1)

def extraire_titre_atelier(exercices):
    for exercice in exercices:
        if exercice["atelier_titre"]: return exercice["atelier_titre"]
    return None        