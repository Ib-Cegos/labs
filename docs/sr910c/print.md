---
title: Proxmox VE pour administrateurs VMware vSphere, réussir la transition
editionDate: 30/10/2026
gitVersion: b2f8dc5
auteur: ib cegos
---

# Proxmox VE pour administrateurs VMware vSphere, réussir la transition

![proxmox_logo](ressources/proxmox_logo.png)

Suivez les instructions fournies par votre formateur pour vous connecter à votre environnement. Vous allez ouvrir une session sur une VM Windows Server 2019, qui sera votre poste de travail pour toute la durée de la formation  

* Sauf indication contraire, le mot de passe à utiliser sera toujours **Proxmox1!**
* Pour vous faire gagner du temps pendant les ateliers, un certain nombre de « facilités » ont été mises en place  
    * AutoLogon sur les VMs Windows  
    * Dans Firefox, favoris préconfigurés vers les outils d’administration  
    * Mots de passe pré-enregistrés dans Firefox

## Sommaire

- Atelier 1 - Du cluster vSphere au cluster Proxmox
    - <a class='ibPrintTocLink' href='#a1e1'>Exercice 1 - Connexion au storage iSCSI</a>
    - <a class='ibPrintTocLink' href='#a1e2'>Exercice 2 - Exploitation du stockage iSCSI avec LVM</a>
    - <a class='ibPrintTocLink' href='#a1e3'>Exercice 3 - Exploitation du stockage iSCSI avec Volume Chain</a>
- <a class='ibPrintTocLink' href='#a2e1'>Atelier 2 : Vérification de l'existant</a>

<!-- IBCAN_PAGE_BREAK|a1e1 --># Atelier 1 - Du cluster vSphere au cluster Proxmox

## Exercice 1 - Connexion au storage iSCSI

<div class="ibPrintNotes" data-exercise="a1e1" hidden></div>

#### Objectifs :

Dans cet exercice, vous allez :

- Connecter votre cluster Proxmox une cible iSCSI contenant des LUNs
- Exploiter le stockage iSCSI avec LVM
- Exploiter le stockage iSCSI avec LVM Volume-Chain

#### Tâche 1 - Découverte et connexion à une cible iSCSI

##### A - Création du stockage iSCSI

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

##### B - Vérification de la connexion

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

#### Tâche 2 - Exploitation du stockage iSCSI avec LVM

##### A - Création du stockage LVM

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

##### B - Vérification du stockage

1. Dans l’inventaire, vérifiez que **iscsiLVM** apparait également sur vos 2 autres noeuds (pve-04 et pve-05)
2. Si le stockage apparait avec un '?', il faut forcer un rescan depuis une session Shell sur chaque noeud :  
    ```
    pvscan --cache
    ```

##### C - Déplacement de la machine virtuelle

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

##### D - Limitations du LVM

1. Sélectionnez la machine virtuelle **Test-01**.  
2. Ouvrez l'onglet **Snapshots**.  
    Vous constatez ici que le bouton Snapshot est grisé  
    En effet, le stockage LVM partagé sur iSCSI utilise des volumes logiques RAW. Ce type de stockage ne prend pas en charge les snapshots de disques virtuels utilisés par Proxmox. Les fonctionnalités de snapshot nécessitent un mécanisme de type copy-on-write, disponible sur d'autres stockages comme QCOW2, ZFS ou Ceph RDB.  
    Le stockage iSCSI/LVM classique privilégie la simplicité et les performances, au détriment des fonctionnalités avancées de gestion des snapshots
    
#### Tache 3 - Exploitation du stockage iSCSI avec Volume Chain

##### A - Création du stockage LVM avec Volume Chain

1. Connectez-vous à l’interface d’administration du **Cluster 3 nœuds**. Firefox -> Scénario 3 -> PVE-03 (ou 04 ou 05)
2. Sélectionnez **Datacenter** -> **Storage** -> **Add** -> **LVM**
3. Dans la fenêtre "**Add LVM**", renseignez les paramètres suivants :

    | Paramètre | Valeur |
    | --- | --- |
    | ID | iscsiQCOW |
    | Base Storage | iscsiSAN |
    | LUN | LUN 2 |
    | Volume Group | iscsiQCOW |
    | Content | Disk image |
    | Shared | Oui |
    | Allow Snapshots as Volume-Chain | Oui |

4. Validez la création du stockage en cliquant sur **Add**  
    ![add_iscsiqcow](ressources/add_iscsiqcow.png)

##### B - Vérification du stockage

1. Dans l’inventaire, vérifiez que **iscsiQCOW** apparait également sur vos 2 autres noeuds (pve-04 et pve-05)
2. Si le stockage apparait avec un '?', il faut forcer un rescan depuis une session Shell sur chaque noeud :  
    ```
    pvscan --cache
    ```

##### C - Déplacement de la machine virtuelle

1. Sélectionnez la machine virtuelle **Test-01**.  
2. Ouvrez l'onglet **Hardware**.
3. Sélectionnez le disque principal de la machine virtuelle.
4. Cliquez sur **Disk Action** puis **Move Storage**.

    | Paramètre | Valeur |
    | --- | --- |
    | ID | iscsiLVM |
    | Target Storage | iscsiQCOW |
    | Format | QEMU image format (qcow2) |
    | Delete source | Oui |

5. Cliquez sur **Move Storage** et attendez la fin de l'opération.  
    Le disque virtuel de Test-01 est maintenant hébergé sur notre stockage iSCSI

<!-- IBCAN_PAGE_BREAK|a1e2 --># Atelier 1 - Du cluster vSphere au cluster Proxmox

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

#### Étape 4 - Limitations du LVM

1. Sélectionnez la machine virtuelle **Test-01**.  
2. Ouvrez l'onglet **Snapshots**.  
    Vous constatez ici que le bouton Snapshot est grisé  
    En effet, le stockage LVM partagé sur iSCSI utilise des volumes logiques RAW. Ce type de stockage ne prend pas en charge les snapshots de disques virtuels utilisés par Proxmox. Les fonctionnalités de snapshot nécessitent un mécanisme de type copy-on-write, disponible sur d'autres stockages comme QCOW2, ZFS ou Ceph RDB.  
    Le stockage iSCSI/LVM classique privilégie la simplicité et les performances, au détriment des fonctionnalités avancées de gestion des snapshots

<!-- IBCAN_PAGE_BREAK|a1e3 --># Atelier 1 - Du cluster vSphere au cluster Proxmox

## Exercice 3 - Exploitation du stockage iSCSI avec Volume Chain

<div class="ibPrintNotes" data-exercise="a1e3" hidden></div>

#### Objectif

Dans cet exercice, vous allez :  

* Créer un stockage partagé reposant sur le second LUN iSCSI.  
* Déplacer une machine virtuelle vers ce stockage.  
* Identifier les différences avec le stockage LVM utilisé précédemment.  
* Utiliser les fonctionnalités de snapshot offertes par ce nouveau type de stockage.  

#### Étape 1 - Création du stockage LVM avec Volume Chain

1. Connectez-vous à l’interface d’administration du **Cluster 3 nœuds**. Firefox -> Scénario 3 -> PVE-03 (ou 04 ou 05)
2. Sélectionnez **Datacenter** -> **Storage** -> **Add** -> **LVM**
3. Dans la fenêtre "**Add LVM**", renseignez les paramètres suivants :  
    | Paramètre | Valeur |
    | --- | --- |
    | ID | iscsiQCOW |
    | Base Storage | iscsiSAN |
    | LUN | LUN 2 |
    | Volume Group | iscsiQCOW |
    | Content | Disk image |
    | Shared | Oui |
    | Allow Snapshots as Volume-Chain | Oui |
4. Validez la création du stockage en cliquant sur **Add**  
    ![add_iscsiqcow](ressources/add_iscsiqcow.png)

#### Étape 2 - Vérification du stockage

1. Dans l’inventaire, vérifiez que **iscsiQCOW** apparait également sur vos 2 autres noeuds (pve-04 et pve-05)
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
    | Target Storage | iscsiQCOW |
    | Format | QEMU image format (qcow2) |
    | Delete source | Oui |
5. Cliquez sur **Move Storage** et attendez la fin de l'opération.  
    Le disque virtuel de Test-01 est maintenant hébergé sur notre stockage iSCSI

<!-- IBCAN_PAGE_BREAK|a2e1 --># Atelier 2 : Vérification de l'existant

<div class="ibPrintNotes" data-exercise="a2e1" hidden></div>

toto