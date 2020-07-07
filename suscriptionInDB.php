<?php

require_once './installDB.php';
$_POST = json_decode(file_get_contents('php://input'), true);


if(isset($_POST['axn']) && $_POST['axn'] != NULL){
	$output = '';
	switch($_POST['axn']){
		case "subscribe":
			//filter out bad data
			$myQuery = "SELECT * FROM subscribers WHERE endpoint = ".$db->quote($_POST['endpoint']);
			try{
			    $result = $db->query($myQuery)->fetch(PDO::FETCH_ASSOC);
			    if($result['id'] == NULL || $result['id'] == ""){
					$my_query = "REPLACE INTO subscribers (endpoint, p256dh, auth) VALUES (".$db->quote($_POST['endpoint']).", ".$db->quote($_POST['key']).", ".$db->quote($_POST['token'])."); ";
					    echo $my_query.'<BR><BR>';
					    try {
					        $db->exec($my_query);
					        }
					    catch(PDOException $e)
					        {
					        echo $e->getMessage();
					        }
					    //$i++;
					    $output .= 'adding user <br>';
		   	    }else{
			        $output .= 'user exists in db :  <br>';
			        
			    }
			}
			catch(PDOException $e){
			     exit($e->getMessage());
			} 
			echo $output;
			exit;
			break;
		case "unsubscribe":
			$myQuery = "SELECT * FROM subscribers WHERE endpoint = ".$db->quote($_POST['endpoint']);
			try{
			    $result = $db->query($myQuery)->fetch(PDO::FETCH_ASSOC);
			    if($result['id'] != NULL){
					$my_query = "DELETE FROM subscribers WHERE endpoint = ".$db->quote($_POST['endpoint']);
					   // exit($my_query);
					    try {
					        $db->exec($my_query);
					        }
					    catch(PDOException $e)
					        {
					        echo $e->getMessage();
					        }
					    $output .= 'removing user <br>';
		   	    }else{
			        $output .= 'user does not exist in db :  <br>';
			        
			    }
			}
			catch(PDOException $e){
			     exit($e->getMessage());
			} 
			echo $output;
			exit;
			break;
		default:
	}
	exit;
}

?>