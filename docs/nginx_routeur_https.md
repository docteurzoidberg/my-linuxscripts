
# Installation nginx en mode routage HTTPS sur debian 8

Need nginx > 1.9

## Installer nginx-latest depuis les dépots nginx.org

### Désinstaller la version actuelle d'nginx (si installé depuis dépots debian)

	apt-get remove nginx-full nginx-common nginx
	apt-get clean

### Ajout de la clef nginx.org 
	
	wget http://nginx.org/keys/nginx_signing.key
	apt-key add nginx_signing.key	

### Ajout des depots dans le fichier /etc/apt/sources.list 

	deb http://nginx.org/packages/mainline/debian/ jessie nginx
	deb-src http://nginx.org/packages/mainline/debian/ jessie nginx

## 


# Configuration d'nginx

## Creation de /etc/nginx/ssl_preread

C'est le fichier qui va faire l'éguillage HTTPS pour partager la meme IP, selon les vhosts
Par defaut, il fallback sur l'ip du VPN (car openvpn use pas de nom de domaine quand il se connecte)

Contenu:

	stream{

		#association FQDN => upstream
	        map $ssl_preread_server_name $name {
	                default vpn_backend;
	                monsite1.fr site1_backend;
	                monsite2.fr site2_backend;
	                monsite3.fr site3_backend;
	        }

		#upsteam vpn
	        upstream vpn_backend {
			#adresse ip conteneur OPENVPN
	                server 192.168.99.106:443;
	        }
		
		#site1.fr
	        upstream site1_backend {
			#adresse ip du nginx local + port du vhost
        	        server 127.0.0.1:4430; 
	        }

	 	#site2.fr
                upstream site2_backend {
                        #adresse ip du nginx local + port du vhost
                        server 127.0.0.1:4431;
                }

		#site2.fr
                upstream site2_backend {
                        #adresse ip du nginx local + port du vhost
                        server 127.0.0.1:4432;
                }
		
		#ecoute sur le port 443 et route vers la bonne destination
		server {
	                listen 443;
	                proxy_pass $name;
	                ssl_preread on;
	        }
}

## Config /etc/nginx/nginx.conf

Verif après reinstall dépuis les dépots, et ajout include ssl_preread:

	user  nginx;
	worker_processes  4;
	error_log  /var/log/nginx/error.log warn;
	pid        /var/run/nginx.pid;

	events {
	    worker_connections  1024;
	}

	#ce fichier contient le routage HTTPS
	include ssl_preread;

	http {
		include       /etc/nginx/mime.types;
		default_type  application/octet-stream;

		log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

		access_log  /var/log/nginx/access.log  main;
		sendfile        on;
		#tcp_nopush     on;

		keepalive_timeout  65;

		#gzip  on;

		include /etc/nginx/conf.d/*.conf;
		include /etc/nginx/sites-enabled/*;
	}



### Exemple fichier /etc/nginx/site-available/site1.fr

(Exemple basé sur tppt.eu avec certif letsencrypt)	

	#port 80 = utilisation normale des vhosts

	server {
	        listen                  80; 
	        server_name             site1.fr;
	
	        access_log              /var/log/nginx/access.site1.fr.log;
	        error_log               /var/log/nginx/error.site1.fr.log;
	
	        client_body_in_file_only on;
	        client_body_buffer_size 32K;
	        client_max_body_size 300M;
	
	        sendfile on;
	        send_timeout 300s;
	
	        location / {
	                proxy_set_header X-Real-IP $remote_addr;
	                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	                proxy_set_header Host $http_host;
	                proxy_set_header X-NginX-Proxy true;
	                proxy_pass http://192.168.99.151:3000;
	                proxy_redirect off;
	        }
	
	        location /.well-known/acme-challenge {
	                default_type  "text/plain";
	                root          /tmp/letsencrypt-auto;
	        }
	}


	#port 4430 => config sépcifique pour ce site, utilisé par le routeur dans /etc/nginx/ssl_preread	

	server {
	        listen                  4430 ssl;
	        ssl                     on;
	        server_name             site1.fr;
	        access_log              /var/log/nginx/access.site1.fr.log;
	        error_log               /var/log/nginx/error.site1.fr.log;
	
	        client_body_in_file_only clean;
	        client_body_buffer_size 32K;
	        client_max_body_size 300M;
	        sendfile on;
	        send_timeout 300s;
	
	        ssl_certificate /etc/letsencrypt/live/site1.fr/fullchain.pem;
	        ssl_certificate_key /etc/letsencrypt/live/site1.fr/privkey.pem;
		ssl_protocols TLSV1 TLSv1.1 TLSv1.2;

		#la bonne ligne en entier ! :D
		ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK';

		ssl_prefer_server_ciphers on;
		ssl_dhparam /etc/nginx/dhparam.pem;

	        location / {
	                proxy_set_header X-Real-IP $remote_addr;
	                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	                proxy_set_header Host $http_host;
	                proxy_set_header X-NginX-Proxy true;
			
			#redirige vers le port 443 du CT "site1.fr"
	                proxy_pass https://192.168.1.101:443;
	                proxy_redirect off;
	        }
	}




	




