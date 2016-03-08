# Pré-requis

### obligatoire:

	apt-get install figlet toilet cowsay

### ne pas oublier:

	apt-get install wget curl ca-certificates openssl

### Lire INSTALL.md

### facultatif: oh-my-zsh

	apt-get install git zsh

# Scripts rezo

## Script principal réseau

### Flush iptables, et relance les script rezo.d/enabled/net* et nat.d/enabled/vm*

	./rezo > /root/logs/rezo_lastrun.log

## iptables sortie (rezo.d/rezo-enabled/net$CTID)

Pour un script nommé "net100" on passe "100" à la commande

### Activer le script rezo d'un ct

	./rezen 100

### Désactiver le script rezo d'un ct

	./rezdis 100

## iptables nat entree (nat.d/nat-enabled/vm$CTID)

Pour un script nommé "vm100" on passe "100" à la commande

### Activer le script nat d'un ct

	./naten 100

### Désactiver le script nat d'un ct

	./natdis 100

# Scripts INIT (init.d/init-enabled/init-$nomduscript)

Les scripts d'init sont lancés depuis /root/scripts/init.d/init-enabled par ordre alpha

Pour un script nommé init-nomduscript on passe "nomduscript" à la commande

### Activer un script d'init
        ./initen sample
### Désactiver un script d'init
        ./initdis sample



# Scripts UTILES

## motd
	//TODO: DOC


# Scripts backup (init.d/init-enabled/backup-$nomduscript)

Pour un script nommé backup-nomduscript on passe "nomduscript" à la commande

### Activer un script de backup
        ./backupen sample
### Désactiver un script d'init
        ./backupdis sample


# Scripts LXC (remplace les scripts lxc)
	//TODO: DOC

# Script openvz (deprecated)
	//TODO: DOC
