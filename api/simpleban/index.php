<?php
/*************************
 * 
 * T2G - Simple API
 * 
 * GeoJSON to simple JSON
 * 
 * Copyright 2016 - 2017
 * 
 * Thibaut LOMBARD 
 *
 *************************/ 

	ini_set("display_errors",0);
	if(isset($_GET['callback']))
			{
				$callback = $_GET['callback'];
			}
	// Si la limite de résultats est mal configurée 
	// ou absente celle-ci est égale à 10
	if(!isset($_GET["limit"]) && !is_numeric($_GET["limit"])){
			$limit = 10;
	} else { 
		$limit = $_GET["limit"];}
	if(isset($_GET["addr"])){
	$addresse = $_GET["addr"];
	$url = "http://api-adresse.data.gouv.fr/search/?q=".urlencode($addresse)."&limit=".$limit;
	} else { 
	$addresse = 0;
	$url = "https://tel2geo.fr/geo.json"; }
	$init_fopen = fopen($url, "r");

			while (!feof($init_fopen)) {
			$str_data = fgets($init_fopen);

				/* La méthode ci-dessous utilise file_get_content (moins rapide)
				//$str_data = file_get_contents("https://tel2geo.fr/geo.json");
				$str_data = file_get_contents("http://api-adresse.data.gouv.fr/search/?q=".urlencode($addresse)."&limit=".$limit);*/
				
				// Itérateur JSON Récursif Multidimensionnel
				$jsonIterator = new RecursiveIteratorIterator(    
				new RecursiveArrayIterator(json_decode($str_data, TRUE)),
				RecursiveIteratorIterator::SELF_FIRST);
				/* Débug sans Itérateur récursif
				$decoded = json_decode($str_data, true);
				echo $decoded["features"][0]["properties"]["label"];
				print_r($decoded["features"][0]["geometry"]["coordinates"][0]."  ".$decoded["features"][0]["geometry"]["coordinates"][1]."<br>");
				*/
				// Prépare l'enregistrement des données des boucles foreach dans un tableau
				$arrayaddr = array();
				$arraycoord = array();
				$i=0;
				foreach ($jsonIterator as $key['properties'] => $val){
					if(isset($val["label"])){
						//echo "num:".$i++." ".$val["label"]."<br>";
						// enregistre les résultat du foreach dans un tableau
						$arrayaddr[] = $val["label"];
					}
				}
				foreach ($jsonIterator as $key['geometry'] => $val){
					if(isset($val["coordinates"])){
						//echo $val["coordinates"][0].",".$val["coordinates"][1]."<br>";
						// enregistre les résultat du foreach dans un tableau
						$arraycoord[] = $val["coordinates"][0].",".$val["coordinates"][1];
					}
				}
					// On formate les résultats au format JSON
					$injson = array('addresses' => $arrayaddr,'coordonnees' => $arraycoord);
					header('Content-Type: application/json');
					echo $callback.'(' .json_encode($injson). ')';
			}
			fclose($init_fopen);
?>
