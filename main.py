import re
from pathlib import Path

import yaml


def define_env(env):

    @env.macro
    def debug_page():
        page = env.variables.get("page")
        if page is None:
            return "PAGE INTROUVABLE"
        return str(page.file.src_uri)

@env.macro
def sommaire():

    page = env.variables["page"]

    src_uri = page.file.src_uri

    dossier_stage = Path("docs") / Path(src_uri).parent

    resultat = []

    for fichier in sorted(dossier_stage.glob("*.md")):
        resultat.append(f"* {fichier.name}")

    return "\n"*join(resultat)

    @env.macro
    def derniere_modification():

        page = env.variables["page"]

        return (
            f'*Dernière mise à jour : {page.update_date}*'
        )