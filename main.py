import re
from pathlib import Path

import yaml


def define_env(env):

    @env.macro
    def test():
        return "MACRO OK"

    @env.macro
    def sommaire():

        # Détermination du dossier du stage courant
        fichier_courant = env.variables["file"]
        src_uri = fichier_courant.src_uri

        # Exemple :
        # msms030/README.md
        dossier_stage = Path("docs") / Path(src_uri).parent

        ateliers = {}

        # Recherche des fichiers aXeY.md
        for fichier in dossier_stage.glob("a*e*.md"):

            correspondance = re.match(
                r"a(\d+)e(\d+)\.md",
                fichier.name,
                re.IGNORECASE
            )

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

            resultat = re.search(
                r"^#\s+(.+)$",
                contenu,
                re.MULTILINE
            )

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

        resultat_markdown = []

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
                resultat_markdown.append(
                    f"## Atelier {numero_atelier} : {titre_atelier}"
                )
            else:
                resultat_markdown.append(
                    f"## Atelier {numero_atelier}"
                )

            resultat_markdown.append("")

            duree_totale = 0

            for exercice in exercices:

                ligne = (
                    f"- "
                    f"[Exercice {exercice['numero']} - {exercice['titre']}]"
                    f"({exercice['fichier']})"
                )

                if exercice["duree"]:

                    ligne += f" ({exercice['duree']} min)"

                    try:
                        duree_totale += int(exercice["duree"])
                    except ValueError:
                        pass

                resultat_markdown.append(ligne)

            if duree_totale > 0:

                resultat_markdown.append("")
                resultat_markdown.append(
                    f"**Durée totale : {duree_totale} min**"
                )

            resultat_markdown.append("")

        return "\n".join(resultat_markdown)

    @env.macro
    def derniere_modification():

        page = env.variables["page"]

        return (
            f'*Dernière mise à jour : {page.update_date}*'
        )