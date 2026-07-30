import re
from pathlib import Path

def on_page_markdown(markdown, page, config, files):
    markdown = markdown.replace("\t", "    ")
    return markdown


def construire_navigation(page):
    fichier_courant = Path(page.file.src_uri).name
    match = re.match(r"a(\d+)e(\d+)\.md$", fichier_courant, re.IGNORECASE)
    if not match:
        return ""
    numero_atelier = int(match.group(1))
    numero_exercice = int(match.group(2))
    dossier_stage = Path(page.file.abs_src_path).parent
    exercices = []
    for fichier in dossier_stage.glob(f"a{numero_atelier}e*.md"):
        m = re.match(r"a(\d+)e(\d+)\.md$", fichier.name, re.IGNORECASE)
        if m:
            exercices.append((int(m.group(2)), fichier.stem))
    exercices.sort(key=lambda x: x[0])
    if len(exercices) <= 1:
        return ""
    position = next(
        (i for i, (n, _) in enumerate(exercices) if n == numero_exercice),
        None,
    )

    if position is None:
        return ""
    precedent = exercices[position - 1][1] if position > 0 else None
    suivant = exercices[position + 1][1] if position < len(exercices) - 1 else None
    html = []
    html.append('<div class="navEx">')
    if precedent:
        html.append(
            f'<a class="navPrev" href="../{precedent}/">← Exercice précédent</a>'
        )
    else:
        html.append('<span></span>')

    html.append(
        '<a class="navSom" href="../">Sommaire</a>'
    )
    if suivant:
        html.append(
            f'<a class="navNext" href="../{suivant}/">Exercice suivant →</a>'
        )
    else:
        html.append('<span></span>')
    html.append('</div>')
    return ''.join(html)


def on_page_content(html, page, config, files):
    navigation_html = construire_navigation(page)

    if not navigation_html:
        return html

    return html + navigation_html
