<?php
// Create connection
global $mysqli;

if ($_SERVER['HTTP_HOST'] == 'localhost:8888' || $_SERVER['HTTP_HOST'] == 'localhost') 
{
	$mysqli = mysqli_connect('localhost','user','pass','db_name'); //Local Servers
}
elseif($_SERVER['HTTP_HOST'] == 'example-productive.com') 
{
	$mysqli = mysqli_connect('localhost','user','pass','db_name'); //Productive Server
}
else
{
	$mysqli = mysqli_connect('localhost','user','pass','db_name'); //Stage Server
}

// Check connection
if (mysqli_connect_errno($mysqli)) {
  echo 'Failed to connect to MySQL: ' . mysqli_connect_error($mysqli);
  die;
}


// Set everything on MySQL to UTF8
mysqli_query($mysqli, 'SET NAMES UTF8');