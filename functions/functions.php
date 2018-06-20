<?php 
	require __DIR__ . '/../configuration/initial-configuration.php';
	require __DIR__ . '/../configuration/db-connection.php';

	require __DIR__ . '/functions-helpers.php';
	require __DIR__ . '/functions-ajax.php';



	if( ! session_id() ) {
        session_start();
    }

// Close DB connection
	mysqli_close($mysqli);