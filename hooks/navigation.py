# hooks/navigation.py

def on_page_markdown(markdown, page, config, files):
    print("HOOK MKDOCS")
    markdown += "\n\nHOOK_MKDOCS\n"
    return markdown