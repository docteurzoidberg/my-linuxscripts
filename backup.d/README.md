#backup.d

Tous les scripts dans backup.d/enabled seront executés par le script principal /root/scripts/backup

-Un fichier par CT/VM decrivant les operations de backup a effectuer
-Les backups peuvent etre fait dans le ct via injection d'un script et execution dans le ct, ou directement par le master via le filesystem.
