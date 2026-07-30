import re
from pathlib import Path

def on_page_markdown(markdown, page, config, files):
    fichier = Path(page.file.src_uri).name
    if re.fullmatch(r"a\d+e\d+\.md", fichier, re.IGNORECASE):
        print(f"Injection navigation : {fichier}")
        markdown += "\n\n{{ ibNav() }}\n"
    return markdown