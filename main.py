import re
from pathlib import Path
import yaml


def define_env(env):
    @env.macro
    def workshop_toc():
        dossier = Path(env.page.file.src_path).parent
        ateliers = {}
        # Recherche tous les fichiers du type a1e1.md
        for fichier in dossier.glob("a*e*.md"):
            correspondance = re.match(r"a(\d+)e(\d+)\.md", fichier.name)
            if not correspondance:
                continue
            numero_atelier = int(correspondance.group(1))
            numero_exercice = int(correspondance.group(2))
            contenu = fichier.read_text(encoding="utf-8")
            metadata = {}
            # Lecture du Front Matter YAML
            if contenu.startswith("---"):
                morceaux = contenu.split("---", 2)
                if len(morceaux) >= 3:
                    metadata = yaml.safe_load(morceaux[1]) or {}
                    contenu = morceaux[2]
            # Recherche du premier titre H1
            titre = fichier.stem
            resultat = re.search(r"^#\s+(.+)$", contenu, re.MULTILINE)
            if resultat:
                titre = resultat.group(1).strip()
            exercice = {
                "numero": numero_exercice,
                "titre": titre,
                "fichier": fichier.name,
                "duree": metadata.get("duree"),
                "titre_atelier": metadata.get("atelier")
            }
            if numero_atelier not in ateliers:
                ateliers[numero_atelier] = []
            ateliers[numero_atelier].append(exercice)
        resultat_html = []
        for numero_atelier in sorted(ateliers.keys()):
            exercices = sorted(
                ateliers[numero_atelier],
                key=lambda e: e["numero"]
            )
            titre_atelier = None
            for exercice in exercices:
                if exercice["titre_atelier"]:
                    titre_atelier = exercice["titre_atelier"]
                    break
            if titre_atelier:
                resultat_html.append(
                    f"## Atelier {numero_atelier} : {titre_atelier}"
                )
            else:
                resultat_html.append(
                    f"## Atelier {numero_atelier}"
                )

            resultat_html.append("")
            duree_totale = 0
            for exercice in exercices:
                ligne = (
                    f"- [Exercice {exercice['fichier']}"
                )
                if exercice["duree"]:
                    ligne += f" ({exercice['duree']} min)"
                    try:
                        duree_totale += int(exercice["duree"])
                    except ValueError:
                        pass
                resultat_html.append(ligne)
            if duree_totale > 0:

                resultat_html.append("")
                resultat_html.append(
                    f"**Durée totale : {duree_totale} min**"
                )
            resultat_html.append("")
        return "\n".join(resultat_html)