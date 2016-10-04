# baseaddressenationale
Voila les scripts d'importation et la démarche effectuée pour l'importation de la base de donnée d'adresse nationale disponible à cet endroit.

* [base.addresse.nationale] - Le site contenant la base d'addresse nationale (ODBL license).
* [db.zip] - La base de donnée au format SQL des 26 873 835 enregistrements géolocalisés datant du 17/08/2016.



## Importation et copie
Option 1 : A partir du fichier téléchargé récemment sur addresse.data.gouv.fr .
Décomressez l'archive (remplacez bdd.zip par le nom de fichier téléchargé).
```sh
$ unzip bdd.zip

```
Ôter les entêtes de colonnes et joindre tout les fichier csv en un seul fichier.
```sh
$ chmod +x allcsv.sh && sh allcsv.sh

```
Une fois cette commande effectuée vous obtiendrez alors un fichier all.csv avec approximativement 26 Millions d'enregistrement.
Utiliser alors votre invite de commande SQL préférée (remplacez utilisateur et password par vos identifiants de connection mysql).

```sh
$ mysql -u utilisateur -p password
mysql> CREATE DATABASE addr;
mysql> USE addr;
mysql> ALTER TABLE addr CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci;
mysql> CREATE TABLE `addr` (
`id` VARCHAR(24) , 
`nom_voie` TEXT NOT NULL , 
`id_fantoir` TEXT NOT NULL , 
`numero` TEXT NOT NULL , 
`rep` TEXT NOT NULL , 
`code_insee` TEXT NOT NULL , 
`code_post` TEXT NOT NULL , 
`alias` TEXT NOT NULL , 
`nom_ld` TEXT NOT NULL , 
`nom_afnor` TEXT NOT NULL , 
`libelle_acheminement` TEXT NOT NULL , 
`x` TEXT NOT NULL , 
`y` TEXT NOT NULL , 
`lon` TEXT NOT NULL , 
`lat` TEXT NOT NULL , 
`nom_commune` TEXT NOT NULL , 
PRIMARY KEY ( `id` ) 
) ENGINE = MYISAM ; 
```
La table est prête pour l'importation.
Reprenez votre invite de commande mysql pour importer le fichier à partir de l'emplacement du fichier csv choisi.
```sh
mysql> use addr;
mysql> LOAD DATA INFILE 'c:/XAMPP/htdocs/baseaddressenationale/all.csv' IGNORE  INTO TABLE addr FIELDS TERMINATED BY ';' ENCLOSED BY '"' LINES TERMINATED BY '\n' ;
Query OK, 26834828 rows affected (2 hours 6 min 0.87 sec)
Records: 26873835  Deleted: 0  Skipped: 39007  Warnings: 0 
```
Option 2 :
A l'aide du fichier php, suite à l'extraction des fichiers csv segmentés à partir de l'archive téléchargée sur addresse.data.gouv.fr .
Remplacez les identifiants dans [includes/config.php] par les vôtres. Modifier votrefichier.csv par celui qui correspond dans [import.php].
Importez tout à partir de votre navigateur.

Option 3 : 
Téléchargez l'archive [db.zip] après avoir créé votre table addr vide.

```sh
$ unzip db.zip && mysql -u utilisateur -ppassword addr < db.sql
```

## Licences
The T2G repo contains multiples licenses depending of the use of the scripts and databases distributed.
* Apache 2
* Odbl
* MIT
* GNU GPL3
* CC - BY NC ND

## Liens externes
* [base.addresse.nationale] -   The official link to download the Address database with more than 26 000 000 rows.
* [tel2geo] - the first tel2geo project , retreive geo data from a phone number.

## Remerciements	
* Christian Quest [cquest].

## contact
Feel free to contact me for a partnership, a job opportunity, i am currently open to most of coding proposals at **contact@ctrlfagency.com**.



[comment]: #
   [data.gouv.fr]: <http://www.data.gouv.fr/fr/>
   [tel2geo]: <https://tel2geo.fr>
   [base.addresse.nationale]: <http://adresse.data.gouv.fr/>
   [includes/config.php]: <https://github.com/tel2geo/t2g/tree/master/baseaddressenationale/includes/config.php>
   [import.php]: <https://github.com/tel2geo/t2g/tree/master/baseaddressenationale/import.php>
   [db.zip]: <https://drive.google.com/open?id=0B9WwPoU4qOvncXNNcXphbUN5a3c>
   [cquest]: <https://forum.etalab.gouv.fr/users/cquest>

  

