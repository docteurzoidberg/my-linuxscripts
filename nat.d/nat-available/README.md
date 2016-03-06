# nat.d/nat-available

Contient les fichiers nat "disponibles"

- Définition des redirection de port NAT avec iptables
- Les fichiers sont parsés par le script /root/scripts/nat, qui est lui même lancé par /root/scripts/rezo

### Syntaxe:
  titreservice:(tcp/udp) ip_externe:port_externe ip_privee_ct:port_ct

### Exemple redirection SSH (22) et WWW (80) vers le CT 123, depuis l'ip externe ${IP_FAILOVER1} sur les ports 22123 et 8123

  www:tcp	${IP_FAILOVER1}:8123	192.168.99.123:80
  ssh:tcp		${IP_FAILOVER1}:22123	192.168.99.123:22

### Exemple ecoute sur toutes les ip failover

  www_failover1:tcp	${IP_FAILOVER1}:8123	192.168.99.123:80
  www_failover2:tcp	${IP_FAILOVER2}:8123	192.168.99.123:80
  www_failover3:tcp	${IP_FAILOVER3}:8123	192.168.99.123:80

### Exemple ecoute tcp et udp

  service1_tcp:tcp ${IP_FAILOVER1}:23456 192.168.99.123:23456
  service1_udp:udp ${IP_FAILOVER1}:23456 192.168.99.123:23456
