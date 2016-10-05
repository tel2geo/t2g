<?php
/*
http://en.wikipedia.org/wiki/ISO_3166-1_numeric
http://blog.teamtreehouse.com/how-to-parse-xml-with-php5
http://stackoverflow.com/questions/11204479/do-you-know-any-opensource-jquery-dropdown-menu-for-telephone-prefix
Dans votre panel admin réglez la bdd en utf8_unicode_ci
CREATE DATABASE `COUNTRIES`;
CREATE TABLE `country` (
`name` TEXT NOT NULL ,
`tld` TEXT NOT NULL ,
`cca2` TEXT NOT NULL ,
`ccn3` TEXT NOT NULL ,
`cca3` VARCHAR(4) ,
`currency` TEXT NOT NULL ,
`callingCode` FLOAT NOT NULL  ,
`capital` TEXT NOT NULL ,
`altSpellings` TEXT NOT NULL ,
`relevance` TEXT NOT NULL ,
`region` TEXT NOT NULL ,
`subregion` TEXT NOT NULL ,
`nativeLanguage` TEXT NOT NULL ,
`translations` TEXT NOT NULL ,
`latlng` TEXT NOT NULL ,
`demonym` TEXT NOT NULL ,
`borders` TEXT NOT NULL ,
`area` TEXT NOT NULL ,
PRIMARY KEY ( `cca3` )
) ENGINE = MYISAM 
*/
// DÃ©sactive les messages d'erreurs
error_reporting(0);
ini_set("display_errors",0);
header('Content-Type: application/json');
$db_host = "localhost";
$db_username = "username";
$db_password = "password";
$db_name = "COUNTRIES";
$table_name = "country";
mysql_connect($db_host,$db_username,$db_password) or die ('Impossible de se connecter à la base de donn&eacute;:'.mysql_error());
mysql_select_db($db_name) or die ('Impossible d&apos;ouvrir la base de donnée , FAIL ! '.$db_name.' : '.mysql_error());
//Fin : connexion à la base et sa séléction

//On charge le fichier XML contenant les données relatives aux pays
//nettoyage des entrées et des apostrophesétant susceptibles de faire 
//jaillir des erreurs
$countrycode = $_GET["cc"];
$checkcountry = strlen($countrycode);
 if(isset($_GET['callback']))
    {
        $callback = $_GET['callback'];
    }   
if($checkcountry == 2)
    {
$sql = "SELECT * FROM $table_name WHERE cca2='$countrycode'";
$result = mysql_query($sql)or die("erreur");


while ($row = mysql_fetch_array($result)) {
/* Maintenant, nous libérons le résultat et continuons notre script */
mysql_free_result($result);

$name = $row["name"]; 
$nameexplode = explode(",", $name);
$common = $nameexplode[0]; 
$official = $nameexplode[1];
$nativecommon = $nameexplode[2];
$nativeofficial = $nameexplode[3];
$tld = $row["tld"];
$cca2 = $row["cca2"];
$ccn3 = $row["ccn3"];
$cca3 = $row["cca3"];
$currency = $row["currency"];
$callingCode = $row["callingCode"];
$capital = $row["capital"];
$altSpellings = $row["altSpellings"];
$relevance = $row["relevance"];
$region = $row["region"];
$subregion = $row["subregion"];
$nativeLanguage = $row["nativeLanguage"];
$translations = $row["translations"];
$latlng = $row["latlng"];
$demonym = $row["demonym"];
$borders = $row["borders"];
$area = $row["area"];

$injson = array('common' =>  utf8_encode($common),'official' =>  utf8_encode($official) ,'nativecommon' =>  utf8_encode($nativecommon) , 'nativeofficial' =>  utf8_encode($nativeofficial), 'tld' =>  utf8_encode($tld) ,'cca2' =>  utf8_encode($cca2) ,'ccn3' =>  utf8_encode($ccn3),'cca3' =>  utf8_encode($cca3),'currency' =>  utf8_encode($currency),'callingCode' =>  utf8_encode($callingCode),'capital' =>  utf8_encode($capital), 'altSpellings' =>  utf8_encode($altSpellings),'relevance' =>  utf8_encode($relevance), 'region' =>  utf8_encode($region), 'subregion' =>  utf8_encode($subregion), 'nativeLanguage' => utf8_encode($nativeLanguage), 'translations' =>  utf8_encode($translations), 'latlng' =>  utf8_encode($latlng), 'demonym' =>  utf8_encode($demonym), 'borders' =>  utf8_encode($borders), 'area' =>  utf8_encode($area));
echo $callback.'(' .json_encode($injson). ')';
    }

   
 } else {
echo "bad url : http://".$_SERVER['HTTP_HOST']."/countries/?countrycode=XX Please, replace XX by a valid country code ..";
}


//fin du script api countries
?> 
