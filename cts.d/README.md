# Nouveau formats pour les scripts et commandes

## cts.d/cts-available
	
Contient un dossier pour chaque id CT voulu

ex: cts.d/cts-available/CT100

## contenu

### cts.d/cts-available/CT100/rezo  

obligatoire
equivalent ancien script rezo.d/rezo-available/net100

### cts.d/cts-available/CT100/nat  

obligatoire,
equivalent ancien script nat.d/nat-available/vm100

### cts.d/cts-available/CT100/backup  

facultatif

### cts.d/cts-available/CT100/monitoring  

facultatif



# Ancienne / Nouvelle commande

Ancienne
	./naten 100
Nouvelle
	cts 100 nat enable

Ancienne
	./rezen 100
Nouvelle
	cts 100 rezo enable


# Liste des nouvelles commandes

## Commandes PCT

### cts {ID} start
lance 
	pct start {ID}

### cts {ID} stop
lance 
	pct stop {ID}

### cts {ID} enter
lance 
	pct enter {ID}

## Commandes REZO

### cts {ID} rezo enable
crée l'alias cts.d/cts.enabled/CT{ID}/rezo -> cts.d/cts-available/CT{ID}/rezo

### cts {ID} rezo disable
supprime l'alias cts.d/cts.enabled/CT{ID}/rezo

### cts {ID} rezo edit
lance l'edition du fichier cts.d/cts-available/CT{ID}/rezo du ct


## Commandes NAT

### cts {ID} nat enable
crée l'alias cts.d/cts.enabled/CT{ID}/nat -> cts.d/cts-available/CT{ID}/nat

### cts {ID} nat disable
supprime l'alias cts.d/cts.enabled/CT{ID}/nat

### cts {ID} nat edit
lance l'edition du fichier nat du ct






