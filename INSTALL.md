# 1) Cloner le repo dans /root/scripts

	apt-get install git
	git clone https://github.com/docteurzoidberg/my-proxmox-scripts.git /root/scripts

# 2) Re-creer les dossiers manquants

	mkdir /root/logs
	mkdir /root/backups

Ceux si sont créés automatiquement lors de l'utilisation de rezen, initen, backup, naten

	mkdir /root/scripts/rezo.d/rezo-enabled
	mkdir /root/scripts/nat.d/nat-enabled
	mkdir /root/scripts/init.d/init-enabled
	mkdir /root/scripts/backup.d/backup-enabled

# 3) Configurer le script d'init

	cd /etc/init.d
	ln -s /root/scripts/init rootscripts-init
	update-rc.d rootscripts-init defaults

# 4) Activer le script sample et rezo à l'init

	cd /root/scripts
	./initen sample
	./initen rezo

# 5) Creation fichier rezo & nat pour un / des CT

### fichier rezo (exemple pour ct 100)

	cd /root/scripts/rezo.d/rezo-available
	cp netsample net100

Editer le fichier net100 pour qu'il utilise les bonne ip/variables	

Activation du fichier net100

	cd /root/scripts
	./rezen 100


### fichier nat (exemple pour ct 100)

        cd /root/scripts/nat.d/nat-available
        cp netsample vm100

Editer le fichier vm100 et ajouter les redirections IP:PORT

Activation du fichier vm100

        cd /root/scripts
        ./naten 100

# 6) Appliquer la conf nat & rezo

	cd /root/scripts
	./rezo


# 7) Rebooter pour verifier

	reboot

	[...]

	cd /root/scripts

##Verification init
	cat /root/logs/init-sample.log

##Verification nat
	./utils/shownat
