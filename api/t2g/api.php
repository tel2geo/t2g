<?php
/*
© 2016 - Author : Thibaut LOMBARD

CREATE TABLE `rec` (
`id` VARCHAR(40) ,
`ip` TEXT NOT NULL ,
`url` TEXT NOT NULL ,
`datetime` TEXT NOT NULL ,
PRIMARY KEY ( `id` )
) ENGINE = MYISAM

*/


			/* ******************************************
			* Variables d'initialisation
			*********************************************/
			//session_start();
			require_once("includes/config.php");
			ini_set("display_errors",0);
			// On configure les tables
			$table_name_majnum = "majnum";
			$table_name_operateurfull = "liste_operateur_full";
			$table_name_operateur = "liste_code_operateur";
			$table_name_zabpqzne = "zabpqzne";
			$table_name_zne = "liste_zne";
			$table_name_codepostaux = "codespostauxnew";

			// Tableau pour afficher les erreurs de validations
			$errmsg_arr = array();	
			// Flag de validation des erreurs
			$errflag = false;
			
			// Variables orphelines
			$url="0";
			$callback= $_GET['callback'];
			
			// Variables
			$rand = substr(md5(rand(0,100000).time()),0,40);
			$ip = $_SERVER["REMOTE_ADDR"];
			$datetime = date("Y-m-d\TH:i:sP");
			$getmode = $_GET['mode'];
			$mode = array("majnum","operateurfull","operateur","zabpqzne","zne","codepostaux");
			// Boucles de sureté 
			if(isset($_SERVER['HTTP_REFERER']) AND isValidURL($_SERVER['HTTP_REFERER'])){$url = $_SERVER['HTTP_REFERER'];}			
			// Requêtes GET et validation		 
			$numero = $_GET["numero"];			
			$codeoperateur = $_GET["codeoperateur"];
			$zabpq = $_GET["zabpq"];
			$codeinsee = $_GET["codeinsee"];
	
			/************************************
			 * Fonctions de bases 
			 ************************************/
				 
				// fonction de validation des URl
				function isValidURL($url) {
					return preg_match('|^(http(s)?://)?[a-z0-9-]+\.(.[a-z0-9-]+)+(:[0-9]+)?(/.*)?$|i', $url);
				}
				
				// fonction de vérification de caractères alphanumériques
				function isalphanum($donnee){
					return preg_match('/^[a-zA-Z0-9]+$/', $donnee);
				}
				
				// fonction de suppression des espaces	
				function supprespaces($chaineavecespaces){
					return preg_replace('!\s+!', ' ', $chaineavecespaces);
				}
				
				// fonction de formatage du texte
				function formattext($chaineaformater){
					return ucwords(strtolower($chaineaformater));
				}


			/****************************************
			 * Conditions de validation des Variables
			 * **************************************/	
				//mode majnum
				// Variable numero=
				if (isset($numero)  && $getmode != "majnum") {
                        $errmsg_arr[] = 'Mauvais mode, la variable numero ne fonctionne qu\'avec le mode=majnum.';
                        $errflag = true;
							}
				if (!isset($numero)  && $getmode == "majnum") {
                        $errmsg_arr[] = 'Variable numero= inexistante pour le mode majnum.';
                        $errflag = true;
							}
      		    if (isset($numero) && strlen($numero) < 10 && $getmode == "majnum") {
                        $errmsg_arr[] = 'Variable numero= invalide, le numéro doit comporter 10 chiffres avec le mode majnum.';
                        $errflag = true;
							}
      		    if (isset($numero) && !is_numeric($numero) && $getmode == "majnum") {
                        $errmsg_arr[] = 'Variable numero= invalide, le numéro doit comporter uniquement des chiffres avec le mode majnum.';
                        $errflag = true;
							}
				//mode operateur 
				// variable codeoperateur alphabétique
      		    if (isset($codeoperateur) && !ctype_alpha($codeoperateur) && $getmode="operateur") {
                        $errmsg_arr[] = 'La variable opérateur doît être alphabétique et en majuscules.';
                        $errflag = true;
							}
      		    if (isset($codeoperateur) && strlen($codeoperateur) > 10 && $getmode == "operateur") {
                        $errmsg_arr[] = 'La variable opérateur codeoperateur= doît comporter moins de 10 caractères.';
                        $errflag = true;
							}
				//mode operateurfull
				// variable codeoperateur alphabetique
      		    if (isset($codeoperateur) && !ctype_alpha($codeoperateur) && $getmode="operateurfull") {
                        $errmsg_arr[] = 'La variable opérateur doît être alphabétique et en majuscules.';
                        $errflag = true;
							}
      		    if (isset($codeoperateur) && strlen($codeoperateur) > 10 && $getmode == "operateurfull") {
                        $errmsg_arr[] = 'La variable opérateur codeoperateur= doît comporter moins de 10 caractères.';
                        $errflag = true;
							}
				//mode zabpqzne
				// variable zabpq numérique
      		    if (isset($zabpq) && !is_numeric($zabpq) && $getmode="zabpqzne") {
                        $errmsg_arr[] = 'La variable zabpq= doît être numérique.';
                        $errflag = true;
							}
      		    if (isset($zabpq) && strlen($zabpq) > 10 && $getmode == "zabpqzne") {
                        $errmsg_arr[] = 'La variable zabpq= doît comporter moins de 10 caractères.';
                        $errflag = true;
							}
				//mode codepostaux
				// variable zabpq numérique
      		    if (isset($codeinsee) && !is_numeric($codeinsee) && $getmode="codepostaux") {
                        $errmsg_arr[] = 'La variable codeinsee= doît être numérique.';
                        $errflag = true;
							}
      		    if (isset($codeinsee) && strlen($codeinsee) > 8 && $getmode == "codepostaux") {
                        $errmsg_arr[] = 'La variable codeinsee= doît comporter moins de 8 caractères.';
                        $errflag = true;
							}
				// Validation des variables redondantes
				if(!isset($_GET['callback'])){ 
                        $errmsg_arr[] = 'Variable callback : callback= invalide.';
                        $errflag = true;
                        }
				if (!in_array($getmode, $mode)) {
						$errmsg_arr[] = 'Variable mode :  mode= invalide.';
						$errflag = true;
							}
			   
				//Début de la condition qui permet la vérification du nombre d'addresses ip
				$qry = "SELECT * FROM rec WHERE ip='$ip'";
				$result = mysqli_query($link,$qry)or die("erreur");

				if($result) {
				//Si l'addresse IP a moins de 100 entrées dans la bdd effectuer la requete
				if(mysqli_num_rows($result) > 10000) {
					$errmsg_arr[] = 'Votre IP est blacklist&eacute;e, vous avez d&eacute;pass&eacute;(e) la limite de 1000 requêtes.';
					$errflag = true;
								} //fin if mysql num row
					mysqli_free_result($result);
					} else {
					die("Tentatives de connections avec l\'ip :".$ip."  trop nombreuses");
						} // Fin if results
	
				//Boucle qui permet l'affichage des erreurs
				if( isset($errmsg_arr) && is_array($errmsg_arr) && count($errmsg_arr >0 )) {
					foreach($errmsg_arr as $msg) {
						echo '<li>',$msg,'</li>'; 
								}//fin du foreach errmsgarray

					}//fin du ifisset errmsgarray
				
				if($errflag){
				echo 'Impossible d\'executer le(s) requ&ecirc;te(s).';
				} else {
				$qry2 = "INSERT INTO rec(id,ip,url,datetime) VALUES  ('$rand','$ip','$url','$datetime')";
				$result2= mysqli_query($link,$qry2)or die("erreur");
				switch($getmode)
						{
						case 'majnum';
							$sql = "SELECT * FROM $table_name_majnum WHERE Tranche_Debut <=$numero AND Tranche_Fin >=$numero";
							$result = mysqli_query($link,$sql)or die("erreur");
							while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
							/* Maintenant, nous libérons le résultat et continuons notre script */
							//mysql_free_result($result);
							$idmajnum = $row["idmajnum"]; 
							$ezabpqm = $row["EZABPQM"];
							$Tranche_Debut = $row["Tranche_Debut"];
							$Tranche_Fin = $row["Tranche_Fin"];
							$Mnemo = $row["Mnemo"];
							$Territoire = mb_convert_encoding($row["Territoire"], 'cp1252', 'UTF-8');
							$Date_Attribution = $row["Date_Attribution"];

							$injson = array('idmajnum' => $idmajnum,'ezabpqm' => $ezabpqm ,'tranche_debut' => $Tranche_Debut ,'tranche_fin' => $Tranche_Fin ,'mnemo' => $Mnemo ,'territoire' => utf8_encode($Territoire) ,'date_attribution' => $Date_Attribution);
							header('Content-Type: application/json');
							//debug
							echo $callback.'(' .json_encode($injson). ')';

								}
						break;
						case 'operateurfull';
							$sql = "SELECT * FROM $table_name_operateurfull WHERE codeoperateur = '$codeoperateur'";// $codeoperateur";
							$result = mysqli_query($link,$sql)or die("erreur");

							while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
							/* Maintenant, nous libérons le résultat et continuons notre script */
							//mysql_free_result($result);

							$idoperateur = $row["idoperateur"]; 
							$identiteoperateur = $row["identiteoperateur"];
							$codeoperateurd = $row["codeoperateur"];
							$siretacteur = $row["siretacteur"];
							$rcsacteur = $row["rcsacteur"];
							$addresse_complete_acteur = $row["addresse_complete_acteur"];
							$besoin_res_num = $row["besoin_res_num"];


							$injson = array('idoperateur' => $idoperateur,'codeoperateur' => $codeoperateurd ,'identiteoperateur' => $identiteoperateur ,'siretacteur' => $siretacteur ,'rcsacteur' => $rcsacteur ,'addresse_complete_acteur' => $addresse_complete_acteur ,'besoin_res_num' => $besoin_res_num);
							header('Content-Type: application/json');
							//debug
							echo $callback.'(' .json_encode($injson). ')';

								}
						break;
						case 'operateur';
							$sql = "SELECT * FROM $table_name_operateur WHERE codeoperateur = '$codeoperateur'";// $codeoperateur";
							$result = mysqli_query($link,$sql)or die("erreur");

							while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
							/* Maintenant, nous libérons le résultat et continuons notre script */
							//mysql_free_result($result);

							$idcodeoperateur = $row["idcodeoperateur"]; 
							$codeoperateurd = $row["codeoperateur"];
							$societe = $row["societe"];
							$siteweb = $row["siteweb"];


							$injson = array('idcodeoperateur' => $idcodeoperateur,'codeoperateur' => $codeoperateurd ,'societe' => $societe , 'siteweb' => $siteweb);
							header('Content-Type: application/json');
							//debug
							echo $callback.'(' .json_encode($injson). ')';

								}
						break;
						case 'zabpqzne';
							$sql = "SELECT * FROM $table_name_zabpqzne WHERE zabpq = '$zabpq'";
							$result = mysqli_query($link,$sql)or die("erreur");

							while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

							$idzabpq = $row["idzabpq"]; 
							$zne = $row["zne"];
							$zabpq = $row["zabpq"];

							$injson = array('idzabpq' => $idzabpq,'zabpq' => $zabpq ,'zne' => $zne);
							header('Content-Type: application/json');
							//debug
							echo $callback.'(' .json_encode($injson). ')';

								}
						break;
						case 'zne';
							$sql = "SELECT * FROM $table_name_zne WHERE codeinsee = '$codeinsee'";// $codeoperateur";
							$result = mysqli_query($link,$sql)or die("erreur  ".mysql_error());//.mysql_error());
							while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
							$idlistezne = $row["idlistezne"]; 
							$cheflieu = $row["cheflieu"];
							$codeinseed = $row["codeinsee"];
							$nrodept = $row["nrodept"];
							$nomdept = formattext($row["nomdept"]);

							$injson = array('idlistezne' => $idlistezne,'cheflieu' => $cheflieu ,'codeinsee' => $codeinseed ,'numerodept' => $nrodept ,'nomdept' => $nomdept);
							header('Content-Type: application/json');
							//debug
							echo $callback.'(' .json_encode($injson). ')';

								}
					 
						break;	
						case 'codepostaux';
								$sql = "SELECT * FROM $table_name_codepostaux WHERE CCINSEE = '$codeinsee'";
								$result = mysqli_query($link,$sql)or die("erreur");

								while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
									$idcodepostaux = $row["idcodespostaux"]; 
									$ccinsee = $row["CCINSEE"];
									$commune0 = supprespaces($row["commune"]);
									$commune = formattext($commune0); 
									$codepostaret = $row["codepostal"];
									$libelleacheminement = formattext($row["libelleacheminement"]);
									$lat = $row["lat"];
									$lon = $row["lon"];
									$display_name = mb_convert_encoding($row["display_name"], 'cp1252', 'UTF-8');

									$injson = array('idcodepostaux' => $idcodepostaux,'ccinsee' => $ccinsee ,'commune' => $commune , 'codepostal' => $codepostaret, 'libelleacheminement' => $libelleacheminement, 'lat' => $lat, 'lon' => $lon, 'display_name' => utf8_encode($display_name));
									header('Content-Type: application/json');

									echo $callback.'(' .json_encode($injson). ')';


										}
									mysqli_free_result($result);
									mysqli_close($link);
					
						break;
						} // fin du switch
					exit();
				}  // fin du if else errorflag
			

	
?>
