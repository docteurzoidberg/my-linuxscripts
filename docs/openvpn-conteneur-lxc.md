
# Configuration d'openVPN dans un conteneur LXC debian 8

But: 
	Installer OpenVPN dans un conteneur LXC debian 8.
	
Refs:
	https://hungred.com/how-to/setup-openvpn-on-proxmox-lxc/
	https://www.digitalocean.com/community/tutorials/how-to-set-up-an-openvpn-server-on-debian-8

## Prerequis

- Creation d'un conteneur debian 8.61 fraichement installé et mis à jour.


## Autorise le conteneur à creer le périphérique /dev/tun dans LXC

Stopper le CT s'il tourne

	pct stop {ID_CONTENEUR}

Editer le fichier /etc/pve/lxc/{ID_CONTENEUR}.conf sous ProxMox et rajouter les lignes suivantes à la fin:

	lxc.cgroup.devices.allow = c 10:200 rwm
	lxc.hook.autodev = sh -c "modprobe tun; cd ${LXC_ROOTFS_MOUNT}/dev; mkdir net; mknod net/tun c 10 200; chmod 0666 net/tun"

## Installation d'OpenVPN

Démarrer et entrer dans le CT

	pct start {ID_CONTENEUR}
	pct enter {ID_CONTENEUR}

Installation wizard OpenVPN

	wget git.io/vpn --no-check-certificate -O ~/openvpn-install.sh; bash openvpn-install.sh

## Routage reseau

A faire avec les scripts de NAT :)

