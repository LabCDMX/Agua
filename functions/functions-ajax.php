<?php 
	if(isset($_POST['action']) AND $_POST['action'] == 'saveAnswerAjax') saveAnswerAjax($_POST);

	/**
	 * SAVE ANSWER QUESTION
	 * @param  [type] $_POST [description]
	 */
	function saveAnswerAjax($data){
		extract($data);

		$columns = questionsColumn($question);
		if(!empty($columns)){
			foreach ($columns as $key => $column) {
				$index = $key + 1;
				if($column != 'status'){
					saveAnswer($column, $answers[$question][$index]);
				}else{
					saveAnswer($column, 1);
				}
				
			}
		}

		header('Content-type: application/json; charset=utf-8');
	    echo json_encode(['siii', questionsColumn($question)]);
	    exit();
	}

	function saveAnswer($column, $answer){
		global $wpdb, $mysqli;
		$session_id = session_id();
		$client_ip = get_client_ip();
		$exist = session_questions($session_id);
		$date = date('Y-m-d h:i:s');
		$questions_id = isset($exist['ID']) ? $exist['ID'] : '';
		
		if(isset($exist['session_id'])){
			$vars = array( 
				$column => getResponseSpecial($column, $answer),
				'updated_at' => $date
			);
			$query = build_update_questions_query('ag_questions', $vars, $questions_id);
			$result = mysqli_query($mysqli, $query);
		}else{
			$vars = array( 
				'session_id' => $session_id,
				$column => $answer,
				'ip' => $client_ip,
				'created_at' => $date,
				'updated_at' => $date
			);

			$query = build_insert_query( 'ag_questions', $vars);
			$result = mysqli_query($mysqli, $query);
			$questions_id = mysqli_insert_id($mysqli);
		}

		return $questions_id;
	}


	function questionsColumn($number){
		switch ($number) {
			case 0:
				return ['colony'];
			case 1:
				return ['know_water_payment'];
			case 2:
				return ['water_payment'];
			case 3:
				return ['number_of_people'];
			case 4:
				return ['shower_time', 'shower_recover'];
			case 5:
				return ['number_prepare_food', 'tarja_is_thrifty'];
			case 6:
				return ['washed_number', 'resycle_washing'];
			case 7:
				return ['house_toilet', 'house_water_rinse'];
			case 8:
				return ['number_wash_the_yard', 'yard_water_rinse'];
			case 9:
				return ['number_wash_the_car', 'card_water_rinse'];
			case 10:
				return ['number_water_the_garden', 'garden_water_rinse'];
			case 11:
				return ['sanitary_saver', 'status'];
			default:
				return [];
				break;
		}
	}


	function getResponseSpecial($column, $answer){
		if($column == 'know_water_payment'){
			return $answer == '' ? 'No' : $answer;
		}

		if($column == 'shower_recover' || $column == 'tarja_is_thrifty' || $column == 'resycle_washing'){
			return ( $answer == 'true')  ? 1 : 0;
		}

		if($column == 'house_water_rinse' || $column == 'yard_water_rinse' || $column == 'card_water_rinse'){
			return ( $answer == 'true')  ? 1 : 0;
		}

		if($column == 'garden_water_rinse'){
			return ( $answer == 'true')  ? 1 : 0;
		}

		if($column == 'sanitary_saver'){
			return $answer == 'NO' ? 0 : 1;
		}

		return $answer;
	}

	function session_questions($session_id){
		global $mysqli;

		$query = "SELECT * FROM ag_questions WHERE session_id = '$session_id' AND status = 0";

		$result = mysqli_query($mysqli, $query);

		if($result && mysqli_num_rows($result) > 0) 
		{
			$results = mysqli_fetch_array($result, MYSQLI_ASSOC);
			return $results;
		}
		else
		{
			return false;
		}
	}

	//Obtiene la IP del cliente
    function get_client_ip() {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
           $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }