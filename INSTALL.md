//TODO: DOC :D

# 1) Cloner le repo dans /root/scripts

	git clone blablablablabla /root/scripts

# 2) Reecreer les dossiers manquants

	mkdir /root/logs
	mkdir /root/backups
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

# 5) Appliquer la conf nat & rezo

	cd /root/scripts
	./rezo


# 6) Rebooter pour verifier

	reboot

	[...]

	cd /root/scripts

##Verification init
	cat /root/logs/initsample.log

##Verification nat
	./utils/shownat


