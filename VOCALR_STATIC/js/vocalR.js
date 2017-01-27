// VocalR - Voice Recognition APP
// Multi-platform 
// License 	: GNU - GPL3
// Author 	: Thibaut Marie Pierre LOMBARD  
// Contact	: contact@ctrlfagency.com
//var VocalR_obj = null;

			function VocalR_recognize(commandesvocales){
					var laphrase = commandesvocales;
					// Ote les espaces inutiles si existants, case-insensitive ...
					var laphrasetrim= laphrase.trim().toLowerCase();
					// Ajuste laphrase en enlevant tout caractère alpha-numériques
					// Grâce à une expression régulière
					var cleanlaphrase = laphrasetrim.replace(/[^a-zA-Z 0-9]+/g,'');	
					// Fabrique la boucle qui va faire corresponde les commandes vocales
					
					
					for(var key in VocalR_obj_functions) {
						
						var val = VocalR_obj_functions[key];

						// Vérifie que nous sommes bien PAS dans
						// la sous-catégorie d'objets
						if (typeof val === "string" ){
								// S'assure qu'il n'y a pas de caractères avant et après le mot recherché
								// Aussi effectue un nettoyage des caractères spéciaux
								var RemplacemotRegExp = val.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
								var motRegExp = new RegExp(RemplacemotRegExp);
								var termearechercher = motRegExp.test(cleanlaphrase);
								
								if(termearechercher){
									// Pour debug décommentez la ligne suivante
									// alert("Key VocalR_obj_functions: "+key+" value:"+val);
									// Transforme la fonction à exécuter en chaîne de caractère
									var fonction_a_executer = key.toString(); 
									console.log(val + " est contenu dans la phrase : " + cleanlaphrase +", on exécute la fonction : "+fonction_a_executer);
									// Retrouve l'objet fontion dans la page
									var trouve_fonction = window[fonction_a_executer];
									// Dernière vérification si c'est un objet ou une fonction
									// Execute la fonction
									if (typeof trouve_fonction === "function") {trouve_fonction();};
													} else { console.log(" Pas de termes simples trouvés dans cet essai!");}
							
										} // Fin de la vérification que nous ne sommes PAS dans
										  // la sous-catégorie de l'objet
						} // Fin de la boucle for
					// A présent nous recherchons dans les objets héritants		
					for(var key in VocalR_obj_functions.VocalR_obj_functions_S) {
						var valeur = VocalR_obj_functions.VocalR_obj_functions_S[key];
						var valtst = key.toString();
						var val_S = VocalR_obj_functions.VocalR_obj_functions_S[valtst];
						// Pour le débug décommentez la ligne suivante
						// alert("Key VocalR_obj_functions.VocalR_obj_functions_S: "+key+" value:"+VocalR_obj_functions.VocalR_obj_functions_S[valtst]);
								var RemplacemotRegExp_S = val_S.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
								var motRegExp_S = new RegExp(RemplacemotRegExp);
								var segmentemotcle = cleanlaphrase.split(val_S);
								var termearechercher_S = motRegExp.test(cleanlaphrase);
								// Vérifie si il existe une valeur après le mot recherché
								if(typeof segmentemotcle[1] !== 'undefined' && segmentemotcle[1] !== ''){
									// Ôte la ponctuation du mot clé segmenté
									//alert(segmentemotcle[1]);		

									var searchtag = segmentemotcle[1].replace(/['";:,.\/?\\-]/g, ''); 
									var fonction_a_executer = key.toString(); 
									console.log(val_S + " est dans la phrase : " + cleanlaphrase +", on exécute la fonction : "+fonction_a_executer+", searchtag="+searchtag);
									// Retrouve l'objet fontion dans la page
									var trouve_fonction = window[fonction_a_executer];
									// Dernière vérification si c'est un objet ou une fonction
									// Execute la fonction
									if (typeof trouve_fonction === "function") trouve_fonction(searchtag);
											} else { console.log("Pas de terme avec searchtag trouvés dans cet essai!");}
									// Fin de la vérification 
									// Que les termes VocalR_obj_functions_S correspondent
									// Que le / les termes suivants sont existants et définis
							
						} // Fin de boucle for
					
			}
							
			function recognize(VocalR_obj_functions)
			{
				// Interface de reconnaissance Vocale multiplateformes
				window.speechRecognition = window.speechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.webkitSpeechRecognition;
				if(window.speechRecognition == undefined)
				{
					$('#unsupported').fadeIn('fast');
					console.log("Api de reconnaissance vocale non-supporté.");
				}
				else
				{
					// Créé l'objet de reconnaissance vocale
					VocalR_obj = new speechRecognition();
					// Configure l'enregistrement continu de VocalR_obj, configurer à false pour l'utiliser une seule fois.
					// L'option continuous n'est pas implémenté à Gecko à ce jour, désactiver là si vous utilisez firefox..
					VocalR_obj.continuous = true;
					// Configure le langage (format : BCP 47 -> http://www.rfc-editor.org/bcp/bcp47.txt).
					VocalR_obj.lang = "fr-FR";
					// Configuré à true, après que le callback onresult soit renvoyé par l'utilisateur. 
					// Où à la fin d'une phrase
					VocalR_obj.interimResults = false;
					// Nombre d'essais de reconnaissance
					VocalR_obj.maxAlternatives = 1;
					// 
					VocalR_obj.onstart = function(){
						console.log("API de Reconnaissance vocale démarré...");
					}

					VocalR_obj.onresult = function(event){	
						//event.resultIndex renvoi un index des premiers mots parlés.
						//event.results.length le total des mots parlés dans la tentative de reconnaissance vocale.
						//event.results contient est l'objet de l'array contenant les mots.
						VocalR = event.results[event.resultIndex];
						var resultatsVocalR = []
						for(var j = 0; j < VocalR.length; j++)
						{
							resultatsVocalR[j] = VocalR[j].transcript;
						}
						var commandesvocales;
						// Tente les 5 alternatives de reconnaissance vocales
						for (var z = 0; z<resultatsVocalR.length; z++) 
						{
						  // Utilise trim() pour ôter les espaces inutiles.
						  commandesvocales = resultatsVocalR[z].trim();
						  console.log('Reconnaissance Vocale: '+commandesvocales);
						}
						VocalR_recognize(commandesvocales);

					}

					// S'arrête dès lors que la reconnaissance vocale est arrêtée manuellement avec VocalR_obj.stop()
					// ou lorsque l'utilisateur s'arrête de parler.
					VocalR_obj.onend = function(){
						// Pour désactiver l'écoute continuous décommentez la ligne suivante
						//VocalR_obj = null;
						console.log("API de reconnaisance vocale arrêté...");
						VocalR_obj.start();
					}

					VocalR_obj.start();
				}
			}

			function stop()
			{
				if(VocalR_obj != null)
				{
					// Stop (aggressivement) en supprimant l'objet
					VocalR_obj.onend = function(){ delete VocalR_obj;};
					VocalR_obj.stop();
					console.log("Reconnaissance Vocale arrêtée par l'utilisateur.");
				}
			}

