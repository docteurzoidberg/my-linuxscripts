#Supervisor

### But:
 
- Lancer / monitorer des scripts en background et/ou à l'init

### Avantages: 

- permet de lancer un service/script en tant que {user}
- evite de coder un script d'init
- evite de polluer le dossier /etc/init.d avec des scripts faits à la main
- logs des applis dans /var/log/supervisor/{APPLI}.log et {APPLI}_err.log


## Installation

	apt-get install supervisor

## Utilisation

### Creation d'un fichier de conf pour une appli

Creation du fichier

	nano /etc/supervisor/conf.d/appli.conf

Contenu du fichier d'exemple:

	[program:flood]
	command = npm start --production
	directory = /home/seedbox/flood
	user = seedbox
	autostart = true
	autorestart = true
	stdout_logfile = /var/log/supervisor/flood.log
	stderr_logfile = /var/log/supervisor/flood_err.log
	

### Rechargement de la config
	
	#relit la config
	supervisorctl reread
	
	#demarre les nouveaux services s'il y en a
	supervisorctl update 
	
### Autres commandes

#### Démarrer l'appli "APPLI"
	
	supervisorctl start APPLI
	
#### Stopper l'appli "APPLI"
	
	supervisorctl stop APPLI
	
#### Afficher le status de toutes les applis
	
	supervisorctl status
		



