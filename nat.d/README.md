# nat.d

Tous les scripts dans nat.d/enabled seront executés par le script principal "./nat apply", qui est lui même lancé par "./rezo apply"

---

## Structure dossiers

### nat.d/nat-available
scripts "disponibles"

### nat.d/nat-enabled
scripts "actifs"

## Utilisation script nat

    nat {ID} enable 	  Active le script nat {ID}
    nat {ID} disable 	 Désactive le script nat {ID}
    nat {ID} edit 	    Edite le script nat {ID}
    nat {ID} show 	    Affiche le script nat {ID}

    nat apply 		    Lance les scripts nat
    nat show 		     Affiche la table nat iptables en cours
    nat scripts 		  Affiche les scripts nats actifs
