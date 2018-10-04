<?php 
	require __DIR__ . '/functions/functions.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<title>Reto Agua (CAD Salud - LabCDMX)</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	
	<script type="text/javascript" src="js/jquery.min.js"></script>	
	<script type="text/javascript" src="js/tether.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/math.min.js"></script>

	<!-- jquery dataTables -->
	<script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/jquery.dataTables.min.css">

	<!-- jquery Scroller dataTables -->
	<link rel="stylesheet" type="text/css" href="css/scroller.dataTables.min.css">
	<script type="text/javascript" src="js/dataTables.scroller.min.js"></script>
	
	<!-- Plotly -->
	<script type="text/javascript" language="javascript" src="js/plotly-latest.min.js"></script> 

	<!-- Leaflet -->
	<link rel="stylesheet" type="text/css" href="leaflet/leaflet.css" />
	<script type="text/javascript" src="leaflet/leaflet.js"></script>

	<!-- llamarAPI, no existe -->
	<!-- <script src="js/llamarAPI.js" type="text/javascript"></script>   -->
	
	<!-- Numeric JS -->
	<script src="js/numeric.min.js"></script>
	
	<!-- Awesomplete.css -->
	<link rel="stylesheet" href="css/awesomplete.css" />
	<script src="js/awesomplete.js" async></script>
	
	<!-- cover -->
	<link href="css/cover.css" rel="stylesheet">

	<!-- Data -->
	<script type="text/javascript" src="data/col_CP.js"></script><!--primero-->
	
	<script type="text/javascript" src="data/CDMX.js"></script>
	<script type="text/javascript" src="data/munCDMX.geojson.js"></script>
	<script type="text/javascript" src="data/emision_referencia.js"></script>
	<script type="text/javascript" src="data/DataRetoH2Obis.geojson.js"></script>
	<script type="text/javascript" src="js/principalNuevo.js"></script>
</head>

<body>

	<!-- Contenedor principal -->
	<div class="d-flex h-100 p-3 mx-auto flex-column">

		<div id="contenedor-intro" class="contenedor-general">
			<h1 class="text-semi-bold bottom-buffer-60">AguaCDMX</h1>

			<p class="font-size-40 bottom-buffer-40 center">¿Sabes cuánta agua se consume en tu hogar?</p>

			<p class="font-size-16 bottom-buffer-30 text-bold center">Al responder las siguientes preguntas obtendrás un diagnóstico para saber si tu consumo de agua está ubicado dentro de los estándares recomendados; podrás compararlo con el consumo que realizan tus vecinos en la colonia y delegación en la que vives; y recibirás algunas recomendaciones para optimizar tu uso del agua.</p>

			<p class="font-size-16 bottom-buffer-30 center">En diversas regiones del mundo, vivir con escasez de agua es una preocupación cotidiana para diferentes personas; la CDMX no es ajena a esa realidad. Según el Sistema de Aguas de la Ciudad de México, el promedio de uso por persona debería de ser de 96 litros por día, sin embargo, consumimos tres veces la cantidad deseada.</p>

			<p class="font-size-16 bottom-buffer-20 center">En este sentido, fomentar una cultura del uso responsable de agua es sólo una de las muchas acciones necesarias para preservar el vital recurso.</p>

			<div class="btns-container">
				<button>Acerca de AguaCDMX</button>
				<button id="boton-comenzar" class="btn btn-primary">Iniciar</button>
			</div>
		</div>

		<!-- Contenedor preguntas -->
		<div id="contenedor-preguntas" class="hidden contenedor-general">

			<!-- Controles de desplazamiento entre preguntas -->
			<div class= "row">
				<div class="col-md-12 text-center">
					<img class="nav-questions prev" src="img/prev.png" onclick="pregAnterior()">
					<div id="dotsLine"></div>
					<img class="nav-questions next" src="img/next.png" onclick="pregSiguiente()">
				</div>	
			</div>

			<!-- Preguntas -->
			<div class= "row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<h3 id="preguntas" class= "pad30"></h3>
					<p id="silderVal"></p>
					<div id="inputCOL"> </div>
					<div id="areaInput"> </div>
					<h5 id="alertInput"> </h5>
					<!-- <h4 id="contexto"></h4> -->
				</div>
			</div>  	
			<div class="btns-container">
				<button class="btn btn-primary" onclick="pregSiguiente()">siguiente</button>
			</div>
		</div>
		<!-- End contenedor preguntas -->

	</div>
	<!-- End contenedor principal -->
	
	<!-- Contenedor resultados -->
	<div id="contenedor-resultados" class="container hidden">
		<div class= "row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div id="Respuestas"></div>
			</div>
		</div>

		<div class= "row bottom-buffer-60">
			<div class="col-md-12">
				<div id="Evaluados"></div>
			</div>
		</div>
		
		<div class= "row bottom-buffer-60">
			<div class="col-md-12">
				<h3 class="subtitulo-resultados">
					Este es el consumo de agua por actividad en tu hogar
				</h3>
				<p>Pasa el mouse sobre la gráfica para ver recomendaciones</p>
			</div>
			<div class="col-md-6">
				<div id="pastelote"></div>
			</div>

			<div class="col-md-6">
				<img id ="imgConcep" src=""   style="height: 45%; position: absolute; left: 18%; top: 35%;opacity: 0.10; ">
				<div id="hoverinfo01" class= "hoverinfo">
				</div>
			</div>
		</div>

		<div class="row bottom-buffer-240">
			<div class="col-md-12">
				<h3 class="subtitulo-resultados">
					Así se compara tu consumo con el de tu región
				</h3>
				<div id="datos-finales">
				</div>
				<div class="grafica-barras">
					<svg id="barra-tu-consumo" class="uno" width="238px" height="328px" viewBox="0 0 238 328" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="RESULTADOS-002" transform="translate(-239.000000, -2363.000000)" fill="#004DFF">
								<path d="M249,2363 L467,2363 C472.522847,2363 477,2367.47715 477,2373 L477,2691 L239,2691 L239,2373 C239,2367.47715 243.477153,2363 249,2363 Z" id="Rectangle-13"></path>
							</g>
						</g>
					</svg>
					<svg id="barra-consumo-colonia" class="dos" width="238px" height="328px" viewBox="0 0 238 328" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="RESULTADOS-002" transform="translate(-239.000000, -2363.000000)" fill="#29D1D8">
								<path d="M249,2363 L467,2363 C472.522847,2363 477,2367.47715 477,2373 L477,2691 L239,2691 L239,2373 C239,2367.47715 243.477153,2363 249,2363 Z" id="Rectangle-13"></path>
							</g>
						</g>
					</svg>
					<svg id="barra-consumo-delegacion" class="tres" width="238px" height="328px" viewBox="0 0 238 328" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="RESULTADOS-002" transform="translate(-239.000000, -2363.000000)" fill="#29D1D8">
								<path d="M249,2363 L467,2363 C472.522847,2363 477,2367.47715 477,2373 L477,2691 L239,2691 L239,2373 C239,2367.47715 243.477153,2363 249,2363 Z" id="Rectangle-13"></path>
							</g>
						</g>
					</svg>
					<svg id="barra-consumo-ciudad" class="cuatro" width="238px" height="328px" viewBox="0 0 238 328" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="RESULTADOS-002" transform="translate(-239.000000, -2363.000000)" fill="#29D1D8">
								<path d="M249,2363 L467,2363 C472.522847,2363 477,2367.47715 477,2373 L477,2691 L239,2691 L239,2373 C239,2367.47715 243.477153,2363 249,2363 Z" id="Rectangle-13"></path>
							</g>
						</g>
					</svg>
				</div>
			</div>
		</div>

		<!-- Contenedor mapa y gráficas -->
		<div id="contenedor-cosas-raras">

			<div class= "row hidden">
				<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
						<div id="mapas" style="height: 400px; width: 600px;"> </div>
				</div>
			</div>

			<div class= "row hidden">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<div id="valorRefCOL"> </div>
				</div>
			</div>

			<div class= "row hidden">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<div id="plotref1" style="width: 900px; height: 700px;">
						<!-- Plotly chart will be drawn inside this DIV -->
					</div>
				</div>
			</div>

			<div class= "row hidden">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div id="plotref2" style="width: 900px; height: 700px;">
						<!-- Plotly chart will be drawn inside this DIV -->
						</div>
				</div>
			</div>
		</div>
		<!-- End contenedor mapa y gráficas -->
	</div>
	<!-- End Contenedor resultados --> 
	
	<footer>
		<div class="container">
			<div class ="row justify-content-md-center">
				<div class= "col-xs-3 col-sm-3 col-md-3">
					<img class= "imge" src="img/Logo-cdmx.png" >
				</div>
				<div class= "col-xs-3 col-sm-3 col-md-3">
					<img class= "imge"  src="img/logolab.png">
				</div>
				<div class= "col-xs-3 col-sm-3 col-md-3">
					<img  class= "imge"  src="img/LogoCAD.png" >
				 </div>
			</div>
		</div>
		
	</footer>

	<script type="text/javascript" src="js/canvasjs.min.js"></script>
	<script> 
		initmapas();
	</script>
</body>
</html>