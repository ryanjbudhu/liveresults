<head>
	<script>function updateResultTable(scoreList) {
			var htmlStr = '';
			//var list = {};
			// start building html for results table
			htmlStr = htmlStr + '<table id="resultsTable">';
			
			// results table header
			htmlStr = htmlStr + '<tr>'+
				'<th onclick="sortTable(0)" class="place">Place</th>'+
				'<th class="lane">Hip</th>'+
				'<th onclick="sortTable(2)" class="number">#</th>'+
				'<th onclick="sortTable(3)" class="name">Name</th>'+
				'<th onclick="sortTable(4)" class="team">Team</th>'+
				'<th class="time">Final</th>'+
				'<th class="delta">Delta</th>'+
				'<th class="cum">Cum</th>'+
				'<th class="last">Last</th>'+
				'<th class="laps">Laps</th></tr>';
			
			let sortedArray = Object.values(scoreList).sort(function(a,b){
				if(a[0]==b[0]){
					return a[2]-b[2];
				}
				return b[0]-a[0];
			});
			for (var idx in sortedArray) {
				var result = sortedArray[idx];
				
	//			Not sure why this is necessary...
	//			A seemingly random number of results with ',' are being sent. 
	//			Come events have a trailing result line with all elements undefined 
			
				htmlStr = htmlStr + "<tr>";                
					htmlStr = htmlStr + '<td class="place">' + result[0] + "</td>";
					htmlStr = htmlStr + '<td class="lane">' + result[1] + "</td>";
					htmlStr = htmlStr + '<td class="number">' + result[2] + "</td>";
					htmlStr = htmlStr + '<td class="name">' + result[3] + "</td>";
					htmlStr = htmlStr + '<td class="team">' + result[4] + "</td>";
					htmlStr = htmlStr + '<td class="time">' + result[5] + "</td>";
					htmlStr = htmlStr + '<td class="delta">' + result[6] + "</td>";
					htmlStr = htmlStr + '<td class="cum">' + result[7] + "</td>";
					htmlStr = htmlStr + '<td class="last">' + result[8] + "</td>";
					htmlStr = htmlStr + '<td class="laps">' + result[9] + "</td>";
				htmlStr = htmlStr + "</tr>"; 
			}
			htmlStr = htmlStr + '<table>';
			
			// update page with generated table
			document.getElementById("results").innerHTML = htmlStr;
			//$('#results').html(htmlStr);
		}
	</script>
</head>
<a href="./index.php">Home</a><br>
<div id="results"></div>

<?php
	$date = $_GET['date'];
	$racename = $_GET['racename'];
	
	//$date = '09-11-2019';
	//$racename = '1_Women5kRunCC.json';
	
	if(isset($date,$racename)){
		try {
			
			$path = $date.'/'.$racename;
			$fd = fopen($path, 'r');
			$data = fread($fd, filesize($path));
			echo "<script>\n\t";
			echo "let results=$data;\n\t";
			echo "updateResultTable(results);\n";
			echo "</script>";
			fclose($fd);
			
		}catch(Exception $e){
			$date = '';
			$racename = '';
		}
	}elseif(isset($date)){
		//$files_in_folder = [];
		try {
			if(is_dir($date)){
				$files_in_folder = array_splice(scandir($date),2);
				echo "<script>\n\tlet files = ".json_encode($files_in_folder,JSON_PRETTY_PRINT).";\n\t";
			$printFiles = "let res = document.getElementById('results');
			var output = \"\";
			for (var i=0;i<files.length;i++) {
				output += \"<a href='./index.php?date=$date&racename=\"+files[i]+\"'>\"+files[i]+\"</a></br>\";
			}
			res.innerHTML = output;
		</script>";
			echo $printFiles;
			}else {
				header('Location:~/index.php');
			}
		}catch(Exception $e){
			$date = '';
			$racename = '';
		}
	}else {	
		$folders = array_filter(glob('[0123][0192837465]-[01][0192837465]-20[0129384756][1029384756]'),'is_dir');
		//print_r($folders);
		echo "<script>\n\tlet files = ".json_encode($folders,JSON_PRETTY_PRINT).";\n\t";
		$printFiles = "let res = document.getElementById('results');
		var output = '<a href=\"./live.html\">Live Results</a><br>'
		
		
;
		for (var i=0;i<files.length;i++) {
			output += \"<a href='./index.php?date=\"+files[i]+\"'>\"+files[i]+\"</a></br>\";
		}
		res.innerHTML = output;
	</script>";
		echo $printFiles;
		/*
		$file_info = [];
		$files_in_folder = [];
		
		//Get each filename
		foreach ($folders as $folder) {
			$files_in_folder = array_merge(glob("$folder/*"),$files_in_folder);
		}
		//print_r($files_in_folder);
		
		//Get each file data
		foreach ($files_in_folder as $file) {
			$filefd = fopen($file, 'r');
			$file_info[$file] = fread($filefd, filesize($file));
			fclose($filefd);
		}
		//print_r($file_info);
		
		//Convert file data
		foreach ($file_info as $results) {
			$data = json_decode($results);
			//print_r($data);
		}*/
	}
?>

