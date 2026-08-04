import re
from pathlib import Path
import yaml
from datetime import datetime
from hooks.tools import charger_structure_stage

def define_env(env):

    @env.macro
    def sommaire():
        page = env.variables['page']
        dossier_stage = Path(page.file.abs_src_path).parent
        ateliers = charger_structure_stage(dossier_stage)
        html = []
        for numero_atelier in sorted(ateliers.keys()):
            exercices = sorted(ateliers[numero_atelier], key=lambda e: e['numero'])
            titre_atelier = None
            for exercice in exercices:
                if exercice['atelier_titre']:
                    titre_atelier = exercice['atelier_titre']
                    break
            html.append('<div class="somLab">')
            if titre_atelier: html.append(f'<div class="somLabTit">Atelier {numero_atelier} : {titre_atelier}</div>')
            else: html.append(f'<div class="somLabTit">Atelier {numero_atelier}</div>')
            html.append('<ul>')
            for exercice in exercices:
                html.append('<li class="somEx">')
                html.append( f'<a class="somExLink" href="{exercice["fichier"]}">Exercice {exercice["numero"]} - {exercice["titre"]}</a>' )
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
