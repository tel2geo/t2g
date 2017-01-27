// Copyright 2016 
// Author : Thibaut Marie Pierre LOMBARD
// License : GNU-GPL3
// Contact : contact@ctrlfagency.com
		function hello() {
			$(".hello").slideDown("slow");
			$(".voice_instructions_after").slideDown("slow");
			scrollTo("#section_hello");
			};
			
		function rechargerpage() {
		window.location.reload();
			}
		// on définit la fonction de rechargement de la page
		function meteo() {
		document.location='https://vocal.ctrlfagency.com/meteo';
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
		
		function bonjour(searchtag){
					dit_qui = searchtag.split(" ");
					alert('bonjour '+dit_qui[0]);
			};
