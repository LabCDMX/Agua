
var pregActiva =0;  //pregunta activa
var arrVals =0;   // variable en la que se cargará el array con opciones posibles de colonias
var arrVals2 =0;  //variable en la que se cargarán las opciones posibles de códigos postales

var dom_asentamientos="";
var mpo_actual="";    // municipio o delecgacion activo	clave inegi			
var mpo_actual_desc="";  //Nombre del municipio o delegacion activo 
var dom_consumoProm="";  //consumo promedio en litros 
var dom_indicePago="";   //indice de pago (porcentaje de cumplimiento en el pago de agua)
var dom_facturaProm="";  //importe promedio que se factura en pesos
var consumooptimo = 130.69; // http://www.cuidarelagua.cdmx.gob.mx/tips.html
// identificacion de colonias con consumo promedio inferior al esperado
///  "POBTOT" / "VIVTOT"  * 130.69  * 60.8 <  "DCONPRO" * 1000
var listaimg=[,,,'regaderab.png','cocinab.png','ropab.png','casab.png','patiob.png','autob.png','jardinb.png','WCb.png','agua.png']


//variales de referencia en colonia
var propLAV = 0; // % de hogares con lavadora de ropa
var PropWC =  0; //% de hogares con servicios de WC
var idxCUMD	= 0; // indice de cumplimiento en pago de servicios de agua Doméstico
var idxCUMND = 0; // indice de cumplimiento en pago de servicios de agua NO doméstico 
var idxCUMM	= 0;  // indice de cumplimiento en pago de servicios de agua Mixto
var conProD	= 0; // consumo promedio litros servicios de agua Doméstico
var conProND= 0;// consumo promedio litros servicios de agua NO Doméstico
var conProM	= 0; // consumo promedio litros servicios de agua Mixto
var tamFam = 0;  //Numero de habitantes pormedio por hogar
var munSelec = 0;  //Nombre del Municipio al que corresponde la información
var asentSelec = 0; //nombre de la colonia o asentamiento al que corresponde la información
var cpSelec = 0; //código postal al que corresponde la informacion
var muncveSelec= 0; //clave inegi del municipio al que corresponde la información


var mySlider = ""
// colores
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


/// COORDENADAS 
var coordenada_x = 0;
var coordenada_y = 0;
var coordenada_xwsg84 = 0;
var coordenada_ywsg84 = 0;

// bordes de CDMX 
var bordeW=  -99.3649242002;  //OESTE
var bordeS= 19.0482366605;    //SUR
var bordeE=  -98.9403028204;  //ESTE
var bordeN=  19.5927572802;   //NORTE
var r_earth= 6335.439;      //RADIO TERRESTRE
var factX=-700;   //FACTOR DE AJUSTE SOBRE COORDENADA X DEL RECIBO
var factY=1600;   //FACTOR DE AJUSTE SOBRE COORDENADA Y DEL RECIBO
var mzaCDMX="";

var contained = [];
var disponibilidad = ["verde","amarillo","naranja","rojo"];
var disponibilidadDesc = ["Suministro garantizado","Abasto suficiente","Desabasto frecuente","Escacez permanente"];
var demandaDesc = ["Hasta de 300 viviendas","De 301 hasta 707 viviendas","De 708 hasta 1559 viviendas","Más de 1559 viviendas"];
var demandaDesc = ["Densidad habitacional escasa","Densidad habitacional baja","Densidad habitacional media","Densidad habitacional alta"];
var delelgaciones =["ÁLVARO OBREGÓN","AZCAPOTZALCO","BENITO JUÁREZ","COYOACÁN","CUAJIMALPA DE MORELOS","CUAUHTÉMOC","GUSTAVO A MADERO","IZTACALCO","IZTAPALAPA","MAGDALENA CONTRERAS","MIGUEL HIDALGO","MILPA ALTA","TLÁHUAC","TLALPAN","VENUSTIANO CARRANZA","XOCHIMILCO"]
var abrev =["A.OBREGON","AZCAPOTZALCO","B.JUAREZ","COYOACAN","CUAJIMALPA","CUAUHTEMOC","G.A.MADERO","IZTACALCO","IZTAPALAPA","M.CONTRERAS","M.HGO","M.ALTA","TLAHUAC","TLALPAN","V.CARRANZA","XOCHIMILCO","CDMX"]
var trCP_del=["010","002","014","003","004","015","005","006","007","008","016","009","011","012","017","013","000"];
var disponibilidadMPO =["yellow","yellow","yellow","yellow","red","yellow","yellow","orange","orange","red","yellow","red","red","orange","orange","orange"];
var actMPO="";
var actCOL="";
var actFAC="";
var actTONO="";
var actCP="";

var tarifaSinMedidorActiva= 102.72;
var incompleto=false; 
var cssAtr=["","","","","","","",""];
// VERIFICADO constantes para generar importe base de acuerdo a rangos  
var tarifaBase = [  [1,0,15000,472.55,0.913047,0.901435,0.673894,0.608698],
					[2,15000,20000,472.55,0.913047,0.901435,0.673894,0.608698],
					[3,20000,30000,630.06,0.906533,0.863044,0.59784,0.541391],
					[4,30000,40000,945.07,0.878009,0.795554,0.501877,0.44808],
					[5,40000,50000,1260.11,0.817127,0.726381,0.422205,0.366939],
					[6,50000,70000,1575.13,0.747027,0.646083,0.361712,0.306309],
					[7,70000,90000,2342.15,0.61616,0.53222,0.30887,0.263584],
					[8,90000,120000,3177.67,0.517412,0.448148,0.23198,0.198601],
					[9,120000,1200000000,4841.8,0.343726,0.298268,0.156397,0.134491]];

//VERIFICADO Tarifas minimas que se cobran por tipo de consumo
var vectorMinimos= [0,
					Math.round(tarifaBase[0][3]*(1-tarifaBase[0][7]),0),
					Math.round(tarifaBase[0][3]*(1-tarifaBase[0][6]),0),
					Math.round(tarifaBase[0][3]*(1-tarifaBase[0][5]),0),
					Math.round(tarifaBase[0][3]*(1-tarifaBase[0][4]),0)]


//VERIFICADO Constantes para el cobro de metros cubicos adicionales excedentes a la base 
var tarifaAdic = [ [1,0,15000,0,0,0,0,0],
					[2,15000,20000,31.51,0.886982,0.747855,0.369638,0.339426],
					[3,20000,30000,31.51,0.820962,0.660574,0.309959,0.26147],
					[4,30000,40000,31.51,0.634465,0.518836,0.183141,0.123461],
					[5,40000,50000,31.51,0.466617,0.324879,0.119731,0.063782],
					[6,50000,70000,38.34,0.347426,0.298407,0.200368,0.175858],
					[7,70000,90000,41.77,0.240506,0.212377,0.016315,0.016315],
					[8,90000,120000,55.47,0.012074,0.012074,0.012074,0.012074],
					[9,120000,,86.29,0,0,0,0]];

//VERIFICADO constantes que se pagan cuando no hay medidor en servicio residencial
var tarifaSinMedidor = [0,706,412,163,103]


//VERIFICADO evalua si un numero esta dentro de un array
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

// VERIFICADO es una funcion que simplemente se llama cuando se ha cncluido la carga de un js
function avisaloaded(parametro){
	console.log(parametro + " cargado...")
}        

//VERIFICADO funcion que evalua el importe a pagar a partir de los llitros consumidos y el tipo de manzana
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


//VERIFICADO calcula el volumen de agua al que corresponde un pago que se realiza en un tipo de manzana
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



//VERIFICADO calcula la latitud en WSG084 a la que corresponde la latitud del recibo de agua
function new_latitude  (latitude,dy){
	return latitude  + (dy / r_earth) * (180 / math.pi);
};
//VERIFICADO calcula la longitud en WSG084 a la que corresponde la latitud del recibo de agua
function new_longitude (longitude,latitude,dx){
	return longitude + (dx / r_earth) * (180 / math.pi) / math.cos(latitude * math.pi/180);
}



//VERIFICADO separa las coordenadas a partir del numero de cuenta  y las almacena en las variables globales 
function recibo2coordendas(texto) {
    
    var texto2 = texto.replace(/[^0-9]+/g, "");
    coordenada_x= texto2.substring(0,2) + texto2.substring(4,7);
    coordenada_y= texto2.substring(2,4) + texto2.substring(7,10); 
    coordenada_ywsg84= new_latitude(bordeS,(coordenada_y-factY)/1000);
    oordenada_xwsg84= new_longitude(bordeW,bordeS,(coordenada_x-factX)/1000);
    return  [coordenada_ywsg84,oordenada_xwsg84];
};



//VERIFICADO evalua a que municipio corresponde una coordenada
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
	return [localizado,actMPO,dentro] ;
}


//VERIFICADO Indica dentro de cual poligono de Colonia / Código Postal se encuentra una coordenada (lon-lat)



function whichPolygonCodPos(x,y){
	var CodPos = "00000";
	var Asentamiento = "";
	var Delegacion = "";
	var poly = colCDMX[0].features[0].geometry.coordinates[0];
	var localizado = "00000";
	var propiedades =colCDMX[0].features[0].properties;
	var salida="";
	var dentro = false;
	for( var ii =0; ii < colCDMX[0].features.length ; ii++){
		if (dentro == false){
			propiedades=colCDMX[0].features[ii].properties;
			CodPos = colCDMX[0].features[ii].properties.D_CP;
			Asentamiento = colCDMX[0].features[ii].properties.D_ASENTA2;
			Delegacion = colCDMX[0].features[ii].properties.MUN_NAME;
			poly = colCDMX[0].features[ii].geometry.coordinates[0][0];
			dentro = isPointInsidePolygon(x,y, poly);
			console.log(dentro);
		};
		if (dentro == true){
			salida = propiedades
			actCP = CodPos;
			actCOL = Asentamiento;
			actMPO = Delegacion;
		};
	};
	return salida ;
}

//VERIFICADO indica si un punto esta dentro de un poligono
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






// VERIFICADO variable que gerera un script y deriva a una funccion callback al ternimar la creacion
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


/// VERIFICADO esta funcion es comlementaria de la anterior y asegura la carga completa de json esperando 
///            el fin de la carga del script
jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}



// VERIFICADO Función inicial que prepara los objetos que presentan informaciòn goespacial (mapa leaflet)
function initmapas(){
	// centroide CDMX 
    mapas = new L.map('mapas',{zoomSnap: 0.125,zoomControl: true }).setView(new L.LatLng(19.353890, -99.138817),9.8);
    mapas.scrollWheelZoom.disable(); // sin mouse o pad wheel zoom
    //mapas.dragging.disable(); // sin drah event
    mapas.touchZoom.disable(); 
    mapas.doubleClickZoom.disable();
    mapas.scrollWheelZoom.disable(); // sin mouse o pad wheel zoom
    // provvedor cartografivo
	var orl= L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
	maxZoom: 20//,
		//attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
     // otro provvedor cartografivo
	OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
		maxZoom: 20,
		attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
    // aqui se carga uno de los dos los proveedores cartograficos (a veces no estan disponibles)
	mapas.addLayer(OpenStreetMap_France);
	//mapas.addLayer(orl);

    /// carga del poligono CDMX 
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
	// carga poligonos de municipios / delelgaciones	
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
	// carga polígonos de colonias
	geojsonCOLCDMX =L.geoJson(colCDMX, {
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
	// zoom al layer del poligono CDMX
    mapas.fitBounds(geojsonCDMX.getBounds());

}

//VERIFICADO  ajusta mapas de acuerdo a la colonia seleccionada
function muestramap(coloniaLong,largo){
	console.log("ando por :" + coloniaLong);
	actCOL = ""
	if( mapas.hasLayer(geojsonCOLCDMX)){
		mapas.removeLayer(geojsonCOLCDMX);
	}	 


	geojsonCOLCDMX =L.geoJson(colCDMX, {

	        style: function (feature) {
		            return { 
		            	color: "#000000",
		            	fillColor: 'blue',
		            	weight: 3,
		            	fill: true,
		            	opacity: 0.6,
		            	fillOpacity: 0.3,
		            	clickable: false 
		            };
	        },
		    onEachFeature(feature, layer) {
		    layer.on({
		        mouseover: //highlightFeatureR,
		          function (layer){
		          	var layerM = layer.target
		        	layerM.setStyle({
				        color: '#9999ff',
				        weight: 2,
				        fillColor: 'crimson',
				        opacity : 1,
				        fillOpacity: 0.2,
				        clickable: true 
				    });

		        },

		        mouseout: //resetHighlightBR,
		          function (layer){
		        			var layerM = layer.target
						        layerM.setStyle({
				            	color: "#000000",
				            	fillColor: 'blue',
				            	weight: 3,
				            	fill: true,
				            	opacity: 0.6,
				            	fillOpacity: 0.3,
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
		    	var llaves= feature.properties.D_ASENTA2 + " -" + feature.properties.MUN_NAME + "- " +feature.properties.D_CP;
		    	if (largo == false){
		    		llaves = feature.properties.D_CP;
		    	};
		        if ( llaves=== coloniaLong){
		        	propLAV = (feature.properties.VPH_LAVAD/feature.properties.VIVTOT); 
		        	PropWC =  (feature.properties.VPH_EXCSA/feature.properties.VIVTOT); 
	        		idxCUMD	= feature.properties.DIDXCUM;
					idxCUMND	= feature.properties.NDIDXCUM;
					idxCUMM	= feature.properties.MIDXCUM;
	        		conProD	= feature.properties.DCONPRO;
					conProND	= feature.properties.NDCONPRO;
					conProM	= feature.properties.MCONPRO;
					tamFam = (feature.properties.POBTOT/feature.properties.VIVTOT);
					munSelec = feature.properties.MUN_NAME;
					muncveSelec = feature.properties.CVE_MUN;
					asentSelec = feature.properties.D_ASENTA;
					cpSelec = feature.properties.D_CP;
					generaRefCOL()
		        	
		        	return true;
		        };
		    }
		
	}).addTo(mapas);

	mapas.fitBounds(geojsonCOLCDMX.getBounds());
	$("#imgMun").attr('src','img/A'+muncveSelec+'.png');
	
}


/// VERIFICADO despues de la carga del mapa genera la visualizacion de datos referenciados a la 
///            colonia, delegacion y CDMX
function generaRefCOL(){
	$("#valorRefCOL").empty()
		var refCDMX= emision_referencia.map(function(x){if(x[0]=='000'){return x} }).clean(undefined);
		var refDELE= emision_referencia.map(function(x){if(x[0]==muncveSelec){return x} }).clean(undefined);
		matrixRef=[ [ parseFloat(Math.round(tamFam * 100) / 100).toFixed(1), math.round(refDELE[0][20]/refDELE[0][21],1), math.round(refCDMX[0][20]/refCDMX[0][21],1) ],
					[ parseFloat(Math.round(propLAV * 10000) / 100).toFixed(1) ,math.round(refDELE[0][23]*100/refDELE[0][21],1) , math.round(refCDMX[0][23]*100/refCDMX[0][21],1)],
					[ parseFloat(Math.round(PropWC * 10000) / 100).toFixed(1)  , math.round(refDELE[0][24]*100/refDELE[0][21],1) , math.round(refCDMX[0][24]*100/refCDMX[0][21],1) ],
					[ parseFloat(Math.round(idxCUMD * 10000) / 100).toFixed(1)  , math.round(refDELE[0][4]*100,1) , math.round(refCDMX[0][4]*100,1)  ],
					[ parseFloat(Math.round(idxCUMND * 10000) / 100).toFixed(1) ,math.round(refDELE[0][16]*100,1) , math.round(refCDMX[0][16]*100,1) ],
					[ parseFloat(Math.round(idxCUMM * 10000) / 100).toFixed(1)   ,math.round(refDELE[0][10]*100,1) , math.round(refCDMX[0][10]*100,1) ],
					[ Math.round(conProD * 1000,0) ,  math.round(refDELE[0][5]*1000,0),   math.round(refCDMX[0][5]*1000,0) ],
					[ Math.round(conProND * 1000,0) , math.round(refDELE[0][17]*1000,0) , math.round(refCDMX[0][17]*1000,0) ],
					[ Math.round(conProM * 1000,0) , math.round(refDELE[0][11]*1000,0) , math.round(refCDMX[0][11]*1000,0)   ]
					]
		console.log(refDELE)
		var anchos = '<col style="width:10%"><col style="width:30%"><col style="width:20%"><col style="width:20%"><col style="width:20%">'
		var titulo = "<h4>" +  asentSelec + ", " + munSelec + "</h4>" + "<span><h6>(" + cpSelec + ")</h6></span>"
		var encabezados1 = "<tr><th></th><th>Numeralia</th><th class='toR'>Tu colonia</th><th class='toR'>La Delegación</th> <th class='toR'>Nuestra <br> Ciudad</th></tr>"
		var encabezados2 = "<tr><th></th><th>¿Quién si paga?</th><th class='toR'>Tu colonia</th><th class='toR'>la Delegación</th> <th class='toR'>Nuestra <br> Ciudad</th></tr>"
		var encabezados3 = "<tr><th></th><th>¿Dónde se consume agua?</th><th class='toR'>Tu colonia</th><th class='toR'>la Delegación</th> <th class='toR'>Nuestra <br> Ciudad</th></tr>"
		var arregoRefCOL= [
		["<img src= 'img/people.png' class='imgi'>","Habitantes promedio por vivienda: " , matrixRef[0][0]   ,  matrixRef[0][1],    matrixRef[0][2]     ],
		["<img src= 'img/lavadora.png' class='imgi'>","Hogares con lavadora de ropa: " ,   matrixRef[1][0] +"%",matrixRef[1][1]+"%",matrixRef[1][2]+"%" ],
		["<img src= 'img/instsanit.png' class='imgi'>","Hogares con instalaciones sanitarias: " ,  matrixRef[2][0] +"%",matrixRef[2][1]+"%",matrixRef[2][2]+"%" ],
		
		["<img src= 'img/domestico.png' class='imgip'>","Doméstico: " ,  matrixRef[3][0] +"%",matrixRef[3][1]+"%",matrixRef[3][2]+"%" ],
		["<img src= 'img/establec.png' class='imgip'>","No doméstico -negocios- : " ,   matrixRef[4][0] +"%",matrixRef[4][1]+"%",matrixRef[4][2]+"%" ],
		["<img src= 'img/mixto2.png' class='imgip '>","Mixto. <br>Hogares con accesoria" , 	 matrixRef[5][0] +"%",matrixRef[5][1]+"%",matrixRef[5][2]+"%" ],

		["<img src= 'img/domestico.png' class='imgic'>","Consumo doméstico: " ,  matrixRef[6][0].toLocaleString() ,matrixRef[6][1].toLocaleString() , matrixRef[6][2].toLocaleString() ],
		["<img src= 'img/establec.png' class='imgic'>","No doméstico -negocios- : " , matrixRef[7][0].toLocaleString() ,matrixRef[7][1].toLocaleString() , matrixRef[7][2].toLocaleString() ],
		["<img src= 'img/mixto2.png' class='imgic'>","Mixto: " , matrixRef[8][0].toLocaleString() ,matrixRef[8][1].toLocaleString() , matrixRef[8][2].toLocaleString()   ]
		];

var titResp= "<h5 class= 'magenta2'>Tu colonia .... la delegación ... nuestra ciudad.</h5>" + titulo
console.log(arregoRefCOL)

var numeralia = "<table class='p400'>" + anchos + encabezados1 + arregoRefCOL.slice(0, 3).map(function(z){  return "<tr>" + z.map(function(ss,i){ if(i<2){var classname=""; }else{var classname=" class ='toR' ";}; return "<td "+ classname + ">" + ss + "</td>"}) +"</tr>"}).toString().replace(/,</g,'<') + "</table>"
var quienpaga = "<table class='p400'>" + anchos + encabezados2 + arregoRefCOL.slice(3, 6).map(function(z){  return "<tr>" + z.map(function(ss,i){ if(i<2){var classname=""; }else{var classname=" class ='toR' ";}; return "<td "+ classname + ">" + ss + "</td>"}) +"</tr>"}).toString().replace(/,</g,'<') + "</table>"
var quiengasta = "<table class='p400'>" + anchos + encabezados3 + arregoRefCOL.slice(6, 9).map(function(z){ return "<tr>" + z.map(function(ss,i){ if(i<2){var classname=""; }else{var classname=" class ='toR' ";}; return "<td "+ classname + ">" + ss + "</td>"}) +"</tr>"}).toString().replace(/,</g,'<') + "</table>"
console.log(quiengasta)
$("#valorRefCOL").append(titResp )
$("#valorRefCOL").append(numeralia)
$("#valorRefCOL").append("<h5>Cumplimiento en el pago del agua de acuerdo al tipo de uso </h5>")
$("#valorRefCOL").append(quienpaga)
$("#valorRefCOL").append("<h5>Volumen de agua bimestral promedio -litros- por tipo de uso</h5>")
$("#valorRefCOL").append(quiengasta)

generaPlotRef(matrixRef)

}


function generaPlotRef(matrixRefe){

var trdat00=matrixRefe[0]
var trdat01=matrixRefe[1]
var trdat02=matrixRefe[2]
var trdat03=emision_referencia.map(function(x){return math.round(x[4],4) })
var trdat04=emision_referencia.map(function(x){return math.round(x[16],4) })
var trdat05=emision_referencia.map(function(x){return math.round(x[10],4) })

var trdat06=emision_referencia.map(function(x){return math.round(x[5],4) })
var trdat07=emision_referencia.map(function(x){return math.round(x[17],4) })
var trdat08=emision_referencia.map(function(x){return math.round(x[11],4) })




var vecdeleg= emision_referencia.map(function(x){var dtl =abrev[trCP_del.indexOf(x[0])] ; if(x[0]==muncveSelec){ dtl ='<b>'+ abrev[trCP_del.indexOf(x[0])] +'</b>'}; return dtl;}) 

//vecdeleg= [1,2,3,4,5,6,7,8,9,10,11,2,13,14,15,16,17];


var trace3 = {
  name: "Doméstico",
  hoverinfo: 'y -  x',
  y: vecdeleg,
  x: trdat03,
  //text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
  mode: 'markers',
  marker: {
    size:  trdat03.map( function(x){ return x * 50 + (( x- math.min(trdat03)) * 600/(math.max(trdat03)-math.min(trdat03)))}),
    sizemode: 'area'
  }
};

var trace4 = {
name: "No Doméstico",
hoverinfo: 'y - x',
  y: vecdeleg,
  x: trdat04,
  //text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
  mode: 'markers',
  marker: {
    size: trdat04.map( function(x){ return x * 50 + (( x- math.min(trdat04)) * 600/(math.max(trdat04)-math.min(trdat04)))}),
    sizemode: 'area'
  }
};

var trace5 = {
	name: "Mixto",
	hoverinfo: 'y - x',

  y: vecdeleg,
  x: trdat05,
  //text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
  mode: 'markers',
  marker: {
    size: trdat05.map( function(x){ return x * 50 + (( x- math.min(trdat05)) * 600/(math.max(trdat05)-math.min(trdat05)))}),
    sizemode: 'area'
  }
};


var trace6 = {
  name: "Doméstico",
  hoverinfo: 'y - x',
  y: vecdeleg,
  x: trdat06,
  //text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
  mode: 'markers',
  marker: {
    size:  trdat06.map( function(x){ return x  + (( x- math.min(trdat06)) * 100/(math.max(trdat06)-math.min(trdat06)))}),
    sizemode: 'area'
  }
};

var trace7 = {
name: "No Doméstico",
hoverinfo: 'y - x',
  y: vecdeleg,
  x: trdat07,
  //text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
  mode: 'markers',
  marker: {
    size: trdat07.map( function(x){ return x  + (( x- math.min(trdat07)) * 100/(math.max(trdat07)-math.min(trdat07)))}),
    sizemode: 'area'
  }
};

var trace8 = {
	name: "Mixto",
	hoverinfo: 'y - x',
  y: vecdeleg,
  x: trdat08,
  //text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
  mode: 'markers',
  marker: {
    size: trdat08.map( function(x){ return x  + (( x- math.min(trdat08)) * 100/(math.max(trdat08)-math.min(trdat08)))}),
    sizemode: 'area'
  }
};




var data = [trace3,trace4,trace5]; 

var layout = {
	hovermode:'compare',
	xaxis: {        
		title: 'Porcentaje de tomas pagadas',
        tickformat:"%",
    },
  title: 'Cumplimiento por delegación en el pago de agua <br> Porcentaje de tomas pagadas',
  showlegend: true,
  height: 600,
  width: 800,
  margin: {
    l: 150,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  }

};

Plotly.newPlot('plotref1', data, layout);


var data2 = [trace6,trace7,trace8];  //, trace2, trace3

var layout2 = {
	hovermode:'compare',
	xaxis: {        
		title: 'Volumen de consumo de agua m<sup>3</sup>'
    },
  title: 'Consumo de agua por tipo de uso y delegación',
  showlegend: true,
  height: 600,
  width: 800,
  margin: {
    l: 150,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  }

};

Plotly.newPlot('plotref2', data2, layout2);







}





$(document).ready(function($){
	// a partir de la información del geojson genera llaves de busqueda que se usan en la asignación de colonias
	arrVals = colCDMX[0].features.map(function(x){ return x.properties.D_ASENTA2 + " -" + x.properties.MUN_NAME  + "- " + x.properties.D_CP});
	// genera un vector de codigos postales
	arrVals2 = colCDMX[0].features.map(function(x){ return x.properties.D_CP});

	coodenadaprueba ='23-43-430-071';  //apunta a laboratorio de datos

	$("#preguntas").text(txtCuestionario[0]);
	$("#contexto").text(txtContexto[0]);

	creaColInput(0)
	creaDots(0,txtCuestionario.length - 0)

	$("#areaInput").keydown(function(event) {
    if (event.keyCode === 13) {
        $("#encuesta").click();
        $("#inputMulti").focus();
    }
	});


 } );


// VERIFICADO cuestionario que se presenta en la evaluacion
var txtCuestionario =[ 
			/*0*/	    "¿En qué colonia vives?",
			/*1*/		"¿Sabes cuanto pagas de agua?", 
			/*2*/		"¿Cuánto pagan de agua al bimestre?",
			/*3*/		"¿Cuántas personas viven en tu residencia?",										
			/*4*/		"¿Cuántos minutos te toma bañarte?",
			/*5*/		"¿Cuántas veces por semana preparas alimentos que requieran más de 30min de preparación?",
			/*6*/		"¿Cuántas veces lavan ropa en la semana?",
			/*7*/		"¿Cuántas veces por semana asean la casa?",
			/*8*/		"¿Cuantas veces al mes lavan el patio?",
			/*9*/		"¿Cuantas veces al mes lavan el auto en casa?", 
			/*10*/		"¿Cuantas veces al mes riegan el jardín con agua de la llave?",
			/*11*/		"¿Los sanitarios de mi residencia tienen depósitos de agua ahorradores.?"
					]

// VERIFICADO  mensajes de contexto que acompañan al cuestionario
var txtContexto =[ 
			/*0*/		"Con esta información podemos comparar tu consumo general con el de tus vecinos.",
			/*1*/		'Responder si / no',
			/*2*/		"Indique el importe total pagado",
			/*3*/		"Indique el numero de personas que regularmente habitan en tu casa",
			/*4*/		"Indique cuantos minutos mantiene abierta la regadera mientras se baña y si su regadera es ahorradora.",
			/*5*/		"Responder cuantas veces a la semana la preparación de alimentos en casa incluyendo el aseo de los trastes le toma más de 30 minutos y si tiene instaladas mejoras para cuidar el agua",
			/*6*/		"Número de veces que se introduce ropa en la lavadora y si su lavadora posee tecnologia de ahorro de agua",
			/*7*/		"Señale el numero de veces que asean la casa por semana sin contar areas exteriores o comunes y si utiliza agua reciclada",
			/*8*/		"Señale cuantas veces lavan el patio al mes o si utiliza agua reciclada",
			/*9*/		"Indique cuantas veces lavan el auto en casa con agua de la llave o si utiliza agua reciclada",
			/*10*/		"Responda cuantas veces riegan el jardión usando el agua de la llave o si utiliza agua reciclada",
			/*11*/		"Indique si tiene un sanitario con bajo consumo de agua -6 litros por descarga-."
					]

// VERIFICADO  array de espuestas en default que se consideran cuando presina siguiente sin elegor
var defaults= ['--', //0
				"SI", //1
				390, //2
				4, //3
				12,//4
				6,//5
				4,//6
				5,//7
				2,//8
				2,//9
				4,//10
				'NO'//11
				]

// VERIFICADO array de instrucciones que genera las vistas HTML dependiendo de la pregunta
var txtTipoInput =[ 
					"",//este input es fijo y se oculta / muestra, 
					creaSNbtn(1),
					creaInptSlider(10, 30,5000,	defaults[1],false,'',2),
					creaInptSlider(1, 1,20,defaults[3],false,'',3),
					creaInptSlider(1, 3,30,defaults[4],true,'Recupero el agua en cubeta en lo que sale caliente y/o Mi regadera es Ahorradora.',4),
					creaInptSlider(1, 0,21,defaults[5],true,'La llave de la tarja es ahorradora y/o Tengo sistema de trampa de  grasa instalado en la cocina.',5),
					creaInptSlider(1, 0,30,defaults[6],true,'Tengo lavadora de carga frontal con  sistema de reutilización de agua.',6),
					creaInptSlider(1, 0,10,defaults[7],true,'Reutilizo el agua de enjuague de la lavadora para el aseo de la casa',7),
					creaInptSlider(1, 0,30,defaults[8],true,'Reutilizo el agua de enjuague de la lavadora para lavar el patio',8),
					creaInptSlider(1, 0,30,defaults[9],true,'Reutilizo el agua de enjuague de la lavadora para lavar el automóvil',9),
					creaInptSlider(1, 0,30,defaults[10],true,'Reutilizo el agua de enjuague de la lavadora para riego y/o riego después de las 5 de la tarde',10),
					creaSNbtn(11) 
					//'<span>NO<input type="range" id="inputMulti" data-slider-step="1" min="0" max="1" oninput="verifica(7,0,1,true)">SI</span>'
					]

// VERIFICADO es el array donde se almacenan las respuestas
var txtRespuestas =[ 
					['Colonia', ""],
					['sabe monto pago', ""],
					['monto pago', ""],
					['# personas',"" ],
					['Tiempo regadera / ¿ahorradora?',"",false],  
					['# Preparar alimentos + 30 min sem / ¿Trampa?', "",false],
					['# cargas lavadora sem / ¿recicla?',"",false],
					['# aseo casa sem / usa agua enjuague',"",false ],
					['# lava Patio mes / usa agua enjuague',"",false ],
					['# lava auto mes / usa agua enjuague', "",false ],
					['# riega jardin mes / usa agua enjuague', "",false],
					['Tiene sanitario ahorrador', ""],
					];



// VERIFICADO regresa a la primer pregunta 
function RegresarInicio(){
	pregActiva = 0;
	pregAnterior();
}


// VERIFICADO regresa a la pregunta anterior
function pregAnterior(){
	var nvaPreg = pregActiva -1;
	if (nvaPreg < 0){nvaPreg =0 }
	if(pregActiva ==3 & txtRespuestas[1][1]=='NO'){nvaPreg= pregActiva - 2}	
	muestraPreg(nvaPreg)
}

// VERIFICADO muestra el contenido grafico de la pregunta que se trate
function muestraPreg(preg){
	pregActiva = preg;
	$("#areaInput").empty();
	$("#preguntas").text(txtCuestionario[pregActiva]);
	$("#contexto").html(txtContexto[pregActiva]);
	if (pregActiva !=0){
		console.log(pregActiva)
		$("#areaInput").append(txtTipoInput[pregActiva]);
		$("#inputMulti").val(txtRespuestas[pregActiva][1]);
			//Ajuste del slider e inputbox
		if (txtRespuestas[pregActiva][1]==='' ){
			//cuando no hay respuestas previas carga default
			var pert=defaults[pregActiva];
			$("#inputMulti").val(pert);
			$("#inputMultiB").val(pert);
		}
		if (txtRespuestas[pregActiva][1]!='' ){
			//cuando hay respuestas carga la respuesta preexistente	
			var pert=txtRespuestas[pregActiva][1];
			$("#inputMulti").val(pert);
			$("#inputMultiB").val(pert);
			if (isInArray( pregActiva,[4,5,6,7,8,9,10] )) {
				$('#sldchk').prop('checked', txtRespuestas[pregActiva][2]);
			}
			if (isInArray( pregActiva,[1,11] )) {
				
				if (txtRespuestas[pregActiva][1]=="SI"){
					$("#btn-NO").prop("checked", false);
					$("#btn-SI").prop("checked", true);	
				}
				if (txtRespuestas[pregActiva][1]=="NO"){
					$("#btn-SI").prop("checked", false);	
					$("#btn-NO").prop("checked", true);
				}
				
				
			}

		}
		$('#inputCOL').addClass('hidden');
	}else{
		$('#inputCOL').removeClass('hidden');
	};
	creaDots(preg,txtCuestionario.length - pregActiva);
	mostrarRespuestas();
}


// VERIFICADO regresa a la pregunta siguiente y en caso de ser la ultima despliega la evaluacion
function pregSiguiente(){
	var nvaPreg= pregActiva + 1;
	if (nvaPreg > 12){
		nvaPreg =12; 
		pregActiva = preg
	};
	if(pregActiva ==1 & txtRespuestas[1][1]=='NO'){nvaPreg= pregActiva + 2}	;	
	if (isInArray( pregActiva,[2,3,4,5,6,7,8,9,10]) &  txtRespuestas[pregActiva][1]=='' ) {
		//console.log('entrando sin respuestas ' + pregActiva)
		var pert=defaults[pregActiva];
		asignaRespuesta(1, pregActiva, pert);
		if (isInArray( pregActiva,[4,5,6,7,8,9,10] )) {
			$('#sldchk').prop('checked', false);
		}
	}
	if (nvaPreg >= 0 & nvaPreg < 12){
		muestraPreg(nvaPreg);
	}else{
		mostrarRespuestas()
		evaluaConsumo()
		mostrarEvaluado()
	}
}

// VERIFICADO array con los rango de cnsumo para las preguntas correspondientes
var txtRangos =[[], //cod pos
				[], //sabe cuanto paga?
				[], //cuanto paga
				[], //num person
				["#imgReg",[6,9,12,15],15], //tiempo reg  //noma http://www.conagua.gob.mx/CONAGUA07/Contenido/Documentos/N8.pdf 
				//maximo consumo comercializable 10 litros X min
				// se considera ecologica hasta 4 litros x minuto
				// dejaremos la regadera ahorradora en 6 litros
				// multiplicaremos en el calculo por 0.6
				["#imgCoc",[4,8,12,16],96], //veces cocina  pongamos que se lavan trastes 12 min x evento
				// 6 litros por persona cuando mucho al día "6.minimum-standards-in-water-supply-sanitation-and-hygiene-promotion.pdf"
				// norma indica maximo 8 litros x minuto abajo de 4 se considera ecologico
				// el consumo referido es 50 litros por evento cada 3 personas
				// un lava vajillas con 10 servicios gasta 15 litros
				// la trampa de aceite evita contaminar 1000 litros por cada litro depositado (promerio anual x persona 5 litros de aceide quemado)

				["#imgLav",[5,8,10,12],171], //veces lava   nivel a 75% a 80% (.60*.38*pi*3*.95) el volumen de la lavadora standar es una tina de lavado de 60 cm alto 38 cm diametro con un FCA de .80 
				// nom http://www.dof.gob.mx/nota_detalle.php?codigo=5460980&fecha=15/11/2016
				// NORMA Oficial Mexicana NOM-005-ENER-2016, Eficiencia energética de lavadoras de ropa electrodomésticas. Límites, métodos de prueba y etiquetado.
				// Factor de consumo de agua (FCA) Es la medida global de la eficiencia en el uso del agua, que se expresa como la relación del consumo total del agua por ciclo con relación al volumen del contenedor de ropa.
				// El grado ecologico se estabece en FCA 6.7  https://www.gob.mx/cms/uploads/attachment/file/166832/NMX-AA-158-SCFI-2011.pdf
				// la lavadora ecologica ocupa 40% menos agua es decir se multiplica por 0.6
				// Una carga completa de ropa en lavadora convencional (8-10 kg) se da por 2 personas a la semana.
				// La capacidad de la lavadora debe elegirse considerando el numero de personas a las que presta servicio.
				// Media carga de ropa  controlando el nivel de agua a la mitad representan el 70 % del consumo de agua de una lavadora completa.
				// 
				[""        ,[5,8,10,12],105], //veces limpia casa
				// se recomienda utilizar dos cubetas una jabon otra enjuague 7.5 litros cu por evento 
				// el consumo tradicional es del doble
				// las recomendaciones: limitar el uso de jabones
				// usar atomizadores para las ventanas
				// usar el agua de la limpieza de las superficies / o las de enjuague de lavadora para el piso (patio / auto)
				["#imgAut",[2,4,7,10],120], // veces patio si reusa agua ponderamos X 0.2
				["#imgAut",[2,4,7,10],230], // veces Auto si reusa agua ponderamos X 0.2  Un auto cada dos personas en promedio
				["#imgAut",[2,4,7,10],140], // veces jardin si reusa agua ponderamos X 0.2
				[],  // wc ahorrador 
				// NORMA Oficial Mexicana NOM-009-CNA-2001, Inodoros para uso sanitario-Especificaciones y métodos de prueba.
				// https://www.gob.mx/cms/uploads/attachment/file/94217/NOM-010-CONAGUA-2000.pdf pruebas a 6 litros de capacidad
				//ACUERDO mediante el cual se modifican los numerales 2, 7.1, 7.2 y 10.1 y se adiciona el numeral 6.11 Bis a la
                 //Norma Oficial Mexicana NOM-009-CONAGUA-2001, Inodoros para uso sanitario-Especificaciones y métodos de prueba  // menos de 5 litros son ecologicos
                 //NORMA Oficial Mexicana NOM-009-CONAGUA-2001, Inodoros para uso sanitario-Especificaciones y métodos de prueba.  // 6 litros maximo
				]




// VERIFICADO array con las recomendaciones que se presentan despues de evaluar el consumo
var txtRecomendaciones =[
		['0','','','','',''],
		['1','','','','',''],
		['2','','','','',''],
		['3','','','','',''],
		['4 regadera',[],['Instala dispositivos ahorradores en la regadera','Toma baños cortos','No te rasures, ni cepilles los dientes en la regadera.','Cierra las llaves del agua mientras te enjabonas al bañarte o lavarte las manos'],['Instala dispositivos ahorradores en la regadera','Toma baños cortos','No te rasures, ni cepilles los dientes en la regadera.','Cierra las llaves del agua mientras te enjabonas al bañarte o lavarte las manos'],['Instala dispositivos ahorradores en la regadera','Toma baños cortos','No te rasures, ni cepilles los dientes en la regadera.','Cierra las llaves del agua mientras te enjabonas al bañarte o lavarte las manos'],['Coloca una cubeta debajo de la regadera mientras te bañas y reutiliza el agua que colectes'],],
		['5 cocina',[],['Instala un economizador de agua.','No vacíes el aceite sobrante de tus guisos por la coladera del fregadero.','Remoja los trastes una sola vez, si tienen grasa, usa agua caliente.','Enjabona los trastes con la llave cerrada y enjuágalos rápidamente bajo un chorro de agua moderado'],['Instala un economizador de agua.','No vacíes el aceite sobrante de tus guisos por la coladera del fregadero.','Remoja los trastes una sola vez, si tienen grasa, usa agua caliente.','Enjabona los trastes con la llave cerrada y enjuágalos rápidamente bajo un chorro de agua moderado'],['Instala un economizador de agua.','No vacíes el aceite sobrante de tus guisos por la coladera del fregadero.','Remoja los trastes una sola vez, si tienen grasa, usa agua caliente.','Enjabona los trastes con la llave cerrada y enjuágalos rápidamente bajo un chorro de agua moderado'],['Cuida que la llave del fregadero no gotee.',' Cambia los empaques si es necesario.','Evita que los residuos de comida se vayan por el drenaje.'],],
		['6 ropa',[],['Usa la lavadora de ropa sólo con cargas completas.','Utiliza jabón de pasta o detergente biodegradable (sin fosfatos). Con esto disminuye la contaminación del agua','Remoja la ropa en jabón para que sea más fácil quitar las manchas.','Utiliza la mínima cantidad de detergente y gasta menos agua al enjuagar.'],['Usa la lavadora de ropa sólo con cargas completas.','Utiliza jabón de pasta o detergente biodegradable (sin fosfatos). Con esto disminuye la contaminación del agua','Remoja la ropa en jabón para que sea más fácil quitar las manchas.','Utiliza la mínima cantidad de detergente y gasta menos agua al enjuagar.'],['Usa la lavadora de ropa sólo con cargas completas.','Utiliza jabón de pasta o detergente biodegradable (sin fosfatos). Con esto disminuye la contaminación del agua','Remoja la ropa en jabón para que sea más fácil quitar las manchas.','Utiliza la mínima cantidad de detergente y gasta menos agua al enjuagar.'],['Colecta el agua del lavado y enjuague en cubetas para destinarla a la limpieza de los pisos y al lavado de retretes.'],],
		['7 casa',[],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],,],
		['8 patio',[],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],['Barre en seco. El agua no debe usarse para impulsar particulas hacia el drenaje -lo puedes tapar- que puedes levantar  y depositar en la basura. '],],
		['9 auto',[],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],['Utiliza dos cubetas para realizar el lavado del auto. Si requieres un lavado profundo es mejor que te presentes en un autolavado.'],],
		['10 jardin',[],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],['Utiliza agua residual de la lavadora verificando primero un ajuste en el tipo de jabón con que lavas.'],['Riega por la noche. ',' Selecciona plantas adecuadas al entorno físico: temperaruta, humedad, exposición al sol y disponibilidad de agua.','Calcula la cantidad de agua que requieren la planta para no darle de más.'],],
		['11 wc',[],['Cambia el tanque del escusado de 16 litros por el de 6 litros de agua.'],['Cambia el tanque del escusado de 16 litros por el de 6 litros de agua.'],['Cambia el tanque del escusado de 16 litros por el de 6 litros de agua.'],['Verifica que el sapito de la caja del WC funcione adecuadamente. Si no cierra bien, puede desperdiciar hasta un tinaco de agua por día.','Utiliza un desodorante sólido o líquido para el escusado. Esto te ayudará a acumular algunas descargas de orina, eliminando malos olores, antes de dejar correr el agua.'],],]


// VERIFICADO array en el que se cargan los valores evaluados 
var txtEvaluacion = [ ["0 Consumo de agua suficiente considerando " + consumooptimo +" litros diarios por persona",0,0,0,""],
					 ["",0,0,0,""],
					 ["",0,0,0,""],
					 ["",0,0,0,""],
					 ["Aseo personal",0,0,0,""],
					 ["Preparacion de alimentos",0,0,0,""],
					 ["Lavado de la ropa",0,0,0,""],
					 ["Limpieza del hogar",0,0,0,""],
					 ["Aseo del patio ",0,0,0,""],
					 ["Lavado del automóvil",0,0,0,""],
					 ["Riego del jardín",0,0,0,""],
					 ["Saneamiento de inodoro (WC)",0,0,0,""],
					 ["CONSUMO TOTAL",0,0,0,""]]



// VERIFICADO  Realiza la evalaucion de lar respuestas, genera el grafico, elige recomendaciones
function evaluaConsumo(){

	//litros por bimestre optimos considerando el # de personas 
	txtEvaluacion[0][1]=math.floor(txtRespuestas[3][1] * consumooptimo * 60.8);
	//litros por bimestre ponderados por disponibilidad considerando el # de personas
	//txtEvaluacion[1][1]=math.floor(txtRespuestas[3][1] * consumooptimo * Const_disp);

	//litros a los que corresponde el pago bimestral
	// estimando el tipo de manzana igual a la moda de tipo de manzana en el CP
	//txtEvaluacion[2][1]=math.floor(MNTtpH20(txtRespuestas[1][1], modamza )[3]);
	
	// aplicando constante de disponibilidad
	//litros consumidos durante la regadera al bimestre por todos los miembros de la casa
	//                               minutos                litros min         personas          dias        ¿     es ahorrador      ?
	txtEvaluacion[4][1]=math.floor(txtRespuestas[4][1]*  txtRangos[4][2] * txtRespuestas[3][1] * 60.8 * (txtRespuestas[4][2] ==true ? 0.6 : 1) );
	//consumo responsable            personas            dias       litros diarios optimos
	txtEvaluacion[4][2]=math.floor(txtRespuestas[3][1] * 60.8 * (0.69 + 10 + 2.5 + 25) );
	//consumo negligente            personas            dias       litros diarios optimos
	txtEvaluacion[4][3]=math.floor(txtRespuestas[3][1] * 60.8 * (16.5 + 39.3 + 38.5 + 264) );
	

	//litros consumidos para cocinar al  bimestre
	//                               veces X semana         litros X evento ponderado X personas       semanas bimestre          ¿     es ahorrador      ?
	txtEvaluacion[5][1]=math.floor(txtRespuestas[5][1]*  (txtRangos[5][2] * txtRespuestas[3][1] / 3)  *     4.3 * 2        * (txtRespuestas[5][2] ==true ? 0.5 : 1) );
	//consumo responsable            personas            dias       litros diarios optimos
	txtEvaluacion[5][2]=math.floor(txtRespuestas[3][1] * 60.8 * (22.5) );
	//consumo negligente            personas            dias       litros diarios optimos
	txtEvaluacion[5][3]=math.floor(txtRespuestas[3][1] * 60.8 * (82.5) );


	//litros consumidos para lavado de ropa al bimestre
	//                               veces X semana         litros X evento ponderado X personas       semanas bimestre          ¿     es ahorrador      ?  
	txtEvaluacion[6][1]=math.floor(txtRespuestas[6][1]* (txtRangos[6][2] * txtRespuestas[3][1] / 2)   *      4.3 * 2      * (txtRespuestas[6][2] ==true ? 0.6 : 1) );
	//consumo responsable            personas            dias       litros diarios optimos
	txtEvaluacion[6][2]=math.floor(txtRespuestas[3][1] * 60.8 * (20) );
	//consumo negligente            personas            dias       litros diarios optimos
	txtEvaluacion[6][3]=math.floor(txtRespuestas[3][1] * 60.8 * (40) );
	

	//litros consumidos para aseo casa al bimestre
	//                               veces X semana         litros X evento        semanas bimestre          ¿     es ahorrador      ?  
	txtEvaluacion[7][1]=math.floor(txtRespuestas[7][1]*     txtRangos[7][2]    *      4.3 * 2      * (txtRespuestas[7][2] ==true ? 0.2 : 1) );
	//consumo responsable            personas            dias       litros diarios optimos
	txtEvaluacion[7][2]=math.floor(txtRespuestas[3][1] * 60.8 * (14) );
	//consumo negligente            personas            dias       litros diarios optimos
	txtEvaluacion[7][3]=math.floor(txtRespuestas[3][1] * 60.8 * (35.85) );


	//litros consumidos para lavar patio bimestre
	//                               veces X semana         litros X evento         mes a bimestre          ¿     es ahorrador      ?  
	txtEvaluacion[8][1]=math.floor(txtRespuestas[8][1]*     txtRangos[8][2]    *        2      * (txtRespuestas[8][2] ==true ? 0.2 : 1) );
	//consumo responsable            personas            dias       litros diarios optimos
	txtEvaluacion[8][2]=math.floor(txtRespuestas[3][1] * 60.8 * (4) );
	//consumo negligente            personas            dias       litros diarios optimos
	txtEvaluacion[8][3]=math.floor(txtRespuestas[3][1] * 60.8 * (15.425) );



	//litros consumidos para lavar auto bimestre
	//                               veces X semana         litros X evento         mes a bimestre          ¿     es ahorrador      ?  
	txtEvaluacion[9][1]=math.floor(txtRespuestas[9][1]*     txtRangos[9][2]    *        2      * (txtRespuestas[9][2] ==true ? 0.2 : 1) );
	//consumo responsable            personas            dias       litros diarios optimos
	txtEvaluacion[9][2]=math.floor(txtRespuestas[3][1] /2  * 60.8 * (8) );
	//consumo negligente            personas            dias       litros diarios optimos
	txtEvaluacion[9][3]=math.floor(txtRespuestas[3][1] /2 * 60.8 * (100) );




	//litros consumidos para regar jardin bimestre
	//                               veces X semana         litros X evento         mes a bimestre          ¿     es ahorrador      ?  
	txtEvaluacion[10][1]=math.floor(txtRespuestas[10][1]*     txtRangos[10][2]    *        2      * (txtRespuestas[10][2] ==true ? 0.2 : 1) );
	//consumo responsable            personas            dias       litros diarios optimos
	txtEvaluacion[10][2]=math.floor(txtRespuestas[3][1] * 60.8 * (4) );
	//consumo negligente            personas            dias       litros diarios optimos
	txtEvaluacion[10][3]=math.floor(txtRespuestas[3][1] * 60.8 * (30.85) );



	//litros consumidos para WC al bimestre se asume que cada persona va al baño entre 1 y 2 veces al día
	//                               personas               dias                   ¿ ahorrador ?             3 veces al baño 
	txtEvaluacion[11][1]= math.floor(txtRespuestas[3][1] *  60.8    * (txtRespuestas[11][1] == "SI" ?  6 : 12) * 3  );
	//consumo responsable            personas            dias       litros diarios optimos
	txtEvaluacion[11][2]=math.floor(txtRespuestas[3][1] * 60.8 * (20) );
	//consumo negligente            personas            dias       litros diarios optimos
	txtEvaluacion[11][3]=math.floor(txtRespuestas[3][1] * 60.8 * (36) );

	txtEvaluacion[12][1] = txtEvaluacion.slice(4,12).reduce(function (r, a) {a.forEach(function (b, i) {r[i] = (r[i] || 0) + b;});return r;}, [])[1];
	txtEvaluacion[12][2] = txtEvaluacion.slice(4,12).reduce(function (r, a) {a.forEach(function (b, i) {r[i] = (r[i] || 0) + b;});return r;}, [])[2];
    txtEvaluacion[12][3] = txtEvaluacion.slice(4,12).reduce(function (r, a) {a.forEach(function (b, i) {r[i] = (r[i] || 0) + b;});return r;}, [])[3];

 // colorea la tabla de acuerdo a la catergoria de consumo
	txtEvaluacion.map(function(z,i){ 
		var w = 0; 
		if (i>3){ 
			w=(z[3]-z[2])/2
		}; 
		txtEvaluacion[i][4]= ( z[1]<=(z[2]) ?  "Responsable" : ( z[1]>=(z[3]) ? "Negligente" :  ( z[1]>(z[3]-w) & z[1]<(z[3]) ? "Preocupante" : "Sobrado" ) ) ) 
		; 
	}).toString().replace(/,/g,'').replace(/undefined/g,'')

// grafica de pastel
	$('#pastelote').empty();
	var cali=["nada","Responsable","Sobrado","Preocupante","Negligente","todos"]

    var dataSetXcon2 = txtEvaluacion.map(function(x,i){ if (i > 3 & i < 12){return '<ul>'+txtRecomendaciones[i][cali.indexOf(x[4])].map(function(y){return '<li>'+y+'</li>'}) + '</ul>'} }).clean(undefined) 

	var data = [{
		name: 'Distribucion',
		
		mpo: dataSetXcon2,
		values:[
		        txtEvaluacion[4][1]*100/txtEvaluacion[12][1],
		        txtEvaluacion[5][1]*100/txtEvaluacion[12][1],
		        txtEvaluacion[6][1]*100/txtEvaluacion[12][1],
		        txtEvaluacion[7][1]*100/txtEvaluacion[12][1],
		        txtEvaluacion[8][1]*100/txtEvaluacion[12][1],
		        txtEvaluacion[9][1]*100/txtEvaluacion[12][1],
		        txtEvaluacion[10][1]*100/txtEvaluacion[12][1],
		        txtEvaluacion[11][1]*100/txtEvaluacion[12][1]
		        ],
		labels: [ txtEvaluacion[4][4] + "<br> gastas "+ math.round(txtEvaluacion[4][1] /60.8 / txtRespuestas[3][1],0) +" litros diarios <br> consumo óptimo: " + math.round(txtEvaluacion[4][2] /60.8 / txtRespuestas[3][1],0) +" litros",
				txtEvaluacion[5][4] + "<br> gastas "+ math.round(txtEvaluacion[5][1] /60.8 / txtRespuestas[3][1],0) +" litros diarios <br> consumo óptimo: " + math.round(txtEvaluacion[5][2] /60.8 / txtRespuestas[3][1],0) +" litros",
				txtEvaluacion[6][4] + "<br> gastas "+ math.round(txtEvaluacion[6][1] /60.8 / txtRespuestas[3][1],0) +" litros diarios <br> consumo óptimo: " + math.round(txtEvaluacion[6][2] /60.8 / txtRespuestas[3][1],0) +" litros",
				txtEvaluacion[7][4] + "<br> gastas "+ math.round(txtEvaluacion[7][1] /60.8 / txtRespuestas[3][1],0) +" litros diarios <br> consumo óptimo: " + math.round(txtEvaluacion[7][2] /60.8 / txtRespuestas[3][1],0) +" litros",
				txtEvaluacion[8][4] + "<br> gastas "+ math.round(txtEvaluacion[8][1] /60.8 / txtRespuestas[3][1],0) +" litros diarios <br> consumo óptimo: " + math.round(txtEvaluacion[8][2] /60.8 / txtRespuestas[3][1],0) +" litros",
				txtEvaluacion[9][4] + "<br> gastas "+ math.round(txtEvaluacion[9][1] /60.8 / txtRespuestas[3][1],0) +" litros diarios <br> consumo óptimo: " + math.round(txtEvaluacion[9][2] /60.8 / txtRespuestas[3][1],0) +" litros",
				txtEvaluacion[10][4] + "<br> gastas "+ math.round(txtEvaluacion[10][1] /60.8 / txtRespuestas[3][1],0) +" litros diarios <br> consumo óptimo: " + math.round(txtEvaluacion[10][2] /60.8 / txtRespuestas[3][1],0) +" litros",
				txtEvaluacion[11][4] + "<br> gastas "+ math.round(txtEvaluacion[11][1] /60.8 / txtRespuestas[3][1],0) +" litros diarios <br> consumo óptimo: " + math.round(txtEvaluacion[11][2] /60.8 / txtRespuestas[3][1],0) +" litros"
				],
	    hoverinfo: 'label',
		text: [
		        'Regadera',
		        'Cocinar',
		        'Lavar ropa',
		        'Aseo del hogar',
		        'Lavar patio',
		        'Lavar el auto',
		        'Regar jardín',
		        'Inodoro'
		    ],
		type: 'pie',
		
		rotation: 90,
		sort: true,
		showlegend: false,
		textposition: 'outside',
		marker: {
			//colors: ['coral','LightSeaGreen','crimson','cornflowerBlue','yellow','darkorange','green','paleVioletRed','violet']
		}
		}];

		var layout = {
		  title: 'Resultados Personales <b>' + math.round(txtEvaluacion[12][1] /60.8 / txtRespuestas[3][1],2) + '</b> litros diarios por persona.',
		  height: 550,
		  width: 500
		};


		Plotly.newPlot('pastelote', data,layout,{displayModeBar: false},{displaylogo: true});

		var elemento = 'pastelote';
		var hovinfo = "hoverinfo01";
        var algo = data;
        var datosextra = []
        var hoverInfo2 = document.getElementById(hovinfo)
        var myPlot2 = document.getElementById(elemento)

     // acciona mostrar mensaje de recomendacion on hover 
        myPlot2.on('plotly_hover', function(algo){
            var infotext = algo.points.map(function(d){
              //console.log( d );
              var pesos="";
              if(txtRespuestas[1][1]=='SI'){pesos = txtRespuestas[2][1] * d.value / 100 };
              var mensaje = ( "<h5>Consumo de agua  " + d.text + " " + math.round(d.value,1) + "%" + (txtRespuestas[1][1]=="SI" ? " ($" + math.round(pesos,2) +")" : "") + "<br> categoría de uso: " + txtEvaluacion[d.i+4][4] + "</h5>" );

              $("#imgConcep").attr('src','img/'+listaimg[d.i+3] );
              var datosextra = d.data.mpo[d.pointNumber].toString().replace(/>,</g,'><');
              var sali = {msg:mensaje,dta:datosextra};
              //console.log(sali)
              return sali;
              
            });
            hoverinfo01.innerHTML = infotext[0].msg +"<hr> <h6>Recomendaciones</h6>" + infotext[0].dta;
        })
         .on('plotly_unhover', function(algo){

            hoverinfo01.innerHTML = '-';
            $("#imgConcep").attr('src',"" );
        });
}








// VERIFICADO integra los valores de las colonias en el selector 
function creaColInput(pregunta){
  var listadecolonias = listacol.map(function(x){ return  "<option value='" + x[2] + " -" + x[1] + "- " +x[0] + "'></option>" })
  salidaopt= "<datalist id='coloniasopt'>" + listadecolonias + "</datalist>";
  salida = '<div class ="row">'+
				'<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
			       '<input id="lstCol"  class="awesomplete wfull" list="coloniasopt"  data-minChars="3" data-maxItems="15"  onfocusout="verificaColonia()" />' + salidaopt +
				'</div>'+
			'</div>';
  //return salida;	
 $('#inputCOL').append(salida)

}


// VERIFICADO evalua el cambio en la seleccion del selector de colonias
function verificaColonia() {
	var cali= lstCol.value
	var cpO= cali.substr(cali.length - 5);
	  if (arrVals.indexOf(lstCol.value) !=(-1)){
		  muestramap(lstCol.value,true) 
		  
		  asignaRespuesta(1,0,this.lstCol.value)
	  }else {
	  	if(arrVals2.indexOf(cpO) !=(-1)){
		   muestramap(cpO,false) 
		  
		  asignaRespuesta(1,0,this.lstCol.value)
	  	}else{
		  	mapas.fitBounds(geojsonCDMX.getBounds());
	  	};
};
}; 


// VERIFICADO crea codigo HTML ajustado para generar los botores SI NO 
function creaSNbtn(preg){
  var salida = '<div class="row" id="btsn">'+
					 '<div class= "col-xs-3 col-sm-3 col-md-3 col-lg-3">'+
					 '</div>'+
					 '<div class= "col-xs-3 col-sm-3 col-md-3 col-lg-3 ">'+
						'<input id="btn-SI" name="grpSN" type="radio" value= "SI" onclick="asignaRespuesta(1,'+preg+',this.value)"><label for="btn-SI">Si</label>'+
					 '</div>'+
					 '<div class= "col-xs-3 col-sm-3 col-md-3 col-lg-3">'+
						'<input id="btn-NO" name="grpSN" type="radio" value = "NO" onclick="asignaRespuesta(1,'+preg+',this.value)"><label for="btn-NO">No</label>'+
					 '</div>'+
					 '<div class= "col-xs-3 col-sm-3 col-md-3 col-lg-3">'+
					 '</div>'+
			    '</div>';
	return salida;
}


//VERIFICADO crea el onjeto slider y inputbox para las preguntas 
function creaInptSlider(incr, mini,maxi,defa,swch,msg,preg){
	var salida = '<div class ="row">'+
						'<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                 			'<input id="inputMultiB" type="number"  min="'+mini+'" max="'+maxi+'" value="'+defa+'" oninput="ajustaInp('+preg+',this.value)" />'+
                 		'</div>'+
                 		'<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">' +
                 			'<input id="inputMulti" type="range"  min="'+mini+'" max="'+maxi+'" step="'+incr+'" oninput="ajustaBInp('+preg+',this.value)"   />'+
				"</div></div>"

	if (swch==true){
		var cls ='class="colmagt"'
		if (msg.length > 39){
			cls= 'class= " colmagt subetxt"'
		}
		var ckh='<div class= "row ">'+
							'<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>'+
							'<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
								'<label class="switch">'+
									' <input id= "sldchk" type="checkbox" onclick="asignaRespuesta(2,'+preg+',this.checked)"> '+
									'<span class="slider round "></span>'+
								'</label>'+
							'</div>'+
							'<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">' +
								'<p '+cls+' >'+msg+'</p>'+
							'</div>'+
							'<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>'+					
				'</div>';
		salida = salida + ckh;				
	}
	
	return salida			
}


// VERIFICADO integra la respuesta a un array que guarda las respuestas del cuestionario
function asignaRespuesta(idx, preg, resp){
	var anw= resp;
	txtRespuestas[preg][idx]=anw;
}


//VERIFCADO función que sincroniza el valor del slider al valor capturado en el inputbox
function ajustaInp(preg,valor){
	$("#inputMulti").val(valor);
	asignaRespuesta(1,preg, valor);
}

//VERIFCADO función que sincroniza el valor del  inputbox  al valor capturado en el slider
function ajustaBInp(preg,valor){
	$("#inputMultiB").val(valor);
	asignaRespuesta(1,preg, valor);
}



// VERIFICADO  Genera los puntos rosas de avance 
function creaDots(verdes,grises){
	$("#dotsLine").empty();

	for (var k=0; k<(verdes+grises); k++){
		if(k<=verdes){
			$("#dotsLine").append('<span class="dotgreen"></span>')
		}else{
			$("#dotsLine").append('<span class="dotgray"></span>')
		}

	}
}



// VERIFICADO visualiza una tabla con las respuesta proporcionadas
function mostrarRespuestas(){

	$("#Respuestas").empty();
	var titResp= "<h5 class= 'magenta2'>Información proporcionada . . .</h5><p>Cambia las respuestas visualizando la pregunta deseada</p> "
	//var valores = "<table class= 'respues'>" + txtRespuestas.map(function(z){return "<tr>" + z.map(function(ss){return "<td class='res'>" + ss + "</td>"}) +"</tr>"}).toString().replace(/,/g,'') + "</table>"
	//var valores = "<table class= 'respues'>" + txtRespuestas.map(function(z,i){return "<tr>" + "<td class=' " + cssAtr[i] + "'>" + z[0] +  "</td>"  +"<td class='res'>" + z[1] + (i>=3 & i<6 ?  (txtRespuestas[i][2] == true ? " c/ahorro " : "") : "") +  "</td>" +"</tr>"}).toString().replace(/,/g,'').replace(/undefined/g,'') + "</table>"
	var valores = "<table class= 'respues'>" + txtRespuestas.map(function(z,i){return "<tr><td>" +  z[0] +  "</td>"  +"<td class='res'>" + z[1] +   "</td>" + "<td>" + (isInArray(i,[4,5,6,7,8,9,10]) ?  txtRespuestas[i][2]  : "") +  "</td>" +"</tr>"}).toString().replace(/,/g,'').replace(/undefined/g,'') + "</table>"
	$("#Respuestas").append(titResp+valores)

}

// VERIFICADO muestra la tabla con la información de la evaluacion del consulo y los niveles de referencia 
//            de un consumo responsable y un consumo negligente 
function mostrarEvaluado(){
	$("#Evaluados").empty();
	var titResp= "<h5 class= 'magenta2'>Evaluación del consumo a partir de sus respuestas  </h5><p></p> "
	var encabedado = "<tr><th></th><th>Segmento de consumo</th><th class='toR'>Límite <br> Optimo</th><th class='toR'>Tu consumo <br> bimestral </th><th class='toR'>Límite <br>Negligente</th><th class='toR'> Categoria de <br> consumo</th></tr>"
	var anchos = '<col style="width:7%"><col style="width:33%"><col style="width:15%"><col style="width:15%"><col style="width:15%"><col style="width:15%">'
	var valores = "<table class= 'respues'> " + anchos + encabedado  +txtEvaluacion.slice(4, 13).map(function(z,i){ return "<tr><td class='"+ z[4]+"'><img  src= 'img/"+ listaimg[i+3] +"' height='35px'></td><td>" +  z[0] +  "</td>"  +"<td class='res'>" + (z[2].toLocaleString()) +   "</td>" +"<td class='res'>" + z[1].toLocaleString() +   "</td>" +"<td class='res'>" + z[3].toLocaleString() +   "</td>" +"<td class='res'>" + z[4] +   "</td>" + "<td>" +    "</td>" +"</tr>" }).toString().replace(/,</g,'<').replace(/>,/g,'>') + "</table>" //.replace(/undefined/g,'')
	var contenido =  "<div class= 'row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>"+valores+"</div>"
	$("#Evaluados").append(titResp+contenido +"<p style='width:900px'>Para el límite óptimo se consideran 130 litros diarios por persona y para el nivel negligente 673.5 litros diarios por persona </p>")
}

// VERIFICADO elimina los casos indefined del array generado
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};




// VERIFICADO trasnforma un color rn formato RGB a su expresion HEX
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}


// VERIFICADO ordena los elementos de un array 
function sortNumber(a,b) {
    return Number(a) - Number(b);
}


// VERIFICADO dado un array nos indica el corte en el percentil indicado
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


// VERIFICADO aplica la funcion de percentil nbajo for each
///uso [0, 25, 33, 50, 66, 75, 100].forEach(logArrayElements);
/// estos numeros representan pe 25 = 1er cuartil 50 mediana
/// 75 3er cuartil  97 es para el corte muy alto

function logArrayElements(element, index, array) {
    console.log(element + " --> " + quantile(data, element));
}

//VERIFICADO equivalente a anterior sin uso de foreach
function cortesqtl(data){
	var c1= quantile(data, 97);
	var c2= quantile(data, 75);
	var c3= quantile(data, 50);
	var c4= quantile(data, 25);
	var cortes = [c1,c2,c3,c4];
	return cortes;
};


