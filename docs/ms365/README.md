---
Variables:
    onMicrosoftDomain:
        lib: Préfixe du tenant
        defaut: wwlxxxxx
        aide: Peut être trouvé dans le nom de domaine de l'administrateur "Office 365 Teannt Credentials" dans l'onglet "Home" du volet de gauche de votre environnement goDeploy.
    godeployDomain:
        lib: Domaine DNS de l'entreprise
        defaut: labXXXXX
        aide: Peut être trouvé sous le nom "Lab Domain" dans l'onglet "DNS" du volet de gauche de votre environnement goDeploy.        
    MODPassword:
        lib: Mot de passe de l'administrateur du tenant
        defaut: MOD Admin Password
        aide: Trouvable dans la section "Office 365 Tenant Credentials" de l'onglet "Home" du volet de gauche de votre environnement goDeploy.
    defaultPass:
        defaut: Pa55w.rd
    userPass:
        defaut: ibForm@tion
    365Licence:
        defaut: Microsoft 365 E5 (no Teams)
Auteur: Renaud Wangler
---

L'entreprise **ib Cegos Workshop (ICW)** héberge actuellement un environnement informatique *classique*, dans ses datacenters, qui comporte diverses applications historiques (comme Microsoft Exchange par exemple). L'entreprise a cependant récemment décidé de tester la migration vers les outils présents dans l'offre Microsoft 365, y voyant une opportunité économique ainsi qu'une opportunité d'améliorer la qualité du service apporté par le SI aux utilisateurs du métier.  

Au fil des ateliers de ce stage, vous allez prendre l'identité de Dominique Skyetson, membre de l'équipe d'administration IT de ICW.  
L'équipe projet de ib Cegos Workshop a donc décidé de mettre en oeuvre Microsoft 365 dans un projet pilote, afin de monter en compétence sur les produits et de voir les besoins métiers qui pourraient être couverts par les outils de l'offre Microsoft 365.  

{{ sommaire() }}

## Conseils génériques
1. Pour réaliser les ateliers de ce stage, vous allez utiliser un environnement de stage fourni par notre partenaire *goDeploy*. Cet environnement, qui inclut un compte de test Microsoft 365, comporte des instructions d'atelier (en anglais) que nous vous invitons à remplacer par les présentes instructions.
1. Si vous constatez des dérives entre les présentes instructions et les interfaces que vous rencontrez pendant votre atelier, n'hésitez pas à prévenir votre formateur/trice pour que les présentes instructions soient mises à jour.  
1. Les ateliers doivent être réalisés dans l'ordre prévu pour éviter les surprises.