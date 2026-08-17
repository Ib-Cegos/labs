from pathlib import Path
import sys

sys.path.append(str(Path(__file__).parent / "hooks"))
import tools

docs = Path("docs")
for dossier in docs.iterdir():
    if not dossier.is_dir(): continue
    readme = dossier / "README.md"
    if not readme.exists(): continue
    if tools.est_dossier_autonome( dossier ): contenu = (tools.charger_markdown_atelier_autonome(dossier))
    else: contenu = tools.charger_markdown_stage(dossier)
    contenu = tools.preparer_variables_print(dossier,contenu)
    (dossier / "print.md").write_text( contenu, encoding="utf-8" )
    print(repr(tools.construire_yaml_print(titre, dossier_stage)))