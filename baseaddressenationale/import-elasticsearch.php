<?php
/*
* *********************************
© 2017 - Author : Thibaut LOMBARD *
* *********************************
* 
* Commandes Bash à effectuer avant le traitement des fichiers
* ===========================================================
*  - extraire le fichier Base d'addresse nationale officiel
*  - Oter les entête des colonnes avec sed
* 		sed -i 1d *.csv
*  - Faire un décompte indicatif du nombre de lignes
* 		cat test.csv | wc -l
*  - Réunir tout les csv en 1 seul pour les segmenter soi-même
* 		#!/bin/sh
*		for i in `echo *.csv`; do
*			cat $i >>  all.csv
*		done
*  - Segmenter son fichier csv en part égales (exemple 128M)
* 		split -l 128M all.csv all.csv.part
* 
* Vérifiez dans votre php.ini que la taille accordée au cache et à la mémoire vive
* ne va pas saturer ( memory_limit à 256 ou 128M).
* 
* En PHP : 
* ========
* Remplacer les champs suivants par 
* vos données d'identification shield
* ainsi que le port / protocol de connection à votre 
* cluster elasticsearch
* $usershield = "yourusername";
* $passwordshield = "yourpassword";
* $elasticsearchport = "9900";
* $protocol = "http://";
* 
* Commandes utiles après traitement des morceaux de database :
* ============================================================
* - Supprimer les 6 derniers caractères
* 	truncate -s-6 all.csv 
* - Supprimer la derniere ligne
* 	head -n -1 all.csv.part1 > all.csv-nolastline.part1
* - Merger tout les fichiers
* 	cat 01.es 02.es 03.es 04.es 05.es 06.es 07.es 08.es 09.es 10.es 11.es 12.es 13.es 14.es 15.es 16.es 17.es 18.es 19.es 20.es 21.es 22.es
* 	23.es 24.es 25.es 26.es 27.es 28.es 29.es 30.es 31.es 32.es 33.es 34.es 35.es 36.es >> ban.sh
* - Rajouter le shebang
* 	sed -i '1 i #!/bin/bash' 
*  
*/
ini_set("memory_limit", "-1");
set_time_limit(0);
ini_set("display_errors",1);
//session_start();
error_reporting(1);
//transforme un fichier csv en array
//http://php.net/manual/fr/function.file.php
function csv_in_array($url,$delm=";",$encl="\"",$head=false) {
   
    $csvxrow = file($url);   // ---- csv rows to array ----
   
    $csvxrow[0] = chop($csvxrow[0]);
    $csvxrow[0] = str_replace($encl,'',$csvxrow[0]);
    $keydata = explode($delm,$csvxrow[0]);
    $keynumb = count($keydata);
   
    if ($head === true) {
    $anzdata = count($csvxrow);
    $z=0;
    for($x=1; $x<$anzdata; $x++) {
        $csvxrow[$x] = chop($csvxrow[$x]);
        $csvxrow[$x] = str_replace($encl,'',$csvxrow[$x]);
        $csv_data[$x] = explode($delm,$csvxrow[$x]);
        $i=0;
        foreach($keydata as $key) {
            $out[$z][$key] = $csv_data[$x][$i];
            $i++;
            }   
        $z++;
        }
    }
    else {
        $i=0;
        foreach($csvxrow as $item) {
            $item = chop($item);
            $item = str_replace($encl,'',$item);
            $csv_data = explode($delm,$item);
            for ($y=0; $y<$keynumb; $y++) {
               $out[$i][$y] = $csv_data[$y];
            }
        $i++;
        }
    }

return $out;
}
$protocol = "http://";
$usershield = "username";
$passwordshield = "password";
$elasticsearchport = "9900";
$databasecsv ="all.csv";
$tmp = $databasecsv.".es";
$csvdata = csv_in_array( $databasecsv, ";", "\"", False );
$i=0;
$op = fopen($tmp, 'w');
foreach ($csvdata as $key => $value) {
$id = $value[0];
$nom_voie = htmlspecialchars($value[1],ENT_QUOTES);
$id_fantoir = htmlspecialchars($value[2],ENT_QUOTES);
$numero = htmlspecialchars($value[3],ENT_QUOTES);
$rep = htmlspecialchars($value[4],ENT_QUOTES);
$code_insee = htmlspecialchars($value[5],ENT_QUOTES);
$code_post = htmlspecialchars($value[6],ENT_QUOTES);
$alias = htmlspecialchars($value[7],ENT_QUOTES);
$nom_ld = htmlspecialchars($value[8],ENT_QUOTES);
$nom_afnor = htmlspecialchars($value[9],ENT_QUOTES);
$libelle_acheminement = htmlspecialchars(utf8_encode($value[10]),ENT_QUOTES);
$lettrex = htmlspecialchars($value[11],ENT_QUOTES);
$lettrey = htmlspecialchars($value[12],ENT_QUOTES);
$lon = $value[13];
$lat = $value[14];
$nom_commune = htmlspecialchars($value[15],ENT_QUOTES);

$arrayJSON = array('id' => $id, 'nom_voie' => $nom_voie, 'id_fantoir' => $id_fantoir, 'numero' => $numero, 'rep' => $rep, 'code_insee' => $code_insee, 'code_post' => $code_post, 'alias' => $alias, 'nom_ld' => $nom_ld, 'nom_afnor' => $nom_afnor, 'libelle_acheminement' => $libelle_acheminement, 'x' => $lettrex, 'y' => $lettrey, 'lon' => $lon, 'lat' => $lat, 'nom_commune' => $nom_commune);

$req = "curl -XPUT \"".$protocol.$usershield.":".$passwordshield."@127.0.0.1:".$elasticsearchport."/ban/fr/".$i++."\" -d '".json_encode($arrayJSON)."' \r\n";

fwrite($op, $req);   
} 
fclose($op);
?>
