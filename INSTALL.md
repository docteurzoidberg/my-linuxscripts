# Installation from scratch

## 0) Pré-requis

### obligatoire:

	apt-get install git figlet toilet

### ne pas oublier (toujours utile):

	apt-get install wget curl ca-certificates openssl

## 1) Cloner le repo dans /root/scripts

	apt-get install git
	git clone https://github.com/docteurzoidberg/my-proxmox-scripts.git /root/scripts

## 2) Re-créer les dossiers manquants

	mkdir /root/logs
	mkdir /root/backups

Ceux si sont créés automatiquement lors de l'utilisation de rezen, initen, backup, naten

	mkdir /root/scripts/rezo.d/rezo-enabled
	mkdir /root/scripts/nat.d/nat-enabled
	mkdir /root/scripts/init.d/init-enabled
	mkdir /root/scripts/backup.d/backup-enabled

## 3) Installer le script d'init pour le systeme

	cd /root/scripts
	./init install

(./init uninstall pour enlever le script du démarrage)

## 4) Activer le script sample et rezo à l'init

	cd /root/scripts
	./init sample enable
	./init rezo enable

## 5) Creation fichier rezo & nat pour un / des CT

### fichier rezo (exemple pour ct 100)

	cd /root/scripts/rezo.d/rezo-available
	cp netsample net100

Editer le fichier net100 pour qu'il utilise les bonne ip/variables

Activation du fichier net100

	cd /root/scripts
	./rezo 100 enable

### fichier nat (exemple pour ct 100)

  cd /root/scripts/nat.d/nat-available
  cp vmsample vm100

Editer le fichier vm100 et ajouter les redirections IP:PORT

Activation du fichier vm100

  cd /root/scripts
  ./nat 100 enable

## 6) Appliquer la conf nat & rezo

	cd /root/scripts
	./rezo apply

## 7) Rebooter pour verifier

	reboot

	[...]

	cd /root/scripts

### Vérification init
	cat /root/logs/init-sample.log

### Vérification nat
	./nat show


---

# Upgrade depuis anciens scripts (ou ancienne installation depuis .zip)

Exemple pour ancien dossier scripts = /root/oldscripts
Nouveau = /root/newscripts

## 1) renommer le dossier actuel /root/scripts en /root/oldscripts

	cd /root
	mv scripts oldscripts

## 2) suivre la procedure d'installation from scratch mais ne pas faire la configuration

## 3) recopier les scripts: (ne pas recopier vmsample et netsample !)

	cp /root/oldscripts/nat.d/nat-available/vm1* /root/scripts/nat.d/nat-available/
	cp /root/oldscripts/nat.d/nat-available/vm2* /root/scripts/nat.d/nat-available/
	cp /root/oldscripts/nat.d/nat-available/vm3* /root/scripts/nat.d/nat-available/

	cp /root/oldscripts/rezo.d/rezo-available/net1* /root/scripts/rezo.d/rezo-available/
	cp /root/oldscripts/rezo.d/rezo-available/net2* /root/scripts/rezo.d/rezo-available/
	cp /root/oldscripts/rezo.d/rezo-available/net3* /root/scripts/rezo.d/rezo-available/

## 4) recopier la config:

	cp /root/oldscripts/config /root/scripts/config

## 5) lister les ancien scripts rezo/nat actifs (noter les resultats)

	ls /root/oldscripts/rezo.d/rezo-enabled/*
	ls /root/oldscripts/nat.d/nat-enabled/*

## 6) Activer les nouveaux scripts rezo/nat (pour chaque ancien script actif):

	./rezo 101 enable
	./nat 101 enable

	./rezo 204 enable
	./nat 204 enable

	./rezo [...] enable
	./nat [...] enable


## 7) Appliquer la configuration rezo

	./rezo apply

---

# Pour mettre à jour les scripts

(Mise à jour des scripts au nouveau format)

	cd /root/scripts
	git pull origin master

Ou bientot:

	/root/scripts/mks update



---
