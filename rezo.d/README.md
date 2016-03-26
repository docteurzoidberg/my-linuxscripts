# rezo.d

Tous les scripts dans rezo.d/enabled seront executés par le script principal /root/scripts/rezo

### rezo.d/rezo-available
scripts "disponibles"

### rezo.d/rezo-enabled
scripts "actifs"


## Utilisation script rezo:

./rezo {ID} enable 	 Active le script rezo {ID}
./rezo {ID} disable 	 Désactive le script rezo {ID}
./rezo {ID} edit 	 Edite le script rezo {ID}
./rezo {ID} show 	 Affiche le script rezo {ID}

./rezo apply 		 Lance les scripts rezo
./rezo show 		 Affiche les tables iptables en cours
./rezo reset 		 Reset les tables iptables en cours
./rezo scripts 		 Affiche les scripts nats actifs
