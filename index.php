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
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
		
	<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/3.16.1/math.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>

	<!-- jquery dataTables -->
	<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.13/css/jquery.dataTables.min.css">

	<!-- jquery Scroller dataTables -->
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/scroller/1.4.2/css/scroller.dataTables.min.css">
	<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/scroller/1.4.2/js/dataTables.scroller.min.js"></script>
	
	<!-- Plotly -->
	<script type="text/javascript" language="javascript" src="js/plotly-latest.min.js"></script> 
	<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

	<!-- Leaflet -->
	<link rel="stylesheet" type="text/css" href="leaflet/leaflet.css" />
	<script type="text/javascript" src="leaflet/leaflet.js"></script>

	<!-- llamarAPI, no existe -->
	<!-- <script src="js/llamarAPI.js" type="text/javascript"></script>   -->
	
	<!-- Plotly.js -->
	
	<!-- Numeric JS -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.min.js"></script>
	
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
	<div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
		<header class="masthead mb-auto">
			<div class="inner">
									
				
		</header>

		<div id="contenedor-intro" class="contenedor-general">
			<h1>Consumo de agua responsable</h1>

			<p>El consumo de agua por persona es importante. Con esta encuesta podremos darte algunas recomendaciones para mejorar tu consumo.</p>

			<div class="btns-container">
				<button id="boton-comenzar" class="btn btn-primary">Comenzar</button>
				<button id="boton-mapa-interactivo" class="btn btn-secondary">Mapa interactivo</button>
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
				<button class="btn btn-primary" onclick="pregSiguiente()">Siguiente</button>
				<button id="boton-mapa-interactivo" class="btn btn-secondary">Mapa interactivo</button>
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

		<div class= "row">
				<div id="Evaluados"> </div>
		</div>

		<div class= "row escala">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<h6>Responsable</h6>
				<div class= "row">
					<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 Responsable">
						</div>
						<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
								<p>Consumo igual o menor al límite óptimo</p>
						</div>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<h6>Sobrado</h6>
				<div class= "row">
					
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2  Sobrado">
								
						</div>
						<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
								<p>Consumo entre al punto medio de la escala y el límite responsable </p>
								
						</div>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<h6>Preocupante</h6>
				<div class= "row">
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2  Preocupante">
						</div>
						<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
								<p>Consumo entre al punto medio de la escala y el límite negligente </p>
						</div>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<h6>Negligente</h6>
				<div class= "row">
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2  Negligente">
						</div>
						<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
								<p>Consumo igual o mayor a limite Negligente </p>
						</div>
				</div>
			</div>
		</div>

		<br>
		
		<div class= "row" style="height: 480px;">
			<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
				<div id="pastelote" style="height: 400px; width: 90%;"></div>
			</div>

			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<img id ="imgConcep" src=""   style="height: 45%; position: absolute; left: 18%; top: 35%;opacity: 0.10; ">
				<div id="hoverinfo01" class= "hoverinfo">
				</div>
			</div>
		</div>

		<!-- Contenedor mapa y gráficas -->
		<div id="contenedor-cosas-raras">
			<div class= "row">
				<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
						<div id="mapas" style="height: 400px; width: 600px;"> </div>
				</div>
			</div>

			<div class= "row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<div id="valorRefCOL"> </div>
				</div>
			</div>

			<div class= "row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<div id="plotref1" style="width: 900px; height: 700px;">
						<!-- Plotly chart will be drawn inside this DIV -->
					</div>
				</div>
			</div>

			<div class= "row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div id="plotref2" style="width: 900px; height: 700px;">
								 <!-- Plotly chart will be drawn inside this DIV -->
						</div>
				</div>
			</div>
		</div>
		<!-- End contenedor mapa y gráficas -->

		<!-- V2 INFORMACION -->

		<!-- RECOMENDACIONES V2 -->
		<!-- <div class="header-resultados">
			<span class="regresar-cuestionario">Regresar al<br>cuestionario</span>
			<h2>Recomendaciones</h2>
		</div>
		<div class ="row">
			<div class= "col-md-10 offset-md-1">
				<div class="container-recomendados">
					<div class ="row recomendado">
						<div class="col-md-4 green">
							<span class="icon">
								<img src="img/regaderab.png" class="">
							</span>
							<p><strong>3</strong> minutos<br>por baño</p>
						</div>
						<div class="col-md-8">
							<p>Cada minuto en el baño consume 20 litros de agua. Asegurate de el flujo de agua mientras te enjabonas y tallas.</p>
						</div>
					</div>
					<div class ="row recomendado">
						<div class="col-md-4 yellow">
							<span class="icon">
								<img src="img/cocinab.png" class="">
							</span>
							<p><strong>10</strong> comidas<br>a la semana</p>
						</div>
						<div class="col-md-8">
							<p>Cada minuto en el baño consume 20 litros de agua. Asegurate de el flujo de agua mientras te enjabonas y tallas.</p>
						</div>
					</div>
					<div class ="row recomendado">
						<div class="col-md-4 green">
							<span class="icon">
								<img src="img/ropab.png" class="">
							</span>
							<p><strong>2 lavados</strong><br>a la semana</p>
						</div>
						<div class="col-md-8">
							<p>Cada minuto en el baño consume 20 litros de agua. Asegurate de el flujo de agua mientras te enjabonas y tallas.</p>
						</div>
					</div>
					<div class ="row recomendado">
						<div class="col-md-4 green">
							<span class="icon">
								<img src="img/auto.png" class="">
							</span>
							<p><strong>2 veces</strong><br>por semana</p>
						</div>
						<div class="col-md-8">
							<p>Se asume que se utilizan cuando mucho 3 cubetas de agua grandes cada vez que se realizan alguna de estas actividades</p>
						</div>
					</div>
					<div class="row recomendado">
						<div class="col-md-4 green">
							<span class="icon wc">
								<img src="img/WCb.png" class="">
							</span>
							<p><strong>80% SI</strong><br>Ahorrador</p>
						</div>
						<div class="col-md-8">
							<p>Desde hace años existen sanitarios con bajo consumo de agua -3.8 litros por descarga</p>
						</div>
					</div>
				</div>
			</div>

		</div> -->
		<!-- END RECOMENDACIONES V2 -->
		<!-- RESULTADOS V2 -->
		<!-- <div class="row container-resultados">
			<div class="col-md-10 offset-md-1 graficas">
				<h2>Resultados</h2>
				<div class="row">
					<div class="col-md-7">
						grafica pastel
					</div>
					<div class="col-md-5">
						<h2>130mxn al mes</h2>
						<p>Este es el porcentaje de tu pago qu cada actividad genera.</p>
						<p class="text-red">Tu consumo y tu pago no empatan con tu zona. Asegurate de no tener fugas</p>
					</div>
				</div>
			</div>
			<div class="col-md-10 offset-md-1 graficas">
				<div class="row recomendado-all">
					<div class="col-md-6">
						<div class="green">
							<span class="icon">
								<img src="img/regaderab.png" class="">
							</span>
							<p>3 minutos<br>por baño</p>
						</div>
						<div class="green">
							<span class="icon">
								<img src="img/cocinab.png" class="">
							</span>
							<p><strong>10</strong> comidas<br>a la semana</p>
						</div>
						<div class="green">
							<span class="icon">
								<img src="img/ropab.png" class="">
							</span>
							<p><strong>2 lavados</strong><br>a la semana</p>
						</div>
						<div class="green">
							<span class="icon">
								<img src="img/auto.png" class="">
							</span>
							<p><strong>2 veces</strong><br>por semana</p>
						</div class="green">
						<div class="green">
							<span class="icon wc">
								<img src="img/WCb.png" class="">
							</span>
							<p><strong>80% SI</strong><br>Ahorrador</p>
						</div>
					</div>
					<div class="col-md-6">
						<div class="green">
							<span class="icon">
								<img src="img/regaderab.png" class="">
							</span>
							<p>3 minutos<br>por baño</p>
						</div>
						<div class="green">
							<span class="icon">
								<img src="img/cocinab.png" class="">
							</span>
							<p><strong>10</strong> comidas<br>a la semana</p>
						</div>
						<div class="green">
							<span class="icon">
								<img src="img/ropab.png" class="">
							</span>
							<p><strong>2 lavados</strong><br>a la semana</p>
						</div>
						<div class="green">
							<span class="icon">
								<img src="img/auto.png" class="">
							</span>
							<p><strong>2 veces</strong><br>por semana</p>
						</div>
						<div class="green">
							<span class="icon wc">
								<img src="img/WCb.png" class="">
							</span>
							<p><strong>80% SI</strong><br>Ahorrador</p>
						</div>
					</div>
				</div>
			</div>
		</div> -->
		<!-- END RESULTADOS V2 -->
	</div>
	<!-- End Contenedor resultados --> 

	<footer>
		<div class="container">
			<div class ="row">
				<div class= "col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<img class= "imge" src="img/Logo-cdmx.png" >
				</div>
				<div class= "col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<img class= "imge"  src="img/sacmex.png"  >
				</div>
				<div class= "col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<img class= "imge"  src="img/logolab.png">
				</div>
				<div class= "col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<img  class= "imge"  src="img/LogoCAD.png" >
				 </div>
			</div>
		</div>
		
	</footer>

	<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
	<script> 
		initmapas();
	</script>
</body>
</html>