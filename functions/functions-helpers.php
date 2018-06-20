<?php 
	function build_insert_query($table_name, $vars, $exceptions = array() ) {

		$query = "INSERT INTO $table_name (";

		$limit = count($vars);
		$count = 0;
		foreach( $vars as $key => $var )
		{
			$count = $count + 1;
			if(in_array($key, $exceptions)) continue;
			$query .= $key;
			$query .= $limit == $count ? ' ' : ', ';
		}

		$query .= ') values (';

		$countB = 0;
		foreach( $vars as $key => $var )
		{
			$countB = $countB + 1;
			if(in_array($key, $exceptions)) continue;
			
			$var = escape_var( $var );
			$query .= '\'' . $var;	
			$query .= $limit == $countB ? '\' ' : '\', ';
		}

		$query .= ');';

		return $query;
	}

	function build_update_questions_query($table_name, $vars, $id) {

		$query = "UPDATE $table_name SET ";

		$limit = count($vars);
		$count = 0;
		foreach( $vars as $key => $var )
		{
			$count = $count + 1;
			$var = escape_var($var);
			$query .= $key . ' = \'' . $var;
			$query .= $limit == $count ? '\' ' : '\', ';
			
		}

		$query .= ' WHERE id = ' . $id . ' AND status = 0;' ;

		return $query;
	}

	function escape_var($var) {
		global $mysqli;

		$var = mysqli_real_escape_string($mysqli, $var);

		return $var;
	}