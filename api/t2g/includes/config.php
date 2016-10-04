<?php
/* Copyright - Thibaut LOMBARD
 * GNU - GPL3 License
 */
ini_set("display_errors",1);

$link = mysqli_connect("localhost", "username", "", "tel");

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
			//be secured against cross site scripting attacks
			function secu_txt($text) {
    			return htmlentities(strip_tags($text), ENT_QUOTES, 'UTF-8');
									}
			
			//be secured against sql injections attacks
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

			// Pour l'algo de création de la clé API (register-exec.php)
			function base62encode($data) {
						$outstring = '';
						$l = strlen($data);
						for ($i = 0; $i < $l; $i += 8) {
							$chunk = substr($data, $i, 8);
							$outlen = ceil((strlen($chunk) * 8)/6); 
							$x = bin2hex($chunk);  
							$w = gmp_strval(gmp_init(ltrim($x, '0'), 16), 62); 
							$pad = str_pad($w, $outlen, '0', STR_PAD_LEFT);
							$outstring .= $pad;
						}
						return $outstring;
					}
			// Pour le décodage de l'algo de création de la clé API (register-exec.php)
			function base62decode($data) {
						$outstring = '';
						$l = strlen($data);
						for ($i = 0; $i < $l; $i += 11) {
							$chunk = substr($data, $i, 11);
							$outlen = floor((strlen($chunk) * 6)/8); //6bit/char in, 8bits/char out, round down
							$y = gmp_strval(gmp_init(ltrim($chunk, '0'), 62), 16); //gmp doesn't like leading 0s
							$pad = str_pad($y, $outlen * 2, '0', STR_PAD_LEFT); //double output length as as we're going via hex (4bits/char)
							$outstring .= pack('H*', $pad); //same as hex2bin
						}
						return $outstring;
					}
			
			// définition des variables de configuration des cookies 
			$cookie_name = 'siteAuth';
			$cookie_time = (3600 * 24 * 30); // 30 days
			// les actions suivantes sont ajoutées pour la prise en charge des cookies
			header('Last-Modified: ' . gmdate("D, d M Y H:i:s") . ' GMT'); 
			// HTTP/1.1 
			header('Cache-Control: no-store, no-cache, must-revalidate'); 
			header('Cache-Control: post-check=0, pre-check=0', false); 
			// HTTP/1.0 
			header('Pragma: no-cache');

?>
