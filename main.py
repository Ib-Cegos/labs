import re
import sys
from pathlib import Path

sys.path.append( str(Path(__file__).parent / "hooks"))
from tools import ( charger_structure_stage, analyser_exercice, extraire_titre_atelier, charger_markdown_stage, REGEX_EXERCICE )

def define_env(env):

    @env.macro
    def sommaire():
        page = env.variables['page']
        dossier_stage = Path(page.file.abs_src_path).parent
        ateliers = charger_structure_stage(dossier_stage)
        html = []
        for numero_atelier in sorted(ateliers.keys()):
            exercices = sorted(ateliers[numero_atelier], key=lambda e: e['numero'])
            titre_atelier = extraire_titre_atelier(exercices)
            html.append('<div class="somLab">')
            if titre_atelier: html.append(f'<div class="somLabTit">Atelier {numero_atelier} : {titre_atelier}</div>')
            else: html.append(f'<div class="somLabTit">Atelier {numero_atelier}</div>')
            html.append('<ul>')
            for exercice in exercices:
                html.append('<li class="somEx">')
                html.append( f'<a class="somExLink" data-stage="{dossier_stage.name.lower()}" data-exercice="{exercice["fichier"].rstrip("/")}" href="{exercice["fichier"]}">Exercice {exercice["numero"]} - {exercice["titre"]}</a>' )
                if exercice['duree']: html.append(f'<span class="somDuree">({exercice["duree"]} min)</span>')
                html.append('</li>')
            html.append('</ul>')
            html.append('</div>')
        return '\n'.join(html)

    @env.macro
    def liste_stages():
        docs = Path("docs")
        html = []
        html.append('<ul class="listeStages">')
        for dossier in sorted(docs.iterdir()):
            if not dossier.is_dir(): continue
            readme = dossier / "README.md"
            if not readme.exists(): continue
            titre = dossier.name
            contenu = readme.read_text(encoding="utf-8")
            match = re.search(r"^#\s+(.+)$", contenu, re.MULTILINE)
            if match: titre = match.group(1).strip()
            html.append( f'<li><a href="{dossier.name}/" class="stageLink">{dossier.name.upper()} - {titre}</a></li>' )
        html.append('</ul>')
        return "\n".join(html)

# Test à supprimer ensuite
stage = Path("docs/ms030")
markdown = charger_markdown_stage(stage)
print(markdown)