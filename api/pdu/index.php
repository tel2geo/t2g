<?php
/*
 * Copyright - T2G Project
 * 2016 - 2017
 * GNU License GPL3
 * By Thibaut LOMBARD
 */
//affichage des erreurs
 error_reporting(0);
 ini_set("display_errors", 0);
	@require_once 'pdu.class.php';

	function secu_txt($text) {
		    			return htmlentities(strip_tags($text), ENT_QUOTES, 'UTF-8');
							}	
$pduenc = new pduencode();
$str = secu_txt($_GET["i"]);
$veriftype = $_GET["t"];
$types = array('enc','dec');

if(isset($_GET['callback']))    { $callback = $_GET['callback'];    }  
if (in_array($veriftype, $types)) {
switch($veriftype)
{
case 'enc';   
$encodage = $pduenc->querytoenc($str);
header('Content-Type: application/json');
$arrjson = array('type' => 'encodage','TXT' => $encodage);
echo $callback.'(' .json_encode($arrjson ,JSON_UNESCAPED_UNICODE). ')';
break;
case 'dec';
$decodage = $pduenc->querytodec($str);
header('Content-Type: application/json');
$arrjson = array('type' => 'decodage','TXT' => $decodage);
echo $callback.'(' .json_encode($arrjson ,JSON_UNESCAPED_UNICODE). ')';
break;
exit();			
	}
 } else {
echo "erreur de programmation";
}
?>
