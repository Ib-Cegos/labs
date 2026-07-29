import re
from pathlib import Path
import yaml


def define_env(env):

    @env.macro
    def workshop_toc():

        page = env.page

        current_dir = Path(page.file.src_path).parent

        exercices = []

        pattern = re.compile(r"a(\d+)e(\d+)\.md")

        for file in current_dir.glob("a*e*.md"):

            match = pattern.match(file.name)

            if not match:
                continue

            atelier_num = int(match.group(1))
            exercice_num = int(match.group(2))

            content = file.read_text(encoding="utf-8")

            title = file.stem

            if content.startswith("---"):
                parts = content.split("---", 2)

                metadata = yaml.safe_load(parts[1]) or {}

                content = parts[2]
            else:
                metadata = {}

            title_match = re.search(
                r"^#\s+(.+)$",
                content,
                re.MULTILINE
            )

            if title_match:
                title = title_match.group(1)

            exercices.append(
                {
                    "atelier": atelier_num,
                    "exercice": exercice_num,
                    "title": title,
                    "duree": metadata.get("duree"),
                    "atelier_title": metadata.get("atelier"),
                    "file": file.name,
                }
            )

        exercices.sort(
            key=lambda x: (x["atelier"], x["exercice"])
        )

        ateliers = {}

        for e in exercices:
            ateliers.setdefault(
                e["atelier"],
                []
            ).append(e)

        output = []

        for atelier_no, items in ateliers.items():

            atelier_title = None

            for item in items:
                if item["atelier_title"]:
                    atelier_title = item["atelier_title"]
                    break

            if atelier_title:
                output.append(
                    f"## Atelier {atelier_no} : {atelier_title}"
                )
            else:
                output.append(
                    f"## Atelier {atelier_no}"
                )

            total = 0

            for item in items:

                ligne = (
                    f"- [Exercice {item['exercice']} - "
                    f"{item{item['file']}"
                )

                if item["duree"]:
                    ligne += f" ({item['duree']} min)"
                    total += int(item["duree"])

                output.append(ligne)

            if total:
                output.append("")
                output.append(
                    f"**Durée totale : {total} min**"
                )

            output.append("")

        return "\n".join(output)