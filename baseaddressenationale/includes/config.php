<?php
/* Copyright - Thibaut LOMBARD
 * GNU - GPL3 License
 */
ini_set("display_errors",1);
// Remplacez les champs de la ligne suivante par vos identifiants
$link = mysqli_connect("localhost", "utilisateur", "password", "addr");

			if (!$link) {
				echo "Error: Unable to connect to MySQL." . PHP_EOL;
				echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
				echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
				exit;
			}
			// Permet de s'assurer que l'importation s'effectue avec le bon charset
			if (!$link->set_charset("utf8")) {
			printf("Error loading character set utf8: %s\n", $con->error);
			}
			
			// Sécurisation contre le cross-site-scripting
			function secu_txt($text) {
    			return htmlentities(strip_tags($text), ENT_QUOTES, 'UTF-8');
									}
			
			// Sécurisation contre les SQL Injections
			function clean($variable) {
				global $link;
						$variable2 = utf8_decode($variable);
						if (get_magic_quotes_gpc())
							{
					$variable2 = stripslashes($variable2);
							}
				$variable2 = mysqli_real_escape_string($link,$variable2);
				$variable2 = utf8_encode($variable2);
				return $variable2;
										}
			//mysqli_close($link);
?>
