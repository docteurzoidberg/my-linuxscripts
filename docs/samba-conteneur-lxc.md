# Conteneur LXC samba avec volumes partagés depuis le master 

## Cas d'exemple

Nous disposons un serveur proxmox disposant d'un large espace de stockage (disque, raid, zfs, etc),

Et nous souhaitons partager certains dossier sur le réseau local windows.

Nous souhaitons que les permissions des fichiers sur le master restent inchangées peut importe les actions du CT.

Sur le master nous avons :

- /data/temp (disque seul)
 --/data/temp/downloads
      
- /data/storage (volume raid)
 -- /data/storage/films
 -- /data/storage/series
 -- /data/storage/musique
 -- /data/storage/[...]


-> nous voulons partager avec samba tous les dossiers de seconds niveaux ci-dessus.
	
## Réalisation

Objectifs:

- creer un utilisateur "temp-data" UID:5000 et groupe "temp-data" GID:5000 communs entre le CT et le master (même UID et GID)
pour les droits sur le volume /data/temp

- creer un utilisateur "storage-data" 5001 et groupe 5001 communs entre le CT et le master (même UID et GID)
pour les droits sur le volume /data/storage


### Creation users et groupes sur le master
	
	useradd --base-dir /data/temp --shell /bin/false --no-create-home -u 5000 temp-data
	useradd --base-dir /data/storage --shell /bin/false --no-create-home -u 5001 storage-data

### Changements propriétaires & permissions sur le master

	chown -R temp-data:temp-data /data/temp
	chown -R storage-data:storage-data /data/storage

	chmod -R 770 /data/temp
	chmod -R 770 /data/storage

### Creation du CT

Creer un CT base vierge debian 8
	
	...

### Creer les utilisateurs sur le CT

##### Entrer dans le ct
	
	pct start XXX
	pct enter XXX

##### Creation des futurs points de montage

	mkdir /mnt/temp
	mkdir /mnt/storage

/!\ Les permissions des points de montages heriteront de celle du master proxmox, mêmes UID/GID.

##### Ajouter les utilisateurs dans le CT

        useradd --base-dir /mnt/temp --shell /bin/false --no-create-home -u 5000 temp-data
        useradd --base-dir /mnt/storage --shell /bin/false --no-create-home -u 5001 storage-data

(Les noms des users peuvents être differents du master, mais pas les GUID/GID !)

### Arret du CT et configuration du montage LXC (sur master)

	pct stop XXX
	nano /etc/pve/lxc/XXX.conf
	
Ajouter les deux lignes en fin de fichier:

	lxc.mount.entry: /data/temp /var/lib/lxc/XXX/rootfs/mnt/temp/ none defaults,bind 0 0
	lxc.mount.entry: /data/storage /var/lib/lxc/XXX/rootfs/mnt/storage/ none defaults,bind 0 0

(Bien penser à remplacer les XXX par l'ID du CT)
	

### Redemarrage du CT et vérification des permissions


##### Sur le master 

	pct start 102
	pct enter 102

##### Sur le CT


L'affichage des droits devrait afficher quelque chose du style:

	ls -al /mnt/temp

	drwxrwx---  6 temp-data temp-data         4096 Feb 10 12:42 .

et 

	ls -al /mnt/storage

	drwxrwx---  6 storage-data storage-data         4096 Feb 10 12:42 .
 

### Temps mort

A ce niveau, on a reussi a partager deux volumes du master (/data/temp) et (/data/storage) dans un CT de facon transparente, aillant les memes permissions que sur le master.



## Installation et configuration de samba pour pas niquer les permissions




