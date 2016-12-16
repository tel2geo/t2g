// Copyright 2016 
// Author : Thibaut Marie Pierre LOMBARD
// License : GNU-GPL3
// Contact : contact@ctrlfagency.com
			function showPrenom(searchtag)
			{
				$('.voyant').show();
				$('.voyant').contents().remove();
				$(".voice_instructions_after").slideDown("slow");
				var prenom = searchtag;
				var element =  document.getElementById('voyant');
					$.ajax({
		    			url : "//www.thibautlombard.space/prenoms/index.php?prenom="+prenom+"&callback=?",
						    	dataType:"jsonp",
				  			jsonp:"callback",
				 			success:function(data)
				   			{
								element.innerHTML = '<b>pr&eacute;nom :</b> ' + data.prenom + '<br><b>Etymologie :</b> ' + data.etymologie  + '<br><b>Genre :</b> ' + data.genre + '<br><b>F&ecirc;te :</b> ' + data.fete +  '<br><b>origine: </b>' + data.origine + '<br><b>Qui est il / elle ? </b><br>' + data.quiestil + '<br><b>Qu&apos;aime-t-il /elle ? </b><br>' + data.quaimetil + '<br><b>Que fait il / elle ? </b><br>' + data.quefaitil + '<br>';

							}
						});
			scrollTo("#section_voyant");
			}

		// on définit la fonction de rechargement de la page
		function rechargerpage() {
		window.location.reload();
			}
		// on définit la fonction de rechargement de la page
		function pageaccueil() {
		document.location='https://vocal.ctrlfagency.com/';
			}		
			
		function meteo() {
		document.location='https://vocal.ctrlfagency.com/meteo';
			}
		function t2g() {
		document.location='https://vocal.ctrlfagency.com/t2g';
			}
		// on définit la fonction de rechargement de la page
		function biorythme() {
		document.location='https://vocal.ctrlfagency.com/biorhythm';
			}
