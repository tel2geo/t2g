<?php

/*

index.php is a part of Countries API, a script created in order to throw the data related to most of the countries. This script is a php file related to a mysql database, and is free license.

Copyright (C) 2014 - 2017  Thibaut LOMBARD

Credits : Mledoze https://github.com/mledoze/countries



This program is free software: you can redistribute it and/or modify

it under the terms of the GNU General Public License as published by

the Free Software Foundation, either version 3 of the License, or

(at your option) any later version.



This program is distributed in the hope that it will be useful,

but WITHOUT ANY WARRANTY; without even the implied warranty of

MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the

GNU General Public License for more details.



You should have received a copy of the GNU General Public License

along with this program.  If not, see <http://www.gnu.org/licenses/>.





http://en.wikipedia.org/wiki/ISO_3166-1_numeric

http://blog.teamtreehouse.com/how-to-parse-xml-with-php5

http://stackoverflow.com/questions/11204479/do-you-know-any-opensource-jquery-dropdown-menu-for-telephone-prefix

Dans votre panel admin réglez la bdd en utf8_unicode_ci

CREATE DATABASE `COUNTRIES`;

CREATE TABLE `countries` (

`common` TEXT NOT NULL ,

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

// Disable the errors messages


ini_set("display_errors",0);

// Set the content-type to JSON output

header('Content-Type: application/json');

// Connection credentials

	$table_name = "countries";

	$link = mysqli_connect("localhost", "username", "password", "COUNTRIES");

		if (!$link->set_charset("utf8")) {

			printf("Error loading character set utf8: %s\n", $con->error);

		}



		if (!$link) {

			echo "Error: Unable to connect to MySQL." . PHP_EOL;

			echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;

			echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;

			exit;

		}



	// End of the depreceated connection procedure



		// Now i am loading the source code and removing the possible errors

		$common = $_GET["common"];

		$checkcountry = strlen($countrycode);

		 if(isset($_GET['callback']))

		    {

			$callback = $_GET['callback'];

		    }   

		if(ctype_alpha(str_replace(' ', '', $common)))

		    {

		$sql = "SELECT * FROM `".$table_name."` WHERE `common`='".$common."'";

			$result=mysqli_query($link,$sql)or die( mysqli_error($link) );

			while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))

					{



		/* Freeing the latest results */

			mysqli_free_result($result);



			// retreive the data from the database

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

						// JSON Output

						$injson = array('common' =>  $common,'official' =>  $official ,'nativecommon' =>  $nativecommon , 'nativeofficial' =>  $nativeofficial, 'tld' =>  $tld ,'cca2' =>  $cca2 ,'ccn3' =>  $ccn3,'cca3' =>  $cca3,'currency' =>  $currency,'callingCode' =>  $callingCode,'capital' =>  $capital, 'altSpellings' =>  $altSpellings,'relevance' =>  $relevance, 'region' =>  $region, 'subregion' =>  $subregion, 'nativeLanguage' => $nativeLanguage, 'translations' =>  $translations, 'latlng' =>  $latlng, 'demonym' =>  $demonym, 'borders' => $borders, 'area' =>  $area);

						echo $callback.'(' .json_encode($injson). ')';

						    }



			   

			 } else {

			echo "bad url : http://".$_SERVER['HTTP_HOST']."/countries/?cc=ZZ Please, replace ZZ by a valid country code ..";

			}





// EOF

?>
