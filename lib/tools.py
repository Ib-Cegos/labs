import re
from pathlib import Path
import yaml

def charger_structure_stage(dossier_stage):
    ateliers = {}
    for fichier in dossier_stage.glob('a*e*.md'):
        match = re.match( r'a(\d+)e(\d+)\.md$', fichier.name, re.IGNORECASE )
        if not match: continue
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
        titre_match = re.search( r'^#\s+(.+)$', contenu, re.MULTILINE )
        if titre_match: titre = titre_match.group(1).strip()
        ateliers.setdefault( numero_atelier, [] ).append({ 'numero': numero_exercice, 'titre': titre, 'fichier': fichier.stem + '/', 'duree': metadata.get('Duree'), 'atelier_titre': metadata.get('Atelier')})
    return ateliers