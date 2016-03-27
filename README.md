# Keskecé ?

Des scripts pratiques (ou pas) pour gérer, entre autres, l'activation / désactivation de régles NAT / réseau iptables pour des conteneurs, ou des machines virtuelles, sur une serveur hote type proxmox (ou autre).

# Architecture des dossiers / fichiers (vue simplifiée)
	.
	├── config													//Fichier de configuration, les variables définies dedans sont accessibles par les scripts
	├── functions												//Fichier contenant des fonctions pour les scripts
	├── docs														//De la doc !
	├── <nomduscript>										//Scripts= [ init | backup | cts | rezo | nat ]
	├── <nomduscript>.d
	│   ├── <nomduscript>-available			//Dossier contenant les scripts de <nomduscript> disponibles
	│   │   └── <nomduscript>-sample		//Fichier exemple pour les scripts de <nomduscript>
	│   └──  backup-enabled
	└── utils														//Contient divers scripts / configurations facultatifs

+ Des fichiers README.md sont dispos un peu partout dans les dossiers pour expliquer chaque usage

# Liste des scripts

- ./rezo
- ./nat
- ./init
- ./backup
- ./cts
- ./mks

## ./rezo

### Utilisation script rezo:

	./rezo {ID} enable       Active le script rezo {ID}

	./rezo {ID} disable      Désactive le script rezo {ID}
	./rezo {ID} edit         Edite le script rezo {ID}
	./rezo {ID} show         Affiche le script rezo {ID}

	./rezo apply             Lance les scripts rezo
	./rezo show              Affiche les tables iptables en cours
	./rezo reset             Reset les tables iptables en cours
	./rezo scripts           Affiche les scripts nats actifs

## ./nat

### Utilisation script nat:

	./nat {ID} enable        Active le script nat {ID}
	./nat {ID} disable       Désactive le script nat {ID}
	./nat {ID} edit          Edite le script nat {ID}
	./nat {ID} show          Affiche le script nat {ID}

	./nat apply              Lance les scripts nat actifs
	./nat show               Affiche la table nat iptables en cours
	./nat scripts            Affiche les scripts nats actifs

## ./init
todo

## ./backup
todo

## ./cts
todo

## ./mks
todo

---

# Cas d'exemples typiques

### Flush iptables, et relance les script rezo.d/enabled/net* et nat.d/enabled/vm*

	./rezo apply > /root/logs/rezo_lastrun.log

### Apres la creation d'un nouveau ct (ex: 102)

	cd /root/scripts

#### 1) copie templates nat/rezo

	cp ./nat.d/nat-available/vmsample ./nat.d/nat-available/vm102
	cp ./rezo.d/rezo-available/netsample ./rezo.d/rezo-available/net102

#### 2) copie template rezo-available & modifications

	./nat 102 edit
	./rezo 102 edit

#### 3) activation des scripts & apply rezo

	./rezo 102 enable
	./nat 102 enable
	./rezo apply
