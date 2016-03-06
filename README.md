#Prérequis

obligatoire
	apt-get install figlet toilet cowsay wget
facultatif: oh-my-zsh 
	apt-get install git zsh 


#Scripts rezo

## Script principal réseau

Flush iptables, et relance les script rezo.d/enabled et nat.d/enabled
	./rezo > /root/logs/rezo_lastrun.log

## iptables sortie (rezo.d/rezo-enabled)

Activer le script rezo d'un ct
	./rezen 100

Désactiver le script rezo d'un ct
	./rezdis 100

## iptables nat entree (nat.d/nat-enabled)

Activer le script nat d'un ct
	./naten 100

Désactiver le script nat d'un ct
	./natdis 100



# Scripts INIT

Les scripts d'init sont lancés depuis /root/scripts/init.d/init-enabled par ordre alpha

Activer un script d'init
        ./initen sample
Désactiver un script d'init
        ./initdis sample



# Scripts UTILES

##motd
//TODO: DOC


# Scripts backup
//TODO: DOC

#Scripts LXC (remplace les scripts lxc)
//TODO: DOC

# Script openvz (deprecated)
//TODO: DOC
