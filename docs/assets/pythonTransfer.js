// Généré automatiquement - Ne pas modifier
    const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".bmp", ".gif"];
    const IMAGE_REGEX = /\.(png|jpg|jpeg|webp|svg|bmp|gif)$/i;
    const ILLUSTRATION_REGEX = /^a\d+e\d+\.(png|jpg|jpeg|webp|svg|bmp|gif)$/i;
    const SYSTEM_VARIABLES = {
    "ResourcesUrl": {
        "defaut": "[site_url]/[stage]/ressources",
        "lib": "URL du dossier des ressources du stage en cours",
        "system": true
    }
};
    function isImageFile(path) {return IMAGE_REGEX.test(path);}
    function isIllustration(path) {return ILLUSTRATION_REGEX.test(path);}
