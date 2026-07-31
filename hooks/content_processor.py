import re
from pathlib import Path

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

def ajouter_boutons_copie(html):
    pattern = re.compile(
        r'(<pre.*?</pre>)',
        re.DOTALL
    )
    def remplace(match):
        bloc = match.group(1)
        return (
            '<div class="ibCodeBlock">'
            '<button class="ibCopyButton" onclick="ibCopy(this)">'
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4C2.89 1 2 1.89 2 3V17H4V3H16V1M19 5H8C6.89 5 6 5.89 6 7V21C6 22.11 6.89 23 8 23H19C20.11 23 21 22.11 21 21V7C21 5.89 20.11 5 19 5M19 21H8V7H19V21Z"/></svg>'
            '</button>'
            f'{bloc}'
            '</div>'
        )
    return pattern.sub(remplace, html)


def on_page_content(html, page, config, files):
    html = ajouter_boutons_copie(html)
    navigation_html = construire_navigation(page)
    if not navigation_html:
        return html
    return html + navigation_html

def on_page_markdown(markdown, page, config, files):
    """
    Préfixe automatiquement le premier titre H1 des exercices.
    Exemple :
        # Création de l'environnement
    devient :
        # Atelier 1 - Exercice 1 : Création de l'environnement
    """
    fichier = Path(page.file.src_uri).name
    match = re.fullmatch(
        r"a(\d+)e(\d+)\.md",
        fichier,
        re.IGNORECASE,
    )
    if not match:
        return markdown
    numero_atelier = match.group(1)
    numero_exercice = match.group(2)
    markdown = re.sub(
        r"^#\s+(.+)$",
        rf'# <span class="exerciceRef">Atelier {numero_atelier} - Exercice {numero_exercice} :</span> \1',
        markdown,
        count=1,
        flags=re.MULTILINE,
    )
    return markdown
