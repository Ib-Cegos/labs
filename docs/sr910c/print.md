---
title: Proxmox VE pour administrateurs VMware vSphere, réussir la transition
editionDate: 30/10/2026
gitVersion: 7bafe1e
auteur: ib cegos
---

# Proxmox VE pour administrateurs VMware vSphere, réussir la transition

## Sommaire

- Atelier 1 - Connexion au stockage iSCSI
    - <a class='ibPrintTocLink' href='#a1e1'>Exercice 1 - Découverte et connexion à une cible iSCSI</a>
    - <a class='ibPrintTocLink' href='#a1e2'>Exercice 2 - Exploitation du stockage iSCSI avec LVM</a>
- <a class='ibPrintTocLink' href='#a2e1'>Atelier 2 : Atelier</a>

<!-- IBCAN_PAGE_BREAK|a1e1 --># Atelier 1 - Connexion au stockage iSCSI

## Exercice 1 - Découverte et connexion à une cible iSCSI

<div class="ibPrintNotes" data-exercise="a1e1" hidden></div>

#### Objectif

Dans cet exercice, vous allez :

* Découvrir une cible iSCSI mise à disposition sur le réseau.
* Connecter le cluster Proxmox à cette cible.
* Vérifier la présence des LUN exposés par le serveur de stockage.
* Vérifier que les différents nœuds du cluster accèdent au même stockage partagé.

#### Étape 1 - Création du stockage iSCSI

1. Connectez-vous à l’interface d’administration du **Cluster 3 nœuds**. Firefox -> Scénario 3 -> PVE-03 (ou 04 ou 05)
2. Sélectionnez **Datacenter** -> **Storage** -> **Add** -> **iSCSI**
3. Dans la fenêtre "**Add iSCSI**", renseignez les paramètres suivants :
    | Paramètre | Valeur |
    | --- | --- |
    | ID | iscsiSAN |
    | Portal | 172.20.13.15 |
    | Target| Choisir iqn.2005-10.org.freenas.ctl:iscsi-target |
    | Nodes | All |
    | Enable | Oui |
    | Use LUNs | Oui |
4. Validez la création du stockage en cliquant sur **Add**
    ![add_iscsi](ressources/add_iscsi.png)

#### Étape 2 - Vérification de la connexion

1. Dans l’inventaire, sélectionnez le stockage **iscsiSAN**.
2. Consultez l'onglet **Status**.  
    Vous constatez que 3 LUNs sont maintenant visibles : LUN1, LUN2 et LUN3
3. Ouvrez une session **Shell** sur un **autre noeud** de votre cluster et exécutez la commande :```iscsiadm -m session```  
    Vous constatez qu'une session a bien été établie vers la cible iqn.2005-10.org.freenas.ctl:iscsi-target
5. Exécutez ensuite ```lsblk```  
    Vous pouvez maintenant identifier les nouveaux périphériques correspondant aux LUNs exposés par le serveur de stockage (sdb, sdc et sdd)
7. Vous pouvez fermer la fenêtre de la session Shell.
8. Dans l'interface d'administration, dans l'inventaire, vérifiez que **iscsiSAN** est visible sous chaque noeud de votre cluster.  
    En effet, le stockage iSCSI est un stockage partagé accessible simultanément par tous les noeuds du cluster

<!-- IBCAN_PAGE_BREAK|a1e2 --># Atelier 1 - Connexion au stockage iSCSI

## Exercice 2 - Exploitation du stockage iSCSI avec LVM

<div class="ibPrintNotes" data-exercise="a1e2" hidden></div>

#### Objectif

Dans cet exercice, vous allez :

* Créer un stockage LVM partagé reposant sur un LUN iSCSI.
* Déplacer une machine virtuelle vers ce stockage.
* Vérifier le fonctionnement du stockage partagé.
* Identifier les limitations du iSCSI/LVM.

#### Étape 1 - Création du stockage LVM

1. Connectez-vous à l’interface d’administration du **Cluster 3 nœuds**. Firefox -> Scénario 3 -> PVE-03 (ou 04 ou 05)
2. Sélectionnez **Datacenter** -> **Storage** -> **Add** -> **LVM**
3. Dans la fenêtre "**Add LVM**", renseignez les paramètres suivants :  
    | Paramètre | Valeur |
    | --- | --- |
    | ID | iscsiLVM |
    | Base Storage | iscsiSAN |
    | LUN | LUN 1 |
    | Volume Group | iscsiLVM |
    | Content | Disk image |
    | Shared | Oui |
4. Validez la création du stockage en cliquant sur **Add**  
    ![add_iscsilvm](ressources/add_iscsilvm.png)

#### Étape 2 - Vérification du stockage

1. Dans l’inventaire, vérifiez que **iscsiLVM** apparait également sur vos 2 autres noeuds (pve-04 et pve-05)
2. Si le stockage apparait avec un '?', il faut forcer un rescan depuis une session Shell sur chaque noeud :  
    ```
    pvscan --cache
    ```

#### Étape 3 - Déplacement de la machine virtuelle

1. Sélectionnez la machine virtuelle **Test-01**.  
2. Ouvrez l'onglet **Hardware**.
3. Sélectionnez le disque principal de la machine virtuelle.
4. Cliquez sur **Disk Action** puis **Move Storage**.  
    | Paramètre | Valeur |
    | --- | --- |
    | ID | iscsiLVM |
    | Target Storage | iscsiLVM |
    | Delete source | Oui |
5. Cliquez sur **Move Storage** et attendez la fin de l'opération.  
    Le disque virtuel de Test-01 est maintenant hébergé sur notre stockage iSCSI

<!-- IBCAN_PAGE_BREAK|a2e1 --># Atelier 2 : Atelier

<div class="ibPrintNotes" data-exercise="a2e1" hidden></div>

toto