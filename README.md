# Pré-requis

### obligatoire:

	apt-get install figlet toilet cowsay

### ne pas oublier:

	apt-get install wget curl ca-certificates openssl

### Lire INSTALL.md

### facultatif: oh-my-zsh

	apt-get install git zsh

# Scripts rezo

### Utilisation script rezo:

./rezo {ID} enable       Active le script rezo {ID}
./rezo {ID} disable      Désactive le script rezo {ID}
./rezo {ID} edit         Edite le script rezo {ID}
./rezo {ID} show         Affiche le script rezo {ID}

./rezo apply             Lance les scripts rezo
./rezo show              Affiche les tables iptables en cours
./rezo reset             Reset les tables iptables en cours
./rezo scripts           Affiche les scripts nats actifs

### Utilisation script nat:

./nat {ID} enable        Active le script nat {ID}
./nat {ID} disable       Désactive le script nat {ID}
./nat {ID} edit          Edite le script nat {ID}
./nat {ID} show          Affiche le script nat {ID}

./nat apply              Lance les scripts nat
./nat show               Affiche la table nat iptables en cours
./nat scripts            Affiche les scripts nats actifs




## Script principal réseau

### Flush iptables, et relance les script rezo.d/enabled/net* et nat.d/enabled/vm*

	./rezo apply > /root/logs/rezo_lastrun.log

## iptables sortie (rezo.d/rezo-enabled/net$CTID)

Pour un script nommé "net100" on passe "100" à la commande

### Activer le script rezo d'un ct

	./rezo 100 enable

### Désactiver le script rezo d'un ct

	./rezo 100 disable

## iptables nat entree (nat.d/nat-enabled/vm$CTID)

Pour un script nommé "vm100" on passe "100" à la commande

### Activer le script nat d'un ct

	./nat 100 enable

### Désactiver le script nat d'un ct

	./nat 100 enable

# Scripts INIT (init.d/init-enabled/init-$nomduscript)

Les scripts d'init sont lancés depuis /root/scripts/init.d/init-enabled par ordre alpha

Pour un script nommé init-nomduscript on passe "nomduscript" à la commande

### Activer un script d'init
        ./init sample enable
### Désactiver un script d'init
        ./init sample disable



# Scripts UTILES

## motd
	//TODO: DOC

# Scripts backup (init.d/init-enabled/backup-$nomduscript)

Pour un script nommé backup-nomduscript on passe "nomduscript" à la commande

### Activer un script de backup
        ./backup sample enable
### Désactiver un script d'init
        ./backup sample disable

