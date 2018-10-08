<!-- Modal -->
<div class="modal fade" id="modal-opinion" tabindex="-1" role="dialog" aria-labelledby="modalOpinion" aria-hidden="true">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header no-border">
				<h5 class="modal-title font-size-45 bottom-buffer-30" id="exampleModalLabel">Danos tu opinión</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				
				<p class="bottom-buffer-80">Las siguientes preguntas nos ayudarán a conocer mejor la relevancia de la información que provee esta plataforma. Selecciona el enunciado con el que mejor te identifiques. Queremos evaluar la opinión real de las personas, no lo que creen que deberían contestar ;)</p>

				<hr>

				<p class="bottom-buffer-40">Ahora que obtuviste resultados sobre tu consumo de agua sustentados en cálculos y estándares recomendados, <span class="text-primary">¿con qué frase te sientes más identificado?</span></p>

				<div class="row bottom-buffer-40">
					<div class="col-md">
						<button class="btn btn-outline-primary btn-block p-14" onclick="asignaRespuesta(1, 14, 'menos'); saveAjaxQuestion( txtRespuestas, 15);">Pensaba que en mi hogar se consumía <b>menos</b> agua.</button>
						<button class="btn btn-outline-primary btn-block p-14" onclick="asignaRespuesta(1, 14, 'más'); saveAjaxQuestion( txtRespuestas, 15);">Pensaba que en mi hogar se consumía <b>más</b> agua.</button>
						<button class="btn btn-outline-primary btn-block p-14" onclick="asignaRespuesta(1, 14, 'me son indiferentes'); saveAjaxQuestion( txtRespuestas, 15);">Los resultados <b>me son indiferentes,</b> no me importa cuánta agua se consume en mi hogar.</button>
						<button class="btn btn-outline-primary btn-block p-14" onclick="asignaRespuesta(1, 14, 'es responsable'); saveAjaxQuestion( txtRespuestas, 15);">Yo ya sabía que el consumo de agua en mi hogar <b>es responsable.</b></button>
						<button class="btn btn-outline-primary btn-block p-14" onclick="asignaRespuesta(1, 14, 'no del todo responsable'); saveAjaxQuestion( txtRespuestas, 15);">Yo ya sabía que el consumo de agua en mi hogar <b>no es del todo responsable.</b></button>	
					</div>
				</div>

				<hr class="bottom-buffer-40">

				<h3 class="bottom-buffer-40">Después de visualizar cómo es el consumo de agua de mi hogar...</h3>

				<p class="bottom-buffer-30">Pienso modificar los <b>hábitos de consumo de agua</b> de mi hogar <b>para cuidar más este vital recurso.</b></p>

				<div class="row bottom-buffer-40">
					<div class="col-md-12">
						<button class="btn btn-outline-primary p-15" onclick="asignaRespuesta(1, 15, 'Muy de acuerdo'); saveAjaxQuestion( txtRespuestas, 16);">Muy de acuerdo</button>
						<button class="btn btn-outline-primary p-15" onclick="asignaRespuesta(1, 15, 'De acuerdo'); saveAjaxQuestion( txtRespuestas, 16);">De acuerdo</button>
						<button class="btn btn-outline-primary p-15" onclick="asignaRespuesta(1, 15, 'Neutral'); saveAjaxQuestion( txtRespuestas, 16);">Neutral</button>
						<button class="btn btn-outline-primary p-15" onclick="asignaRespuesta(1, 15, 'En desacuerdo'); saveAjaxQuestion( txtRespuestas, 16);">En desacuerdo</button>
						<button class="btn btn-outline-primary p-15" onclick="asignaRespuesta(1, 15, 'Muy en desacuerdo'); saveAjaxQuestion( txtRespuestas, 16);">Muy en desacuerdo</button>
					</div>
				</div>

				<p class="bottom-buffer-30">Pienso modificar los <b>hábitos de consumo de agua</b> de mi hogar <b>para reducir el costo de mi recibo bimestral.</b></p>

				<div class="row bottom-buffer-40">
					<div class="col-md-12">
						<button class="btn btn-outline-primary p-16" onclick="asignaRespuesta(1, 16, 'Muy de acuerdo'); saveAjaxQuestion( txtRespuestas, 17);">Muy de acuerdo</button>
						<button class="btn btn-outline-primary p-16" onclick="asignaRespuesta(1, 16, 'De acuerdo'); saveAjaxQuestion( txtRespuestas, 17);">De acuerdo</button>
						<button class="btn btn-outline-primary p-16" onclick="asignaRespuesta(1, 16, 'Neutral'); saveAjaxQuestion( txtRespuestas, 17);">Neutral</button>
						<button class="btn btn-outline-primary p-16" onclick="asignaRespuesta(1, 16, 'En desacuerdo'); saveAjaxQuestion( txtRespuestas, 17);">En desacuerdo</button>
						<button class="btn btn-outline-primary p-16" onclick="asignaRespuesta(1, 16, 'Muy en desacuerdo'); saveAjaxQuestion( txtRespuestas, 17);">Muy en desacuerdo</button>
					</div>
				</div>

				<hr class="bottom-buffer-40">

				<h3 class="bottom-buffer-40">¿Existe otra información que te gustaría haber recibido?</h3>

				<div class="form-group">
					<textarea class="form-control btn-outline-primary" onfocusout="asignaRespuesta(1, 17, this.value); saveAjaxQuestion( txtRespuestas, 18);"></textarea>
				</div>

				<p>Edad</p>

				<div class="form-group">
					<input type="text" class="form-control btn-outline-primary" name="edad" value="" onfocusout="asignaRespuesta(1, 18, this.value); saveAjaxQuestion( txtRespuestas, 19);">	
				</div>
				
				<p>Género</p>

				<div class="form-group">
					<input type="text" class="form-control btn-outline-primary" name="genero" value="" onfocusout="asignaRespuesta(1, 19, this.value); saveAjaxQuestion( txtRespuestas, 20);">	
				</div>

				<hr class="bottom-buffer-40">

				<div class="row">
					<div class="col-md-8 offset-md-2">
						<h3 class="text-center">¡Muchas gracias por participar!</h3>

						<p class="text-center">Los resultados de este estudio se publicarán a finales de 2018 en las redes sociales del Laboratorio para la Ciudad.</p>

						<p class="text-center">Tomar conciencia sobre nuestro consumo de agua es un primer paso para exigir como ciudadanía la permanencia y uso sustentable de este recurso.</p>

						<p class="text-center">Comparte <span class="text-primary"><b>AguaCDMX</b></span> en tus redes.</p>	
					</div>
				</div>

			</div>
			<div class="modal-footer text-center">
				<button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cerrar</button>
			</div>
		</div>
	</div>
</div>