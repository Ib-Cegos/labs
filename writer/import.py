from pathlib import Path
import json
import zipfile

WRITER_DIR = Path("writer")
DOCS_DIR = Path("docs")

def generer_yaml_readme(stage):
    variables = stage.get("Variables", {})
    yaml_lines = ["---", f"Auteur: {stage["Auteur"]}"]
    if variables:
        yaml_lines.append("Variables:")
        for nom, variable in variables.items():
            yaml_lines.append(f"    {nom}:")
            for cle, valeur in variable.items():
                yaml_lines.append(f"        {cle}: {valeur}")
    yaml_lines.append("---")
    return "\n".join(yaml_lines)

def generer_readme(stage):
    contenu = []
    variables_yaml = generer_yaml_readme(stage)
    if variables_yaml:
        contenu.append(variables_yaml)
        contenu.append("")
    contenu.append(f"# {stage['Titre']}")
    contenu.append("")
    introduction = stage.get("Introduction","").strip()
    if introduction: contenu.append(introduction)
    print(contenu)
    return "\n".join(contenu)

def generer_exercice(exercice, titre_atelier=None):
    contenu = []
    yaml_lines = []
    if titre_atelier: yaml_lines.append(f"Atelier: {titre_atelier}" )
    if exercice.get("Duree"): yaml_lines.append(f"Duree: {exercice['Duree']}")
    if yaml_lines:
        contenu.append("---")
        contenu.extend(yaml_lines)
        contenu.append("---")
        contenu.append("")
    contenu.append( f"# {exercice['Titre']}")
    contenu.append("")
    contenu_markdown = exercice.get("Contenu","").strip()
    if contenu_markdown: contenu.append(contenu_markdown)
    return "\n".join(contenu)

def importer_stage(zip_file):
    with zipfile.ZipFile(zip_file, "r") as zipf:
        with zipf.open("content.json") as f:
            stage = json.load(f)
    reference = stage["Reference"]
    dossier_stage = (DOCS_DIR / reference)
    dossier_stage.mkdir(parents=True,exist_ok=True)
    print(f"Import du stage {reference}")
    # README.md
    readme = dossier_stage / "README.md"
    readme.write_text(generer_readme(stage),encoding="utf-8")
    # Exercices
    for atelier in stage.get("Ateliers",[]):
        atelier_id = atelier["Id"]
        titre_atelier = atelier["Titre"]
        for index, exercice in enumerate(atelier.get("Exercices", [])):
            exercice_id = exercice["Id"]
            nom_fichier = (f"a{atelier_id}e{exercice_id}.md")
            fichier = (dossier_stage / nom_fichier)
            titre_atelier = (atelier["Titre"] if index == 0 else None)
            fichier.write_text(generer_exercice(exercice, titre_atelier),encoding="utf-8")

def main():
    for zip_file in sorted(WRITER_DIR.glob("*.ibcan")):
        importer_stage(zip_file)
        try:
            zip_file.unlink()
            print(f"Stage traité et supprimé : {zip_file}")
        except Exception as e: print(f"Impossible de supprimer {zip_file} : {e}")

if __name__ == "__main__":
    main()