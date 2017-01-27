
	// La fonction suivante permet de changer le format d'affichages 
	// des nombres à 2 digits (chiffres), exemple: 1 devient 01
	// Plus communément on appelle ceci du padding
	function pad2(number) {
	   return (number < 10 ? '0' : '') + number
	 }
	 
	 function biorhythm(searchtag)
					{
					// Si la commande vocale fonctionne on nettoie le résultat précédent 
					// Et/ou on affiche le contenu qui était caché (hidden)
					$('.bio').show();
					$('.bio').contents().remove();
					$(".voice_instructions_after").slideDown("slow");
					// définit la variable lebiorythme et parse les mois en chiffres.. 
					var lebiorythme =  document.getElementById('bio');
					var datedenaissance = searchtag;
					var resultatdecouper = datedenaissance.split(' ',3);
					var mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
					var moismoins1 = mois.indexOf(resultatdecouper[1])+1;
					// Pour le déboggage n'hésitez pas à décommenter la ligne suivante
					// alert(moisbonformat);
					// Cette ligne suivante affige l'image en utilisant l'API Biorhythm.php
					lebiorythme.innerHTML ='<img class=\"displayed\" src=\"https://www.thibautlombard.space/bio/biorhythm.php?birthdate=' + pad2(moismoins1) + '%2F' + pad2(resultatdecouper[0]) + '%2F' + resultatdecouper[2] + '\" />';
					// On descend à la section_bio en sélectionnant l'id : section_bio					
					scrollTo("#section_bio");
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
		function pageprenoms() {
		document.location='https://vocal.ctrlfagency.com/prenoms';
			}
