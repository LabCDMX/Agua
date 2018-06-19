<?php
// Initial configuration

	// Set timezone to Mexico_City
	date_default_timezone_set('America/Mexico_City');

	// Set locale to spanish
	setlocale(LC_ALL,"es_ES.UTF-8");

	// Set debug status as a CONSTANT
	define('DEBUG', true);

	// Start session
	session_start();