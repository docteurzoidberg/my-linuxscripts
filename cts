#!/bin/bash
VERSION='0.1'
#--------------------------------------

function _get_scripts_path {
  local _result=`echo "$0" | sed -e "s/[^\/]*$//"`
  if [[ $_result = "./" ]]
  then
   _result=`pwd`
  fi
  echo $_result
}
SCRIPTS_PATH=$(_get_scripts_path)
cd $SCRIPTS_PATH

. ./config
. ./functions

encadre "cts script v$VERSION"

#--------------------------------------
# usage
#--------------------------------------

function usage {
	echo -e "cts {ID} enter \t\t"
	echo -e "cts {ID} start \t\t"
  echo -e "cts {ID} stop \t\t"
  echo -e "cts {ID} backup \t\t"
	echo -e "cts {ID} destroy \t\t"

	echo -e "cts show \t\t"
	echo -e "cts startall \t\t"
	echo -e "cts stopall \t\t"
}

#--------------------------------------
# internal
#--------------------------------------

function internal_testct {

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

#--------------------------------------
# commande_*
#--------------------------------------

function commande_show {
	jaune "TODO: show all CT statuses..."
}

function commande_startall {
	jaune "TODO: stop all configured CTS..."
}

function commande_stopall {
	jaune "TODO: stop all configured CTS..."
}

#--------------------------------------
# commande_ctid_*
#--------------------------------------

function commande_ctid_enter {
	fn_commande "pct enter $1"
}

function commande_ctid_start {
	fn_commande "pct start $1"
}

function commande_ctid_stop {
	fn_commande "pct stop $1"
}

function commande_ctid_backup {
	jaune "TODO: backup CT $1"
}

function commande_ctid_destroy {
	jaune "TODO: destroy CT $1"
}

#--------------------------------------
# parse_*
#--------------------------------------

function parse_commande_ctid {

	case $2 in
	"enter")
		commande_ctid_enter $1
  	;;
	"start")
		commande_ctid_start $1
  	;;
	"stop")
		commande_ctid_stop $1
  	;;
	"backup")
		commande_ctid_backup $1
  	;;
	"destroy")
		commande_ctid_destroy $1
  	;;
	*)
		if [[ ! -z $2 ]]
		then
			rouge "Commande inconnue: $2"
		fi
  	usage
		;;
	esac
}

function parse_commande {
	case $1 in
	"show")
		commande_show
		;;
	"startall")
		commande_startall
		;;
	"stopall")
		commande_stopall
		;;
	*)
		parse_commande_ctid $1 $2
		;;
	esac
}

#--------------------------------------
# MAIN !
#--------------------------------------

parse_commande $1 $2
