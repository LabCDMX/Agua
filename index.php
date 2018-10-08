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
	<link rel="stylesheet" type="text/css" href="css/jquery-confirm.min.css">
	
	<script type="text/javascript" src="js/jquery.min.js"></script>	
	<script type="text/javascript" src="js/tether.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/math.min.js"></script>
	<script type="text/javascript" src="js/jquery-confirm.min.js"></script>

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
	<link rel="stylesheet" href="css/awesomplete.min.css" />
	<script src="js/awesomplete.min.js" async></script>
	
	<!-- cover -->
	<link href="css/cover.css?ver=2.2.1" rel="stylesheet">

	<!-- Data -->
	<script type="text/javascript" src="data/col_CP.js"></script><!--primero-->
	
	<script type="text/javascript" src="data/CDMX.js"></script>
	<script type="text/javascript" src="data/munCDMX.geojson.js"></script>
	<script type="text/javascript" src="data/emision_referencia.js"></script>
	<script type="text/javascript" src="data/DataRetoH2Obis.geojson.js"></script>
	<script type="text/javascript" src="js/principalNuevo.js?ver=2.2.1"></script>
</head>

<body>

	<!-- Contenedor principal -->
	<div class="d-flex h-100 p-3 mx-auto flex-column">

		<div id="contenedor-intro" class="container">
			<div class="row">
				<div class="col-md-12 bottom-buffer-20">
					<h1 class="text-semi-bold bottom-buffer-20">AguaCDMX</h1>

					<p class="font-size-40 bottom-buffer-20 center">¿Sabes cuánta agua se consume en tu hogar?</p>

					<p class="font-size-16 bottom-buffer-30 text-bold center">Al responder las siguientes preguntas obtendrás un diagnóstico para saber si tu consumo de agua está ubicado dentro de los estándares recomendados; podrás compararlo con el consumo que realizan tus vecinos en la colonia y delegación en la que vives; y recibirás algunas recomendaciones para optimizar tu uso del agua.</p>

					<p class="font-size-16 bottom-buffer-30 center">En diversas regiones del mundo, vivir con escasez de agua es una preocupación cotidiana para diferentes personas; la CDMX no es ajena a esa realidad. Según el Sistema de Aguas de la Ciudad de México, el promedio de uso por persona debería de ser de 96 litros por día, sin embargo, consumimos tres veces la cantidad deseada.</p>

					<p class="font-size-16 bottom-buffer-20 center">En este sentido, fomentar una cultura del uso responsable de agua es sólo una de las muchas acciones necesarias para preservar el vital recurso.</p>	
				</div>
			</div>

			<div class="row bottom-buffer-240">
				<div class="col-md-4 offset-md-2 text-center">
					<button class="btn btn-outline-primary btn-lg" data-toggle="modal" data-target="#modal-acerca-de">Acerca de AguaCDMX</button>	
				</div>
				<!-- Quitar y regresar offset-md-2 al primer botón -->
				<div class="col-md-4 text-center bottom-buffer-60 hidden">
					<!-- Button trigger modal -->
					<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal-opinion">
						¿Qué opinas de tus resultados?
					</button>
				</div>
				<div class="col-md-4 text-center">
					<button id="boton-comenzar" class="btn btn-primary btn-lg btn-block">Iniciar</button>	
				</div>
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
					<div id="inputCOL" class="hidden"></div>
					<div id="areaInput"> </div>
					<h5 id="alertInput"> </h5>
					<!-- <h4 id="contexto"></h4> -->
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 offset-md-4">
					<button class="btn btn-primary btn-lg btn-block" onclick="pregSiguiente()">Siguiente</button>	
				</div>
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
					<div id="barra-tu-consumo" class="uno">
						<p><span class="titulo-barra-tu-resultado">Tu resultado</span> <br> <span id="resultado-tu-consumo" class="resultado">algo</span></p>
					</div>
					<div id="barra-consumo-colonia" class="dos">
						<p><span id="titulo-barra-colonia"></span> <br> <span id="resultado-consumo-colonia" class="resultado"></span></p>
					</div>
					<div id="barra-consumo-delegacion" class="tres">
						<p><span id="titulo-barra-delegacion"></span> <br> <span id="resultado-consumo-delegacion" class="resultado"></span></p>
					</div>
					<div id="barra-consumo-ciudad" class="cuatro">
						<p><span id="titulo-barra-ciudad">CDMX</span> <br> <span id="resultado-consumo-ciudad" class="resultado"></span></p>
					</div>
				</div>
			</div>
			<div class="col-md-10 bottom-buffer-80">
				<p class="bottom-buffer-50">Los resultados muestran una comparación con la siguiente cantidad de habitantes promedio por vivienda:</p>
				<table class="table table-bordered">
					<tr>
						<th class="text-right"></th>
						<th class="text-right">Tu colonia</th>
						<th class="text-right">Delegación</th>
						<th class="text-right">Ciudad</th>
					</tr>
					<tr>
						<td class="text-right"><img class="icono-gente" src="img/icono-gente.svg"></td>
						<td class="text-right">3.5</td>
						<td class="text-right">3</td>
						<td class="text-right">3.6</td>
					</tr>
				</table>
			</div>

			<div class="col-md-12 text-center bottom-buffer-60">
				<!-- Button trigger modal -->
				<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modal-opinion">
					¿Qué opinas de tus resultados?
				</button>
			</div>

			<div class="col-md-12 text-center bottom-buffer-80">
				<button class="btn btn-outline-primary btn-lg" data-toggle="modal" data-target="#modal-de-donde">Conoce más sobre tu resultado</button>
			</div>

			<p class="text-center">
				<a href="https://agua.labcd.mx">
					Volver al inicio
				</a>
			</p>
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
					<a href="https://cdmx.gob.mx" target="_blank">
						<img class= "imge" src="img/Logo-cdmx.png" >
					</a>
				</div>
				<div class= "col-xs-3 col-sm-3 col-md-3">
					<a href="https://labcd.mx" target="_blank">
						<img class= "imge"  src="img/logolab.png">
					</a>
				</div>
				<div class= "col-xs-3 col-sm-3 col-md-3">
					<a href="https://www.cadsalud.org/" target="_blank">
						<img  class= "imge"  src="img/LogoCAD.png" >
					</a>
				 </div>
			</div>
		</div>
		
	</footer>

	<?php 
		include('modal-opinion.php');
		include('modal-de-donde-provienen.php');
		include('modal-acerca-de.php');
	?>

	<script type="text/javascript" src="js/canvasjs.min.js"></script>
	<script> 
		initmapas();
	</script>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-74478095-10', 'auto');ga('send', 'pageview');</script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-74478095-10"></script>

</body>
</html>