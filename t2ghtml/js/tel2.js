// Copyright 2014 - 2017
// Thibaut LOMBARD
// contact : webmaster@tel2geo.fr 

$(function() {
      $("#button-id").prop("disabled", true); // désactive le bouton d'envoi
      $("input.phone_number").validnum("format_phone_number") // configure la validation
                             .on( 'keyup change blur', function (event) { // configure l'enregistreur d'évènements
                               if ( $(this).validnum('validate_phone_number') )
                                 $("#button-id").prop("disabled", false); // active le bouton d'envoi
                               else
                                 $("#button-id").prop("disabled", true); // désactive le bouton d'envoi si la validation n'est pas effectuée
                             });
				});

   // 	Extrait de  wikipedia
   //   Numéros géographiques
   //     01 : Région île-de-France ;
   //     02 : Région Nord-ouest, Réunion et Mayotte ;
   //     03 : Région Nord-est ;
   //     04 : Région Sud-est ;
   //     05 : Région Sud-ouest, et DOM-COM de l'océan Atlantique.

   //	Numéros non géographiques
   //   06 et 07 : mobiles
   //   08 : Services à  valeur ajoutée : numéros à  tarification spéciale (depuis 0 800, numéro vert gratuit, jusqu'au 0 899 à  1,349 euros par appel + 0,337 euros par minute, les préFixes devenant progressivement plus coà»teux[11] ;
   //  	09 : Services téléphoniques (numéros non géographiques)
   //  	International
   //   00 : Préfixe pour appeler l'international (préfixe commun à  la plupart des pays, notamment en Europe).
   
function checknumerosimple(val)
{
$('#infodebase').contents().remove();
$('#checknum').contents().remove();
$('#checkfai').contents().remove();
$('#checkfaifull').contents().remove();
$('#checkzne').contents().remove();
$('#checkgeo').contents().remove();
$.ajax({
    		url : "https://api.tel2geo.fr/t2g/api/numero/"+val+"/mode/majnum/callback/",
		    dataType:"jsonp",
		    jsonp:"callback",
		    success:function(data)
		    {
		var codeoperateur = data.mnemo;
		checknum.innerHTML = '<b>ID Numero :</b> ' + data.idmajnum + '<br><b>EZABPQM :</b> ' + data.ezabpqm  + '<br><b>Tranche Début  :</b> ' + data.tranche_debut + '<br><b>Tranche Fin  :</b> ' + data.tranche_fin + '<br><b>Opérateur(abréviation)  :</b> ' + data.mnemo + '<br><b>Territoire :</b> ' + data.territoire + '<br><b>Date d\'attribution  :</b> ' + data.date_attribution;
		checkoperateur(codeoperateur);checkoperateurfull(codeoperateur);
		    }
		});
}
function checkoperateur(codeoperateur)
{

$.ajax({
    		url : "https://api.tel2geo.fr/t2g/api/codeoperateur/"+codeoperateur+"/mode/operateur/callback/",
		    dataType:"jsonp",
		    jsonp:"callback",
		    success:function(data)
		    {
		checkfai.innerHTML = '<b>ID Code Opérateur :</b> ' + data.idcodeoperateur + '<br><b>Code Opérateur:</b> ' + data.codeoperateur  + '<br><b>Société :</b> ' + data.societe + '<br><b>Site Web :</b> ' + data.siteweb + '<br>';

		    }
		});
}
function checkoperateurfull(codeoperateur)
{
$.ajax({
    		url : "https://api.tel2geo.fr/t2g/api/codeoperateur/"+codeoperateur+"/mode/operateurfull/callback/",
		    dataType:"jsonp",
		    jsonp:"callback",
		    success:function(data)
		    {

		checkfaifull.innerHTML = '<b>ID Opérateur :</b> ' + data.idoperateur + '<br><b>Code Opérateur:</b> ' + data.codeoperateur  + '<br><b>Identité Opérateur :</b> ' + data.identiteoperateur + '<br><b>Siret Acteur :</b> ' + data.siretacteur + '<br><b>Registre des Commerces et Sociétés :</b> ' + data.rcsacteur + '<br><b>Addresse Complète acteur :</b> ' + data.addresse_complete_acteur + '<br><b>Besoin en réseau numérique :</b> ' + data.besoin_res_num ;
		    }
		});
}

function checknumerofixe(val)
{

$.ajax({
    		url : "https://api.tel2geo.fr/t2g/api/numero/"+val+"/mode/majnum/callback/",
		    dataType:"jsonp",
		    jsonp:"callback",
		    success:function(data)
		    {
		var codeoperateur = data.mnemo;

		checknum.innerHTML = '<b>ID Numero :</b> ' + data.idmajnum + '<br><b>EZABPQM :</b> ' + data.ezabpqm  + '<br><b>Tranche Début  :</b> ' + data.tranche_debut + '<br><b>Tranche Fin  :</b> ' + data.tranche_fin + '<br><b>Opérateur(abréviation)  :</b> ' + data.mnemo + '<br><b>Territoire :</b> ' + data.territoire + '<br><b>Date d\'attribution  :</b> ' + data.date_attribution;
		checkoperateur(codeoperateur);checkoperateurfull(codeoperateur);
		    }
		});
}

function checkzone(ezabpq)
{
$.ajax({
    		url : "https://api.tel2geo.fr/t2g/api/zabpq/"+ezabpq+"/mode/zabpqzne/callback/",
		    dataType:"jsonp",
		    jsonp:"callback",
		    success:function(data)
		    {
		zone = data.zne; 
		checkzne.innerHTML = '<b>ID zabpq :</b> ' + data.idzabpq + '<br><b>ZABPQ :</b> ' + data.zabpq  + '<br><b>ZNE :</b> ' + data.zne;
		checkgeol(zone);
		    }
		});
}

function checkgeol(zone)
{

$.ajax({
    		url : "https://api.tel2geo.fr/t2g/api/codeinsee/"+zone+"/mode/codepostaux/callback/",
		    dataType:"jsonp",
		    jsonp:"callback",
		    success:function(data)
		    {

		checkgeo.innerHTML = '<b>id code postal :</b> ' + data.idcodepostaux + '<br><b>Code INSEE :</b> ' + data.ccinsee  + '<br><b>Commune :</b> ' + data.commune + '<br><b>Code Postal :</b> ' + data.codepostal +  '<br><b>Libellé d\'acheminement: </b>' + data.libelleacheminement + '<br><b>Latitude: </b>' + data.lat + '<br><b>Longitude: </b>' + data.lon + '<br><b>Ville, Département, Région, zone, Pays: </b>' + data.display_name + '<br><img src=\"https://maps.googleapis.com/maps/api/staticmap?center=' + data.lat + ',' + data.lon + '&zoom=13&size=600x400&key=AIzaSyAQ1717RTjeHSTWJVchziflDGpoLpA-Uik\" />';



		    }
		});
}

function processnumero(val){
var datat2g = $('#results');
$('#results').contents().remove();
datat2g.html('<p id="infodebase"></p><p id="checknum"></p><p id="checkfai"></p><p id="checkfaifull"></p><p id="checkzne"></p><p id="checkgeo"></p>');
var prefixe = val.split(/[()]/).filter(function (i) {return i.length > 0});
var indicatif = prefixe[0];
var numerofull=val.replace(/[\])}[{(]/g,'');
var ezabpq = numerofull.substring(1, 6);
var infodebase = document.getElementById('infodebase');
var checknum = document.getElementById('checknum');
var checkfai = document.getElementById('checkfai');
var checkfaifull = document.getElementById('checkfaifull');
var checkzne = document.getElementById('checkzne');
var checkgeo = document.getElementById('checkgeo');


//lignetype(indicatif);
//checknumerosimple(numerofull);
if (indicatif == '01') {
ligne = "Fixe";
regiondef = "Région île-de-France";
infodebase.innerHTML = '<b>Ligne :</b> ' + ligne + '<br><b>Indicateur région :</b> ' + regiondef + '<br>';
checknumerofixe(numerofull);checkzone(ezabpq);
 }
if (indicatif == '02') {
ligne = "Fixe";
regiondef = "Région Nord-ouest, Réunion et Mayotte";
infodebase.innerHTML = '<b>Ligne :</b> ' + ligne + '<br><b>Indicateur région :</b> ' + regiondef + '<br>';
checknumerofixe(numerofull);checkzone(ezabpq);
}
if (indicatif == '03') {
ligne = "Fixe";
regiondef = "Région Nord-Est";
infodebase.innerHTML = '<b>Ligne :</b> ' + ligne + '<br><b>Indicateur région :</b> ' + regiondef + '<br>';
checknumerofixe(numerofull);checkzone(ezabpq);
}
if (indicatif == '04') {
ligne = "Fixe";
regiondef = "Région Sud-Est";
infodebase.innerHTML = '<b>Ligne :</b> ' + ligne + '<br><b>Indicateur région :</b> ' + regiondef + '<br>';
checknumerofixe(numerofull);checkzone(ezabpq);
}
if (indicatif == '05') {
ligne = "Fixe";
regiondef = "Région Sud-ouest, et DOM-COM de l\'océan Atlantique";
infodebase.innerHTML = '<b>Ligne :</b> ' + ligne + '<br><b>Indicateur région :</b> ' + regiondef + '<br>';
checknumerofixe(numerofull);checkzone(ezabpq);
}
if (indicatif == '06') {
ligne = "Mobile";
infodebase.innerHTML = '<b>Ligne :</b> ' + ligne + '<br>';
checknumerosimple(numerofull);
}
if (indicatif == '07') {
ligne = "Mobile";
infodebase.innerHTML = '<b>Ligne :</b> ' + ligne + '<br>';
checknumerosimple(numerofull);
}
if (indicatif == '08') {
ligne = "Services à  valeur ajoutée : numéros à  tarification spéciale";
infodebase.innerHTML = '<b>Ligne :</b> ' + ligne + '<br>';
checknumerosimple(numerofull);
}
if (indicatif == '09') {
ligne = "VOIP";
infodebase.innerHTML = '<b>Ligne :</b> ' + ligne + '<br>';
checknumerosimple(numerofull);
}
if (indicatif == '00') {
ligne = "Appels internationaux";
infodebase.innerHTML = '<b>Ligne :</b> ' + ligne + '<br>';
checknumerosimple(numerofull);
} 
if(indicatif >= '10') {
ligne = "Inconnu";
infodebase.innerHTML = '<b>Ligne :</b> ' + ligne + '<br>';

	}

}
//fin de fonction processnumero

