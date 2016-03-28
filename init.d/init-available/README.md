
# init.d/init-available

Contient les script d'init "disponibles"

# Scripts inclus

### init-rezo

- Démarre le script "/root/scripts/rezo apply" lors du start du système
- Ne fait rien lors du "stop" du système
- Redirige la sortie vers "/root/logs/init-rezo.log"

### init-sample

- Enregistre la date et l'heure de l'execution et le paramètre de démarrage dans /root/logs/init-sample.log
