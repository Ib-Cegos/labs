---
Variables:
    onMicrosoftDomain:
        lib: Préfixe du tenant
        defaut: wwlxxxxx
        aide: Peut être trouvé dans le nom de domaine de l'administrateur "Office 365 Teannt Credentials" dans l'onglet "Home" du volet de gauche de votre environnement goDeploy.
    MODPassword:
        lib: Mot de passe de l'administrateur du tenant
        defaut: MOD Admin Password
        aide: Trouvable dans la section "Office 365 Tenant Credentials" de l'onglet "Home" du volet de gauche de votre environnement goDeploy.
    godeployDomain:
        lib: Domaine DNS de l'entreprise
        defaut: labXXXXX
        aide: Peut être trouvé sous le nom "Lab Domain" dans l'onglet "DNS" du volet de gauche de votre environnement goDeploy.
    userPass:
        defaut: ibForm@tion
---

# Administration de Microsoft 365
L'entreprise Adatum héberge actuellement un environnement informatique *classique*, dans ses datacenters, qui comporte diverses applications historiques (comme Microsoft Exchange par exemple). L'entreprise a cependant récemment acquis un abonnement Microsoft 365, voyant ici l'opportunité d'un déploiement hybride et d'un rapprochement des applications du Cloud.  

Au fil des ateliers de ce stage, vous allez prendre l'identité de Dominique Skyetson, membre de l'équipe d'administration IT de Adatum.

L'équipe projet de Adatum a décidé de mettre en œuvre Microsoft 365  dans un projet pilote, afin de monter en compétence sur le produit et de voir les besoins métiers qui pourraient être couverts par les produits de l'offre Microsoft 365.
{{ sommaire() }}

{{ test_export_stage() }}