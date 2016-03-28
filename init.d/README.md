# init.d

- Ne gere pas encore tous les LSB_TAGS (à vérifier)

- Pour etre appelé par le système, il est nécessaire de lancer la commande ./init install qui créera le script dans /etc/init.d et qui l'ajoutera avec update-rc.d (cf INSTALL.md)

---

## Installation du script dans /etc/init.d
    cd /root/scripts
    ./init install

---

## Structure dossiers

#### init.d/init-available
scripts "disponibles"

#### init.d/init-enabled
scripts "actifs"

---
## Execution des scripts actifs

##### Tous les scripts dans init.d/init-enabled seront executés par le systeme lors du start et du stop du serveur (runlevel= defaults) avec les arguments LSB classiques.

  - Lors de l'arrêt du systeme, la commande "init stop" sera éxécutée

  - Lors du démarrage du système, la commande "init start" sera éxécutée


##### Tous les scripts dans init.d/enabled seront executés par le script principal /root/scripts/init lors des commandes suivantes:

- Lance les scripts enabled avec l'argument "start"
      ./init start

- Lance les scripts enabled avec l'argument "stop"
      ./init stop

---

## Execution d'un script nommé

##### Tous les scripts dans init.d/enabled peuvent être éxécutés manuellement via les commandes suivantes:

- Lance le script  /root/scripts/init.d/init-enabled/init-sample avec l'argument "start"

      ./init sample start

- Lance le script  /root/scripts/init.d/init-enabled/init-sample avec l'argument "stop"

      ./init sample stop

---

## Utilisation script init

	init {scriptname} start          Lance le script {scriptname} start
	init {scriptname} stop           Lance le script {scriptname} stop
	init {scriptname} enable         Active le script {scriptname}
	init {scriptname} disable        Désactive le script {scriptname}
	init {scriptname} show           Affiche le script {scriptname}
	init {scriptname} edit           Edite le script {scriptname}

	init install                     Installe le script /etc/init.d/my-proxmox-scripts
	init uninstall                   Désinstalle le script /etc/init.d/my-proxmox-scripts
	init start                       Lance les scripts actifs avec la paramètre start
	init stop                        Lance les scripts actifs avec le paramètre stop
	init scripts                     Affiche les scripts actifs
