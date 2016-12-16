// Copyright 2016 
// Author : Thibaut Marie Pierre LOMBARD
// License : GNU-GPL3
// Contact : contact@ctrlfagency.com
$(function(){
	function getip(){
					$.ajax({
							url : "https://www.thibautlombard.space/geo/ip.php?callback=?",
							dataType:"jsonp",
							jsonp:"callback",
							success:function(data)
							{
							var	ip = data.ip;
							getiptocoord(ip);
							}
						});
			}
	getip();

	//fonction de conversion ip -> coordonnées 
	function getiptocoord(ip){

						$.ajax({
							url : "//api.tel2geo.fr/wthr/api/ip/"+ip+"/mod/ip/callback/",
							dataType:"jsonp",
							jsonp:"callback",
							success:function(data)
							{
	                                                var lati = data.lat;
                                               		var longi = data.lon;
				
                                	                getfirstweatherforecast(lati,longi);

							}
						});
				}

	
   // fonction d'affichage des données météos
   function getfirstweatherforecast(lati,longi){
	   // formatage de la date au format fr
	   moment.locale('fr');
	   // description des variables du climat
		var wthrdsc = {
						201 : "orages avec pluies",
						202 : "orages et fortes pluies",
						210 : "lègers orages",
						211 : "orages",
						212 : "orages violents",
						221 : "orages irréguliers",
						230 : "orages avec légères bruines",
						231 : "orages et bruines",
						232 : "orages et crachins",
						300 : "bruines de faibles intensités",
						301 : "bruines",
						302 : "fortes bruines",
						310 : "pluies et bruines de faibles intensités",
						311 : "bruines et pluies",
						312 : "pluies et bruines de fortes intensités",
						313 : "averses et bruines",
						314 : "pluies torrentielles et bruines",
						321 : "bruines torrentielles",
						500 : "légères pluies",
						501 : "pluies modérées",
						502 : "fortes pluies",
						503 : "pluies torrentielles",
						504 : "pluies extrèmes",
						511 : "pluies verglaçantes",
						520 : "averses de faibles intensités",
						521 : "averses",
						522 : "averses de fortes intensités",
						531 : "averses irrégulières",
						600 : "neiges légères",
						601 : "neiges",
						602 : "fortes neiges",
						611 : "grésil",
						612 : "averses de grésil",
						615 : "pluies légères et neiges",
						616 : "pluies et neiges",
						620 : "légères chutes de neiges",
						621 : "averse neigeuses",
						622 : "fortes chutes de neiges",
						701 : "brouillard",
						711 : "fumées",
						721 : "brumes",
						731 : "légères tempêtes de sables tourbillonnantes",
						741 : "brouillard",
						751 : "vents sablonneux",
						761 : "vents poussièreux",
						762 : "vents de cendres volcaniques",
						771 : "bourrasques",
						781 : "tornades",
						800 : "ciel clair",
						801 : "quelques nuages",
						802 : "nuages dispersés",
						803 : "nuages brisés",
						804 : "ciel couvert",
						900 : "tornades",
						901 : "tornade tropicale",
						902 : "ouragans",
						903 : "glace",
						904 : "chaleurs intenses",
						905 : "venteux",
						906 : "grêle",
						951 : "calme",
						952 : "légère brises",
						953 : "brises",
						954 : "brises modérées",
						955 : "brises fraîches",
						956 : "fortes brises",
						957 : "vents forts, lègers coups de vents",
						958 : "coups de vents",
						959 : "fortes bourrasques de vent",
						960 : "orages",
						961 : "orages violents",
						962 : "ouragans"
						};
		// à décommenter pour debug
		//alert(lati + '<-lat-long->' + longi + 'api ');
		$.ajax({
        url: "//api.tel2geo.fr/wthr/api/mod/owm/lat/"+lati+"/lon/"+longi+"/callback/",
        dataType: "jsonp",
        jsonp:"callback",
        success:function(data)	{
						var city = data.city.name;
						//alert(city);
						$("#titreville").html(city);
						for(var i=0; i<data.list.length; i++){
						  var weatherDescr = data.list[i].weather[0].description;
						  var celciusTemp =((data.list[i].main.temp)-273).toFixed(0);
						  var dateTime = data.list[i].dt_txt;
						  var pic = data.list[i].weather[0].icon;
						  var number = data.list[i].weather[0].id;
						  
						  if (number >= 200 && number <= 232){

							$(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/thunderstorm.svg'/>" + "</li></h2><hr>");
						  }
						  else if (number >= 300 && number <= 321){
							$(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/drizzle.svg'/>" + "</li></h2><hr>");
						  }
						  else if (number >= 500 && number <= 531){
							$(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/rain.svg'/>" + "</li></h2><hr>");
						  }
						  else if (number >= 600 && number <= 622){
							$(".text-center").append("<h2><li>" + 
					 dateTime + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/snow.svg'/>" + "</li></h2><hr>");
						  }
						  else if (number >= 701 && number <= 781){
							$(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/mist.svg'/>" + "</li></h2><hr>");
						  }
						  else if (number == 800){
							if(dateTime.includes("00:00:00")){
							  $(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/moon.svg'/>" + "</li></h2><hr>");}
							else if(dateTime.includes("03:00:00")){
							  $(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/moon.svg'/>" + "</li></h2><hr>");}
							else {
							  $(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/sun.svg'/>" + "</li></h2><hr>");
							}
						  }
						  else if (number == 801){
							if(dateTime.includes("00:00:00")){
							  $(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/fewcloudsnight.svg'/>" + "</li></h2><hr>");}
							else if(dateTime.includes("03:00:00")){
							  $(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/fewcloudsnight.svg'/>" + "</li></h2><hr>");}
							else {
							  $(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/fewclouds.svg'/>" + "</li></h2><hr>");
							}
						  }
						  else if (number == 802){
							$(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/scatteredclouds.svg'/>" + "</li></h2><hr>");
						  }
						  else {
							$(".text-center").append("<h2><li>" + 
					 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/brokenclouds.svg'/>" + "</li></h2><hr>");
						  }//fin du else
						  
						}//fin du for
					 
					}//fin de fonction data
				});//fin de requete ajax
			  }// fin de la fonction getfirstweatherforecast

						
});// fin de fonction document ready
		function recupcoord(searchtag)
		{
		var villepaysoriginal = searchtag;
		var villepays = villepaysoriginal.split(' ').join('+');
		var cm = $('#content-meteo');
		$('#content-meteo').contents().remove();
		cm.html('<h1 id="titreville"></h1>');
		$.ajax({
        url: "//api.tel2geo.fr/wthr/api/villepays/"+villepays+"/mod/osm/callback/",
        dataType: "jsonp",
        jsonp:"callback",
        success:function(data)
								{
									// Calcul du nombre de clés comme occurences JSON
									var nboccurences = Object.keys(data).length;
									getmeteo(data[0].lat,data[0].lon);
									//alert(data[1].display_name);
									//for (var i=0; i<nboccurences; i++) {
									//boucle qui permet d'afficher tout les résultats 
										//								} // Fin de la boucle 
								} // fin de la fonction data
						});//fin de requete ajax
				} // fin de fonction recupcoord
				
				
		function getmeteo(latitudeville,longitudeville){
				// formatage de la date au format fr
			   moment.locale('fr');
			   // description des variables du climat
				var wthrdsc = {
								201 : "orages avec pluies",
								202 : "orages et fortes pluies",
								210 : "lègers orages",
								211 : "orages",
								212 : "orages violents",
								221 : "orages irréguliers",
								230 : "orages avec légères bruines",
								231 : "orages et bruines",
								232 : "orages et crachins",
								300 : "bruines de faibles intensités",
								301 : "bruines",
								302 : "fortes bruines",
								310 : "pluies et bruines de faibles intensités",
								311 : "bruines et pluies",
								312 : "pluies et bruines de fortes intensités",
								313 : "averses et bruines",
								314 : "pluies torrentielles et bruines",
								321 : "bruines torrentielles",
								500 : "légères pluies",
								501 : "pluies modérées",
								502 : "fortes pluies",
								503 : "pluies torrentielles",
								504 : "pluies extrèmes",
								511 : "pluies verglaçantes",
								520 : "averses de faibles intensités",
								521 : "averses",
								522 : "averses de fortes intensités",
								531 : "averses irrégulières",
								600 : "neiges légères",
								601 : "neiges",
								602 : "fortes neiges",
								611 : "grésil",
								612 : "averses de grésil",
								615 : "pluies légères et neiges",
								616 : "pluies et neiges",
								620 : "légères chutes de neiges",
								621 : "averse neigeuses",
								622 : "fortes chutes de neiges",
								701 : "brouillard",
								711 : "fumées",
								721 : "brumes",
								731 : "légères tempêtes de sables tourbillonnantes",
								741 : "brouillard",
								751 : "vents sablonneux",
								761 : "vents poussièreux",
								762 : "vents de cendres volcaniques",
								771 : "bourrasques",
								781 : "tornades",
								800 : "ciel clair",
								801 : "quelques nuages",
								802 : "nuages dispersés",
								803 : "nuages brisés",
								804 : "ciel couvert",
								900 : "tornades",
								901 : "tornade tropicale",
								902 : "ouragans",
								903 : "glace",
								904 : "chaleurs intenses",
								905 : "venteux",
								906 : "grêle",
								951 : "calme",
								952 : "légère brises",
								953 : "brises",
								954 : "brises modérées",
								955 : "brises fraîches",
								956 : "fortes brises",
								957 : "vents forts, lègers coups de vents",
								958 : "coups de vents",
								959 : "fortes bourrasques de vent",
								960 : "orages",
								961 : "orages violents",
								962 : "ouragans"
								};
				$.ajax({
				url: "//api.tel2geo.fr/wthr/api/mod/owm/lat/"+latitudeville+"/lon/"+longitudeville+"/callback/",
				dataType: "jsonp",
				jsonp:"callback",
				success:function(data)
										{
								var city = data.city.name;
								$("#titreville").html(city);
								for(var i=0; i<data.list.length; i++){
								  var weatherDescr = data.list[i].weather[0].description;
								  var celciusTemp =((data.list[i].main.temp)-273).toFixed(0);
								  var dateTime = data.list[i].dt_txt;
								  var pic = data.list[i].weather[0].icon;
								  var number = data.list[i].weather[0].id;
								  
								  if (number >= 200 && number <= 232){

									$(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/thunderstorm.svg'/>" + "</li></h2><hr>");
								  }
								  else if (number >= 300 && number <= 321){
									$(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/drizzle.svg'/>" + "</li></h2><hr>");
								  }
								  else if (number >= 500 && number <= 531){
									$(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/rain.svg'/>" + "</li></h2><hr>");
								  }
								  else if (number >= 600 && number <= 622){
									$(".text-center").append("<h2><li>" + 
							 dateTime + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/snow.svg'/>" + "</li></h2><hr>");
								  }
								  else if (number >= 701 && number <= 781){
									$(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/mist.svg'/>" + "</li></h2><hr>");
								  }
								  else if (number == 800){
									if(dateTime.includes("00:00:00")){
									  $(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/moon.svg'/>" + "</li></h2><hr>");}
									else if(dateTime.includes("03:00:00")){
									  $(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/moon.svg'/>" + "</li></h2><hr>");}
									else {
									  $(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/sun.svg'/>" + "</li></h2><hr>");
									}
								  }
								  else if (number == 801){
									if(dateTime.includes("00:00:00")){
									  $(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/fewcloudsnight.svg'/>" + "</li></h2><hr>");}
									else if(dateTime.includes("03:00:00")){
									  $(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/fewcloudsnight.svg'/>" + "</li></h2><hr>");}
									else {
									  $(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/fewclouds.svg'/>" + "</li></h2><hr>");
									}
								  }
								  else if (number == 802){
									$(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/scatteredclouds.svg'/>" + "</li></h2><hr>");
								  }
								  else {
									$(".text-center").append("<h2><li>" + 
							 moment(dateTime).format('LLLL') + "&nbsp;" + celciusTemp + " &#8451;" + "&nbsp;" + wthrdsc[number] + "&nbsp;" + "<img src='img/brokenclouds.svg'/>" + "</li></h2><hr>");
								  }
								  
								}
							 } // fin de fonction data
							 
						});// fin de requete ajax
				scrollTo("#section_addresses");
				}

		function rechargerpage() {
		window.location.reload();
			}
		// on définit la fonction de rechargement de la page
		function pageaccueil() {
		document.location='https://vocal.ctrlfagency.com/';
			}		
		function pageprenoms() {
		document.location='https://vocal.ctrlfagency.com/prenoms';
			}
		function t2g() {
		document.location='https://vocal.ctrlfagency.com/t2g';
			}
		// on définit la fonction de rechargement de la page
		function biorythme() {
		document.location='https://vocal.ctrlfagency.com/biorhythm';
			}
