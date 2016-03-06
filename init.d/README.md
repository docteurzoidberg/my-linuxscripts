# init.d

Tous les scripts dans init.d/enabled seront executés par le script principal /root/scripts/init

- NE gere pas encore les LSB_TAGS (à vérifier)
- Necessite la création d'un lien symbolique dans /etc/init.d vers /root/scripts/init et un update-rc.d pour fonctionner ! (cf install)


### init.d/init-available
scripts "disponibles"

### init.d/init-enabled
scripts "actifs"
