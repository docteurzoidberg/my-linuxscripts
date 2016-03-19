#!/bin/bash

#lance les includes

. ./config
. ./functions

SCRIPTS_PATH="/root/my-proxmox-scripts"


function usage_commande_pct {
	echo "cts {ID} start \t\t"
        echo "cts {ID} stop \t\t"
        echo "cts {ID} enter \t\t"
}

function usage_commande_rezo {
        echo "cts {ID} rezo enable \t\t"
        echo "cts {ID} rezo disable \t\t"
        echo "cts {ID} rezo edit \t\t"
}

function usage_commande_nat {
	echo "cts {ID} nat enable \t\t"
        echo "cts {ID} nat disable \t\t"
        echo "cts {ID} nat edit \t\t"
}


function testct {

	TESTFOLDER="${SCRIPTS_PATH}/cts.d/cts-available/CT$1"

	if [[ -d ${TESTFOLDER} ]]
	then
		vert "\nLe dossier ${TESTFOLDER}  éxiste !\n"
	else
		rouge "\nLe dossier ${TESTFOLDER} n'existe pas\n"
		jaune "Pour le créer, utiliser la commande ${NORMAL}cts $1 make ${JAUNE}qui créera le squelette pour le CT$1"
		exit -1
	fi
}

function testusage {
	if test -z $1
	then
		echo "Utilisation: todo\n"
		exit -1
	fi
}

function testusage_commande {

	if test -z $2
	then
		usage_commande_pct $1
		usage_commande_rezo $1
		usage_commande_nat $1
		exit -1
	else
		case $2 in
        	"start"|"stop"|"enter"|"rezo"|"nat"|"backup"|"monitoring")
                	#echo "commande ok: $2\n"
                	;;
        	*)
                	rouge "Commande inconnue: $2"
			jaune "Utilisation: "
			usage_commande_pct $1
        	        usage_commande_rezo $1
                	usage_commande_nat $1
			exit -1
			;;
		esac
	fi
}

function test_commande {

	case $2 in
	"start"|"stop"|"enter")
		commande_pct $1 $2
		;;
	"rezo")
		commande_rezo $1 $2 $3
		;;
	"nat")
		commande_nat $1 $2 $3
		;;
	*)
		rouge "Commande inconnue: $2"
		exit -1
		;;
	esac
}

function script_enable {
	echo "TODO: enable script $2 for CT$1"
}

function script_disable {
	echo "TODO: disable script $2 for CT$1"
}

function script_edit {
	echo "TODO: edit script $2 for CT$1"
}


function commande_pct {

	case $2 in
	"start")
		commande "pct start $1"
		;;
	"stop")
		commande "pct stop $1"
		;;
	"enter")
		commande "pct enter $1"
		;;
	*)
		rouge "Commande pct inconnue: $2"
		exit -1
		;;
	esac
}

function commande_rezo {
        case $3 in
        "enable")
		script_enable $1 $2
		;;
	"disable")
		script_disable $1 $2
		;;
	"edit")
                script_edit $1 $2
        	;;
	*)
                rouge "Commande $2 inconnue: $3"
		jaune "Utilisation:"
		usage_commande_rezo $1
                exit -1
		;;
        esac
}

function commande_nat {
	case $3 in
	"enable")
		script_enable $1 $2
		;;
	"disable")
		script_disable $1 $2
		;;
	"edit")
		script_edit $1 $2
		;;
	*)
		if(
		rouge "Commande $2 inconnue: $3"
		jaune "Utilisation:"
		usage_commande_nat $1
		exit -1
		;;
	esac
}




testusage $1

testct $1

testusage_commande $1 $2 $3

test_commande $1 $2 $3





