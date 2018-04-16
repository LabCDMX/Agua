//colores

var magentaclaro = "#A87D8E"
var magenta = "#FF149B"
var magentaobscuro = "#CC007B"
var negro = "#1D1D1B"
var grisHead = "#F7F7F7"
var negroFoot = "#333333"
var grisBody = "#EFEFEF"
var blancoFace = "#FAFAFA"
var blancoMenu = "#FFFFFF"
var grisText = "#DBDBDB"
var grisLink = "#808080"

var coordenada_x = 0;
var coordenada_y = 0;
var bordeW=  -99.3649242002;
var bordeS= 19.0482366605;
var bordeE=  -98.9403028204;
var bordeN=  19.5927572802;
var r_earth= 6335.439;
var factX=-700;
var factY=1600;
var minlonINEGI= 2776218;
var minlatINEGI= 786788.9;
var mzaCDMX="";
var	visibleEast = 0;
var	visibleWest = 0;
var	visibleNorth = 0;
var	visibleSouth = 0;
var contained = [];
var disponibilidad = ["verde","amarillo","naranja","rojo"];
var disponibilidadDesc = ["Suministro garantizado","Abasto suficiente","Desabasto frecuente","Escacez permanente"];
var demandaDesc = ["Hasta de 300 viviendas","De 301 hasta 707 viviendas","De 708 hasta 1559 viviendas","Más de 1559 viviendas"];
var demandaDesc = ["Densidad habitacional escasa","Densidad habitacional baja","Densidad habitacional media","Densidad habitacional alta"];
var delelgaciones =["ÁLVARO OBREGÓN","AZCAPOTZALCO","BENITO JUÁREZ","COYOACÁN","CUAJIMALPA DE MORELOS","CUAUHTÉMOC","GUSTAVO A MADERO","IZTACALCO","IZTAPALAPA","MAGDALENA CONTRERAS","MIGUEL HIDALGO","MILPA ALTA","TLÁHUAC","TLALPAN","VENUSTIANO CARRANZA","XOCHIMILCO"]
var abrev =["A.OBREGON","AZCAPOTZALCO","B.JUAREZ","COYOACAN","CUAJIMALPA","CUAUHTEMOC","G.A.MADERO","IZTACALCO","IZTAPALAPA","M.CONTRERAS","M.HGO","M.ALTA","TLAHUAC","TLALPAN","V.CARRANZA","XOCHIMILCO"]
var trCP_del=["010","002","014","003","004","015","005","006","007","008","016","009","011","012","017","013"];
var disponibilidadMPO =["yellow","yellow","yellow","yellow","red","yellow","yellow","orange","orange","red","yellow","red","red","orange","orange","orange"];
var actMPO="";
var actCOL="";
var actFAC="";
var actTONO="";
var actCP="";
var consumooptimo = 130;
var tarifaSinMedidorActiva= 102.72;
var incompleto=false; 
var cssAtr=["","","","","","","",""];

var tarifaBase = [  [1,0,15000,472.55,0.913047,0.901435,0.673894,0.608698],
					[2,15000,20000,472.55,0.913047,0.901435,0.673894,0.608698],
					[3,20000,30000,630.06,0.906533,0.863044,0.59784,0.541391],
					[4,30000,40000,945.07,0.878009,0.795554,0.501877,0.44808],
					[5,40000,50000,1260.11,0.817127,0.726381,0.422205,0.366939],
					[6,50000,70000,1575.13,0.747027,0.646083,0.361712,0.306309],
					[7,70000,90000,2342.15,0.61616,0.53222,0.30887,0.263584],
					[8,90000,120000,3177.67,0.517412,0.448148,0.23198,0.198601],
					[9,120000,1200000000,4841.8,0.343726,0.298268,0.156397,0.134491]];

var vectorMinimos= [0,
					Math.round(tarifaBase[0][3]*(1-tarifaBase[0][7]),0),
					Math.round(tarifaBase[0][3]*(1-tarifaBase[0][6]),0),
					Math.round(tarifaBase[0][3]*(1-tarifaBase[0][5]),0),
					Math.round(tarifaBase[0][3]*(1-tarifaBase[0][4]),0)]

var tarifaAdic = [ [1,0,15000,0,0,0,0,0],
					[2,15000,20000,31.51,0.886982,0.747855,0.369638,0.339426],
					[3,20000,30000,31.51,0.820962,0.660574,0.309959,0.26147],
					[4,30000,40000,31.51,0.634465,0.518836,0.183141,0.123461],
					[5,40000,50000,31.51,0.466617,0.324879,0.119731,0.063782],
					[6,50000,70000,38.34,0.347426,0.298407,0.200368,0.175858],
					[7,70000,90000,41.77,0.240506,0.212377,0.016315,0.016315],
					[8,90000,120000,55.47,0.012074,0.012074,0.012074,0.012074],
					[9,120000,,86.29,0,0,0,0]];


var tarifaSinMedidor = [0,706,412,163,103]



function avisaloaded(parametro){
	console.log(parametro + " cargado...")
}        

function H20toMNT (litros,tipomza){
	var colBase=4;
	var imptBase = 0;
	var imptAdic = 0;
	var subsBase =0;
	var subsAdic =0;
	var metros3Adic=0;

	switch(tipomza) {
    case "Alto" : 
        colBase=7;
        break;
    case "Medio":
        colBase=6;
        break;
    case "Bajo" :
		colBase=5;
        break;
    default:  //popular
        colBase=4;
	};
	console.log (colBase);
	for (var ii= 0; ii < 9; ii++){
		if (litros > tarifaBase[ii][1] & litros <= tarifaBase[ii][2] ) {
			imptBase   = math.round(tarifaBase[ii][3] * (1 - tarifaBase[ii][colBase]),2);
			//console.log (colBase + "  " + tarifaBase[ii][3] + "  " + tarifaBase[ii][colBase]);
			subsBase   = math.round(tarifaBase[ii][3] * tarifaBase[ii][colBase],2);
			metros3Adic= math.floor((litros - tarifaBase[ii][1])/1000 );
			imptAdic   = math.round(tarifaAdic[ii][3] * metros3Adic * (1 - tarifaAdic[ii][colBase]),2);
			subsAdic   = math.round(tarifaAdic[ii][3] * metros3Adic *  tarifaAdic[ii][colBase],2);
		};
	};
		var vectorImpt = [imptBase,subsBase,metros3Adic,imptAdic,subsAdic, imptBase + imptAdic ];
		return vectorImpt;

};



function MNTtpH20 (pesos,tipomza){
	var colBase=4;
	var metros3Adic =0;
	var imptAdic = 0;
	var subsBase =0;
	var subsAdic =0;
	var imptXlitroAdic=0;
	var litrosBase = 0;

	switch(tipomza) {
    case "Alto" : 
        colBase=7;
        break;
    case "Medio":
        colBase=6;
        break;
    case "Bajo" :
		colBase=5;
        break;
    default:  //popular
        colBase=4;
	};

	for (var ii =0; ii < 9; ii++){
		// limite inferior y superior en pesos para el tipo de manzana
		var linf = math.round(tarifaBase[ii][3] * (1 - tarifaBase[ii][colBase]),2);
		var lsup = H20toMNT(tarifaBase[ii][2],tipomza)[5];	 
		if ( pesos > linf & pesos <= lsup ){
			console.log(linf + "     " + lsup)
			litrosBase  = math.round(tarifaBase[ii][1],2); 
			imptXlitroAdic= math.round(tarifaAdic[ii][3]  * (1 - tarifaAdic[ii][colBase]),2);
			metros3Adic = math.floor((pesos - linf) / imptXlitroAdic);
		};
	};
	var vectorLitros =[litrosBase,metros3Adic*1000,imptXlitroAdic,litrosBase+metros3Adic*1000 ];
	return vectorLitros;

};



var colheadTarid =["Rango","lsinf","ltsup","addicxMetroCUb","factor_popular","factor_bajo","factor_medio","factor_alto"];





function new_latitude  (latitude,dy){
	return latitude  + (dy / r_earth) * (180 / math.pi);
};
function new_longitude (longitude,latitude,dx){
	return longitude + (dx / r_earth) * (180 / math.pi) / math.cos(latitude * math.pi/180);
}

function Ddisp(clavebuscada){
	
	var coloracion = ["#27A408","#F9E52F","#E65407","#CB0803"];

	var textoOut= "";
	for (var ii=0;ii < 4;ii++){
		if (disponibilidad[ii]==clavebuscada){
			textoOut= disponibilidadDesc[ii]
		}
	}
	return textoOut;
}


function myFunction() {
    var texto = $('#ensayo').val();
    var texto2 = texto.replace(/[^0-9]+/g, "");
    coordenada_x= texto2.substring(0,2) + texto2.substring(4,7);
    coordenada_y= texto2.substring(2,4) + texto2.substring(7,10); 
    // var texto = $('#ensayo').text
      $('#txtensayo').text(texto2);
};


function verLitros() {
	var valor= $("#inputLitros").val();
	console.log(valor)
	var texto = "";
	
    if(valor < 60){
    	texto="Consumo bajo";
    }  
	if (valor>=60 & valor<120){
		texto="Consumo adecuado";
	}
    if (valor>=120 & valor<180 ){
    	texto="Consumo alto";
    }
    if (valor>=180){
    	texto="Consumo excesivo";
    }
	$("#evaLitros").text(texto);

};

function verTarifado(){
	$("#evaTarifado").empty();
	var valor= $("#inputPago").val();
	console.log(valor)
	var texto = "<p>Litros a los que corresponde este pago de acuerdo al <b>Tipo de Consumo</b>:<br>" +
	"Manzana Alta: " + MNTtpH20(valor,"Alto")[3] + "<br>" +
	"Manzana Media: " + MNTtpH20(valor,"Medio")[3] + "<br>" +
	"Manzana Baja: " + MNTtpH20(valor,"Bajo")[3] + "<br>" +
	"Manzana Popular: " + MNTtpH20(valor,"Popular")[3] + "</p>"
	$("#evaTarifado").append(texto)

}


function goCodigoPostal(){
	$('#dispo').empty();
var texto = $('#inputCodPos').val();
	var texto2 = texto.replace(/[^0-9]+/g, "");
	var salida = "nada";

	if (texto2.length != 5){
		alert("Se requieren 5 dígitos para el código postal");
	}
	if (texto2.length == 5){
		vistaCodPos(texto2)
	}
}; 


function goColonia(){
	$('#dispo').empty();
	var texto = $('#inputColonia').val();
	var salida = "nada";
	vistaColonia(texto)
}; 





function goDelegacion(){
	$('#dispo').empty();
	var texto = $('#inputDelegacion').val();
	var clave = trCP_del[delelgaciones.indexOf(texto)];

	var salida = "nada";
	console.log(texto + " : " + clave);
	

	if (trCP_del.indexOf(clave) !=(-1) &  clave != "TODOS"){
		$("#imginfo").attr('src','img/A'+clave+'.png');
		JavaScript.load('data/mzaCDMX'+ clave +'.geojson.js',function() {console.log("Cambiando a geojson de " + clave );vistaMzaDel(clave,false);});
	}else{
		vistaDelegacion("TODOS",false);
	};	





}





function goCoordenada(){
	$('#dispo').empty();
	var texto = $('#ensayo').val();
	var texto2 = texto.replace(/[^0-9]+/g, "");
	var salida = "nada";

	if (texto2.length != 10){
		alert("Se requieren 10 dígitos del numero de cuenta");
	}
	if (texto2.length == 10){
		//factY= factY*.93
		//factX= factX*.86
	    coordenada_x= texto2.substring(0,2) + texto2.substring(4,7);
	    coordenada_y= texto2.substring(2,4) + texto2.substring(7,10);
	    var INEGIy = minlatINEGI+coordenada_y-factY;
	    var INEGIx = minlatINEGI+coordenada_x-factX;
	    var ny= new_latitude(bordeS,(coordenada_y-factY)/1000);
	    var nx= new_longitude(bordeW,bordeS,(coordenada_x-factX)/1000);
	    
	    //$('#txtensayo').html(texto2 + "<br Coordenada proxi INEGI <br> <i>+proj=lcc +lat_1=17.5 +lat_2=29.5 +lat_0=12 +lon_0=-102 +x_0=2500000 +y_0=0 +ellps=GRS80 +units=m </i> " + INEGIy + "," + INEGIx + "<br> Coordenada WSG84: (lat-lon): " + ny +"," + nx);
	    $('#txtensayo').html("Coordenadas calculadas WSG84: (lat-lon): " + ny +"," + nx);
		var poly = CDMX[0].features[0].geometry.coordinates[0];
		var dentro = isPointInsidePolygon(nx,ny, poly);
		if (dentro == true){
			var zoomp = 17;
			var municipiodelpunto= whichPolygonMPO(nx,ny);
			var vecindariodelpunto = whichPolygonCodPos(nx,ny);
			$("#imginfo").attr('src','img/A'+municipiodelpunto+'.png');
			$("#descCOL").text(actCOL)
			$("#descCP").text(actCP)
			$("#descFAC").text("Esta colonia tiene asignado un nivel de servicio "+ actFAC+ ": " + Ddisp(actFAC));
			$("#imgFAC").css("background-color",actTONO);

			console.log(vecindariodelpunto);
			JavaScript.load('data/mzaCDMX'+ municipiodelpunto +'.geojson.js',function() {console.log("Cambiando a geojson de " + municipiodelpunto );vistaMzaCodPos(vecindariodelpunto,false);});
			console.log(municipiodelpunto);
			console.log(mzaCDMX);
			mapas.flyTo(new L.LatLng(ny, nx), zoomp);
    		visibleEast = mapas.getBounds().getEast()
    		visibleWest = mapas.getBounds().getWest()
    		visibleNorth = mapas.getBounds().getNorth()
    		visibleSouth = mapas.getBounds().getSouth()
    		if(mapas.hasLayer(circle1)){
       				 mapas.removeLayer(circle1);
      		};
    		var circle1 = L.circle([ny,nx], 200);
			circle1.addTo(mapas);


		}
		if (dentro == false){
			alert("La información del número de cuenta proporcionada genera una coordenada fuera de la Ciudad de México. Verifique la información.")
		}
	};

	//JavaScript.load('data/locCDMX.js');
	//cargamapa();
};

function NombreMPO(clavebuscada){
	var nMUN = "";
	for( var ii =0; ii < munCDMX[0].features.length ; ii++){
		if (munCDMX[0].features[ii].properties.CVE_MUN == clavebuscada){
			nMUN =munCDMX[0].features[ii].properties.NOM_MUN
		};
	};
	return nMUN
};

// Recupera los nombres de las colonias asociadas a un Código Postal
function NombreCOL(clavebuscada){
	var nCOL = "";
	for( var ii =0; ii < colCDMX[0].features.length ; ii++){
		if (colCDMX[0].features[ii].properties.POSTALCODE == clavebuscada){
			if(nCOL != ""){
				nCOL = nCOL + ", " + colCDMX[0].features[ii].properties.SETT_NAME;	
			}
			if(nCOL == ""){
				nCOL =colCDMX[0].features[ii].properties.SETT_NAME	
			}
		};
	};
	return nCOL
};



function whichPolygonMPO(x,y){
	var munI = "00";
	var nMUN = "";
	var poly = munCDMX[0].features[0].geometry.coordinates[0];
	var localizado = "00";
	var dentro = false;
	for( var ii =0; ii < munCDMX[0].features.length ; ii++){
		if (dentro == false){
			munI = munCDMX[0].features[ii].properties.CVE_MUN;
			nMUN = munCDMX[0].features[ii].properties.NOM_MUN;
			poly = munCDMX[0].features[ii].geometry.coordinates[0];
			dentro = isPointInsidePolygon(x,y, poly);
		};
		if (dentro == true){
			localizado = munI;
			actMPO =  nMUN;
		};
	};
	return localizado ;
}


// Indica dentro de cual poligono de Colonia / Código Postal se encuentra una coordenada (lon-lat)
function whichPolygonCodPos(x,y){
	var CodPos = "00000";
	var Asentamiento = "";
	var Delegacion = "";
	var Factibilidad = ""
	var coloracion = ""
	var poly = colCDMX[0].features[0].geometry.coordinates[0];
	var localizado = "00000";
	var dentro = false;
	for( var ii =0; ii < colCDMX[0].features.length ; ii++){
		if (dentro == false){
			CodPos = colCDMX[0].features[ii].properties.POSTALCODE;
			Asentamiento = colCDMX[0].features[ii].properties.SETT_NAME;
			Delegacion = colCDMX[0].features[ii].properties.MUN_NAME;
			Factibilidad= colCDMX[0].features[ii].properties.COLOR;
			coloracion= colCDMX[0].features[ii].properties.COLOUR;
			poly = colCDMX[0].features[ii].geometry.coordinates[0];
			dentro = isPointInsidePolygon(x,y, poly);
		};
		if (dentro == true){
			localizado = CodPos;
			actCP = CodPos;
			actCOL = Asentamiento;
			actMPO = Delegacion;
			actFAC = Factibilidad;
			actTONO = coloracion;
		};
	};
	return localizado ;
}


function cargamapa(){
	 	geojsonlocCDMX =L.geoJson(locCDMX, {
			name:'regixxonestodos'	,
	        style: function (feature) {
	            return { 
	            	color: "red",
					//fillColor: "gray",
					fillColor: 'lightgreen',//getColor(checkTotal_mpo2(feature.properties.EDOMUN)),
	            	weight: 1,
	            	opacity: 0.3,
	            	fillOpacity: 0.1,
	            	clickable: false 
	            };
	        },
		});
	mapas.addLayer(geojsonlocCDMX);	
	mapas.fitBounds(geojsonCDMX.getBounds());

	};

$(document).ready(function($){
    $("#ctaAgua").mask("00 - 00 - 000 - 000"); 
    $('input[name="date"]').mask('00/00/0000');
    $('input[name="cuenta"]').mask('00-00-000-000');
    
	$('input[name="phone-number"]').mask('(000) 000 0000');

});



function isPointInsidePolygon(x,y, poly) {
    var inside = false;
    //var x = marker.getLatLng().lat, y = marker.getLatLng().lng;
    //for (var ii=0;ii<poly.length;ii++){
        var polyPoints = poly;
        for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            var xi = polyPoints[i][0], yi = polyPoints[i][1];
            var xj = polyPoints[j][0], yj = polyPoints[j][1];

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
    //}

    return inside;
};


/** Testet with:
 *  - IE 5.5, 7.0, 8.0, 9.0 (preview)
 *  - Firefox 3.6.3, 3.6.8
 *  - Safari 5.0
 *  - Chrome 5.0
 *  - Opera 10.10, 10.60
 */
var JavaScript = {
  load: function(src, callback) {
    var script = document.createElement('script'),
        loaded;
        
    script.setAttribute('src', src);

    if (callback) {
      script.onreadystatechange = script.onload = function() {
        if (!loaded) {
          callback();
        }
        loaded = true;
      };
    }
    document.getElementsByTagName('head')[0].appendChild(script);
  }
};


jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}




function initmapas(){

    mapas = new L.map('mapas',{zoomSnap: 0.125,zoomControl: true }).setView(new L.LatLng(19.353890, -99.138817),9.8);
    mapas.scrollWheelZoom.disable(); // sin mouse o pad wheel zoom
    //mapas.dragging.disable(); // sin drah event
    mapas.touchZoom.disable(); 
    mapas.doubleClickZoom.disable();
    mapas.scrollWheelZoom.disable(); // sin mouse o pad wheel zoom

	var orl= L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
	maxZoom: 20//,
		//attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 20, attribution: osmAttrib});
	OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
		maxZoom: 20,
		attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

	mapas.addLayer(OpenStreetMap_France);
	//L.control.zoom().addTo(mapMunicipioREG)








	geojsonCDMX =L.geoJson(CDMX, {
			name:'regionestodos'	,
	        style: function (feature) {
	            return { 
	            	color: "black",
					//fillColor: "gray",
					fillColor: 'lightgreen',//getColor(checkTotal_mpo2(feature.properties.EDOMUN)),
	            	weight: 1,
	            	opacity: 1,
	            	fillOpacity: 0,
	            	clickable: false 
	            };
	        },


	}).addTo(mapas);


		var circle1 = L.circle([19.353890, -99.138817],{radius: 15, color:'white',weight:.5, opacity:0,fillColor: '#ff9900',fillOpacity:0}).addTo(mapas);


	geojsonmunCDMX =L.geoJson(munCDMX, {
			name:'regionestodos'	,
	        style: function (feature) {
	            return { 
	            	color: "navy",
					//fillColor: "gray",
					fillColor: 'lightgreen',//getColor(checkTotal_mpo2(feature.properties.EDOMUN)),
	            	weight: 1,
	            	opacity: 0.4,
	            	fillOpacity: 0,
	            	clickable: false 
	            };
	        }


	}).addTo(mapas);

	geojsonCodPosCDMX =L.geoJson(colCDMX, {

	        style: function (feature) {
		            return { 
		            	color: "black",
		            	fillColor: 'pink',//getColor2(checkTotal_reg2(layer.feature.properties.ENTREG,4),imunac_breakr,imunac_colors),
		            	weight: 0,
		            	fill: true,
		            	opacity: 0,
		            	fillOpacity: 0,
		            	clickable: false 
		            };
	        }
	}).addTo(mapas);





	geojsonmzaCDMX =L.geoJson(mzaCDMX, {

	        style: function (feature) {
		            return { 
		            	color: "black",
		            	fillColor: 'pink',//getColor2(checkTotal_reg2(layer.feature.properties.ENTREG,4),imunac_breakr,imunac_colors),
		            	weight: 0,
		            	fill: true,
		            	opacity: 0,
		            	fillOpacity: 0,
		            	clickable: false 
		            };
	        }
	}).addTo(mapas);

	geojsonmunCDMX.eachLayer(function (layer) {
    	//layer.bindTooltip(layer.feature.properties.CVE_MUN + " " + layer.feature.properties.NOM_MUN);
	});


mapas.fitBounds(geojsonCDMX.getBounds());



}



function vistaCodPos(clavebuscada){
	if( mapas.hasLayer(OpenStreetMap_France)){
		mapas.removeLayer(OpenStreetMap_France);
	}

	if( mapas.hasLayer(geojsonCodPosCDMX)){
		mapas.removeLayer(geojsonCodPosCDMX);
	}	 
	var ClaveMunicipal = "00";

	OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
		maxZoom: 20,
		attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

	mapas.addLayer(OpenStreetMap_France);


	geojsonCodPosCDMX =L.geoJson(colCDMX, {

	        style: function (feature) {
		            return { 
		            	color: "black",
		            	fillColor: coloracion,//getColor2(checkTotal_reg2(layer.feature.properties.ENTREG,4),imunac_breakr,imunac_colors),
		            	weight: 1,
		            	fill: true,
		            	opacity: 1,
		            	fillOpacity: 0.3,
		            	clickable: false 
		            };
	        },
		
		    filter: function(feature, layer) {
		        if (feature.properties.POSTALCODE === clavebuscada){
		        	ClaveMunicipal = feature.properties.CVE_MUN;
		        	actCP=clavebuscada;
		        	actMPO=feature.properties.MUN_NAME;
		        	coloracion=feature.properties.COLOUR;
		        	actTONO=coloracion;
		        	actFAC=feature.properties.COLOR;

		        	return true;
		        };
		    }
	}).addTo(mapas);

	//zoomToFeature;
	mapas.fitBounds(geojsonCodPosCDMX.getBounds());
	$("#descCP").text(actCP);
	$("#descCOL").text(actCOL);

	if (ClaveMunicipal != "00"){
		$("#imginfo").attr('src','img/A'+ClaveMunicipal+'.png');
		JavaScript.load('data/mzaCDMX'+ ClaveMunicipal +'.geojson.js',function() {console.log("Cambiando a geojson de " + ClaveMunicipal );vistaMzaCodPos(clavebuscada,true);});
	};
};





function vistaColonia(clavebuscada){
	if( mapas.hasLayer(OpenStreetMap_France)){
		mapas.removeLayer(OpenStreetMap_France);
	}

	if( mapas.hasLayer(geojsonCodPosCDMX)){
		mapas.removeLayer(geojsonCodPosCDMX);
	}
	var ClaveMunicipal = "00";
	var coloracion = "#0000Fa";
	var Factibilidad ="---"

	OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
		maxZoom: 20,
		attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

	mapas.addLayer(OpenStreetMap_France);


	geojsonCodPosCDMX =L.geoJson(colCDMX, {

	        style: function (feature) {
		            return { 
		            	color: "black",
		            	fillColor: coloracion,
		            	weight: 1,
		            	fill: true,
		            	opacity: 1,
		            	fillOpacity: 0.3,
		            	clickable: false 
		            };
	        },
		
		    filter: function(feature, layer) {
		        if (feature.properties.SETT_NAME +" (" + feature.properties.ABR_MUN +")"   === clavebuscada){
		        	ClaveMunicipal = feature.properties.CVE_MUN;
		        	actCOL=feature.properties.SETT_NAME;
		        	actMPO=feature.properties.MUN_NAME;
		        	coloracion=feature.properties.COLOUR;
		        	actTONO=coloracion;
		        	actCP=feature.properties.POSTALCODE;
		        	actFAC=feature.properties.COLOR;
		        	return true;
		        };
		    }
	}).addTo(mapas);

	//zoomToFeature;
	mapas.fitBounds(geojsonCodPosCDMX.getBounds());
	$("#descMPO").text(actMPO);
	$("#descCP").text(actCP);
	$("#imginfo").attr('src','img/A'+ClaveMunicipal+'.png');
	$("#descCOL").text(actCOL);
	$("#descFAC").text("Esta colonia tiene asignado un nivel de servicio "+ actFAC+ ": " + Ddisp(actFAC));
	$("#imgFAC").css("background-color",actTONO);

	if (ClaveMunicipal != "00"){
		$("#imginfo").attr('src','img/A'+ClaveMunicipal+'.png');
		JavaScript.load('data/mzaCDMX'+ ClaveMunicipal +'.geojson.js',function() {console.log("vistaColonia call vistaMzaCol " + ClaveMunicipal );vistaMzaCol(clavebuscada);});
	};

};


function vistaDelegacion(clavebuscada,dens){
	$("#descPob").text("")
	var densidad= dens;
	if( mapas.hasLayer(OpenStreetMap_France)){
		mapas.removeLayer(OpenStreetMap_France);
	}

	if( mapas.hasLayer(geojsonCodPosCDMX)){
		mapas.removeLayer(geojsonCodPosCDMX);
	}

	if( mapas.hasLayer(geojsonmunCDMX)){
		mapas.removeLayer(geojsonmunCDMX);
	}


	var OpenStreetMap_France = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
	mapas.addLayer(OpenStreetMap_France);

	var ClaveMunicipal = clavebuscada;
	

	var coloracion = "#0000Fa";
	var Factibilidad ="---"
	var ancholin=1;

	geojsonCodPosCDMX =L.geoJson(colCDMX, {
	        style: function (feature) {
	        	if (clavebuscada == "TODOS") {
	        		ancholin=0;
	        	}
		            return { 
		            	color: 'black',
		            	fillColor: coloracion,
		            	weight: ancholin,
		            	fill: true,
		            	opacity: 1,
		            	fillOpacity: 0.5,
		            	clickable: false 
		            };
	        },
	 		
		    filter: function(feature, layer) {
		    	//
		        if ( clavebuscada == "TODOS"){
		        	ClaveMunicipal = feature.properties.CVE_MUN;
		        	actCOL="";
		        	actMPO=feature.properties.MUN_NAME;
		        	if (clavebuscada == "TODOS") {
		        		actMPO="";
		        	}
		        	coloracion=feature.properties.COLOUR;
		        	if (densidad ==true){
		        		coloracion = feature.properties.vivtot <= 300 ? "#e8fdff" : (feature.properties.vivtot > 300  & feature.properties.vivtot <= 707 ?  "lightblue": (feature.properties.vivtot > 707  & feature.properties.vivtot <= 1559 ? 'blue' : 'navy'  ) ) //"#008cff":"#000ff"
		        	}
		        	actTONO=coloracion;
		        	actCP="";
		        	actFAC="";
		        	return true;
		        };
		    }
	}).addTo(mapas);

	geojsonmunCDMX =L.geoJson(munCDMX, {
			name:'regionestodos'	,
	        style: function (feature) {
	            return { 
	            	color: "blue",
					//fillColor: "gray",
					fillColor: 'gray',
	            	weight: 2,
	            	opacity: 0.6,
	            	fillOpacity: 0,
	            	clickable: false 
	            };
	        },
	        onEachFeature(feature, layer) {
		    layer.on({
		        mouseover: 
		        	function (layer){
			          	var layerM = layer.target
			        	layerM.setStyle({
					        //color: coloracion,
					        weight: 2,
					        //fillColor: coloracion,
					        opacity : 1,
					        fillOpacity: 0.5,
					        clickable: false 
					    });
   					    var	clave =  layerM.feature.properties.CVE_ENT +
						             layerM.feature.properties.CVE_MUN 
						var gente =  layerM.feature.properties.pobtot;
						var casas =  layerM.feature.properties.vivtot;
						var consevicio =  layerM.feature.properties.vph_aguadv;
						var nom_m = feature.properties.NOM_MUN.toUpperCase();
						var conted= "<span style='font-size:1.3em'> " + nom_m + " </span><br><span style='font-size:0.9em;'>CVE:" + clave +"</span>"+ "<br><span> <img src= 'img/people.png' height='20' width='20' >" + " Habitantes: " + gente + "<br> <img src= 'img/houses.png' height='20'  >"+"Hogares: " + casas + "<br> <img src= 'img/water.png' height='20'  >"+" c/Servicio: " + consevicio + "</span>";
			        	//layerM.bindPopup( "<span style='font-size:1.3em'> " + nom_m + " </span><br><span style='font-size:0.9em;'>CVE:" + clave +"</span>"+ "<br><span> <img src= 'img/people.png' height='20' width='20' >" + " Habitantes: " + gente + "<br> <img src= 'img/houses.png' height='20'  >"+"Hogares: " + casas + "<br> <img src= 'img/water.png' height='20'  >"+" c/Servicio: " + consevicio + "</span>",customOptions).openPopup()

					    $("#descCOL").html(conted);
			        },
		        mouseout: 
		        	function (layer){
			          	var layerM = layer.target
			        	layerM.setStyle({
			            	color: "blue",
							//fillColor: "gray",
							fillColor: 'gray',
			            	weight: 2,
			            	opacity: 0.4,
			            	fillOpacity: 0,
			            	clickable: false 
					    });

					    $("#descCOL").text("");
			        },
			        click:
			        function (layer){
			        	var layerM = layer.target
			        	console.log("vistaDelegacion call verMapaDelegacion " + feature.properties.CVE_MUN)
			        	verMapaDelegacion(feature.properties.CVE_MUN,densidad)
			        } 
				});
			}


	}).addTo(mapas);


	mapas.fitBounds(geojsonCodPosCDMX.getBounds());

	
	$("#descCP").text(actCP);
	$("#imginfo").attr('src','img/A'+ClaveMunicipal+'.png');
	$("#descCOL").text(actCOL);
	$("#descFAC").text("");
	$("#imgFAC").css("background-color",'white');

	var salidaDisp="<h6>Clave de colores en el mapa, unidad básica: Colonia</h6>"
	var coloracion = ["#27A408","#F9E52F","#E65407","#CB0803"];
	$('#dispo').empty();
	for (var ii = 0; ii<4; ii++){
		$("#descMPO").html("DISPONIBILIDAD DE AGUA <br>"+ actMPO);
		if (densidad == false){
			salidaDisp = salidaDisp + "<span style = 'background-color: "+coloracion[ii]+";'>____</span><span> &nbsp"+disponibilidadDesc[ii]+"<br>"
		}
		if (densidad == true){
			$("#descMPO").html("DEMANDA DE AGUA <br>"+actMPO);
			var coloracion2 = ["#e8fdff","lightblue","blue","navy"];
			salidaDisp = salidaDisp + "<span style = 'background-color: "+coloracion2[ii]+";'>____</span><span> &nbsp"+demandaDesc[ii]+"<br>"
		}

	}
	$('#dispo').append(salidaDisp);



	if (clavebuscada =="TODOS"){
		$("#imginfo").attr('src','img/A'+"000"+'.png');
	}
	

};

// muestra las manzanas de toda una delegacion
function vistaMzaDel(clavebuscada,dens){
	densidad=dens
	if( mapas.hasLayer(geojsonmzaCDMX)){
		mapas.removeLayer(geojsonmzaCDMX);
	}

	if( mapas.hasLayer(OpenStreetMap_France)){
		mapas.removeLayer(OpenStreetMap_France);
	}

	if( mapas.hasLayer(geojsonCodPosCDMX)){
		mapas.removeLayer(geojsonCodPosCDMX);
	}
	var OpenStreetMap_France = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
	mapas.addLayer(OpenStreetMap_France);

	var ClaveMunicipal = clavebuscada;
	if (trCP_del.indexOf(clavebuscada) !=(-1) &  clavebuscada != "TODOS"){
		$("#imginfo").attr('src','img/A'+ClaveMunicipal+'.png');
		//la siguiente funcion se llama para  cargar un archivo de datos relativo a la delegacion
		JavaScript.load('data/mzaCDMX'+ ClaveMunicipal +'.geojson.js',function() {console.log("vistaMzaDel call avisaloaded  para carga de datos  " + ClaveMunicipal );avisaloaded(clavebuscada);});
	};


    var coloracion = "#0000Fa";
	var Factibilidad ="---"
 	var ancholin=1;
	geojsonmzaCDMX =L.geoJson(mzaCDMX, {
			style: function (feature) {

		            return { 
		            	color: "#cccccc",
		            	fillColor: 'black',
		            	weight: 0,
		            	opacity: 0,
		            	fillOpacity: 0.5,
		            	clickable: false 
		            };
	        },
	        onEachFeature(feature, layer) {
		    layer.on({
		        mouseover: 
		        	function (layer){nada()},
		        mouseout: 
		        	function (layer){nada()},
				});
			},
	        zoomToFeature
		
	}).addTo(mapas);

	geojsonCodPosCDMX =L.geoJson(colCDMX, {

	        style: function (feature) {
	        	if (clavebuscada == "TODOS") {
	        		ancholin=0;
	        	}
		            return { 
		            	color: 'black',
		            	fillColor: coloracion,
		            	weight: ancholin,
		            	fill: true,
		            	opacity: 1,
		            	fillOpacity: 0.6,
		            	clickable: false 
		            };
	        },
	 		    
	        onEachFeature(feature, layer) {
		    layer.on({
		        mouseover: 
				
				   function (layer){
				   	if (clavebuscada != "TODOS") {
			          	var layerM = layer.target
			        	layerM.setStyle({
					        //color: coloracion,
					        weight: 2,
					        //fillColor: coloracion,
					        opacity : 1,
					        fillOpacity: 0.7,
					        clickable: false 
					    });
		        		$("#descCOL").text(feature.properties.SETT_NAME);
		        		$("#descPob").html("Total de Manzanas: " + feature.properties.num_mza + "<br>" +
		        							"<span>Por Índice de Desarrollo Social</span><br><table>" +
		        							"<tr><th>Tipo de manzana</th><th>Número de Manzanas</th></tr>"+
		        							"<tr><td>Alta</td><td>" + feature.properties.IALTO+  "</td></tr>" +
		        							"<tr><td>Media</td><td>"+ feature.properties.IMEDIO+  "</td></tr>"+
		        							"<tr><td>Baja</td><td>" + feature.properties.IBAJO+  "</td></tr>"+
		        							"<tr><td>Muy Baja</td><td>"+  feature.properties.IMBAJO+ "</td></tr>"+
		        							"<tr><td>No clasificado</td><td>"+  feature.properties.INOEV+ "</td></tr>"+
		        							" </table>" +
		        			               "Población Total: " + feature.properties.pobtot + "<br>" +
		        			               "Total de viviendas: " + feature.properties.vivtot + "<br>" +
		        			               "Viviendas con agua entubada: " + feature.properties.vph_aguadv + "<br>");
		        		
		        		
		        	};	    
				  },
					//var	clave =  layerM.feature.properties.EDOMUN;
		        	//map2tbl(clave,"#TablaPilar");
		        	
		        

		        mouseout: //resetHighlightBR,
		          function (layer){
			        if (clavebuscada != "TODOS") {
		        			var layerM = layer.target
						        layerM.setStyle({
					     		//color: coloracion,
						        weight: 1,
						        //fillColor: coloracion,
						        opacity: 1,
						        fillOpacity: 0.6
						    });
					$("#descCOL").text("");
					$("#descPob").text("");
					
					//map2tbl('nada',"#TablaPilar")
					//$('#mmre_sel').text("");

			        };
		    	},
		        //click: zoomToFeatureR
		       // click: //highlightFeatureR,
		        	click: 
		        	function (layer){
			        	console.log("vistaMzaDel call vistaColonia  " + feature.properties.SETT_NAME  +" (" + feature.properties.ABR_MUN +")" );
			        	vistaColonia(feature.properties.SETT_NAME +" (" + feature.properties.ABR_MUN +")");
		        	}

					//mapLI.fitBounds(geojsonmunicipioLI3.getBounds())
		    });
			},
		    filter: function(feature, layer) {
		    	//
		        if (feature.properties.CVE_MUN  === clavebuscada | clavebuscada == "TODOS"){
		        	
		        	ClaveMunicipal = feature.properties.CVE_MUN;
		        	actCOL="";
		        	actMPO=feature.properties.MUN_NAME;
		        	if (clavebuscada == "TODOS") {
		        		actMPO="";
		        	}
		        	coloracion=feature.properties.COLOUR;
		        	if (densidad ==true){
		        		coloracion = feature.properties.vivtot <= 300 ? "#e8fdff" : (feature.properties.vivtot > 300  & feature.properties.vivtot <= 707 ?  "lightblue": (feature.properties.vivtot > 707  & feature.properties.vivtot <= 1559 ? 'blue' : 'navy'  ) ) //"#008cff":"#000ff"
		        	}
		        	actTONO=coloracion;
		        	actCP="";
		        	actFAC="";
		        	return true;
		        };
		    },

	}).addTo(mapas);

	
		function nada(){

		}
		function zoomToFeature(e) {
	    	map.fitBounds(e.target.getBounds());
		}

		mapas.fitBounds(geojsonCodPosCDMX.getBounds());

	
	$("#descCP").text(actCP);
	$("#imginfo").attr('src','img/A'+ClaveMunicipal+'.png');
	$("#descCOL").text(actCOL);
	$("#descFAC").text("");
	$("#imgFAC").css("background-color",'white');

	var salidaDisp="<h6>Clave de colores en el mapa, unidad básica: Colonia</h6>"
	var coloracion = ["#27A408","#F9E52F","#E65407","#CB0803"];
	$('#dispo').empty();
	for (var ii = 0; ii<4; ii++){
		if (densidad == false){
			$("#descMPO").html("DISPONIBILIDAD DE AGUA <br>"+actMPO);
			salidaDisp = salidaDisp + "<span style = 'background-color: "+coloracion[ii]+";'>____</span><span> &nbsp"+disponibilidadDesc[ii]+"<br>"
		}
		if (densidad == true){
			$("#descMPO").html("DEMANDA DE AGUA <br>"+actMPO);
			var coloracion2 = ["#e8fdff","lightblue","blue","navy"];
			salidaDisp = salidaDisp + "<span style = 'background-color: "+coloracion2[ii]+";'>____</span><span> &nbsp"+demandaDesc[ii]+"<br>"
		}
	}
	$('#dispo').append(salidaDisp);
};




function vistaMza(clavebuscada){
	if( mapas.hasLayer(geojsonmzaCDMX)){
		mapas.removeLayer(geojsonmzaCDMX);
	}	 
	var ClaveMunicipal="00"
	geojsonmzaCDMX =L.geoJson(mzaCDMX, {

	        style: function (feature) {
		            return { 
		            	color: "black",
		            	fillColor: 'pink',//getColor2(checkTotal_reg2(layer.feature.properties.ENTREG,4),imunac_breakr,imunac_colors),
		            	weight: 1,
		            	fill: true,
		            	opacity: 1,
		            	fillOpacity: 0.3,
		            	clickable: false 
		            };
	        },
		
		    filter: function(feature, layer) {
		        if (feature.properties.CVE_MUN === clavebuscada){
		        	actMPO=NombreMPO(clavebuscada);
		        	actMPO=feature.properties.NOM_MUN;
		        	ClaveMunicipal=clavebuscada;
		        	return true;
		        };
		    }
	}).addTo(mapas);

	//zoomToFeature;
	mapas.fitBounds(geojsonmzaCDMX.getBounds());
	$("#descMPO").text(actMPO);
	$("#imginfo").attr('src','img/A'+ClaveMunicipal+'.png');

};


var customOptions =
    {
    'maxWidth': '400',
    'width': '200',
    'className' : 'popupCustom'
    }


function vistaMzaCol(clavebuscada){
	if( mapas.hasLayer(geojsonmzaCDMX)){
		mapas.removeLayer(geojsonmzaCDMX);
	}	 
	var ClaveMunicipal = "00";
	var coloracion = "#0000aa";
	var Factibilidad ="---"

	geojsonmzaCDMX =L.geoJson(mzaCDMX, {

	        style: function (feature) {
		            return { 
		            	color: "#aaaaee",
		            	fillColor: coloracion,
		            	weight: 1.4,
		            	fill: true,
		            	opacity: 1,
		            	fillOpacity: 0,
		            	clickable: false 
		            };
	        },
		    onEachFeature(feature, layer) {
		    layer.on({
		        mouseover: //highlightFeatureR,
		          function (layer){
		          	var layerM = layer.target
		        	layerM.setStyle({
				        color: 'black',
				        weight: 2,
				        fillColor: 'lightblue',
				        opacity : 1,
				        fillOpacity: 0.4,
				        clickable: true 
				    });
				    var	clave =  layerM.feature.properties.CVE_ENT +
					             layerM.feature.properties.CVE_MUN +
					             layerM.feature.properties.CVE_LOC +
					             layerM.feature.properties.CVE_AGEB+
					             layerM.feature.properties.CVE_MZA;
					var gente =  layerM.feature.properties.pobtot;
					var casas =  layerM.feature.properties.vivtot;
					var consevicio =  layerM.feature.properties.vph_aguadv;
					var Tarifa =  layerM.feature.properties.IDS_Grado;

					//var	clave =  layerM.feature.properties.EDOMUN;
		        	//map2tbl(clave,"#TablaPilar");
		        	//layerM.bindTooltip("IDS: "+Tarifa + "<br> Habitantes: " + gente + "<br> Hogares: " + casas + "<br> c/Servicio: " + consevicio).openTooltip()
		        	//layerM.bindPopup("IDS: "+Tarifa + "<br> Habitantes: " + gente + "<br> Hogares: " + casas + "<br> c/Servicio: " + consevicio).openPopup()
		        	layerM.bindPopup( "<span style='font-size:0.9em;'>CVE:" + clave +"</span>"+ "<br><span>"+"IDS: "+Tarifa + "<br> <img src= 'img/people.png' height='20' width='20' >" + " Habitantes: " + gente + "<br> <img src= 'img/houses.png' height='20'  >"+"Hogares: " + casas + "<br> <img src= 'img/water.png' height='20'  >"+" c/Servicio: " + consevicio + "</span>",customOptions).openPopup()
		        },

		        mouseout: //resetHighlightBR,
		          function (layer){
		        			var layerM = layer.target
						        layerM.setStyle({
					     		color: "#aaaaee",
						        weight: 1.4,
						        fillColor: 'lightblue',
						        opacity: 1,
						        fillOpacity: 0
						    });
				$("#descCOL").text(actCOL)
					//map2tbl('nada',"#TablaPilar")
					//$('#mmre_sel').text("");

		        }
		        //click: zoomToFeatureR
		        //click: //highlightFeatureR,
		    });
		},	        
		
		    filter: function(feature, layer) {
		        if (feature.properties.SETT_NAME +" (" + feature.properties.ABR_MUN +")"   === clavebuscada){
		        	actCOL=clavebuscada;
		        	coloracion=feature.properties.COLOUR;
		        	return true;
		        };
		    }
		
	}).addTo(mapas);
	//$("#descCOL").text(actCOL);

	//mapas.fitBounds(geojsonmzaCDMX.getBounds());
};


function vistaMzaCodPos(clavebuscada,acercar){
	console.log("buscando manzanas para el codigo postal " + clavebuscada);
	actCOL = ""
	if( mapas.hasLayer(geojsonmzaCDMX)){
		mapas.removeLayer(geojsonmzaCDMX);
	}	 

	geojsonmzaCDMX =L.geoJson(mzaCDMX, {

	        style: function (feature) {
		            return { 
		            	color: "#aaaaee",
		            	fillColor: 'pink',//getColor2(checkTotal_reg2(layer.feature.properties.ENTREG,4),imunac_breakr,imunac_colors),
		            	weight: 1,
		            	fill: true,
		            	opacity: 0.2,
		            	fillOpacity: 0,
		            	clickable: false 
		            };
	        },
		    onEachFeature(feature, layer) {
		    layer.on({
		        mouseover: //highlightFeatureR,
		          function (layer){
		          	var layerM = layer.target
		        	layerM.setStyle({
				        color: '9999ff',
				        weight: 2,
				        fillColor: 'crimson',
				        opacity : 1,
				        fillOpacity: 0.2,
				        clickable: true 
				    });
					var	clave =  layerM.feature.properties.CVE_ENT +
					             layerM.feature.properties.CVE_MUN +
					             layerM.feature.properties.CVE_LOC +
					             layerM.feature.properties.CVE_AGEB+
					             layerM.feature.properties.CVE_MZA;
					var gente =  layerM.feature.properties.pobtot;
					var casas =  layerM.feature.properties.vivtot;
					var consevicio =  layerM.feature.properties.vph_aguadv;
					var Tarifa =  layerM.feature.properties.IDS_Grado;

		        	//map2tbl(clave,"#TablaPilar");
		        	$("#descMZA").html( "<ul><li>Clave de manzana: " + clave +"</li> " +
		        						"<li>Total de habitantes: " + gente +"</li> " + 
		        						"<li>Total de viviendas: " + casas +"</li> " +
		        						"<li>Ocupación promedio: " + math.round(gente/ casas,2) +"</li> " +
		        						"<li>Viviendas con servicio de agua entubada: " + consevicio +"</li> " +
		        						"<li>Tipo de manzana para Tarifa de cobro de agua respecto a IDS (Indice Desarrollo Social): " + Tarifa +"</li> "+
		        						"<li>El volumen de agua bimestral optimo por hogar es : " + math.round( gente * consumooptimo * 60.8 / casas,2) +" litros </li> " + 
		        						"<li>En pesos el importe a pagar debe ser de : " + math.round( H20toMNT(gente * consumooptimo * 60.8 / casas,Tarifa)[5],2) +" pesos </li></ul> " );
		        	
		        },

		        mouseout: //resetHighlightBR,
		          function (layer){
		        			var layerM = layer.target
						        layerM.setStyle({
					     		color: '9999ff',
						        weight: 2,
						        fillColor: 'pink',
						        opacity: 1,
						        fillOpacity: 0
						    });
						   $("#descMZA").text("");     
					//map2tbl('nada',"#TablaPilar")
					//$('#mmre_sel').text("");

		        },
		        //click: zoomToFeatureR
		        click: //highlightFeatureR,
		        	console.log("has dado click")
					//mapLI.fitBounds(geojsonmunicipioLI3.getBounds())
		    });
		},	        
		
		    filter: function(feature, layer) {
		        if (feature.properties.POSTALCODE === clavebuscada){
		        	actCOL= NombreCOL(clavebuscada);
		        	return true;
		        };
		    }
		
	}).addTo(mapas);
	if (acercar == true){
		mapas.fitBounds(geojsonmzaCDMX.getBounds());		
	}
	$("#descCP").text(actCP);
	$("#descCOL").text(actCOL);
	$("#descMPO").text(actMPO);

};





$(document).ready(function() {
  var prefijo = "<option value='";
  var salidaopt =  "<datalist id='coloniasopt'>";
  for(var jj=0; jj < colCDMX[0].features.length; jj++){
    salidaopt = salidaopt + prefijo +  colCDMX[0].features[jj].properties.SETT_NAME +" ("+colCDMX[0].features[jj].properties.ABR_MUN+")"+ "'></option>";
  };
  salidaopt= salidaopt + "</datalist>";
  $('#selColonias').append(salidaopt);
  $("#ensayo").val('23-43-430-071');
  $("#imginfo").attr('src','img/A000.png');



  var salidaopt =  "<datalist id='delegacionesopt'>";
  for(var jj=0; jj < delelgaciones.length; jj++){
    salidaopt = salidaopt + prefijo  +delelgaciones[jj] + "'></option>";
  };
  salidaopt + prefijo +  "TODOS" + "'></option>"
  salidaopt= salidaopt + "</datalist>";
  $('#selDelegaciones').append(salidaopt);

	$("#preguntas").text(txtCuestionario[0]);
	$("#contexto").text(txtContexto[0]);
	$("#areaInput").append(txtTipoInput[0])
	$("#Respuestas").append('<img id = "imgIcon" src="" height="200">')
	$("#imgIcon").attr('src','img/'+txtIconos[0]);
	

//for(var jj=0; jj < colCDMX[0].features.length; jj++){
 //   console.log(colCDMX[0].features[jj].properties.SETT_NAME )
 // };

$("#imgReg").on({
 "mouseover" : function() {

    muestraRecomenEpecif(0,$("#imgReg").css("background-color"));
  },
  "mouseout" : function() {
    $("#recomendacionEspecifica").empty();
  }
});
$("#imgCoc").on({
 "mouseover" : function() {
    muestraRecomenEpecif(1,$("#imgCoc").css("background-color"));
  },
  "mouseout" : function() {
    $("#recomendacionEspecifica").empty();
  }
});

$("#imgLav").on({
 "mouseover" : function() {
    muestraRecomenEpecif(2,$("#imgLav").css("background-color"));
  },
  "mouseout" : function() {
    $("#recomendacionEspecifica").empty();
  }
});
$("#imgAut").on({
 "mouseover" : function() {
    muestraRecomenEpecif(3,$("#imgAut").css("background-color"));
  },
  "mouseout" : function() {
    $("#recomendacionEspecifica").empty();
  }
});
$("#imgWC").on({
 "mouseover" : function() {
    muestraRecomenEpecif(4,$("#imgWC").css("background-color"));
  },
  "mouseout" : function() {
    $("#recomendacionEspecifica").empty();
  }
});

$("#cFn").on({
 "mouseover" : function() {
    muestraResumenCalif();
  },
  "mouseout" : function() {
    $("#recomendacionEspecifica").empty();
  }
});

	$("#areaInput").keydown(function(event) {
    if (event.keyCode === 13) {
        $("#encuesta").click();
        $("#inputMulti").focus();
    }
	});


 } );

var txtCuestionario =[ 
					"1.- ¿Cuál es tu código postal?",
					"2.- ¿Cuánto pagan de agua al bimestre?",
					"3.- ¿Cuántas personas viven en casa?",					
					"4.- ¿Cuántos minutos ocupa una persona para bañarse?",
					"5.- ¿Cuantas veces por semana preparar alimentos en la cocina requiere más de media hora?",
					"6.- ¿Cuántas veces por semana lavan ropa o asean la casa?",
					"7.- ¿Cuantas veces al mes lavan el patio o el auto o riegan el jardín con agua de la llave?",
					"8.- ¿Los sanitarios tienen depósitos de agua ahorradores?"
					]

var txtContexto =[ 
					"La tarifa de agua en CDMX depende del lugar donde se ubica la vivienda. El código postal permte aproximarnos a la tarifa que seguramente te corresponde.",
					"<br>Rango $30 a $5,000 pesos. Bimestralmente se recibe en casa una boleta para pago de agua.  Si ignora el dato se utiliza tarifa fija",
					"Valor entre 1 y 10. Un consumo 'moderado' implica que se gastan alrededor de " +consumooptimo + " litros diarios de agua por persona.",
					"<br>Límite 30 minutos. En promedio cuanto se tarda un miembro de la familia en bañarse.",
					"<br>Máximo 21 comidas. La preparación de alimentos requiere del consumo de agua. Para responder suma el número de desayunos más el número de comidas más el número de cenas que se cocinan en casa",
					"<br>Maximo 14. Lavar ropa y asear el hogar consumen agua. Se deben contar por separado, esto es: si en el mismo día limpias la casa y lavas ropa, entonces el día vale 2",
					"Maximo 30 dias. Se asume que se utilizan cuando mucho 3 cubetas de agua grandes cada vez que se realizan alguna de estas actividades.",
					"SI o NO. Desde hace años existen sanitarios con bajo consumo de agua -3.8 litros por descarga-. Responde si tu sanitario es ahorrador apoyándote en las imágenes"
					]

var txtTipoInput =[ 
					'<input type="number" id="inputMulti" onkeyup="verifica(0,1000,16910,true)" > ',
					'<input type="number" id="inputMulti" min="30" max="5000" onkeyup="verifica(1,30,5000,true)"><br><label><input type="checkbox" id="recAhorro" > Vivo en casa rentada / Ignoro cuanto se paga</label>',
					'<input type="number" id="inputMulti" min="1" max="10" onkeyup="verifica(2,1,10,true)">',
					'<input type="number" id="inputMulti" min="0" max="30" onkeyup="verifica(3,0,30,true)"><br><label><input type="checkbox" id="recAhorro" >  Tengo regadera ahorradora máximo 5 litros por minuto </label>',
					'<input type="number" id="inputMulti" min="0" max="21" onkeyup="verifica(4,0,21,true)"><br><label><input type="checkbox" id="recAhorro" >  Tengo sistema de trampa de grasa instalado en la cocina </label>',
					'<input type="number" id="inputMulti" min="0" max="14" onkeyup="verifica(5,0,14,true)"><br><label><input type="checkbox" id="recAhorro" >  Tengo lavadora de carga frontal con sistema de reutilización de agua</label>',
					'<input type="number" id="inputMulti" min="0" max="30" onkeyup="verifica(6,0,30,true)">',
					'<input type="text" id="inputMulti" onkeyup="verifica(7,0,1,true)">'
					]


var txtRespuestas =[ 
					['1. Código postal ', ""],
					['2. Pago de agua al bimestre', "",""],
					['3. Personas en casa',"" ],
					['4. Tiempo aseo personal',"",""],
					['5. Preparar alimentos por semana', "",""],
					['6. Lavar ropa / aseo casa por semana',"",""],
					['7. Regar Jardín / Lavar auto',"" ],
					['8. Tiene sanitario ahorrador', ""]
					]

	
var txtIconos = [ "estampilla.png",
				  "boleta_sacmex.png",
				  "personas_casa.png",
				  "regadera_eco.png",
				  "cocinar_foto.png",
				  "lavar_limpiar.png",
				  "lavarautopatios.png",
				  "wc_s.png"	
				]


var txtEvaluacion = [ ["Consumo de agua suficiente considerando " + consumooptimo +" litros diarios por persona",0],
					 ["Consumo límite estimado en virtud del grado de disponibiliad de agua que presenta el área donde se encuentra la vivienda ",0],
					 ["Consumo de agua que corresponde a importe pagado. ",0],
					 ["Volumen de agua detinado para aseo personal",0],
					 ["Volumen de agua destinado a la preparacion de alimentos",0],
					 ["Volumen de agua destinado al lavado de la ropa y limpieza del hogar",0],
					 ["Volumen de agua destinado al aseo del patio / automóvil / regar jadin",0],
					 ["Volumen de agua destinado a saneamiento de inodoro (WC)",0],
					 ["VOLUMEN TOTAL DE AGUA - a partir de las respuestas - ",0]]


var txtTextoLargo = ["",
				  "",
				  "",
				  "La Norma Oficial Mexicana para Regaderas, que incluye, entre otras medidas, la restricción de gasto de agua a un máximo de 10 litros por minuto; es decir, todas las regaderas de uso doméstico que se comercializan en México deben operar eficientemente con un consumo de agua menor al señalado.",
				  "",
				  "",
				  ]

var txtRangos =[["#imgReg",[6,9,12,15],10],
				["#imgCoc",[4,8,12,16],50],
				["#imgLav",[5,8,10,12],200],
				["#imgAut",[2,4,7,10],150],
				]

// colorCalif =[verde,amarillo,naranja,rojo]
var colorCalif=["#27A408","#F9E52F","#E65407","#CB0803"];

// escala a la que corresponden los colores por tipo de uso
var numColorCalif=[1,0.66,0.33,0.0];
var finCalfin=[0,0,0,0,0,0];

var recomespec= [["","Seguramente es posible cerrar la llave mientras mientras se enjabona o reducir el tiempo de baño a 6 minutosy lograr un uso recional","El consumo de agua en la regadera por persona representa alrededor de 120 litros. Si cambia la readera por modelo ecológico de consumo menor a 5 litros por minuto ahorrará hasta un 60% de agua. Sea solidario y modere su uso.","Cada miembro de la familia ocupa más de 15 minutos en la regadera esto representa que cada uno desperdicia más de 150 litros equivalente a volumen diario de agua de una persona. Modere su uso. . Si cambia a un modelo ecologico de regadera con consumo menor a 5 litros por minuto ahorrará hasta un 60% de agua."],
				 ["","Reduzca ligeramente la cantidad de veces de prepara alimento en la cocina. de esta forma ahorrará hasta 150 litros en la semana","Verifique si es posible preparar los alimentos con anticipación - en menos eventos- y conservalos en el refrigerador para su consumo posterior","El desperdicio de agua en la cocina es muy alto supera los 120 litros diarios. Se recomienda priorizar eventos para reducir el uso de agua"],
				 ["","Seguramente programando cargas de ropa para lavar menos veces a la semana se logran mejoras importantes","La limpieza de la casa y el lavado de ropa se pueden realizar ahorrando agua: Junte varias cargas en una sola, procure limpiar con menos precuencia las áreas de poco uso en el hogar","La lavadora utiliza más de 200 litros por cada tanda de lavado, es recomendable que adquiera una lavadora de bajo consumo de agua esto es de: carga frontal y con reuso de agua. Utilice periodos previos remojo para facilitar la limpieza de la ropa. Destine a lo más dos cubetas medianas para la limpieza del hogar."],
				 ["","El agua potable no debe usarse para lavar el patio, el auto o regar el jardín. Si insiste en ello se recomienda lavar el patio con el agua del enjuague de la lavadora, llevar el vehículo a un autolavado y regar el jardin al atardecer  cada tercer día  utilizando para ello una regadera manual en lugar de manguera.","El agua potable no debe usarse para lavar el patio, el auto o regar el jardín. Si insiste en ello se recomienda lavar el patio con el agua del enjuague de la lavadora, llevar el vehículo a un autolavado y regar el jardin cada tercer día al atardecer utilizando para ello una regadera manual en lugar de manguera.","El agua potable no debe usarse para lavar el patio, el auto o regar el jardín. Si insiste en ello se recomienda lavar el patio con el agua del enjuague de la lavadora, llevar el vehículo a un autolavado y regar el jardin  cada tercer día  al atardecer utilizando para ello una regadera manual en lugar de manguera."],
				 ["","","","Adquiera un WC ahorrador de agua. Existen a precios muy económicos en el mercado y recucirá de 14 a 3.8 litros por descarga. Una sola descarga actual es suficiente para 4 descargas en los sanitarios modernos"],	
				]

function verifica(pregunta, min,max,msg){
	var texto = txtRespuestas[pregunta][1]
	if (msg ==true ){
		texto=$("#inputMulti").val();
		$("#inputMulti").val(texto.toUpperCase());
		texto=$("#inputMulti").val();
	}
	if (pregunta !=7){
		texto=texto.replace(/[^0-9]+/g,"");
	}
	$("#alertInput").text("");
	var resverif = "tdnegro";

	if((texto>max | texto <min) & pregunta != 0 & pregunta != 7){
		if(pregunta ==1){
			$("#alertInput").text("el valor esperado es de $" + min + " a $" + max);
		}else{
			$("#alertInput").text("el valor esperado es de " + min + " a " + max);	
		}
		
		resverif = "tdrojo";
	}
	if (pregunta == 0 & texto.replace(/[^0-9]+/g, "").length !=5 ){
		$("#alertInput").text("Se requieren 5 números. ");
		resverif = "tdrojo";
	}
	if (pregunta == 0 & texto.replace(/[^0-9]+/g, "").length ==5 ){
		var cpbuscado = texto.replace(/[^0-9]+/g, "");
		var coloniasCP = colCDMX[0].features.map(function(x){ if (x.properties.POSTALCODE ==cpbuscado) {return [x.properties.SETT_NAME,x.properties.IALTO,x.properties.IMEDIO,x.properties.IBAJO,x.properties.IMBAJO]}}).clean(undefined)
		if (coloniasCP.length == 0){
			$("#alertInput").text("Código postal es inválido. ");
			resverif = "tdrojo";
		}
		if(resverif != "tdrojo"){
			var frec_tipomza = coloniasCP.reduce(function (r, a) {a.forEach(function (b, i) {r[i] = (r[i] || 0) + b;});return r;}, []);
			var modamza = ["Nada","Alto","Medio","Bajo","Popular"][frec_tipomza.indexOf(math.max(frec_tipomza.slice(1,5)))] 
			var pagoMin = vectorMinimos[frec_tipomza.indexOf(math.max(frec_tipomza.slice(1,5)))] 
			tarifaSinMedidorActiva= tarifaSinMedidor[frec_tipomza.indexOf(math.max(frec_tipomza.slice(1,5)))]

			txtContexto[1] = "<br>Rango $"+ pagoMin +" a $5,000 pesos. Si ignora el dato se utiliza tarifa fija $"+ tarifaSinMedidorActiva;
			txtTipoInput[1]='<input type="number" id="inputMulti" min="'+ pagoMin +'" max="5000" onkeyup="verifica(1,'+pagoMin+',5000,true)"><br><label><input type="checkbox" id="recAhorro" > Vivo en casa rentada / Ignoro cuanto se paga</label>',
			
			console.log(modamza + " Pago min $" + pagoMin + "Tarifa no sabe " + tarifaSinMedidorActiva);
		}
	}
	if (pregunta == 7 & texto.toUpperCase() != 'SI' & texto.toUpperCase() != 'NO' ){
		$("#alertInput").text("Responder SI o NO ");
		resverif = "tdrojo";
	}
	
	if ($("#alertInput").text().length > 0){
		resverif = "tdrojo";
	}

	if  (texto ==""){
			resverif = "tdrojo";		
		}

	if (msg== false){
		$("#alertInput").text("");	
	}

	return [pregunta, resverif];
		

}

function siguientePreg(){
	$("#grad2").hide(); //oculta el panel de respuestas
	$("#alertInput").text(""); //elimina la alerta
	var texto= $("#preguntas").text() //guarda la pregunta
	var idxACT =txtCuestionario.indexOf(texto); //identifica el indice de la pregunta
	
	if (idxACT==1){ 
		var optchecked= $("#recAhorro").is(":checked") 
		//caso especial cuando no se conoce importe pago agua
		if (optchecked==true){$("#inputMulti").val(tarifaSinMedidorActiva);}
	};
	txtRespuestas[idxACT][1]=$("#inputMulti").val(); //almacena la respuesta
	if ( idxACT ==1 | (idxACT >=3 & idxACT < 6)){
		txtRespuestas[idxACT][2]=$("#recAhorro").is(":checked");
	}
	var SINO = ""
	if (idxACT == txtCuestionario.length -1){
		idxACT= -1;
	}

	$("#areaInput").empty();
	$("#preguntas").text(txtCuestionario[idxACT+1]);
	$("#contexto").html(txtContexto[idxACT+1]);
	$("#areaInput").append(txtTipoInput[idxACT+1])
	$("#inputMulti").val(txtRespuestas[idxACT+1][1])
	if (((idxACT + 1) ==1 | ((idxACT+1) >=3  & (idxACT+1) < 6)) & txtRespuestas[idxACT +1][2] ==true ){
		$("#recAhorro").prop('checked', true);
	}

	$("#Respuestas").empty();
	if (idxACT ==0 | idxACT == 3 | idxACT == 5 | idxACT == 6){
		$("#Respuestas").append('<img id = "imgIcon" class="espe" src="" height="150">')	
	}else{
		$("#Respuestas").append('<img id = "imgIcon" src="" height="200">')	
	}
	
	$("#imgIcon").attr('src','img/'+txtIconos[idxACT+1]);
	

	//$("#Respuestas").append(array2table(txtRespuestas))

}

/// ya no se usa esta funcion ???? verificar
function mostrarRespuestas2(){
$("#grad2").parent().css({position: 'relative'});
/*$("#grad2").css({top: ($("#grad").position().top + ($("#grad").height() * 1.2)), 
	             left: $("#grad").position().left, position:'absolute',
	             height: $("#grad").height(),
	             width: $("#grad").width()

	         });*/
}



function mostrarRespuestas(){
incompleto=false;
cssAtr=[verifica(0,1000,16910,false)[1],
		verifica(1,30,50000,false)[1],
		verifica(2,1,10,false)[1] ,
		verifica(3,0,100,false)[1],
		verifica(4,0,21,false)[1],
		verifica(5,0,14,false)[1],
		verifica(6,0,30,false)[1],
		verifica(7,0,30,false)[1]]
cssAtr.map(function (vd){var slr="";if(vd=='tdrojo'){incompleto=true;slr="Falta"};return slr;})

	$("#Respuestas").empty();
	var titResp= "<h5 class= 'magenta2'>Información proporcionada . . .</h5><p>Cambia las respuestas visualizando la pregunta deseada</p> "
	//var valores = "<table class= 'respues'>" + txtRespuestas.map(function(z){return "<tr>" + z.map(function(ss){return "<td class='res'>" + ss + "</td>"}) +"</tr>"}).toString().replace(/,/g,'') + "</table>"
	var valores = "<table class= 'respues'>" + txtRespuestas.map(function(z,i){return "<tr>" + "<td class=' " + cssAtr[i] + "'>" + z[0] +  "</td>"  +"<td class='res'>" + z[1] + (i>=3 & i<6 ?  (txtRespuestas[i][2] == true ? " c/ahorro " : "") : "") +  "</td>" +"</tr>"}).toString().replace(/,/g,'').replace(/undefined/g,'') + "</table>"
	$("#Respuestas").append(titResp+valores)

}
//

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


function selecColor(pregunta){
	var texto = txtRespuestas[pregunta][1];
	var rango = txtRangos[pregunta-3][1]

	if (pregunta == 3 & txtRespuestas[3][2] == true ){
		texto = texto * 0.4
	}
	if (pregunta == 4 & txtRespuestas[3][2] == true ){
		texto = texto * 0.5
	}
	if (pregunta == 5 & txtRespuestas[3][2] == true ){
		texto = texto * 0.75
	}


	var objeto = txtRangos[pregunta-3][0]
	var color = texto <= rango[0] ? colorCalif[0] : (texto <= rango[1] ? colorCalif[1] : (texto <= rango[2] ? colorCalif[2] : colorCalif[3]  ))
	$(objeto).css("background-color",color);

	finCalfin[pregunta-3] = texto <= rango[0] ? numColorCalif[0] : (texto <= rango[1] ? numColorCalif[1] : (texto <= rango[2] ? numColorCalif[2] : numColorCalif[3]  ))
		
}

function calificaRespuestas(){
	$("#grad2").show();
	mostrarRespuestas();
	if (incompleto==true){
		$("#grad2").hide()
		alert("Es necesario responder las 8 preguntas para tener una evauación");
		return;
	}
/*$("#grad2").parent().css({position: 'relative'});
$("#grad2").css({top: $("#grad").position().top , 
	             left: $("#grad").position().left, position:'absolute',
	             height: $("#grad").height(),
	             width: $("#grad").width()

	         });*/


	var coloniasCP = colCDMX[0].features.map(function(x){ if (x.properties.POSTALCODE == txtRespuestas[0][1]) {return [x.properties.SETT_NAME,x.properties.IALTO,x.properties.IMEDIO,x.properties.IBAJO,x.properties.IMBAJO]}}).clean(undefined)
	var delegacionesCP = colCDMX[0].features.map(function(x){ if (x.properties.POSTALCODE == txtRespuestas[0][1]) {return [x.properties.MUN_NAME,x.properties.CVE_MUN, x.properties.COLOUR]}}).clean(undefined)
	
	var frec_tipomza = coloniasCP.reduce(function (r, a) {a.forEach(function (b, i) {r[i] = (r[i] || 0) + b;});return r;}, []);
	var modamza = ["Nada","Alto","Medio","Bajo","Popular"][frec_tipomza.indexOf(math.max(frec_tipomza.slice(1,5)))] 

	var dispo= colCDMX[0].features.map(function(x){ if (x.properties.POSTALCODE == txtRespuestas[0][1]) {return x.properties.COLOR}}).clean(undefined)
	var frec_disp = {};
	for (var i = 0; i < dispo.length; i++) {frec_disp[dispo[i]] = 1 + (frec_disp[dispo[i]] || 0);}
	var modadisp_CP = Object.keys(frec_disp).reduce(function(a, b){ return frec_disp[a] > frec_disp[b] ? a : b });
	// columna que debe tomarse para ponderar numero de dias que usa regadera
	// la idea es que la disponibilidad influye  en la frecuencia y cantidad de uso de agua.
	var Index_modadis = disponibilidad.indexOf(modadisp_CP);   
	var Const_disp= [60.8,55,50,45][Index_modadis];
	$("#imgcalif").attr('src','img/A'+delegacionesCP[0][1]+'.png')
	$("#titEval").html(  "<h3 class ='grisLink'>CP: "+ txtRespuestas[0][1] +". "  +delegacionesCP[0][0] +"</h3>" + 
	"<h4>Tarifa para cobro de agua :  " +  modamza + "</h4>"+
	 "<p>Colonia(s) " + coloniasCP.map(function(x){return x[0]}).toString().replace(/,/g,', -- ')+ "</p>" )

	$("#imgFAC1").css("background-color",delegacionesCP[0][2]);
	$("#descFAC1").html("Nivel de disponibilidad de agua identificado: " + disponibilidad[Index_modadis] +  "  "  + disponibilidadDesc[Index_modadis]  )

	
	//litros por bimestre optimos considerando el # de personas
	txtEvaluacion[0][1]=math.floor(txtRespuestas[2][1] * consumooptimo * 60.8);
	//litros por bimestre ponderados por disponibilidad considerando el # de personas
	txtEvaluacion[1][1]=math.floor(txtRespuestas[2][1] * consumooptimo * Const_disp);

	//litros a los que corresponde el pago bimestral
	// estimando el tipo de manzana igual a la moda de tipo de manzana en el CP
	txtEvaluacion[2][1]=math.floor(MNTtpH20(txtRespuestas[1][1], modamza )[3]);
	
	// aplicando constante de disponibilidad
	//litros consumidos durante la regadera al bimestre por todos los miembros de la casa 
	txtEvaluacion[3][1]=math.floor(txtRespuestas[3][1]*  txtRangos[3-3][2] * txtRespuestas[2][1] * Const_disp * (txtRespuestas[3][2] ==true ? 0.4 : 1) );
	//litros consumidos para cocinar al mes  
	txtEvaluacion[4][1]=math.floor(txtRespuestas[4][1]*  txtRangos[4-3][2]  * (Const_disp / 60.8) * 4.3 * 2 * (txtRespuestas[3][2] ==true ? 0.5 : 1) );
	//litros consumidos para lavado de ropa y aseo del hogar al bimestre  
	txtEvaluacion[5][1]=math.floor(txtRespuestas[5][1]* txtRangos[5-3][2]  * (Const_disp / 60.8) * 4.3 * 2 * (txtRespuestas[3][2] ==true ? 0.75 : 1) );
	//litros consumidos para lavado patio / auto regar jardin del hogar al bimestre  
	txtEvaluacion[6][1]=math.floor(txtRespuestas[6][1]* txtRangos[6-3][2]  * (Const_disp / 60.8) * 2);
	//litros consumidos para WC al bimestre se asume que cada persona va al baño entre 1 y 2 veces al día
	txtEvaluacion[7][1]= math.floor(txtRespuestas[2][1] *  (txtRespuestas[7][1] == "SI" ?  3.8 : 12) * 1.5 * Const_disp );
	txtEvaluacion[8][1] = txtEvaluacion.slice(3,8).reduce(function (r, a) {a.forEach(function (b, i) {r[i] = (r[i] || 0) + b;});return r;}, [])[1];

	var secuencia = [0,1,2,3]
	secuencia.map(function(z){selecColor(z+3)});
	$("#imgWC").css("background-color",  txtRespuestas[7][1]=="SI" ? colorCalif[0] : colorCalif[3] );
	finCalfin[4]  = txtRespuestas[7][1]=="SI" ? numColorCalif[0] : numColorCalif[3];

	console.log("los valores son: " )
	console.log(finCalfin )
	
	finCalfin[5] =  txtEvaluacion[8][1] > txtEvaluacion[0][1] * 1.3 ?  ( ((10-math.round((txtEvaluacion[8][1] / (txtEvaluacion[0][1] * 1.3) -1) * 10,1))/2) < 0 ?  0 : ((10-math.round((txtEvaluacion[8][1] / (txtEvaluacion[0][1] * 1.3) -1) * 10,1))/2) ) : 5;
	$("#califFin").text(math.round(math.sum(finCalfin),1));


	secuencia.map(function(z){ $(txtRangos[z][0].replace(/img/g,"por")).empty()})
	secuencia.map(function(z){ $(txtRangos[z][0].replace(/img/g,"por")).append("<p class= 'negro porcentaje'>" + math.round(txtEvaluacion[z+3][1] * 100 /  txtEvaluacion[8][1],1)  + "%</p>") })
	$("#porWC").empty();
	$("#porWC").append("<p class= 'negro porcentaje'>" + math.round(txtEvaluacion[7	][1]  * 100 /  txtEvaluacion[8][1],1)  + "%</p>");
	var consumopercapita= (txtEvaluacion[8][1]/(txtRespuestas[2][1]*60.8)* 60.8/Const_disp);
	console.log(consumopercapita)
	

	$("#recomendaciones").empty();
	var recVSconsumo = txtEvaluacion[8][1] > txtEvaluacion[0][1] * 1.3 ? "<li>Tu consumo de agua excede al necesario en un <b>" + math.round((txtEvaluacion[8][1] / (txtEvaluacion[0][1] * 1.3) -1) * 100,1) + "%</b></li>" : ""
	var recVSdisponible = txtEvaluacion[8][1] > txtEvaluacion[1][1] * 1.3 ? "<li>Tu consumo de agua  rebasa en <b>" + math.round((txtEvaluacion[8][1] / (txtEvaluacion[1][1] * 1.3) -1) * 100,1) + "% el nivel agua que reciben tus vecinos en el la colonia.</b></li>": ""
	var recVSpagado = txtEvaluacion[8][1] > txtEvaluacion[2][1] * 1.3 ? "<li>Estás pagando menos que el agua que consumes en un  <b>" + math.round((txtEvaluacion[8][1] / (txtEvaluacion[2][1] * 1.3) -1) * 100,1) + "</b>%. Revisa si el medidor funciona correctamente o rectifica tus respuestas</li>": ( txtEvaluacion[8][1] < txtEvaluacion[2][1] * .8 ? "<li>Estás pagando más que el agua que consumes. Verifique:  <ul><li>a) Si no tiene medidor te están cobrando con una tarifa fija que supera el consumo, tramita su instalación.</li> <li>b) Si tienes medidor, posiblemente está fallando. Solicita la revisión y cambio.</li> <li>c) Posiblemente tengas una fuga de agua. Repárala </li></ul>" : "")
	$("#recomendaciones").append("<h4>Recomendaciones</h4><ul>"+recVSconsumo+ recVSdisponible+recVSpagado+"</ul>")
$("#Evaluacion").empty();

var valores = "<table>" + txtEvaluacion.map(function(z){return "<tr>" + z.map(function(ss){return "<td>" + ss + "</td>"}) +"</tr>"}).toString().replace(/,/g,'') + "</table>"
var valores ="";
$("#Evaluacion").append(valores)
verMapaDelegacion(delegacionesCP[0][1],false)


var colviv=colCDMX[0].features.map(function(x){ return x.properties.vivtot}).clean(undefined);

cortesqtl(colviv)


}


function muestraResumenCalif(){
	$("#recomendacionEspecifica").append(
  	  "<p class='negro recom'> La evaluación se realiza considerando dos elementos: a) Uso. ¿Qué tan responsable es usar el agua en nuestras actividades? y b) Nivel de consumo: ¿La cantidad de agua utilizada es la necesaria? </p><table class='califdetail' >"+
      "<tr><th> Componente </th><th>Ponderación </th><th>Valor</th></tr>"+	
      "<tr><td> <b> Usos del agua </b></td><td class='res'></td><td class='res'>"  + "</td></tr>"+
      "<tr><td> <li> Regadera : </li></td><td class='res'>10%</td><td class='res'>" + finCalfin[0].toFixed(2) + "</td></tr>"+
      "<tr><td> <li> Preparación de alimentos: </li></td><td class='res'>10%</td><td class='res'>" + finCalfin[1].toFixed(2) + "</td></tr>"+
      "<tr><td> <li> Lavado  de ropa / aseo del hogar: </li></td><td class='res'>10%</td><td class='res'>" + finCalfin[2].toFixed(2) + "</td></tr>"+
      "<tr><td> <li> Lavado de patio / auto - regar jardín: </li></td><td class='res'>10%</td><td class='res'>" + finCalfin[3].toFixed(2) + "</td></tr>"+
      "<tr><td> <li> Sanitario: </li></td><td class='res'>10%</td><td class='res'>" + finCalfin[4].toFixed(2) + "</td></tr>"+
      "<tr><td> <b>Subtotal Usos: </b></td><td class='res'><b>50%</b></td><td class='res'><b> " + (math.sum(finCalfin) - finCalfin[5]).toFixed(2) + "</b></td></tr>"+
      "<tr><td> <b>Volumen adecuado:</b></td><td class='res'><b>50%</b></td><td class='res'><b> " + finCalfin[5].toFixed(2) + "</b></td></tr>"+
      "<tr><td> <b>Evaluación: </b></td><td></td><td class='res'><b>" + math.sum(finCalfin).toFixed(2) + "</b></td></tr></table>"
      );

}


function verMapaDelegacion(clave,dens){

		$("#imginfo").attr('src','img/A'+clave+'.png');
		JavaScript.load('data/mzaCDMX'+ clave +'.geojson.js',function() {console.log("verMapaDelegacion call vistaMzaDel " + clave );vistaMzaDel(clave,dens);});

}



function muestraRecomenEpecif(pregunta,coloracion){


	var textorec=recomespec[pregunta][colorCalif.indexOf(rgb2hex(coloracion).toUpperCase())]
	$("#recomendacionEspecifica").append("<p class='negro recom'>"+textorec +"</p>")
}


function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}


function sortNumber(a,b) {
    return Number(a) - Number(b);
}



function quantile(array, percentile) {
    array.sort(sortNumber);
    index = percentile/100.0 * (array.length-1);
    if (Math.floor(index) == index) {
    	result = Number(array[index]);
    } else {
        i = Math.floor(index)
        fraction = index - i;
        result = Number(array[i]) + (Number(array[i+1]) - Number(array[i])) * fraction;
    }
    return result;
}

function logArrayElements(element, index, array) {
    console.log(element + " --> " + quantile(data, element));
}

///uso [0, 25, 33, 50, 66, 75, 100].forEach(logArrayElements);
/// estos numeros representan pe 25 = 1er cuartil 50 mediana
/// 75 3er cuartil  97 es para el corte muy alto

function cortesqtl(data){
	var c1= quantile(data, 97);
	var c2= quantile(data, 75);
	var c3= quantile(data, 50);
	var c4= quantile(data, 25);
	var cortes = [c1,c2,c3,c4];
	return cortes;
};




/*
Usuarios 2,150,000 
100 mil usuarios de cuota fija
coondonados tandeo 

empresas concesionarias 4 en la ciudad
ellas pagan los flyers 
todo pasa por verificaciòn de contenidos
comuniciacion social imagen del gobierno
son 11 mil trbajadores

dos partes
parte operativa
parte comercial CRM emision facuracion cobranza

paga cartas invitación 
imagen istitucional
volantes
boletas

hidroarte bocetos cultura del arte (comex y convers)
pintan los murales y le aplican barniz antigrafiti


casi no se usa foto ya que piden derechos ...


Ciudad Abierta ...

Seminario de Ciencia de Datos para la Ciudad

Academia Sociedad civil y gobierno

Concurso Código para la ciudad

crear plataforma en linea 

consumo de agua responsable 

apoyar en los pagos  

Encuentro de gobierno abierto 7 y 8 de diciembre

ENEAS organismos operadores de agua en el pais ...

poblacion objetivo mijeres 50 + socioeconomico c- e





*/

