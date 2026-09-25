---
Atelier: Gestion des mises à jour avec Intune
---

# Gestion des mises à jour avec Intune
Il vous a été demandé de créer un environnement de mises à jour qui n'affecte que les machines membres du groupe "*Contoso Developer Devices*". Ce groupe doit répondre aux prérequis suivants :

- Quality update deferral period (days): **15**
- Feature update deferral period \(days\): **45**
- Option to pause Windows updates: **Disable**
- Option to check for Windows updates: **Enable**
- Delivery optimization: Download Mode: **HTTP only, no peering \(0\)**

## Prérequis
Les ateliers suivant de la formation md-102 doivent avoir été réalisés avant de réaliser cet atelier:

- 0203-Manage Device Enrollment into Intune
- 0204-Enrolling devices into Intune
- 0301-Creating and Deploying Configuration Profiles

    > Vous aurez également besoin d'un téléphone mobile vous permettant de recevoir des MS pour la configuration de Windows Hello.

## Etape 1 : Vérification des paramètres de mise à jour d'un périphérique

1. Sur **SEA-WS1**, connectez-vous avec le compte de **Aaron Nicholls** et le code pin `102938`. 
1. Ouvrez le menu **Start** et cliquez sur l'icône **Settings**.
1. Dans les **Settings**, sélectionnez **Windows Update**.

    > Notez qu'il vous est possible de mettre en pause les mises à jour pour un temps que vous pouvez choisir.

1. Sur la page **Windows Update**, sélectionnez **Advanced options**.
1. Sur la page **Advanced options** sélectionnez **Delivery Optimization**.
1. Sur la page **Delivery Optimization**, vérifiez que l'option **Allow downloads from other PCs** est active (**On**).
1. Sélectionnez **Devices on the internet and my local network**.
1. Retournez dans la page *Advanced options**, pour sélectionner **Configured update policies**.

    > Notez qu'aucune stratégie de mise à jour n'a été définié sur ce périphérique.

1. Dans le menu de navigation, sélectionnez **Windows Update**.

## Etape 2: Vérification de l'application des paramètres

1. Sur la page **Windows Update**, sélectionnez **Update history**.
1. Sous la liste des mises à jour installées, cliquez sur **Uninstall updates**. 
1. Jetez un oeil à la liste des mises à jour installées. Fermez la fenêtre **Installed Updates**.
1. Fermez la fenêtre **Settings**.

## Etape 3: Configuration des mises à jour dans Intune

1. Basculez vers la machine **SEA-SVR1**, connecté en `Contoso\Administrator` avec le mot de passe `Pa55w.rd`.
1. Depuis la barre des tâche, lancez **Microsoft Edge**. 
1. Dans Microsoft Edge, rendez-vous à l'adresse `https://endpoint.microsoft.com`.
1. Connectez-vous avec votre compte "*MOD Admin*".
1. Dans le menu de navigation à gauche, cliquez sur **Devices** et sélectionnez **Update rings for Windows 10 and later**.
1. Sur la page **Devices \| Update rings for Windows 10 and later**, cliquez sur **+ Create profile**.
1. SUr l'onglet **Basics**, saisissez les informations suivantes avant de cliquer sur **Next** :
    - Name : `Contoso Updates - standard`
    - Description: `Standard Windows updates configuration`  
1. Sur l'onglet **Update ring settings**, saisissez les informations suivantes avant de cliquer sur **Next** :
    - Quality update deferral period (days): `15`
    - Feature update deferral period (days): `45`
    - Option to pause Windows updates: **Disable**
    - Option to check for Windows updates: **Enable**
1. Sur l'onglet **Assignments**, cliquez sur **Add groups** sous **Included groups**. 
1. Dans la fenêtre **Select groups to include**, utilisez le champ **Search** pour trouver `Contoso Developer devices`, cochez la case en regard du groupe avant de cliquer sur **Select**.
1. Cliquez sur **Next** et, sur la page **Review + create**, cliquez sur **Create**.
1. Dans le menu de navigation, cliquez sur **Configuration profiles**, sous **Policy**.
1. Sur la page **Devices \| Configuration profiles**, Dans le panneau de détail, cliquez sur **+ Create/New policy**.
1. Dans le panneau **Create a profile**, Saisissez les informations suivantes avant de cliquer sur **Create**:
    - Platform: **Windows 10 and later**
    - Profile type: **Templates**
    - Template name: `Delivery Optimization`
1. Sur l'onglet **Basics** blade, saisissez les informations suivantes avant de cliquer sur **Next** :
    - Name: `Contoso Developer - Delivery optimization`
    - Description: `Delivery optimization for Developers`
1. Sur l'onglet **Configuration settings**, saisissez les informations suivantes avant de cliquer sur **Next** :
    - Download Mode: **HTTP only, no peering (0)**
1. Sur l'onglet **Assignments**, cliquez sur **Add groups** dans la section **Included groups**. 
1. Dans le panneau **Select groups to include**, sélectionnez `Contoso Developer devices` et cliquez sur **Select**.
1. Cliquez deux fois sur Select **Next**, puis, sur l'onglet **Review + create**, cliquez sur **Create**.

## Etape 4 : Vérication que les paramètres de mise à jour sont gérés centralement

1. Basculez vers **SEA-WS1**.
1. Ouvrez le menu **Start** et cliquez sur l'icône **Settings**.
1. Dans l'application **Settings**, sélectionnez **Accounts**, puis **Access work or school**.
1. Sur la page **Access work or school** , ouvrez la section **Connected to Contoso's Azure AD** pour cliquer sur le bouton **Info**.
1. Sur la page **Managed by Contoso**, cliquez sur le bouton **Sync**. Attendez que la synchronisation soit terminée. 
1. Dans l'application **Settings**, sélectionnez **Windows Update**.

    > Constatez que vous ne pouvez plus mettre en pause les mises à jour.

1. Cliquez sur **Advanced options**. 
1. Cliquez sur **Delivery Optimization**.

    > Notez que le choix **Allow downloads from other PCs** n'est plus disponible.

1. Dans l'application **Settings**, sélectionnez **Windows Update**.Cliquez sur **Advanced options**, pour sélectionner **Configured update policies**.

    > Notez les stratégies configurées sur ce périphérique.

10. Fermez toutes les fenêtres et la session Windows.
