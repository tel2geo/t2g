	// on fabrique la div map contenu dans la div mapid
	var heightt = (Number(screen.height));
	var widthh = (Number(screen.width));
	var mapcontainer = 	$('#mapid');
	mapcontainer.html('<div id="map" style="height: '+heightt+'px; width: '+widthh+'px;"></div>');

				// début de la fonction de récupération de l'addresse Ip
				$.ajax({
							//url : "https://api.tel2geo.fr/simpleban/?addr="+addr+"&limit=10c&callback=?",
							url : "https://www.thibautlombard.space/geo/ip.php?callback=?",
							dataType:"jsonp",
							jsonp:"callback",
							success:function(data)
							{
							var	ip = data.ip;
							showmapIP(ip);
							}
						});
				// fin de la fonction de récupération de l'addresse IP
				function showmapIP(ip)
						{
									$.ajax({
											//url : "https://api.tel2geo.fr/simpleban/?addr="+addr+"&limit=10c&callback=?",
											url : "https://www.thibautlombard.space/geo/?ip="+ip+"&mycallback=?",
											dataType:"jsonp",
											jsonp:"callback",
											success:function(data)
											{
											// debug , cadre la carte de manière imprècise avec geoIP récupère la latitude et la longitude
											//alert('latitude ' + data.latitude + 'longitude ' + data.longitude );
											latsetview = data.latitude;
											lonsetview = data.longitude;

												var mymap = L.map('map').setView([latsetview,lonsetview], 6);
												L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3RybGZhZ2VuY3kiLCJhIjoiY2l0aDR1YTdrMDAwYTNvcGRqOTNqZGU1byJ9.KPVm47TmLVJfAvQAUVpNRQ', {
													attribution: 'VOCALR &copy; TEL2GEO',
													maxZoom: 18,
													id: 'mapbox.streets',
													accessToken: 'pk.eyJ1IjoiY3RybGZhZ2VuY3kiLCJhIjoiY2l0aDR1YTdrMDAwYTNvcGRqOTNqZGU1byJ9.KPVm47TmLVJfAvQAUVpNRQ'
												}).addTo(mymap);

												//-1.539359 longitude : 47.208808
												//L.marker([latsetview,lonsetview]).addTo(mymap)
												//.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
												//var popup = L.popup();

											}// fin de la requete ajax showmapIP
										});

							}
			function isInt(value) {
					return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
					}
			function geolocalise(searchtag)
								{
								var mapcontainer = 	$('#mapid');
								//var element = document.getElementById('addresses');
								var addr = searchtag;
								var limit = 10;
								$('#mapid').contents().remove();
								$('#addresses').contents().remove();
								mapcontainer.html('<div id="map" style="height: '+heightt+'px; width: '+widthh+'px;"></div>');

								// vérifie si la limite est configurée
									var checklimit = addr.split("limite");

									if (typeof checklimit[1] !== 'undefined' && checklimit[1] !== '') {
									//supprime les espaces blancs
									var wws =  checklimit[1].replace(/\s/g, "");

									 if(isInt(wws) && wws<300 && typeof wws !== "undefined" && wws !== null ){
										var limit = wws;
										var addr = checklimit[0];

												} else {
	   									var limit=10;
												}
										}//fin du double if
								$.ajax({
								//url : "https://api.tel2geo.fr/simpleban/?addr="+addr+"&limit=10c&callback=?",

											//url : "https://api.tel2geo.fr/simpleban/api/addr/"+addr+"/limit/10c&callback=?",
											url : "https://api.tel2geo.fr/simpleban/api/addr/"+addr+"/limit/"+limit+"/callback/",
											dataType:"jsonp",
											jsonp:"callback",
											success:function(data)
											{

												// debut de nouvelle map
												// Sépare les variables à séparer
												//créé une variable tableau à partir du tableau JSON récupéré
												var tableau = data.addresses;
												var premierecoordonnees = data.coordonnees.toString();
												var separationpremierecoordonnees = premierecoordonnees.split(",");
												var premieraddr = tableau.toString().split(",");

												var mymap = new L.map('map').setView([separationpremierecoordonnees[1],separationpremierecoordonnees[0]], 12);
												new L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3RybGZhZ2VuY3kiLCJhIjoiY2l0aDR1YTdrMDAwYTNvcGRqOTNqZGU1byJ9.KPVm47TmLVJfAvQAUVpNRQ', {
												attribution: 'VOCALR &copy; TEL2GEO',
												maxZoom: 18,
												id: 'mapbox.streets',
												accessToken: 'pk.eyJ1IjoiY3RybGZhZ2VuY3kiLCJhIjoiY2l0aDR1YTdrMDAwYTNvcGRqOTNqZGU1byJ9.KPVm47TmLVJfAvQAUVpNRQ'
												}).addTo(mymap);

												// la variable tableau.length permet le calcul du nombre des occurences qui apparaissent dans le tableau
												for (var i=0; i<tableau.length; i++) {
													var latlon = data.coordonnees[i].split(",");
													//on charge la liste des markers
													new L.marker([latlon[1],latlon[0]])
													.bindPopup(data.addresses[i])
													.addTo(mymap);
													//var donnees = '<p><b>adresses:</b> ' + data.addresses[i] + '&nbsp;<b>latitude:</b> ' + latlon[0] + ' <b>longitude : </b>' + latlon[1] +' &nbsp;&nbsp;<br></p>' ;
													//element.innerHTML += donnees;
													}

											}
										});
								}
