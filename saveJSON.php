<?php
	$updatedJSON = $_POST['data'];
	$date = date('d-m-Y');
	$eventName = $_POST['event'];
	//$eventName = str_replace(' ', '', $eventName);
	$heatNumber = $_POST['heat'];
	
	
	if(isset($updatedJSON,$date,$eventName,$heatNumber)){
		
		if(!is_dir($date)){
			mkdir($date);
		}
		
		$filename = $date."/".$heatNumber."_".$eventName.'.json';
		
		$fileID = fopen($filename, 'w');
		if(!$fileID){
			echo '{"error":"Could not open file."}';
		}else {
			echo "{\"success\": \"$filename updated.\"}";
		}
		fwrite($fileID, $updatedJSON);
		fclose($fileID);
	}
?>