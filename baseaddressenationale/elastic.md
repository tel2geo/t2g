# Importation Base d'addresse nationale sur ElasticSearch
Voilà les consignes d'importation de la base d'adresses nationale disponible sur data.gouv.fr.

## Méthode 1
A partir de la dernière mise à jour.

### Manoeuvres à effectuer
* Extraire le fichier zip
* Ôter la premiere ligne de chaque csv
* Regrouper tout les fichier csv en 1 seul fichier
* Corriger les erreurs contenu dans le fichiers (exemple colonnes mal formatées)
* Découper le csv en parts égales à l'aide de split
* Editer le fichier import avec vos identifiants shield et l'url/port de Elasticsearch
* Convertir les bouts de fichiers csv en JSON compatible ElasticSearch
* Regrouper tout les fichiers convertis au format sh en 1 seul fichier
* Ajouter le shebang
* Corriger une ligne défectueuse
* Modifier le fichier sh pour rajouter un index aux url
* Executer le fichier sh après chmod 

```sh
unzip *.zip
mkdir -p temp/ && chmod 1777 -R temp/ && mv BAN_licence_gratuite_repartage_01.csv temp/BAN_licence_gratuite_repartage_01.csv
sed -i 1d *.csv && echo '#!/bin/sh
		for i in `echo *.csv`; do
			cat $i >>  all.csv
		done' > all.sh 
chmod +x all.sh && mv temp/BAN_licence_gratuite_repartage_01.csv `pwd` 
sh all.sh 
mv all.csv temp/all.csv && rm -rf *.csv && mv temp/all.csv `pwd` 
sed -i 's#;;#;"";#g' all.csv 
split -l 676000 all.csv all.csv.part 
echo '#!/bin/bash  
php import-elastic.php all.csv.partaa all.csv.part01 && php import-elastic.php all.csv.partab all.csv.part02 && php import-elastic.php all.csv.partac all.csv.part03 && php import-elastic.php all.csv.partad all.csv.part04 && php import-elastic.php all.csv.partae all.csv.part05 && php import-elastic.php all.csv.partaf all.csv.part06 && php import-elastic.php all.csv.partag all.csv.part07 && php import-elastic.php all.csv.partah all.csv.part08 && php import-elastic.php all.csv.partai all.csv.part09 && php import-elastic.php all.csv.partaj all.csv.part10 && php import-elastic.php all.csv.partak all.csv.part11 && php import-elastic.php all.csv.partal all.csv.part12 && php import-elastic.php all.csv.partam all.csv.part13 && php import-elastic.php all.csv.partan all.csv.part14 && php import-elastic.php all.csv.partao all.csv.part15 && php import-elastic.php all.csv.partap all.csv.part16 && php import-elastic.php all.csv.partaq all.csv.part17 && php import-elastic.php all.csv.partar all.csv.part18 && php import-elastic.php all.csv.partas all.csv.part19 && php import-elastic.php all.csv.partat all.csv.part20 && php import-elastic.php all.csv.partau all.csv.part21 && php import-elastic.php all.csv.partav all.csv.part22 && php import-elastic.php all.csv.partaw all.csv.part23 && php import-elastic.php all.csv.partax all.csv.part24 && php import-elastic.php all.csv.partay all.csv.part25 && php import-elastic.php all.csv.partaz all.csv.part26 && php import-elastic.php all.csv.partba all.csv.part27 && php import-elastic.php all.csv.partbb all.csv.part28 && php import-elastic.php all.csv.partbc all.csv.part29 && php import-elastic.php all.csv.partbd all.csv.part30 && php import-elastic.php all.csv.partbe all.csv.part31 && php import-elastic.php all.csv.partbf all.csv.part32 && php import-elastic.php all.csv.partbg all.csv.part33 && php import-elastic.php all.csv.partbh all.csv.part34 && php import-elastic.php all.csv.partbi all.csv.part35 && php import-elastic.php all.csv.partbj all.csv.part36 && php import-elastic.php all.csv.partbk all.csv.part37 && php import-elastic.php all.csv.partbl all.csv.part38 && php import-elastic.php all.csv.partbm all.csv.part39 && php import-elastic.php all.csv.partbn all.csv.part40' > convert.sh
echo '#!/bin/bash  
cat all.csv.part01 all.csv.part02 all.csv.part03 all.csv.part04 all.csv.part05 all.csv.part06 all.csv.part07 all.csv.part08 all.csv.part09 all.csv.part10 all.csv.part11 all.csv.part12 all.csv.part13 all.csv.part14 all.csv.part15 all.csv.part16 all.csv.part17 all.csv.part18 all.csv.part19 all.csv.part20 all.csv.part21 all.csv.part22 all.csv.part23 all.csv.part24 all.csv.part25 all.csv.part26 all.csv.part27 all.csv.part28 all.csv.part29 all.csv.part30 all.csv.part31 all.csv.part32 all.csv.part33 all.csv.part34 all.csv.part35 all.csv.part36 all.csv.part37 all.csv.part38 all.csv.part39 all.csv.part40 >> all.csv.sh' > merger.sh
chmod +x convert.sh merger.sh
sh convert.sh 
sh merger.sh
sed -i '1 i #!/bin/bash' all.csv.sh
sed '192746q;d' all.csv.sh 
sed -i '192746d' all.csv.sh
sed '192746q;d' all.csv.sh 
sed -i 's#http://username:password@domainname:port/ban/fr/[[:digit:]]*#http://newusername:newpassword@newdomainname:newport/ban/fr/#g' all.csv.sh
awk -vRS=fr/ '{$0=n$0;ORS=RT}++n' all.csv.sh > temp/allcsv.sh && mv temp/allcsv.sh allcsv.sh
rm -r *.csv *.part*

```

Note :
Vérifiez lorsque vous aurez téléchargé la base d'adresses nationale , que le nombre de segments correspond bien aux nombre de segment que vous souhaitez réunir.

## Méthode 2 

A partir du fichier téléchargé.

### Manoeuvres à effectuer 

* Télécharger et extraire le fichier zip.
* Remplacer http://username:password@domainname:port/ban/fr/ par vos identifiants , protocole, url, port de cluster elasticsearch.
* Executer le fichier sh extrait.
```sh
sed -i 's#http://username:password@domainname:port/ban/fr/[[:digit:]]*#http://newusername:newpassword@newdomainname:newport/ban/fr/#g' all.csv.sh
chmod +x all.csv.sh && sh all.csv.sh & exit
```

## Liens externes
* Base d'adresses nationale ouverte sur [data.gouv.fr].
* Téléchargement du fichier BAN au format sh sur google drive [ban.gdrive]. 

[comment]: #
   [data.gouv.fr]: <https://www.data.gouv.fr/fr/datasets/base-d-adresses-nationale-ouverte-bano/>
   [ban.gdrive]: <https://www.data.gouv.fr/fr/datasets/base-d-adresses-nationale-ouverte-bano/>

