<?php
/**************************************************
* © 2016 - Author : Thibaut LOMBARD
* Script d'importation des fichiers csv distribués
* sur addresse.data.gouv.fr
* Chaque fichier est alors importé manuellement 
* dans la base de donnée, lire le fichier README.md
* Pour configurer votre base de donnée (la table 
* addr)
* License : OdbL
***************************************************/
		ini_set('memory_limit', '-1');
		set_time_limit(0);
		ini_set("display_errors",1);
		require_once("includes/config.php");
		error_reporting(1);
		$table_name = "addr";
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
			// Remplacez votrefichier.csv par celui correspondant
			$dbcsv ="votrefichier.csv";
			$csvdata = csv_in_array( $dbcsv, ";", "\"", False );
			$i=0;
			foreach ($csvdata as $key => $value) {
			$id = clean($value[0]);
			$nom_voie = clean($value[1]);
			$id_fantoir = clean($value[2]);
			$numero = clean($value[3]);
			$rep = clean($value[4]);
			$code_insee = clean($value[5]);
			$code_post = clean($value[6]);
			$alias = clean($value[7]);
			$nom_ld = clean($value[8]);
			$nom_afnor = clean($value[9]);
			$libelle_acheminement = clean($value[10]);
			$lettrex = clean($value[11]);
			$lettrey = clean($value[12]);
			$lon = clean($value[13]);
			$lat = clean($value[14]);
			$nom_commune = clean($value[15]);
			// Dé-commentez en cas de bug.
			//echo "id : ".$value[0]." - Nom voie ".$nom_voie." - id fantoir".$id_fantoir." - numero ".$numero." - rep ".$rep." - code insee ".$code_insee." - code post ".$code_post." - alias ".$alias." - nom ld ".$nom_ld." - nom afnor ".$nom_afnor." - libelle achemintement".$libelle_acheminement." - x ".$lettrex." - y ".$lettrey." - lon ".$lon." - lat ".$lat." - nom_commune ".$nom_commune."<br>";
			$sql = "INSERT INTO $table_name (id, nom_voie, id_fantoir, numero, rep, code_insee, code_post, alias, nom_ld, nom_afnor, libelle_acheminement, x, y, lon, lat, nom_commune) values ('$id', '$nom_voie', '$id_fantoir', '$numero', '$rep', '$code_insee', '$code_post', '$alias', '$nom_ld', '$nom_afnor', '$libelle_acheminement', '$lettrex', '$lettrey', '$lon', '$lat', '$nom_commune')";
			mysqli_query($link,$sql) or exit(mysql_error()); 
			} 
?>
