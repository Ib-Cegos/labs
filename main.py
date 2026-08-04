import re
from pathlib import Path
import yaml
from datetime import datetime

def charger_structure_stage(dossier_stage):

    ateliers = {}

    for fichier in dossier_stage.glob('a*e*.md'):

        match = re.match(
            r'a(\d+)e(\d+)\.md$',
            fichier.name,
            re.IGNORECASE
        )

        if not match:
            continue

        numero_atelier = int(match.group(1))
        numero_exercice = int(match.group(2))

        contenu = fichier.read_text(encoding='utf-8')

        metadata = {}

        if contenu.startswith('---'):
            morceaux = contenu.split('---', 2)

            if len(morceaux) >= 3:
                metadata = yaml.safe_load(morceaux[1]) or {}

            contenu = morceaux[2]

        titre = fichier.stem

        titre_match = re.search(
            r'^#\s+(.+)$',
            contenu,
            re.MULTILINE
        )

        if titre_match:
            titre = titre_match.group(1).strip()

        atelier = ateliers.setdefault(
            numero_atelier,
            {
                'titre': metadata.get('Atelier'),
                'exercices': []
            }
        )

        atelier['exercices'].append(
            {
                'numero': numero_exercice,
                'titre': titre,
                'fichier': fichier.stem + '/',
                'duree': metadata.get('Duree'),
                'atelier_titre': metadata.get('Atelier')
            }
        )

    return ateliers

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
