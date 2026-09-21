from pathlib import Path
import yaml
import re
import json
import zipfile
import sys
sys.path.append( str(Path(__file__).parent.parent / "hooks"))
import tools

def importer_exercice(fichier):
    resultat = {"Titre": "","Atelier": "","Duree": None,"Contenu": ""}
    contenu = fichier.read_text(encoding="utf-8")
    yaml_match = re.match(r"^\s*---\s*\r?\n(.*?)\r?\n---\s*\r?\n?(.*)$",contenu,re.DOTALL)
    markdown = contenu
    if yaml_match:
        yaml_content = yaml_match.group(1)
        markdown = yaml_match.group(2)
        try:
            metadata = yaml.safe_load(yaml_content) or {}
            resultat["Atelier"] = (metadata.get("Atelier") or metadata.get("atelier") or "")
            resultat["Duree"] = (metadata.get("Duree") or metadata.get("Durée") or metadata.get("duree"))
        except Exception as e:
            print(f"Erreur YAML : {e}")
    titre_match = re.search(r"^#\s+(.*)$",markdown,re.MULTILINE)
    if titre_match:
        resultat["Titre"] = (titre_match.group(1).strip())
        resultat["Contenu"] = (markdown[titre_match.end():].strip())
    else:
        resultat["Contenu"] = markdown.strip()
    return resultat

def importer_ateliers(stage_path):
    stage = Path(stage_path)
    ateliers = {}
    for fichier in sorted(stage.glob("*.md")):
        match = re.match(r"a(\d+)e(\d+)\.md$",fichier.name,re.IGNORECASE)
        if not match: continue
        atelier_id = int(match.group(1))
        exercice_id = int(match.group(2))
        exercice = importer_exercice(fichier)
        titre_atelier = exercice.pop("Atelier", "")
        exercice["Id"] = exercice_id
        if atelier_id not in ateliers:
            ateliers[atelier_id] = {"Id": atelier_id,"Titre": titre_atelier,"Exercices": []}
        elif not ateliers[atelier_id]["Titre"] and titre_atelier: ateliers[atelier_id]["Titre"] = titre_atelier
        ateliers[atelier_id]["Exercices"].append(exercice)
    ateliers_tries = sorted(ateliers.values(),key=lambda a: a["Id"])
    for atelier in ateliers_tries:
        atelier["Exercices"] = sorted(atelier["Exercices"],key=lambda e: e["Id"])
    return ateliers_tries

def importer_stages(repertoire_docs: str):
    docs = Path(repertoire_docs)
    catalogue = { "Stages": [] }
    for dossier in sorted(docs.iterdir()):
        if not dossier.is_dir(): continue
        readme = dossier / "README.md"
        if not readme.exists(): continue
        stage = lire_readme(dossier)
        stage["Reference"] = dossier.name
        stage["Ateliers"] = importer_ateliers(dossier)
        catalogue["Stages"].append(stage)
    return catalogue

def lire_readme(stage_path: str) -> dict:
    readme = Path(stage_path) / "README.md"
    resultat = {"Titre": "","Auteur": "","Variables": {},"Introduction":""}
    if not readme.exists(): return
    contenu = readme.read_text( encoding="utf-8" )
    # Extraction du YAML
    yaml_match = re.match( r"^\s*---\s*\n(.*?)\n---\s*\n?(.*)$", contenu, re.DOTALL )
    markdown = contenu
    if yaml_match:
        yaml_content = yaml_match.group(1)
        markdown = yaml_match.group(2)
        try:
            metadata = yaml.safe_load(yaml_content) or {}
            resultat["Auteur"] = metadata.get( "Auteur", "" )
            resultat["Variables"] = metadata.get( "Variables", {} )
        except Exception as e: print ( f"Erreur YAML : {e}" )
    # Extraction du premier H1
    titre_match = re.search(r"^#\s+(.*)$", markdown, re.MULTILINE)
    if titre_match:
        resultat["Titre"] = titre_match.group(1).strip()
        introduction = markdown[titre_match.end():].strip()
        resultat["Introduction"] = introduction
    else:
        resultat["Titre"] = "Stage sans titre"
        resultat["Introduction"] = markdown.strip()
    return resultat

def main():
    catalogue = importer_stages("docs")
    for stage in catalogue["Stages"]:
        stage_path = Path("docs") / stage["Reference"]
        chemin_zip = (Path("docs") / stage["Reference"] / f"{stage['Reference']}.zip")
        json_content = json.dumps(stage, ensure_ascii=False, indent=4)
        with zipfile.ZipFile(chemin_zip, "w", compression=zipfile.ZIP_DEFLATED) as zipf: 
            zipf.writestr("content.json", json_content)
            for fichier in stage_path.iterdir():
                if (fichier.is_file() and fichier.suffix.lower() in tools.IMAGE_EXTENSIONS):
                    zipf.write(fichier, fichier.name)
            images_dir = stage_path / "images"
            if images_dir.exists():
                for fichier in images_dir.rglob("*"):
                    if (fichier.is_file()):
                        zipf.write(fichier, fichier.relative_to(stage_path))

if __name__ == "__main__":
    main()