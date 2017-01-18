	var heightt = (Number(screen.height));
	var widthh = (Number(screen.width));
	var mapcontainer = 	$('#mapid');
	mapcontainer.html('<div id="map" style="height: '+heightt+'px; width: '+widthh+'px;"></div>');
	var center_lat = 34.0132500;
	var center_lng = -6.8325500;
	var init_zoom = 7;
	var osm_map_url = 'http://dev.tile.openstreetmap.ma/osm/{z}/{x}/{y}.png';
	var map = new L.Map('map', {center: new L.LatLng(center_lat, center_lng), zoom: init_zoom });
	var osm = new L.TileLayer(osm_map_url, {
				attribution: '&copy; openstreetmap.ma',
				maxZoom: 19
			});
	var layers = new L.Control.Layers({'OSM Maroc':osm});
	map.addLayer(osm);
	
	
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
								mapcontainer.html('<div id="map" style="height: '+heightt+'px; width: '+widthh+'px;"></div>');

								// vérifie si la limite est configurée
									var checklimit = addr.split("محدد");

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
											url : "https://api.tel2geo.fr/simpleban/ma/addr/"+addr+"/limit/"+limit+"/callback/",
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

												var osm_map_url = 'http://dev.tile.openstreetmap.ma/osm/{z}/{x}/{y}.png';
												var map = new L.map('map').setView([separationpremierecoordonnees[0],separationpremierecoordonnees[1]], 12);
												var osm = new L.TileLayer(osm_map_url, {
													attribution: '&copy; openstreetmap.ma',
													maxZoom: 19
												});
												var layers = new L.Control.Layers({'OSM Maroc':osm});
												map.addLayer(osm);
												// la variable tableau.length permet le calcul du nombre des occurences qui apparaissent dans le tableau
												for (var i=0; i<tableau.length; i++) {
													var latlon = data.coordonnees[i].split(",");
													//alert(latlon[0]);
													//on charge la liste des markers
													new L.marker([latlon[0],latlon[1]])
													.bindPopup(data.addresses[i])
													.addTo(map);
												}
											}
											});
								}
